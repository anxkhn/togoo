-- Add final invite details and final RSVP tracking.

ALTER TABLE `participants` ADD COLUMN `final_rsvp_status` text NOT NULL DEFAULT 'pending';
ALTER TABLE `participants` ADD COLUMN `final_rsvp_note` text;
ALTER TABLE `participants` ADD COLUMN `final_rsvp_updated_at` integer;

ALTER TABLE `final_selections` ADD COLUMN `location_name` text;
ALTER TABLE `final_selections` ADD COLUMN `location_address` text;
ALTER TABLE `final_selections` ADD COLUMN `google_maps_url` text;
ALTER TABLE `final_selections` ADD COLUMN `invite_message` text;
