import { env } from "cloudflare:workers";
import { eq } from "drizzle-orm";
import Link from "next/link";
import type { Metadata } from "next";
import { getDB } from "@/lib/db";
import * as schema from "@/lib/db/schema";
import { formatDuration } from "@/lib/utils";
import { notFound } from "next/navigation";
import { AppFooter } from "@/components/app-footer";
import { ShareButtons } from "@/components/share-buttons";
import { buildGoogleCalendarUrl, buildGoogleMapsUrl, buildIcsDataUri } from "@/lib/calendar";

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

  const shareText = `${event.title} is confirmed for ${startDate}, ${startTime}-${endTime} (${event.timezone}).`;
  const locationText = [finalSelection.location_name, finalSelection.location_address].filter(Boolean).join(", ");
  const mapsUrl = buildGoogleMapsUrl(finalSelection.location_name, finalSelection.location_address, finalSelection.google_maps_url);
  const calendarDescription = [finalSelection.invite_message, finalSelection.notes, event.description].filter(Boolean).join("\n\n");
  const googleCalendarUrl = buildGoogleCalendarUrl({
    title: event.title,
    description: calendarDescription,
    start: finalSelection.slot_start,
    end: finalSelection.slot_end,
    location: locationText,
  });
  const icsUrl = buildIcsDataUri({
    title: event.title,
    description: calendarDescription,
    start: finalSelection.slot_start,
    end: finalSelection.slot_end,
    location: locationText,
  });

  return (
    <div className="min-h-screen bg-bg">
      <header className="sticky top-0 z-10 border-b border-border bg-surface/80 backdrop-blur-sm">
        <div className="mx-auto flex h-14 max-w-xl items-center justify-between px-5">
          <Link href="/" className="font-display text-xl font-semibold text-text">
            Togoo
          </Link>
        </div>
      </header>

      <main className="mx-auto flex min-h-[calc(100vh-56px)] max-w-xl items-center px-5 py-10">
        <div className="w-full">
        <div className="text-center mb-8 animate-slide-up">
          <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-accent-subtle shadow-[inset_0_0_0_1px_rgba(47,104,68,0.14)]">
            <svg className="w-7 h-7 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <p className="text-xs font-medium text-accent uppercase tracking-wide mb-2">
            Plan confirmed
          </p>
          <h1 className="font-display text-4xl font-bold text-text mb-2 sm:text-5xl">{event.title}</h1>
          {event.description && (
            <p className="text-muted">{event.description}</p>
          )}
          {finalSelection.invite_message && (
            <p className="mx-auto mt-4 max-w-md text-sm text-text">{finalSelection.invite_message}</p>
          )}
        </div>

        <div className="card p-6 text-center shadow-card-elevated animate-scale-in sm:p-8">
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
          {(finalSelection.location_name || finalSelection.location_address) && (
            <div className="mt-5 rounded-card bg-surface-alt px-4 py-4 text-left shadow-[inset_0_0_0_1px_rgba(26,23,20,0.08)]">
              <p className="text-xs font-medium uppercase tracking-wide text-muted">Location</p>
              {finalSelection.location_name && <p className="mt-1 font-display text-xl font-semibold text-text">{finalSelection.location_name}</p>}
              {finalSelection.location_address && <p className="mt-1 text-sm text-muted">{finalSelection.location_address}</p>}
              {mapsUrl && (
                <a href={mapsUrl} target="_blank" rel="noopener noreferrer" className="link-accent mt-3 inline-flex min-h-0 text-sm underline-offset-2">
                  Open in Google Maps
                </a>
              )}
            </div>
          )}
          {finalSelection.notes && (
            <div className="mt-5 pt-5 border-t border-border">
              <p className="text-sm text-muted">{finalSelection.notes}</p>
            </div>
          )}

          <div className="mt-6 grid grid-cols-1 gap-2 sm:grid-cols-2">
            <a href={googleCalendarUrl} target="_blank" rel="noopener noreferrer" className="btn-primary text-sm">
              Add to Calendar
            </a>
            <a href={icsUrl} download={`${event.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "") || "togoo"}.ics`} className="btn-secondary text-sm">
              Download calendar file
            </a>
          </div>

          <div className="mt-6 flex flex-col items-center justify-center gap-3 border-t border-border pt-5 sm:flex-row">
            <span className="text-xs text-muted">Share the confirmed plan</span>
            <ShareButtons
              path={`/e/${eventId}/final`}
              title={event.title}
              description={shareText}
              mode="final"
            />
          </div>
        </div>

        <p className="text-center text-xs text-muted mt-6">
          Planned with{" "}
          <Link href="/" className="link-accent inline min-h-0 underline-offset-2">
            Togoo
          </Link>
        </p>
        </div>
      </main>
      <AppFooter maxWidth="xl" />
    </div>
  );
}
