"use client";

import { useEffect, useState, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { QRCodeSVG } from "qrcode.react";
import { Button } from "@/components/ui/button";
import { Input, Textarea } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { DatePickerField, DateTimePickerField } from "@/components/ui/date-time-picker";
import { Badge } from "@/components/ui/badge";
import { InfoTooltip } from "@/components/ui/field-label";
import { RecommendationCards } from "@/components/recommendation-cards";
import { OverlapHeatmap } from "@/components/overlap-heatmap";
import { ShareButtons } from "@/components/share-buttons";
import { cn, formatDate, formatEventDate } from "@/lib/utils";
import type { RecommendationSet, ScoredMeeting } from "@/lib/scheduling";
import type { AddParticipantInviteResponse } from "@/lib/api-types";
import { clientApi } from "@/lib/client-api";
import { getTimeZones } from "@vvo/tzdb";
import { removeEventShortcut } from "@/components/my-events";

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
   slot_granularity_minutes: number;
   scoring_mode: string;
   suggested_time_start: number | null;
   suggested_time_end: number | null;
   preferences_required: number;
   enabled_preferences: string;
  participants_required_by_default: number;
  show_results_to_participants: number;
  response_deadline: number | null;
  status: string;
  allow_participant_edit: number;
}

interface PlanFormState {
  title: string;
  description: string;
  event_type: string;
  timezone: string;
  date_range_start_local: string;
  date_range_end_local: string;
  meeting_duration_minutes: string;
  slot_granularity_minutes: string;
  scoring_mode: string;
  suggested_time_start_local: string;
  suggested_time_end_local: string;
  participants_required_by_default: boolean;
  allow_participant_edit: boolean;
  show_results_to_participants: boolean;
  preferences_required: boolean;
  response_deadline_local: string;
  enabled_preferences: string[];
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

interface OrganizerOverrideRecord {
  id: string;
  override_type: string;
  data: string;
  created_at: number;
}

interface OverridesResponse {
  overrides: OrganizerOverrideRecord[];
}

interface RegenerateTokenResponse {
  invite_token: string;
}

interface PendingInvite {
  id: string;
  name: string;
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
        <><svg className="w-3.5 h-3.5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>Link copied</>
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
          <p className="text-sm font-medium text-text">Invite QR code for {name}</p>
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

const ALL_TIMEZONES = getTimeZones({ includeUtc: true });

const TIMEZONE_OPTIONS = ALL_TIMEZONES.map((tz) => ({
  value: tz.name,
  label: `(${tz.abbreviation}, UTC${tz.rawOffsetInMinutes >= 0 ? "+" : ""}${Math.floor(tz.rawOffsetInMinutes / 60)}:${String(Math.abs(tz.rawOffsetInMinutes) % 60).padStart(2, "0")}) ${tz.name.replace(/_/g, " ")} - ${tz.alternativeName}`,
}));

const DURATION_OPTIONS = [
  { value: "30", label: "30 minutes" },
  { value: "60", label: "1 hour" },
  { value: "90", label: "1.5 hours" },
  { value: "120", label: "2 hours" },
  { value: "180", label: "3 hours" },
  { value: "240", label: "4 hours" },
  { value: "480", label: "Full day (8h)" },
];

const SPACING_OPTIONS = [
  { value: "15", label: "15 minutes" },
  { value: "30", label: "30 minutes" },
  { value: "60", label: "1 hour" },
  { value: "120", label: "2 hours" },
  { value: "360", label: "6 hours" },
];

const ALL_PREF_FIELDS = [
  { key: "food", label: "Food preferences" },
  { key: "budget", label: "Budget" },
  { key: "location", label: "Preferred area" },
  { key: "day_type", label: "Weekday or weekend" },
  { key: "time_of_day", label: "Time of day" },
  { key: "indoor_outdoor", label: "Indoor / outdoor" },
] as const;

function unixToDateTimeInput(unix: number, timezone: string): string {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: timezone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).formatToParts(new Date(unix * 1000));

