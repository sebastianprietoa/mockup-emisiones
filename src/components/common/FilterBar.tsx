import type { FilterField } from "../../config/filters";

type FilterBarProps = {
  title?: string;
  description?: string;
  fields: FilterField[];
  values: Record<string, string>;
  onChange: (fieldId: string, value: string) => void;
};

export function FilterBar({
  title = "Filtros simulados",
  description = "Selección visual para simulación de contexto analítico.",
  fields,
  values,
  onChange,
}: FilterBarProps) {
  return (
    <section className="rounded-[28px] border border-[#D7CCC1] bg-[#FFF9F1] p-5 backdrop-blur">
      <div className="mb-4 flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-[#362F32]">
            {title}
          </h2>
          <p className="text-sm text-[#5B6165]">{description}</p>
        </div>
        <span className="text-xs text-[#5B6165]">Base estática desde CSV</span>
      </div>
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {fields.map((field) => (
          <label key={field.id} className="space-y-2 text-sm">
            <span className="block text-[#362F32]">{field.label}</span>
            <select
              value={values[field.id] ?? field.options[0]?.value ?? "all"}
              onChange={(event) => onChange(field.id, event.target.value)}
              className="w-full rounded-2xl border border-[#D7CCC1] bg-[#EBE6DB] px-4 py-3 text-sm text-[#362F32] outline-none transition focus:border-[#EC1B91]/70 focus:ring-2 focus:ring-[#EC1B91]/20"
            >
              {field.options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>
        ))}
      </div>
    </section>
  );
}

