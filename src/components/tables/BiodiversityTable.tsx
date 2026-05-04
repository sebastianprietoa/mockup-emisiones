import { StatusBadge } from "../common/StatusBadge";

type BiodiversityRow = {
  zone: string;
  indicator: string;
  value: number;
  unit: string;
  source: string;
  status: "bueno" | "medio" | "crítico";
};

export function BiodiversityTable({ rows }: { rows: BiodiversityRow[] }) {
  return (
    <div className="overflow-hidden rounded-3xl border border-white/10">
      <table className="min-w-full divide-y divide-white/10">
        <thead className="bg-slate-950/60">
          <tr>
            <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
              Zona
            </th>
            <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
              Indicador
            </th>
            <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
              Valor
            </th>
            <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
              Estado
            </th>
            <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
              Fuente
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/10 bg-slate-900/60">
          {rows.map((row) => (
            <tr key={`${row.zone}-${row.indicator}`} className="hover:bg-white/5">
              <td className="px-4 py-4 text-sm text-slate-200">{row.zone}</td>
              <td className="px-4 py-4 text-sm text-slate-200">{row.indicator}</td>
              <td className="px-4 py-4 text-sm text-slate-200">
                {row.value} {row.unit}
              </td>
              <td className="px-4 py-4 text-sm text-slate-200">
                <StatusBadge tone={row.status} />
              </td>
              <td className="px-4 py-4 text-sm text-slate-300">{row.source}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

