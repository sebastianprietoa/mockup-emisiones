import { ArrowUpRight, Leaf, TrendingDown, Gauge, Target } from "lucide-react";
import { ChartCard } from "../components/charts/ChartCard";
import { DonutChart } from "../components/charts/DonutChart";
import { PageTitle } from "../components/common/PageTitle";
import { KpiCard } from "../components/kpi/KpiCard";
import { homeScopeDistribution, homeSummary } from "../data/emissionsSummary";
import { formatPercent, formatSignedPercent, formatTons } from "../utils/formatters";

export function HomePage() {
  return (
    <div className="space-y-6">
      <PageTitle
        eyebrow="Resumen ejecutivo"
        title="Carbon Intelligence Dashboard"
        description="Vista inicial de desempeño corporativo en emisiones GEI, con foco en lectura ejecutiva, trazabilidad de fuentes y narrativa de avance."
      />

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        <KpiCard
          label="Emisiones totales"
          value={formatTons(homeSummary.totalEmissions)}
          helper="Inventario consolidado para la organización."
          icon={<Leaf size={18} />}
        />
        <KpiCard
          label="Alcance principal"
          value={homeSummary.mainScope}
          helper="Categoría con mayor contribución al total."
          icon={<ArrowUpRight size={18} />}
        />
        <KpiCard
          label="Variación vs año anterior"
          value={formatSignedPercent(homeSummary.yearVariation)}
          helper="Reducción interanual simulada."
          trend="baja"
          icon={<TrendingDown size={18} />}
        />
        <KpiCard
          label="Intensidad de emisiones"
          value={`${homeSummary.intensity.toFixed(2)} tCO2e/M$`}
          helper="Indicador de eficiencia climática."
          icon={<Gauge size={18} />}
        />
        <KpiCard
          label="Avance de metas"
          value={formatPercent(homeSummary.goalProgress)}
          helper="Progreso visual respecto de la meta interna."
          status="bueno"
          icon={<Target size={18} />}
        />
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <ChartCard
          title="Distribución por alcance"
          description="Lectura ejecutiva del inventario GEI consolidado."
        >
          <DonutChart data={homeScopeDistribution} dataKey="value" nameKey="name" />
        </ChartCard>

        <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-6 shadow-soft backdrop-blur">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-emerald-300">
            Mensaje ejecutivo
          </p>
          <div className="mt-4 space-y-4">
            <p className="text-lg font-medium leading-8 text-white">
              La huella corporativa se concentra en la cadena de valor, por lo que el mayor espacio de
              captura de valor está en proveedores, logística y decisiones de compra.
            </p>
            <p className="text-sm leading-7 text-slate-300">{homeSummary.executiveMessage}</p>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Lectura</p>
              <p className="mt-2 text-sm text-slate-200">Reporte preparado para comité ejecutivo.</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Enfoque</p>
              <p className="mt-2 text-sm text-slate-200">GHG Protocol como marco conceptual.</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Naturaleza</p>
              <p className="mt-2 text-sm text-slate-200">Módulo TNFD separado para biodiversidad.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

