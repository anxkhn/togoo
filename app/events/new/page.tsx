"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input, Textarea } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { InfoTooltip } from "@/components/ui/field-label";
import { getTimeZones } from "@vvo/tzdb";
import { fromZonedTime } from "date-fns-tz";
import { saveEvent } from "@/components/my-events";
import type { CreateEventResponse, AddParticipantInviteResponse, ApiError } from "@/lib/api-types";
import { clientApi } from "@/lib/client-api";
import { formatDuration } from "@/lib/utils";

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
  suggested_date_local: string;
  suggested_start_local: string;
  suggested_end_local: string;
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

interface PendingParticipant {
  id: string;
  name: string;
}

interface NewEventDraft {
  step: number;
  form: FormState;
  createdEventId: string | null;
  createdOrganizerToken: string | null;
  inviteName: string;
  inviteEmail: string;
  invitePhone: string;
  inviteIsRequired: boolean;
  invitePriorityTier: string;
  addedParticipants: AddedParticipant[];
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

function zonedDateTimeToUnix(date: string, time: string, timezone: string): number {
  return Math.floor(fromZonedTime(`${date}T${time}:00`, timezone).getTime() / 1000);
}

function todayPlus(days: number): string {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d.toISOString().split("T")[0];
}

const EVENING_FIRST_HALF_HOUR_OPTIONS = Array.from({ length: 48 }, (_, offset) => {
  const i = (offset + 34) % 48;
  const hour = Math.floor(i / 2);
  const minute = i % 2 === 0 ? 0 : 30;
  const labelHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
  const suffix = hour < 12 ? "AM" : "PM";
  return {
    value: `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`,
    label: `${labelHour}:${String(minute).padStart(2, "0")} ${suffix}`,
  };
});

const DURATION_OPTIONS = [
  { value: "15", label: "15 minutes" },
  { value: "30", label: "30 minutes" },
  { value: "60", label: "1 hour" },
  { value: "120", label: "2 hours" },
  { value: "360", label: "6 hours" },
];

const NEW_EVENT_DRAFT_KEY = "togoo_new_event_draft";

function createDefaultForm(): FormState {
  return {
    title: "",
    description: "",
    event_type: "dinner",
    timezone: "UTC",
    date_range_start_local: todayPlus(1),
    date_range_end_local: todayPlus(7),
    allowed_hours_start: "12",
    allowed_hours_end: "23",
    meeting_duration_minutes: "60",
    slot_granularity_minutes: "30",
    scoring_mode: "maximize_attendance",
    suggested_date_local: "",
    suggested_start_local: "",
    suggested_end_local: "",
    participants_required_by_default: false,
    allow_participant_edit: true,
    show_results_to_participants: false,
    preferences_required: false,
    response_deadline_local: "",
    organizer_name: "",
    enabled_preferences: ["food"],
  };
}

function newPendingId(): string {
  return `pending-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

export default function NewEventPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [stepOneErrors, setStepOneErrors] = useState<{ organizer_name?: string; title?: string }>({});
  const [shakeForm, setShakeForm] = useState(false);
  const [draftLoaded, setDraftLoaded] = useState(false);

  const [form, setForm] = useState<FormState>(createDefaultForm());

  // Post-creation invite state
  const [createdEventId, setCreatedEventId] = useState<string | null>(null);
  const [createdOrganizerToken, setCreatedOrganizerToken] = useState<string | null>(null);
  const [inviteName, setInviteName] = useState("");
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteEmailTouched, setInviteEmailTouched] = useState(false);
  const [invitePhone, setInvitePhone] = useState("");
  const [inviteIsRequired, setInviteIsRequired] = useState(false);
  const [invitePriorityTier, setInvitePriorityTier] = useState("0");
  const [pendingParticipants, setPendingParticipants] = useState<PendingParticipant[]>([]);
  const [inviteError, setInviteError] = useState("");
  const [addedParticipants, setAddedParticipants] = useState<AddedParticipant[]>([]);

  const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const inviteEmailError =
    inviteEmailTouched && inviteEmail.trim() && !EMAIL_RE.test(inviteEmail.trim())
      ? "Enter a valid email address"
      : "";

  useEffect(() => {
    try {
      const raw = localStorage.getItem(NEW_EVENT_DRAFT_KEY);
      if (raw) {
        const draft = JSON.parse(raw) as NewEventDraft;
        setStep(draft.step);
        setForm(draft.form);
        setCreatedEventId(draft.createdEventId);
        setCreatedOrganizerToken(draft.createdOrganizerToken);
        setInviteName(draft.inviteName);
        setInviteEmail(draft.inviteEmail);
        setInvitePhone(draft.invitePhone);
        setInviteIsRequired(draft.inviteIsRequired);
        setInvitePriorityTier(draft.invitePriorityTier);
        setAddedParticipants(draft.addedParticipants);
      } else {
        const tz = detectTimezone();
        setForm((current) => ({ ...current, timezone: tz }));
      }
    } catch {
      const tz = detectTimezone();
      setForm((current) => ({ ...current, timezone: tz }));
    } finally {
      setDraftLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (!draftLoaded) return;

    const draft: NewEventDraft = {
      step,
      form,
      createdEventId,
      createdOrganizerToken,
      inviteName,
      inviteEmail,
      invitePhone,
      inviteIsRequired,
      invitePriorityTier,
      addedParticipants,
    };

    try {
      localStorage.setItem(NEW_EVENT_DRAFT_KEY, JSON.stringify(draft));
    } catch {}
  }, [
    draftLoaded,
    step,
    form,
    createdEventId,
    createdOrganizerToken,
    inviteName,
    inviteEmail,
    invitePhone,
    inviteIsRequired,
    invitePriorityTier,
    addedParticipants,
  ]);

  function clearDraft() {
    try {
      localStorage.removeItem(NEW_EVENT_DRAFT_KEY);
    } catch {}
  }


  const set = (field: keyof FormState, value: string | boolean) => {
    setForm((f) => ({ ...f, [field]: value }));
    if (field === "organizer_name" || field === "title") {
      setStepOneErrors((current) => ({ ...current, [field]: undefined }));
    }
  };

  function triggerValidationFeedback() {
    setShakeForm(false);
    requestAnimationFrame(() => setShakeForm(true));
    window.setTimeout(() => setShakeForm(false), 360);
  }

  function validateStepOne(): boolean {
    const nextErrors: { organizer_name?: string; title?: string } = {};

    if (!form.organizer_name.trim()) nextErrors.organizer_name = "Please enter the organizer name.";
    if (!form.title.trim()) nextErrors.title = "Please enter a plan title.";

    setStepOneErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      setError("Please fill the required fields before continuing.");
      triggerValidationFeedback();
      const firstMissingId = nextErrors.organizer_name ? "organizer-name" : "plan-title";
      window.setTimeout(() => document.getElementById(firstMissingId)?.focus(), 20);
      return false;
    }

    return true;
  }

  async function handleSubmit() {
    const hasAnySuggestedField = Boolean(
      form.suggested_date_local || form.suggested_start_local || form.suggested_end_local
    );
    if (
      hasAnySuggestedField &&
      !(form.suggested_date_local && form.suggested_start_local && form.suggested_end_local)
    ) {
      setError("Complete all suggested-time fields, or leave all of them empty.");
      return;
    }

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
        min_attendance_threshold: 0,
        suggested_time_start:
          form.suggested_date_local && form.suggested_start_local && form.suggested_end_local
            ? zonedDateTimeToUnix(form.suggested_date_local, form.suggested_start_local, form.timezone)
            : undefined,
        suggested_time_end:
          form.suggested_date_local && form.suggested_start_local && form.suggested_end_local
            ? zonedDateTimeToUnix(form.suggested_date_local, form.suggested_end_local, form.timezone)
            : undefined,
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

      const res = await fetch(clientApi.createEvent(), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

        const data = await res.json() as CreateEventResponse | ApiError;
        if (!res.ok) {
          setError(("error" in data ? data.error : null) ?? "We couldn't create your plan. Please try again.");
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
      setError("We couldn't create your plan. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  async function handleAddParticipant() {
    if (!inviteName.trim() || !createdEventId || !createdOrganizerToken) return;
    const participant = {
      name: inviteName.trim(),
      email: inviteEmail.trim() || undefined,
      phone: invitePhone.trim() || undefined,
      is_required: inviteIsRequired,
      priority_tier: parseInt(invitePriorityTier),
    };
    const pendingId = newPendingId();

    setInviteError("");
    setPendingParticipants((current) => [...current, { id: pendingId, name: participant.name }]);
    setInviteName("");
    setInviteEmail("");
    setInviteEmailTouched(false);
    setInvitePhone("");
    setInviteIsRequired(form.participants_required_by_default);
    setInvitePriorityTier("0");

    try {
      const res = await fetch(clientApi.participants(createdEventId), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-organizer-token": createdOrganizerToken,
        },
        body: JSON.stringify(participant),
      });

      const data = await res.json() as AddParticipantInviteResponse | ApiError;
      if (!res.ok) {
        setInviteError(("error" in data ? data.error : null) ?? `We couldn't add ${participant.name}.`);
        return;
      }
      const added = data as AddParticipantInviteResponse;

