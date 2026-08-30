"use client"
import Link from "next/link"
import { Plus, BookOpen, Users, TrendingUp, ArrowRight, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import StatCard from "@/components/dashboard/StatCard"
import PageHeader from "@/components/common/PageHeader"
import ProgressChart from "@/components/charts/ProgressChart"
import QuizPerformanceChart from "@/components/charts/QuizPerformanceChart"
import { useGetCoursesQuery } from "@/redux/api/featuresApi/course/course.api"

export default function InstructorDashboard() {
  const { data, isLoading } = useGetCoursesQuery()
  const courses = data?.data || []
  
  const totalCourses = courses.length
  const totalLessons = courses.reduce((acc: number, curr: any) => acc + (curr.lessonCount || 0), 0)
  const totalStudents = courses.reduce((acc: number, curr: any) => acc + (curr.studentCount || 0), 0) || 1250 // dummy backup
  
  return (
    <div>
      <PageHeader
        title="Instructor Overview"
        description="Monitor your courses, student engagement, and performance."
        actions={
          <Button className="gap-2 bg-[#0075FD] hover:bg-blue-600 text-white font-bold shadow-sm" asChild>
            <Link href="/dashboard/instructor/courses/create">
              <Plus className="h-4 w-4 text-white" /> Create Course
            </Link>
          </Button>
        }
      />

      {/* stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard title="Total Courses" value={totalCourses} icon={BookOpen} iconColor="text-[#0075FD]" iconBg="bg-blue-50" />
        <StatCard title="Total Students" value={totalStudents.toLocaleString()} icon={Users} iconColor="text-[#0075FD]" iconBg="bg-blue-50" change="+12 this month" changeType="up" />
        <StatCard title="Total Lessons" value={totalLessons} icon={BookOpen} iconColor="text-emerald-600" iconBg="bg-emerald-50" />
        <StatCard title="Avg. Completion" value="68%" icon={TrendingUp} iconColor="text-[#0075FD]" iconBg="bg-blue-50" />
      </div>

      {/* charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <ProgressChart />
        <QuizPerformanceChart />
      </div>

      {/* course performance table */}
      <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-md shadow-slate-200/50">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-white">
          <h2 className="font-bold text-slate-900 text-base">Course Performance</h2>
          <Button variant="ghost" size="sm" asChild><Link href="/dashboard/instructor/courses" className="gap-1 text-xs font-semibold text-[#0075FD]">View All <ArrowRight className="h-3 w-3" /></Link></Button>
        </div>
        <div className="overflow-x-auto bg-white">
          {isLoading ? (
            <div className="flex justify-center py-10"><Loader2 className="w-8 h-8 animate-spin text-[#0075FD]" /></div>
          ) : (
            <table className="w-full text-left text-sm text-slate-700 bg-white">
              <thead className="bg-slate-50 text-xs font-semibold text-slate-500 uppercase border-b border-slate-100">
                <tr>
                  <th className="px-6 py-3">Course</th>
                  <th className="px-6 py-3">Students</th>
                  <th className="px-6 py-3">Rating</th>
                  <th className="px-6 py-3">Completion Rate</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white">
                {courses.slice(0, 5).map((c: any) => (
                  <tr key={c.id || c.documentId} className="hover:bg-slate-50 transition-colors bg-white">
                    <td className="px-6 py-4 font-semibold text-slate-900">{c.title}</td>
                    <td className="px-6 py-4">{(c.studentCount || 0).toLocaleString()}</td>
                    <td className="px-6 py-4 font-medium text-[#0075FD]">★ {4.8}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-24 bg-slate-100 rounded-full h-2 overflow-hidden">
                          <div className="h-full bg-[#0075FD] rounded-full" style={{ width: `75%` }} />
                        </div>
                        <span className="text-xs font-medium text-slate-600">75%</span>
                      </div>
                    </td>
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
