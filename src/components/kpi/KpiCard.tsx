import { ArrowDownRight, ArrowUpRight, Minus } from "lucide-react";
import { StatusBadge } from "../common/StatusBadge";

type KpiCardProps = {
  label: string;
  value: string;
  helper?: string;
  trend?: "alza" | "baja" | "estable";
  status?: "bueno" | "medio" | "crítico";
  icon?: React.ReactNode;
};

export function KpiCard({ label, value, helper, trend, status, icon }: KpiCardProps) {
  return (
    <article className="rounded-3xl border border-white/10 bg-white/5 p-5 shadow-soft backdrop-blur">
      <div className="flex items-start justify-between gap-3">
        <div className="space-y-3">
          <p className="text-sm text-slate-300">{label}</p>
          <p className="text-3xl font-semibold tracking-tight text-white">{value}</p>
        </div>
        {icon ? (
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-400/10 text-emerald-200">
            {icon}
          </div>
        ) : null}
      </div>
      <div className="mt-4 flex flex-wrap items-center gap-2">
        {trend ? (
          <span className="inline-flex items-center gap-1 rounded-full bg-slate-900/80 px-2.5 py-1 text-xs text-slate-200">
            {trend === "alza" ? <ArrowUpRight size={14} /> : trend === "baja" ? <ArrowDownRight size={14} /> : <Minus size={14} />}
            {trend === "alza" ? "Sube" : trend === "baja" ? "Baja" : "Estable"}
          </span>
        ) : null}
        {status ? <StatusBadge tone={status} /> : null}
      </div>
      {helper ? <p className="mt-3 text-sm leading-6 text-slate-400">{helper}</p> : null}
    </article>
  );
}

