"use client"
import Link from "next/link"
import { useState } from "react"
import { Search, Eye } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import PageHeader from "@/components/common/PageHeader"
import StatusBadge from "@/components/common/StatusBadge"
import { enrollments } from "@/data/enrollments"
import { getInitials } from "@/lib/utils"

const INSTRUCTOR_ID = "u3"

export default function InstructorStudentsPage() {
  const [search, setSearch] = useState("")
  const myEnrollments = enrollments.filter((e) => e.instructorName === "Dr. James Thornton")
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
              {filtered.map((e) => (
                <tr key={e.id} className="hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={e.studentAvatar} />
                        <AvatarFallback className="text-xs bg-amber-100 text-amber-700">{getInitials(e.studentName)}</AvatarFallback>
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
                  <td className="px-4 py-3"><StatusBadge status={e.status} /></td>
                  <td className="px-4 py-3">
                    <Button variant="ghost" size="sm" asChild>
                      <Link href={`/dashboard/instructor/students/${e.studentId}`}><Eye className="h-4 w-4" /></Link>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && <div className="text-center py-10 text-sm text-slate-400">No students found.</div>}
        </div>
      </div>
    </div>
  )
}
