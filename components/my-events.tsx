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

export function saveEvent(event: StoredEvent) {
  try {
    const existing: StoredEvent[] = JSON.parse(localStorage.getItem("togoo_events") ?? "[]");
    const filtered = existing.filter((e) => !(e.id === event.id && e.role === event.role));
    filtered.unshift(event);
    localStorage.setItem("togoo_events", JSON.stringify(filtered.slice(0, 20)));
  } catch {}
}

export function MyEvents() {
  const [events, setEvents] = useState<StoredEvent[]>([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("togoo_events");
      if (stored) {
        setEvents((JSON.parse(stored) as StoredEvent[]).slice(0, 6));
      }
    } catch {}
  }, []);

  if (events.length === 0) return null;

  return (
    <section className="max-w-5xl mx-auto px-5 pb-2">
      <h2 className="font-display text-xl font-semibold text-text mb-3">Your events</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {events.map((ev) => (
          <Link
            key={ev.id + ev.role}
            href={
              ev.role === "organizer"
                ? `/e/${ev.id}/organizer/${ev.token}`
                : `/e/${ev.id}/respond/${ev.token}`
            }
            className="card p-4 hover:shadow-card-hover transition-shadow duration-200 block"
          >
            <div className="flex items-start justify-between gap-2">
              <p className="text-sm font-medium text-text truncate">{ev.title}</p>
              <span className="text-xs text-muted bg-surface-alt border border-border rounded-full px-2 py-0.5 flex-shrink-0">
                {ev.role === "organizer" ? "Organizer" : "Participant"}
              </span>
            </div>
            <p className="text-xs text-muted mt-1">
              {ev.role === "organizer" ? "Manage event" : "View or edit your response"}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}
