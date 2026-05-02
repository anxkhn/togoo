import { z } from "zod";

export const CreateEventSchema = z.object({
  title: z.string().min(1).max(100),
  description: z.string().max(1000).optional(),
  event_type: z.enum(["dinner", "meetup", "hangout", "work_session", "custom"]).default("meetup"),
  timezone: z.string().min(1),
  date_range_start: z.number().int().positive(),
  date_range_end: z.number().int().positive(),
  meeting_duration_minutes: z.number().int().min(15).max(480).default(120),
  slot_granularity_minutes: z.union([z.literal(15), z.literal(30), z.literal(60), z.literal(120), z.literal(360)]).default(60),
  min_attendance_threshold: z.number().int().min(0).default(0),
  suggested_time_start: z.number().int().positive().optional(),
  suggested_time_end: z.number().int().positive().optional(),
  participants_required_by_default: z.boolean().default(false),
  allow_participant_edit: z.boolean().default(true),
  show_results_to_participants: z.boolean().default(false),
  preferences_required: z.boolean().default(false),
  enabled_preferences: z
    .array(z.string())
    .default(["food", "budget", "location", "day_type", "time_of_day", "indoor_outdoor"]),
  scoring_mode: z
    .enum(["maximize_attendance", "prioritize_required", "vip_priority", "time_optimized"])
    .default("maximize_attendance"),
  response_deadline: z.number().int().positive().optional(),
  organizer_name: z.string().min(1).max(100),
  organizer_email: z.string().email().optional(),
}).superRefine((data, ctx) => {
  if (data.date_range_end <= data.date_range_start) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "End date and time must be after the start date and time",
      path: ["date_range_end"],
    });
  }

  const hasSuggestedStart = data.suggested_time_start !== undefined;
  const hasSuggestedEnd = data.suggested_time_end !== undefined;

  if (hasSuggestedStart !== hasSuggestedEnd) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Suggested time needs both a start and an end",
      path: [hasSuggestedStart ? "suggested_time_end" : "suggested_time_start"],
    });
  }

  if (hasSuggestedStart && hasSuggestedEnd && data.suggested_time_end! <= data.suggested_time_start!) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Suggested end time must be after the start time",
      path: ["suggested_time_end"],
    });
  }

  if (hasSuggestedStart && data.suggested_time_start! < data.date_range_start) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Suggested start must be inside the event range",
      path: ["suggested_time_start"],
    });
  }

  if (hasSuggestedEnd && data.suggested_time_end! > data.date_range_end) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Suggested end must be inside the event range",
      path: ["suggested_time_end"],
    });
  }

});

export const UpdateEventSchema = z.object({
  title: z.string().min(1).max(100),
  description: z.string().max(1000).optional(),
  event_type: z.enum(["dinner", "meetup", "hangout", "work_session", "custom"]),
  timezone: z.string().min(1),
  date_range_start: z.number().int().positive(),
  date_range_end: z.number().int().positive(),
  meeting_duration_minutes: z.number().int().min(15).max(480),
  slot_granularity_minutes: z.union([z.literal(15), z.literal(30), z.literal(60), z.literal(120), z.literal(360)]),
  scoring_mode: z.enum(["maximize_attendance", "prioritize_required", "vip_priority", "time_optimized"]),
  suggested_time_start: z.number().int().positive().nullable().optional(),
  suggested_time_end: z.number().int().positive().nullable().optional(),
  participants_required_by_default: z.boolean(),
  allow_participant_edit: z.boolean(),
  show_results_to_participants: z.boolean(),
  preferences_required: z.boolean(),
  response_deadline: z.number().int().positive().nullable().optional(),
  enabled_preferences: z.array(z.string()),
}).superRefine((data, ctx) => {
  if (data.date_range_end <= data.date_range_start) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "End date and time must be after the start date and time",
      path: ["date_range_end"],
    });
  }

  const hasSuggestedStart = data.suggested_time_start !== undefined && data.suggested_time_start !== null;
  const hasSuggestedEnd = data.suggested_time_end !== undefined && data.suggested_time_end !== null;

  if (hasSuggestedStart !== hasSuggestedEnd) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Suggested time needs both a start and an end",
      path: [hasSuggestedStart ? "suggested_time_end" : "suggested_time_start"],
    });
  }

  if (hasSuggestedStart && hasSuggestedEnd && data.suggested_time_end! <= data.suggested_time_start!) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Suggested end time must be after the start time",
      path: ["suggested_time_end"],
    });
  }

  if (hasSuggestedStart && data.suggested_time_start! < data.date_range_start) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Suggested start must be inside the event range",
      path: ["suggested_time_start"],
    });
  }

  if (hasSuggestedEnd && data.suggested_time_end! > data.date_range_end) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Suggested end must be inside the event range",
      path: ["suggested_time_end"],
    });
  }

});

export const AddParticipantSchema = z.object({
  name: z.string().min(1).max(100),
  email: z.string().email().optional().or(z.literal("")),
  phone: z.string().max(20).optional().or(z.literal("")),
  is_required: z.boolean().default(false),
  priority_tier: z.union([z.literal(0), z.literal(1), z.literal(2)]).default(0),
});

export const UpdateParticipantSchema = z.object({
  name: z.string().min(1).max(100).optional(),
  email: z.string().email().optional().or(z.literal("")),
  phone: z.string().max(20).optional().or(z.literal("")),
  is_required: z.boolean().optional(),
  priority_tier: z.union([z.literal(0), z.literal(1), z.literal(2)]).optional(),
});

export const SubmitResponseSchema = z.object({
  token: z.string().min(24).max(64),
  availability_windows: z
    .array(
      z.object({
        start_time: z.number().int().positive(),
        end_time: z.number().int().positive(),
      })
    )
    .min(1)
    .max(20),
  preferences: z
    .object({
      preferred_area: z.string().max(200).optional(),
      food_preference: z
        .enum(["veg", "non_veg", "vegan", "jain", "halal", "eggetarian", "no_preference", "custom"])
        .default("no_preference"),
      food_note: z.string().max(300).optional(),
      budget_preference: z.enum(["low", "medium", "high", "no_preference"]).default("no_preference"),
      preferred_day_type: z.enum(["weekday", "weekend", "no_preference"]).default("no_preference"),
      preferred_time_of_day: z
        .enum(["morning", "afternoon", "evening", "late_night", "no_preference"])
        .default("no_preference"),
      indoor_outdoor: z.enum(["indoor", "outdoor", "no_preference"]).default("no_preference"),
      notes: z.string().max(500).optional(),
    })
    .optional(),
});

export const OrganizerOverrideSchema = z.object({
  override_type: z.enum(["block_time", "force_include", "force_exclude"]),
  data: z.record(z.unknown()),
});

export const FinalizeEventSchema = z.object({
  slot_start: z.number().int().positive(),
  slot_end: z.number().int().positive(),
  location_name: z.string().trim().min(1).max(200),
  location_address: z.string().trim().min(1).max(500),
  google_maps_url: z.string().trim().url().max(1000),
  invite_message: z.string().max(1000).optional(),
  notes: z.string().max(500).optional(),
});

export const FinalRsvpSchema = z.object({
  token: z.string().min(24).max(64),
  status: z.enum(["yes", "no"]),
});
