import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function compact(amount) {
  if (amount >= 1000000) return (amount / 1000000).toFixed(1) + "M";
  if (amount >= 1000) return (amount / 1000).toFixed(1) + "k";
  return String(amount);
}

function dayLabel(date) {
  return new Date(date + "T00:00:00").toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
  });
}

export default function SalesChart({ days }) {
  const data = days.map((day) => ({
    label: dayLabel(day.date),
    total: day.total,
  }));

  const weekTotal = days.reduce((sum, day) => sum + day.total, 0);

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-lg font-bold text-slate-900">Sales (Last 7 Days)</h2>

      <p className="mt-1 text-sm text-slate-500">
        Total: PKR {weekTotal.toLocaleString("en-PK")}
      </p>

      <div className="mt-6 h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 5, right: 10, left: 0, bottom: 0 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#e2e8f0"
            />

            <XAxis
              dataKey="label"
              tick={{ fontSize: 12, fill: "#64748b" }}
              axisLine={false}
              tickLine={false}
            />

            <YAxis
              tickFormatter={compact}
              tick={{ fontSize: 12, fill: "#64748b" }}
              axisLine={false}
              tickLine={false}
              width={45}
            />

            <Tooltip
              cursor={{ fill: "#f1f5f9" }}
              formatter={(value) => [
                `PKR ${Number(value).toLocaleString("en-PK")}`,
                "Sales",
              ]}
            />

            <Bar dataKey="total" fill="#047857" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
