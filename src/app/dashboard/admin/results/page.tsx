"use client"
import { useState } from "react"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import PageHeader from "@/components/common/PageHeader"
import { results } from "@/data/results"
import { formatDate } from "@/lib/utils"

export default function AdminResultsPage() {
  const [search, setSearch] = useState("")
  const filtered = results.filter((r) =>
    r.quizTitle.toLowerCase().includes(search.toLowerCase()) ||
    r.studentId.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div>
      <PageHeader title="Quiz Results History" description="All quiz submission records across the platform." />
      <div className="mb-4">
        <Input placeholder="Search results..." value={search} onChange={(e) => setSearch(e.target.value)} className="max-w-sm" />
      </div>

      <div className="rounded-xl border bg-white dark:bg-slate-900 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 dark:bg-slate-800">
              <tr>
                {["Quiz Title", "Score", "Percentage", "Result", "Attempt", "Date"].map((h) => (
                  <th key={h} className="text-left px-4 py-3 text-xs font-medium text-slate-500 uppercase tracking-wider whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y">
              {filtered.map((r) => (
                <tr key={r.id} className="hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                  <td className="px-4 py-3 font-medium text-slate-900 dark:text-white">{r.quizTitle}</td>
                  <td className="px-4 py-3 text-slate-600 dark:text-slate-400">{r.score}/{r.totalMarks}</td>
                  <td className="px-4 py-3 font-bold text-slate-900 dark:text-white">{r.percentage}%</td>
                  <td className="px-4 py-3">
                    <Badge className={r.passed ? "bg-emerald-100 text-emerald-700 border-0" : "bg-red-100 text-red-700 border-0"}>
                      {r.passed ? "Passed" : "Failed"}
                    </Badge>
                  </td>
                  <td className="px-4 py-3 text-slate-600 dark:text-slate-400">#{r.attemptNumber}</td>
                  <td className="px-4 py-3 text-slate-500 whitespace-nowrap">{formatDate(r.submittedAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
