"use client";

import { cn } from "@/lib/utils";
import React from "react";
import { FieldLabel } from "@/components/ui/field-label";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
  tooltip?: string;
  optional?: boolean;
}

function formatDateValue(value: string): string {
  if (!value) return "";
  const [year, month, day] = value.split("-").map(Number);
  if (!year || !month || !day) return value;
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(Date.UTC(year, month - 1, day)));
}

export function Input({ label, error, hint, tooltip, className, id, optional, ...props }: InputProps) {
  const inputId = id ?? label?.toLowerCase().replace(/\s+/g, "-");
  const isDateInput = props.type === "date";
  const dateValue = typeof props.value === "string" ? props.value : "";

  return (
    <div className="w-full">
      {label && (
        <FieldLabel htmlFor={inputId} label={label} tooltip={tooltip} required={props.required} optional={optional} />
      )}

      {isDateInput ? (
        <div className="relative">
          <input
            id={inputId}
            className={cn(
              "input-date-native absolute inset-0 z-10 cursor-pointer opacity-0",
              className
            )}
            {...props}
          />
          <div
            className={cn(
              "input flex items-center justify-between pr-11",
              error && "border-danger focus:border-danger focus:ring-danger"
            )}
          >
            <span className={cn("truncate", dateValue ? "text-text tabular-nums" : "text-muted-light")}>
              {dateValue ? formatDateValue(dateValue) : props.placeholder ?? "Select date"}
            </span>
            <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-muted" aria-hidden="true">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </span>
          </div>
        </div>
      ) : (
        <input
          id={inputId}
          className={cn("input", error && "border-danger focus:border-danger focus:ring-danger", className)}
          {...props}
        />
      )}

      {hint && !error && <p className="mt-1.5 text-pretty text-xs text-muted">{hint}</p>}
      {error && <p className="mt-1.5 text-pretty text-xs text-danger">{error}</p>}
    </div>
  );
}

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  hint?: string;
  tooltip?: string;
  optional?: boolean;
}

export function Textarea({ label, error, hint, tooltip, className, id, optional, ...props }: TextareaProps) {
  const inputId = id ?? label?.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className="w-full">
      {label && (
        <FieldLabel htmlFor={inputId} label={label} tooltip={tooltip} required={props.required} optional={optional} />
      )}
      <textarea
        id={inputId}
        className={cn(
          "input resize-none",
          error && "border-danger focus:border-danger focus:ring-danger",
          className
        )}
        {...props}
      />
      {hint && !error && <p className="mt-1.5 text-pretty text-xs text-muted">{hint}</p>}
      {error && <p className="mt-1.5 text-pretty text-xs text-danger">{error}</p>}
    </div>
  );
}
