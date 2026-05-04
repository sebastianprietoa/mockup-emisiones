import type { FilterField } from "../config/filters";

export function buildInitialFilterValues(fields: FilterField[]) {
  return fields.reduce<Record<string, string>>((acc, field) => {
    const allOption = field.options.find((option) => option.value === "all");
    acc[field.id] = allOption?.value ?? field.options[0]?.value ?? "all";
    return acc;
  }, {});
}

export function isAllSelection(value: string) {
  return value === "all" || value === "";
}
