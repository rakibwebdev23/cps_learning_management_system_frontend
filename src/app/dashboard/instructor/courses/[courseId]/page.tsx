"use client"
import React, { useMemo } from "react"
import { notFound } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Edit, Users, BookOpen, Star, Clock, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import PageHeader from "@/components/common/PageHeader"
import StatusBadge from "@/components/common/StatusBadge"
import { formatDate, formatDuration, formatPrice, getValidImageUrl } from "@/lib/utils"
import { useGetCourseByIdQuery } from "@/redux/api/featuresApi/course/course.api"
import { useGetLessonsQuery } from "@/redux/api/featuresApi/lesson/lesson.api"
import { useGetEnrollmentsQuery } from "@/redux/api/featuresApi/enrollment/enrollment.api"

export default function InstructorCourseDetailPage({ params }: { params: Promise<{ courseId: string }> }) {
  const { courseId } = React.use(params)
  
  const { data: courseData, isLoading: isCourseLoading } = useGetCourseByIdQuery({ id: courseId })
  const courseApi = courseData?.data

  const { data: lessonsData, isLoading: isLessonsLoading } = useGetLessonsQuery({ courseId })
  const lessonsApi = lessonsData?.data || []

  const { data: enrollmentsData, isLoading: isEnrollmentsLoading } = useGetEnrollmentsQuery({ courseId })
  const enrollmentsApi = enrollmentsData?.data || []

  const course = useMemo(() => {
    if (!courseApi) return null
    return {
      title: courseApi.title,
      status: courseApi.isPublished ? "published" : "draft",
      studentCount: courseApi.studentCount || 1540,
      rating: 4.8,
      price: courseApi.price || 49,
      discountPrice: null,
      durationMinutes: 360,
      createdAt: courseApi.createdAt || new Date().toISOString(),
      thumbnail: courseApi.thumbnail_url || "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop&q=80",
    }
  }, [courseApi])

  const lessons = useMemo(() => {
    return lessonsApi.map(l => ({
      id: String(l.documentId || l.id),
      title: l.title,
      type: "video", // default
      durationMinutes: l.durationMinutes || 10,
    }))
  }, [lessonsApi])

  const enrollments = useMemo(() => {
    return enrollmentsApi.map(e => ({
      id: String(e.documentId || e.id),
      studentName: e.studentName || "Student Name",
      studentAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&auto=format&fit=crop&q=80",
      progress: e.progress || 0,
    }))
  }, [enrollmentsApi])

  if (isCourseLoading) return <div className="p-6 flex justify-center"><Loader2 className="animate-spin text-[#0075FD]" /></div>
  if (!course) return <div className="p-6">Course not found.</div>

  return (
    <div>
      <PageHeader
        title={course.title}
        breadcrumbs={[{ label: "Courses", href: "/dashboard/instructor/courses" }, { label: course.title }]}
        actions={
          <Button className="gap-2 bg-[#0075FD] hover:bg-blue-600 text-white font-bold" asChild>
            <Link href={`/dashboard/instructor/courses/${courseId}/edit`}><Edit className="h-4 w-4 text-white" />Edit Course</Link>
          </Button>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-5">
          <div className="rounded-xl border overflow-hidden">
            <div className="relative h-56">
              <Image src={getValidImageUrl(course.thumbnail)} alt={course.title} fill className="object-cover" sizes="800px" />
            </div>
          </div>

          <div className="rounded-xl border bg-white overflow-hidden shadow-sm">
            <div className="flex items-center justify-between px-5 py-4 border-b bg-slate-50">
              <h3 className="font-semibold text-slate-900">Lessons ({lessons.length})</h3>
              <Button size="sm" className="gap-1 bg-[#0075FD] hover:bg-blue-600 text-white font-bold" asChild>
                <Link href="/dashboard/instructor/lessons/create">+ Add Lesson</Link>
              </Button>
            </div>
            <div className="divide-y">
              {isLessonsLoading ? (
                <div className="p-4 flex justify-center"><Loader2 className="animate-spin text-slate-400" /></div>
              ) : lessons.length > 0 ? (
                lessons.map((lesson, i) => (
                  <div key={lesson.id} className="flex items-center justify-between px-5 py-3">
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-bold text-slate-400 w-5">{i + 1}</span>
                      <div>
                        <p className="text-sm font-medium text-slate-900">{lesson.title}</p>
                        <p className="text-xs text-slate-500 capitalize">{lesson.type} · {lesson.durationMinutes}m</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm" asChild>
                      <Link href={`/dashboard/instructor/lessons/${lesson.id}/edit`}><Edit className="h-3.5 w-3.5" /></Link>
                    </Button>
                  </div>
                ))
              ) : (
                <div className="p-4 text-center text-slate-500 text-sm">No lessons found.</div>
              )}
            </div>
          </div>
        </div>

        <div className="space-y-5">
          <div className="rounded-xl border bg-white p-5 shadow-sm">
            <h3 className="font-semibold text-slate-900 mb-4">Course Stats</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between"><span className="text-slate-500">Status</span><StatusBadge status={course.status as any} /></div>
              <div className="flex items-center justify-between"><span className="text-slate-500">Students</span><span className="font-medium">{course.studentCount.toLocaleString()}</span></div>
              <div className="flex items-center justify-between"><span className="text-slate-500">Rating</span><span className="font-medium text-[#0075FD]">★ {course.rating}</span></div>
              <div className="flex items-center justify-between"><span className="text-slate-500">Price</span><span className="font-medium">{formatPrice(course.discountPrice ?? course.price)}</span></div>
              <div className="flex items-center justify-between"><span className="text-slate-500">Duration</span><span className="font-medium">{formatDuration(course.durationMinutes)}</span></div>
              <div className="flex items-center justify-between"><span className="text-slate-500">Created</span><span className="font-medium">{formatDate(course.createdAt)}</span></div>
            </div>
          </div>

          <div className="rounded-xl border bg-white p-5 shadow-sm">
            <h3 className="font-semibold text-slate-900 mb-4">Recent Students ({enrollments.length})</h3>
            <div className="space-y-3">
              {isEnrollmentsLoading ? (
                <div className="flex justify-center"><Loader2 className="animate-spin text-slate-400 h-5 w-5" /></div>
              ) : enrollments.length > 0 ? (
                enrollments.slice(0, 5).map((e) => (
                  <div key={e.id} className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-slate-200 overflow-hidden relative shrink-0">
                      {e.studentAvatar && <Image src={getValidImageUrl(e.studentAvatar)} alt={e.studentName} fill className="object-cover" sizes="32px" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-slate-900 line-clamp-1">{e.studentName}</p>
                      <p className="text-xs text-slate-500">{e.progress}% complete</p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-sm text-slate-500">No students enrolled yet.</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}