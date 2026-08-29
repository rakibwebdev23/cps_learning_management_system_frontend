import { notFound } from "next/navigation"
import Link from "next/link"
import { BookOpen, CheckCircle2, PlayCircle, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import PageHeader from "@/components/common/PageHeader"
import { getCourseById } from "@/data/courses"
import { getLessonsByCourse } from "@/data/lessons"
import { getEnrollmentsByStudent } from "@/data/enrollments"
import { formatDuration } from "@/lib/utils"

const STUDENT_ID = "u6"

export default async function StudentCourseDetailPage({ params }: { params: Promise<{ courseId: string }> }) {
  const { courseId } = await params
  const course = getCourseById(courseId)
  if (!course) notFound()

  const lessons = getLessonsByCourse(courseId)
  const enrollment = getEnrollmentsByStudent(STUDENT_ID).find((e) => e.courseId === courseId)
  const completedCount = enrollment?.completedLessons ?? 0

  return (
    <div>
      <PageHeader
        title={course.title}
        breadcrumbs={[{ label: "My Courses", href: "/dashboard/student/courses" }, { label: course.title }]}
        description={`by ${course.instructorName} · ${course.lessonCount} lessons`}
      />

      {/* progress bar */}
      <div className="rounded-xl border bg-white dark:bg-slate-900 p-5 mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Overall Progress</span>
          <span className="text-sm font-bold text-amber-600">{enrollment?.progress ?? 0}%</span>
        </div>
        <Progress value={enrollment?.progress ?? 0} className="h-3" />
        <p className="text-xs text-slate-500 mt-2">{completedCount} of {course.lessonCount} lessons completed</p>
      </div>

      {/* curriculum */}
      <div className="rounded-xl border bg-white dark:bg-slate-900 overflow-hidden">
        <div className="px-5 py-4 border-b bg-slate-50 dark:bg-slate-800">
          <h2 className="font-semibold text-slate-900 dark:text-white">Course Curriculum</h2>
        </div>
        <div className="divide-y">
          {lessons.map((lesson, idx) => {
            const isCompleted = idx < completedCount
            const isCurrent = idx === completedCount
            return (
              <Link
                key={lesson.id}
                href={`/dashboard/student/lessons/${lesson.id}`}
                className={`flex items-center gap-4 px-5 py-4 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors ${isCurrent ? "bg-amber-50 dark:bg-amber-950" : ""}`}
              >
                <div className={`flex h-8 w-8 items-center justify-center rounded-full shrink-0 ${isCompleted ? "bg-emerald-100" : isCurrent ? "bg-amber-100" : "bg-slate-100 dark:bg-slate-700"}`}>
                  {isCompleted
                    ? <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                    : isCurrent
                    ? <PlayCircle className="h-4 w-4 text-amber-600" />
                    : <BookOpen className="h-4 w-4 text-slate-400" />}
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`text-sm font-medium line-clamp-1 ${isCompleted ? "text-slate-500 dark:text-slate-400" : "text-slate-900 dark:text-white"}`}>{lesson.title}</p>
                  {isCurrent && <span className="text-xs text-amber-600 font-medium">Current Lesson</span>}
                </div>
                <span className="text-xs text-slate-400 flex items-center gap-1 shrink-0">
                  <Clock className="h-3 w-3" />{lesson.durationMinutes}m
                </span>
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}
