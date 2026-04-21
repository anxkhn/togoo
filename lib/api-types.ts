export interface EventData {
  id: string;
  title: string;
  description: string | null;
  event_type: string;
  timezone: string;
  date_range_start: number;
  date_range_end: number;
  allowed_hours_start: number;
  allowed_hours_end: number;
  meeting_duration_minutes: number;
  slot_granularity_minutes: number;
  min_attendance_threshold: number;
  suggested_time_start: number | null;
  suggested_time_end: number | null;
  participants_required_by_default: number;
  response_deadline: number | null;
  status: string;
  allow_participant_edit: number;
  show_results_to_participants: number;
  preferences_required: number;
  enabled_preferences: string | null;
}

export interface ParticipantData {
  id: string;
  name: string;
  email: string | null;
  role: string;
  response_status?: string;
}

export interface ActivityLogEntry {
  id: string;
  action: string;
  actor_id: string | null;
  data: string | null;
  created_at: number;
}

export interface FinalSelectionData {
  id: string;
  event_id: string;
  slot_start: number;
  slot_end: number;
  notes: string | null;
  selected_by: string;
  finalized_at: number;
}

export interface ExistingPreferences {
  preferred_area: string | null;
  max_travel_distance: number | null;
  food_preference: string | null;
  food_note: string | null;
  budget_preference: string | null;
  preferred_day_type: string | null;
  preferred_time_of_day: string | null;
  indoor_outdoor: string | null;
  notes: string | null;
}

export interface ValidateTokenResponse {
  valid: boolean;
  role: string;
  event_id: string;
  event: EventData;
  participant: ParticipantData;
  existing_windows: Array<{ id: string; start_time: number; end_time: number }> | null;
  existing_preferences: ExistingPreferences | null;
}

export interface CreateEventResponse {
  event_id: string;
  organizer_token: string;
  organizer_participant_id: string;
  dashboard_url: string;
}

export interface AddParticipantInviteResponse {
  participant: {
    id: string;
    name: string;
    email: string | null;
    phone: string | null;
    is_required: boolean;
    priority_tier: number;
  };
  invite_token: string;
  invite_url: string;
}

export interface ApiError {
  error: string;
  details?: unknown;
}
