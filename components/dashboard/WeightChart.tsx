"use client";

import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useWeightStore } from "@/store/weightStore";
import EmptyState from "./EmptyState";

export default function WeightChart() {
  const weights = useWeightStore((state) => state.weights);

  const chartData = [...weights]
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .map((item) => ({
      date: item.date.slice(5),
      weight: item.weight,
      fullDate: item.date,
    }));

  return (
    <section className="h-full rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">체중 변화 차트</h2>
        <span className="text-sm text-gray-500">날짜별 추이</span>
      </div>

      {chartData.length === 0 ? (
        <div className="mt-6">
          <EmptyState
            message="아직 표시할 체중 기록이 없어요."
            minHeight="min-h-[420px]"
          />
        </div>
      ) : (
        <div className="mt-6 h-[420px] rounded-xl border border-gray-100 bg-gray-50 p-4">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" tickLine={false} axisLine={false} />
              <YAxis
                domain={["dataMin - 1", "dataMax + 1"]}
                tickLine={false}
                axisLine={false}
              />
              <Tooltip
                formatter={(value) => {
                  if (typeof value !== "number") {
                    return [String(value), "체중"];
                  }
                  return [`${value.toFixed(1)}kg`, "체중"];
                }}
                labelFormatter={(label, payload) => {
                  if (!payload || payload.length === 0) return label;
                  return payload[0].payload.fullDate;
                }}
              />
              <Line
                type="monotone"
                dataKey="weight"
                stroke="#111827"
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </section>
  );
}
