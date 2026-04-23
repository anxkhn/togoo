import { describe, expect, it } from "vitest";
import { CreateEventSchema } from "../lib/validation";
import { formatTime, snapUnixToTimezoneStep, zonedDateTimeToUnix, zonedDateToUnixEndOfDay } from "../lib/utils";

describe("timezone utilities", () => {
  it("keeps IST 2:00 PM as 2:00 PM", () => {
    const timestamp = zonedDateTimeToUnix("2026-05-18T14:00", "Asia/Kolkata");

    expect(formatTime(timestamp, "Asia/Kolkata")).toBe("2:00 PM");
  });

  it("does not shift an already-snapped IST slot by 30 minutes", () => {
    const timestamp = zonedDateTimeToUnix("2026-05-18T14:00", "Asia/Kolkata");

    expect(snapUnixToTimezoneStep(timestamp, 30, "Asia/Kolkata")).toBe(timestamp);
  });

  it("allows response deadlines before the event start", () => {
    const eventStart = zonedDateTimeToUnix("2026-05-20T18:00", "Asia/Kolkata");
    const eventEnd = zonedDateTimeToUnix("2026-05-20T22:00", "Asia/Kolkata");
    const responseDeadline = zonedDateTimeToUnix("2026-05-19T23:59", "Asia/Kolkata");

    const parsed = CreateEventSchema.safeParse({
      title: "Dinner",
      event_type: "meetup",
      timezone: "Asia/Kolkata",
      date_range_start: eventStart,
      date_range_end: eventEnd,
      meeting_duration_minutes: 60,
      slot_granularity_minutes: 30,
      min_attendance_threshold: 0,
      participants_required_by_default: false,
      allow_participant_edit: true,
      show_results_to_participants: false,
      preferences_required: false,
      enabled_preferences: [],
      scoring_mode: "maximize_attendance",
      response_deadline: responseDeadline,
      organizer_name: "Organizer",
    });

    expect(parsed.success).toBe(true);
  });

  it("converts local end-of-day deadlines in the selected timezone", () => {
    const deadline = zonedDateToUnixEndOfDay("2026-05-19", "Asia/Kolkata");

    expect(formatTime(deadline, "Asia/Kolkata")).toBe("11:59 PM");
  });
});
