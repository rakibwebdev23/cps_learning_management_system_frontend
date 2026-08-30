"use client"
import { useState } from "react"
import { Search, Loader2 } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import PageHeader from "@/components/common/PageHeader"
import { formatDate } from "@/lib/utils"
import { useGetQuizResultsQuery } from "@/redux/api/featuresApi/result/result.api"

export default function AdminResultsPage() {
  const [search, setSearch] = useState("")
  
  const { data: resultsData, isLoading } = useGetQuizResultsQuery()
  const resultsList = resultsData?.data || []

  const filtered = resultsList.filter((r: any) =>
    (r.quiz?.title || "").toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div>
      <PageHeader title="Quiz Results History" description="All quiz submission records across the platform." />
      <div className="mb-4">
        <Input placeholder="Search results..." value={search} onChange={(e) => setSearch(e.target.value)} className="max-w-sm" />
      </div>

      <div className="rounded-xl border bg-white dark:bg-slate-900 overflow-hidden">
        <div className="overflow-x-auto">
          {isLoading ? (
            <div className="flex justify-center p-12"><Loader2 className="w-8 h-8 animate-spin text-[#0075FD]" /></div>
          ) : (
            <table className="w-full text-sm">
              <thead className="bg-slate-50 dark:bg-slate-800">
                <tr>
                  {["Quiz Title", "Score", "Percentage", "Result", "Attempt", "Date"].map((h) => (
                    <th key={h} className="text-left px-4 py-3 text-xs font-medium text-slate-500 uppercase tracking-wider whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y">
                {filtered.map((r: any) => {
                  const passingScore = r.quiz?.passingScore || 50
                  const isPassed = (r.percentage || 0) >= passingScore
                  
                  return (
                    <tr key={r.id || r.documentId} className="hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                      <td className="px-4 py-3 font-medium text-slate-900 dark:text-white">{r.quiz?.title || "Unknown Quiz"}</td>
                      <td className="px-4 py-3 text-slate-600 dark:text-slate-400">{r.score || 0}/{r.total_questions || 10}</td>
                      <td className="px-4 py-3 font-bold text-slate-900 dark:text-white">{r.percentage || 0}%</td>
                      <td className="px-4 py-3">
                        <Badge className={isPassed ? "bg-emerald-100 text-emerald-700 border-0" : "bg-red-100 text-red-700 border-0"}>
                          {isPassed ? "Passed" : "Failed"}
                        </Badge>
                      </td>
                      <td className="px-4 py-3 text-slate-600 dark:text-slate-400">#{r.attempt_no || 1}</td>
                      <td className="px-4 py-3 text-slate-500 whitespace-nowrap">{formatDate(r.createdAt || new Date().toISOString())}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  )
}
