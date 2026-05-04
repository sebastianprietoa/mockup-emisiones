import { useState } from "react";
import { BarChart } from "../components/charts/BarChart";
import { ChartCard } from "../components/charts/ChartCard";
import { LineChart } from "../components/charts/LineChart";
import { FilterBar } from "../components/common/FilterBar";
import { PageTitle } from "../components/common/PageTitle";
import { KpiCard } from "../components/kpi/KpiCard";
import { scopeFilters } from "../config/filters";
import { buildEmissionsView } from "../data/dashboardDatabase";
import { buildInitialFilterValues } from "../utils/filterValues";
import { formatKwh, formatPercent, formatTons } from "../utils/formatters";

export function Scope2Page() {
  const [filters, setFilters] = useState(() => buildInitialFilterValues(scopeFilters));
  const view = buildEmissionsView(filters);

  return (
    <div className="space-y-6">
      <PageTitle
        eyebrow="Alcance 2"
        title="Electricidad consumida"
        description="Comparación entre location-based y market-based, con lectura de consumo eléctrico y factor promedio de emisión."
      />

      <FilterBar
        fields={scopeFilters}
        values={filters}
        onChange={(fieldId, value) => setFilters((current) => ({ ...current, [fieldId]: value }))}
      />

      <section className="grid gap-4 md:grid-cols-4">
        <KpiCard label="Consumo total kWh" value={formatKwh(view.scope2Kpis.totalKwh)} helper="Demanda eléctrica simulada." />
        <KpiCard label="tCO2e Alcance 2" value={formatTons(view.scope2Kpis.totalEmissions)} helper="Emisiones eléctricas totales." />
        <KpiCard
          label="Factor promedio"
          value={`${view.scope2Kpis.averageFactor.toFixed(3)} kgCO2e/kWh`}
          helper="Promedio consolidado."
        />
        <KpiCard
          label="% electricidad renovable"
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
          <p className="mt-3 text-sm leading-7 text-slate-300">{view.scope2Explanation}</p>
          <div className="mt-5 rounded-2xl border border-white/10 bg-white/5 p-4">
            <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Interpretación</p>
            <p className="mt-2 text-sm leading-7 text-slate-200">
              La diferencia entre ambos enfoques permite evidenciar el efecto de contratos y certificados de energía renovable en la huella reportada.
            </p>
          </div>
        </section>
      </section>
    </div>
  );
}