      setAddedParticipants((prev) => [
        ...prev,
        { name: participant.name, invite_url: `${window.location.origin}${added.invite_url}` },
      ]);
    } catch {
      setInviteError(`We couldn't add ${participant.name}. Try again.`);
    } finally {
      setPendingParticipants((current) => current.filter((item) => item.id !== pendingId));
    }
  }

  const steps = [
    { n: 1, label: "Setup" },
    { n: 2, label: "Timing" },
    { n: 3, label: "Review" },
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
            {step === 4 ? "Add your group" : "Create your plan"}
          </h1>
          <p className="text-muted">
            {step === 4
              ? "Add the people who should reply. Every invite gets a private link, and you can always add more later from the dashboard."
              : "Set the window, choose what to ask, and Togoo will rank the best time once replies come in."}
          </p>
        </div>

        <div className="flex items-center gap-2 mb-8">
          {steps.map((s, i) => (
            <div key={s.n} className="flex items-center gap-2">
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-semibold tabular-nums transition-[background-color,color,box-shadow] duration-200 ${
                  step === s.n
                    ? "bg-accent text-white shadow-[0_8px_20px_rgba(47,104,68,0.16)]"
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

        <div className={`card p-6 animate-scale-in ${shakeForm ? "animate-shake-x" : ""}`}>
          {step === 1 && (
            <div className="space-y-5">
              <Input
                label="Organizer name"
                placeholder="e.g., Anas"
                value={form.organizer_name}
                onChange={(e) => set("organizer_name", e.target.value)}
                error={stepOneErrors.organizer_name}
                required
              />
              <Input
                label="Plan title"
                placeholder="e.g., birthday dinner, house party, cricket screening"
                value={form.title}
                onChange={(e) => set("title", e.target.value)}
                error={stepOneErrors.title}
                required
              />
              <Textarea
                label="What should people know?"
                placeholder="Add the area, occasion, or any details people should know before they reply."
                rows={3}
                value={form.description}
                onChange={(e) => set("description", e.target.value)}
              />
              <Select
                label="What kind of plan is this?"
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
                  tooltip="Detected from your browser. Togoo scores suggestions against this timezone, and invitees see the plan in the same reference timezone."
                  options={TIMEZONE_OPTIONS}
                  value={form.timezone}
                  onChange={(e) => set("timezone", e.target.value)}
                />
              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="First possible date"
                  type="date"
                  value={form.date_range_start_local}
                  onChange={(e) => set("date_range_start_local", e.target.value)}
                />
                <Input
                  label="Last possible date"
                  type="date"
                  value={form.date_range_end_local}
                  onChange={(e) => set("date_range_end_local", e.target.value)}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Select
                  label="Earliest start"
                  options={Array.from({ length: 24 }, (_, i) => ({
                    value: String(i),
                    label: `${i === 0 ? "12 AM" : i < 12 ? `${i} AM` : i === 12 ? "12 PM" : `${i - 12} PM`}`,
                  }))}
                  value={form.allowed_hours_start}
                  onChange={(e) => set("allowed_hours_start", e.target.value)}
                />
                <Select
                  label="Latest finish"
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
                  label="How long will it last?"
                  options={DURATION_OPTIONS}
                  value={form.meeting_duration_minutes}
                  onChange={(e) => set("meeting_duration_minutes", e.target.value)}
                />
                <Select
                  label="Suggestion spacing"
                  tooltip="Smaller spacing gives you more candidate start times. Use 15 minutes for tighter scheduling, 30 minutes for simpler options."
                  options={[
                    { value: "15", label: "15 minutes" },
                    { value: "30", label: "30 minutes" },
                  ]}
                  value={form.slot_granularity_minutes}
                  onChange={(e) => set("slot_granularity_minutes", e.target.value)}
                />
              </div>

              <Select
                label="What should Togoo optimize for?"
                tooltip="This decides how ranked times are scored. Pick the mode that best matches how you want Togoo to break tradeoffs for this plan."
                options={[
                  { value: "maximize_attendance", label: "Maximize attendance" },
                  { value: "prioritize_required", label: "Prioritize required attendees" },
                  { value: "vip_priority", label: "Prioritize ★★ key people" },
                  { value: "time_optimized", label: "Match time preferences" },
                ]}
                value={form.scoring_mode}
                onChange={(e) => set("scoring_mode", e.target.value)}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Suggested date"
                  tooltip="Optional. Pre-fill a proposed slot so invitees can react to something concrete right away."
                  type="date"
                  placeholder="Select date"
                  value={form.suggested_date_local}
                  onChange={(e) => set("suggested_date_local", e.target.value)}
                />
                <div className="grid grid-cols-2 gap-4">
                  <Select
                    label="Suggested start"
                    options={[{ value: "", label: "No suggested start" }, ...EVENING_FIRST_HALF_HOUR_OPTIONS]}
                    value={form.suggested_start_local}
                    onChange={(e) => set("suggested_start_local", e.target.value)}
                  />
                  <Select
                    label="Suggested end"
                    options={[{ value: "", label: "No suggested end" }, ...EVENING_FIRST_HALF_HOUR_OPTIONS]}
                    value={form.suggested_end_local}
                    onChange={(e) => set("suggested_end_local", e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Reply deadline (optional)"
                  tooltip="After this date, new replies are closed. People can still view the plan, but they cannot submit new availability."
                  type="date"
                  placeholder="Select date"
                  value={form.response_deadline_local}
                  onChange={(e) => set("response_deadline_local", e.target.value)}
                />
              </div>

              <div>
                <div className="mb-3 flex items-center gap-1.5">
                  <p className="text-sm font-medium text-text">What else should people weigh in on?</p>
                  <InfoTooltip text="Turn on only the questions that matter for this plan, so invitees are not filling extra fields you do not care about." />
                </div>
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
                        className={`pill-toggle ${
                          enabled
                            ? "bg-accent text-white shadow-[0_10px_24px_rgba(47,104,68,0.16),inset_0_1px_0_rgba(255,255,255,0.12)]"
                            : "bg-surface text-text hover:border-accent/40"
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
                  <p className="mt-0.5 text-xs text-muted">Everyone you add later starts as must-attend. Use this when a core group needs to be present for the plan to work.</p>
                </div>
                <button
                  type="button"
                  onClick={() => set("participants_required_by_default", !form.participants_required_by_default)}
                  className={`toggle-switch ${
                    form.participants_required_by_default ? "bg-accent" : "bg-border"
                  }`}
                >
                  <span
                    className={`toggle-thumb ${
                      form.participants_required_by_default ? "translate-x-5" : "translate-x-0"
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-start justify-between py-3 border-b border-border">
                <div>
                  <p className="text-sm font-medium text-text">Allow participants to edit</p>
                  <p className="mt-0.5 text-xs text-muted">Invitees can come back and change their availability after sending their first reply.</p>
                </div>
                <button
                  type="button"
                  onClick={() => set("allow_participant_edit", !form.allow_participant_edit)}
                  className={`toggle-switch ${
                    form.allow_participant_edit ? "bg-accent" : "bg-border"
                  }`}
                >
                  <span
                    className={`toggle-thumb ${
                      form.allow_participant_edit ? "translate-x-5" : "translate-x-0"
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-start justify-between py-3 border-b border-border">
                <div>
                  <p className="text-sm font-medium text-text">Require at least one preference</p>
                  <p className="mt-0.5 text-xs text-muted">Invitees must tell you at least one thing they care about, like food, time of day, or area, before they can submit.</p>
                </div>
                <button
                  type="button"
                  onClick={() => set("preferences_required", !form.preferences_required)}
                  className={`toggle-switch ${
                    form.preferences_required ? "bg-accent" : "bg-border"
                  }`}
                >
                  <span
                    className={`toggle-thumb ${
                      form.preferences_required ? "translate-x-5" : "translate-x-0"
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-start justify-between py-3 border-b border-border">
                <div>
                  <p className="text-sm font-medium text-text">Let participants view the live summary</p>
                  <p className="mt-0.5 text-xs text-muted">Invitees can open a live snapshot of who has replied and which times are currently looking strongest.</p>
                </div>
                <button
                  type="button"
                  onClick={() => set("show_results_to_participants", !form.show_results_to_participants)}
                  className={`toggle-switch ${
                    form.show_results_to_participants ? "bg-accent" : "bg-border"
                  }`}
                >
                  <span
                    className={`toggle-thumb ${
                      form.show_results_to_participants ? "translate-x-5" : "translate-x-0"
                    }`}
                  />
                </button>
              </div>

              <div className="card bg-surface-alt p-4">
                <p className="text-sm font-medium text-text mb-1">Plan summary</p>
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
                    <dd className="text-text tabular-nums">{form.date_range_start_local} – {form.date_range_end_local}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt>Duration</dt>
                    <dd className="text-text tabular-nums">{formatDuration(parseInt(form.meeting_duration_minutes))}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt>Timezone</dt>
                    <dd className="text-text">{form.timezone}</dd>
                  </div>
                  {form.suggested_date_local && form.suggested_start_local && form.suggested_end_local && (
                    <div className="flex justify-between gap-4">
                      <dt>Suggested time</dt>
                      <dd className="text-right text-text tabular-nums">
                        {form.suggested_date_local} {form.suggested_start_local} - {form.suggested_end_local}
                      </dd>
                    </div>
                  )}
                  {form.response_deadline_local && (
                    <div className="flex justify-between">
                      <dt>Reply deadline</dt>
                      <dd className="text-text tabular-nums">{form.response_deadline_local}</dd>
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
                    placeholder="+91 9000000000"
                    value={invitePhone}
                    onChange={(e) => setInvitePhone(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && inviteName.trim() && !inviteEmailError) handleAddParticipant();
                    }}
                  />
                </div>
                <div className="col-span-2 grid grid-cols-1 gap-3 sm:grid-cols-[minmax(0,1fr)_220px]">
                  <label className="flex min-h-12 items-center gap-3 rounded-[18px] bg-surface-alt px-4 py-3 text-sm text-text shadow-[inset_0_0_0_1px_rgba(26,23,20,0.08)]">
                    <input
                      type="checkbox"
                      checked={inviteIsRequired}
                      onChange={(e) => setInviteIsRequired(e.target.checked)}
                      className="h-4 w-4 rounded border-border text-accent focus:ring-accent"
                    />
                    <div>
                      <p className="font-medium text-text">Must attend</p>
                      <p className="text-xs text-muted">Use this when this person needs to be included in the final pick.</p>
                    </div>
                  </label>
                  <div>
                    <p className="mb-1.5 text-xs font-medium text-muted">Priority</p>
                    <select
                      className="input"
                      value={invitePriorityTier}
                      onChange={(e) => setInvitePriorityTier(e.target.value)}
                    >
                      <option value="0">Regular</option>
                      <option value="1">★ Important</option>
                      <option value="2">★★ Key person</option>
                    </select>
                  </div>
                </div>
              </div>

              {inviteError && (
                <p className="text-sm text-danger">{inviteError}</p>
              )}

              {pendingParticipants.length > 0 && (
                <div className="rounded-input bg-surface-alt px-4 py-3 text-sm text-muted shadow-[inset_0_0_0_1px_rgba(26,23,20,0.08)]">
                  <div className="flex items-center gap-2">
                    <svg className="h-3.5 w-3.5 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    <span>
                      Saving {pendingParticipants.length} invitee{pendingParticipants.length === 1 ? "" : "s"} in the background.
                    </span>
                  </div>
                </div>
              )}

              <Button
                onClick={handleAddParticipant}
                disabled={!inviteName.trim() || !!inviteEmailError}
                variant="secondary"
                className="w-full"
              >
                Add invitee
              </Button>

              {addedParticipants.length > 0 && (
                <div className="border-t border-border pt-4 space-y-1">
                <p className="mb-3 text-xs font-medium uppercase tracking-wide text-muted tabular-nums">
                    Private invite links ({addedParticipants.length})
                  </p>
                  {addedParticipants.map((p) => (
                    <div key={p.invite_url} className="flex items-center justify-between gap-3 py-2">
                      <div className="flex items-center gap-2 min-w-0">
                        <div className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full text-xs font-semibold ${avatarColor(p.name)}`}>
                          {p.name[0].toUpperCase()}
                        </div>
                        <span className="text-sm text-text font-medium truncate">{p.name}</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => navigator.clipboard.writeText(p.invite_url)}
                        className="inline-flex min-h-10 flex-shrink-0 items-center rounded-full px-3 text-xs font-medium text-accent shadow-[inset_0_0_0_1px_rgba(47,104,68,0.14)] transition-[color,background-color,transform] duration-150 hover:bg-accent-subtle active:scale-[0.96]"
                      >
                        Copy link
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {pendingParticipants.length > 0 && (
                <div className="border-t border-border pt-4 space-y-2">
                  <p className="text-xs font-medium uppercase tracking-wide text-muted">Saving now</p>
                  {pendingParticipants.map((participant) => (
                    <div key={participant.id} className="flex items-center justify-between gap-3 py-2">
                      <div className="flex min-w-0 items-center gap-2">
                        <div className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full text-xs font-semibold ${avatarColor(participant.name)}`}>
                          {participant.name[0]?.toUpperCase() ?? "?"}
                        </div>
                        <span className="truncate text-sm text-text font-medium">{participant.name}</span>
                      </div>
                      <span className="inline-flex min-h-10 items-center gap-2 rounded-full px-3 text-xs text-muted shadow-[inset_0_0_0_1px_rgba(26,23,20,0.08)]">
                        <svg className="h-3.5 w-3.5 animate-spin" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                        Creating link...
                      </span>
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
              {addedParticipants.length === 0 ? (
                "You can always add more people from the dashboard."
              ) : (
                <span className="tabular-nums">{addedParticipants.length} invitee{addedParticipants.length === 1 ? "" : "s"} added</span>
              )}
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
                if (step === 1 && !validateStepOne()) {
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
            <Button onClick={() => {
              clearDraft();
              router.push(`/e/${createdEventId}/organizer/${createdOrganizerToken}`);
            }}>
              Open organizer dashboard
            </Button>
          )}
        </div>
      </main>
    </div>
  );
}
