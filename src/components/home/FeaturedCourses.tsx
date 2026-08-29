import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import CourseCard from "@/components/course/CourseCard"
import { getFeaturedCourses } from "@/data/courses"

export default function FeaturedCourses() {
  const courses = getFeaturedCourses()
  return (
    <section className="py-20 bg-slate-50 dark:bg-slate-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
          <div>
            <p className="text-sm font-medium text-amber-600 mb-2">Popular Right Now</p>
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Featured Courses</h2>
            <p className="text-slate-500 mt-2">Curated by our expert team for maximum career impact.</p>
          </div>
          <Button variant="outline" asChild>
            <Link href="/courses" className="gap-2 shrink-0">
              View All Courses <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => <CourseCard key={course.id} course={course} />)}
        </div>
      </div>
    </section>
  )
}
