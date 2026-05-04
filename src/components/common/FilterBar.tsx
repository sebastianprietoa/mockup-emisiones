import { useMemo, useState } from "react";
import type { FilterField } from "../../config/filters";

type FilterBarProps = {
  title?: string;
  fields: FilterField[];
};

export function FilterBar({ title = "Filtros simulados", fields }: FilterBarProps) {
  const initialValues = useMemo(() => {
    return fields.reduce<Record<string, string>>((acc, field) => {
      acc[field.id] = field.options[0]?.value ?? "";
      return acc;
    }, {});
  }, [fields]);

  const [values, setValues] = useState(initialValues);

  return (
    <section className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur">
      <div className="mb-4 flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-200">
            {title}
          </h2>
          <p className="text-sm text-slate-400">Selección visual para simulación de contexto analítico.</p>
        </div>
        <span className="text-xs text-slate-500">No conecta con backend</span>
      </div>
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {fields.map((field) => (
          <label key={field.id} className="space-y-2 text-sm">
            <span className="block text-slate-300">{field.label}</span>
            <select
              value={values[field.id]}
              onChange={(event) =>
                setValues((current) => ({ ...current, [field.id]: event.target.value }))
              }
              className="w-full rounded-2xl border border-white/10 bg-slate-950/80 px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-emerald-400/70 focus:ring-2 focus:ring-emerald-400/20"
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

