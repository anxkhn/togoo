"use client";

import {
  Button as AriaButton,
  Calendar,
  CalendarCell,
  CalendarGrid,
  CalendarGridBody,
  CalendarGridHeader,
  CalendarHeaderCell,
  DateInput,
  DatePicker as AriaDatePicker,
  DateSegment,
  Dialog,
  Group,
  Heading,
  Popover,
} from "react-aria-components";
import { CalendarDate, CalendarDateTime, parseDate, parseDateTime } from "@internationalized/date";
import { useDateFormatter } from "react-aria";
import { cn } from "@/lib/utils";
import { FieldLabel } from "@/components/ui/field-label";

interface BaseFieldProps {
  label?: string;
  error?: string;
  hint?: string;
  tooltip?: string;
  className?: string;
  placeholder?: string;
  required?: boolean;
  optional?: boolean;
}

interface DatePickerFieldProps extends BaseFieldProps {
  value: string;
  onChange: (value: string) => void;
}

interface DateTimePickerFieldProps extends BaseFieldProps {
  value: string;
  onChange: (value: string) => void;
}

function pad(value: number) {
  return String(value).padStart(2, "0");
}

function formatCalendarDate(value: { year: number; month: number; day: number }): string {
  return `${value.year}-${pad(value.month)}-${pad(value.day)}`;
}

function formatCalendarDateTime(value: CalendarDateTime): string {
  return `${formatCalendarDate(value)}T${pad(value.hour)}:${pad(value.minute)}`;
}

const TIME_OPTIONS = Array.from({ length: 48 }, (_, index) => {
  const hour = Math.floor(index / 2);
  const minute = index % 2 === 0 ? 0 : 30;
  const labelHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
  const suffix = hour < 12 ? "AM" : "PM";
  return {
    value: `${pad(hour)}:${pad(minute)}`,
    label: `${labelHour}:${pad(minute)} ${suffix}`,
  };
});

function PickerFieldShell({
  label,
  tooltip,
  hint,
  error,
  required,
  optional,
  children,
}: BaseFieldProps & { children: React.ReactNode }) {
  return (
    <div className="w-full">
      {label && <FieldLabel label={label} tooltip={tooltip} required={required} optional={optional} />}
      {children}
      {hint && !error && <p className="mt-1.5 text-pretty text-xs text-muted">{hint}</p>}
      {error && <p className="mt-1.5 text-pretty text-xs text-danger">{error}</p>}
    </div>
  );
}

function PickerCalendar({ bare = false }: { bare?: boolean }) {
  const monthFormatter = useDateFormatter({ month: "long", year: "numeric", timeZone: "UTC" });

  return (
    <Calendar
      visibleDuration={{ months: 3 }}
      pageBehavior="single"
      selectionAlignment="center"
      className={cn(
        "w-[280px] max-w-[calc(100vw-2rem)] overflow-hidden text-sm",
        bare
          ? "bg-transparent p-0"
          : "rounded-card bg-surface p-2.5 shadow-[inset_0_0_0_1px_rgba(26,23,20,0.08),0_1px_2px_rgba(26,23,20,0.04),0_18px_40px_rgba(26,23,20,0.12)]"
      )}
    >
      {({ state }) => (
        <>
          <header className="mb-2 flex items-center justify-between gap-1 px-0.5">
            <AriaButton
              slot="previous"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full text-muted transition-[background-color,color] duration-150 hover:bg-surface-alt hover:text-text active:scale-[0.96]"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="m15 19-7-7 7-7" />
              </svg>
            </AriaButton>
            <Heading className="font-display text-base font-semibold text-text">
              {monthFormatter.format(state.visibleRange.start.add({ months: 1 }).toDate(state.timeZone))}
            </Heading>
            <AriaButton
              slot="next"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full text-muted transition-[background-color,color] duration-150 hover:bg-surface-alt hover:text-text active:scale-[0.96]"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="m9 5 7 7-7 7" />
              </svg>
            </AriaButton>
          </header>

          <CalendarGrid offset={{ months: 1 }} className="w-full border-separate border-spacing-[3px] table-fixed">
            <CalendarGridHeader>
              {(day) => (
                <CalendarHeaderCell className="pb-1 text-center text-[10px] font-medium uppercase tracking-wide text-muted">
                  {day}
                </CalendarHeaderCell>
              )}
            </CalendarGridHeader>
            <CalendarGridBody>
              {(date) => (
                <CalendarCell
                  date={date}
                  className={({ isSelected, isOutsideMonth, isDisabled }) =>
                    cn(
                      "flex h-8 w-8 items-center justify-center rounded-full text-xs tabular-nums outline-none transition-[background-color,color,box-shadow] duration-150 active:scale-[0.96]",
                      isOutsideMonth && "text-muted-light",
                      isDisabled && "opacity-40",
                      isSelected
                        ? "bg-accent text-white shadow-[0_10px_24px_rgba(47,104,68,0.16)]"
                        : "text-text hover:bg-accent-subtle data-[focused]:bg-accent-subtle"
                    )
                  }
                />
              )}
            </CalendarGridBody>
          </CalendarGrid>
        </>
      )}
    </Calendar>
  );
}

