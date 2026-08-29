import { notFound } from "next/navigation"
import Link from "next/link"
import { BookOpen, CheckCircle2, PlayCircle, Clock } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import PageHeader from "@/components/common/PageHeader"
import { getCourseById } from "@/data/courses"
import { getLessonsByCourse } from "@/data/lessons"
import { getEnrollmentsByStudent } from "@/data/enrollments"

const STUDENT_ID = "u6"

export default async function StudentCourseDetailPage({ params }: { params: Promise<{ courseId: string }> }) {
  const { courseId } = await params
  const course = getCourseById(courseId)
  if (!course) notFound()

  const lessons = getLessonsByCourse(courseId)
  const enrollment = getEnrollmentsByStudent(STUDENT_ID).find((e) => e.courseId === courseId)
  const completedCount = enrollment?.completedLessons ?? 0

  return (
    <div className="space-y-6">
      <PageHeader
        title={course.title}
        breadcrumbs={[{ label: "My Courses", href: "/dashboard/student/courses" }, { label: course.title }]}
        description={`by ${course.instructorName} · ${course.lessonCount} lessons`}
      />

      {/* progress bar */}
      <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm font-bold text-slate-900">Overall Progress</span>
          <span className="text-sm font-extrabold text-[#F59E0B]">{enrollment?.progress ?? 0}%</span>
        </div>
        <Progress value={enrollment?.progress ?? 0} className="h-2.5" />
        <p className="text-xs text-slate-500">{completedCount} of {course.lessonCount} lessons completed</p>
      </div>

      {/* curriculum */}
      <div className="rounded-2xl border border-slate-200/80 bg-white overflow-hidden shadow-sm">
        <div className="px-5 py-4 border-b border-slate-100 bg-slate-50">
          <h2 className="font-bold text-slate-900 text-sm">Course Curriculum</h2>
        </div>
        <div className="divide-y divide-slate-100">
          {lessons.map((lesson, idx) => {
            const isCompleted = idx < completedCount
            const isCurrent = idx === completedCount
            return (
              <Link
                key={lesson.id}
                href={`/dashboard/student/lessons/${lesson.id}`}
                className={`flex items-center gap-4 px-5 py-4 hover:bg-slate-50 transition-colors ${isCurrent ? "bg-amber-50/60" : ""}`}
              >
                <div className={`flex h-8 w-8 items-center justify-center rounded-full shrink-0 ${isCompleted ? "bg-emerald-100 text-emerald-600" : isCurrent ? "bg-amber-100 text-[#F59E0B]" : "bg-slate-100 text-slate-400"}`}>
                  {isCompleted
                    ? <CheckCircle2 className="h-4 w-4" />
                    : isCurrent
                    ? <PlayCircle className="h-4 w-4" />
                    : <BookOpen className="h-4 w-4" />}
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`text-sm font-semibold line-clamp-1 ${isCompleted ? "text-slate-500" : "text-slate-900"}`}>{lesson.title}</p>
                  {isCurrent && <span className="text-xs text-[#F59E0B] font-bold">Current Lesson</span>}
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
