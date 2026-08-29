import Link from "next/link"
import Image from "next/image"
import { CheckCircle2, BookOpen, LayoutDashboard } from "lucide-react"
import { Button } from "@/components/ui/button"
import { getCourseById } from "@/data/courses"

const course = getCourseById("c1")!

export default function CheckoutSuccessPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-2xl border shadow-sm p-8 text-center">
        <div className="h-20 w-20 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-5">
          <CheckCircle2 className="h-10 w-10 text-emerald-600" />
        </div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Payment Successful!</h1>
        <p className="text-slate-500 text-sm mb-6">Congratulations! You now have full access to your course.</p>

        {/* course preview */}
        <div className="flex items-center gap-4 bg-slate-50 dark:bg-slate-800 rounded-xl p-4 mb-6 text-left">
          <div className="relative h-14 w-20 rounded-lg overflow-hidden shrink-0">
            <Image src={course.thumbnail} alt={course.title} fill className="object-cover" sizes="80px" />
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-900 dark:text-white line-clamp-2 leading-snug">{course.title}</p>
            <p className="text-xs text-slate-500 mt-0.5">Lifetime access · {course.lessonCount} lessons</p>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <Button className="w-full bg-[#F59E0B] hover:bg-amber-600 text-white font-bold gap-2" asChild>
            <Link href={`/dashboard/student/courses/${course.id}`}>
              <BookOpen className="h-4 w-4" /> Start Learning
            </Link>
          </Button>
          <Button variant="outline" className="w-full gap-2" asChild>
            <Link href="/dashboard/student">
              <LayoutDashboard className="h-4 w-4" /> Go to Dashboard
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
