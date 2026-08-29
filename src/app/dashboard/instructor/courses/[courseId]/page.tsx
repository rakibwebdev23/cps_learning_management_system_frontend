import { notFound } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Edit, Users, BookOpen, Star, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import PageHeader from "@/components/common/PageHeader"
import StatusBadge from "@/components/common/StatusBadge"
import { getCourseById } from "@/data/courses"
import { getLessonsByCourse } from "@/data/lessons"
import { getEnrollmentsByCourse } from "@/data/enrollments"
import { formatDate, formatDuration, formatPrice } from "@/lib/utils"

export default async function InstructorCourseDetailPage({ params }: { params: Promise<{ courseId: string }> }) {
  const { courseId } = await params
  const course = getCourseById(courseId)
  if (!course) notFound()

  const lessons = getLessonsByCourse(courseId)
  const enrollments = getEnrollmentsByCourse(courseId)

  return (
    <div>
      <PageHeader
        title={course.title}
        breadcrumbs={[{ label: "Courses", href: "/dashboard/instructor/courses" }, { label: course.title }]}
        actions={
          <Button className="gap-2 bg-[#F59E0B] hover:bg-amber-600 text-white font-bold" asChild>
            <Link href={`/dashboard/instructor/courses/${courseId}/edit`}><Edit className="h-4 w-4 text-white" />Edit Course</Link>
          </Button>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-5">
          {/* thumbnail */}
          <div className="rounded-xl border overflow-hidden">
            <div className="relative h-56">
              <Image src={course.thumbnail} alt={course.title} fill className="object-cover" sizes="800px" />
            </div>
          </div>

          {/* lessons */}
          <div className="rounded-xl border bg-white overflow-hidden shadow-sm">
            <div className="flex items-center justify-between px-5 py-4 border-b bg-slate-50">
              <h3 className="font-semibold text-slate-900">Lessons ({lessons.length})</h3>
              <Button size="sm" className="gap-1 bg-[#F59E0B] hover:bg-amber-600 text-white font-bold" asChild>
                <Link href="/dashboard/instructor/lessons/create">+ Add Lesson</Link>
              </Button>
            </div>
            <div className="divide-y">
              {lessons.map((lesson, i) => (
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
              ))}
            </div>
          </div>
        </div>

        {/* sidebar */}
        <div className="space-y-5">
          <div className="rounded-xl border bg-white p-5 shadow-sm">
            <h3 className="font-semibold text-slate-900 mb-4">Course Stats</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between"><span className="text-slate-500">Status</span><StatusBadge status={course.status} /></div>
              <div className="flex items-center justify-between"><span className="text-slate-500">Students</span><span className="font-medium">{course.studentCount.toLocaleString()}</span></div>
              <div className="flex items-center justify-between"><span className="text-slate-500">Rating</span><span className="font-medium text-amber-600">★ {course.rating}</span></div>
              <div className="flex items-center justify-between"><span className="text-slate-500">Price</span><span className="font-medium">{formatPrice(course.discountPrice ?? course.price)}</span></div>
              <div className="flex items-center justify-between"><span className="text-slate-500">Duration</span><span className="font-medium">{formatDuration(course.durationMinutes)}</span></div>
              <div className="flex items-center justify-between"><span className="text-slate-500">Created</span><span className="font-medium">{formatDate(course.createdAt)}</span></div>
            </div>
          </div>

          {/* recent enrollments */}
          <div className="rounded-xl border bg-white p-5 shadow-sm">
            <h3 className="font-semibold text-slate-900 mb-4">Recent Students ({enrollments.length})</h3>
            <div className="space-y-3">
              {enrollments.slice(0, 5).map((e) => (
                <div key={e.id} className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-slate-200 overflow-hidden relative shrink-0">
                    {e.studentAvatar && <Image src={e.studentAvatar} alt={e.studentName} fill className="object-cover" sizes="32px" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-slate-900 line-clamp-1">{e.studentName}</p>
                    <p className="text-xs text-slate-500">{e.progress}% complete</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
