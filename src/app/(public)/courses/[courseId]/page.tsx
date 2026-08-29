import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Star, Clock, BookOpen, Users, CheckCircle2, ChevronDown, ShoppingCart, PlayCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import CourseCard from "@/components/course/CourseCard"
import { getCourseById, getPublishedCourses } from "@/data/courses"
import { getLessonsByCourse } from "@/data/lessons"
import { formatPrice, formatDuration } from "@/lib/utils"
import { levelColors } from "@/lib/constants"

export default async function CourseDetailPage({ params }: { params: Promise<{ courseId: string }> }) {
  const { courseId } = await params
  const course = getCourseById(courseId)
  if (!course) notFound()

  const lessons = getLessonsByCourse(courseId)
  const related = getPublishedCourses().filter((c) => c.id !== courseId && c.category === course.category).slice(0, 3)

  return (
    <div className="bg-white dark:bg-slate-900 min-h-screen">
      {/* hero */}
      <div className="bg-slate-900 text-white py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <p className="text-amber-400 text-sm font-medium mb-2">{course.category}</p>
              <h1 className="text-2xl sm:text-3xl font-bold mb-4 leading-tight">{course.title}</h1>
              <p className="text-slate-300 mb-5">{course.shortDescription}</p>
              <div className="flex flex-wrap items-center gap-4 text-sm mb-5">
                <span className="flex items-center gap-1 text-amber-400">
                  <Star className="h-4 w-4 fill-current" /> {course.rating}
                  <span className="text-slate-400 ml-1">({course.reviewCount.toLocaleString()} reviews)</span>
                </span>
                <span className="flex items-center gap-1 text-slate-400"><Users className="h-4 w-4" /> {course.studentCount.toLocaleString()} students</span>
                <span className="flex items-center gap-1 text-slate-400"><BookOpen className="h-4 w-4" /> {course.lessonCount} lessons</span>
                <span className="flex items-center gap-1 text-slate-400"><Clock className="h-4 w-4" /> {formatDuration(course.durationMinutes)}</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="relative h-10 w-10 rounded-full overflow-hidden">
                  {course.instructorAvatar && <Image src={course.instructorAvatar} alt={course.instructorName} fill className="object-cover" sizes="40px" />}
                </div>
                <div>
                  <p className="text-xs text-slate-400">Instructor</p>
                  <p className="text-sm font-medium">{course.instructorName}</p>
                </div>
              </div>
            </div>

            {/* purchase card */}
            <div className="lg:col-span-1">
              <div className="rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-2xl overflow-hidden sticky top-4">
                <div className="relative h-44">
                  <Image src={course.thumbnail} alt={course.title} fill className="object-cover" sizes="400px" />
                </div>
                <div className="p-5">
                  <div className="flex items-baseline gap-3 mb-4">
                    <span className="text-3xl font-extrabold">{formatPrice(course.discountPrice ?? course.price)}</span>
                    {course.discountPrice && <span className="text-slate-400 line-through text-sm">{formatPrice(course.price)}</span>}
                    {course.discountPrice && <Badge className="bg-red-100 text-red-700 border-0 text-xs">
                      {Math.round((1 - course.discountPrice / course.price) * 100)}% OFF
                    </Badge>}
                  </div>
                  <Button size="lg" className="w-full bg-[#F59E0B] hover:bg-amber-600 text-white font-bold gap-2 mb-2" asChild>
                    <Link href="/checkout"><ShoppingCart className="h-4 w-4" /> Enroll Now</Link>
                  </Button>
                  <Button size="lg" variant="outline" className="w-full gap-2">
                    <PlayCircle className="h-4 w-4" /> Preview Course
                  </Button>
                  <p className="text-xs text-slate-500 text-center mt-3">30-day money-back guarantee</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* body */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            {/* what you'll learn */}
            <section className="rounded-xl border p-6">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">What You'll Learn</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {course.learningOutcomes.map((item) => (
                  <div key={item} className="flex items-start gap-2 text-sm text-slate-700 dark:text-slate-300">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500 mt-0.5 shrink-0" />
                    {item}
                  </div>
                ))}
              </div>
            </section>

            {/* curriculum */}
            <section>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Course Curriculum</h2>
              <div className="border rounded-xl overflow-hidden divide-y">
                {lessons.map((lesson) => (
                  <div key={lesson.id} className="flex items-center justify-between px-4 py-3 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                    <div className="flex items-center gap-3">
                      {lesson.isFree ? (
                        <PlayCircle className="h-4 w-4 text-amber-500 shrink-0" />
                      ) : (
                        <BookOpen className="h-4 w-4 text-slate-400 shrink-0" />
                      )}
                      <div>
                        <p className="text-sm font-medium text-slate-900 dark:text-white">{lesson.title}</p>
                        {lesson.isFree && <span className="text-xs text-amber-600">Free preview</span>}
                      </div>
                    </div>
                    <span className="text-xs text-slate-500 shrink-0">{lesson.durationMinutes}m</span>
                  </div>
                ))}
              </div>
            </section>

            {/* requirements */}
            <section className="rounded-xl border p-6">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Requirements</h2>
              <ul className="space-y-2">
                {course.requirements.map((r) => (
                  <li key={r} className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-400">
                    <span className="h-1.5 w-1.5 rounded-full bg-slate-400 mt-2 shrink-0" />{r}
                  </li>
                ))}
              </ul>
            </section>
          </div>

          {/* sidebar */}
          <div className="space-y-6">
            <div className="rounded-xl border p-5">
              <h3 className="font-semibold text-slate-900 dark:text-white mb-3">Course Includes</h3>
              <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                <li className="flex gap-2"><Clock className="h-4 w-4 mt-0.5 text-slate-400" />{formatDuration(course.durationMinutes)} of content</li>
                <li className="flex gap-2"><BookOpen className="h-4 w-4 mt-0.5 text-slate-400" />{course.lessonCount} video lessons</li>
                <li className="flex gap-2"><CheckCircle2 className="h-4 w-4 mt-0.5 text-slate-400" />Completion certificate</li>
                <li className="flex gap-2"><Users className="h-4 w-4 mt-0.5 text-slate-400" />Lifetime access</li>
              </ul>
            </div>
          </div>
        </div>

        {/* related courses */}
        {related.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Related Courses</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {related.map((c) => <CourseCard key={c.id} course={c} />)}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
