"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AvailabilityPicker, type TimeWindow } from "@/components/availability-picker";
import { PreferenceForm, type PreferenceValues, defaultPreferences } from "@/components/preference-form";
import { cn, formatDate } from "@/lib/utils";
import { saveEvent } from "@/components/my-events";
import type { ValidateTokenResponse, ApiError, EventData, ParticipantData } from "@/lib/api-types";
import { hasMeaningfulPreferences, parseEnabledPreferences } from "@/lib/event-settings";

type Step = "availability" | "preferences" | "review" | "success";

export default function RespondPage() {
  const { token } = useParams<{ token: string }>();

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [tokenError, setTokenError] = useState("");

  const [eventId, setEventId] = useState<string | null>(null);
  const [event, setEvent] = useState<EventData | null>(null);
  const [participant, setParticipant] = useState<ParticipantData | null>(null);
  const [step, setStep] = useState<Step>("availability");
  const [windows, setWindows] = useState<TimeWindow[]>([]);
  const [preferences, setPreferences] = useState<PreferenceValues>(defaultPreferences);
  const [localTimezone, setLocalTimezone] = useState("UTC");
  const enabledPreferenceFields = parseEnabledPreferences(event?.enabled_preferences);
  const responseClosed = Boolean(event?.response_deadline && Date.now() / 1000 > event.response_deadline);
  const preferencesSatisfied =
    !event || event.preferences_required !== 1 || hasMeaningfulPreferences(preferences, enabledPreferenceFields);

  useEffect(() => {
    setLocalTimezone(Intl.DateTimeFormat().resolvedOptions().timeZone);
  }, []);

  useEffect(() => {
    if (!token) return;
    async function loadToken() {
      try {
        const res = await fetch(`/api/validate-token?token=${token}`);
        const data = await res.json() as ValidateTokenResponse;

        if (!data.valid) {
          setTokenError("This invite link is invalid or has expired.");
          return;
        }

        if (data.role !== "participant") {
          setTokenError("This link is for the organizer dashboard, not guest replies.");
          return;
        }

        setEventId(data.event_id);
        setEvent(data.event);
        setParticipant(data.participant);

        if ((data.existing_windows?.length ?? 0) > 0) {
          setWindows(
            (data.existing_windows ?? []).map((w) => ({
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
        }
      } catch {
        setTokenError("We couldn't load this invite. Try refreshing.");
      } finally {
        setLoading(false);
      }
    }
    loadToken();
  }, [token]);

  const handleSubmit = async () => {
    if (windows.length === 0) {
      setError("Add at least one time window.");
      return;
    }
    if (responseClosed) {
      setError("Replies are closed for this plan.");
      return;
    }
    if (!preferencesSatisfied) {
      setError("Please add at least one preference before sending your reply.");
      return;
    }
    if (!eventId) return;
    setSubmitting(true);
    setError("");

    try {
      const payload = {
        token,
        availability_windows: windows.map((w) => ({
          start_time: w.start_time,
          end_time: w.end_time,
        })),
        preferences: {
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
        },
      };

      const res = await fetch(`/api/events/${eventId}/respond`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json() as ApiError;
      if (!res.ok) {
        setError(data.error ?? "We couldn't save your reply. Please try again.");
        return;
      }

      if (event && participant) {
        saveEvent({
          id: eventId,
          title: event.title,
          role: "participant",
          token,
          created_at: Math.floor(Date.now() / 1000),
        });
      }

      setStep("success");
    } catch {
      setError("We couldn't save your reply. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-bg flex items-center justify-center">
          <div className="text-center text-muted animate-pulse">Loading your invite...</div>
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
          <h1 className="font-display text-2xl font-semibold text-text mb-2">This invite link cannot be opened</h1>
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
          <h1 className="font-display text-3xl font-bold text-text mb-2">You're in</h1>
          <p className="text-muted mb-2">
            Thanks, <span className="font-medium text-text">{participant?.name}</span>. Your reply is saved.
          </p>
          <p className="text-sm text-muted mb-8">
            The organizer can now factor your availability into the final decision.
          </p>
          <div className="flex flex-col gap-3">
            {event?.show_results_to_participants === 1 && eventId && (
              <Link href={`/e/${eventId}/summary/${token}`} className="btn-secondary text-sm">
                View live summary
              </Link>
            )}
            {event?.allow_participant_edit === 1 && (
              <button
                onClick={() => setStep("availability")}
                className="btn-secondary text-sm"
              >
                Edit my reply
              </button>
            )}
            <Link href="/" className="text-sm text-muted hover:text-accent transition-colors">
              Go home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const isUpdate = participant?.response_status === "responded";
  const steps: Step[] = ["availability", "preferences", "review"];
  const stepIndex = steps.indexOf(step);
  const showDualTimezone = event && localTimezone && localTimezone !== event.timezone;

  return (
    <div className="min-h-screen bg-bg">
      <header className="border-b border-border bg-surface/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-xl mx-auto px-5 h-14 flex items-center justify-between">
          <Link href="/" className="font-display text-xl font-semibold text-text">Togoo</Link>
          {isUpdate && (
              <span className="inline-flex min-h-10 items-center rounded-full bg-surface-alt px-3 py-1 text-xs text-muted shadow-[inset_0_0_0_1px_rgba(26,23,20,0.08)]">
                Editing reply
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
            <p className="text-sm text-muted tabular-nums">
              {formatDate(event.date_range_start, event.timezone)} &mdash; {formatDate(event.date_range_end, event.timezone)}
              <span className="ml-2 text-xs">({event.timezone})</span>
            </p>
            {event.response_deadline && (
              <p className="mt-1 text-sm text-muted tabular-nums">
                Reply by <span className="font-medium text-text">{formatDate(event.response_deadline, event.timezone)}</span>
              </p>
            )}
            {participant && (
              <p className="text-sm text-muted mt-1">
                  Replying as <span className="font-medium text-text">{participant.name}</span>
                </p>
              )}
          </div>
        )}

        {responseClosed && (
            <div className="mb-5 rounded-input bg-warning-light px-4 py-3 text-sm text-warning shadow-[inset_0_0_0_1px_rgba(180,83,9,0.12)]">
             Replies are closed for this plan.
            </div>
        )}

        <div className="flex items-center gap-2 mb-6">
          {(["availability", "preferences", "review"] as const).map((s, i) => (
            <div key={s} className="flex items-center gap-2">
              <div className={cn(
                "flex h-8 w-8 items-center justify-center rounded-full text-xs font-semibold tabular-nums transition-[background-color,color,box-shadow] duration-200",
                step === s
                  ? "bg-accent text-white shadow-[0_8px_20px_rgba(47,104,68,0.16)]"
                  : stepIndex > i
                    ? "bg-accent-light text-accent"
                    : "bg-border text-muted"
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
              <h2 className="font-display text-xl font-semibold text-text mb-1">When could you make it?</h2>
              <p className="text-sm text-muted mb-5">
                Pick the windows when you could realistically make it. The more flexibility you share, the easier it is to find a time that works for everyone.
                Times are shown in <strong>{event.timezone}</strong>.
              </p>
              <AvailabilityPicker
                windows={windows}
                onChange={setWindows}
                dateRangeStart={event.date_range_start}
                dateRangeEnd={event.date_range_end}
                timezone={event.timezone}
                allowedHoursStart={event.allowed_hours_start}
                allowedHoursEnd={event.allowed_hours_end}
                meetingDurationMinutes={event.meeting_duration_minutes}
              />
            </div>
          )}

          {step === "preferences" && (
            <div>
              <h2 className="font-display text-xl font-semibold text-text mb-1">Any preferences?</h2>
              <p className="text-sm text-muted mb-5">
                {event?.preferences_required === 1
                  ? "Required for this plan. Add at least one preference so the organizer can weigh tradeoffs."
                  : "Optional, but helpful when the organizer is weighing tradeoffs."}
              </p>
              <PreferenceForm
                values={preferences}
                onChange={setPreferences}
                enabledFields={enabledPreferenceFields}
              />
            </div>
          )}

          {step === "review" && event && (
            <div>
              <h2 className="font-display text-xl font-semibold text-text mb-1">Ready to send your reply?</h2>
              <p className="text-sm text-muted mb-5">Check your availability and preferences before you submit.</p>

              <div className="space-y-3">
                <div>
                  <p className="mb-2 text-xs font-medium uppercase tracking-wide text-muted tabular-nums">
                    Your availability ({windows.length} window{windows.length !== 1 ? "s" : ""})
                  </p>
                  {windows.map((win) => {
                    const eventTzFmt = new Intl.DateTimeFormat("en-US", {
                      weekday: "short", month: "short", day: "numeric",
                      hour: "numeric", minute: "2-digit", timeZone: event.timezone,
                    });
                    const endFmt = new Intl.DateTimeFormat("en-US", {
                      hour: "numeric", minute: "2-digit", timeZone: event.timezone,
                    });
                    const localFmt = new Intl.DateTimeFormat("en-US", {
                      hour: "numeric", minute: "2-digit", timeZone: localTimezone,
                    });
                    const start = eventTzFmt.format(new Date(win.start_time * 1000));
                    const end = endFmt.format(new Date(win.end_time * 1000));
                    const localStart = localFmt.format(new Date(win.start_time * 1000));
                    const localEnd = localFmt.format(new Date(win.end_time * 1000));
                    return (
                      <div key={win.id} className="py-1.5">
                        <div className="flex items-center gap-2 text-sm text-text tabular-nums">
                          <div className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" />
                          {start} – {end}
                          <span className="text-xs text-muted">({event.timezone})</span>
                        </div>
                        {showDualTimezone && (
                          <p className="ml-3.5 mt-0.5 text-xs text-muted tabular-nums">
                            {localStart} – {localEnd} your time ({localTimezone})
                          </p>
                        )}
                      </div>
                    );
                  })}
                </div>

                {(preferences.food_preference !== "no_preference" ||
                  preferences.budget_preference !== "no_preference" ||
                  preferences.preferred_day_type !== "no_preference" ||
                  preferences.preferred_time_of_day !== "no_preference" ||
                  preferences.indoor_outdoor !== "no_preference" ||
                  preferences.preferred_area ||
                  preferences.notes) && (
                  <div className="border-t border-border pt-3">
                    <p className="text-xs font-medium text-muted uppercase tracking-wide mb-2">Your preferences</p>
                    <dl className="text-sm space-y-1">
                      {preferences.food_preference !== "no_preference" && (
                        <div className="flex gap-2"><dt className="text-muted">Food:</dt><dd className="text-text">{preferences.food_preference.replace(/_/g, " ")}</dd></div>
                      )}
                      {preferences.budget_preference !== "no_preference" && (
                        <div className="flex gap-2"><dt className="text-muted">Budget:</dt><dd className="text-text">{preferences.budget_preference.replace(/_/g, " ")}</dd></div>
                      )}
                      {preferences.preferred_time_of_day !== "no_preference" && (
                        <div className="flex gap-2"><dt className="text-muted">Time:</dt><dd className="text-text">{preferences.preferred_time_of_day.replace(/_/g, " ")}</dd></div>
                      )}
                      {preferences.preferred_area && (
                        <div className="flex gap-2"><dt className="text-muted">Area:</dt><dd className="text-text">{preferences.preferred_area}</dd></div>
                      )}
                      {preferences.notes && (
                        <div className="flex gap-2"><dt className="text-muted">Notes:</dt><dd className="text-text">{preferences.notes}</dd></div>
                      )}
                    </dl>
                  </div>
                )}
              </div>

              {error && (
                <div className="mt-4 rounded-input bg-danger-light px-4 py-3 text-sm text-danger shadow-[inset_0_0_0_1px_rgba(185,28,28,0.12)]">
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
            <Button
              disabled={responseClosed || !preferencesSatisfied}
              onClick={() => {
                if (!preferencesSatisfied) {
                  setError("Please add at least one preference before continuing.");
                  return;
                }
                setError("");
                setStep("review");
              }}
            >
              Continue
            </Button>
          )}
          {step === "review" && (
            <Button loading={submitting} disabled={responseClosed || !preferencesSatisfied} onClick={handleSubmit}>
              {isUpdate ? "Update my reply" : "Send my reply"}
            </Button>
          )}
        </div>
      </main>
    </div>
  );
}
