import Link from "next/link"
import { Plus, BookOpen, Users, TrendingUp, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import StatCard from "@/components/dashboard/StatCard"
import PageHeader from "@/components/common/PageHeader"
import ProgressChart from "@/components/charts/ProgressChart"
import QuizPerformanceChart from "@/components/charts/QuizPerformanceChart"
import { instructorStats, coursePerformanceData } from "@/data/dashboard"

export default function InstructorDashboard() {
  return (
    <div>
      <PageHeader
        title="Instructor Overview"
        description="Monitor your courses, student engagement, and performance."
        actions={
          <Button className="gap-2 bg-[#F59E0B] hover:bg-amber-600 text-white font-bold shadow-sm" asChild>
            <Link href="/dashboard/instructor/courses/create">
              <Plus className="h-4 w-4 text-white" /> Create Course
            </Link>
          </Button>
        }
      />

      {/* stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard title="Total Courses" value={instructorStats.totalCourses} icon={BookOpen} iconColor="text-[#F59E0B]" iconBg="bg-amber-50" />
        <StatCard title="Total Students" value={`${instructorStats.totalStudents.toLocaleString()}`} icon={Users} iconColor="text-amber-600" iconBg="bg-amber-50" change="+12 this month" changeType="up" />
        <StatCard title="Total Lessons" value={instructorStats.totalLessons} icon={BookOpen} iconColor="text-emerald-600" iconBg="bg-emerald-50" />
        <StatCard title="Avg. Completion" value={`${instructorStats.avgCompletion}%`} icon={TrendingUp} iconColor="text-[#F59E0B]" iconBg="bg-amber-50" />
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
          <Button variant="ghost" size="sm" asChild><Link href="/dashboard/instructor/courses" className="gap-1 text-xs font-semibold text-[#F59E0B]">View All <ArrowRight className="h-3 w-3" /></Link></Button>
        </div>
        <div className="overflow-x-auto bg-white">
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
              {coursePerformanceData.map((c, i) => (
                <tr key={i} className="hover:bg-slate-50 transition-colors bg-white">
                  <td className="px-6 py-4 font-semibold text-slate-900">{c.course}</td>
                  <td className="px-6 py-4">{c.students.toLocaleString()}</td>
                  <td className="px-6 py-4 font-medium text-amber-600">★ {c.rating}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-24 bg-slate-100 rounded-full h-2 overflow-hidden">
                        <div className="h-full bg-[#F59E0B] rounded-full" style={{ width: `${c.completion}%` }} />
                      </div>
                      <span className="text-xs font-medium text-slate-600">{c.completion}%</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
