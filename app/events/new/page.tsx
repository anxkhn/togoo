"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input, Textarea } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { getTimeZones } from "@vvo/tzdb";
import { saveEvent } from "@/components/my-events";
import type { CreateEventResponse, AddParticipantInviteResponse, ApiError } from "@/lib/api-types";

const ALL_TIMEZONES = getTimeZones({ includeUtc: true });

const TZ_ALIAS_TO_CANONICAL = new Map<string, string>(
  ALL_TIMEZONES.flatMap((tz) => tz.group.map((alias) => [alias, tz.name]))
);

const TIMEZONE_OPTIONS = ALL_TIMEZONES.map((tz) => ({
  value: tz.name,
  label: `(${tz.abbreviation}, UTC${tz.rawOffsetInMinutes >= 0 ? "+" : ""}${Math.floor(tz.rawOffsetInMinutes / 60)}:${String(Math.abs(tz.rawOffsetInMinutes) % 60).padStart(2, "0")}) ${tz.name.replace(/_/g, " ")} - ${tz.alternativeName}`,
}));

function detectTimezone(): string {
  const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
  return TZ_ALIAS_TO_CANONICAL.get(tz) ?? tz ?? "UTC";
}

const ALL_PREF_FIELDS = [
  { key: "food", label: "Food preferences" },
  { key: "budget", label: "Budget" },
  { key: "location", label: "Preferred area" },
  { key: "day_type", label: "Weekday or weekend" },
  { key: "time_of_day", label: "Time of day" },
  { key: "indoor_outdoor", label: "Indoor / outdoor" },
] as const;

interface FormState {
  title: string;
  description: string;
  event_type: string;
  timezone: string;
  date_range_start_local: string;
  date_range_end_local: string;
  allowed_hours_start: string;
  allowed_hours_end: string;
  meeting_duration_minutes: string;
  slot_granularity_minutes: string;
  scoring_mode: string;
  min_attendance_threshold: string;
  participants_required_by_default: boolean;
  allow_participant_edit: boolean;
  show_results_to_participants: boolean;
  preferences_required: boolean;
  response_deadline_local: string;
  organizer_name: string;
  enabled_preferences: string[];
}

interface AddedParticipant {
  name: string;
  invite_url: string;
}

const AVATAR_COLORS = [
  "bg-violet-100 text-violet-700",
  "bg-blue-100 text-blue-700",
  "bg-emerald-100 text-emerald-700",
  "bg-amber-100 text-amber-700",
  "bg-rose-100 text-rose-700",
  "bg-cyan-100 text-cyan-700",
  "bg-fuchsia-100 text-fuchsia-700",
  "bg-orange-100 text-orange-700",
] as const;

function avatarColor(name: string): string {
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = (hash * 31 + name.charCodeAt(i)) >>> 0;
  return AVATAR_COLORS[hash % AVATAR_COLORS.length] as string;
}

function localDateToUnix(localDate: string): number {
  return Math.floor(new Date(localDate).getTime() / 1000);
}

function todayPlus(days: number): string {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d.toISOString().split("T")[0];
}

