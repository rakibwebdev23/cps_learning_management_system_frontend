"use client"
import { use } from "react"
import Link from "next/link"
import { BookOpen, CheckCircle2, PlayCircle, Clock, Loader2 } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import PageHeader from "@/components/common/PageHeader"
import { useGetCourseByIdQuery } from "@/redux/api/featuresApi/course/course.api"
import { useGetLessonsQuery } from "@/redux/api/featuresApi/lesson/lesson.api"
import { useGetEnrollmentsQuery } from "@/redux/api/featuresApi/enrollment/enrollment.api"

export default function StudentCourseDetailPage({ params }: { params: Promise<{ courseId: string }> }) {
  const { courseId } = use(params)
  
  const { data: courseData, isLoading: isCourseLoading } = useGetCourseByIdQuery({ id: courseId })
  const course = courseData?.data

  const { data: lessonsData, isLoading: isLessonsLoading } = useGetLessonsQuery({ courseId })
  const lessons = lessonsData?.data || []

  // Assuming studentId is managed by the backend or we can get it from auth context. For now, fetch all and filter.
  const { data: enrollmentsData, isLoading: isEnrollmentsLoading } = useGetEnrollmentsQuery({ courseId })
  const enrollment = enrollmentsData?.data?.[0] // Simply picking the first one assuming the backend filters it for the current user

  const completedCount = enrollment?.completedLessons ?? 0
  const totalLessons = course?.lessonCount || lessons.length || 1
  const progressPercent = enrollment?.progress ?? 0

  if (isCourseLoading) return <div className="p-12 flex justify-center"><Loader2 className="w-8 h-8 animate-spin text-[#0075FD]" /></div>
  if (!course) return <div className="p-12 text-center text-slate-500">Course not found.</div>

  return (
    <div className="space-y-6">
      <PageHeader
        title={course.title}
        breadcrumbs={[{ label: "My Courses", href: "/dashboard/student/courses" }, { label: course.title }]}
        description={`by ${course.instructorName || "Instructor"} · ${totalLessons} lessons`}
      />

      {/* progress bar */}
      <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm font-bold text-slate-900">Overall Progress</span>
          <span className="text-sm font-extrabold text-[#0075FD]">{progressPercent}%</span>
        </div>
        <Progress value={progressPercent} className="h-2.5" />
        <p className="text-xs text-slate-500">{completedCount} of {totalLessons} lessons completed</p>
      </div>

      {/* curriculum */}
      <div className="rounded-2xl border border-slate-200/80 bg-white overflow-hidden shadow-sm">
        <div className="px-5 py-4 border-b border-slate-100 bg-slate-50">
          <h2 className="font-bold text-slate-900 text-sm">Course Curriculum</h2>
        </div>
        <div className="divide-y divide-slate-100">
          {isLessonsLoading ? (
            <div className="p-8 flex justify-center"><Loader2 className="w-6 h-6 animate-spin text-slate-400" /></div>
          ) : lessons.length > 0 ? (
            lessons.map((lesson: any, idx: number) => {
              const isCompleted = idx < completedCount
              const isCurrent = idx === completedCount
              const lessonIdStr = String(lesson.documentId || lesson.id)
              return (
                <Link
                  key={lessonIdStr}
                  href={`/dashboard/student/lessons/${lessonIdStr}`}
                  className={`flex items-center gap-4 px-5 py-4 hover:bg-slate-50 transition-colors ${isCurrent ? "bg-blue-50/60" : ""}`}
                >
                  <div className={`flex h-8 w-8 items-center justify-center rounded-full shrink-0 ${isCompleted ? "bg-emerald-100 text-emerald-600" : isCurrent ? "bg-blue-100 text-[#0075FD]" : "bg-slate-100 text-slate-400"}`}>
                    {isCompleted
                      ? <CheckCircle2 className="h-4 w-4" />
                      : isCurrent
                      ? <PlayCircle className="h-4 w-4" />
                      : <BookOpen className="h-4 w-4" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm font-semibold line-clamp-1 ${isCompleted ? "text-slate-500" : "text-slate-900"}`}>{lesson.title}</p>
                    {isCurrent && <span className="text-xs text-[#0075FD] font-bold">Current Lesson</span>}
                  </div>
                  <span className="text-xs text-slate-400 flex items-center gap-1 shrink-0">
                    <Clock className="h-3 w-3" />{lesson.durationMinutes || 10}m
                  </span>
                </Link>
              )
            })
          ) : (
            <div className="p-8 text-center text-sm text-slate-500">No lessons available for this course yet.</div>
          )}
        </div>
      </div>
    </div>
  )
}
