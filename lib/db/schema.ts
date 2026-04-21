import { sqliteTable, text, integer, index, uniqueIndex } from "drizzle-orm/sqlite-core";
import { relations, sql } from "drizzle-orm";

export const events = sqliteTable(
  "events",
  {
    id: text("id").primaryKey(),
    title: text("title").notNull(),
    description: text("description"),
    event_type: text("event_type").notNull().default("meetup"),
    timezone: text("timezone").notNull().default("UTC"),
    date_range_start: integer("date_range_start").notNull(),
    date_range_end: integer("date_range_end").notNull(),
    meeting_duration_minutes: integer("meeting_duration_minutes").notNull().default(120),
    slot_granularity_minutes: integer("slot_granularity_minutes").notNull().default(30),
    min_attendance_threshold: integer("min_attendance_threshold").notNull().default(0),
    participants_required_by_default: integer("participants_required_by_default").notNull().default(0),
    allow_participant_edit: integer("allow_participant_edit").notNull().default(1),
    show_results_to_participants: integer("show_results_to_participants").notNull().default(0),
    preferences_required: integer("preferences_required").notNull().default(0),
    enabled_preferences: text("enabled_preferences").notNull().default("[]"),
    scoring_mode: text("scoring_mode").notNull().default("maximize_attendance"),
    suggested_time_start: integer("suggested_time_start"),
    suggested_time_end: integer("suggested_time_end"),
    organizer_participant_id: text("organizer_participant_id"),
    status: text("status").notNull().default("active"),
    response_deadline: integer("response_deadline"),
    created_at: integer("created_at").notNull().default(sql`(unixepoch())`),
    updated_at: integer("updated_at").notNull().default(sql`(unixepoch())`),
  },
  (t) => [index("idx_events_status").on(t.status)]
);

export const participants = sqliteTable(
  "participants",
  {
    id: text("id").primaryKey(),
    event_id: text("event_id")
      .notNull()
      .references(() => events.id, { onDelete: "cascade" }),
    name: text("name").notNull(),
    email: text("email"),
    phone: text("phone"),
    role: text("role").notNull().default("participant"),
    is_required: integer("is_required").notNull().default(0),
    priority_tier: integer("priority_tier").notNull().default(0),
    response_status: text("response_status").notNull().default("pending"),
    created_at: integer("created_at").notNull().default(sql`(unixepoch())`),
    updated_at: integer("updated_at").notNull().default(sql`(unixepoch())`),
  },
  (t) => [
    index("idx_participants_event_id").on(t.event_id),
    index("idx_participants_role").on(t.role),
    index("idx_participants_response_status").on(t.response_status),
  ]
);

export const invite_tokens = sqliteTable(
  "invite_tokens",
  {
    id: text("id").primaryKey(),
    event_id: text("event_id")
      .notNull()
      .references(() => events.id, { onDelete: "cascade" }),
    participant_id: text("participant_id")
      .notNull()
      .references(() => participants.id, { onDelete: "cascade" }),
    token: text("token").notNull(),
    role: text("role").notNull(),
    is_active: integer("is_active").notNull().default(1),
    created_at: integer("created_at").notNull().default(sql`(unixepoch())`),
    expires_at: integer("expires_at"),
  },
  (t) => [
    uniqueIndex("idx_invite_tokens_token").on(t.token),
    index("idx_invite_tokens_event_id").on(t.event_id),
    index("idx_invite_tokens_participant_id").on(t.participant_id),
    index("idx_invite_tokens_role").on(t.role),
  ]
);

export const availability_windows = sqliteTable(
  "availability_windows",
  {
    id: text("id").primaryKey(),
    event_id: text("event_id")
      .notNull()
      .references(() => events.id, { onDelete: "cascade" }),
    participant_id: text("participant_id")
      .notNull()
      .references(() => participants.id, { onDelete: "cascade" }),
    start_time: integer("start_time").notNull(),
    end_time: integer("end_time").notNull(),
    created_at: integer("created_at").notNull().default(sql`(unixepoch())`),
  },
  (t) => [
    index("idx_availability_event_id").on(t.event_id),
    index("idx_availability_participant_id").on(t.participant_id),
    index("idx_availability_start_time").on(t.start_time),
  ]
);

