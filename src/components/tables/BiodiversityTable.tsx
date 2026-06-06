import { StatusBadge } from "../common/StatusBadge";

type BiodiversityTableRow = {
  zone: string;
  indicator: string;
  value: number;
  unit: string;
  source: string;
  status: "bueno" | "medio" | "crítico";
};

type BiodiversityTableProps = {
  rows: BiodiversityTableRow[];
  columns?: Array<{ key: string; label: string }>;
};

export function BiodiversityTable({ rows }: BiodiversityTableProps) {
  return (
    <div className="overflow-hidden rounded-[24px] border border-[#D7CCC1]">
      <table className="min-w-full divide-y divide-[#D7CCC1] bg-[#FFF9F1]">
        <thead className="bg-[#EBE6DB]">
          <tr>
            <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-[0.18em] text-[#5B6165]">Zona</th>
            <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-[0.18em] text-[#5B6165]">Indicador</th>
            <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-[0.18em] text-[#5B6165]">Valor</th>
            <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-[0.18em] text-[#5B6165]">Fuente</th>
            <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-[0.18em] text-[#5B6165]">Estado</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[#E3D8CB]">
          {rows.map((row) => (
            <tr key={`${row.zone}-${row.indicator}`} className="hover:bg-[#F7EFE5]">
              <td className="px-4 py-4 text-sm text-[#362F32]">{row.zone}</td>
              <td className="px-4 py-4 text-sm text-[#362F32]">{row.indicator}</td>
              <td className="px-4 py-4 text-sm text-[#362F32]">
                {row.value} {row.unit}
              </td>
              <td className="px-4 py-4 text-sm text-[#5B6165]">{row.source}</td>
              <td className="px-4 py-4 text-sm">
                <StatusBadge tone={row.status} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
