-- Seed data for local development
-- Represents a dinner event with 4 participants

-- Event: Friday night dinner
INSERT OR IGNORE INTO events (
  id, title, description, event_type, timezone,
  date_range_start, date_range_end,
  meeting_duration_minutes, slot_granularity_minutes,
  min_attendance_threshold, allow_participant_edit,
  show_results_to_participants, scoring_mode,
  status, created_at, updated_at
) VALUES (
  'demo-event-001',
  'Friday Dinner',
  'Catching up over a nice dinner — open to anywhere in the city.',
  'dinner',
  'America/New_York',
  1749841200,  -- Fri 5:00pm
  1750035600,  -- Sun 11:00pm
  120, 30,
  2, 1, 1,
  'maximize_attendance',
  'active',
  (unixepoch()), (unixepoch())
);

-- Organizer participant
INSERT OR IGNORE INTO participants (id, event_id, name, email, role, is_required, response_status, created_at, updated_at)
VALUES ('demo-org-001', 'demo-event-001', 'Alex', 'alex@example.com', 'organizer', 1, 'responded', (unixepoch()), (unixepoch()));

-- Organizer token
INSERT OR IGNORE INTO invite_tokens (id, event_id, participant_id, token, role, is_active, created_at)
VALUES ('demo-org-token-001', 'demo-event-001', 'demo-org-001', 'demo-organizer-token-aaabbbcccdddeeefffggg0001', 'organizer', 1, (unixepoch()));

-- Participants
INSERT OR IGNORE INTO participants (id, event_id, name, email, role, is_required, response_status, created_at, updated_at)
VALUES
  ('demo-p-001', 'demo-event-001', 'Jordan', 'jordan@example.com', 'participant', 1, 'responded', (unixepoch()), (unixepoch())),
  ('demo-p-002', 'demo-event-001', 'Sam', 'sam@example.com', 'participant', 0, 'responded', (unixepoch()), (unixepoch())),
  ('demo-p-003', 'demo-event-001', 'Riley', 'riley@example.com', 'participant', 0, 'pending', (unixepoch()), (unixepoch()));

-- Participant invite tokens
INSERT OR IGNORE INTO invite_tokens (id, event_id, participant_id, token, role, is_active, created_at)
VALUES
  ('demo-t-001', 'demo-event-001', 'demo-p-001', 'demo-participant-token-jordan-0001aaabbb', 'participant', 1, (unixepoch())),
  ('demo-t-002', 'demo-event-001', 'demo-p-002', 'demo-participant-token-sam-000111aaabbb', 'participant', 1, (unixepoch())),
  ('demo-t-003', 'demo-event-001', 'demo-p-003', 'demo-participant-token-riley-0001aaabbbc', 'participant', 1, (unixepoch()));

-- Jordan's availability: Friday 6-9pm, Saturday 5-8pm
INSERT OR IGNORE INTO availability_windows (id, event_id, participant_id, start_time, end_time, created_at)
VALUES
  ('demo-aw-001', 'demo-event-001', 'demo-p-001', 1749844800, 1749855600, (unixepoch())),  -- Fri 6-9pm
  ('demo-aw-002', 'demo-event-001', 'demo-p-001', 1749927600, 1749938400, (unixepoch()));  -- Sat 5-8pm

-- Sam's availability: Friday 7-10pm, Sunday 6-9pm
INSERT OR IGNORE INTO availability_windows (id, event_id, participant_id, start_time, end_time, created_at)
VALUES
  ('demo-aw-003', 'demo-event-001', 'demo-p-002', 1749848400, 1749859200, (unixepoch())),  -- Fri 7-10pm
  ('demo-aw-004', 'demo-event-001', 'demo-p-002', 1750010400, 1750021200, (unixepoch()));  -- Sun 6-9pm

-- Jordan's preferences
INSERT OR IGNORE INTO participant_preferences (id, event_id, participant_id, food_preference, budget_preference, preferred_day_type, preferred_time_of_day, indoor_outdoor, notes, created_at, updated_at)
VALUES ('demo-pref-001', 'demo-event-001', 'demo-p-001', 'veg', 'medium', 'weekend', 'evening', 'indoor', 'Near public transit please', (unixepoch()), (unixepoch()));

-- Sam's preferences
INSERT OR IGNORE INTO participant_preferences (id, event_id, participant_id, food_preference, budget_preference, preferred_day_type, preferred_time_of_day, indoor_outdoor, notes, created_at, updated_at)
VALUES ('demo-pref-002', 'demo-event-001', 'demo-p-002', 'non_veg', 'medium', 'no_preference', 'evening', 'no_preference', 'Anywhere is fine!', (unixepoch()), (unixepoch()));

-- Normalized slots for Jordan (Friday 6:00–8:30 PM in 30-min chunks)
INSERT OR IGNORE INTO normalized_slots (id, event_id, participant_id, slot_start, slot_end, created_at)
VALUES
  ('demo-ns-001', 'demo-event-001', 'demo-p-001', 1749844800, 1749846600, (unixepoch())),
  ('demo-ns-002', 'demo-event-001', 'demo-p-001', 1749846600, 1749848400, (unixepoch())),
  ('demo-ns-003', 'demo-event-001', 'demo-p-001', 1749848400, 1749850200, (unixepoch())),
  ('demo-ns-004', 'demo-event-001', 'demo-p-001', 1749850200, 1749852000, (unixepoch())),
  ('demo-ns-005', 'demo-event-001', 'demo-p-001', 1749852000, 1749853800, (unixepoch()));

-- Normalized slots for Sam (Friday 7:00–9:30 PM)
INSERT OR IGNORE INTO normalized_slots (id, event_id, participant_id, slot_start, slot_end, created_at)
VALUES
  ('demo-ns-006', 'demo-event-001', 'demo-p-002', 1749848400, 1749850200, (unixepoch())),
  ('demo-ns-007', 'demo-event-001', 'demo-p-002', 1749850200, 1749852000, (unixepoch())),
  ('demo-ns-008', 'demo-event-001', 'demo-p-002', 1749852000, 1749853800, (unixepoch())),
  ('demo-ns-009', 'demo-event-001', 'demo-p-002', 1749853800, 1749855600, (unixepoch())),
  ('demo-ns-010', 'demo-event-001', 'demo-p-002', 1749855600, 1749857400, (unixepoch()));

-- Activity log
INSERT OR IGNORE INTO activity_log (id, event_id, actor_id, action, data, created_at)
VALUES
  ('demo-al-001', 'demo-event-001', 'demo-org-001', 'event_created', '{"title":"Friday Dinner"}', (unixepoch())),
  ('demo-al-002', 'demo-event-001', 'demo-p-001', 'response_submitted', '{"windows_count":2}', (unixepoch())),
  ('demo-al-003', 'demo-event-001', 'demo-p-002', 'response_submitted', '{"windows_count":2}', (unixepoch()));
