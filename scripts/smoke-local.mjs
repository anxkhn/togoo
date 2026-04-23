const baseUrl = process.env.SMOKE_BASE_URL ?? "http://localhost:3000";

function unixFromIso(iso) {
  return Math.floor(new Date(iso).getTime() / 1000);
}

async function request(path, options = {}) {
  const response = await fetch(`${baseUrl}${path}`, {
    ...options,
    headers: {
      "content-type": "application/json",
      ...options.headers,
    },
  });
  const text = await response.text();
  const isJson = response.headers.get("content-type")?.includes("application/json");
  const data = text && isJson ? JSON.parse(text) : text;

  if (!response.ok) {
    throw new Error(`${options.method ?? "GET"} ${path} failed (${response.status}): ${text}`);
  }

  return data;
}

function pass(label) {
  console.log(`PASS ${label}`);
}

const started = Date.now();

try {
  console.log(`Running local smoke test against ${baseUrl}`);

  await request("/");
  pass("local app reachable");

  const slotStart = unixFromIso("2026-05-18T13:30:00.000Z");
  const slotEnd = unixFromIso("2026-05-18T14:30:00.000Z");

  const event = await request("/api/events", {
    method: "POST",
    body: JSON.stringify({
      title: `Smoke test ${new Date().toISOString()}`,
      event_type: "meetup",
      timezone: "Asia/Kolkata",
      date_range_start: unixFromIso("2026-05-18T12:30:00.000Z"),
      date_range_end: unixFromIso("2026-05-18T16:30:00.000Z"),
      meeting_duration_minutes: 60,
      slot_granularity_minutes: 30,
      min_attendance_threshold: 0,
      participants_required_by_default: false,
      allow_participant_edit: true,
      show_results_to_participants: true,
      preferences_required: false,
      enabled_preferences: ["day_type", "time_of_day"],
      scoring_mode: "maximize_attendance",
      organizer_name: "Smoke Organizer",
    }),
  });
  pass("event created");

  const participant = await request(`/api/events/${event.event_id}/participants`, {
    method: "POST",
    headers: { "x-organizer-token": event.organizer_token },
    body: JSON.stringify({
      name: "Smoke Participant",
      email: "",
      phone: "",
      is_required: true,
      priority_tier: 0,
    }),
  });
  pass("participant invite generated");

  await request(`/api/events/${event.event_id}/respond`, {
    method: "POST",
    body: JSON.stringify({
      token: participant.invite_token,
      availability_windows: [{ start_time: slotStart, end_time: slotEnd }],
      preferences: {
        preferred_day_type: "weekday",
        preferred_time_of_day: "evening",
      },
    }),
  });
  pass("response submitted");

  const recommendations = await request(`/api/events/${event.event_id}/recommendations`, {
    headers: { "x-organizer-token": event.organizer_token },
  });
  if (!recommendations.recommendations?.top_candidates?.length) {
    throw new Error("recommendations returned no candidates");
  }
  pass("recommendations returned candidates");

  const selected = recommendations.recommendations.top_candidates[0];
  await request(`/api/events/${event.event_id}/finalize`, {
    method: "POST",
    headers: { "x-organizer-token": event.organizer_token },
    body: JSON.stringify({ slot_start: selected.start, slot_end: selected.end }),
  });
  pass("final slot accepted");

  const duration = ((Date.now() - started) / 1000).toFixed(1);
  console.log(`PASS local smoke completed in ${duration}s`);
  console.log(`Organizer: ${baseUrl}${event.dashboard_url}`);
  console.log(`Response: ${baseUrl}${participant.invite_url}`);
  console.log(`Summary: ${baseUrl}/e/${event.event_id}/summary/${event.organizer_token}`);
  console.log(`Final: ${baseUrl}/e/${event.event_id}/final`);
} catch (error) {
  const duration = ((Date.now() - started) / 1000).toFixed(1);
  console.error(`FAIL local smoke failed after ${duration}s`);
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
}
