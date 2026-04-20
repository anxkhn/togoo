"use client";

import { useEffect, useState, useCallback } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { QRCodeSVG } from "qrcode.react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { RecommendationCards } from "@/components/recommendation-cards";
import { OverlapHeatmap } from "@/components/overlap-heatmap";
import { ShareButtons } from "@/components/share-buttons";
import { cn, formatDate } from "@/lib/utils";
import type { RecommendationSet, ScoredMeeting } from "@/lib/scheduling";
import type { AddParticipantInviteResponse } from "@/lib/api-types";

interface Participant {
  id: string;
  name: string;
  email: string | null;
  phone: string | null;
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
  participants_required_by_default: number;
  show_results_to_participants: number;
  response_deadline: number | null;
  status: string;
  allow_participant_edit: number;
}

interface FinalSelection {
  id: string;
  slot_start: number;
  slot_end: number;
  notes: string | null;
  finalized_at: number;
}

interface ActivityLog {
  id: string;
  action: string;
  actor_id: string | null;
  data: string | null;
  created_at: number;
}

interface DashboardStats {
  total_invited: number;
  total_responded: number;
  pending: number;
}

interface EventResponse {
  event: Event;
  stats: DashboardStats;
  activity: ActivityLog[];
  final_selection: FinalSelection | null;
}

interface ParticipantsResponse {
  participants: Participant[];
}

interface RecommendationsResponse {
  recommendations: RecommendationSet;
  stats: { response_rate: number };
}

interface RegenerateTokenResponse {
  invite_token: string;
}

interface FinalizeResponse {
  final_url: string;
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

function Avatar({ name, size = "md" }: { name: string; size?: "sm" | "md" }) {
  const cls = size === "sm" ? "w-7 h-7 text-xs" : "w-8 h-8 text-sm";
  return (
    <div className={`${cls} ${avatarColor(name)} rounded-full flex items-center justify-center flex-shrink-0 font-semibold`}>
      {name[0].toUpperCase()}
    </div>
  );
}

function CopyButton({ text, label }: { readonly text: string; readonly label: string }) {
  const [copied, setCopied] = useState(false);
  const copy = async (): Promise<void> => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <button onClick={copy} className="inline-flex items-center gap-1.5 text-xs text-muted hover:text-accent transition-[color,background-color] duration-150 ease py-1 px-2 rounded hover:bg-accent-subtle flex-shrink-0">
      {copied ? (
        <><svg className="w-3.5 h-3.5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>Copied</>
      ) : (
        <><svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>{label}</>
      )}
    </button>
  );
}

function QRModal({ url, name, onClose }: { readonly url: string; readonly name: string; readonly onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm animate-fade-in" onClick={onClose} />
      <div className="relative card p-6 max-w-xs w-full shadow-xl flex flex-col items-center gap-4 animate-scale-in">
        <div className="flex items-center justify-between w-full">
          <p className="text-sm font-medium text-text">Invite QR for {name}</p>
          <button
            onClick={onClose}
            className="text-muted hover:text-text transition-[color] duration-150 ease"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <QRCodeSVG value={url} size={200} />
        <p className="text-xs text-muted text-center break-all">{url}</p>
      </div>
    </div>
  );
}