export const participant_preferences = sqliteTable(
  "participant_preferences",
  {
    id: text("id").primaryKey(),
    event_id: text("event_id")
      .notNull()
      .references(() => events.id, { onDelete: "cascade" }),
    participant_id: text("participant_id")
      .notNull()
      .references(() => participants.id, { onDelete: "cascade" }),
    preferred_area: text("preferred_area"),
    max_travel_distance: integer("max_travel_distance"),
    food_preference: text("food_preference").default("no_preference"),
    food_note: text("food_note"),
    budget_preference: text("budget_preference").default("no_preference"),
    preferred_day_type: text("preferred_day_type").default("no_preference"),
    preferred_time_of_day: text("preferred_time_of_day").default("no_preference"),
    indoor_outdoor: text("indoor_outdoor").default("no_preference"),
    notes: text("notes"),
    created_at: integer("created_at").notNull().default(sql`(unixepoch())`),
    updated_at: integer("updated_at").notNull().default(sql`(unixepoch())`),
  },
  (t) => [
    index("idx_prefs_event_id").on(t.event_id),
    index("idx_prefs_participant_id").on(t.participant_id),
    uniqueIndex("idx_prefs_event_participant").on(t.event_id, t.participant_id),
  ]
);

export const organizer_overrides = sqliteTable(
  "organizer_overrides",
  {
    id: text("id").primaryKey(),
    event_id: text("event_id")
      .notNull()
      .references(() => events.id, { onDelete: "cascade" }),
    organizer_participant_id: text("organizer_participant_id").notNull(),
    override_type: text("override_type").notNull(),
    data: text("data").notNull(),
    created_at: integer("created_at").notNull().default(sql`(unixepoch())`),
  },
  (t) => [index("idx_overrides_event_id").on(t.event_id)]
);

export const normalized_slots = sqliteTable(
  "normalized_slots",
  {
    id: text("id").primaryKey(),
    event_id: text("event_id")
      .notNull()
      .references(() => events.id, { onDelete: "cascade" }),
    participant_id: text("participant_id")
      .notNull()
      .references(() => participants.id, { onDelete: "cascade" }),
    slot_start: integer("slot_start").notNull(),
    slot_end: integer("slot_end").notNull(),
    created_at: integer("created_at").notNull().default(sql`(unixepoch())`),
  },
  (t) => [
    index("idx_slots_event_id").on(t.event_id),
    index("idx_slots_participant_id").on(t.participant_id),
    index("idx_slots_slot_start").on(t.slot_start),
  ]
);

export const recommendation_snapshots = sqliteTable(
  "recommendation_snapshots",
  {
    id: text("id").primaryKey(),
    event_id: text("event_id")
      .notNull()
      .references(() => events.id, { onDelete: "cascade" }),
    computed_at: integer("computed_at").notNull().default(sql`(unixepoch())`),
    recommendations: text("recommendations").notNull(),
    total_responded: integer("total_responded").notNull().default(0),
  },
  (t) => [index("idx_rec_snapshots_event_id").on(t.event_id)]
);

export const final_selections = sqliteTable(
  "final_selections",
  {
    id: text("id").primaryKey(),
    event_id: text("event_id")
      .notNull()
      .references(() => events.id, { onDelete: "cascade" }),
    slot_start: integer("slot_start").notNull(),
    slot_end: integer("slot_end").notNull(),
    notes: text("notes"),
    selected_by: text("selected_by").notNull(),
    finalized_at: integer("finalized_at").notNull().default(sql`(unixepoch())`),
  },
  (t) => [uniqueIndex("idx_final_event_id").on(t.event_id)]
);

export const activity_log = sqliteTable(
  "activity_log",
  {
    id: text("id").primaryKey(),
    event_id: text("event_id")
      .notNull()
      .references(() => events.id, { onDelete: "cascade" }),
    actor_id: text("actor_id"),
    action: text("action").notNull(),
    data: text("data"),
    created_at: integer("created_at").notNull().default(sql`(unixepoch())`),
  },
  (t) => [
    index("idx_activity_event_id").on(t.event_id),
    index("idx_activity_created_at").on(t.created_at),
  ]
);

export const eventsRelations = relations(events, ({ many }) => ({
  participants: many(participants),
  invite_tokens: many(invite_tokens),
  availability_windows: many(availability_windows),
  participant_preferences: many(participant_preferences),
  organizer_overrides: many(organizer_overrides),
  normalized_slots: many(normalized_slots),
  recommendation_snapshots: many(recommendation_snapshots),
  final_selections: many(final_selections),
  activity_log: many(activity_log),
}));

export const participantsRelations = relations(participants, ({ one, many }) => ({
  event: one(events, { fields: [participants.event_id], references: [events.id] }),
  invite_tokens: many(invite_tokens),
  availability_windows: many(availability_windows),
  preferences: many(participant_preferences),
}));

export const inviteTokensRelations = relations(invite_tokens, ({ one }) => ({
  event: one(events, { fields: [invite_tokens.event_id], references: [events.id] }),
  participant: one(participants, { fields: [invite_tokens.participant_id], references: [participants.id] }),
}));
