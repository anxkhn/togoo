"use client";

import { Input, Textarea } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export interface PreferenceValues {
  preferred_area: string;
  max_travel_distance: string;
  food_preference: string;
  food_note: string;
  budget_preference: string;
  preferred_day_type: string;
  preferred_time_of_day: string;
  indoor_outdoor: string;
  notes: string;
}

export const defaultPreferences: PreferenceValues = {
  preferred_area: "",
  max_travel_distance: "",
  food_preference: "no_preference",
  food_note: "",
  budget_preference: "no_preference",
  preferred_day_type: "no_preference",
  preferred_time_of_day: "no_preference",
  indoor_outdoor: "no_preference",
  notes: "",
};

// All known preference field keys
export const ALL_PREFERENCE_FIELDS = [
  "food",
  "budget",
  "location",
  "day_type",
  "time_of_day",
  "indoor_outdoor",
] as const;

export type PreferenceFieldKey = (typeof ALL_PREFERENCE_FIELDS)[number];

interface PreferenceFormProps {
  values: PreferenceValues;
  onChange: (values: PreferenceValues) => void;
  // If empty or undefined, show all fields
  enabledFields?: string[];
}

function set(values: PreferenceValues, field: keyof PreferenceValues, value: string): PreferenceValues {
  return { ...values, [field]: value };
}

// ─── pill group ───────────────────────────────────────────────────────────────

interface PillOption {
  value: string;
  label: string;
}

function PillGroup({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: PillOption[];
  onChange: (v: string) => void;
}) {
  return (
    <div>
      <p className="text-xs font-medium text-muted mb-2">{label}</p>
      <div className="flex flex-wrap gap-1.5">
        {options.map((opt) => (
          <button
            key={opt.value}
            type="button"
            onClick={() => onChange(opt.value === value ? "no_preference" : opt.value)}
            className={cn(
              "pill-toggle",
              value === opt.value
                ? "bg-accent text-white shadow-[0_10px_24px_rgba(47,104,68,0.16),inset_0_1px_0_rgba(255,255,255,0.12)]"
                : "bg-surface text-text hover:border-accent/50 hover:bg-accent-subtle/20"
            )}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
}

// ─── option data ──────────────────────────────────────────────────────────────

const FOOD_OPTS: PillOption[] = [
  { value: "no_preference", label: "Anything works" },
  { value: "veg", label: "Veg" },
  { value: "vegan", label: "Vegan" },
  { value: "non_veg", label: "Non-veg" },
  { value: "halal", label: "Halal" },
  { value: "jain", label: "Jain" },
  { value: "eggetarian", label: "Eggetarian" },
  { value: "custom", label: "Other" },
];

const BUDGET_OPTS: PillOption[] = [
  { value: "no_preference", label: "Anything works" },
  { value: "low", label: "Keep it affordable" },
  { value: "medium", label: "Mid-range" },
  { value: "high", label: "Splurge" },
];

const DAY_OPTS: PillOption[] = [
  { value: "no_preference", label: "Anything works" },
  { value: "weekday", label: "Weekday" },
  { value: "weekend", label: "Weekend" },
];

const TIME_OPTS: PillOption[] = [
  { value: "no_preference", label: "Anything works" },
  { value: "morning", label: "Morning" },
  { value: "afternoon", label: "Afternoon" },
  { value: "evening", label: "Evening" },
  { value: "late_night", label: "Late night" },
];

const SETTING_OPTS: PillOption[] = [
  { value: "no_preference", label: "Anything works" },
  { value: "indoor", label: "Indoor" },
  { value: "outdoor", label: "Outdoor" },
];

// ─── main component ───────────────────────────────────────────────────────────

export function PreferenceForm({ values, onChange, enabledFields }: PreferenceFormProps) {
  // Empty enabledFields means show everything (backward compat)
  const show = (key: string) =>
    !enabledFields || enabledFields.length === 0 || enabledFields.includes(key);

  return (
    <div className="space-y-5">
      {show("food") && (
        <PillGroup
          label="Food"
          value={values.food_preference}
          options={FOOD_OPTS}
          onChange={(v) => onChange(set(values, "food_preference", v))}
        />
      )}

      {show("food") && values.food_preference === "custom" && (
        <Input
          label="Share more detail"
          placeholder="Gluten-free, nut allergy, etc."
          value={values.food_note}
          onChange={(e) => onChange(set(values, "food_note", e.target.value))}
        />
      )}

      {show("budget") && (
        <PillGroup
          label="Budget"
          value={values.budget_preference}
          options={BUDGET_OPTS}
          onChange={(v) => onChange(set(values, "budget_preference", v))}
        />
      )}

      {show("day_type") && (
        <PillGroup
          label="Best day"
          value={values.preferred_day_type}
          options={DAY_OPTS}
          onChange={(v) => onChange(set(values, "preferred_day_type", v))}
        />
      )}

      {show("time_of_day") && (
        <PillGroup
          label="Time of day"
          value={values.preferred_time_of_day}
          options={TIME_OPTS}
          onChange={(v) => onChange(set(values, "preferred_time_of_day", v))}
        />
      )}

      {show("indoor_outdoor") && (
        <PillGroup
          label="Indoor or outdoor"
          value={values.indoor_outdoor}
          options={SETTING_OPTS}
          onChange={(v) => onChange(set(values, "indoor_outdoor", v))}
        />
      )}

      {show("location") && (
        <Input
          label="Preferred area"
          placeholder="Downtown, east side, close to the office..."
          value={values.preferred_area}
          onChange={(e) => onChange(set(values, "preferred_area", e.target.value))}
        />
      )}

      <Textarea
        label="Anything else the organizer should know?"
        placeholder="Parking, a hard stop time, accessibility needs, or anything else that matters."
        rows={2}
        value={values.notes}
        onChange={(e) => onChange(set(values, "notes", e.target.value))}
      />
    </div>
  );
}
