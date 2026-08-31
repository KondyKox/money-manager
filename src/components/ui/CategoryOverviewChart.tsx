import {
  Bar,
  BarChart,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { Profile } from "../../types/Profile";
import { buildCategoryChartData } from "../../utils/buildCategoryChartData";

const PROFILE_COLORS = ["#f97316", "#3b82f6", "#22c55e", "#ec4899"];

const CategoryOverviewChart = ({
  profiles,
  kind,
  title,
  selectedMonth,
}: {
  profiles: Profile[];
  kind: "expenses" | "incomes";
  title: string;
  selectedMonth: string;
}) => {
  const data = buildCategoryChartData(profiles, kind, selectedMonth);

  if (data.length === 0) return <p className="italic">Brak danych</p>;

  return (
    <div className="w-full h-64">
      <h3 className="text-center font-semibold mb-2">{title}</h3>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <XAxis
            dataKey="category"
            interval={0}
            angle={-15}
            textAnchor="end"
            tick={{ fontSize: 11 }}
          />
          <YAxis />
          <Tooltip content={<ChartTooltip />} />
          <Legend />
          {profiles.map((profile, i) => (
            <Bar
              key={profile.id}
              dataKey={profile.name}
              stackId="a"
              fill={PROFILE_COLORS[i % PROFILE_COLORS.length]}
            />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

const ChartTooltip = ({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: { value: number; name: string; color: string }[];
  label?: string;
}) => {
  if (!active || !payload || payload.length === 0) return null;

  const total = payload.reduce((sum, entry) => sum + (entry.value ?? 0), 0);

  return (
    <div className="bg-white text-black rounded-lg px-3 py-2 shadow min-w-40">
      <p className="font-semibold border-b pb-1 mb-1">
        {label}: {total.toFixed(2)}zł
      </p>
      {payload.map((entry) => (
        <p key={entry.name} className="text-sm flex justify-between gap-4">
          <span style={{ color: entry.color }}>{entry.name}</span>
          <span>{entry.value.toFixed(2)}zł</span>
        </p>
      ))}
    </div>
  );
};

export default CategoryOverviewChart;
