import { BarChart } from "../components/charts/BarChart";
import { ChartCard } from "../components/charts/ChartCard";
import { LineChart } from "../components/charts/LineChart";
import { FilterBar } from "../components/common/FilterBar";
import { PageTitle } from "../components/common/PageTitle";
import { KpiCard } from "../components/kpi/KpiCard";
import { useDashboardFilters } from "../context/DashboardFiltersContext";
import { scopeFilters } from "../config/filters";
import { buildEmissionsView } from "../data/dashboardDatabase";
import { formatKwh, formatPercent, formatTons } from "../utils/formatters";

export function Scope2Page() {
  const { filters, setFilterValue } = useDashboardFilters();
  const view = buildEmissionsView(filters);

  return (
    <div className="space-y-6">
      <PageTitle
        eyebrow="Alcance 2"
        title="Huella eléctrica"
        description="Comparación entre location-based y market-based, con lectura de consumo eléctrico y factor promedio de emisión."
      />

      <FilterBar fields={scopeFilters} values={filters} onChange={setFilterValue} title="Filtros de Alcance 2" />

      <section className="grid gap-4 md:grid-cols-4">
        <KpiCard label="Consumo total" value={formatKwh(view.scope2Kpis.totalKwh)} helper="Demanda eléctrica simulada." />
        <KpiCard label="tCO2e Alcance 2" value={formatTons(view.scope2Kpis.totalEmissions)} helper="Emisiones eléctricas totales." />
        <KpiCard
          label="Factor promedio"
          value={`${view.scope2Kpis.averageFactor.toFixed(3)} kgCO2e/kWh`}
          helper="Promedio consolidado."
        />
        <KpiCard
          label="% renovable"
          value={formatPercent(view.scope2Kpis.renewableShare)}
          helper="Cobertura renovable simulada."
          status="bueno"
        />
      </section>

      <section className="grid gap-6 xl:grid-cols-2">
        <ChartCard title="Consumo eléctrico mensual" description="Serie de demanda en kWh.">
          <LineChart data={view.scope2MonthlyEnergyData} xKey="month" series={[{ key: "kwh", name: "kWh" }]} />
        </ChartCard>
        <ChartCard title="Emisiones por instalación" description="Contribución de cada instalación al alcance 2.">
          <BarChart data={view.scope2InstallationData} xKey="site" series={[{ key: "emissions", name: "tCO2e" }]} />
        </ChartCard>
        <ChartCard title="Location-based vs market-based" description="Lectura comparativa de métodos de cálculo.">
          <BarChart
            data={view.scope2ComparisonData}
            xKey="month"
            series={[
              { key: "location", name: "Location-based" },
              { key: "market", name: "Market-based" },
            ]}
          />
        </ChartCard>
        <section className="rounded-3xl border border-white/10 bg-slate-900/70 p-5 shadow-soft backdrop-blur">
          <h3 className="text-base font-semibold text-white">Lectura metodológica</h3>
          <div className="mt-3 space-y-4 text-sm leading-7 text-slate-300">
            <p>
              Location-based refleja el promedio de la red eléctrica donde opera la instalación. Market-based incorpora contratos, certificados o instrumentos renovables y permite ver el efecto de la compra de energía.
            </p>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Interpretación</p>
              <p className="mt-2 text-sm leading-7 text-slate-200">
                La diferencia entre ambos enfoques muestra cuánto puede reducirse la huella reportada sin cambiar la operación física, solo modificando el origen contractual de la electricidad.
              </p>
            </div>
          </div>
        </section>
      </section>
    </div>
  );
}

