import { clsx, type ClassValue } from "clsx";
import { fromZonedTime } from "date-fns-tz";
import { twMerge } from "tailwind-merge";

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
