"use client"

import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { enrollmentGrowth } from "@/data/dashboard"

export default function EnrollmentChart() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 shadow-md shadow-slate-200/50 hover:shadow-lg transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-base font-bold text-slate-900">Learning Progress & Enrollments</h3>
        <span className="text-xs font-semibold text-[#4F46E5] bg-indigo-50 px-2.5 py-1 rounded-lg">This Month</span>
      </div>
      <ResponsiveContainer width="100%" height={260}>
        <AreaChart data={enrollmentGrowth} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="enrollGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#4F46E5" stopOpacity={0.25} />
              <stop offset="95%" stopColor="#4F46E5" stopOpacity={0.01} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
          <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#64748B" }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fontSize: 12, fill: "#64748B" }} axisLine={false} tickLine={false} />
          <Tooltip
            contentStyle={{
              borderRadius: "12px",
              border: "1px solid #E2E8F0",
              boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)",
              fontSize: "12px",
              fontWeight: 600,
            }}
          />
          <Area type="monotone" dataKey="enrollments" stroke="#4F46E5" strokeWidth={3} fill="url(#enrollGrad)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}
