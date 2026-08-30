"use client"
import { useState } from "react"
import { Search, Loader2 } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import PageHeader from "@/components/common/PageHeader"
import StatusBadge from "@/components/common/StatusBadge"
import { formatDate } from "@/lib/utils"
import { useGetEnrollmentsQuery } from "@/redux/api/featuresApi/enrollment/enrollment.api"

export default function AdminEnrollmentsPage() {
  const [search, setSearch] = useState("")

  const { data: enrollmentsData, isLoading } = useGetEnrollmentsQuery()
  const enrollmentsList = enrollmentsData?.data || []

  const filtered = enrollmentsList.filter((e: any) =>
    (e.student?.username || e.student?.name || "").toLowerCase().includes(search.toLowerCase()) ||
    (e.course?.title || "").toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div>
      <PageHeader title="Platform Enrollments" description="Track student enrollments across all courses." />
      <div className="mb-4">
        <Input placeholder="Search by student or course..." value={search} onChange={(e) => setSearch(e.target.value)} className="max-w-sm" />
      </div>

      <div className="rounded-xl border bg-white dark:bg-slate-900 overflow-hidden">
        <div className="overflow-x-auto">
          {isLoading ? (
            <div className="flex justify-center p-12"><Loader2 className="w-8 h-8 animate-spin text-[#0075FD]" /></div>
          ) : (
            <table className="w-full text-sm">
              <thead className="bg-slate-50 dark:bg-slate-800">
                <tr>
                  {["Student", "Course", "Instructor", "Progress", "Status", "Enrolled Date"].map((h) => (
                    <th key={h} className="text-left px-4 py-3 text-xs font-medium text-slate-500 uppercase tracking-wider whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y">
                {filtered.map((e: any) => (
                  <tr key={e.id || e.documentId} className="hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                    <td className="px-4 py-3">
                      <p className="font-medium text-slate-900 dark:text-white">{e.student?.username || e.student?.name}</p>
                      <p className="text-xs text-slate-500">{e.student?.email}</p>
                    </td>
                    <td className="px-4 py-3 text-slate-700 dark:text-slate-300 font-medium max-w-[200px] line-clamp-1">{e.course?.title}</td>
                    <td className="px-4 py-3 text-slate-600 dark:text-slate-400 whitespace-nowrap">{e.course?.instructor?.username || e.course?.instructor?.name || "Unknown"}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <Progress value={e.progress || 0} className="h-1.5 w-20" />
                        <span className="text-xs text-slate-500">{e.progress || 0}%</span>
                      </div>
                    </td>
                    <td className="px-4 py-3"><StatusBadge status={e.status || "active"} /></td>
                    <td className="px-4 py-3 text-slate-500 whitespace-nowrap">{formatDate(e.createdAt || new Date().toISOString())}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  )
}
