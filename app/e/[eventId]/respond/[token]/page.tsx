"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AvailabilityPicker, type TimeWindow } from "@/components/availability-picker";
import { PreferenceForm, type PreferenceValues, defaultPreferences } from "@/components/preference-form";
import { cn, formatDate } from "@/lib/utils";

interface EventData {
  id: string;
  title: string;
  description: string | null;
  event_type: string;
  timezone: string;
  date_range_start: number;
  date_range_end: number;
  meeting_duration_minutes: number;
  response_deadline: number | null;
  allow_participant_edit: number;
  status: string;
}

interface ParticipantData {
  id: string;
  name: string;
  response_status: string;
}

type Step = "availability" | "preferences" | "review" | "success";

export default function RespondPage() {
  const params = useParams<{ eventId: string; token: string }>();
  const { eventId, token } = params;

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [tokenError, setTokenError] = useState("");

  const [event, setEvent] = useState<EventData | null>(null);
  const [participant, setParticipant] = useState<ParticipantData | null>(null);
  const [step, setStep] = useState<Step>("availability");
  const [windows, setWindows] = useState<TimeWindow[]>([]);
  const [preferences, setPreferences] = useState<PreferenceValues>(defaultPreferences);
  const [showPreferences, setShowPreferences] = useState(false);

  useEffect(() => {
    async function loadToken() {
      try {
        const res = await fetch(`/api/validate-token?token=${token}`);
        const data = await res.json();

        if (!data.valid) {
          setTokenError("This invite link is invalid or has expired.");
          return;
        }

        setEvent(data.event);
        setParticipant(data.participant);

        if (data.existing_windows?.length > 0) {
          setWindows(
            data.existing_windows.map((w: { id: string; start_time: number; end_time: number }) => ({
              id: w.id,
              start_time: w.start_time,
              end_time: w.end_time,
            }))
          );
        }

        if (data.existing_preferences) {
          const p = data.existing_preferences;
          setPreferences({
            preferred_area: p.preferred_area ?? "",
            max_travel_distance: p.max_travel_distance?.toString() ?? "",
            food_preference: p.food_preference ?? "no_preference",
            food_note: p.food_note ?? "",
            budget_preference: p.budget_preference ?? "no_preference",
            preferred_day_type: p.preferred_day_type ?? "no_preference",
            preferred_time_of_day: p.preferred_time_of_day ?? "no_preference",
            indoor_outdoor: p.indoor_outdoor ?? "no_preference",
            notes: p.notes ?? "",
          });
          setShowPreferences(true);
        }
      } catch {
        setTokenError("Failed to load event. Please try refreshing.");
      } finally {
        setLoading(false);
      }
    }
    loadToken();
  }, [token]);

  const handleSubmit = async () => {
    if (windows.length === 0) {
      setError("Please add at least one availability window.");
      return;
    }
    setSubmitting(true);
    setError("");

    try {
      const payload = {
        token,
        availability_windows: windows.map((w) => ({
          start_time: w.start_time,
          end_time: w.end_time,
        })),
        preferences: showPreferences
          ? {
              preferred_area: preferences.preferred_area || undefined,
              max_travel_distance: preferences.max_travel_distance
                ? parseInt(preferences.max_travel_distance)
                : undefined,
              food_preference: preferences.food_preference,
              food_note: preferences.food_note || undefined,
              budget_preference: preferences.budget_preference,
              preferred_day_type: preferences.preferred_day_type,
              preferred_time_of_day: preferences.preferred_time_of_day,
              indoor_outdoor: preferences.indoor_outdoor,
              notes: preferences.notes || undefined,
            }
          : undefined,
      };

      const res = await fetch(`/api/events/${eventId}/respond`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Submission failed. Please try again.");
        return;
      }

      setStep("success");
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-bg flex items-center justify-center">
        <div className="text-center text-muted animate-pulse">Loading...</div>
      </div>
    );
  }

  if (tokenError) {
    return (
      <div className="min-h-screen bg-bg flex items-center justify-center px-5">
        <div className="text-center max-w-sm">
          <div className="w-12 h-12 rounded-full bg-danger-light flex items-center justify-center mx-auto mb-4">
            <svg className="w-6 h-6 text-danger" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h1 className="font-display text-2xl font-semibold text-text mb-2">Invalid link</h1>
          <p className="text-muted mb-6">{tokenError}</p>
          <Link href="/" className="btn-secondary">Go home</Link>
        </div>
      </div>
    );
  }

  if (step === "success") {
    return (
      <div className="min-h-screen bg-bg flex items-center justify-center px-5">
        <div className="text-center max-w-sm animate-scale-in">
          <div className="w-14 h-14 rounded-full bg-accent-subtle flex items-center justify-center mx-auto mb-5">
            <svg className="w-7 h-7 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="font-display text-3xl font-bold text-text mb-2">You&apos;re in!</h1>
          <p className="text-muted mb-2">
            Thanks, <span className="font-medium text-text">{participant?.name}</span>. Your availability has been saved.
          </p>
          <p className="text-sm text-muted mb-8">
            The organizer will review responses and get back to you with the final time.
          </p>
          {event?.allow_participant_edit === 1 && (
            <button
              onClick={() => setStep("availability")}
              className="btn-secondary text-sm"
            >
              Edit my response
            </button>
          )}
        </div>
      </div>
    );
  }

  const isUpdate = participant?.response_status === "responded";
  const steps: Step[] = ["availability", "preferences", "review"];
  const stepIndex = steps.indexOf(step);

  return (
    <div className="min-h-screen bg-bg">
      <header className="border-b border-border bg-surface/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-xl mx-auto px-5 h-14 flex items-center justify-between">
          <span className="font-display text-xl font-semibold text-text">where to go</span>
          {isUpdate && (
            <span className="text-xs text-muted bg-surface-alt border border-border rounded-full px-3 py-1">
              Editing response
            </span>
          )}
        </div>
      </header>

      <main className="max-w-xl mx-auto px-5 py-8">
        {event && (
          <div className="mb-8 animate-fade-in">
            <p className="text-xs font-medium text-accent uppercase tracking-wide mb-1">{event.event_type}</p>
            <h1 className="font-display text-3xl font-bold text-text mb-1">{event.title}</h1>
            {event.description && <p className="text-muted text-sm mb-2">{event.description}</p>}
            <p className="text-sm text-muted">
              {formatDate(event.date_range_start, event.timezone)} &mdash; {formatDate(event.date_range_end, event.timezone)}
            </p>
            {participant && (
              <p className="text-sm text-muted mt-1">
                Responding as <span className="font-medium text-text">{participant.name}</span>
              </p>
            )}
          </div>
        )}

        <div className="flex items-center gap-2 mb-6">
          {(["availability", "preferences", "review"] as const).map((s, i) => (
            <div key={s} className="flex items-center gap-2">
              <div className={cn(
                "w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold transition-all",
                step === s ? "bg-accent text-white" : stepIndex > i ? "bg-accent-light text-accent" : "bg-border text-muted"
              )}>
                {stepIndex > i ? (
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (i + 1)}
              </div>
              <span className={cn("text-sm capitalize", step === s ? "text-text font-medium" : "text-muted")}>
                {s === "availability" ? "Availability" : s === "preferences" ? "Preferences" : "Review"}
              </span>
              {i < 2 && <div className="w-6 h-px bg-border mx-1" />}
            </div>
          ))}
        </div>

        <div className="card p-5 animate-scale-in">
          {step === "availability" && event && (
            <div>
              <h2 className="font-display text-xl font-semibold text-text mb-1">When are you free?</h2>
              <p className="text-sm text-muted mb-5">
                Add broad windows when you could meet — the more generous, the better the recommendations.
              </p>
              <AvailabilityPicker
                windows={windows}
                onChange={setWindows}
                dateRangeStart={event.date_range_start}
                dateRangeEnd={event.date_range_end}
                timezone={event.timezone}
              />
            </div>
          )}

          {step === "preferences" && (
            <div>
              <h2 className="font-display text-xl font-semibold text-text mb-1">Any preferences?</h2>
              <p className="text-sm text-muted mb-5">
                Optional, but helps the organizer find a spot that works for everyone.
              </p>

              <div className="flex items-center gap-3 mb-5 p-3 bg-surface-alt rounded-input">
                <button
                  type="button"
                  onClick={() => setShowPreferences(!showPreferences)}
                  className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${showPreferences ? "bg-accent" : "bg-border"}`}
                >
                  <span className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white shadow transition-transform ${showPreferences ? "translate-x-4" : "translate-x-0.5"}`} />
                </button>
                <span className="text-sm text-text">Include my preferences</span>
              </div>

              {showPreferences && (
                <PreferenceForm values={preferences} onChange={setPreferences} />
              )}
            </div>
          )}

          {step === "review" && event && (
            <div>
              <h2 className="font-display text-xl font-semibold text-text mb-1">Looks good?</h2>
              <p className="text-sm text-muted mb-5">Review your availability before submitting.</p>

              <div className="space-y-3">
                <div>
                  <p className="text-xs font-medium text-muted uppercase tracking-wide mb-2">
                    Your availability ({windows.length} window{windows.length !== 1 ? "s" : ""})
                  </p>
                  {windows.map((win) => {
                    const start = new Intl.DateTimeFormat("en-US", {
                      weekday: "short", month: "short", day: "numeric",
                      hour: "numeric", minute: "2-digit", timeZone: event.timezone,
                    }).format(new Date(win.start_time * 1000));
                    const end = new Intl.DateTimeFormat("en-US", {
                      hour: "numeric", minute: "2-digit", timeZone: event.timezone,
                    }).format(new Date(win.end_time * 1000));
                    return (
                      <div key={win.id} className="flex items-center gap-2 text-sm text-text py-1.5">
                        <div className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" />
                        {start} – {end}
                      </div>
                    );
                  })}
                </div>

                {showPreferences && (
                  <div className="border-t border-border pt-3">
                    <p className="text-xs font-medium text-muted uppercase tracking-wide mb-2">Preferences</p>
                    <dl className="text-sm space-y-1">
                      {preferences.food_preference !== "no_preference" && (
                        <div className="flex gap-2"><dt className="text-muted">Food:</dt><dd className="text-text">{preferences.food_preference.replace("_", " ")}</dd></div>
                      )}
                      {preferences.preferred_time_of_day !== "no_preference" && (
                        <div className="flex gap-2"><dt className="text-muted">Time:</dt><dd className="text-text">{preferences.preferred_time_of_day.replace("_", " ")}</dd></div>
                      )}
                      {preferences.preferred_area && (
                        <div className="flex gap-2"><dt className="text-muted">Area:</dt><dd className="text-text">{preferences.preferred_area}</dd></div>
                      )}
                    </dl>
                  </div>
                )}
              </div>

              {error && (
                <div className="mt-4 bg-danger-light border border-danger/20 rounded-input px-4 py-3 text-sm text-danger">
                  {error}
                </div>
              )}
            </div>
          )}
        </div>

        <div className="flex justify-between mt-5">
          {step !== "availability" ? (
            <Button variant="secondary" onClick={() => {
              if (step === "review") setStep("preferences");
              if (step === "preferences") setStep("availability");
            }}>
              Back
            </Button>
          ) : (
            <div />
          )}

          {step === "availability" && (
            <Button disabled={windows.length === 0} onClick={() => setStep("preferences")}>
              Continue
            </Button>
          )}
          {step === "preferences" && (
            <Button onClick={() => setStep("review")}>
              Continue
            </Button>
          )}
          {step === "review" && (
            <Button loading={submitting} onClick={handleSubmit}>
              {isUpdate ? "Update response" : "Submit availability"}
            </Button>
          )}
        </div>
      </main>
    </div>
  );
}
