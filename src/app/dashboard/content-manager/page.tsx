"use client"
import Link from "next/link"
import { BookOpen, FileText, HelpCircle, Newspaper, ArrowRight, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import StatCard from "@/components/dashboard/StatCard"
import PageHeader from "@/components/common/PageHeader"
import StatusBadge from "@/components/common/StatusBadge"
import { formatDate } from "@/lib/utils"

import { useGetCoursesQuery } from "@/redux/api/featuresApi/course/course.api"
import { useGetLessonsQuery } from "@/redux/api/featuresApi/lesson/lesson.api"
import { useGetQuizzesQuery } from "@/redux/api/featuresApi/quiz/quiz.api"
import { useGetBlogPostsQuery } from "@/redux/api/featuresApi/blog/blog.api"

export default function ContentManagerDashboard() {
  const { data: coursesData, isLoading: isCoursesLoading } = useGetCoursesQuery()
  const courses = coursesData?.data || []

  const { data: lessonsData, isLoading: isLessonsLoading } = useGetLessonsQuery()
  const lessons = lessonsData?.data || []

  const { data: quizzesData, isLoading: isQuizzesLoading } = useGetQuizzesQuery()
  const quizzes = quizzesData?.data || []

  const { data: blogsData, isLoading: isBlogsLoading } = useGetBlogPostsQuery()
  const blogs = blogsData?.data || []

  const isLoading = isCoursesLoading || isLessonsLoading || isQuizzesLoading || isBlogsLoading

  if (isLoading) {
    return <div className="flex justify-center p-20"><Loader2 className="w-8 h-8 animate-spin text-[#0075FD]" /></div>
  }

  const recentCourses = [...courses].reverse().slice(0, 5)
  const recentBlogs = [...blogs].reverse().slice(0, 4)

  return (
    <div>
      <PageHeader title="Content Manager Dashboard" description="Manage all platform content from one place." />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard title="Total Courses" value={courses.length} icon={BookOpen} iconColor="text-[#0075FD]" iconBg="bg-blue-50" />
        <StatCard title="Total Lessons" value={lessons.length} icon={FileText} iconColor="text-[#0075FD]" iconBg="bg-blue-50" />
        <StatCard title="Quizzes" value={quizzes.length} icon={HelpCircle} iconColor="text-emerald-600" iconBg="bg-emerald-50" />
        <StatCard title="Blog Posts" value={blogs.length} icon={Newspaper} iconColor="text-[#0075FD]" iconBg="bg-blue-50" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-md shadow-slate-200/50">
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-white">
            <h2 className="font-bold text-slate-900 text-base">Recent Courses</h2>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/dashboard/content-manager/courses" className="gap-1 text-xs font-semibold text-[#0075FD]">All <ArrowRight className="h-3 w-3" /></Link>
            </Button>
          </div>
          <div className="divide-y divide-slate-100 bg-white">
            {recentCourses.map((c: any) => (
              <div key={c.id || c.documentId} className="flex items-center justify-between px-6 py-3.5 hover:bg-slate-50 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-14 rounded-lg bg-slate-100 overflow-hidden shrink-0">
                    {c.thumbnail_url && <img src={c.thumbnail_url} alt={c.title} className="h-full w-full object-cover" />}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-900 line-clamp-1">{c.title}</p>
                    <p className="text-xs text-slate-500 font-medium">{formatDate(c.createdAt || new Date().toISOString())}</p>
                  </div>
                </div>
                <StatusBadge status={c.status || "active"} />
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-md shadow-slate-200/50">
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-white">
            <h2 className="font-bold text-slate-900 text-base">Recent Blogs</h2>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/dashboard/content-manager/blogs" className="gap-1 text-xs font-semibold text-[#0075FD]">All <ArrowRight className="h-3 w-3" /></Link>
            </Button>
          </div>
          <div className="divide-y divide-slate-100 bg-white">
            {recentBlogs.map((b: any) => (
              <div key={b.id || b.documentId} className="flex items-center justify-between px-6 py-3.5 hover:bg-slate-50 transition-colors">
                <div>
                  <p className="text-sm font-semibold text-slate-900 line-clamp-1">{b.title}</p>
                  <p className="text-xs text-slate-500 font-medium">{b.author?.username || b.author?.name || "Unknown"} · {formatDate(b.createdAt || new Date().toISOString())}</p>
                </div>
                <StatusBadge status={b.status || "draft"} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
