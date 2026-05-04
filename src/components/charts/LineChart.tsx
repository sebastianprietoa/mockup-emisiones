import {
  CartesianGrid,
  Line,
  LineChart as RechartsLineChart,
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

type LineChartProps = {
  data: Array<Record<string, string | number | null>>;
  xKey: string;
  series: Series[];
};

export function LineChart({ data, xKey, series }: LineChartProps) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <RechartsLineChart data={data} margin={{ top: 8, right: 12, left: 0, bottom: 8 }}>
        <CartesianGrid stroke="rgba(148,163,184,0.15)" vertical={false} />
        <XAxis
          dataKey={xKey}
          tick={{ fill: "#94a3b8", fontSize: 12 }}
          axisLine={{ stroke: "rgba(148,163,184,0.2)" }}
          tickLine={false}
        />
        <YAxis
          tick={{ fill: "#94a3b8", fontSize: 12 }}
          axisLine={{ stroke: "rgba(148,163,184,0.2)" }}
          tickLine={false}
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
        {series.map((item, index) => (
          <Line
            key={item.key}
            type="monotone"
            dataKey={item.key}
            name={item.name}
            stroke={item.color ?? chartPalette[index % chartPalette.length]}
            strokeWidth={2.5}
            dot={{ r: 3.5, fill: item.color ?? chartPalette[index % chartPalette.length] }}
            activeDot={{ r: 5 }}
          />
        ))}
      </RechartsLineChart>
    </ResponsiveContainer>
  );
}

