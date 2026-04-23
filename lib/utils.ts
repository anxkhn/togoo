import { clsx, type ClassValue } from "clsx";
import { fromZonedTime } from "date-fns-tz";
import { twMerge } from "tailwind-merge";

function pad2(value: number): string {
  return String(value).padStart(2, "0");
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function unixNow(): number {
  return Math.floor(Date.now() / 1000);
}

export function unixFromDate(date: Date): number {
  return Math.floor(date.getTime() / 1000);
}

export function dateFromUnix(unix: number): Date {
  return new Date(unix * 1000);
}

export function formatEventDate(unix: number, timezone: string): string {
  return new Intl.DateTimeFormat("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    timeZone: timezone,
  }).format(new Date(unix * 1000));
}

export function formatDate(unix: number, timezone: string): string {
  return new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: timezone,
  }).format(new Date(unix * 1000));
}

export function formatTime(unix: number, timezone: string): string {
  return new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit",
    timeZone: timezone,
  }).format(new Date(unix * 1000));
}

export function formatDuration(minutes: number): string {
  if (minutes < 60) return `${minutes}m`;
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return m > 0 ? `${h}h ${m}m` : `${h}h`;
}

export function zonedDateTimeToUnix(value: string, timezone: string): number {
  const normalizedValue = value.length === 16 ? `${value}:00` : value;
  return Math.floor(fromZonedTime(normalizedValue, timezone).getTime() / 1000);
}

export function zonedDateToUnixEndOfDay(value: string, timezone: string): number {
  return zonedDateTimeToUnix(`${value}T23:59:59`, timezone);
}

export function snapUnixToTimezoneStep(unixTs: number, stepMinutes: number, timezone: string): number {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: timezone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).formatToParts(new Date(unixTs * 1000));

  const getPart = (type: "year" | "month" | "day" | "hour" | "minute") =>
    Number(parts.find((part) => part.type === type)?.value ?? 0);

  const year = getPart("year");
  const month = getPart("month");
  const day = getPart("day");
  const hour = getPart("hour");
  const minute = getPart("minute");

  const roundedMinutes = Math.ceil((hour * 60 + minute) / stepMinutes) * stepMinutes;
  const roundedDate = new Date(Date.UTC(year, month - 1, day, 0, 0, 0));
  roundedDate.setUTCMinutes(roundedMinutes);

  const localDateTime = `${roundedDate.getUTCFullYear()}-${pad2(roundedDate.getUTCMonth() + 1)}-${pad2(roundedDate.getUTCDate())}T${pad2(roundedDate.getUTCHours())}:${pad2(roundedDate.getUTCMinutes())}`;

  return zonedDateTimeToUnix(localDateTime, timezone);
}

export function getTimezones(): string[] {
  return Intl.supportedValuesOf("timeZone");
}

export function getTimeCategory(hourInTimezone: number): string {
  if (hourInTimezone >= 5 && hourInTimezone < 12) return "morning";
  if (hourInTimezone >= 12 && hourInTimezone < 17) return "afternoon";
  if (hourInTimezone >= 17 && hourInTimezone < 21) return "evening";
  return "late_night";
}

export function getHourInTimezone(unixTs: number, timezone: string): number {
  const date = new Date(unixTs * 1000);
  const formatter = new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    hour12: false,
    timeZone: timezone,
  });
  return parseInt(formatter.format(date), 10);
}

export function getDayOfWeekInTimezone(unixTs: number, timezone: string): number {
  const date = new Date(unixTs * 1000);
  const formatter = new Intl.DateTimeFormat("en-US", {
    weekday: "short",
    timeZone: timezone,
  });
  const day = formatter.format(date);
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days.indexOf(day);
}
