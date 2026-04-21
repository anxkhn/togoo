import { getTimeCategory, getHourInTimezone, getDayOfWeekInTimezone } from "./utils";

export interface AvailabilityWindow {
  participant_id: string;
  start_time: number;
  end_time: number;
}

export interface NormalizedSlot {
  participant_id: string;
  slot_start: number;
  slot_end: number;
}

export interface Participant {
  id: string;
  is_required: number;
  response_status: string;
  priority_tier?: number; // 0 = regular, 1 = ★, 2 = ★★
}

export interface Preference {
  participant_id: string;
  preferred_day_type: string | null;
  preferred_time_of_day: string | null;
  food_preference: string | null;
  budget_preference: string | null;
  indoor_outdoor: string | null;
}

export interface ScoredMeeting {
  start: number;
  end: number;
  attendingIds: string[];
  attendingCount: number;
  requiredAttending: number;
  totalParticipants: number;
  totalRequired: number;
  attendanceScore: number;
  requiredScore: number;
  timePrefScore: number;
  dayTypePrefScore: number;
  compositeScore: number;
  timeCategory: string;
  isWeekend: boolean;
  label?: string;
  explanation?: string;
}

export interface RecommendationSet {
  best_overall: ScoredMeeting | null;
  best_attendance: ScoredMeeting | null;
  best_required_match: ScoredMeeting | null;
  best_time_fit: ScoredMeeting | null;
  most_popular: ScoredMeeting | null;
  top_candidates: ScoredMeeting[];
}

export interface EventSettings {
  timezone: string;
  date_range_start?: number;
  date_range_end?: number;
  meeting_duration_minutes: number;
  slot_granularity_minutes: number;
  scoring_mode: string;
  min_attendance_threshold?: number;
}

export interface OrganizerOverride {
  override_type: string;
  data: string;
}

export function normalizeAvailabilityWindows(
  windows: AvailabilityWindow[],
  settings: EventSettings
): NormalizedSlot[] {
  const {
    slot_granularity_minutes,
    timezone,
    date_range_start,
    date_range_end,
  } = settings;
  const granularitySec = slot_granularity_minutes * 60;
  const slots: NormalizedSlot[] = [];

  for (const win of windows) {
    let current = Math.ceil(win.start_time / granularitySec) * granularitySec;
    while (current + granularitySec <= win.end_time) {
      const slotEnd = current + granularitySec;
      const withinDateRange =
        (date_range_start === undefined || current >= date_range_start) &&
        (date_range_end === undefined || slotEnd - 1 <= date_range_end);

      if (withinDateRange) {
        slots.push({
          participant_id: win.participant_id,
          slot_start: current,
          slot_end: slotEnd,
        });
      }
      current += granularitySec;
    }
  }

  return slots;
}

function applyOverrides(
  candidates: ScoredMeeting[],
  overrides: OrganizerOverride[]
): ScoredMeeting[] {
  const blocked: Array<{ start: number; end: number }> = [];
  const forceExclude: number[] = [];
  const forceInclude = new Set<number>();

  for (const override of overrides) {
    const data = JSON.parse(override.data);
    if (override.override_type === "block_time") {
      blocked.push({ start: data.start_time, end: data.end_time });
    } else if (override.override_type === "force_include") {
      forceInclude.add(data.slot_start);
    } else if (override.override_type === "force_exclude") {
      forceExclude.push(data.slot_start);
    }
  }

  return candidates.filter((c) => {
    if (forceInclude.has(c.start)) return true;
    if (forceExclude.includes(c.start)) return false;
    for (const block of blocked) {
      if (c.start < block.end && c.end > block.start) return false;
    }
    return true;
  });
}

function buildExplanation(m: ScoredMeeting): string {
  const attendancePct = Math.round((m.attendingCount / m.totalParticipants) * 100);
  const parts: string[] = [];

  parts.push(`Works for ${m.attendingCount} of ${m.totalParticipants} people (${attendancePct}%)`);

  if (m.totalRequired > 0) {
    if (m.requiredAttending === m.totalRequired) {
      parts.push("includes all required attendees");
    } else {
      parts.push(`${m.requiredAttending}/${m.totalRequired} required attendees`);
    }
  }

  const timeLabel = m.timeCategory.replace("_", " ");
  parts.push(`${m.isWeekend ? "weekend" : "weekday"} ${timeLabel}`);

  return parts.join(", ") + ".";
}

function tierWeight(tier: number | undefined): number {
  if (tier === 2) return 4;
  if (tier === 1) return 2;
  return 1;
}

