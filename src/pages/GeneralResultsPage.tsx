import { BarChart } from "../components/charts/BarChart";
import { ChartCard } from "../components/charts/ChartCard";
import { DonutChart } from "../components/charts/DonutChart";
import { LineChart } from "../components/charts/LineChart";
import { FilterBar } from "../components/common/FilterBar";
import { PageTitle } from "../components/common/PageTitle";
import { KpiCard } from "../components/kpi/KpiCard";
import { EmissionsTable } from "../components/tables/EmissionsTable";
import { useDashboardFilters } from "../context/DashboardFiltersContext";
import { generalFilters } from "../config/filters";
import { buildEmissionsView } from "../data/dashboardDatabase";
import { formatTons } from "../utils/formatters";

export function GeneralResultsPage() {
  const { filters, setFilterValue } = useDashboardFilters();
  const view = buildEmissionsView(filters);

  return (
    <div className="space-y-6">
      <PageTitle
        eyebrow="Resultados generales"
        title="Inventario corporativo de GEI"
        description="Resumen consolidado de Alcance 1, Alcance 2 y Alcance 3, con lectura gráfica y tabla de trazabilidad para análisis ejecutivo."
      />

      <FilterBar
        fields={generalFilters}
        values={filters}
        onChange={setFilterValue}
      />

      <section className="grid gap-4 md:grid-cols-3">
        {view.scopeBreakdown.map((scope) => (
          <KpiCard
            key={scope.name}
            label={scope.name}
            value={formatTons(scope.value)}
            helper="Peso relativo dentro del inventario."
          />
        ))}
      </section>

      <section className="grid gap-6 xl:grid-cols-2">
        <ChartCard title="Distribución por alcance" description="Vista donut para el inventario consolidado.">
          <DonutChart data={view.scopeBreakdown} dataKey="value" nameKey="name" />
        </ChartCard>

        <ChartCard title="Emisiones por categoría" description="Agrupación ejecutiva por fuentes principales.">
          <BarChart
            data={view.categoryData}
            xKey="category"
            series={[{ key: "emissions", name: "tCO2e" }]}
          />
        </ChartCard>

        <ChartCard title="Evolución mensual" description="Tendencia simulada por alcance.">
          <LineChart
            data={view.monthlyData}
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
              rows={view.tableRows}
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
