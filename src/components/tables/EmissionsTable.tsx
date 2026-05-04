import { formatNumber, formatPercent, formatTons } from "../../utils/formatters";

type EmissionsRow = Record<string, string | number>;

type EmissionsTableProps = {
  rows: EmissionsRow[];
  columns: Array<{
    key: keyof EmissionsRow;
    label: string;
  }>;
};

export function EmissionsTable({ rows, columns }: EmissionsTableProps) {
  return (
    <div className="overflow-hidden rounded-3xl border border-white/10">
      <table className="min-w-full divide-y divide-white/10">
        <thead className="bg-slate-950/60">
          <tr>
            {columns.map((column) => (
              <th
                key={String(column.key)}
                className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-[0.18em] text-slate-400"
              >
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-white/10 bg-slate-900/60">
          {rows.map((row) => (
            <tr key={`${row.source}-${row.emissions}`} className="hover:bg-white/5">
              {columns.map((column) => {
                const value = row[column.key];

                return (
                  <td key={String(column.key)} className="px-4 py-4 text-sm text-slate-200">
                    {column.key === "emissions"
                      ? formatTons(Number(value))
                      : column.key === "share"
                        ? formatPercent(Number(value))
                        : typeof value === "number"
                          ? formatNumber(value)
                          : value}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