export function computeRecommendations(
  participants: Participant[],
  slots: NormalizedSlot[],
  preferences: Preference[],
  settings: EventSettings,
  overrides: OrganizerOverride[]
): RecommendationSet {
  const {
    date_range_start,
    date_range_end,
    meeting_duration_minutes,
    slot_granularity_minutes,
    timezone,
    scoring_mode,
    min_attendance_threshold = 0,
  } = settings;
  const slotsPerMeeting = Math.ceil(meeting_duration_minutes / slot_granularity_minutes);
  const granularitySec = slot_granularity_minutes * 60;

  const attendanceBySlot = new Map<number, Set<string>>();
  for (const slot of slots) {
    if (!attendanceBySlot.has(slot.slot_start)) {
      attendanceBySlot.set(slot.slot_start, new Set());
    }
    attendanceBySlot.get(slot.slot_start)!.add(slot.participant_id);
  }

  const allSlotStarts = [...attendanceBySlot.keys()].sort((a, b) => a - b);
  const prefMap = new Map<string, Preference>(preferences.map((p) => [p.participant_id, p]));
  const respondedParticipants = participants.filter((p) => p.response_status === "responded");
  const totalTierWeight = respondedParticipants.reduce((sum, p) => sum + tierWeight(p.priority_tier), 0);

  const candidates: ScoredMeeting[] = [];

  for (let i = 0; i < allSlotStarts.length; i++) {
    const windowStart = allSlotStarts[i];

    let valid = true;
    const attending = new Set(attendanceBySlot.get(windowStart) ?? []);

    for (let j = 1; j < slotsPerMeeting; j++) {
      const expectedSlot = windowStart + j * granularitySec;
      if (!attendanceBySlot.has(expectedSlot)) {
        valid = false;
        break;
      }
      const slotAttendees = attendanceBySlot.get(expectedSlot) ?? new Set<string>();
      for (const pid of [...attending]) {
        if (!slotAttendees.has(pid)) attending.delete(pid);
      }
    }

    if (!valid || attending.size === 0) continue;

    const windowEnd = windowStart + meeting_duration_minutes * 60;
    if (
      (date_range_start !== undefined && windowStart < date_range_start) ||
      (date_range_end !== undefined && windowEnd - 1 > date_range_end)
    ) {
      continue;
    }

    const attendingIds = [...attending];

    const requiredParticipants = respondedParticipants.filter((p) => p.is_required === 1);
    const requiredAttending = requiredParticipants.filter((p) => attendingIds.includes(p.id)).length;
    const totalRequired = requiredParticipants.length;

    const attendanceScore = respondedParticipants.length > 0 ? attendingIds.length / respondedParticipants.length : 0;
    const requiredScore = totalRequired > 0 ? requiredAttending / totalRequired : 1;

    const attendingWeight = attendingIds.reduce((sum, pid) => {
      const p = respondedParticipants.find((rp) => rp.id === pid);
      return sum + tierWeight(p?.priority_tier);
    }, 0);
    const weightedAttendanceScore = totalTierWeight > 0 ? attendingWeight / totalTierWeight : attendanceScore;

    const hour = getHourInTimezone(windowStart, timezone);
    const timeCategory = getTimeCategory(hour);
    const dayOfWeek = getDayOfWeekInTimezone(windowStart, timezone);
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;

    let timePrefTotal = 0;
    let dayTypePrefTotal = 0;
    for (const pid of attendingIds) {
      const pref = prefMap.get(pid);
      const timePref = pref?.preferred_time_of_day ?? "no_preference";
      const dayPref = pref?.preferred_day_type ?? "no_preference";

      timePrefTotal += timePref === "no_preference" || timePref === timeCategory ? 1 : 0.25;
      dayTypePrefTotal +=
        dayPref === "no_preference" ? 1 : (dayPref === "weekend") === isWeekend ? 1 : 0.25;
    }

    const timePrefScore = attendingIds.length > 0 ? timePrefTotal / attendingIds.length : 1;
    const dayTypePrefScore = attendingIds.length > 0 ? dayTypePrefTotal / attendingIds.length : 1;

    let compositeScore: number;
    switch (scoring_mode) {
      case "prioritize_required":
        compositeScore =
          0.2 * attendanceScore + 0.55 * requiredScore + 0.15 * timePrefScore + 0.1 * dayTypePrefScore;
        break;
      case "vip_priority":
        compositeScore =
          0.15 * attendanceScore +
          0.15 * requiredScore +
          0.6 * weightedAttendanceScore +
          0.1 * timePrefScore;
        break;
      case "time_optimized":
        compositeScore =
          0.3 * attendanceScore + 0.15 * requiredScore + 0.4 * timePrefScore + 0.15 * dayTypePrefScore;
        break;
      default: // maximize_attendance
        compositeScore =
          0.5 * attendanceScore + 0.3 * requiredScore + 0.12 * timePrefScore + 0.08 * dayTypePrefScore;
    }

    candidates.push({
      start: windowStart,
      end: windowEnd,
      attendingIds,
      attendingCount: attendingIds.length,
      requiredAttending,
      totalParticipants: respondedParticipants.length,
      totalRequired,
      attendanceScore,
      requiredScore,
      timePrefScore,
      dayTypePrefScore,
      compositeScore,
      timeCategory,
      isWeekend,
    });
  }

  const thresholdFiltered = candidates.filter((candidate) => candidate.attendingCount >= min_attendance_threshold);
  const filtered = applyOverrides(thresholdFiltered, overrides);
  const sorted = [...filtered].sort((a, b) => b.compositeScore - a.compositeScore);

  const bestOverall = sorted[0] ?? null;
  const bestAttendance = [...filtered].sort((a, b) => b.attendingCount - a.attendingCount)[0] ?? null;
  const bestRequired =
    [...filtered].sort(
      (a, b) => b.requiredScore - a.requiredScore || b.attendingCount - a.attendingCount
    )[0] ?? null;
  const bestTimeFit =
    [...filtered].sort(
      (a, b) => b.timePrefScore - a.timePrefScore || b.attendingCount - a.attendingCount
    )[0] ?? null;

  const withExplanations = (m: ScoredMeeting | null, label: string): ScoredMeeting | null => {
    if (!m) return null;
    return { ...m, label, explanation: `${label}: ${buildExplanation(m)}` };
  };

  return {
    best_overall: withExplanations(bestOverall, "Best overall"),
    best_attendance: withExplanations(bestAttendance, "Best attendance"),
    best_required_match: withExplanations(bestRequired, "Best required-attendee match"),
    best_time_fit: withExplanations(bestTimeFit, "Best time fit"),
    most_popular: withExplanations(bestAttendance, "Most popular timing"),
    top_candidates: sorted.slice(0, 10).map((c) => ({ ...c, explanation: buildExplanation(c) })),
  };
}
