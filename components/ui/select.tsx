"use client";

import { cn } from "@/lib/utils";
import React from "react";
import { FieldLabel } from "@/components/ui/field-label";

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  hint?: string;
  tooltip?: string;
  optional?: boolean;
  options: Array<{ value: string; label: string }>;
}

export function Select({ label, error, hint, tooltip, className, id, options, optional, ...props }: SelectProps) {
  const inputId = id ?? label?.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className="w-full">
      {label && (
        <FieldLabel htmlFor={inputId} label={label} tooltip={tooltip} required={props.required} optional={optional} />
      )}
      <div className="relative">
        <select
          id={inputId}
          className={cn(
            "input appearance-none cursor-pointer pr-10",
            error && "border-danger focus:border-danger focus:ring-danger",
            className
          )}
          {...props}
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-muted" aria-hidden="true">
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="m6 9 6 6 6-6" />
          </svg>
        </span>
      </div>
      {hint && !error && <p className="mt-1.5 text-pretty text-xs text-muted">{hint}</p>}
      {error && <p className="mt-1.5 text-pretty text-xs text-danger">{error}</p>}
    </div>
  );
}
