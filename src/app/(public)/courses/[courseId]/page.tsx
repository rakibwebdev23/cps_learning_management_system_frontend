"use client"
import React, { useMemo } from "react"
import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Star, Clock, BookOpen, Users, CheckCircle2, ChevronDown, ShoppingCart, PlayCircle, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import CourseCard from "@/components/course/CourseCard"
import { formatPrice, formatDuration, getValidImageUrl } from "@/lib/utils"
import { useGetCourseByIdQuery, useGetCoursesQuery } from "@/redux/api/featuresApi/course/course.api"
import { useGetLessonsQuery } from "@/redux/api/featuresApi/lesson/lesson.api"

export default function CourseDetailPage({ params }: { params: Promise<{ courseId: string }> }) {
  const { courseId } = React.use(params)
  
  const { data: courseData, isLoading: isCourseLoading, error: courseError } = useGetCourseByIdQuery({ id: courseId })
  const courseApiResult = courseData?.data
  
  const { data: lessonsData, isLoading: isLessonsLoading } = useGetLessonsQuery({ courseId })
  const lessonsApiResult = lessonsData?.data || []
  
  const { data: allCoursesData, isLoading: isRelatedLoading } = useGetCoursesQuery()
  
  const course = useMemo(() => {
    if (!courseApiResult) return null
    return {
      id: String(courseApiResult.documentId || courseApiResult.id),
      title: courseApiResult.title,
      category: "Web Development", // defaulting as backend might lack category yet
      shortDescription: courseApiResult.description || "Detailed course overview...",
      rating: 4.8,
      reviewCount: 124,
      studentCount: 1540,
      lessonCount: courseApiResult.lessonCount || 12,
      durationMinutes: 360,
      instructorName: courseApiResult.instructor?.username || courseApiResult.instructorName || "CPS Instructor",
      instructorAvatar: null,
      thumbnail: courseApiResult.thumbnail_url || "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop&q=80",
      price: courseApiResult.price || 49,
      discountPrice: null, // hardcoded for now
      learningOutcomes: ["Build full-stack applications", "Master modern web development", "Deploy to production"],
      requirements: ["Basic understanding of HTML, CSS, and JavaScript", "A computer with internet access"],
    }
  }, [courseApiResult])

  const lessons = useMemo(() => {
    return lessonsApiResult.map((l) => ({
      id: String(l.documentId || l.id),
      title: l.title,
      isFree: l.isFree || false,
      durationMinutes: l.durationMinutes || 10,
    }))
  }, [lessonsApiResult])

  const related = useMemo(() => {
    if (!allCoursesData?.data || !course) return []
    return allCoursesData.data
      .filter((c) => String(c.documentId || c.id) !== courseId)
      .slice(0, 3)
      .map((c) => ({
        id: String(c.documentId || c.id),
        title: c.title,
        slug: c.title.toLowerCase().replace(/\s+/g, "-"),
        shortDescription: c.description || "Professional course at CPS LMS",
        thumbnail: c.thumbnail_url || "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop&q=80",
        category: "Web Development",
        level: "intermediate" as const,
        price: c.price || 49,
        instructor: {
          id: String(c.instructor?.id || "1"),
          name: c.instructorName || "CPS Instructor",
          avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&auto=format&fit=crop&q=80",
        },
        rating: 4.8,
        reviewCount: 124,
        studentCount: 1540,
        lessonCount: c.lessonCount || 12,
        durationMinutes: 360,
      }))
  }, [allCoursesData, course, courseId])

  if (isCourseLoading) {
    return (
      <div className="bg-white dark:bg-slate-900 min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-[#0075FD]" />
      </div>
    )
  }

  if (courseError || !course) {
    return (
      <div className="bg-white dark:bg-slate-900 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Course not found</h2>
          <Button asChild>
            <Link href="/courses">Back to Courses</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white min-h-screen">
      <div className="bg-white border-b border-slate-100 text-slate-900 pt-20 pb-6">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <p className="text-[#0075FD] text-sm font-semibold mb-2">{course.category}</p>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-black mb-4 leading-tight">{course.title}</h1>
              <p className="text-gray-700 font-medium mb-5">{course.shortDescription}</p>
              <div className="flex flex-wrap items-center gap-4 text-sm mb-5">
                <span className="flex items-center gap-1 text-[#0075FD] font-bold">
                  <Star className="h-4 w-4 fill-current" /> {course.rating}
                  <span className="text-gray-700 font-normal ml-1">({course.reviewCount.toLocaleString()} reviews)</span>
                </span>
                <span className="flex items-center gap-1 text-gray-700 font-medium"><Users className="h-4 w-4 text-gray-700" /> {course.studentCount.toLocaleString()} students</span>
                <span className="flex items-center gap-1 text-gray-700 font-medium"><BookOpen className="h-4 w-4 text-gray-700" /> {course.lessonCount} lessons</span>
                <span className="flex items-center gap-1 text-gray-700 font-medium"><Clock className="h-4 w-4 text-gray-700" /> {formatDuration(course.durationMinutes)}</span>
              </div>
              <div className="pt-2">
                <p className="text-xs text-gray-700 font-medium">Instructor</p>
                <p className="text-sm font-bold text-black">{course.instructorName}</p>
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="bg-white border border-slate-200 text-slate-900 overflow-hidden sticky top-4">
                <div className="relative h-44">
                  <Image src={getValidImageUrl(course.thumbnail)} alt={course.title} fill className="object-cover" sizes="400px" />
                </div>
                <div className="p-5">
                  <div className="flex items-baseline gap-3 mb-4">
                    <span className="text-3xl font-extrabold text-slate-900">{formatPrice(course.discountPrice ?? course.price)}</span>
                    {course.discountPrice && <span className="text-slate-400 line-through text-sm">{formatPrice(course.price)}</span>}
                    {course.discountPrice && <Badge className="bg-red-100 text-red-700 border-0 text-xs">
                      {Math.round((1 - course.discountPrice / course.price) * 100)}% OFF
                    </Badge>}
                  </div>
                  <Button size="lg" className="w-full bg-[#0075FD] hover:bg-blue-600 text-white font-bold gap-2 mb-2 rounded-full" asChild>
                    <Link href={`/checkout?courseId=${course.id}`}><ShoppingCart className="h-4 w-4" /> Enroll Now</Link>
                  </Button>
                  <Button size="lg" variant="outline" className="w-full gap-2 rounded-full border-slate-300 text-slate-900 hover:bg-slate-50">
                    <PlayCircle className="h-4 w-4" /> Preview Course
                  </Button>
                  <p className="text-xs text-slate-600 text-center mt-3">30-day money-back guarantee</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <section className="border border-slate-200 p-6 bg-white">
              <h2 className="text-xl font-bold text-black mb-4">What You'll Learn</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {course.learningOutcomes.map((item) => (
                  <div key={item} className="flex items-start gap-2 text-sm text-gray-700 font-medium">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 mt-0.5 shrink-0" />
                    {item}
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-xl font-bold text-black mb-4">Course Curriculum</h2>
              <div className="border border-slate-200 overflow-hidden divide-y divide-slate-100 bg-white">
                {isLessonsLoading ? (
                  <div className="p-4 text-center text-gray-700 font-medium"><Loader2 className="w-5 h-5 animate-spin mx-auto text-[#0075FD]" /></div>
                ) : lessons.length > 0 ? (
                  lessons.map((lesson) => (
                    <div key={lesson.id} className="flex items-center justify-between px-4 py-3 bg-white hover:bg-slate-50 transition-colors">
                      <div className="flex items-center gap-3">
                        {lesson.isFree ? (
                          <PlayCircle className="h-4 w-4 text-[#0075FD] shrink-0" />
                        ) : (
                          <BookOpen className="h-4 w-4 text-gray-700 shrink-0" />
                        )}
                        <div>
                          <p className="text-sm font-semibold text-black">{lesson.title}</p>
                          {lesson.isFree && <span className="text-xs text-[#0075FD] font-semibold">Free preview</span>}
                        </div>
                      </div>
                      <span className="text-xs text-gray-700 font-medium shrink-0">{lesson.durationMinutes}m</span>
                    </div>
                  ))
                ) : (
                  <div className="p-4 text-center text-gray-700 font-semibold text-sm">No lessons found for this course.</div>
                )}
              </div>
            </section>

            <section className="border border-slate-200 p-6 bg-white">
              <h2 className="text-xl font-bold text-black mb-4">Requirements</h2>
              <ul className="space-y-2">
                {course.requirements.map((r) => (
                  <li key={r} className="flex items-start gap-2 text-sm text-gray-700 font-medium">
                    <span className="h-1.5 w-1.5 rounded-full bg-gray-700 mt-2 shrink-0" />{r}
                  </li>
                ))}
              </ul>
            </section>
          </div>

          <div className="space-y-6">
            <div className="border border-slate-200 p-5 bg-white">
              <h3 className="font-bold text-black mb-3 text-base">Course Includes</h3>
              <ul className="space-y-2.5 text-sm text-gray-700 font-medium">
                <li className="flex items-center gap-2.5"><Clock className="h-4 w-4 text-gray-700 shrink-0" />{formatDuration(course.durationMinutes)} of content</li>
                <li className="flex items-center gap-2.5"><BookOpen className="h-4 w-4 text-gray-700 shrink-0" />{course.lessonCount} video lessons</li>
                <li className="flex items-center gap-2.5"><CheckCircle2 className="h-4 w-4 text-gray-700 shrink-0" />Completion certificate</li>
                <li className="flex items-center gap-2.5"><Users className="h-4 w-4 text-gray-700 shrink-0" />Lifetime access</li>
              </ul>
            </div>
          </div>
        </div>

        {related.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Related Courses</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {related.map((c) => <CourseCard key={c.id} course={c as any} />)}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}