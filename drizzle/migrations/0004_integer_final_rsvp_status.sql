-- Store final RSVP state as integer codes: 0 pending, 1 yes, 2 no.

PRAGMA foreign_keys=OFF;

CREATE TABLE `participants_new` (
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

INSERT INTO `participants_new` (
  `id`,
  `event_id`,
  `name`,
  `email`,
  `phone`,
  `role`,
  `is_required`,
  `priority_tier`,
  `response_status`,
  `final_rsvp_status`,
  `final_rsvp_updated_at`,
  `created_at`,
  `updated_at`
)
SELECT
  `id`,
  `event_id`,
  `name`,
  `email`,
  `phone`,
  `role`,
  `is_required`,
  `priority_tier`,
  `response_status`,
  CASE `final_rsvp_status`
    WHEN 'yes' THEN 1
    WHEN 'no' THEN 2
    ELSE 0
  END,
  `final_rsvp_updated_at`,
  `created_at`,
  `updated_at`
FROM `participants`;

DROP TABLE `participants`;
ALTER TABLE `participants_new` RENAME TO `participants`;

CREATE INDEX IF NOT EXISTS `idx_participants_event_id` ON `participants` (`event_id`);
CREATE INDEX IF NOT EXISTS `idx_participants_role` ON `participants` (`role`);
CREATE INDEX IF NOT EXISTS `idx_participants_response_status` ON `participants` (`response_status`);

PRAGMA foreign_keys=ON;
PRAGMA foreign_key_check;
