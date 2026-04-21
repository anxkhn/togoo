import { env } from "cloudflare:workers";
import { eq } from "drizzle-orm";
import Link from "next/link";
import type { Metadata } from "next";
import { getDB } from "@/lib/db";
import * as schema from "@/lib/db/schema";
import { formatDuration } from "@/lib/utils";
import { notFound } from "next/navigation";
import { ShareButtons } from "@/components/share-buttons";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ eventId: string }>;
}): Promise<Metadata> {
  const { eventId } = await params;
  const db = getDB((env as unknown as { DB: D1Database }).DB);
  const event = await db.query.events.findFirst({ where: eq(schema.events.id, eventId) });

  if (!event) return { title: "Togoo" };

  const desc = event.description ?? `${event.title} is confirmed. See the final date and time.`;

  return {
    title: `${event.title} | Confirmed plan on Togoo`,
    description: desc,
    openGraph: {
      title: event.title,
      description: desc,
      type: "website",
    },
    twitter: {
      card: "summary",
      title: event.title,
      description: desc,
    },
  };
}

export default async function FinalPage({
  params,
}: {
  params: Promise<{ eventId: string }>;
}) {
  const { eventId } = await params;
  const db = getDB((env as unknown as { DB: D1Database }).DB);

  const event = await db.query.events.findFirst({
    where: eq(schema.events.id, eventId),
  });

  if (!event || event.status !== "finalized") return notFound();

  const finalSelection = await db.query.final_selections.findFirst({
    where: eq(schema.final_selections.event_id, eventId),
  });

  if (!finalSelection) return notFound();

  const startDate = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: event.timezone,
  }).format(new Date(finalSelection.slot_start * 1000));

  const startTime = new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit",
    timeZone: event.timezone,
  }).format(new Date(finalSelection.slot_start * 1000));

  const endTime = new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit",
    timeZone: event.timezone,
  }).format(new Date(finalSelection.slot_end * 1000));

  const shareText = `${event.title} is confirmed for ${startDate}, ${startTime}-${endTime} (${event.timezone})`;

  return (
    <div className="min-h-screen bg-bg flex items-center justify-center px-5">
      <div className="max-w-md w-full">
        <div className="text-center mb-10 animate-slide-up">
          <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-accent-subtle shadow-[inset_0_0_0_1px_rgba(47,104,68,0.14)]">
            <svg className="w-7 h-7 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <Link href="/" className="font-display text-xl font-semibold text-text block mb-8">
            Togoo
          </Link>
          <p className="text-xs font-medium text-accent uppercase tracking-wide mb-2">
            {event.event_type} | confirmed
          </p>
          <h1 className="font-display text-4xl font-bold text-text mb-2">{event.title}</h1>
          {event.description && (
            <p className="text-muted">{event.description}</p>
          )}
        </div>

        <div className="card p-8 text-center shadow-card-elevated animate-scale-in">
          <p className="text-sm text-muted mb-1">Confirmed for</p>
          <p className="mb-2 font-display text-3xl font-bold text-text">{startDate}</p>
          <div className="mb-4 inline-flex min-h-10 items-center gap-2 rounded-full bg-accent-subtle px-4 py-2 shadow-[inset_0_0_0_1px_rgba(47,104,68,0.14)]">
            <svg className="w-4 h-4 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="font-medium text-accent tabular-nums">{startTime} &ndash; {endTime}</span>
          </div>
          <p className="text-sm text-muted tabular-nums">
            {event.timezone} &middot; {formatDuration(event.meeting_duration_minutes)}
          </p>
          {finalSelection.notes && (
            <div className="mt-5 pt-5 border-t border-border">
              <p className="text-sm text-muted">{finalSelection.notes}</p>
            </div>
          )}

          <div className="mt-6 pt-5 border-t border-border flex items-center justify-center gap-2">
            <span className="text-xs text-muted">Share the confirmed plan</span>
            <ShareButtons
              path={`/e/${eventId}/final`}
              title={event.title}
              description={shareText}
            />
          </div>
        </div>

        <p className="text-center text-xs text-muted mt-6">
          Planned with{" "}
          <Link href="/" className="text-accent hover:underline">
            Togoo
          </Link>
        </p>
      </div>
    </div>
  );
}