function SegmentField() {
  return (
    <DateInput className="flex h-[38px] min-w-0 flex-1 items-center gap-0 overflow-x-auto px-3.5 py-0 tabular-nums [scrollbar-width:none]">
      {(segment) => (
        <DateSegment
          segment={segment}
          className={({ isPlaceholder }) =>
            cn(
              segment.type === "literal"
                ? "px-0 py-0 text-sm leading-none text-muted"
                : "rounded px-[1px] py-0 text-sm leading-none outline-none data-[focused]:bg-accent-subtle data-[focused]:text-text",
              isPlaceholder ? "text-muted-light" : "text-text"
            )
          }
        />
      )}
    </DateInput>
  );
}

function TriggerButton() {
  return (
    <AriaButton
      slot="trigger"
      className="inline-flex h-10 w-10 shrink-0 items-center justify-center self-center rounded-input text-muted transition-[background-color,color] duration-150 hover:bg-surface-alt hover:text-text active:scale-[0.96]"
    >
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    </AriaButton>
  );
}

export function DatePickerField({ label, tooltip, hint, error, value, onChange }: DatePickerFieldProps) {
  const parsedValue = value ? parseDate(value) : null;

  return (
    <PickerFieldShell label={label} tooltip={tooltip} hint={hint} error={error}>
      <AriaDatePicker value={parsedValue} onChange={(next) => onChange(next ? formatCalendarDate(next as CalendarDate) : "")} granularity="day">
        <Group className={cn("input flex h-10 min-h-10 items-center px-0 py-0", error && "border-danger focus-within:border-danger focus-within:ring-danger")}>
          <SegmentField />
          <TriggerButton />
        </Group>
        <Popover className="picker-popover z-50 mt-2 outline-none data-[entering]:translate-y-1 data-[entering]:opacity-0 data-[exiting]:translate-y-1 data-[exiting]:opacity-0">
          <Dialog className="outline-none">
            <PickerCalendar />
          </Dialog>
        </Popover>
      </AriaDatePicker>
    </PickerFieldShell>
  );
}

export function DateTimePickerField({ label, tooltip, hint, error, value, onChange, required, optional }: DateTimePickerFieldProps) {
  const parsedValue = value ? parseDateTime(value) : null;
  const selectedTime = value ? value.slice(11, 16) : "09:00";

  function updateTime(nextTime: string) {
    if (!value) return;
    const datePart = value.slice(0, 10);
    onChange(`${datePart}T${nextTime}`);
  }

  return (
    <PickerFieldShell label={label} tooltip={tooltip} hint={hint} error={error} required={required} optional={optional}>
      <AriaDatePicker
        value={parsedValue}
        onChange={(next) => onChange(next ? formatCalendarDateTime(next as CalendarDateTime) : "")}
        granularity="minute"
        hourCycle={12}
        hideTimeZone
      >
        <Group className={cn("input flex h-10 min-h-10 items-center px-0 py-0", error && "border-danger focus-within:border-danger focus-within:ring-danger")}>
          <SegmentField />
          <TriggerButton />
        </Group>
        <Popover className="picker-popover z-50 mt-2 outline-none data-[entering]:translate-y-1 data-[entering]:opacity-0 data-[exiting]:translate-y-1 data-[exiting]:opacity-0">
          <Dialog className="outline-none">
            <div className="space-y-2 rounded-card bg-surface p-2.5 shadow-[inset_0_0_0_1px_rgba(26,23,20,0.08),0_1px_2px_rgba(26,23,20,0.04),0_18px_40px_rgba(26,23,20,0.12)]">
              <PickerCalendar bare />
              <div className="relative">
                <select
                  className="w-full min-h-10 appearance-none rounded-input bg-surface px-3.5 py-2 pr-10 text-sm text-text shadow-[inset_0_0_0_1px_rgba(26,23,20,0.08)] transition-[border-color,box-shadow] duration-150 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent disabled:cursor-not-allowed disabled:opacity-50"
                  value={selectedTime}
                  onChange={(event) => updateTime(event.target.value)}
                  disabled={!value}
                >
                  {TIME_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-muted" aria-hidden="true">
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="m6 9 6 6 6-6" />
                  </svg>
                </span>
              </div>
            </div>
          </Dialog>
        </Popover>
      </AriaDatePicker>
    </PickerFieldShell>
  );
}
