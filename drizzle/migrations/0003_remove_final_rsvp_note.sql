-- Final RSVPs are yes/no only. Remove the unused free-text note storage.

ALTER TABLE `participants` DROP COLUMN `final_rsvp_note`;
