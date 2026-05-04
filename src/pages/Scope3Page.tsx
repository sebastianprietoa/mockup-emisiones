import { useState } from "react";
import { BarChart } from "../components/charts/BarChart";
import { ChartCard } from "../components/charts/ChartCard";
import { DonutChart } from "../components/charts/DonutChart";
import { FilterBar } from "../components/common/FilterBar";
import { PageTitle } from "../components/common/PageTitle";
import { KpiCard } from "../components/kpi/KpiCard";
import { EmissionsTable } from "../components/tables/EmissionsTable";
import { scopeFilters } from "../config/filters";
import { buildEmissionsView } from "../data/dashboardDatabase";
import { buildInitialFilterValues } from "../utils/filterValues";
import { formatPercent, formatTons } from "../utils/formatters";

export function Scope3Page() {
  const [filters, setFilters] = useState(() => buildInitialFilterValues(scopeFilters));
  const view = buildEmissionsView(filters);

  return (
    <div className="space-y-6">
      <PageTitle
        eyebrow="Alcance 3"
        title="Cadena de valor"
        description="Emisiones indirectas fuera del control operacional directo, organizadas por categorías GHG Protocol sugeridas."
      />

      <FilterBar
        fields={scopeFilters}
        values={filters}
        onChange={(fieldId, value) => setFilters((current) => ({ ...current, [fieldId]: value }))}
      />

      <section className="grid gap-4 md:grid-cols-4">
        <KpiCard label="tCO2e Alcance 3" value={formatTons(view.scope3Kpis.totalEmissions)} helper="Inventario de cadena de valor." />
        <KpiCard label="Categoría más relevante" value={view.scope3Kpis.topCategory} helper="Principal foco de mitigación." />
        <KpiCard
          label="% del total corporativo"
          value={formatPercent(view.scope3Kpis.totalShare)}
          helper="Participación en el inventario."
        />
        <KpiCard
          label="Categorías reportadas"
          value={`${view.scope3Kpis.reportedCategories}`}
          helper="Cobertura del análisis Scope 3."
        />
      </section>

      <section className="grid gap-6 xl:grid-cols-2">
        <ChartCard title="Emisiones por categoría" description="Distribución de las categorías del alcance 3.">
          <BarChart data={view.scope3CategoryData} xKey="category" series={[{ key: "emissions", name: "tCO2e" }]} />
        </ChartCard>
        <ChartCard title="Distribución porcentual" description="Vista donut del peso relativo por categoría.">
          <DonutChart data={view.scope3ShareData} dataKey="value" nameKey="name" />
        </ChartCard>
        <ChartCard title="Top 10 fuentes de emisión" description="Fuentes con mayor contribución individual.">
          <BarChart
            data={view.scope3TopSourceData}
            xKey="source"
            series={[{ key: "emissions", name: "tCO2e" }]}
            layout="vertical"
          />
        </ChartCard>
        <section className="rounded-3xl border border-white/10 bg-slate-900/70 p-5 shadow-soft backdrop-blur">
          <h3 className="text-base font-semibold text-white">Tabla por categoría</h3>
          <p className="mt-1 text-sm text-slate-400">
            Consolidado base para revisión de materialidad y priorización de proveedores.
          </p>
          <div className="mt-4">
            <EmissionsTable
              rows={view.scope3TableRows}
              columns={[
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
