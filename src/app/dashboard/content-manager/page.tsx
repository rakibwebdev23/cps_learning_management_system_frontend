import Link from "next/link"
import { BookOpen, FileText, HelpCircle, Newspaper, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import StatCard from "@/components/dashboard/StatCard"
import PageHeader from "@/components/common/PageHeader"
import StatusBadge from "@/components/common/StatusBadge"
import { contentManagerStats } from "@/data/dashboard"
import { courses } from "@/data/courses"
import { getPublishedBlogs } from "@/data/blogs"
import { formatDate } from "@/lib/utils"

export default function ContentManagerDashboard() {
  const recentCourses = courses.slice(0, 5)
  const recentBlogs = getPublishedBlogs().slice(0, 4)

  return (
    <div>
      <PageHeader title="Content Manager Dashboard" description="Manage all platform content from one place." />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard title="Total Courses" value={contentManagerStats.totalCourses} icon={BookOpen} iconColor="text-[#F59E0B]" iconBg="bg-amber-50" />
        <StatCard title="Total Lessons" value={contentManagerStats.totalLessons} icon={FileText} iconColor="text-amber-600" iconBg="bg-amber-50" />
        <StatCard title="Quizzes" value={contentManagerStats.totalQuizzes} icon={HelpCircle} iconColor="text-emerald-600" iconBg="bg-emerald-50" />
        <StatCard title="Blog Posts" value={contentManagerStats.totalBlogs} icon={Newspaper} iconColor="text-[#F59E0B]" iconBg="bg-amber-50" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* recent courses */}
        <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-md shadow-slate-200/50">
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-white">
            <h2 className="font-bold text-slate-900 text-base">Recent Courses</h2>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/dashboard/content-manager/courses" className="gap-1 text-xs font-semibold text-[#F59E0B]">All <ArrowRight className="h-3 w-3" /></Link>
            </Button>
          </div>
          <div className="divide-y divide-slate-100 bg-white">
            {recentCourses.map((c) => (
              <div key={c.id} className="flex items-center justify-between px-6 py-3.5 hover:bg-slate-50 transition-colors">
                <div className="flex items-center gap-3">
                  <img src={c.thumbnail} alt={c.title} className="h-10 w-14 rounded-lg object-cover" />
                  <div>
                    <p className="text-sm font-semibold text-slate-900 line-clamp-1">{c.title}</p>
                    <p className="text-xs text-slate-500 font-medium">{formatDate(c.createdAt)}</p>
                  </div>
                </div>
                <StatusBadge status={c.status} />
              </div>
            ))}
          </div>
        </div>

        {/* recent blogs */}
        <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-md shadow-slate-200/50">
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-white">
            <h2 className="font-bold text-slate-900 text-base">Recent Blogs</h2>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/dashboard/content-manager/blogs" className="gap-1 text-xs font-semibold text-[#F59E0B]">All <ArrowRight className="h-3 w-3" /></Link>
            </Button>
          </div>
          <div className="divide-y divide-slate-100 bg-white">
            {recentBlogs.map((b) => (
              <div key={b.id} className="flex items-center justify-between px-6 py-3.5 hover:bg-slate-50 transition-colors">
                <div>
                  <p className="text-sm font-semibold text-slate-900 line-clamp-1">{b.title}</p>
                  <p className="text-xs text-slate-500 font-medium">{b.authorName} · {formatDate(b.createdAt)}</p>
                </div>
                <StatusBadge status={b.status} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
