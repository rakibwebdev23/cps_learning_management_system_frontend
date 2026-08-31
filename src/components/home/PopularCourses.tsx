"use client"

import Link from "next/link"
import { ArrowRight, Loader2 } from "lucide-react"
import { useGetCoursesQuery } from "@/redux/api/featuresApi/course/course.api"
import CourseCard from "@/components/course/CourseCard"

export default function PopularCourses() {
  const { data: apiData, isLoading } = useGetCoursesQuery()

  const popularCourses = (apiData?.data || []).slice(0, 4)

  return (
    <section className="py-16 bg-white border-y border-slate-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* section header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">Popular Courses</h2>
            <p className="text-sm text-slate-500 mt-1">Explore our top expert-led courses.</p>
          </div>
          <Link href="/courses" className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0075FD] hover:underline cursor-pointer">
            View All Courses <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-[#0075FD]" />
          </div>
        ) : popularCourses.length === 0 ? (
          <div className="text-center py-12 text-slate-500 text-sm">
            No courses available at the moment.
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {popularCourses.map((course: any) => {
                const isValidUrl = (url?: string) => typeof url === "string" && (url.startsWith("http://") || url.startsWith("https://") || url.startsWith("/"));
                
                const mappedCourse = {
                  id: String(course.documentId || course.id),
                  title: course.title || "Untitled Course",
                  slug: (course.title || "course").toLowerCase().replace(/\s+/g, "-"),
                  description: course.description || "Course description",
                  thumbnail: isValidUrl(course.thumbnail_url) 
                    ? course.thumbnail_url 
                    : "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop&q=80",
                  price: course.price || 49,
                  instructorName: course.instructor?.username || course.instructorName || "CPS Instructor",
                  instructorAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&auto=format&fit=crop&q=80",
                }
                return <CourseCard key={mappedCourse.id} course={mappedCourse as any} />
              })}
            </div>
          </>
        )}
      </div>
    </section>
  )
}
