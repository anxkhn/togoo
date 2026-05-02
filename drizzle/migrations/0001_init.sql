-- Migration: Squashed current schema

CREATE TABLE IF NOT EXISTS `events` (
  `id` text PRIMARY KEY NOT NULL,
  `title` text NOT NULL,
  `description` text,
  `event_type` text NOT NULL DEFAULT 'meetup',
  `timezone` text NOT NULL DEFAULT 'UTC',
  `date_range_start` integer NOT NULL,
  `date_range_end` integer NOT NULL,
  `meeting_duration_minutes` integer NOT NULL DEFAULT 120,
  `slot_granularity_minutes` integer NOT NULL DEFAULT 30,
  `min_attendance_threshold` integer NOT NULL DEFAULT 0,
  `participants_required_by_default` integer NOT NULL DEFAULT 0,
  `allow_participant_edit` integer NOT NULL DEFAULT 1,
  `show_results_to_participants` integer NOT NULL DEFAULT 0,
  `preferences_required` integer NOT NULL DEFAULT 0,
  `enabled_preferences` text NOT NULL DEFAULT '[]',
  `scoring_mode` text NOT NULL DEFAULT 'maximize_attendance',
  `suggested_time_start` integer,
  `suggested_time_end` integer,
  `organizer_participant_id` text,
  `status` text NOT NULL DEFAULT 'active',
  `response_deadline` integer,
  `created_at` integer NOT NULL DEFAULT (unixepoch()),
  `updated_at` integer NOT NULL DEFAULT (unixepoch())
);

CREATE INDEX IF NOT EXISTS `idx_events_status` ON `events` (`status`);

CREATE TABLE IF NOT EXISTS `participants` (
  `id` text PRIMARY KEY NOT NULL,
  `event_id` text NOT NULL REFERENCES `events`(`id`) ON DELETE CASCADE,
  `name` text NOT NULL,
  `email` text,
  `phone` text,
  `role` text NOT NULL DEFAULT 'participant',
  `is_required` integer NOT NULL DEFAULT 0,
  `priority_tier` integer NOT NULL DEFAULT 0,
  `response_status` text NOT NULL DEFAULT 'pending',
  `final_rsvp_status` integer NOT NULL DEFAULT 0,
  `final_rsvp_updated_at` integer,
  `created_at` integer NOT NULL DEFAULT (unixepoch()),
  `updated_at` integer NOT NULL DEFAULT (unixepoch())
);

CREATE INDEX IF NOT EXISTS `idx_participants_event_id` ON `participants` (`event_id`);
CREATE INDEX IF NOT EXISTS `idx_participants_role` ON `participants` (`role`);
CREATE INDEX IF NOT EXISTS `idx_participants_response_status` ON `participants` (`response_status`);

CREATE TABLE IF NOT EXISTS `invite_tokens` (
  `id` text PRIMARY KEY NOT NULL,
  `event_id` text NOT NULL REFERENCES `events`(`id`) ON DELETE CASCADE,
  `participant_id` text NOT NULL REFERENCES `participants`(`id`) ON DELETE CASCADE,
  `token` text NOT NULL,
  `role` text NOT NULL,
  `is_active` integer NOT NULL DEFAULT 1,
  `created_at` integer NOT NULL DEFAULT (unixepoch()),
  `expires_at` integer
);

CREATE UNIQUE INDEX IF NOT EXISTS `idx_invite_tokens_token` ON `invite_tokens` (`token`);
CREATE INDEX IF NOT EXISTS `idx_invite_tokens_event_id` ON `invite_tokens` (`event_id`);
CREATE INDEX IF NOT EXISTS `idx_invite_tokens_participant_id` ON `invite_tokens` (`participant_id`);
CREATE INDEX IF NOT EXISTS `idx_invite_tokens_role` ON `invite_tokens` (`role`);

CREATE TABLE IF NOT EXISTS `availability_windows` (
  `id` text PRIMARY KEY NOT NULL,
  `event_id` text NOT NULL REFERENCES `events`(`id`) ON DELETE CASCADE,
  `participant_id` text NOT NULL REFERENCES `participants`(`id`) ON DELETE CASCADE,
  `start_time` integer NOT NULL,
  `end_time` integer NOT NULL,
  `created_at` integer NOT NULL DEFAULT (unixepoch())
);

CREATE INDEX IF NOT EXISTS `idx_availability_event_id` ON `availability_windows` (`event_id`);
CREATE INDEX IF NOT EXISTS `idx_availability_participant_id` ON `availability_windows` (`participant_id`);
CREATE INDEX IF NOT EXISTS `idx_availability_start_time` ON `availability_windows` (`start_time`);

