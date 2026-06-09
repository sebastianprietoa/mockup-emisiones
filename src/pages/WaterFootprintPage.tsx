import { ArrowUpRight, Droplets, Gauge, Target, TrendingDown } from "lucide-react";
import { BarChart } from "../components/charts/BarChart";
import { ChartCard } from "../components/charts/ChartCard";
import { DonutChart } from "../components/charts/DonutChart";
import { LineChart } from "../components/charts/LineChart";
import { FilterBar } from "../components/common/FilterBar";
import { PageTitle } from "../components/common/PageTitle";
import { KpiCard } from "../components/kpi/KpiCard";
import { waterFilters } from "../config/filters";
import { useDashboardFilters } from "../context/DashboardFiltersContext";
import { buildWaterView } from "../data/waterData";
import { formatCompact, formatNumber, formatPercent, formatSignedPercent } from "../utils/formatters";

export function WaterFootprintPage() {
  const { filters, setFilterValue } = useDashboardFilters();
  const view = buildWaterView(filters);

  return (
    <div className="space-y-6">
      <PageTitle
        eyebrow="Huella hídrica"
        title="Panel de Inteligencia Hídrica"
        description="Vista ejecutiva de consumo, presión por cuenca, carga contaminante y trazabilidad de agua azul, verde y gris."
      />

      <FilterBar
        title="Filtros hídricos"
        description="Lectura consolidada para huella de agua y estrés territorial."
        fields={waterFilters}
        values={filters}
        onChange={setFilterValue}
      />

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        <KpiCard label="Huella hídrica total" value={`${formatNumber(view.totalFootprint)} m³ eq`} helper="Inventario consolidado por organización." icon={<Droplets size={18} />} />
        <KpiCard label="Mayor componente" value={view.kpis.dominantComponent || "Sin datos"} helper="Componente dominante en la huella." icon={<ArrowUpRight size={18} />} />
        <KpiCard label="Variación interanual" value={formatSignedPercent(view.kpis.yearVariation)} helper="Reducción simulada respecto del año previo." trend={view.kpis.yearVariation <= 0 ? "baja" : "alza"} icon={<TrendingDown size={18} />} />
        <KpiCard label="Intensidad hídrica" value={`${formatNumber(view.kpis.intensity)} m³/M$`} helper="Indicador de eficiencia hídrica." icon={<Gauge size={18} />} />
        <KpiCard label="Avance de metas" value={formatPercent(view.kpis.goalProgress)} helper="Progreso visual frente a la meta interna." status={view.kpis.goalProgress >= 50 ? "bueno" : "medio"} icon={<Target size={18} />} />
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <ChartCard title="Huella por componente" description="Lectura ejecutiva del inventario hídrico consolidado.">
          <DonutChart data={view.componentShares} dataKey="value" nameKey="name" />
        </ChartCard>

        <div className="rounded-[28px] border border-[#D7CCC1] bg-[#FFF9F1] p-6 shadow-soft backdrop-blur">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#0BA4DE]">Mensaje ejecutivo</p>
          <div className="mt-4 space-y-4">
            <p className="text-lg font-medium leading-8 text-[#362F32]">
              El mayor potencial de gestión está en consumos de agua azul y en la carga contaminante que define la huella gris, especialmente en cuencas con estrés.
            </p>
            <p className="text-sm leading-7 text-[#5B6165]">
              La vista utiliza filtros por año, instalación y cuenca para actualizar el resumen ejecutivo, los componentes y la trazabilidad por proceso.
            </p>
          </div>
          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            <div className="rounded-2xl border border-[#D7CCC1] bg-[#EBE6DB] p-4">
              <p className="text-xs uppercase tracking-[0.18em] text-[#5B6165]">Lectura</p>
              <p className="mt-2 text-sm text-[#362F32]">Reporte listo para comité ejecutivo.</p>
            </div>
            <div className="rounded-2xl border border-[#D7CCC1] bg-[#EBE6DB] p-4">
              <p className="text-xs uppercase tracking-[0.18em] text-[#5B6165]">Enfoque</p>
              <p className="mt-2 text-sm text-[#362F32]">WFN / ISO 14046 como marco conceptual.</p>
            </div>
            <div className="rounded-2xl border border-[#D7CCC1] bg-[#EBE6DB] p-4">
              <p className="text-xs uppercase tracking-[0.18em] text-[#5B6165]">Riesgo</p>
              <p className="mt-2 text-sm text-[#362F32]">Cuenca y estrés hídrico como capa de decisión.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-2">
        <ChartCard title="Evolución anual" description="Tendencia consolidada por año.">
          <LineChart data={view.yearData.map((row) => ({ year: row.year, total: row.total }))} xKey="year" series={[{ key: "total", name: "m³ eq" }]} />
        </ChartCard>
        <ChartCard title="Consumo por instalación" description="Trazabilidad de consumo por centro operativo.">
          <BarChart data={view.installationData.map((item) => ({ installation: item.name, volume: item.value }))} xKey="installation" series={[{ key: "volume", name: "m³ eq" }]} layout="vertical" />
        </ChartCard>
        <ChartCard title="Cuenca con mayor presión" description="Distribución por cuenca hidrográfica.">
          <BarChart data={view.basinData.map((item) => ({ basin: item.name, volume: item.value }))} xKey="basin" series={[{ key: "volume", name: "m³ eq" }]} />
        </ChartCard>
        <ChartCard title="Trazabilidad por proceso" description="Procesos que explican la huella total.">
          <BarChart data={view.processData.map((item) => ({ process: item.name, volume: item.value }))} xKey="process" series={[{ key: "volume", name: "m³ eq" }]} layout="vertical" />
        </ChartCard>
      </section>

      <section className="rounded-[28px] border border-[#D7CCC1] bg-[#FFF9F1] p-5 shadow-soft backdrop-blur">
        <h3 className="text-base font-semibold text-[#362F32]">Lectura de calidad y estrés</h3>
        <p className="mt-1 text-sm text-[#5B6165]">Consolidado base para trazabilidad hídrica, calidad del efluente y riesgos por cuenca.</p>
        <div className="mt-4 grid gap-3 md:grid-cols-3">
          <div className="rounded-2xl border border-[#D7CCC1] bg-[#EBE6DB] p-4">
            <p className="text-xs uppercase tracking-[0.18em] text-[#5B6165]">Estrés alto</p>
            <p className="mt-2 text-2xl font-semibold text-[#362F32]">{formatCompact(view.kpis.stressHotspots)}</p>
          </div>
          <div className="rounded-2xl border border-[#D7CCC1] bg-[#EBE6DB] p-4">
            <p className="text-xs uppercase tracking-[0.18em] text-[#5B6165]">Calidad observada</p>
            <p className="mt-2 text-2xl font-semibold text-[#362F32]">{formatCompact(view.kpis.qualityIssues)}</p>
          </div>
          <div className="rounded-2xl border border-[#D7CCC1] bg-[#EBE6DB] p-4">
            <p className="text-xs uppercase tracking-[0.18em] text-[#5B6165]">Registros trazables</p>
            <p className="mt-2 text-2xl font-semibold text-[#362F32]">{formatCompact(view.rows.length)}</p>
          </div>
        </div>
      </section>
    </div>
  );
}
