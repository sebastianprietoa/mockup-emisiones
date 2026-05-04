import { BarChart } from "../components/charts/BarChart";
import { ChartCard } from "../components/charts/ChartCard";
import { DonutChart } from "../components/charts/DonutChart";
import { LineChart } from "../components/charts/LineChart";
import { FilterBar } from "../components/common/FilterBar";
import { PageTitle } from "../components/common/PageTitle";
import { KpiCard } from "../components/kpi/KpiCard";
import { EmissionsTable } from "../components/tables/EmissionsTable";
import { generalFilters } from "../config/filters";
import {
  generalCategoryData,
  generalMonthlyData,
  generalScopeBreakdown,
  generalTableRows,
} from "../data/emissionsSummary";
import { formatTons } from "../utils/formatters";

export function GeneralResultsPage() {
  return (
    <div className="space-y-6">
      <PageTitle
        eyebrow="Resultados generales"
        title="Inventario corporativo de GEI"
        description="Resumen consolidado de Alcance 1, Alcance 2 y Alcance 3, con lectura gráfica y tabla de trazabilidad para análisis ejecutivo."
      />

      <FilterBar fields={generalFilters} />

      <section className="grid gap-4 md:grid-cols-3">
        {generalScopeBreakdown.map((scope) => (
          <KpiCard
            key={scope.name}
            label={scope.name}
            value={formatTons(scope.emissions)}
            helper="Peso relativo dentro del inventario."
          />
        ))}
      </section>

      <section className="grid gap-6 xl:grid-cols-2">
        <ChartCard title="Distribución por alcance" description="Vista donut para el inventario consolidado.">
          <DonutChart data={generalScopeBreakdown} dataKey="emissions" nameKey="name" />
        </ChartCard>

        <ChartCard title="Emisiones por categoría" description="Agrupación ejecutiva por fuentes principales.">
          <BarChart
            data={generalCategoryData}
            xKey="category"
            series={[{ key: "emissions", name: "tCO2e" }]}
          />
        </ChartCard>

        <ChartCard title="Evolución mensual" description="Tendencia simulada por alcance.">
          <LineChart
            data={generalMonthlyData}
            xKey="month"
            series={[
              { key: "scope1", name: "Scope 1" },
              { key: "scope2", name: "Scope 2" },
              { key: "scope3", name: "Scope 3" },
            ]}
          />
        </ChartCard>

        <section className="rounded-3xl border border-white/10 bg-slate-900/70 p-5 shadow-soft backdrop-blur">
          <h3 className="text-base font-semibold text-white">Tabla resumen de emisiones</h3>
          <p className="mt-1 text-sm text-slate-400">
            Base de lectura para análisis por fuente, actividad y factor de emisión.
          </p>
          <div className="mt-4">
            <EmissionsTable
              rows={generalTableRows}
              columns={[
                { key: "source", label: "Fuente de emisión" },
                { key: "scope", label: "Alcance" },
                { key: "activity", label: "Actividad" },
                { key: "factor", label: "Factor de emisión" },
                { key: "emissions", label: "Emisiones tCO2e" },
                { key: "share", label: "% del total" },
              ]}
            />
          </div>
        </section>
      </section>
    </div>
  );
}

