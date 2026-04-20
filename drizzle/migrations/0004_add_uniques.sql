DROP INDEX IF EXISTS idx_final_event_id;
CREATE UNIQUE INDEX IF NOT EXISTS idx_final_event_id ON final_selections (event_id);

CREATE UNIQUE INDEX IF NOT EXISTS idx_prefs_event_participant ON participant_preferences (event_id, participant_id);
