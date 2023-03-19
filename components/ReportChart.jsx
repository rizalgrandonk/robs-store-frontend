import { useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

function formatNumberPrice(value) {
  if (value > 999999) {
    return Math.sign(value) * (Math.abs(value) / 1000000).toFixed(1) + "jt";
  }
  if (value > 999) {
    return Math.sign(value) * (Math.abs(value) / 1000).toFixed(1) + "rb";
  }
  return Math.sign(value) * Math.abs(value);
}

export default function ReportChart({ reports }) {
  const [focusBar, setFocusBar] = useState("all");
  return (
    <div className="w-full h-full px-2 py-6 overflow-x-auto">
      <BarChart
        width={700}
        height={300}
        data={reports}
        barSize={40}
        margin={{ top: 0, left: 0, right: 0, bottom: 0 }}
        onMouseMove={(state) => {
          console.log(state);
          if (state && state.activeLabel) {
            return setFocusBar(state.activeLabel);
          }
        }}
        onMouseLeave={() => setFocusBar("all")}
      >
        <XAxis
          axisLine={false}
          tickLine={false}
          dataKey="period"
          tickFormatter={(value) => value.slice(0, 3)}
          interval={0}
        />
        <YAxis
          axisLine={false}
          tickLine={false}
          tickFormatter={(value) => formatNumberPrice(value)}
        />
        <Tooltip
          formatter={(value, name, props) => [
            `Rp ${value.toLocaleString("ID-id")}`,
            "Total",
          ]}
          offset={0}
          cursor={{ fill: "transparent" }}
        />
        <Bar dataKey="total_sales" fill="#C4B815" radius={5}>
          {reports.map((entry, index) => (
            <Cell
              key={index}
              fill={
                focusBar === entry.period || focusBar === "all"
                  ? "#C4B815"
                  : "rgba(0, 0, 0, 0.15)"
              }
            />
          ))}
        </Bar>
      </BarChart>
    </div>
  );
}
