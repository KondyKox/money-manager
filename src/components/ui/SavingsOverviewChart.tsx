import {
  Line,
  LineChart,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { Profile } from "../../types/Profile";
import { buildSavingsChartData } from "../../utils/buildSavingsChartData";

const PROFILE_COLORS = ["#f97316", "#3b82f6", "#22c55e", "#ec4899"];

const SavingsOverviewChart = ({
  profiles,
  title,
}: {
  profiles: Profile[];
  title: string;
}) => {
  const data = buildSavingsChartData(profiles);

  if (data.length === 0) return <p className="italic">Brak danych</p>;

  return (
    <div className="w-full h-64 py-4">
      <h3 className="text-center font-semibold mb-2">{title}</h3>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <XAxis dataKey="date" tick={{ fontSize: 11 }} />
          <YAxis />
          <Tooltip content={<ChartTooltip />} />
          <Legend />
          {profiles.map((profile, i) => (
            <Line
              key={profile.id}
              type="monotone"
              dataKey={profile.name}
              stroke={PROFILE_COLORS[i % PROFILE_COLORS.length]}
              strokeWidth={2}
              dot={false}
            />
          ))}
        </LineChart>
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

  return (
    <div className="bg-white text-black rounded-lg px-3 py-2 shadow min-w-40">
      <p className="font-semibold border-b pb-1 mb-1">{label}</p>
      {payload.map((entry) => (
        <p key={entry.name} className="text-sm flex justify-between gap-4">
          <span style={{ color: entry.color }}>{entry.name}</span>
          <span>{entry.value.toFixed(2)}zł</span>
        </p>
      ))}
    </div>
  );
};

export default SavingsOverviewChart;
