import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { chartPalette } from "../../config/theme";
import { formatNumber } from "../../utils/formatters";

type DonutChartProps = {
  data: Array<Record<string, string | number | null>>;
  dataKey: string;
  nameKey: string;
};

export function DonutChart({ data, dataKey, nameKey }: DonutChartProps) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={data}
          dataKey={dataKey}
          nameKey={nameKey}
          innerRadius={70}
          outerRadius={110}
          paddingAngle={3}
        >
          {data.map((entry, index) => (
            <Cell key={`${entry[nameKey]}-${index}`} fill={chartPalette[index % chartPalette.length]} />
          ))}
        </Pie>
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
      </PieChart>
    </ResponsiveContainer>
  );
}

