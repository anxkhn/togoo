"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input, Textarea } from "@/components/ui/input";
import { Select } from "@/components/ui/select";

const TIMEZONES = [
  "UTC",
  "America/New_York",
  "America/Chicago",
  "America/Denver",
  "America/Los_Angeles",
  "America/Toronto",
  "America/Vancouver",
  "Europe/London",
  "Europe/Paris",
  "Europe/Berlin",
  "Europe/Rome",
  "Europe/Madrid",
  "Europe/Amsterdam",
  "Europe/Zurich",
  "Asia/Dubai",
  "Asia/Kolkata",
  "Asia/Singapore",
  "Asia/Tokyo",
  "Asia/Shanghai",
  "Asia/Seoul",
  "Asia/Bangkok",
  "Australia/Sydney",
  "Australia/Melbourne",
  "Pacific/Auckland",
];

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
  allow_participant_edit: boolean;
  show_results_to_participants: boolean;
  organizer_name: string;
  organizer_email: string;
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
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC",
    date_range_start_local: todayPlus(1),
    date_range_end_local: todayPlus(14),
    allowed_hours_start: "9",
    allowed_hours_end: "22",
    meeting_duration_minutes: "120",
    slot_granularity_minutes: "30",
    scoring_mode: "maximize_attendance",
    allow_participant_edit: true,
    show_results_to_participants: false,
    organizer_name: "",
    organizer_email: "",
  });

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
        allow_participant_edit: form.allow_participant_edit,
        show_results_to_participants: form.show_results_to_participants,
        participants_required_by_default: false,
        preferences_required: false,
        organizer_name: form.organizer_name.trim(),
        organizer_email: form.organizer_email.trim() || undefined,
      };

      const res = await fetch("/api/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Failed to create event. Please try again.");
        return;
      }

      router.push(data.dashboard_url);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  const steps = [
    { n: 1, label: "Event details" },
    { n: 2, label: "Schedule" },
    { n: 3, label: "Settings" },
  ];

  return (
    <div className="min-h-screen bg-bg">
      <header className="border-b border-border bg-surface/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-2xl mx-auto px-5 h-14 flex items-center justify-between">
          <Link href="/" className="font-display text-xl font-semibold text-text">
            where to go
          </Link>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-5 py-12">
        <div className="mb-10">
          <h1 className="font-display text-4xl font-bold text-text mb-2">Plan a meetup</h1>
          <p className="text-muted">Set up your event and invite people to respond.</p>
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
                label="Your email (optional)"
                type="email"
                placeholder="alex@example.com"
                value={form.organizer_email}
                onChange={(e) => set("organizer_email", e.target.value)}
              />
              <Input
                label="Event title"
                placeholder="e.g., Team dinner, Birthday hangout..."
                value={form.title}
                onChange={(e) => set("title", e.target.value)}
                required
              />
              <Textarea
                label="Description (optional)"
                placeholder="Give your group some context..."
                rows={3}
                value={form.description}
                onChange={(e) => set("description", e.target.value)}
              />
              <Select
                label="Event type"
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
                options={TIMEZONES.map((tz) => ({ value: tz, label: tz.replace(/_/g, " ") }))}
                value={form.timezone}
                onChange={(e) => set("timezone", e.target.value)}
                hint="All participants will see times in this timezone."
              />
              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="Earliest possible date"
                  type="date"
                  value={form.date_range_start_local}
                  onChange={(e) => set("date_range_start_local", e.target.value)}
                />
                <Input
                  label="Latest possible date"
                  type="date"
                  value={form.date_range_end_local}
                  onChange={(e) => set("date_range_end_local", e.target.value)}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Select
                  label="Earliest allowed hour"
                  options={Array.from({ length: 24 }, (_, i) => ({
                    value: String(i),
                    label: `${i === 0 ? "12 AM" : i < 12 ? `${i} AM` : i === 12 ? "12 PM" : `${i - 12} PM`}`,
                  }))}
                  value={form.allowed_hours_start}
                  onChange={(e) => set("allowed_hours_start", e.target.value)}
                />
                <Select
                  label="Latest allowed hour"
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
                  label="Meeting duration"
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
                  label="Slot precision"
                  options={[
                    { value: "30", label: "30 minutes" },
                    { value: "15", label: "15 minutes" },
                  ]}
                  value={form.slot_granularity_minutes}
                  onChange={(e) => set("slot_granularity_minutes", e.target.value)}
                />
              </div>
              <Select
                label="Recommendation strategy"
                options={[
                  { value: "maximize_attendance", label: "Maximize attendance" },
                  { value: "prioritize_required", label: "Prioritize required attendees" },
                  { value: "prefer_evenings", label: "Prefer evening times" },
                  { value: "prefer_weekends", label: "Prefer weekends" },
                ]}
                value={form.scoring_mode}
                onChange={(e) => set("scoring_mode", e.target.value)}
              />
            </div>
          )}

          {step === 3 && (
            <div className="space-y-5">
              <div className="space-y-4">
                <div className="flex items-start justify-between py-3 border-b border-border">
                  <div>
                    <p className="text-sm font-medium text-text">Allow participants to edit</p>
                    <p className="text-xs text-muted mt-0.5">Let people update their availability after submitting</p>
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
                <div className="flex items-start justify-between py-3">
                  <div>
                    <p className="text-sm font-medium text-text">Show results to participants</p>
                    <p className="text-xs text-muted mt-0.5">Let participants see the recommended time slots</p>
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
              </div>

              <div className="card bg-surface-alt p-4 mt-2">
                <p className="text-sm font-medium text-text mb-1">Review</p>
                <dl className="text-sm space-y-1 text-muted">
                  <div className="flex justify-between">
                    <dt>Event</dt>
                    <dd className="text-text font-medium">{form.title || "(untitled)"}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt>Organizer</dt>
                    <dd className="text-text">{form.organizer_name || "(no name)"}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt>Date range</dt>
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
                </dl>
              </div>

              {error && (
                <div className="bg-danger-light border border-danger/20 rounded-input px-4 py-3 text-sm text-danger">
                  {error}
                </div>
              )}
            </div>
          )}
        </div>

        <div className="flex justify-between mt-6">
          {step > 1 ? (
            <Button variant="secondary" onClick={() => setStep(step - 1)}>
              Back
            </Button>
          ) : (
            <Link href="/" className="btn-secondary inline-flex items-center">
              Cancel
            </Link>
          )}

          {step < 3 ? (
            <Button
              onClick={() => {
                if (step === 1 && (!form.organizer_name.trim() || !form.title.trim())) {
                  setError("Please fill in your name and event title.");
                  return;
                }
                setError("");
                setStep(step + 1);
              }}
            >
              Continue
            </Button>
          ) : (
            <Button
              loading={loading}
              onClick={handleSubmit}
              disabled={!form.title.trim() || !form.organizer_name.trim()}
            >
              Create event
            </Button>
          )}
        </div>
      </main>
    </div>
  );
}
