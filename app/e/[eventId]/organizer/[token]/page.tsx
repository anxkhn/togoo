"use client";

import { useEffect, useState, useCallback } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { RecommendationCards } from "@/components/recommendation-cards";
import { OverlapHeatmap } from "@/components/overlap-heatmap";
import { ShareButtons } from "@/components/share-buttons";
import { cn, formatDate, formatTime } from "@/lib/utils";
import type { RecommendationSet, ScoredMeeting } from "@/lib/scheduling";

interface Participant {
  id: string;
  name: string;
  email: string | null;
  role: string;
  is_required: number;
  priority_tier: number;
  response_status: string;
  invite_token: string | null;
}

interface Event {
  id: string;
  title: string;
  description: string | null;
  event_type: string;
  timezone: string;
  date_range_start: number;
  date_range_end: number;
  meeting_duration_minutes: number;
  status: string;
  allow_participant_edit: number;
}

interface ActivityLog {
  id: string;
  action: string;
  actor_id: string | null;
  data: string | null;
  created_at: number;
}

function CopyButton({ text, label }: { text: string; label: string }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={copy}
      className="inline-flex items-center gap-1.5 text-xs text-muted hover:text-accent transition-colors py-1 px-2 rounded hover:bg-accent-subtle"
    >
      {copied ? (
        <>
          <svg className="w-3.5 h-3.5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
          </svg>
          Copied
        </>
      ) : (
        <>
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
          {label}
        </>
      )}
    </button>
  );
}

function TierBadge({ tier }: { tier: number }) {
  if (tier === 2) return <span className="text-amber-500 text-sm" title="Key person">★★</span>;
  if (tier === 1) return <span className="text-amber-400 text-sm" title="Important">★</span>;
  return null;
}

