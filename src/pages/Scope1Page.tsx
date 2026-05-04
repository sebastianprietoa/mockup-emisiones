import { BarChart } from "../components/charts/BarChart";
import { ChartCard } from "../components/charts/ChartCard";
import { LineChart } from "../components/charts/LineChart";
import { FilterBar } from "../components/common/FilterBar";
import { PageTitle } from "../components/common/PageTitle";
import { KpiCard } from "../components/kpi/KpiCard";
import { EmissionsTable } from "../components/tables/EmissionsTable";
import { useDashboardFilters } from "../context/DashboardFiltersContext";
import { scopeFilters } from "../config/filters";
import { buildEmissionsView } from "../data/dashboardDatabase";
import { formatSignedPercent, formatTons } from "../utils/formatters";

export function Scope1Page() {
  const { filters, setFilterValue } = useDashboardFilters();
  const view = buildEmissionsView(filters);

  return (
    <div className="space-y-6">
      <PageTitle
        eyebrow="Alcance 1"
        title="Emisiones directas"
        description="Fuentes bajo control operativo directo, con foco en combustión fija, combustión móvil y fugas de refrigerantes."
      />

      <FilterBar
        fields={scopeFilters}
        values={filters}
        onChange={setFilterValue}
      />

      <section className="grid gap-4 md:grid-cols-4">
        <KpiCard
          label="tCO2e Alcance 1"
          value={formatTons(view.scope1Kpis.totalEmissions)}
          helper="Emisiones directas consolidadas."
        />
        <KpiCard
          label="Combustible más relevante"
          value={view.scope1Kpis.mainFuel}
          helper="Fuente predominante en el alcance."
        />
        <KpiCard
          label="Instalación más emisora"
          value={view.scope1Kpis.topInstallation}
          helper="Mayor contribución operacional."
        />
        <KpiCard
          label="Variación mensual"
          value={formatSignedPercent(view.scope1Kpis.monthlyVariation)}
          helper="Cambio respecto del periodo previo."
          trend={view.scope1Kpis.monthlyVariation < 0 ? "baja" : "alza"}
        />
      </section>

      <section className="grid gap-6 xl:grid-cols-2">
        <ChartCard title="Emisiones por tipo de combustible" description="Lectura de combustión fija y móvil.">
          <BarChart data={view.scope1FuelData} xKey="fuel" series={[{ key: "emissions", name: "tCO2e" }]} />
        </ChartCard>
        <ChartCard title="Emisiones por instalación" description="Contribución relativa por sitio operacional.">
          <BarChart data={view.scope1SiteData} xKey="site" series={[{ key: "emissions", name: "tCO2e" }]} />
        </ChartCard>
        <ChartCard title="Evolución mensual" description="Comportamiento mensual del alcance.">
          <LineChart data={view.scope1MonthlyData} xKey="month" series={[{ key: "emissions", name: "tCO2e" }]} />
        </ChartCard>

        <section className="rounded-3xl border border-white/10 bg-slate-900/70 p-5 shadow-soft backdrop-blur">
          <h3 className="text-base font-semibold text-white">Tabla detallada</h3>
          <p className="mt-1 text-sm text-slate-400">
            Vista de datos simulados para la trazabilidad de fuentes directas.
          </p>
          <div className="mt-4">
            <EmissionsTable
              rows={view.scope1TableRows}
              columns={[
                { key: "source", label: "Fuente" },
                { key: "category", label: "Categoría" },
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
