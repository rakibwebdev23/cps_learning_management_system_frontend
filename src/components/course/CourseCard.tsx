import Link from "next/link"
import Image from "next/image"
import { Star, Clock, BookOpen, Users } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { formatPrice, formatDuration } from "@/lib/utils"
import { levelColors } from "@/lib/constants"
import type { Course } from "@/types/course"

interface Props {
  course: Course
}

export default function CourseCard({ course }: Props) {
  return (
    <div className="group rounded-xl border bg-white dark:bg-slate-900 overflow-hidden card-hover">
      {/* thumbnail */}
      <div className="relative h-44 overflow-hidden">
        <Image
          src={course.thumbnail}
          alt={course.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute top-3 left-3">
          <Badge className={`text-xs ${levelColors[course.level]} border-0`}>{course.level}</Badge>
        </div>
        {course.discountPrice && (
          <div className="absolute top-3 right-3 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded">
            SALE
          </div>
        )}
      </div>

      {/* content */}
      <div className="p-4">
        <p className="text-xs text-amber-600 font-medium mb-1">{course.category}</p>
        <h3 className="font-semibold text-slate-900 dark:text-white text-sm leading-snug line-clamp-2 mb-2 group-hover:text-amber-600 transition-colors">
          {course.title}
        </h3>
        <p className="text-xs text-slate-500 line-clamp-2 mb-3">{course.shortDescription}</p>

        {/* instructor */}
        <div className="flex items-center gap-2 mb-3">
          <div className="h-6 w-6 rounded-full bg-slate-200 overflow-hidden relative shrink-0">
            {course.instructorAvatar && (
              <Image src={course.instructorAvatar} alt={course.instructorName} fill className="object-cover" sizes="24px" />
            )}
          </div>
          <span className="text-xs text-slate-500">{course.instructorName}</span>
        </div>

        {/* meta */}
        <div className="flex items-center gap-3 text-xs text-slate-500 mb-3">
          <span className="flex items-center gap-1">
            <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
            <span className="font-medium text-slate-700 dark:text-slate-300">{course.rating}</span>
            <span>({course.reviewCount.toLocaleString()})</span>
          </span>
          <span className="flex items-center gap-1"><BookOpen className="h-3.5 w-3.5" />{course.lessonCount} lessons</span>
          <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" />{formatDuration(course.durationMinutes)}</span>
        </div>

        {/* price + CTA */}
        <div className="flex items-center justify-between pt-3 border-t">
          <div className="flex items-baseline gap-2">
            <span className="font-bold text-slate-900 dark:text-white">
              {formatPrice(course.discountPrice ?? course.price)}
            </span>
            {course.discountPrice && (
              <span className="text-xs text-slate-400 line-through">{formatPrice(course.price)}</span>
            )}
          </div>
          <Button size="sm" className="h-7 text-xs bg-[#F59E0B] hover:bg-amber-600 text-white font-bold" asChild>
            <Link href={`/courses/${course.id}`}>Enroll</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
