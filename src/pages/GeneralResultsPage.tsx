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
  const totalEmissions = view.scopeBreakdown.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="space-y-6">
      <PageTitle
        eyebrow="Resultados generales"
        title="Inventario consolidado de GEI"
        description="Lectura ejecutiva de Alcance 1, Alcance 2 y Alcance 3 con filtros, gráficos y tabla de trazabilidad para análisis corporativo."
      />

      <FilterBar fields={generalFilters} values={filters} onChange={setFilterValue} title="Filtros de inventario" description="Selección visual para simulación de contexto analítico." />

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <KpiCard label="Inventario total" value={formatTons(totalEmissions)} helper="Huella corporativa consolidada." />
        {view.scopeBreakdown.map((scope) => (
          <KpiCard key={scope.name} label={scope.name} value={formatTons(scope.value)} helper="Peso relativo dentro del inventario." />
        ))}
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
        <ChartCard title="Distribución por alcance" description="Vista donut del inventario consolidado.">
          <DonutChart data={view.scopeBreakdown} dataKey="value" nameKey="name" />
        </ChartCard>

        <div className="rounded-[28px] border border-[#D7CCC1] bg-[#FFF9F1] p-6 shadow-soft backdrop-blur">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#0BA4DE]">Lectura ejecutiva</p>
          <div className="mt-4 space-y-4">
            <p className="text-lg font-medium leading-8 text-[#362F32]">
              El inventario se explica principalmente por la cadena de valor, por lo que Scope 3 sigue siendo la palanca más relevante para reducir huella.
            </p>
            <p className="text-sm leading-7 text-[#5B6165]">
              Los filtros de año, instalación, país y unidad de negocio actualizan en tiempo real la distribución por alcance, las categorías y la tabla de detalle.
            </p>
          </div>
          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            <div className="rounded-2xl border border-[#D7CCC1] bg-[#EBE6DB] p-4">
              <p className="text-xs uppercase tracking-[0.18em] text-[#5B6165]">Origen</p>
              <p className="mt-2 text-sm text-[#362F32]">Base estática del inventario 2018.</p>
            </div>
            <div className="rounded-2xl border border-[#D7CCC1] bg-[#EBE6DB] p-4">
              <p className="text-xs uppercase tracking-[0.18em] text-[#5B6165]">Marco</p>
              <p className="mt-2 text-sm text-[#362F32]">GHG Protocol para la lectura corporativa.</p>
            </div>
            <div className="rounded-2xl border border-[#D7CCC1] bg-[#EBE6DB] p-4">
              <p className="text-xs uppercase tracking-[0.18em] text-[#5B6165]">Salida</p>
              <p className="mt-2 text-sm text-[#362F32]">Resumen ejecutivo y trazabilidad analítica.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-2">
        <ChartCard title="Principales fuentes por categoría" description="Agrupación ejecutiva de las emisiones.">
          <BarChart data={view.categoryData} xKey="category" series={[{ key: "emissions", name: "tCO2e" }]} />
        </ChartCard>
        <ChartCard title="Tendencia mensual del inventario" description="Comportamiento agregado por alcance.">
          <LineChart
            data={view.monthlyData}
            xKey="month"
            series={[
              { key: "scope1", name: "Alcance 1" },
              { key: "scope2", name: "Alcance 2" },
              { key: "scope3", name: "Alcance 3" },
            ]}
          />
        </ChartCard>
      </section>

      <section className="rounded-[28px] border border-[#D7CCC1] bg-[#FFF9F1] p-5 shadow-soft backdrop-blur">
        <h3 className="text-base font-semibold text-[#362F32]">Detalle de fuentes de emisión</h3>
        <p className="mt-1 text-sm text-[#5B6165]">Base de lectura para análisis por fuente, actividad y factor de emisión.</p>
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
    </div>
  );
}
