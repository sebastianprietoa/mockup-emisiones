import { BarChart } from "../components/charts/BarChart";
import { ChartCard } from "../components/charts/ChartCard";
import { DonutChart } from "../components/charts/DonutChart";
import { LineChart } from "../components/charts/LineChart";
import { FilterBar } from "../components/common/FilterBar";
import { SectionCard } from "../components/common/SectionCard";
import { PageTitle } from "../components/common/PageTitle";
import { KpiCard } from "../components/kpi/KpiCard";
import { EmissionsTable } from "../components/tables/EmissionsTable";
import { useDashboardFilters } from "../context/DashboardFiltersContext";
import { scopeFilters } from "../config/filters";
import { buildEmissionsView } from "../data/dashboardDatabase";
import { formatPercent, formatTons } from "../utils/formatters";

export function Scope3Page() {
  const { filters, setFilterValue } = useDashboardFilters();
  const view = buildEmissionsView(filters);

  return (
    <div className="space-y-6">
      <PageTitle
        eyebrow="Alcance 3"
        title="Cadena de valor"
        description="Emisiones indirectas asociadas a residuos sólidos y a la operación turística, leídas por unidad de negocio e instalación para hacer visible el origen del inventario."
      />

      <FilterBar fields={scopeFilters} values={filters} onChange={setFilterValue} />

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        <KpiCard
          label="tCO2e Alcance 3"
          value={formatTons(view.scope3Kpis.totalEmissions)}
          helper="Inventario de cadena de valor."
        />
        <KpiCard
          label="Unidad más emisora"
          value={view.scope3Kpis.topBusinessUnit}
          helper="Unidad de negocio con mayor peso."
        />
        <KpiCard
          label="Instalación más emisora"
          value={view.scope3Kpis.topInstallation}
          helper="Principal contribución individual."
        />
        <KpiCard
          label="Mes pico"
          value={view.scope3Kpis.peakMonth}
          helper="Mes con mayor acumulación."
        />
        <KpiCard
          label="Instalaciones reportadas"
          value={`${view.scope3Kpis.reportedInstallations}`}
          helper="Cobertura del inventario Scope 3."
        />
      </section>

      <section className="grid gap-6 xl:grid-cols-2">
        <ChartCard title="Emisiones por unidad de negocio" description="Agrupación principal para leer el origen del alcance 3.">
          <DonutChart data={view.scope3ShareData} dataKey="value" nameKey="name" />
        </ChartCard>

        <ChartCard title="Top instalaciones" description="Sitios con mayor contribución anual dentro del alcance 3.">
          <BarChart
            data={view.scope3TopInstallationData}
            xKey="installation"
            series={[{ key: "emissions", name: "tCO2e" }]}
            layout="vertical"
          />
        </ChartCard>

        <ChartCard title="Evolución mensual" description="Distribución temporal del inventario anual.">
          <LineChart data={view.scope3MonthlyData} xKey="month" series={[{ key: "emissions", name: "tCO2e" }]} />
        </ChartCard>

        <SectionCard
          title="Lectura metodológica"
          description="El alcance 3 del inventario 2018 se concentra en la disposición final de residuos sólidos, por lo que la lectura más útil no es por categoría GHG amplia sino por unidad de negocio e instalación."
        >
          <div className="space-y-4 text-sm leading-7 text-slate-300">
            <p>
              Esta vista prioriza una lectura ejecutiva: dónde se origina la carga, qué unidad de negocio la empuja y cómo se distribuye a lo largo del año turístico.
            </p>
            <div className="grid gap-3 sm:grid-cols-3">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Fuente base</p>
                <p className="mt-2 text-sm text-slate-200">{view.scope3Kpis.annualSource}</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Variación mensual</p>
                <p className="mt-2 text-sm text-slate-200">{formatPercent(view.scope3Kpis.monthlyVariation)}</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Participación corporativa</p>
                <p className="mt-2 text-sm text-slate-200">{formatPercent(view.scope3Kpis.totalShare)}</p>
              </div>
            </div>
          </div>
        </SectionCard>
      </section>

      <section className="rounded-3xl border border-white/10 bg-slate-900/70 p-5 shadow-soft backdrop-blur">
        <h3 className="text-base font-semibold text-white">Tabla de detalle por instalación</h3>
        <p className="mt-1 text-sm text-slate-400">
          Consolidado anual para revisar la contribución de cada instalación dentro del alcance 3.
        </p>
        <div className="mt-4">
          <EmissionsTable
            rows={view.scope3TableRows}
            columns={[
              { key: "installation", label: "Instalación" },
              { key: "businessUnit", label: "Unidad de negocio" },
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
