import {
  Bar,
  CartesianGrid,
  ComposedChart,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { chartPalette } from "../../config/theme";
import { formatNumber } from "../../utils/formatters";

type Series = {
  key: string;
  name: string;
  color?: string;
};

type BarChartProps = {
  data: Array<Record<string, string | number | null>>;
  xKey: string;
  series: Series[];
  layout?: "horizontal" | "vertical";
};

export function BarChart({ data, xKey, series, layout = "horizontal" }: BarChartProps) {
  const isVertical = layout === "vertical";

  return (
    <ResponsiveContainer width="100%" height="100%">
      <ComposedChart
        data={data}
        layout={layout}
        margin={{ top: 8, right: 12, left: isVertical ? 24 : 0, bottom: 8 }}
      >
        <CartesianGrid stroke="rgba(148,163,184,0.15)" vertical={false} />
        <XAxis
          type={isVertical ? "number" : "category"}
          dataKey={isVertical ? undefined : xKey}
          tick={{ fill: "#94a3b8", fontSize: 12 }}
          axisLine={{ stroke: "rgba(148,163,184,0.2)" }}
          tickLine={false}
        />
        <YAxis
          type={isVertical ? "category" : "number"}
          dataKey={isVertical ? xKey : undefined}
          tick={{ fill: "#94a3b8", fontSize: 12 }}
          axisLine={{ stroke: "rgba(148,163,184,0.2)" }}
          tickLine={false}
          width={isVertical ? 120 : 40}
        />
        <Tooltip
          contentStyle={{
            background: "rgba(15, 23, 42, 0.96)",
            border: "1px solid rgba(255,255,255,0.12)",
            borderRadius: 16,
            color: "#e2e8f0",
          }}
          formatter={(value: number) => formatNumber(value)}
        />
        <Legend />
        {series.map((item, index) => (
          <Bar
            key={item.key}
            dataKey={item.key}
            name={item.name}
            fill={item.color ?? chartPalette[index % chartPalette.length]}
            radius={[10, 10, 0, 0]}
            barSize={isVertical ? 16 : 24}
          />
        ))}
      </ComposedChart>
    </ResponsiveContainer>
  );
}

