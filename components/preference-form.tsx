"use client";

import { Select } from "@/components/ui/select";
import { Input, Textarea } from "@/components/ui/input";

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

interface PreferenceFormProps {
  values: PreferenceValues;
  onChange: (values: PreferenceValues) => void;
}

const foodOptions = [
  { value: "no_preference", label: "No preference" },
  { value: "veg", label: "Vegetarian" },
  { value: "vegan", label: "Vegan" },
  { value: "non_veg", label: "Non-vegetarian" },
  { value: "halal", label: "Halal" },
  { value: "jain", label: "Jain" },
  { value: "eggetarian", label: "Eggetarian" },
  { value: "custom", label: "Custom (describe in notes)" },
];

const budgetOptions = [
  { value: "no_preference", label: "No preference" },
  { value: "low", label: "Budget-friendly" },
  { value: "medium", label: "Mid-range" },
  { value: "high", label: "Upscale" },
];

const dayTypeOptions = [
  { value: "no_preference", label: "No preference" },
  { value: "weekday", label: "Weekday" },
  { value: "weekend", label: "Weekend" },
];

const timeOfDayOptions = [
  { value: "no_preference", label: "No preference" },
  { value: "morning", label: "Morning (5am–12pm)" },
  { value: "afternoon", label: "Afternoon (12pm–5pm)" },
  { value: "evening", label: "Evening (5pm–9pm)" },
  { value: "late_night", label: "Late night (9pm+)" },
];

const indoorOutdoorOptions = [
  { value: "no_preference", label: "No preference" },
  { value: "indoor", label: "Indoor" },
  { value: "outdoor", label: "Outdoor" },
];

export function PreferenceForm({ values, onChange }: PreferenceFormProps) {
  const set = (field: keyof PreferenceValues, value: string) => {
    onChange({ ...values, [field]: value });
  };

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          label="Preferred area / location"
          placeholder="e.g., Downtown, East Side..."
          value={values.preferred_area}
          onChange={(e) => set("preferred_area", e.target.value)}
        />
        <Input
          label="Max travel distance (km)"
          type="number"
          min="0"
          max="200"
          placeholder="e.g., 10"
          value={values.max_travel_distance}
          onChange={(e) => set("max_travel_distance", e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Select
          label="Food preference"
          options={foodOptions}
          value={values.food_preference}
          onChange={(e) => set("food_preference", e.target.value)}
        />
        <Select
          label="Budget"
          options={budgetOptions}
          value={values.budget_preference}
          onChange={(e) => set("budget_preference", e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Select
          label="Day preference"
          options={dayTypeOptions}
          value={values.preferred_day_type}
          onChange={(e) => set("preferred_day_type", e.target.value)}
        />
        <Select
          label="Time of day"
          options={timeOfDayOptions}
          value={values.preferred_time_of_day}
          onChange={(e) => set("preferred_time_of_day", e.target.value)}
        />
        <Select
          label="Setting"
          options={indoorOutdoorOptions}
          value={values.indoor_outdoor}
          onChange={(e) => set("indoor_outdoor", e.target.value)}
        />
      </div>

      <Textarea
        label="Notes"
        placeholder="Anything else? e.g., 'prefer somewhere with parking', 'need to leave by 9pm'..."
        rows={3}
        value={values.notes}
        onChange={(e) => set("notes", e.target.value)}
      />
    </div>
  );
}
