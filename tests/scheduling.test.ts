import { describe, expect, it } from "vitest";
import { computeRecommendations, normalizeAvailabilityWindows, type EventSettings, type Participant } from "../lib/scheduling";
import { zonedDateTimeToUnix } from "../lib/utils";

const settings: EventSettings = {
  timezone: "Asia/Kolkata",
  date_range_start: zonedDateTimeToUnix("2026-05-18T18:00", "Asia/Kolkata"),
  date_range_end: zonedDateTimeToUnix("2026-05-18T22:00", "Asia/Kolkata"),
  meeting_duration_minutes: 60,
  slot_granularity_minutes: 30,
  scoring_mode: "maximize_attendance",
};

const participants: Participant[] = [
  { id: "p1", is_required: 0, response_status: "responded" },
  { id: "p2", is_required: 0, response_status: "responded" },
];

describe("scheduling recommendations", () => {
  it("ranks overlapping availability first", () => {
    const sharedStart = zonedDateTimeToUnix("2026-05-18T19:00", "Asia/Kolkata");
    const slots = normalizeAvailabilityWindows(
      [
        { participant_id: "p1", start_time: sharedStart, end_time: sharedStart + 60 * 60 },
        { participant_id: "p2", start_time: sharedStart, end_time: sharedStart + 60 * 60 },
      ],
      settings
    );

    const recommendations = computeRecommendations(participants, slots, [], settings, []);

    expect(recommendations.best_overall?.start).toBe(sharedStart);
    expect(recommendations.best_overall?.attendingCount).toBe(2);
  });

  it("still returns single-person candidates", () => {
    const start = zonedDateTimeToUnix("2026-05-18T18:30", "Asia/Kolkata");
    const slots = normalizeAvailabilityWindows(
      [{ participant_id: "p1", start_time: start, end_time: start + 60 * 60 }],
      settings
    );

    const recommendations = computeRecommendations(participants, slots, [], settings, []);

    expect(recommendations.top_candidates).toHaveLength(1);
    expect(recommendations.top_candidates[0].attendingIds).toEqual(["p1"]);
  });

  it("keeps legacy :30 starts rankable", () => {
    const start = zonedDateTimeToUnix("2026-05-18T18:30", "Asia/Kolkata");
    const slots = normalizeAvailabilityWindows(
      [{ participant_id: "p1", start_time: start, end_time: start + 60 * 60 }],
      settings
    );

    expect(slots[0].slot_start).toBe(start);
    expect(computeRecommendations(participants, slots, [], settings, []).best_overall?.start).toBe(start);
  });

  it("returns safe empty recommendations for empty availability", () => {
    const recommendations = computeRecommendations(participants, [], [], settings, []);

    expect(recommendations.best_overall).toBeNull();
    expect(recommendations.top_candidates).toEqual([]);
  });
});
