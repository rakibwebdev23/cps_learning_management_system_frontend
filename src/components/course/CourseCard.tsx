import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { formatPrice, getValidImageUrl } from "@/lib/utils"
import type { Course } from "@/types/course"

interface Props {
  course: Course
}

export default function CourseCard({ course }: Props) {
  const thumbnailSrc = getValidImageUrl(course.thumbnail || (course as any).thumbnail_url)

  return (
    <div className="group border border-slate-200 bg-white overflow-hidden">
      {/* thumbnail */}
      <div className="relative h-44 overflow-hidden">
        <Image
          src={getValidImageUrl(thumbnailSrc)}
          alt={course.title || "Course"}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>

      {/* content */}
      <div className="p-4">
        <h3 className="font-bold text-slate-900 text-sm leading-snug line-clamp-2 mb-2 group-hover:text-[#0075FD] transition-colors">
          {course.title}
        </h3>
        <p className="text-xs text-slate-600 line-clamp-2 mb-3">{course.description || course.shortDescription}</p>

        {/* instructor */}
        <div className="mb-3">
          <span className="text-xs text-slate-900 font-semibold">
            {course.instructorName || (course as any).instructor?.username || (course as any).instructor?.name || "CPS Instructor"}
          </span>
        </div>

        {/* price + CTA */}
        <div className="flex items-center justify-between pt-3 border-t border-slate-100">
          <div className="flex items-baseline gap-2">
            <span className="font-extrabold text-slate-900 text-base">
              {formatPrice(course.price)}
            </span>
          </div>
          <Button size="sm" className="h-7 px-4 rounded-full text-xs bg-[#0075FD] hover:bg-blue-600 text-white font-bold" asChild>
            <Link href={`/courses/${course.id}`}>Enroll</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
