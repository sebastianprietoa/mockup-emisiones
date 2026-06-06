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
    <article className="rounded-[26px] border border-[#D7CCC1] bg-[#FFF9F1] p-5 shadow-soft backdrop-blur">
      <div className="flex items-start justify-between gap-3">
        <div className="space-y-3">
          <p className="text-sm text-[#5B6165]">{label}</p>
          <p className="text-3xl font-semibold tracking-tight text-[#362F32]">{value}</p>
        </div>
        {icon ? (
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#EBE6DB] text-[#3A283A]">
            {icon}
          </div>
        ) : null}
      </div>
      <div className="mt-4 flex flex-wrap items-center gap-2">
        {trend ? (
          <span className="inline-flex items-center gap-1 rounded-full bg-[#EBE6DB] px-2.5 py-1 text-xs text-[#362F32]">
            {trend === "alza" ? <ArrowUpRight size={14} /> : trend === "baja" ? <ArrowDownRight size={14} /> : <Minus size={14} />}
            {trend === "alza" ? "Sube" : trend === "baja" ? "Baja" : "Estable"}
          </span>
        ) : null}
        {status ? <StatusBadge tone={status} /> : null}
      </div>
      {helper ? <p className="mt-3 text-sm leading-6 text-[#5B6165]">{helper}</p> : null}
    </article>
  );
}
