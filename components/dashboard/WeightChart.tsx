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
import { WeightRecord } from "@/types/weight";
import EmptyState from "./EmptyState";

type WeightChartProps = {
  items: WeightRecord[];
};

export default function WeightChart({ items }: WeightChartProps) {
  const chartData = [...items]
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .map((item) => ({
      date: item.date.slice(5),
      weightKg: item.weightKg,
      fullDate: item.date,
    }));

  return (
    <section className="h-full rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">체중 변화 차트</h2>
        <span className="text-sm text-gray-500">날짜별 추이</span>
      </div>

      {chartData.length === 0 ? (
        <div className="mt-6">
          <EmptyState
            title="표시할 체중 기록이 없어요"
            description="체중 기록을 추가하면 날짜별 변화 추이를 차트로 확인할 수 있어요."
            caption="첫 기록을 저장해보세요."
            minHeight="min-h-[300px] sm:min-h-[360px] lg:min-h-[420px]"
          />
        </div>
      ) : (
        <div className="mt-6 h-[300px] rounded-xl border border-gray-100 bg-gray-50 p-4 sm:h-[360px] lg:h-[420px]">
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
                dataKey="weightKg"
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
