"use client"

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts"
import { userDistributionData } from "@/data/dashboard"

export default function UserDistributionChart() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-md shadow-slate-200/50 hover:shadow-lg transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-base font-bold text-slate-900">User Role Distribution</h3>
        <span className="text-xs font-semibold text-slate-500">Platform Users</span>
      </div>
      <ResponsiveContainer width="100%" height={260}>
        <PieChart>
          <Pie data={userDistributionData} cx="50%" cy="50%" outerRadius={95} paddingAngle={3} dataKey="value">
            {userDistributionData.map((entry, index) => (
              <Cell key={index} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              borderRadius: "12px",
              border: "1px solid #E2E8F0",
              boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)",
              fontSize: "12px",
            }}
          />
          <Legend iconType="circle" iconSize={10} wrapperStyle={{ fontSize: "12px", paddingTop: "5px" }} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}
