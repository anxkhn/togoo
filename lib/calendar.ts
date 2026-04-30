function calendarDate(unixSeconds: number): string {
  return new Date(unixSeconds * 1000).toISOString().replace(/[-:]/g, "").replace(/\.\d{3}Z$/, "Z");
}

function escapeIcsText(value: string): string {
  return value.replace(/\\/g, "\\\\").replace(/;/g, "\\;").replace(/,/g, "\\,").replace(/\n/g, "\\n");
}

export function buildGoogleMapsUrl(locationName?: string | null, locationAddress?: string | null, googleMapsUrl?: string | null): string | null {
  if (googleMapsUrl) return googleMapsUrl;
  const query = [locationName, locationAddress].filter(Boolean).join(" ").trim();
  if (!query) return null;
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}

export function buildGoogleCalendarUrl(input: {
  title: string;
  description?: string | null;
  start: number;
  end: number;
  location?: string | null;
}): string {
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: input.title,
    dates: `${calendarDate(input.start)}/${calendarDate(input.end)}`,
  });

  if (input.description) params.set("details", input.description);
  if (input.location) params.set("location", input.location);
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

export function buildIcsDataUri(input: {
  title: string;
  description?: string | null;
  start: number;
  end: number;
  location?: string | null;
}): string {
  const body = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Togoo//Final Plan//EN",
    "BEGIN:VEVENT",
    `UID:${input.start}-${encodeURIComponent(input.title)}@togoo`,
    `DTSTAMP:${calendarDate(Math.floor(Date.now() / 1000))}`,
    `DTSTART:${calendarDate(input.start)}`,
    `DTEND:${calendarDate(input.end)}`,
    `SUMMARY:${escapeIcsText(input.title)}`,
    input.description ? `DESCRIPTION:${escapeIcsText(input.description)}` : null,
    input.location ? `LOCATION:${escapeIcsText(input.location)}` : null,
    "END:VEVENT",
    "END:VCALENDAR",
  ].filter(Boolean).join("\r\n");

  return `data:text/calendar;charset=utf-8,${encodeURIComponent(body)}`;
}
