import { z } from "zod";

export const CreateEventSchema = z.object({
  title: z.string().min(1).max(100),
  description: z.string().max(1000).optional(),
  event_type: z.enum(["dinner", "meetup", "hangout", "work_session", "custom"]).default("meetup"),
  timezone: z.string().min(1),
  date_range_start: z.number().int().positive(),
  date_range_end: z.number().int().positive(),
  allowed_hours_start: z.number().int().min(0).max(23).default(9),
  allowed_hours_end: z.number().int().min(1).max(24).default(22),
  meeting_duration_minutes: z.number().int().min(15).max(480).default(120),
  slot_granularity_minutes: z.union([z.literal(15), z.literal(30)]).default(30),
  min_attendance_threshold: z.number().int().min(0).default(0),
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
});

export const AddParticipantSchema = z.object({
  name: z.string().min(1).max(100),
  email: z.string().email().optional().or(z.literal("")),
  phone: z.string().max(20).optional().or(z.literal("")),
  is_required: z.boolean().default(false),
  priority_tier: z.union([z.literal(0), z.literal(1), z.literal(2)]).default(0),
  token_expires_hours: z.number().int().positive().optional(),
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
      max_travel_distance: z.number().int().min(0).max(200).optional(),
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
  notes: z.string().max(500).optional(),
});
