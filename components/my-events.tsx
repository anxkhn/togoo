"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export interface StoredEvent {
  id: string;
  title: string;
  role: "organizer" | "participant";
  token: string;
  created_at: number;
}

export function saveEvent(event: StoredEvent): void {
  try {
    const existing: StoredEvent[] = JSON.parse(localStorage.getItem("togoo_events") ?? "[]");
    const filtered = existing.filter((e) => !(e.id === event.id && e.role === event.role));
    filtered.unshift(event);
    localStorage.setItem("togoo_events", JSON.stringify(filtered.slice(0, 20)));
  } catch {}
}

export function removeEventShortcut(id: string, role?: StoredEvent["role"]): void {
  try {
    const existing: StoredEvent[] = JSON.parse(localStorage.getItem("togoo_events") ?? "[]");
    const filtered = existing.filter((event) => !(event.id === id && (role ? event.role === role : true)));
    localStorage.setItem("togoo_events", JSON.stringify(filtered));
  } catch {}
}

function ConfirmDeleteDialog({
  title,
  onConfirm,
  onCancel,
}: {
  readonly title: string;
  readonly onConfirm: () => void;
  readonly onCancel: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm animate-fade-in" onClick={onCancel} />
        <div className="relative card p-6 max-w-sm w-full shadow-xl animate-scale-in">
          <h3 className="font-display text-base font-semibold text-text mb-1">Remove this shortcut?</h3>
          <p className="text-sm text-muted mb-5">
            <span className="font-medium text-text">{title}</span> will be removed from your recent plans on this device only.
          </p>
        <div className="flex gap-3 justify-end">
          <button
            onClick={onCancel}
            className="inline-flex min-h-10 items-center justify-center rounded-lg border border-transparent px-4 py-2 text-sm text-muted shadow-[inset_0_0_0_1px_rgba(26,23,20,0.08)] transition-[background-color,color,border-color] duration-150 ease hover:bg-surface-alt hover:text-text active:scale-[0.96]"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="inline-flex min-h-10 items-center justify-center rounded-lg bg-danger px-4 py-2 text-sm font-medium text-white shadow-[0_10px_24px_rgba(185,28,28,0.14),inset_0_1px_0_rgba(255,255,255,0.14)] transition-[background-color,box-shadow] duration-150 ease hover:bg-danger/90 active:scale-[0.96]"
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
}

export function MyEvents() {
  const [events, setEvents] = useState<StoredEvent[]>([]);
  const [pendingDelete, setPendingDelete] = useState<StoredEvent | null>(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("togoo_events");
      if (stored) {
        setEvents((JSON.parse(stored) as StoredEvent[]).slice(0, 6));
      }
    } catch {}
  }, []);

  function removeEvent(): void {
    if (!pendingDelete) return;
    const updated = events.filter((e) => !(e.id === pendingDelete.id && e.role === pendingDelete.role));
    setEvents(updated);
    try {
      localStorage.setItem("togoo_events", JSON.stringify(updated));
    } catch {}
    setPendingDelete(null);
  }

  if (events.length === 0) return null;

  return (
    <>
      {pendingDelete && (
        <ConfirmDeleteDialog
          title={pendingDelete.title}
          onConfirm={removeEvent}
          onCancel={() => setPendingDelete(null)}
        />
      )}
      <section className="max-w-5xl mx-auto px-5 pb-2">
        <h2 className="font-display text-xl font-semibold text-text mb-3">Recent plans</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {events.map((ev) => (
            <div key={ev.id + ev.role} className="card card-interactive relative p-4">
              <Link
                href={ev.role === "organizer" ? `/e/${ev.id}/organizer/${ev.token}` : `/r/${ev.token}`}
                className="block pr-8"
              >
                <div className="flex items-start justify-between gap-2">
                  <p className="text-sm font-medium text-text truncate">{ev.title}</p>
                  <span className="flex-shrink-0 rounded-full bg-surface-alt px-2.5 py-1 text-xs text-muted shadow-[inset_0_0_0_1px_rgba(26,23,20,0.08)]">
                    {ev.role === "organizer" ? "Organizer" : "Invitee"}
                  </span>
                </div>
                <p className="text-xs text-muted mt-1">
                  {ev.role === "organizer" ? "Open organizer dashboard" : "Review or update your reply"}
                </p>
              </Link>
              <button
                onClick={() => setPendingDelete(ev)}
                className="absolute right-2 top-2 inline-flex h-10 w-10 items-center justify-center rounded-full text-muted transition-[color,background-color] duration-150 ease hover:bg-danger/10 hover:text-danger active:scale-[0.96]"
                title="Remove shortcut"
              >
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
