"use client"
import { useState } from "react"
import { Search, Trash2 } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import PageHeader from "@/components/common/PageHeader"
import ConfirmDialog from "@/components/common/ConfirmDialog"
import { quizzes } from "@/data/quizzes"

export default function AdminQuizzesPage() {
  const [search, setSearch] = useState("")
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const filtered = quizzes.filter((q) => q.title.toLowerCase().includes(search.toLowerCase()))

  return (
    <div>
      <PageHeader title="Platform Quizzes" description="Overview of all active quizzes." />
      <div className="mb-4">
        <Input placeholder="Search quizzes..." value={search} onChange={(e) => setSearch(e.target.value)} className="max-w-sm" />
      </div>

      <div className="rounded-xl border bg-white dark:bg-slate-900 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 dark:bg-slate-800">
              <tr>
                {["Quiz Title", "Time Limit", "Total Marks", "Pass Score", "Actions"].map((h) => (
                  <th key={h} className="text-left px-4 py-3 text-xs font-medium text-slate-500 uppercase tracking-wider whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y">
              {filtered.map((q) => (
                <tr key={q.id} className="hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                  <td className="px-4 py-3 font-medium text-slate-900 dark:text-white">{q.title}</td>
                  <td className="px-4 py-3 text-slate-600 dark:text-slate-400">{q.timeLimitMinutes}m</td>
                  <td className="px-4 py-3 text-slate-600 dark:text-slate-400">{q.totalMarks}</td>
                  <td className="px-4 py-3 text-slate-600 dark:text-slate-400">{q.passingScore}%</td>
                  <td className="px-4 py-3">
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500 hover:text-red-700" onClick={() => setDeleteId(q.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <ConfirmDialog open={!!deleteId} onClose={() => setDeleteId(null)} onConfirm={() => setDeleteId(null)} title="Delete Quiz?" description="Are you sure you want to delete this quiz?" />
    </div>
  )
}
