import { formatPercent } from "../../utils/formatters";

type EmissionsTableRow = {
  source: string;
  scope?: string;
  activity: string;
  factor: string;
  emissions: number;
  share: number;
  [key: string]: string | number | undefined;
};

type EmissionsTableProps = {
  rows: EmissionsTableRow[];
  columns?: Array<{ key: string; label: string }>;
};

export function EmissionsTable({ rows }: EmissionsTableProps) {
  return (
    <div className="overflow-hidden rounded-[24px] border border-[#D7CCC1]">
      <table className="min-w-full divide-y divide-[#D7CCC1] bg-[#FFF9F1]">
        <thead className="bg-[#EBE6DB]">
          <tr>
            <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-[0.18em] text-[#5B6165]">Fuente</th>
            <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-[0.18em] text-[#5B6165]">Alcance</th>
            <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-[0.18em] text-[#5B6165]">Actividad</th>
            <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-[0.18em] text-[#5B6165]">Factor</th>
            <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-[0.18em] text-[#5B6165]">Emisiones</th>
            <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-[0.18em] text-[#5B6165]">Participación</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[#E3D8CB]">
          {rows.map((row) => (
            <tr key={`${row.source}-${row.emissions}`} className="hover:bg-[#F7EFE5]">
              <td className="px-4 py-4 text-sm text-[#362F32]">{row.source}</td>
              <td className="px-4 py-4 text-sm text-[#362F32]">{row.scope}</td>
              <td className="px-4 py-4 text-sm text-[#362F32]">{row.activity}</td>
              <td className="px-4 py-4 text-sm text-[#5B6165]">{row.factor}</td>
              <td className="px-4 py-4 text-sm text-[#362F32]">{row.emissions}</td>
              <td className="px-4 py-4 text-sm text-[#5B6165]">{formatPercent(row.share)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
