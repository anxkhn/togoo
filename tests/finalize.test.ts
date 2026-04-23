import { describe, expect, it } from "vitest";
import { computeCandidateMeetings, isValidFinalizationSlot, normalizeAvailabilityWindows, type EventSettings, type Participant } from "../lib/scheduling";
import { zonedDateTimeToUnix } from "../lib/utils";

const settings: EventSettings = {
  timezone: "UTC",
  date_range_start: zonedDateTimeToUnix("2026-05-18T18:00", "UTC"),
  date_range_end: zonedDateTimeToUnix("2026-05-18T22:00", "UTC"),
  meeting_duration_minutes: 60,
  slot_granularity_minutes: 30,
  scoring_mode: "maximize_attendance",
};

const participant: Participant = { id: "p1", is_required: 1, response_status: "responded" };

describe("finalization validation", () => {
  it("accepts a valid recommendation candidate", () => {
    const start = zonedDateTimeToUnix("2026-05-18T19:00", "UTC");
    const slots = normalizeAvailabilityWindows(
      [{ participant_id: "p1", start_time: start, end_time: start + 60 * 60 }],
      settings
    );
    const candidates = computeCandidateMeetings([participant], slots, [], settings, []);

    expect(isValidFinalizationSlot(candidates, start, start + 60 * 60)).toBe(true);
  });

  it("rejects impossible client-supplied slots", () => {
    const start = zonedDateTimeToUnix("2026-05-18T19:00", "UTC");
    const slots = normalizeAvailabilityWindows(
      [{ participant_id: "p1", start_time: start, end_time: start + 60 * 60 }],
      settings
    );
    const candidates = computeCandidateMeetings([participant], slots, [], settings, []);

    expect(isValidFinalizationSlot(candidates, start + 30 * 60, start + 90 * 60)).toBe(false);
  });

  it("rejects all slots when no organizer-visible candidates exist", () => {
    expect(isValidFinalizationSlot([], settings.date_range_start!, settings.date_range_start! + 60 * 60)).toBe(false);
  });
});
