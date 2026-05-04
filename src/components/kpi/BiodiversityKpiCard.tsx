import { ArrowDownRight, ArrowUpRight, Minus } from "lucide-react";
import { StatusBadge } from "../common/StatusBadge";
import type { BiodiversityStatus, BiodiversityTrend } from "../../data/biodiversityData";

type BiodiversityKpiCardProps = {
  name: string;
  value: string;
  unit: string;
  trend: BiodiversityTrend;
  status: BiodiversityStatus;
  source: string;
};

export function BiodiversityKpiCard({
  name,
  value,
  unit,
  trend,
  status,
  source,
}: BiodiversityKpiCardProps) {
  const TrendIcon = trend === "alza" ? ArrowUpRight : trend === "baja" ? ArrowDownRight : Minus;

  return (
    <article className="rounded-3xl border border-white/10 bg-white/5 p-5 shadow-soft backdrop-blur">
      <div className="flex items-start justify-between gap-3">
        <div className="space-y-2">
          <p className="text-sm text-slate-300">{name}</p>
          <p className="text-3xl font-semibold text-white">
            {value} <span className="text-base font-medium text-slate-400">{unit}</span>
          </p>
        </div>
        <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-400/10 text-emerald-200">
          <TrendIcon size={18} />
        </span>
      </div>
      <div className="mt-4 flex flex-wrap items-center gap-2">
        <StatusBadge tone={status} />
        <StatusBadge tone={trend} variant="trend" />
      </div>
      <p className="mt-3 text-sm leading-6 text-slate-400">Fuente sugerida: {source}</p>
    </article>
  );
}