export default function NewEventPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState<FormState>({
    title: "",
    description: "",
    event_type: "meetup",
    timezone: "UTC",
    date_range_start_local: todayPlus(1),
    date_range_end_local: todayPlus(14),
    allowed_hours_start: "9",
    allowed_hours_end: "22",
    meeting_duration_minutes: "120",
    slot_granularity_minutes: "30",
    scoring_mode: "maximize_attendance",
    min_attendance_threshold: "0",
    participants_required_by_default: false,
    allow_participant_edit: true,
    show_results_to_participants: false,
    preferences_required: false,
    response_deadline_local: "",
    organizer_name: "",
    enabled_preferences: ["food"],
  });

  // Post-creation invite state
  const [createdEventId, setCreatedEventId] = useState<string | null>(null);
  const [createdOrganizerToken, setCreatedOrganizerToken] = useState<string | null>(null);
  const [inviteName, setInviteName] = useState("");
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteEmailTouched, setInviteEmailTouched] = useState(false);
  const [invitePhone, setInvitePhone] = useState("");
  const [inviteIsRequired, setInviteIsRequired] = useState(false);
  const [invitePriorityTier, setInvitePriorityTier] = useState("0");
  const [addingInvite, setAddingInvite] = useState(false);
  const [inviteError, setInviteError] = useState("");
  const [addedParticipants, setAddedParticipants] = useState<AddedParticipant[]>([]);

  const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const inviteEmailError =
    inviteEmailTouched && inviteEmail.trim() && !EMAIL_RE.test(inviteEmail.trim())
      ? "Enter a valid email address"
      : "";

  useEffect(() => {
    const tz = detectTimezone();
    setForm((f) => ({ ...f, timezone: tz }));
  }, []);


  const set = (field: keyof FormState, value: string | boolean) => {
    setForm((f) => ({ ...f, [field]: value }));
  };

  async function handleSubmit() {
    setLoading(true);
    setError("");

    try {
      const payload = {
        title: form.title.trim(),
        description: form.description.trim() || undefined,
        event_type: form.event_type,
        timezone: form.timezone,
        date_range_start: localDateToUnix(form.date_range_start_local + "T00:00:00"),
        date_range_end: localDateToUnix(form.date_range_end_local + "T23:59:59"),
        allowed_hours_start: parseInt(form.allowed_hours_start),
        allowed_hours_end: parseInt(form.allowed_hours_end),
        meeting_duration_minutes: parseInt(form.meeting_duration_minutes),
        slot_granularity_minutes: parseInt(form.slot_granularity_minutes) as 15 | 30,
        scoring_mode: form.scoring_mode,
        min_attendance_threshold: parseInt(form.min_attendance_threshold) || 0,
        allow_participant_edit: form.allow_participant_edit,
        show_results_to_participants: form.show_results_to_participants,
        participants_required_by_default: form.participants_required_by_default,
        preferences_required: form.preferences_required,
        enabled_preferences: form.enabled_preferences,
        response_deadline: form.response_deadline_local
          ? localDateToUnix(`${form.response_deadline_local}T23:59:59`)
          : undefined,
        organizer_name: form.organizer_name.trim(),
      };

      const res = await fetch("/api/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

        const data = await res.json() as CreateEventResponse | ApiError;
        if (!res.ok) {
          setError(("error" in data ? data.error : null) ?? "We could not create your plan. Please try again.");
          return;
        }
      const created = data as CreateEventResponse;

      saveEvent({
        id: created.event_id,
        title: payload.title,
        role: "organizer",
        token: created.organizer_token,
        created_at: Math.floor(Date.now() / 1000),
      });

      setCreatedEventId(created.event_id);
      setCreatedOrganizerToken(created.organizer_token);
      setInviteIsRequired(payload.participants_required_by_default);
      setInvitePriorityTier("0");
      setStep(4);
    } catch {
      setError("We hit a snag creating your plan. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  async function handleAddParticipant() {
    if (!inviteName.trim() || !createdEventId || !createdOrganizerToken) return;
    setAddingInvite(true);
    setInviteError("");

    try {
      const res = await fetch(`/api/events/${createdEventId}/participants`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-organizer-token": createdOrganizerToken,
        },
        body: JSON.stringify({
          name: inviteName.trim(),
          email: inviteEmail.trim() || undefined,
          phone: invitePhone.trim() || undefined,
          is_required: inviteIsRequired,
          priority_tier: parseInt(invitePriorityTier),
        }),
      });

      const data = await res.json() as AddParticipantInviteResponse | ApiError;
      if (!res.ok) {
        setInviteError(("error" in data ? data.error : null) ?? "We could not add that invitee.");
          return;
        }
      const added = data as AddParticipantInviteResponse;

      setAddedParticipants((prev) => [
        ...prev,
        { name: inviteName.trim(), invite_url: `${window.location.origin}${added.invite_url}` },
      ]);
      setInviteName("");
      setInviteEmail("");
      setInvitePhone("");
      setInviteIsRequired(form.participants_required_by_default);
      setInvitePriorityTier("0");
    } catch {
      setInviteError("We could not add that invitee. Try again.");
    } finally {
      setAddingInvite(false);
    }
  }

  const steps = [
    { n: 1, label: "Basics" },
    { n: 2, label: "Schedule" },
    { n: 3, label: "Check" },
    { n: 4, label: "Invite" },
  ];

  return (
    <div className="min-h-screen bg-bg">
      <header className="border-b border-border bg-surface/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-2xl mx-auto px-5 h-14 flex items-center justify-between">
          <Link href="/" className="font-display text-xl font-semibold text-text">
            Togoo
          </Link>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-5 py-12">
        <div className="mb-10">
          <h1 className="font-display text-4xl font-bold text-text mb-2">
            {step === 4 ? "Invite your group" : "Start your plan"}
          </h1>
          <p className="text-muted">
            {step === 4
              ? "Add the people who should reply. You can always invite more later from the dashboard."
              : "Tell Togoo what you're planning so it can surface the best options."}
          </p>
        </div>

        <div className="flex items-center gap-2 mb-8">
          {steps.map((s, i) => (
            <div key={s.n} className="flex items-center gap-2">
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold transition-all duration-200 ${
                  step === s.n
                    ? "bg-accent text-white"
                    : step > s.n
                    ? "bg-accent-light text-accent"
                    : "bg-border text-muted"
                }`}
              >
                {step > s.n ? (
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  s.n
                )}
              </div>
              <span className={`text-sm ${step === s.n ? "text-text font-medium" : "text-muted"}`}>{s.label}</span>
              {i < steps.length - 1 && <div className="w-8 h-px bg-border mx-1" />}
            </div>
          ))}
        </div>

        <div className="card p-6 animate-scale-in">
          {step === 1 && (
            <div className="space-y-5">
              <Input
                label="Your name"
                placeholder="e.g., Alex"
                value={form.organizer_name}
                onChange={(e) => set("organizer_name", e.target.value)}
                required
              />
              <Input
                label="Plan title"
                placeholder="e.g., Friday dinner, birthday drinks, team offsite"
                value={form.title}
                onChange={(e) => set("title", e.target.value)}
                required
              />
              <Textarea
                label="What should people know? (optional)"
                placeholder="Add context, goals, or a note for the group."
                rows={3}
                value={form.description}
                onChange={(e) => set("description", e.target.value)}
              />
              <Select
                label="Plan type"
                options={[
                  { value: "meetup", label: "Meetup" },
                  { value: "dinner", label: "Dinner" },
                  { value: "hangout", label: "Hangout" },
                  { value: "work_session", label: "Work session" },
                  { value: "custom", label: "Custom" },
                ]}
                value={form.event_type}
                onChange={(e) => set("event_type", e.target.value)}
              />
            </div>
          )}

          {step === 2 && (
            <div className="space-y-5">
              <Select
                label="Timezone"
                options={TIMEZONE_OPTIONS}
                value={form.timezone}
                onChange={(e) => set("timezone", e.target.value)}
                hint="Detected from your browser. Invitees will answer against this timezone."
              />
              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="Earliest date"
                  type="date"
                  value={form.date_range_start_local}
                  onChange={(e) => set("date_range_start_local", e.target.value)}
                />
                <Input
                  label="Latest date"
                  type="date"
                  value={form.date_range_end_local}
                  onChange={(e) => set("date_range_end_local", e.target.value)}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Select
                  label="Earliest start time"
                  options={Array.from({ length: 24 }, (_, i) => ({
                    value: String(i),
                    label: `${i === 0 ? "12 AM" : i < 12 ? `${i} AM` : i === 12 ? "12 PM" : `${i - 12} PM`}`,
                  }))}
                  value={form.allowed_hours_start}
                  onChange={(e) => set("allowed_hours_start", e.target.value)}
                />
                <Select
                  label="Latest end time"
                  options={Array.from({ length: 24 }, (_, i) => ({
                    value: String(i + 1),
                    label: `${i + 1 === 12 ? "12 PM" : i + 1 < 12 ? `${i + 1} AM` : i + 1 === 24 ? "12 AM" : `${i + 1 - 12} PM`}`,
                  }))}
                  value={form.allowed_hours_end}
                  onChange={(e) => set("allowed_hours_end", e.target.value)}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Select
                  label="How long should it be?"
                  options={[
                    { value: "30", label: "30 minutes" },
                    { value: "60", label: "1 hour" },
                    { value: "90", label: "1.5 hours" },
                    { value: "120", label: "2 hours" },
                    { value: "180", label: "3 hours" },
                    { value: "240", label: "4 hours" },
                    { value: "480", label: "Full day (8h)" },
                  ]}
                  value={form.meeting_duration_minutes}
                  onChange={(e) => set("meeting_duration_minutes", e.target.value)}
                />
                <Select
                  label="Suggestion spacing"
                  options={[
                    { value: "30", label: "30 minutes" },
                    { value: "15", label: "15 minutes" },
                  ]}
                  value={form.slot_granularity_minutes}
                  onChange={(e) => set("slot_granularity_minutes", e.target.value)}
                  hint="Smaller spacing gives you more candidate options."
                />
              </div>
              <Select
                label="How should Togoo rank options?"
                options={[
                  { value: "maximize_attendance", label: "Maximize attendance" },
                  { value: "prioritize_required", label: "Prioritize required attendees" },
                  { value: "vip_priority", label: "Prioritize ★★ key people" },
                  { value: "time_optimized", label: "Match time preferences" },
                ]}
                value={form.scoring_mode}
                onChange={(e) => set("scoring_mode", e.target.value)}
                hint="Choose what matters most when it scores the best time."
              />

              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="Minimum people needed"
                  type="number"
                  min="0"
                  value={form.min_attendance_threshold}
                  onChange={(e) => set("min_attendance_threshold", e.target.value)}
                  hint="Hide suggestions that fewer than this many people can make."
                />
                <Input
                  label="Reply deadline (optional)"
                  type="date"
                  value={form.response_deadline_local}
                  onChange={(e) => set("response_deadline_local", e.target.value)}
                  hint="After this date, replies are closed."
                />
              </div>

              <div>
                <p className="text-sm font-medium text-text mb-1">What should people weigh in on?</p>
                <p className="text-xs text-muted mb-3">Turn on only the preferences that matter for this plan.</p>
                <div className="flex flex-wrap gap-2">
                  {ALL_PREF_FIELDS.map(({ key, label }) => {
                    const enabled = form.enabled_preferences.includes(key);
                    return (
                      <button
                        key={key}
                        type="button"
                        onClick={() => {
                          const next = enabled
                            ? form.enabled_preferences.filter((k) => k !== key)
                            : [...form.enabled_preferences, key];
                          setForm((f) => ({ ...f, enabled_preferences: next }));
                        }}
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border transition-all duration-150 ${
                          enabled
                            ? "bg-accent text-white border-accent"
                            : "bg-surface border-border text-text hover:border-accent/40"
                        }`}
                      >
                        {enabled && (
                          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                        {label}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-5">
              <div className="flex items-start justify-between py-3 border-b border-border">
                <div>
                  <p className="text-sm font-medium text-text">Mark new invitees as required by default</p>
                  <p className="text-xs text-muted mt-0.5">Useful when a small core group needs to be present.</p>
                </div>
                <button
                  type="button"
                  onClick={() => set("participants_required_by_default", !form.participants_required_by_default)}
                  className={`relative inline-flex h-6 w-10 items-center rounded-full transition-colors duration-200 focus-visible:outline-accent flex-shrink-0 ${
                    form.participants_required_by_default ? "bg-accent" : "bg-border"
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform duration-200 ${
                      form.participants_required_by_default ? "translate-x-5" : "translate-x-1"
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-start justify-between py-3 border-b border-border">
                <div>
                  <p className="text-sm font-medium text-text">Allow participants to edit</p>
                  <p className="text-xs text-muted mt-0.5">Let people update their availability after they submit</p>
                </div>
                <button
                  type="button"
                  onClick={() => set("allow_participant_edit", !form.allow_participant_edit)}
                  className={`relative inline-flex h-6 w-10 items-center rounded-full transition-colors duration-200 focus-visible:outline-accent flex-shrink-0 ${
                    form.allow_participant_edit ? "bg-accent" : "bg-border"
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform duration-200 ${
                      form.allow_participant_edit ? "translate-x-5" : "translate-x-1"
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-start justify-between py-3 border-b border-border">
                <div>
                  <p className="text-sm font-medium text-text">Require at least one preference</p>
                  <p className="text-xs text-muted mt-0.5">If on, people must fill one preference before they can submit.</p>
                </div>
                <button
                  type="button"
                  onClick={() => set("preferences_required", !form.preferences_required)}
                  className={`relative inline-flex h-6 w-10 items-center rounded-full transition-colors duration-200 focus-visible:outline-accent flex-shrink-0 ${
                    form.preferences_required ? "bg-accent" : "bg-border"
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform duration-200 ${
                      form.preferences_required ? "translate-x-5" : "translate-x-1"
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-start justify-between py-3 border-b border-border">
                <div>
                  <p className="text-sm font-medium text-text">Let participants view the live summary</p>
                  <p className="text-xs text-muted mt-0.5">They can see the current overlap and top timings from their own invite link.</p>
                </div>
                <button
                  type="button"
                  onClick={() => set("show_results_to_participants", !form.show_results_to_participants)}
                  className={`relative inline-flex h-6 w-10 items-center rounded-full transition-colors duration-200 focus-visible:outline-accent flex-shrink-0 ${
                    form.show_results_to_participants ? "bg-accent" : "bg-border"
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform duration-200 ${
                      form.show_results_to_participants ? "translate-x-5" : "translate-x-1"
                    }`}
                  />
                </button>
              </div>

              <div className="card bg-surface-alt p-4">
                <p className="text-sm font-medium text-text mb-1">Quick review</p>
                <dl className="text-sm space-y-1 text-muted">
                  <div className="flex justify-between">
                    <dt>Plan</dt>
                    <dd className="text-text font-medium">{form.title || "(untitled)"}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt>Host</dt>
                    <dd className="text-text">{form.organizer_name || "(no name)"}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt>Date window</dt>
                    <dd className="text-text">{form.date_range_start_local} – {form.date_range_end_local}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt>Duration</dt>
                    <dd className="text-text">{parseInt(form.meeting_duration_minutes) / 60}h</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt>Timezone</dt>
                    <dd className="text-text">{form.timezone}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt>Minimum people</dt>
                    <dd className="text-text">{form.min_attendance_threshold}</dd>
                  </div>
                  {form.response_deadline_local && (
                    <div className="flex justify-between">
                      <dt>Reply deadline</dt>
                      <dd className="text-text">{form.response_deadline_local}</dd>
                    </div>
                  )}
                </dl>
              </div>

              {error && (
                <div className="bg-danger-light border border-danger/20 rounded-input px-4 py-3 text-sm text-danger">
                  {error}
                </div>
              )}
            </div>
          )}

          {step === 4 && (
            <div className="space-y-5">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Input
                    label="Name"
                    placeholder="e.g., Jamie"
                    value={inviteName}
                    onChange={(e) => setInviteName(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && inviteName.trim() && !inviteEmailError) handleAddParticipant();
                    }}
                  />
                </div>
                <div>
                  <Input
                    label="Email (optional)"
                    type="email"
                    placeholder="jamie@example.com"
                    value={inviteEmail}
                    onChange={(e) => {
                      setInviteEmail(e.target.value);
                      setInviteEmailTouched(false);
                    }}
                    onBlur={() => setInviteEmailTouched(true)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && inviteName.trim() && !inviteEmailError) handleAddParticipant();
                    }}
                  />
                  {inviteEmailError && (
                    <p className="text-xs text-danger mt-1">{inviteEmailError}</p>
                  )}
                </div>
                <div className="col-span-2">
                  <Input
                    label="Phone for WhatsApp (optional)"
                    type="tel"
                    placeholder="+1 555 000 0000"
                    value={invitePhone}
                    onChange={(e) => setInvitePhone(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && inviteName.trim() && !inviteEmailError) handleAddParticipant();
                    }}
                  />
                </div>
                <label className="col-span-1 flex items-center gap-2 rounded-input border border-border px-3 py-2 text-sm text-text">
                  <input type="checkbox" checked={inviteIsRequired} onChange={(e) => setInviteIsRequired(e.target.checked)} />
                  Required attendee
                </label>
                <div className="col-span-1">
                  <Select
                    label="Priority"
                    options={[
                      { value: "0", label: "Regular" },
                      { value: "1", label: "★ Important" },
                      { value: "2", label: "★★ Key person" },
                    ]}
                    value={invitePriorityTier}
                    onChange={(e) => setInvitePriorityTier(e.target.value)}
                  />
                </div>
              </div>

              {inviteError && (
                <p className="text-sm text-danger">{inviteError}</p>
              )}

              <Button
                onClick={handleAddParticipant}
                loading={addingInvite}
                disabled={!inviteName.trim() || !!inviteEmailError}
                variant="secondary"
                className="w-full"
              >
                Add invitee
              </Button>

              {addedParticipants.length > 0 && (
                <div className="border-t border-border pt-4 space-y-1">
                  <p className="text-xs font-medium text-muted uppercase tracking-wide mb-3">
                    Invite links ready ({addedParticipants.length})
                  </p>
                  {addedParticipants.map((p) => (
                    <div key={p.invite_url} className="flex items-center justify-between gap-3 py-2">
                      <div className="flex items-center gap-2 min-w-0">
                        <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold flex-shrink-0 ${avatarColor(p.name)}`}>
                          {p.name[0].toUpperCase()}
                        </div>
                        <span className="text-sm text-text font-medium truncate">{p.name}</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => navigator.clipboard.writeText(p.invite_url)}
                        className="text-xs text-accent hover:underline flex-shrink-0"
                      >
                        Copy link
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        <div className="flex justify-between mt-6">
          {step === 4 ? (
            <p className="text-sm text-muted self-center">
              {addedParticipants.length === 0 ? "You can always invite more people from the dashboard." : `${addedParticipants.length} invitee${addedParticipants.length === 1 ? "" : "s"} added`}
            </p>
          ) : step > 1 ? (
            <Button variant="secondary" onClick={() => setStep(step - 1)}>
              Back
            </Button>
          ) : (
            <Link href="/" className="btn-secondary inline-flex items-center">
              Cancel
            </Link>
          )}

          {step < 3 && (
            <Button
              onClick={() => {
                if (step === 1 && (!form.organizer_name.trim() || !form.title.trim())) {
                  setError("Please enter your name and a plan title.");
                  return;
                }
                setError("");
                setStep(step + 1);
              }}
            >
              Continue
            </Button>
          )}
          {step === 3 && (
            <Button
              loading={loading}
              onClick={handleSubmit}
              disabled={!form.title.trim() || !form.organizer_name.trim()}
            >
              Create plan
            </Button>
          )}
          {step === 4 && (
            <Button onClick={() => router.push(`/e/${createdEventId}/organizer/${createdOrganizerToken}`)}>
              Open dashboard
            </Button>
          )}
        </div>
      </main>
    </div>
  );
}