CREATE TABLE IF NOT EXISTS `participant_preferences` (
  `id` text PRIMARY KEY NOT NULL,
  `event_id` text NOT NULL REFERENCES `events`(`id`) ON DELETE CASCADE,
  `participant_id` text NOT NULL REFERENCES `participants`(`id`) ON DELETE CASCADE,
  `preferred_area` text,
  `food_preference` text DEFAULT 'no_preference',
  `food_note` text,
  `budget_preference` text DEFAULT 'no_preference',
  `preferred_day_type` text DEFAULT 'no_preference',
  `preferred_time_of_day` text DEFAULT 'no_preference',
  `indoor_outdoor` text DEFAULT 'no_preference',
  `notes` text,
  `created_at` integer NOT NULL DEFAULT (unixepoch()),
  `updated_at` integer NOT NULL DEFAULT (unixepoch())
);

CREATE INDEX IF NOT EXISTS `idx_prefs_event_id` ON `participant_preferences` (`event_id`);
CREATE INDEX IF NOT EXISTS `idx_prefs_participant_id` ON `participant_preferences` (`participant_id`);
CREATE UNIQUE INDEX IF NOT EXISTS `idx_prefs_event_participant` ON `participant_preferences` (`event_id`, `participant_id`);

CREATE TABLE IF NOT EXISTS `organizer_overrides` (
  `id` text PRIMARY KEY NOT NULL,
  `event_id` text NOT NULL REFERENCES `events`(`id`) ON DELETE CASCADE,
  `organizer_participant_id` text NOT NULL,
  `override_type` text NOT NULL,
  `data` text NOT NULL,
  `created_at` integer NOT NULL DEFAULT (unixepoch())
);

CREATE INDEX IF NOT EXISTS `idx_overrides_event_id` ON `organizer_overrides` (`event_id`);

CREATE TABLE IF NOT EXISTS `normalized_slots` (
  `id` text PRIMARY KEY NOT NULL,
  `event_id` text NOT NULL REFERENCES `events`(`id`) ON DELETE CASCADE,
  `participant_id` text NOT NULL REFERENCES `participants`(`id`) ON DELETE CASCADE,
  `slot_start` integer NOT NULL,
  `slot_end` integer NOT NULL,
  `created_at` integer NOT NULL DEFAULT (unixepoch())
);

CREATE INDEX IF NOT EXISTS `idx_slots_event_id` ON `normalized_slots` (`event_id`);
CREATE INDEX IF NOT EXISTS `idx_slots_participant_id` ON `normalized_slots` (`participant_id`);
CREATE INDEX IF NOT EXISTS `idx_slots_slot_start` ON `normalized_slots` (`slot_start`);

CREATE TABLE IF NOT EXISTS `recommendation_snapshots` (
  `id` text PRIMARY KEY NOT NULL,
  `event_id` text NOT NULL REFERENCES `events`(`id`) ON DELETE CASCADE,
  `computed_at` integer NOT NULL DEFAULT (unixepoch()),
  `recommendations` text NOT NULL,
  `total_responded` integer NOT NULL DEFAULT 0
);

CREATE INDEX IF NOT EXISTS `idx_rec_snapshots_event_id` ON `recommendation_snapshots` (`event_id`);

CREATE TABLE IF NOT EXISTS `final_selections` (
  `id` text PRIMARY KEY NOT NULL,
  `event_id` text NOT NULL REFERENCES `events`(`id`) ON DELETE CASCADE,
  `slot_start` integer NOT NULL,
  `slot_end` integer NOT NULL,
  `location_name` text,
  `location_address` text,
  `google_maps_url` text,
  `invite_message` text,
  `notes` text,
  `selected_by` text NOT NULL,
  `finalized_at` integer NOT NULL DEFAULT (unixepoch())
);

CREATE UNIQUE INDEX IF NOT EXISTS `idx_final_event_id` ON `final_selections` (`event_id`);

CREATE TABLE IF NOT EXISTS `activity_log` (
  `id` text PRIMARY KEY NOT NULL,
  `event_id` text NOT NULL REFERENCES `events`(`id`) ON DELETE CASCADE,
  `actor_id` text,
  `action` text NOT NULL,
  `data` text,
  `created_at` integer NOT NULL DEFAULT (unixepoch())
);

CREATE INDEX IF NOT EXISTS `idx_activity_event_id` ON `activity_log` (`event_id`);
CREATE INDEX IF NOT EXISTS `idx_activity_created_at` ON `activity_log` (`created_at`);
