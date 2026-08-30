"use client"
import Link from "next/link"
import { ArrowRight, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import CourseCard from "@/components/course/CourseCard"
import { useGetCoursesQuery } from "@/redux/api/featuresApi/course/course.api"

export default function FeaturedCourses() {
  const { data, isLoading } = useGetCoursesQuery()
  const courses = (data?.data || []).slice(0, 6)

  return (
    <section className="py-20 bg-slate-50 dark:bg-slate-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
          <div>
            <p className="text-sm font-medium text-[#0075FD] mb-2">Popular Right Now</p>
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Featured Courses</h2>
            <p className="text-slate-500 mt-2">Curated by our expert team for maximum career impact.</p>
          </div>
          <Button variant="outline" asChild>
            <Link href="/courses" className="gap-2 shrink-0">
              View All Courses <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
        {isLoading ? (
          <div className="flex justify-center py-10"><Loader2 className="w-8 h-8 animate-spin text-[#0075FD]" /></div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course: any) => (
              <CourseCard key={course.id || course.documentId} course={{
                id: String(course.documentId || course.id),
                title: course.title,
                slug: course.title.toLowerCase().replace(/\s+/g, "-"),
                shortDescription: course.description || "Course description",
                thumbnail: course.thumbnail_url || "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop&q=80",
                category: course.category || "Uncategorized",
                level: course.level || "beginner",
                price: course.price || 49,
                instructor: {
                  id: String(course.instructor?.id || "1"),
                  name: course.instructorName || "Instructor",
                  avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&auto=format&fit=crop&q=80",
                },
                rating: course.rating || 4.8,
                reviewCount: course.reviewCount || 120,
                studentCount: course.studentCount || 1500,
                lessonCount: course.lessonCount || 12,
                durationMinutes: course.durationMinutes || 360,
              } as any} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
