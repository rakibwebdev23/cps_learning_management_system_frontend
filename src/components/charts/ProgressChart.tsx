"use client"

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { learningActivityData } from "@/data/dashboard"

export default function ProgressChart() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-md shadow-slate-200/50 hover:shadow-lg transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-base font-bold text-slate-900">Weekly Learning Activity</h3>
        <span className="text-xs font-semibold text-slate-500">Minutes Spent</span>
      </div>
      <ResponsiveContainer width="100%" height={260}>
        <BarChart data={learningActivityData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
          <XAxis dataKey="day" tick={{ fontSize: 12, fill: "#64748B" }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fontSize: 12, fill: "#64748B" }} axisLine={false} tickLine={false} />
          <Tooltip
            contentStyle={{
              borderRadius: "12px",
              border: "1px solid #E2E8F0",
              boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)",
              fontSize: "12px",
            }}
          />
          <Bar dataKey="minutes" fill="#F59E0B" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
