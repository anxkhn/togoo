const DEFAULT_ENABLED_PREFERENCES = [
  "food",
  "budget",
  "location",
  "day_type",
  "time_of_day",
  "indoor_outdoor",
] as const;

export function parseEnabledPreferences(raw: string | null | undefined): string[] {
  if (!raw) return [...DEFAULT_ENABLED_PREFERENCES];

  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.filter((value): value is string => typeof value === "string") : [];
  } catch {
    return [...DEFAULT_ENABLED_PREFERENCES];
  }
}

interface PreferenceValuesLike {
  preferred_area?: string | null;
  max_travel_distance?: number | string | null;
  food_preference?: string | null;
  food_note?: string | null;
  budget_preference?: string | null;
  preferred_day_type?: string | null;
  preferred_time_of_day?: string | null;
  indoor_outdoor?: string | null;
  notes?: string | null;
}

export function hasMeaningfulPreferences(
  preferences: PreferenceValuesLike | null | undefined,
  enabledFields: string[]
): boolean {
  if (!preferences) return false;

  const fieldsToCheck = enabledFields.length > 0 ? enabledFields : [...DEFAULT_ENABLED_PREFERENCES];

  for (const field of fieldsToCheck) {
    if (field === "food" && preferences.food_preference && preferences.food_preference !== "no_preference") {
      return true;
    }

    if (field === "budget" && preferences.budget_preference && preferences.budget_preference !== "no_preference") {
      return true;
    }

    if (
      field === "location" &&
      ((preferences.preferred_area && preferences.preferred_area.trim().length > 0) ||
        preferences.max_travel_distance !== null &&
          preferences.max_travel_distance !== undefined &&
          String(preferences.max_travel_distance).trim().length > 0)
    ) {
      return true;
    }

    if (
      field === "day_type" &&
      preferences.preferred_day_type &&
      preferences.preferred_day_type !== "no_preference"
    ) {
      return true;
    }

    if (
      field === "time_of_day" &&
      preferences.preferred_time_of_day &&
      preferences.preferred_time_of_day !== "no_preference"
    ) {
      return true;
    }

    if (
      field === "indoor_outdoor" &&
      preferences.indoor_outdoor &&
      preferences.indoor_outdoor !== "no_preference"
    ) {
      return true;
    }
  }

  return Boolean(
    (preferences.food_note && preferences.food_note.trim().length > 0) ||
      (preferences.notes && preferences.notes.trim().length > 0)
  );
}
