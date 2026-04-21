CREATE TABLE IF NOT EXISTS `rate_limits` (
  `scope` text NOT NULL,
  `identifier` text NOT NULL,
  `bucket_start` integer NOT NULL,
  `count` integer NOT NULL DEFAULT 1,
  `updated_at` integer NOT NULL DEFAULT (unixepoch())
);

CREATE UNIQUE INDEX IF NOT EXISTS `idx_rate_limits_scope_identifier_bucket`
  ON `rate_limits` (`scope`, `identifier`, `bucket_start`);

CREATE INDEX IF NOT EXISTS `idx_rate_limits_updated_at`
  ON `rate_limits` (`updated_at`);