  const get = (type: "year" | "month" | "day" | "hour" | "minute") =>
    parts.find((part) => part.type === type)?.value ?? (type === "hour" || type === "minute" ? "00" : "");
  return `${get("year")}-${get("month")}-${get("day")}T${get("hour")}:${get("minute")}`;
}

function localDateToUnix(localDate: string): number {
  return Math.floor(new Date(localDate).getTime() / 1000);
}

function eventToPlanForm(event: Event): PlanFormState {
  let enabledPreferences: string[] = [];
  try {
    enabledPreferences = event.enabled_preferences ? JSON.parse(event.enabled_preferences) : [];
  } catch {
    enabledPreferences = [];
  }

  return {
    title: event.title,
    description: event.description ?? "",
    event_type: event.event_type,
    timezone: event.timezone,
    date_range_start_local: unixToDateTimeInput(event.date_range_start, event.timezone),
    date_range_end_local: unixToDateTimeInput(event.date_range_end, event.timezone),
    meeting_duration_minutes: String(event.meeting_duration_minutes),
    slot_granularity_minutes: String(event.slot_granularity_minutes),
    scoring_mode: event.scoring_mode,
    suggested_time_start_local: event.suggested_time_start ? unixToDateTimeInput(event.suggested_time_start, event.timezone) : "",
    suggested_time_end_local: event.suggested_time_end ? unixToDateTimeInput(event.suggested_time_end, event.timezone) : "",
    participants_required_by_default: event.participants_required_by_default === 1,
    allow_participant_edit: event.allow_participant_edit === 1,
    show_results_to_participants: event.show_results_to_participants === 1,
    preferences_required: event.preferences_required === 1,
    response_deadline_local: event.response_deadline ? unixToDateTimeInput(event.response_deadline, event.timezone).slice(0, 10) : "",
    enabled_preferences: enabledPreferences,
  };
}

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
                <input className="input text-sm col-span-2" value={editPhone} onChange={(e) => setEditPhone(e.target.value)} placeholder="+91 9000000000" type="tel" />
                <label className="col-span-1 flex items-center gap-2 rounded-input border border-border px-3 py-2 text-sm text-text">
                  <input type="checkbox" checked={editIsRequired} onChange={(e) => setEditIsRequired(e.target.checked)} />
                  Must attend
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
                  {participant.response_status === "responded" ? "Replied" : "Awaiting reply"}
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
  const router = useRouter();
  const params = useParams<{ eventId: string; token: string }>();
  const { eventId, token } = params;