function TierBadge({ tier }: { tier: number }) {
  if (tier === 2) return <span className="text-amber-500 text-sm" title="Key person">★★</span>;
  if (tier === 1) return <span className="text-amber-400 text-sm" title="Important">★</span>;
  return null;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function ParticipantRow({
  participant,
  eventId,
  eventTitle,
  organizerName,
  onUpdate,
  onRemove,
  onRegenerateToken,
}: {
  participant: Participant;
  eventId: string;
  eventTitle: string;
  organizerName: string;
  onUpdate: (id: string, updates: Partial<Participant>) => Promise<void>;
  onRemove: (id: string) => Promise<void>;
  onRegenerateToken: (id: string) => Promise<string>;
}) {
  const [editing, setEditing] = useState(false);
  const [editName, setEditName] = useState(participant.name);
  const [editEmail, setEditEmail] = useState(participant.email ?? "");
  const [editPhone, setEditPhone] = useState(participant.phone ?? "");
  const [editIsRequired, setEditIsRequired] = useState(participant.is_required === 1);
  const [editTier, setEditTier] = useState(String(participant.priority_tier));
  const [saving, setSaving] = useState(false);
  const [newToken, setNewToken] = useState<string | null>(null);
  const [showQR, setShowQR] = useState(false);

  const currentToken = newToken ?? participant.invite_token;
  const inviteUrl = currentToken ? `${window.location.origin}/r/${currentToken}` : null;
  const waPhone = participant.phone?.replace(/\D/g, "");

  return (
    <>
      {showQR && inviteUrl && (
        <QRModal url={inviteUrl} name={participant.name} onClose={() => setShowQR(false)} />
      )}
      <div className="flex items-start gap-3 py-3.5 border-b border-border last:border-0">
        <Avatar name={participant.name} />
        <div className="flex-1 min-w-0">
          {editing ? (
            <div className="space-y-2">
              <div className="grid grid-cols-2 gap-2">
                <input className="input text-sm" value={editName} onChange={(e) => setEditName(e.target.value)} placeholder="Name" />
                <input className="input text-sm" value={editEmail} onChange={(e) => setEditEmail(e.target.value)} placeholder="Email (optional)" type="email" />
                <input className="input text-sm col-span-2" value={editPhone} onChange={(e) => setEditPhone(e.target.value)} placeholder="Phone for WhatsApp (optional)" type="tel" />
                <label className="col-span-1 flex items-center gap-2 rounded-input border border-border px-3 py-2 text-sm text-text">
                  <input type="checkbox" checked={editIsRequired} onChange={(e) => setEditIsRequired(e.target.checked)} />
                  Required attendee
                </label>
                <select className="input text-sm col-span-1" value={editTier} onChange={(e) => setEditTier(e.target.value)}>
                  <option value="0">Regular</option>
                  <option value="1">★ Important</option>
                  <option value="2">★★ Key person</option>
                </select>
              </div>
              <div className="flex gap-2">
                <Button size="sm" loading={saving} onClick={async () => {
                  setSaving(true);
                  await onUpdate(participant.id, {
                    name: editName,
                    email: editEmail || null,
                    phone: editPhone || null,
                    is_required: editIsRequired ? 1 : 0,
                    priority_tier: parseInt(editTier),
                  });
                  setSaving(false);
                  setEditing(false);
                }}>Save</Button>
                <Button size="sm" variant="ghost" onClick={() => setEditing(false)}>Cancel</Button>
              </div>
            </div>
          ) : (
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-sm font-medium text-text">{participant.name}</span>
                <TierBadge tier={participant.priority_tier} />
                {participant.is_required === 1 && <Badge variant="warning" className="text-xs">Required</Badge>}
                <Badge variant={participant.response_status === "responded" ? "success" : "default"}>
                  {participant.response_status === "responded" ? "Replied" : "Waiting"}
                </Badge>
              </div>
              {participant.email && <p className="text-xs text-muted mt-0.5">{participant.email}</p>}
              {inviteUrl && (
                <div className="mt-2 space-y-1.5">
                  <div className="flex items-center gap-1">
                    <span className="text-xs text-muted font-mono break-all">{inviteUrl}</span>
                    <CopyButton text={inviteUrl} label="Copy" />
                  </div>
                  <ShareButtons
                    path={`/r/${currentToken}`}
                    title={eventTitle}
                    organizerName={organizerName}
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
            {waPhone && (
              <a
                href={`https://wa.me/${waPhone}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost p-1.5"
                title="WhatsApp"
              >
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </a>
            )}
            {inviteUrl && (
              <button onClick={() => setShowQR(true)} className="btn-ghost p-1.5" title="Show QR code">
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
                </svg>
              </button>
            )}
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
              title="Create a fresh invite link"
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </button>
            <button
              onClick={() => { if (confirm(`Remove ${participant.name}?`)) onRemove(participant.id); }}
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
    </>
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
  const [finalSelection, setFinalSelection] = useState<FinalSelection | null>(null);
  const [finalPath, setFinalPath] = useState<string | null>(null);
  const [finalizing, setFinalizing] = useState(false);
  const [tab, setTab] = useState<"participants" | "recommendations" | "activity">("participants");
  const [addingParticipant, setAddingParticipant] = useState(false);
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newEmailTouched, setNewEmailTouched] = useState(false);
  const [newPhone, setNewPhone] = useState("");
  const [newIsRequired, setNewIsRequired] = useState(false);
  const [newTier, setNewTier] = useState("0");
  const [newExpiresHours, setNewExpiresHours] = useState("0");
  const [addLoading, setAddLoading] = useState(false);
  const [pageError, setPageError] = useState("");

  const newEmailError = newEmailTouched && newEmail.trim() && !EMAIL_RE.test(newEmail.trim())
    ? "Enter a valid email address" : "";

  const headers = { "x-organizer-token": token };

  const fetchDashboard = useCallback(async () => {
    try {
      const [eventRes, participantsRes] = await Promise.all([
        fetch(`/api/events/${eventId}`, { headers }),
        fetch(`/api/events/${eventId}/participants`, { headers }),
      ]);

      if (!eventRes.ok || !participantsRes.ok) {
        setPageError("We could not open this event.");
        return;
      }

      const eventData = await eventRes.json() as EventResponse;
      const participantsData = await participantsRes.json() as ParticipantsResponse;

      setEvent(eventData.event);
      setStats(eventData.stats);
      setActivityLog(eventData.activity ?? []);
      setFinalSelection(eventData.final_selection ?? null);
      setFinalPath(eventData.final_selection ? `/e/${eventId}/final` : null);
      setParticipants(participantsData.participants ?? []);
      setNewIsRequired(eventData.event.participants_required_by_default === 1);
    } catch {
      setPageError("We could not load this plan. Try refreshing.");
    } finally {
      setLoading(false);
    }
  }, [eventId, token]);

  const fetchRecommendations = useCallback(async () => {
    setRecLoading(true);
    try {
      const res = await fetch(`/api/events/${eventId}/recommendations`, { headers });
      if (res.ok) {
        const data = await res.json() as RecommendationsResponse;
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
    } finally {
      setRecLoading(false);
    }
  }, [eventId, token]);

  useEffect(() => { fetchDashboard(); }, [fetchDashboard]);
  useEffect(() => { if (!loading) fetchRecommendations(); }, [loading, fetchRecommendations]);

  const handleAddParticipant = async () => {
    if (!newName.trim() || newEmailError) return;
    setAddLoading(true);
    try {
      const res = await fetch(`/api/events/${eventId}/participants`, {
        method: "POST",
        headers: { ...headers, "Content-Type": "application/json" },
        body: JSON.stringify({
          name: newName.trim(),
          email: newEmail.trim() || undefined,
          phone: newPhone.trim() || undefined,
          is_required: newIsRequired,
          priority_tier: parseInt(newTier),
          token_expires_hours: parseInt(newExpiresHours) || undefined,
        }),
      });
      const data = await res.json() as AddParticipantInviteResponse;
      if (res.ok) {
        setParticipants((prev) => [
          ...prev,
          {
            ...data.participant,
            is_required: data.participant.is_required ? 1 : 0,
            phone: data.participant.phone ?? null,
            role: "participant",
            response_status: "pending",
            invite_token: data.invite_token,
            priority_tier: data.participant.priority_tier ?? parseInt(newTier),
          },
        ]);
        setStats((s) => ({ ...s, total_invited: s.total_invited + 1, pending: s.pending + 1 }));
        setNewName("");
        setNewEmail("");
        setNewEmailTouched(false);
        setNewPhone("");
        setNewIsRequired(event?.participants_required_by_default === 1);
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
      body: JSON.stringify({
        name: updates.name,
        email: updates.email,
        phone: updates.phone,
        is_required: updates.is_required,
        priority_tier: updates.priority_tier,
      }),
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
    const data = await res.json() as RegenerateTokenResponse;
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
        const data = await res.json() as FinalizeResponse;
        setEvent((e) => e ? { ...e, status: "finalized" } : e);
        setFinalSelection({
          id: "pending-final-selection",
          slot_start: selectedMeeting.start,
          slot_end: selectedMeeting.end,
          notes: null,
          finalized_at: Math.floor(Date.now() / 1000),
        });
        setFinalPath(data.final_url);
      }
    } finally {
      setFinalizing(false);
    }
  };

  const handleReopen = async () => {
    if (!confirm("Reopen this plan? The confirmed selection will be cleared.")) return;
    await fetch(`/api/events/${eventId}/reopen`, { method: "POST", headers });
    setEvent((e) => e ? { ...e, status: "active" } : e);
    setSelectedMeeting(null);
    setFinalSelection(null);
    setFinalPath(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-bg flex items-center justify-center">
        <div className="text-center text-muted animate-pulse">Loading your dashboard...</div>
      </div>
    );
  }

  if (pageError || !event) {
    return (
      <div className="min-h-screen bg-bg flex items-center justify-center">
        <div className="text-center">
          <p className="text-danger mb-4">{pageError || "We could not find that event."}</p>
          <Link href="/" className="btn-secondary">Back home</Link>
        </div>
      </div>
    );
  }

  const nonOrganizerParticipants = participants.filter((p) => p.role !== "organizer");
  const organizerName = participants.find((p) => p.role === "organizer")?.name ?? "";
  const responseRate = stats.total_invited > 0 ? Math.round((stats.total_responded / stats.total_invited) * 100) : 0;

  return (
    <div className="min-h-screen bg-bg flex flex-col">
      <header className="border-b border-border bg-surface/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-5 h-14 flex items-center justify-between gap-4">
          <Link href="/" className="font-display text-xl font-semibold text-text flex-shrink-0">Togoo</Link>
          <div className="flex items-center gap-3">
            {event.show_results_to_participants === 1 && (
              <Link href={`/e/${eventId}/summary/${token}`} className="btn-secondary text-sm">
                Live summary
              </Link>
            )}
            <Badge variant={event.status === "finalized" ? "success" : "default"}>
              {event.status === "finalized" ? "Confirmed" : "Open"}
            </Badge>
            {event.status === "finalized" && (
              <Button variant="secondary" size="sm" onClick={handleReopen}>Reopen plan</Button>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-5 py-8 flex-1 w-full">
        <div className="mb-8 animate-slide-up">
          <p className="text-xs font-medium text-muted uppercase tracking-wide mb-1">{event.event_type}</p>
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-text">{event.title}</h1>
          {event.description && <p className="mt-2 text-muted">{event.description}</p>}
          <p className="mt-2 text-sm text-muted">
            {formatDate(event.date_range_start, event.timezone)} &mdash; {formatDate(event.date_range_end, event.timezone)}
            <span className="mx-2">&middot;</span>
            {event.timezone}
          </p>
          {event.response_deadline && (
            <p className="mt-1 text-sm text-muted">
              Reply deadline: <span className="font-medium text-text">{formatDate(event.response_deadline, event.timezone)}</span>
            </p>
          )}
        </div>

        <div className="grid grid-cols-3 gap-4 mb-8">
          {[
            { label: "Invited", value: stats.total_invited },
            { label: "Replied", value: stats.total_responded },
            { label: "Reply rate", value: `${responseRate}%` },
          ].map((stat) => (
            <div key={stat.label} className="card p-4 text-center">
              <p className="font-display text-3xl font-bold text-text">{stat.value}</p>
              <p className="text-xs text-muted mt-1">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="flex items-center gap-1 mb-6 border-b border-border">
          {(["participants", "recommendations", "activity"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={cn(
                "px-4 py-2.5 text-sm font-medium capitalize border-b-2 -mb-px motion-safe:transition-[color,border-color] motion-safe:duration-150 motion-safe:ease",
                tab === t ? "border-accent text-accent" : "border-transparent text-muted hover:text-text"
              )}
            >
              {t === "participants" ? "people" : t === "recommendations" ? "best options" : "activity"}
            </button>
          ))}
        </div>

        {tab === "participants" && (
          <div className="animate-fade-in">
            <div className="flex items-center justify-between mb-4">
              <h2 className="section-title">People ({nonOrganizerParticipants.length})</h2>
              <Button size="sm" variant="secondary" onClick={() => setAddingParticipant(true)}>+ Add person</Button>
            </div>

            {addingParticipant && (
              <div className="card p-4 mb-4 animate-scale-in">
                <p className="text-sm font-medium text-text mb-3">Add someone to this plan</p>
                <div className="grid grid-cols-2 gap-3 mb-3">
                  <Input placeholder="Name" value={newName} onChange={(e) => setNewName(e.target.value)} onKeyDown={(e) => e.key === "Enter" && handleAddParticipant()} />
                  <div>
                    <Input
                      placeholder="Email (optional)"
                      type="email"
                      value={newEmail}
                      onChange={(e) => { setNewEmail(e.target.value); setNewEmailTouched(false); }}
                      onBlur={() => setNewEmailTouched(true)}
                    />
                    {newEmailError && <p className="text-xs text-danger mt-1">{newEmailError}</p>}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3 mb-3">
                  <Input
                    placeholder="Phone for WhatsApp (optional)"
                    type="tel"
                    value={newPhone}
                    onChange={(e) => setNewPhone(e.target.value)}
                  />
                  <label className="flex items-center gap-2 rounded-input border border-border px-3 py-2 text-sm text-text">
                    <input type="checkbox" checked={newIsRequired} onChange={(e) => setNewIsRequired(e.target.checked)} />
                    Required attendee
                  </label>
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
                    label="Invite link expires"
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
                  <Button size="sm" loading={addLoading} onClick={handleAddParticipant} disabled={!!newEmailError}>Add invitee</Button>
                  <Button size="sm" variant="ghost" onClick={() => setAddingParticipant(false)}>Cancel</Button>
                </div>
              </div>
            )}

            <div className="card divide-y-0">
              {nonOrganizerParticipants.length === 0 ? (
                <div className="p-8 text-center text-muted text-sm">No invitees yet. Add people to start collecting replies.</div>
              ) : (
                <div className="p-4">
                  {nonOrganizerParticipants.map((p) => (
                    <ParticipantRow
                      key={p.id}
                      participant={p}
                      eventId={eventId}
                      eventTitle={event.title}
                      organizerName={organizerName}
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

        {tab === "recommendations" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-fade-in">
            <div className="lg:col-span-2">
              <div className="flex items-center justify-between mb-4">
                <h2 className="section-title">Best options</h2>
                <div className="flex items-center gap-3">
                  {recStats && <span className="text-xs text-muted">Based on {recStats.response_rate}% reply rate</span>}
                  <button onClick={fetchRecommendations} disabled={recLoading} className="text-xs text-muted hover:text-accent transition-colors">
                    {recLoading ? "Refreshing..." : "Refresh"}
                  </button>
                </div>
              </div>

              {recLoading ? (
                <div className="text-center py-12 text-muted animate-pulse">Scoring the best options...</div>
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
                  <p className="font-medium text-text mb-1">No replies yet</p>
                  <p className="text-sm">Suggestions appear after people start responding.</p>
                </div>
              )}
            </div>

            <div className="space-y-5">
              {event.status === "finalized" && finalSelection && (
                <div className="card bg-accent-subtle border-accent/30 p-4 animate-scale-in">
                  <p className="text-xs font-medium text-accent mb-2">Confirmed time</p>
                  <p className="font-display text-base font-semibold text-text">
                    {new Intl.DateTimeFormat("en-US", {
                      weekday: "short", month: "short", day: "numeric",
                      hour: "numeric", minute: "2-digit", timeZone: event.timezone,
                    }).format(new Date(finalSelection.slot_start * 1000))}
                  </p>
                  <p className="text-sm text-muted mt-0.5">
                    Ends {new Intl.DateTimeFormat("en-US", {
                      hour: "numeric", minute: "2-digit", timeZone: event.timezone,
                    }).format(new Date(finalSelection.slot_end * 1000))}
                  </p>
                  {finalPath && (
                    <div className="mt-3 space-y-2">
                      <div className="flex items-center gap-2">
                        <CopyButton text={`${window.location.origin}${finalPath}`} label="Copy final page" />
                        <Link href={finalPath} className="text-xs text-accent hover:underline">
                          Open final page
                        </Link>
                      </div>
                      <ShareButtons
                        path={finalPath}
                        title={event.title}
                        description={`${event.title} is confirmed.`}
                      />
                    </div>
                  )}
                </div>
              )}

              {selectedMeeting && (
                <div className="card bg-accent-subtle border-accent/30 p-4 animate-scale-in">
                  <p className="text-xs font-medium text-accent mb-2">Selected option</p>
                  <p className="font-display text-base font-semibold text-text">
                    {new Intl.DateTimeFormat("en-US", {
                      weekday: "short", month: "short", day: "numeric",
                      hour: "numeric", minute: "2-digit", timeZone: event.timezone,
                    }).format(new Date(selectedMeeting.start * 1000))}
                  </p>
                  <p className="text-sm text-muted mt-0.5">
                    {selectedMeeting.attendingCount} of {selectedMeeting.totalParticipants} can make it
                  </p>
                  <Button className="w-full mt-3" size="sm" loading={finalizing} onClick={handleFinalize} disabled={event.status === "finalized"}>
                    {event.status === "finalized" ? "Already confirmed" : "Confirm this time"}
                  </Button>
                </div>
              )}

              <div className="card p-4">
                <h3 className="text-sm font-medium text-text mb-3">Where replies overlap</h3>
                <OverlapHeatmap
                  slots={heatmapSlots}
                  timezone={event.timezone}
                  totalParticipants={stats.total_invited}
                />
              </div>
            </div>
          </div>
        )}

        {tab === "activity" && (
          <div className="animate-fade-in">
            <h2 className="section-title mb-4">Recent activity</h2>
            {activityLog.length === 0 ? (
              <div className="card p-8 text-center text-muted text-sm">
                Replies and changes will show up here.
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
                          month: "short", day: "numeric",
                          hour: "numeric", minute: "2-digit", timeZone: event.timezone,
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

      <footer className="border-t border-border py-6 text-center text-xs text-muted">
        <a href="https://github.com/anxkhn/togoo" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">
          github.com/anxkhn/togoo
        </a>
      </footer>
    </div>
  );
}
