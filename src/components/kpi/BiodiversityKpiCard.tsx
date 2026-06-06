import { StatusBadge } from "../common/StatusBadge";

type BiodiversityKpiCardProps = {
  name: string;
  value: string;
  unit: string;
  trend: "alza" | "baja" | "estable";
  status: "bueno" | "medio" | "crítico";
  source: string;
};

export function BiodiversityKpiCard({ name, value, unit, trend, status, source }: BiodiversityKpiCardProps) {
  return (
    <article className="rounded-[26px] border border-[#D7CCC1] bg-[#FFF9F1] p-5 shadow-soft backdrop-blur">
      <div className="flex items-start justify-between gap-3">
        <div className="space-y-3">
          <p className="text-sm text-[#5B6165]">{name}</p>
          <p className="text-3xl font-semibold tracking-tight text-[#362F32]">
            {value} <span className="text-base font-medium text-[#5B6165]">{unit}</span>
          </p>
        </div>
        <StatusBadge tone={trend} variant="trend" />
      </div>
      <div className="mt-4 flex flex-wrap items-center gap-2">
        <StatusBadge tone={status} />
      </div>
      <p className="mt-3 text-sm leading-6 text-[#5B6165]">Fuente sugerida: {source}</p>
    </article>
  );
}