function ParticipantRow({
  participant,
  eventId,
  onUpdate,
  onRemove,
  onRegenerateToken,
}: {
  participant: Participant;
  eventId: string;
  onUpdate: (id: string, updates: Partial<Participant>) => Promise<void>;
  onRemove: (id: string) => Promise<void>;
  onRegenerateToken: (id: string) => Promise<string>;
}) {
  const [editing, setEditing] = useState(false);
  const [editName, setEditName] = useState(participant.name);
  const [editEmail, setEditEmail] = useState(participant.email ?? "");
  const [saving, setSaving] = useState(false);
  const [newToken, setNewToken] = useState<string | null>(null);

  const currentToken = newToken ?? participant.invite_token;
  const inviteUrl = currentToken
    ? `${window.location.origin}/e/${eventId}/respond/${currentToken}`
    : null;

  return (
    <div className="flex items-start gap-3 py-3.5 border-b border-border last:border-0">
      <div className="w-8 h-8 rounded-full bg-accent-subtle flex items-center justify-center flex-shrink-0 font-display font-semibold text-accent text-sm">
        {participant.name[0].toUpperCase()}
      </div>
      <div className="flex-1 min-w-0">
        {editing ? (
          <div className="space-y-2">
            <div className="grid grid-cols-2 gap-2">
              <input
                className="input text-sm"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                placeholder="Name"
              />
              <input
                className="input text-sm"
                value={editEmail}
                onChange={(e) => setEditEmail(e.target.value)}
                placeholder="Email (optional)"
                type="email"
              />
            </div>
            <div className="flex gap-2">
              <Button
                size="sm"
                loading={saving}
                onClick={async () => {
                  setSaving(true);
                  await onUpdate(participant.id, { name: editName, email: editEmail || null });
                  setSaving(false);
                  setEditing(false);
                }}
              >
                Save
              </Button>
              <Button size="sm" variant="ghost" onClick={() => setEditing(false)}>
                Cancel
              </Button>
            </div>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-sm font-medium text-text">{participant.name}</span>
              <TierBadge tier={participant.priority_tier} />
              {participant.is_required === 1 && (
                <Badge variant="warning" className="text-xs">Required</Badge>
              )}
              <Badge variant={participant.response_status === "responded" ? "success" : "default"}>
                {participant.response_status === "responded" ? "Responded" : "Pending"}
              </Badge>
            </div>
            {participant.email && (
              <p className="text-xs text-muted mt-0.5">{participant.email}</p>
            )}
            {inviteUrl && (
              <div className="mt-1.5 space-y-1">
                <div className="flex items-center gap-1">
                  <span className="text-xs text-muted font-mono truncate max-w-xs">{inviteUrl}</span>
                  <CopyButton text={inviteUrl} label="Copy" />
                </div>
                <ShareButtons
                  path={`/e/${eventId}/respond/${currentToken}`}
                  title={`You're invited`}
                  participantName={participant.name}
                  participantEmail={participant.email}
                />
              </div>
            )}
          </div>
        )}
      </div>
      {participant.role !== "organizer" && !editing && (
        <div className="flex items-center gap-1 flex-shrink-0">
          <button onClick={() => setEditing(true)} className="btn-ghost p-1.5" title="Edit">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </button>
          <button
            onClick={async () => {
              const tok = await onRegenerateToken(participant.id);
              setNewToken(tok);
            }}
            className="btn-ghost p-1.5"
            title="Regenerate invite link"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </button>
          <button
            onClick={() => {
              if (confirm(`Remove ${participant.name}?`)) onRemove(participant.id);
            }}
            className="btn-ghost p-1.5 hover:!text-danger"
            title="Remove participant"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}

export default function OrganizerDashboard() {
  const params = useParams<{ eventId: string; token: string }>();
  const { eventId, token } = params;

  const [event, setEvent] = useState<Event | null>(null);
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [stats, setStats] = useState({ total_invited: 0, total_responded: 0, pending: 0 });
  const [recommendations, setRecommendations] = useState<RecommendationSet | null>(null);
  const [recStats, setRecStats] = useState<{ response_rate: number } | null>(null);
  const [heatmapSlots, setHeatmapSlots] = useState<Array<{ slot_start: number; participant_ids: string[] }>>([]);
  const [activityLog, setActivityLog] = useState<ActivityLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [recLoading, setRecLoading] = useState(false);
  const [selectedMeeting, setSelectedMeeting] = useState<ScoredMeeting | null>(null);
  const [finalizing, setFinalizing] = useState(false);
  const [tab, setTab] = useState<"recommendations" | "participants" | "activity">("recommendations");
  const [addingParticipant, setAddingParticipant] = useState(false);
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newTier, setNewTier] = useState("0");
  const [newExpiresHours, setNewExpiresHours] = useState("0");
  const [addLoading, setAddLoading] = useState(false);
  const [pageError, setPageError] = useState("");

  const headers = { "x-organizer-token": token };

  const fetchDashboard = useCallback(async () => {
    try {
      const [eventRes, participantsRes] = await Promise.all([
        fetch(`/api/events/${eventId}`),
        fetch(`/api/events/${eventId}/participants`, { headers }),
      ]);

      if (!eventRes.ok) {
        setPageError("Event not found or you don't have access.");
        return;
      }

      const eventData = await eventRes.json();
      const participantsData = await participantsRes.json();

      setEvent(eventData.event);
      setStats(eventData.stats);
      setParticipants(participantsData.participants ?? []);
    } catch {
      setPageError("Failed to load event data.");
    } finally {
      setLoading(false);
    }
  }, [eventId, token]);

  const fetchRecommendations = useCallback(async () => {
    setRecLoading(true);
    try {
      const res = await fetch(`/api/events/${eventId}/recommendations`, { headers });
      if (res.ok) {
        const data = await res.json();
        setRecommendations(data.recommendations);
        setRecStats(data.stats);

        const bySlot = new Map<number, Set<string>>();
        for (const c of data.recommendations?.top_candidates ?? []) {
          if (!bySlot.has(c.start)) bySlot.set(c.start, new Set());
          for (const id of c.attendingIds) bySlot.get(c.start)!.add(id);
        }
        setHeatmapSlots(
          [...bySlot.entries()].map(([slot_start, ids]) => ({ slot_start, participant_ids: [...ids] }))
        );
      }
    } catch {
      // non-critical
    } finally {
      setRecLoading(false);
    }
  }, [eventId, token]);

  useEffect(() => { fetchDashboard(); }, [fetchDashboard]);
  useEffect(() => { if (!loading) fetchRecommendations(); }, [loading, fetchRecommendations]);

  const handleAddParticipant = async () => {
    if (!newName.trim()) return;
    setAddLoading(true);
    try {
      const res = await fetch(`/api/events/${eventId}/participants`, {
        method: "POST",
        headers: { ...headers, "Content-Type": "application/json" },
        body: JSON.stringify({
          name: newName.trim(),
          email: newEmail.trim() || undefined,
          is_required: false,
          priority_tier: parseInt(newTier),
          token_expires_hours: parseInt(newExpiresHours) || undefined,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setParticipants((prev) => [
          ...prev,
          {
            ...data.participant,
            role: "participant",
            response_status: "pending",
            invite_token: data.invite_token,
            priority_tier: data.participant.priority_tier ?? parseInt(newTier),
          },
        ]);
        setStats((s) => ({ ...s, total_invited: s.total_invited + 1, pending: s.pending + 1 }));
        setNewName("");
        setNewEmail("");
        setNewTier("0");
        setNewExpiresHours("0");
        setAddingParticipant(false);
      }
    } finally {
      setAddLoading(false);
    }
  };

  const handleUpdateParticipant = async (id: string, updates: Partial<Participant>) => {
    await fetch(`/api/events/${eventId}/participants/${id}`, {
      method: "PUT",
      headers: { ...headers, "Content-Type": "application/json" },
      body: JSON.stringify({ name: updates.name, email: updates.email, is_required: updates.is_required }),
    });
    setParticipants((prev) => prev.map((p) => (p.id === id ? { ...p, ...updates } : p)));
  };

  const handleRemoveParticipant = async (id: string) => {
    await fetch(`/api/events/${eventId}/participants/${id}`, { method: "DELETE", headers });
    setParticipants((prev) => prev.filter((p) => p.id !== id));
  };

  const handleRegenerateToken = async (participantId: string): Promise<string> => {
    const res = await fetch(`/api/events/${eventId}/participants/${participantId}/token`, {
      method: "POST",
      headers,
    });
    const data = await res.json();
    return data.invite_token;
  };

  const handleFinalize = async () => {
    if (!selectedMeeting) return;
    setFinalizing(true);
    try {
      const res = await fetch(`/api/events/${eventId}/finalize`, {
        method: "POST",
        headers: { ...headers, "Content-Type": "application/json" },
        body: JSON.stringify({ slot_start: selectedMeeting.start, slot_end: selectedMeeting.end }),
      });
      if (res.ok) {
        setEvent((e) => e ? { ...e, status: "finalized" } : e);
      }
    } finally {
      setFinalizing(false);
    }
  };

  const handleReopen = async () => {
    if (!confirm("Reopen this event? The finalized selection will be cleared.")) return;
    await fetch(`/api/events/${eventId}/reopen`, { method: "POST", headers });
    setEvent((e) => e ? { ...e, status: "active" } : e);
    setSelectedMeeting(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-bg flex items-center justify-center">
        <div className="text-center text-muted animate-pulse">Loading dashboard...</div>
      </div>
    );
  }

  if (pageError || !event) {
    return (
      <div className="min-h-screen bg-bg flex items-center justify-center">
        <div className="text-center">
          <p className="text-danger mb-4">{pageError || "Event not found"}</p>
          <Link href="/" className="btn-secondary">Go home</Link>
        </div>
      </div>
    );
  }

  const nonOrganizerParticipants = participants.filter((p) => p.role !== "organizer");
  const responseRate = stats.total_invited > 0 ? Math.round((stats.total_responded / stats.total_invited) * 100) : 0;

  return (
    <div className="min-h-screen bg-bg">
      <header className="border-b border-border bg-surface/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-5 h-14 flex items-center justify-between gap-4">
          <Link href="/" className="font-display text-xl font-semibold text-text flex-shrink-0">
            Togoo
          </Link>
          <div className="flex items-center gap-3">
            <Badge variant={event.status === "finalized" ? "success" : "default"}>
              {event.status === "finalized" ? "Finalized" : "Active"}
            </Badge>
            {event.status === "finalized" && (
              <Button variant="secondary" size="sm" onClick={handleReopen}>Reopen</Button>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-5 py-8">
        <div className="mb-8 animate-slide-up">
          <p className="text-xs font-medium text-muted uppercase tracking-wide mb-1">{event.event_type}</p>
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-text">{event.title}</h1>
          {event.description && <p className="mt-2 text-muted">{event.description}</p>}
          <p className="mt-2 text-sm text-muted">
            {formatDate(event.date_range_start, event.timezone)} &mdash; {formatDate(event.date_range_end, event.timezone)}
            <span className="mx-2">&middot;</span>
            {event.timezone}
          </p>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-8">
          {[
            { label: "Invited", value: stats.total_invited },
            { label: "Responded", value: stats.total_responded },
            { label: "Response rate", value: `${responseRate}%` },
          ].map((stat) => (
            <div key={stat.label} className="card p-4 text-center">
              <p className="font-display text-3xl font-bold text-text">{stat.value}</p>
              <p className="text-xs text-muted mt-1">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="flex items-center gap-1 mb-6 border-b border-border">
          {(["recommendations", "participants", "activity"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={cn(
                "px-4 py-2.5 text-sm font-medium capitalize border-b-2 -mb-px motion-safe:transition-[color,border-color] motion-safe:duration-150 motion-safe:ease",
                tab === t ? "border-accent text-accent" : "border-transparent text-muted hover:text-text"
              )}
            >
              {t}
            </button>
          ))}
        </div>

        {tab === "recommendations" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-fade-in">
            <div className="lg:col-span-2">
              <div className="flex items-center justify-between mb-4">
                <h2 className="section-title">Recommendations</h2>
                <div className="flex items-center gap-3">
                  {recStats && (
                    <span className="text-xs text-muted">
                      Based on {recStats.response_rate}% response rate
                    </span>
                  )}
                  <button
                    onClick={fetchRecommendations}
                    disabled={recLoading}
                    className="text-xs text-muted hover:text-accent transition-colors"
                  >
                    {recLoading ? "Refreshing..." : "Refresh"}
                  </button>
                </div>
              </div>

              {recLoading ? (
                <div className="text-center py-12 text-muted animate-pulse">Computing recommendations...</div>
              ) : recommendations ? (
                <RecommendationCards
                  recommendations={recommendations}
                  timezone={event.timezone}
                  durationMinutes={event.meeting_duration_minutes}
                  onSelect={setSelectedMeeting}
                  selectedStart={selectedMeeting?.start}
                />
              ) : (
                <div className="text-center py-12 text-muted">
                  <p className="font-medium text-text mb-1">No data yet</p>
                  <p className="text-sm">Recommendations appear once participants start responding.</p>
                </div>
              )}
            </div>

            <div className="space-y-5">
              {selectedMeeting && (
                <div className="card bg-accent-subtle border-accent/30 p-4 animate-scale-in">
                  <p className="text-xs font-medium text-accent mb-2">Selected time</p>
                  <p className="font-display text-base font-semibold text-text">
                    {new Intl.DateTimeFormat("en-US", {
                      weekday: "short",
                      month: "short",
                      day: "numeric",
                      hour: "numeric",
                      minute: "2-digit",
                      timeZone: event.timezone,
                    }).format(new Date(selectedMeeting.start * 1000))}
                  </p>
                  <p className="text-sm text-muted mt-0.5">
                    {selectedMeeting.attendingCount} of {selectedMeeting.totalParticipants} attending
                  </p>
                  <Button
                    className="w-full mt-3"
                    size="sm"
                    loading={finalizing}
                    onClick={handleFinalize}
                    disabled={event.status === "finalized"}
                  >
                    {event.status === "finalized" ? "Already finalized" : "Confirm & finalize"}
                  </Button>
                </div>
              )}

              <div className="card p-4">
                <h3 className="text-sm font-medium text-text mb-3">Availability heatmap</h3>
                <OverlapHeatmap
                  slots={heatmapSlots}
                  timezone={event.timezone}
                  totalParticipants={stats.total_invited}
                />
              </div>
            </div>
          </div>
        )}

        {tab === "participants" && (
          <div className="animate-fade-in">
            <div className="flex items-center justify-between mb-4">
              <h2 className="section-title">Participants ({nonOrganizerParticipants.length})</h2>
              <Button size="sm" variant="secondary" onClick={() => setAddingParticipant(true)}>
                + Add person
              </Button>
            </div>

            {addingParticipant && (
              <div className="card p-4 mb-4 animate-scale-in">
                <p className="text-sm font-medium text-text mb-3">Add participant</p>
                <div className="grid grid-cols-2 gap-3 mb-3">
                  <Input
                    placeholder="Name"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleAddParticipant()}
                  />
                  <Input
                    placeholder="Email (optional)"
                    type="email"
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                  />
                </div>
                <div className="grid grid-cols-2 gap-3 mb-3">
                  <Select
                    label="Priority"
                    options={[
                      { value: "0", label: "Regular" },
                      { value: "1", label: "★ Important" },
                      { value: "2", label: "★★ Key person" },
                    ]}
                    value={newTier}
                    onChange={(e) => setNewTier(e.target.value)}
                  />
                  <Select
                    label="Link expires"
                    options={[
                      { value: "0", label: "Never" },
                      { value: "24", label: "24 hours" },
                      { value: "72", label: "3 days" },
                      { value: "168", label: "7 days" },
                      { value: "336", label: "14 days" },
                    ]}
                    value={newExpiresHours}
                    onChange={(e) => setNewExpiresHours(e.target.value)}
                  />
                </div>
                <div className="flex gap-2">
                  <Button size="sm" loading={addLoading} onClick={handleAddParticipant}>
                    Add
                  </Button>
                  <Button size="sm" variant="ghost" onClick={() => setAddingParticipant(false)}>
                    Cancel
                  </Button>
                </div>
              </div>
            )}

            <div className="card divide-y-0">
              {nonOrganizerParticipants.length === 0 ? (
                <div className="p-8 text-center text-muted text-sm">
                  No participants yet. Add people above.
                </div>
              ) : (
                <div className="p-4">
                  {nonOrganizerParticipants.map((p) => (
                    <ParticipantRow
                      key={p.id}
                      participant={p}
                      eventId={eventId}
                      onUpdate={handleUpdateParticipant}
                      onRemove={handleRemoveParticipant}
                      onRegenerateToken={handleRegenerateToken}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {tab === "activity" && (
          <div className="animate-fade-in">
            <h2 className="section-title mb-4">Activity log</h2>
            {activityLog.length === 0 ? (
              <div className="card p-8 text-center text-muted text-sm">
                Activity will appear here as people respond and changes are made.
              </div>
            ) : (
              <div className="card divide-y divide-border">
                {activityLog.map((entry) => (
                  <div key={entry.id} className="px-4 py-3 flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-accent-light flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm text-text">{entry.action.replace(/_/g, " ")}</p>
                      <p className="text-xs text-muted">
                        {new Intl.DateTimeFormat("en-US", {
                          month: "short",
                          day: "numeric",
                          hour: "numeric",
                          minute: "2-digit",
                          timeZone: event.timezone,
                        }).format(new Date(entry.created_at * 1000))}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
