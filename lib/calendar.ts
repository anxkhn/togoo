function calendarDate(unixSeconds: number): string {
  return new Date(unixSeconds * 1000).toISOString().replace(/[-:]/g, "").replace(/\.\d{3}Z$/, "Z");
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
