"use client"
import Link from "next/link"
import { useState } from "react"
import { Search, Eye, Loader2 } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import PageHeader from "@/components/common/PageHeader"
import StatusBadge from "@/components/common/StatusBadge"
import { getInitials } from "@/lib/utils"
import { useGetEnrollmentsQuery } from "@/redux/api/featuresApi/enrollment/enrollment.api"
import { useGetMeQuery } from "@/redux/api/featuresApi/auth/authApi"

export default function InstructorStudentsPage() {
  const [search, setSearch] = useState("")
  
  const { data: meData } = useGetMeQuery()
  const me = meData

  const { data: enrollmentsData, isLoading } = useGetEnrollmentsQuery()
  const apiEnrollments = enrollmentsData?.data || []

  // ideally, backend should filter by instructor, but for now we'll do it if there's no instructorid filter in api
  const myEnrollments = apiEnrollments.map((e: any) => ({
    id: String(e.documentId || e.id),
    studentId: e.student?.documentId || "1",
    studentName: e.studentName || "Student",
    studentEmail: e.studentEmail || "student@example.com",
    studentAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&auto=format&fit=crop&q=80",
    courseTitle: e.courseTitle || "Course Title",
    progress: e.progress || 0,
    completedLessons: e.completedLessons || 0,
    totalLessons: e.totalLessons || 10,
    quizAverage: 80,
    status: e.status || "active",
  }))

  const filtered = myEnrollments.filter((e) =>
    e.studentName.toLowerCase().includes(search.toLowerCase()) ||
    e.studentEmail.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div>
      <PageHeader title="My Students" description="Track student progress across your courses." />
      <div className="mb-4">
        <div className="relative max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input placeholder="Search students..." className="pl-9" value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
      </div>

      <div className="rounded-xl border bg-white dark:bg-slate-900 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 dark:bg-slate-800">
              <tr>
                {["Student", "Course", "Progress", "Lessons", "Quiz Avg", "Status", "Actions"].map((h) => (
                  <th key={h} className="text-left px-4 py-3 text-xs font-medium text-slate-500 uppercase tracking-wider whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y">
              {isLoading ? (
                <tr><td colSpan={7} className="px-4 py-8 text-center"><Loader2 className="h-6 w-6 animate-spin text-[#0075FD] mx-auto" /></td></tr>
              ) : filtered.length > 0 ? (
                filtered.map((e) => (
                  <tr key={e.id} className="hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={e.studentAvatar} />
                          <AvatarFallback className="text-xs bg-blue-100 text-amber-700">{getInitials(e.studentName)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium text-slate-900 dark:text-white">{e.studentName}</p>
                          <p className="text-xs text-slate-500">{e.studentEmail}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <p className="text-slate-700 dark:text-slate-300 max-w-[200px] line-clamp-1">{e.courseTitle}</p>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <Progress value={e.progress} className="h-1.5 w-20" />
                        <span className="text-xs text-slate-500">{e.progress}%</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-slate-600 dark:text-slate-400">{e.completedLessons}/{e.totalLessons}</td>
                    <td className="px-4 py-3 text-slate-600 dark:text-slate-400">{e.quizAverage ? `${e.quizAverage}%` : "—"}</td>
                    <td className="px-4 py-3"><StatusBadge status={e.status as any} /></td>
                    <td className="px-4 py-3">
                      <Button variant="ghost" size="sm" asChild>
                        <Link href={`/dashboard/instructor/students/${e.studentId}`}><Eye className="h-4 w-4" /></Link>
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr><td colSpan={7} className="px-4 py-8 text-center text-sm text-slate-400">No students found.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