  const [event, setEvent] = useState<Event | null>(null);
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [stats, setStats] = useState({ total_invited: 0, total_responded: 0, pending: 0 });
  const [recommendations, setRecommendations] = useState<RecommendationSet | null>(null);
  const [recStats, setRecStats] = useState<{ response_rate: number } | null>(null);
  const [heatmapSlots, setHeatmapSlots] = useState<Array<{ slot_start: number; participant_ids: string[] }>>([]);
  const [overrides, setOverrides] = useState<OrganizerOverrideRecord[]>([]);
  const [activityLog, setActivityLog] = useState<ActivityLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [recLoading, setRecLoading] = useState(false);
  const [selectedMeeting, setSelectedMeeting] = useState<ScoredMeeting | null>(null);
  const [finalSelection, setFinalSelection] = useState<FinalSelection | null>(null);
  const [finalPath, setFinalPath] = useState<string | null>(null);
  const [finalizing, setFinalizing] = useState(false);
  const [finalNotes, setFinalNotes] = useState("");
  const [overrideLoading, setOverrideLoading] = useState(false);
  const [editingPlan, setEditingPlan] = useState(false);
  const [savingPlan, setSavingPlan] = useState(false);
  const [planError, setPlanError] = useState("");
  const [planForm, setPlanForm] = useState<PlanFormState | null>(null);
  const [tab, setTab] = useState<"participants" | "recommendations" | "activity">("participants");
  const [addingParticipant, setAddingParticipant] = useState(false);
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newEmailTouched, setNewEmailTouched] = useState(false);
  const [newPhone, setNewPhone] = useState("");
  const [newIsRequired, setNewIsRequired] = useState(false);
  const [newTier, setNewTier] = useState("0");
  const [pendingInvites, setPendingInvites] = useState<PendingInvite[]>([]);
  const [addParticipantError, setAddParticipantError] = useState("");
  const [deletingPlan, setDeletingPlan] = useState(false);
  const [pageError, setPageError] = useState("");

  const newEmailError = newEmailTouched && newEmail.trim() && !EMAIL_RE.test(newEmail.trim())
    ? "Enter a valid email address" : "";

  const headers = { "x-organizer-token": token };

  const fetchDashboard = useCallback(async () => {
    try {
      const [eventRes, participantsRes] = await Promise.all([
        fetch(clientApi.event(eventId), { headers }),
        fetch(clientApi.participants(eventId), { headers }),
      ]);

      if (!eventRes.ok || !participantsRes.ok) {
        setPageError("We couldn't open this plan.");
        return;
      }

      const eventData = await eventRes.json() as EventResponse;
      const participantsData = await participantsRes.json() as ParticipantsResponse;

      setEvent(eventData.event);
      setStats(eventData.stats);
      setActivityLog(eventData.activity ?? []);
      setFinalSelection(eventData.final_selection ?? null);
      setFinalPath(eventData.final_selection ? `/e/${eventId}/final` : null);
      setFinalNotes(eventData.final_selection?.notes ?? "");
      setParticipants(participantsData.participants ?? []);
      setNewIsRequired(eventData.event.participants_required_by_default === 1);
      setPlanForm(eventToPlanForm(eventData.event));
    } catch {
      setPageError("We couldn't load this plan. Try refreshing.");
    } finally {
      setLoading(false);
    }
  }, [eventId, token]);

  const fetchRecommendations = useCallback(async () => {
    setRecLoading(true);
    try {
      const res = await fetch(clientApi.recommendations(eventId), { headers });
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

  const fetchOverrides = useCallback(async () => {
    try {
      const res = await fetch(clientApi.overrides(eventId), { headers });
      if (!res.ok) return;
      const data = await res.json() as OverridesResponse;
      setOverrides(data.overrides ?? []);
    } catch {
    }
  }, [eventId, token]);

  useEffect(() => { fetchDashboard(); }, [fetchDashboard]);
  useEffect(() => { if (!loading) fetchRecommendations(); }, [loading, fetchRecommendations]);
  useEffect(() => { if (!loading) fetchOverrides(); }, [loading, fetchOverrides]);

  const handleAddParticipant = async () => {
    if (!newName.trim() || newEmailError) return;
    const participant = {
      name: newName.trim(),
      email: newEmail.trim() || undefined,
      phone: newPhone.trim() || undefined,
      is_required: newIsRequired,
      priority_tier: parseInt(newTier),
    };
    const pendingId = `pending-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

    setAddParticipantError("");
    setPendingInvites((current) => [...current, { id: pendingId, name: participant.name }]);
    setNewName("");
    setNewEmail("");
    setNewEmailTouched(false);
    setNewPhone("");
    setNewIsRequired(event?.participants_required_by_default === 1);
    setNewTier("0");
    try {
      const res = await fetch(clientApi.participants(eventId), {
        method: "POST",
        headers: { ...headers, "Content-Type": "application/json" },
        body: JSON.stringify(participant),
      });
      const data = await res.json() as AddParticipantInviteResponse | { error?: string };
      if (res.ok) {
        const added = data as AddParticipantInviteResponse;
        setParticipants((prev) => [
          ...prev,
          {
            ...added.participant,
            is_required: added.participant.is_required ? 1 : 0,
            phone: added.participant.phone ?? null,
            role: "participant",
            response_status: "pending",
            invite_token: added.invite_token,
            priority_tier: added.participant.priority_tier ?? participant.priority_tier,
          },
        ]);
        setStats((s) => ({ ...s, total_invited: s.total_invited + 1, pending: s.pending + 1 }));
      } else {
        setAddParticipantError((data as { error?: string }).error ?? `We couldn't add ${participant.name}.`);
      }
    } catch {
      setAddParticipantError(`We couldn't add ${participant.name}.`);
    } finally {
      setPendingInvites((current) => current.filter((item) => item.id !== pendingId));
    }
  };

  const handleDeletePlan = async () => {
    if (!confirm(`Delete ${event?.title ?? "this plan"}? This cannot be undone.`)) return;

    setDeletingPlan(true);
    setPlanError("");

    try {
      const res = await fetch(clientApi.event(eventId), {
        method: "DELETE",
        headers,
      });

      const data = await res.json() as { error?: string };
      if (!res.ok) {
        setPlanError(data.error ?? "We couldn't delete this plan.");
        return;
      }

      removeEventShortcut(eventId, "organizer");
      router.push("/");
    } catch {
      setPlanError("We couldn't delete this plan.");
    } finally {
      setDeletingPlan(false);
    }
  };

  const handleUpdateParticipant = async (id: string, updates: Partial<Participant>) => {
    await fetch(clientApi.participant(eventId, id), {
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
    await fetch(clientApi.participant(eventId, id), { method: "DELETE", headers });
    setParticipants((prev) => prev.filter((p) => p.id !== id));
  };

  const handleRegenerateToken = async (participantId: string): Promise<string> => {
    const res = await fetch(clientApi.participantToken(eventId, participantId), {
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
      const res = await fetch(clientApi.finalize(eventId), {
        method: "POST",
        headers: { ...headers, "Content-Type": "application/json" },
        body: JSON.stringify({
          slot_start: selectedMeeting.start,
          slot_end: selectedMeeting.end,
          notes: finalNotes.trim() || undefined,
        }),
      });
      if (res.ok) {
        const data = await res.json() as FinalizeResponse;
        setEvent((e) => e ? { ...e, status: "finalized" } : e);
        setFinalSelection({
          id: "pending-final-selection",
          slot_start: selectedMeeting.start,
          slot_end: selectedMeeting.end,
          notes: finalNotes.trim() || null,
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
    await fetch(clientApi.reopen(eventId), { method: "POST", headers });
    setEvent((e) => e ? { ...e, status: "active" } : e);
    setSelectedMeeting(null);
    setFinalSelection(null);
    setFinalPath(null);
  };

  const handleAddOverride = async (overrideType: "block_time" | "force_include" | "force_exclude") => {
    if (!selectedMeeting) return;
    setOverrideLoading(true);
    try {
      const payload =
        overrideType === "block_time"
          ? { override_type: overrideType, data: { start_time: selectedMeeting.start, end_time: selectedMeeting.end } }
          : { override_type: overrideType, data: { slot_start: selectedMeeting.start } };

      const res = await fetch(clientApi.overrides(eventId), {
        method: "POST",
        headers: { ...headers, "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) return;
      await fetchOverrides();
      await fetchRecommendations();
    } finally {
      setOverrideLoading(false);
    }
  };

  const handleDeleteOverride = async (overrideId: string) => {
    setOverrideLoading(true);
    try {
      const res = await fetch(clientApi.overrides(eventId), {
        method: "DELETE",
        headers: { ...headers, "Content-Type": "application/json" },
        body: JSON.stringify({ override_id: overrideId }),
      });
      if (!res.ok) return;
      await fetchOverrides();
      await fetchRecommendations();
    } finally {
      setOverrideLoading(false);
    }
  };

  const formatOverride = (override: OrganizerOverrideRecord) => {
    const data = JSON.parse(override.data) as { slot_start?: number; start_time?: number; end_time?: number };
    const timezone = event?.timezone ?? "UTC";

    if (override.override_type === "block_time" && data.start_time && data.end_time) {
      return {
        title: "Blocked time",
        detail: `${formatEventDate(data.start_time, timezone)} to ${formatEventDate(data.end_time, timezone)}`,
      };
    }

    if (override.override_type === "force_include" && data.slot_start) {
      return {
        title: "Forced into results",
        detail: formatEventDate(data.slot_start, timezone),
      };
    }

    if (override.override_type === "force_exclude" && data.slot_start) {
      return {
        title: "Excluded from results",
        detail: formatEventDate(data.slot_start, timezone),
      };
    }

    return {
      title: override.override_type.replace(/_/g, " "),
      detail: override.data,
    };
  };

  const handleSavePlan = async () => {
    if (!planForm) return;

    if (localDateToUnix(planForm.date_range_end_local) <= localDateToUnix(planForm.date_range_start_local)) {
      setPlanError("End date and time must be after the start date and time.");
      return;
    }

    const hasAnySuggestedField = Boolean(
      planForm.suggested_time_start_local || planForm.suggested_time_end_local
    );

    if (
      hasAnySuggestedField &&
      !(planForm.suggested_time_start_local && planForm.suggested_time_end_local)
    ) {
      setPlanError("Complete all suggested-time fields, or leave all of them empty.");
      return;
    }

    if (
      planForm.suggested_time_start_local &&
      planForm.suggested_time_end_local &&
      localDateToUnix(planForm.suggested_time_end_local) <= localDateToUnix(planForm.suggested_time_start_local)
    ) {
      setPlanError("Suggested end time must be after the suggested start time.");
      return;
    }

    setSavingPlan(true);
    setPlanError("");

    try {
      const res = await fetch(clientApi.event(eventId), {
        method: "PUT",
        headers: { ...headers, "Content-Type": "application/json" },
        body: JSON.stringify({
          title: planForm.title.trim(),
          description: planForm.description.trim() || undefined,
          event_type: planForm.event_type,
          timezone: planForm.timezone,
          date_range_start: localDateToUnix(planForm.date_range_start_local),
          date_range_end: localDateToUnix(planForm.date_range_end_local),
          meeting_duration_minutes: parseInt(planForm.meeting_duration_minutes),
          slot_granularity_minutes: parseInt(planForm.slot_granularity_minutes),
          scoring_mode: planForm.scoring_mode,
          suggested_time_start:
            planForm.suggested_time_start_local && planForm.suggested_time_end_local
              ? localDateToUnix(planForm.suggested_time_start_local)
              : null,
          suggested_time_end:
            planForm.suggested_time_start_local && planForm.suggested_time_end_local
              ? localDateToUnix(planForm.suggested_time_end_local)
              : null,
          participants_required_by_default: planForm.participants_required_by_default,
          allow_participant_edit: planForm.allow_participant_edit,
          show_results_to_participants: planForm.show_results_to_participants,
          preferences_required: planForm.preferences_required,
          response_deadline: planForm.response_deadline_local
            ? localDateToUnix(`${planForm.response_deadline_local}T23:59:59`)
            : null,
          enabled_preferences: planForm.enabled_preferences,
        }),
      });

      const data = await res.json() as { error?: string; event?: Event };
      if (!res.ok || !data.event) {
        setPlanError(data.error ?? "We couldn't save your plan changes.");
        return;
      }

      setEvent(data.event);
      setPlanForm(eventToPlanForm(data.event));
      setEditingPlan(false);
      await fetchDashboard();
      await fetchRecommendations();
    } catch {
      setPlanError("We couldn't save your plan changes.");
    } finally {
      setSavingPlan(false);
    }
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
          <p className="text-danger mb-4">{pageError || "We couldn't find that plan."}</p>
          <Link href="/" className="btn-secondary">Go home</Link>
        </div>
      </div>
    );
  }

  const nonOrganizerParticipants = participants.filter((p) => p.role !== "organizer");
  const organizerName = participants.find((p) => p.role === "organizer")?.name ?? "";
  const responseRate = stats.total_invited > 0 ? Math.round((stats.total_responded / stats.total_invited) * 100) : 0;
  const participantNamesById = Object.fromEntries(nonOrganizerParticipants.map((participant) => [participant.id, participant.name]));

  return (
    <div className="min-h-screen bg-bg flex flex-col">
      <header className="border-b border-border bg-surface/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-5 h-14 flex items-center justify-between gap-4">
          <Link href="/" className="font-display text-xl font-semibold text-text flex-shrink-0">Togoo</Link>
          <div className="flex items-center gap-3">
            <Button variant="secondary" size="sm" onClick={() => {
              setEditingPlan((value) => !value);
              setPlanError("");
              if (event) setPlanForm(eventToPlanForm(event));
            }}>
              {editingPlan ? "Close editor" : "Edit plan"}
            </Button>
            {event.show_results_to_participants === 1 && (
              <Link href={`/e/${eventId}/summary/${token}`} className="btn-secondary text-sm">
                Live summary
              </Link>
            )}
            <Badge variant={event.status === "finalized" ? "success" : "default"}>
              {event.status === "finalized" ? "Confirmed" : "Collecting replies"}
            </Badge>
            {event.status === "finalized" && (
              <Button variant="secondary" size="sm" onClick={handleReopen}>Reopen replies</Button>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-5 py-8 flex-1 w-full">
        <div className="mb-8 animate-slide-up">
          <p className="text-xs font-medium text-muted uppercase tracking-wide mb-1">{event.event_type}</p>
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-text">{event.title}</h1>
          {event.description && <p className="mt-2 text-muted">{event.description}</p>}
          <p className="mt-2 text-sm text-muted tabular-nums">
            {formatEventDate(event.date_range_start, event.timezone)} &mdash; {formatEventDate(event.date_range_end, event.timezone)}
            <span className="mx-2">&middot;</span>
            {event.timezone}
          </p>
            {event.response_deadline && (
              <p className="mt-1 text-sm text-muted tabular-nums">
                Reply by <span className="font-medium text-text">{formatDate(event.response_deadline, event.timezone)}</span>
              </p>
            )}
            {event.suggested_time_start && event.suggested_time_end && (
              <p className="mt-1 text-sm text-muted tabular-nums">
                Suggested time: <span className="font-medium text-text">{formatEventDate(event.suggested_time_start, event.timezone)} - {formatEventDate(event.suggested_time_end, event.timezone)}</span>
              </p>
            )}
        </div>

        {editingPlan && planForm && (
          <div className="card mb-8 p-5 animate-scale-in space-y-5">
            <div>
              <h2 className="section-title mb-1">Edit plan details</h2>
              <p className="text-sm text-muted">
                Update the title, timing rules, reply settings, and suggested time. Saved changes immediately update what invitees see.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Plan title"
                required
                value={planForm.title}
                onChange={(e) => setPlanForm((current) => current ? { ...current, title: e.target.value } : current)}
              />
              <Select
                label="Plan type"
                required
                options={[
                  { value: "meetup", label: "Meetup" },
                  { value: "dinner", label: "Dinner" },
                  { value: "hangout", label: "Hangout" },
                  { value: "work_session", label: "Work session" },
                  { value: "custom", label: "Custom" },
                ]}
                value={planForm.event_type}
                onChange={(e) => setPlanForm((current) => current ? { ...current, event_type: e.target.value } : current)}
              />
            </div>

            <Textarea
              label="Description"
              optional
              rows={3}
              value={planForm.description}
              onChange={(e) => setPlanForm((current) => current ? { ...current, description: e.target.value } : current)}
            />

            <Select
              label="Timezone"
              required
              tooltip="Togoo scores suggestions against this timezone, and invitees see the plan using the same reference timezone."
              options={TIMEZONE_OPTIONS}
              value={planForm.timezone}
              onChange={(e) => setPlanForm((current) => current ? { ...current, timezone: e.target.value } : current)}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <DateTimePickerField
                label="Start date and time"
                required
                value={planForm.date_range_start_local}
                onChange={(value) => setPlanForm((current) => current ? { ...current, date_range_start_local: value } : current)}
              />
              <DateTimePickerField
                label="End date and time"
                required
                value={planForm.date_range_end_local}
                onChange={(value) => setPlanForm((current) => current ? { ...current, date_range_end_local: value } : current)}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Select
                label="Duration"
                required
                options={DURATION_OPTIONS}
                value={planForm.meeting_duration_minutes}
                onChange={(e) => setPlanForm((current) => current ? { ...current, meeting_duration_minutes: e.target.value } : current)}
              />
                <Select
                  label="Suggestion spacing"
                  required
                  tooltip="Smaller spacing gives you more candidate start times. Use 15 minutes for tighter scheduling, 30 minutes for simpler options."
                  options={SPACING_OPTIONS}
                  value={planForm.slot_granularity_minutes}
                  onChange={(e) => setPlanForm((current) => current ? { ...current, slot_granularity_minutes: e.target.value } : current)}
                />
              <Select
                label="Ranking mode"
                required
                tooltip="This decides how Togoo weighs attendance, required people, and time preferences when ranking options."
                options={[
                  { value: "maximize_attendance", label: "Maximize attendance" },
                  { value: "prioritize_required", label: "Prioritize required attendees" },
                  { value: "vip_priority", label: "Prioritize ★★ key people" },
                  { value: "time_optimized", label: "Match time preferences" },
                ]}
                value={planForm.scoring_mode}
                onChange={(e) => setPlanForm((current) => current ? { ...current, scoring_mode: e.target.value } : current)}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <DateTimePickerField
                label="Suggested start"
                tooltip="Optional. Pre-fill a proposed slot so invitees can react to something concrete right away."
                optional
                value={planForm.suggested_time_start_local}
                onChange={(value) => setPlanForm((current) => current ? { ...current, suggested_time_start_local: value } : current)}
              />
              <DateTimePickerField
                label="Suggested end"
                optional
                value={planForm.suggested_time_end_local}
                onChange={(value) => setPlanForm((current) => current ? { ...current, suggested_time_end_local: value } : current)}
              />
            </div>

            <DatePickerField
              label="Reply deadline"
              tooltip="After this date, new replies are closed. Existing invitees can still open the plan, but they cannot send fresh availability."
              optional
              value={planForm.response_deadline_local}
              onChange={(value) => setPlanForm((current) => current ? { ...current, response_deadline_local: value } : current)}
            />

            <div>
              <div className="mb-3 flex items-center gap-1.5">
                <p className="text-sm font-medium text-text">Preference questions</p>
                <span className="text-muted text-[12px]">(optional)</span>
                <InfoTooltip text="Turn on only the extra questions invitees should see while replying. Keep this short unless the plan really needs more context." />
              </div>
              <div className="flex flex-wrap gap-2">
                {ALL_PREF_FIELDS.map(({ key, label }) => {
                  const enabled = planForm.enabled_preferences.includes(key);
                  return (
                    <button
                      key={key}
                      type="button"
                      onClick={() => setPlanForm((current) => current ? {
                        ...current,
                        enabled_preferences: enabled
                          ? current.enabled_preferences.filter((item) => item !== key)
                          : [...current.enabled_preferences, key],
                      } : current)}
                      className={`pill-toggle ${
                        enabled
                          ? "bg-accent text-white shadow-[0_10px_24px_rgba(47,104,68,0.16),inset_0_1px_0_rgba(255,255,255,0.12)]"
                          : "bg-surface text-text hover:border-accent/40"
                      }`}
                    >
                      {label}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                {
                  title: "Mark new invitees as required by default",
                  description: "Everyone you add later starts as must-attend. Useful when a core group needs to be there.",
                  value: planForm.participants_required_by_default,
                  key: "participants_required_by_default" as const,
                },
                {
                  title: "Allow participants to edit",
                  description: "Invitees can come back and update their reply after they submit.",
                  value: planForm.allow_participant_edit,
                  key: "allow_participant_edit" as const,
                },
                {
                  title: "Require at least one preference",
                  description: "Invitees must share at least one preference before they can submit.",
                  value: planForm.preferences_required,
                  key: "preferences_required" as const,
                },
                {
                  title: "Let participants view the live summary",
                  description: "Invitees can open a live snapshot of current overlap and top suggestions from their own link.",
                  value: planForm.show_results_to_participants,
                  key: "show_results_to_participants" as const,
                },
              ].map((setting) => (
                <div key={setting.key} className="flex items-start justify-between rounded-input border border-border bg-surface px-4 py-3 gap-4 shadow-[inset_0_0_0_1px_rgba(26,23,20,0.08),0_1px_2px_rgba(26,23,20,0.03)]">
                  <div>
                    <div className="flex items-center gap-1.5">
                      <p className="text-sm font-medium text-text">{setting.title}</p>
                      <InfoTooltip text={setting.description} />
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setPlanForm((current) => current ? { ...current, [setting.key]: !current[setting.key] } : current)}
                    className={`toggle-switch ${setting.value ? "bg-accent" : "bg-border"}`}
                  >
                    <span className={`toggle-thumb ${setting.value ? "translate-x-5" : "translate-x-0"}`} />
                  </button>
                </div>
              ))}
            </div>

            {planError && (
            <div className="rounded-input bg-danger-light px-4 py-3 text-sm text-danger shadow-[inset_0_0_0_1px_rgba(185,28,28,0.12)]">
              {planError}
            </div>
          )}

            <div className="flex items-center justify-between gap-3">
              <Button variant="danger" loading={deletingPlan} onClick={handleDeletePlan}>
                Delete plan
              </Button>
              <div className="flex items-center gap-3">
              <Button variant="secondary" onClick={() => {
                setEditingPlan(false);
                setPlanError("");
                if (event) setPlanForm(eventToPlanForm(event));
              }}>
                Cancel
              </Button>
              <Button loading={savingPlan} onClick={handleSavePlan}>
                Save plan changes
              </Button>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-3 gap-4 mb-8">
            {[
              { label: "Invited", value: stats.total_invited },
              { label: "Replied", value: stats.total_responded },
              { label: "Reply rate", value: `${responseRate}%` },
            ].map((stat) => (
              <div key={stat.label} className="card p-4 text-center">
                <p className="font-display text-3xl font-bold text-text tabular-nums">{stat.value}</p>
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
                "-mb-px min-h-10 border-b-2 px-4 py-2.5 text-sm font-medium capitalize motion-safe:transition-[color,border-color] motion-safe:duration-150 motion-safe:ease",
                tab === t ? "border-accent text-accent" : "border-transparent text-muted hover:text-text"
              )}
            >
                {t === "participants" ? "people" : t === "recommendations" ? "best times" : "activity"}
              </button>
            ))}
        </div>

        {tab === "participants" && (
          <div className="animate-fade-in">
            <div className="flex items-center justify-between mb-4">
              <h2 className="section-title">People ({nonOrganizerParticipants.length})</h2>
              <Button size="sm" variant="secondary" onClick={() => setAddingParticipant(true)}>+ Add invitee</Button>
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
                <div className="grid grid-cols-1 gap-3 mb-3 sm:grid-cols-2">
                  <Input
                    type="tel"
                    placeholder="+91 9000000000"
                    value={newPhone}
                    onChange={(e) => setNewPhone(e.target.value)}
                  />
                  <label className="flex min-h-12 items-center gap-3 rounded-input bg-surface px-4 py-3 text-sm text-text shadow-[inset_0_0_0_1px_rgba(26,23,20,0.08),0_1px_2px_rgba(26,23,20,0.03)]">
                    <input
                      type="checkbox"
                      checked={newIsRequired}
                      onChange={(e) => setNewIsRequired(e.target.checked)}
                      className="h-4 w-4 rounded border-border text-accent focus:ring-accent"
                    />
                    <div className="flex items-center gap-1.5">
                      <span className="text-sm text-text">Must attend</span>
                      <InfoTooltip text="Mark this person as required for the scheduling score." />
                    </div>
                  </label>
                </div>
                <div className="grid grid-cols-1 gap-3 mb-3 sm:grid-cols-2">
                  <div>
                    <p className="mb-1.5 text-xs font-medium text-muted">Priority</p>
                    <select className="input" value={newTier} onChange={(e) => setNewTier(e.target.value)}>
                      <option value="0">Regular</option>
                      <option value="1">★ Important</option>
                      <option value="2">★★ Key person</option>
                    </select>
                  </div>
                  <div className="rounded-[18px] bg-surface-alt px-4 py-3 text-sm text-muted shadow-[inset_0_0_0_1px_rgba(26,23,20,0.08)]">
                    Invite links stay active until you regenerate or remove them.
                  </div>
                </div>
                {addParticipantError && <p className="text-sm text-danger mb-3">{addParticipantError}</p>}
                {pendingInvites.length > 0 && (
                  <div className="mb-3 animate-fade-in rounded-input bg-surface-alt px-4 py-3 text-sm text-muted shadow-[inset_0_0_0_1px_rgba(26,23,20,0.08)]">
                    <div className="flex items-center gap-2">
                      <span className="inline-block h-3.5 w-3.5 animate-spin rounded-full border-2 border-muted/30 border-t-accent" />
                      Saving attendee...
                    </div>
                  </div>
                )}
                <div className="flex gap-2">
                  <Button size="sm" onClick={handleAddParticipant} disabled={!newName.trim() || !!newEmailError}>Create invite link</Button>
                  <Button size="sm" variant="ghost" onClick={() => setAddingParticipant(false)}>Cancel</Button>
                </div>
              </div>
            )}

            <div className="card divide-y-0">
              {nonOrganizerParticipants.length === 0 && pendingInvites.length === 0 ? (
                <div className="p-8 text-center text-muted text-sm">No invitees yet. Add people to start collecting replies.</div>
              ) : (
                <div className="p-4">
                  {pendingInvites.map((participant) => (
                    <div key={participant.id} className="flex items-start gap-3 py-3.5 border-b border-border animate-scale-in">
                      <Avatar name={participant.name} />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-sm font-medium text-text">{participant.name}</span>
                          <Badge variant="default">Creating invite...</Badge>
                        </div>
                        <p className="mt-1 text-xs text-muted">You can keep adding people while this finishes.</p>
                      </div>
                      <span className="mt-0.5 inline-block h-4 w-4 animate-spin rounded-full border-2 border-muted/30 border-t-accent" />
                    </div>
                  ))}
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
                <h2 className="section-title">Best times</h2>
                <div className="flex items-center gap-3">
                  {recStats && <span className="text-xs text-muted tabular-nums">Based on a {recStats.response_rate}% reply rate</span>}
                  <button onClick={fetchRecommendations} disabled={recLoading} className="inline-flex min-h-10 items-center text-xs text-muted transition-[color] duration-150 hover:text-accent">
                    {recLoading ? "Refreshing..." : "Refresh"}
                  </button>
                </div>
              </div>

              {recLoading ? (
                <div className="text-center py-12 text-muted animate-pulse">Ranking the best times...</div>
              ) : recommendations ? (
                <RecommendationCards
                  recommendations={recommendations}
                  timezone={event.timezone}
                  durationMinutes={event.meeting_duration_minutes}
                  participantNamesById={participantNamesById}
                  onSelect={setSelectedMeeting}
                  selectedStart={selectedMeeting?.start}
                />
              ) : (
                <div className="text-center py-12 text-muted">
                  <p className="font-medium text-text mb-1">No replies yet</p>
                  <p className="text-sm">Ranked times appear after people start replying.</p>
                </div>
              )}
            </div>

            <div className="space-y-5">
              {event.status === "finalized" && finalSelection && (
                <div className="card bg-accent-subtle border-accent/30 p-4 animate-scale-in">
                  <p className="text-xs font-medium text-accent mb-2">Confirmed plan</p>
                  <p className="font-display text-base font-semibold text-text tabular-nums">
                    {new Intl.DateTimeFormat("en-US", {
                      weekday: "short", month: "short", day: "numeric",
                      hour: "numeric", minute: "2-digit", timeZone: event.timezone,
                    }).format(new Date(finalSelection.slot_start * 1000))}
                  </p>
                  <p className="mt-0.5 text-sm text-muted tabular-nums">
                    Ends {new Intl.DateTimeFormat("en-US", {
                      hour: "numeric", minute: "2-digit", timeZone: event.timezone,
                    }).format(new Date(finalSelection.slot_end * 1000))}
                  </p>
                  {finalSelection.notes && (
                    <p className="mt-2 text-sm text-muted">{finalSelection.notes}</p>
                  )}
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
                  <p className="text-xs font-medium text-accent mb-2">Selected time</p>
                  <p className="font-display text-base font-semibold text-text tabular-nums">
                    {new Intl.DateTimeFormat("en-US", {
                      weekday: "short", month: "short", day: "numeric",
                      hour: "numeric", minute: "2-digit", timeZone: event.timezone,
                    }).format(new Date(selectedMeeting.start * 1000))}
                  </p>
                  <p className="mt-0.5 text-sm text-muted tabular-nums">
                    {selectedMeeting.attendingCount} of {selectedMeeting.totalParticipants} can make it
                  </p>
                  <Textarea
                    label="Final note (optional)"
                    placeholder="Add anything the group should know about this confirmed plan."
                    rows={2}
                    value={finalNotes}
                    onChange={(e) => setFinalNotes(e.target.value)}
                    className="mt-3"
                  />
                  <Button className="w-full mt-3" size="sm" loading={finalizing} onClick={handleFinalize} disabled={event.status === "finalized"}>
                    {event.status === "finalized" ? "Already confirmed" : "Confirm this plan"}
                  </Button>
                </div>
              )}

              <div className="card p-4">
                <h3 className="text-sm font-medium text-text mb-3">Scheduling overrides</h3>
                <p className="text-xs text-muted mb-3">
                  Use the currently selected time to force it into results, remove it from results, or block that window completely.
                </p>
                <div className="grid grid-cols-1 gap-2">
                  <Button
                    size="sm"
                    variant="secondary"
                    disabled={!selectedMeeting || overrideLoading}
                    onClick={() => handleAddOverride("force_include")}
                  >
                    Force selected time into results
                  </Button>
                  <Button
                    size="sm"
                    variant="secondary"
                    disabled={!selectedMeeting || overrideLoading}
                    onClick={() => handleAddOverride("force_exclude")}
                  >
                    Exclude selected time from results
                  </Button>
                  <Button
                    size="sm"
                    variant="secondary"
                    disabled={!selectedMeeting || overrideLoading}
                    onClick={() => handleAddOverride("block_time")}
                  >
                    Block selected time window
                  </Button>
                </div>

                <div className="mt-4 space-y-2 border-t border-border pt-4">
                  {overrides.length === 0 ? (
                    <p className="text-sm text-muted">No overrides yet.</p>
                  ) : (
                    overrides.map((override) => {
                      const formatted = formatOverride(override);
                      return (
                        <div key={override.id} className="flex items-start justify-between gap-3 rounded-input bg-surface-alt px-3 py-3 shadow-[inset_0_0_0_1px_rgba(26,23,20,0.06)]">
                          <div>
                            <p className="text-sm font-medium text-text">{formatted.title}</p>
                            <p className="mt-0.5 text-xs text-muted tabular-nums">{formatted.detail}</p>
                          </div>
                          <button
                            type="button"
                            onClick={() => handleDeleteOverride(override.id)}
                            className="btn-ghost px-2"
                            disabled={overrideLoading}
                          >
                            Remove
                          </button>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>

              <div className="card p-4">
                <h3 className="text-sm font-medium text-text mb-3">Where availability overlaps</h3>
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
                New replies and changes will show up here.
              </div>
            ) : (
              <div className="card divide-y divide-border">
                {activityLog.map((entry) => (
                  <div key={entry.id} className="px-4 py-3 flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-accent-light flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm text-text">{entry.action.replace(/_/g, " ")}</p>
                      <p className="text-xs text-muted tabular-nums">
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
