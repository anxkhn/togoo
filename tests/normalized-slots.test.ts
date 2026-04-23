import { describe, expect, it } from "vitest";
import { insertNormalizedSlots } from "../lib/normalized-slots";

function createDbRecorder() {
  const batches: unknown[][] = [];
  return {
    batches,
    db: {
      insert: () => ({
        values: async (rows: unknown[]) => {
          batches.push(rows);
        },
      }),
    },
  };
}

describe("normalized slot insertion", () => {
  it("splits large slot arrays into bounded insert batches", async () => {
    const recorder = createDbRecorder();
    const slots = Array.from({ length: 25 }, (_, index) => ({
      participant_id: "p1",
      slot_start: 1_800 + index * 1_800,
      slot_end: 3_600 + index * 1_800,
    }));

    await insertNormalizedSlots(recorder.db as never, "event-1", slots, 123);

    expect(recorder.batches.map((batch) => batch.length)).toEqual([10, 10, 5]);
  });

  it("treats empty slot arrays as safe no-ops", async () => {
    const recorder = createDbRecorder();

    await insertNormalizedSlots(recorder.db as never, "event-1", [], 123);

    expect(recorder.batches).toEqual([]);
  });
});
