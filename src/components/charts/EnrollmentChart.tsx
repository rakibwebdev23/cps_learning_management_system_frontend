"use client"

import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { enrollmentGrowth } from "@/data/dashboard"

export default function EnrollmentChart() {
  return (
    <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
      <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
        <h3 className="text-sm font-bold text-slate-900">Learning Progress & Hours</h3>
        <span className="text-xs font-semibold text-[#F59E0B] bg-amber-50 px-2.5 py-1 rounded-lg">This Month</span>
      </div>
      <ResponsiveContainer width="100%" height={240}>
        <AreaChart data={enrollmentGrowth} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="enrollGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#F59E0B" stopOpacity={0.01} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
          <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#64748B" }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fontSize: 11, fill: "#64748B" }} axisLine={false} tickLine={false} />
          <Tooltip
            contentStyle={{
              borderRadius: "12px",
              border: "1px solid #E2E8F0",
              boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)",
              fontSize: "12px",
              fontWeight: 600,
            }}
          />
          <Area type="monotone" dataKey="enrollments" stroke="#F59E0B" strokeWidth={3} fill="url(#enrollGrad)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}
