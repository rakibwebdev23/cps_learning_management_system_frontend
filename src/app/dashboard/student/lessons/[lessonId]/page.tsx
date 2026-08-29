"use client"
import { notFound } from "next/navigation"
import { use, useState } from "react"
import Link from "next/link"
import { ChevronLeft, ChevronRight, CheckCircle2, Clock, PlayCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { getLessonById } from "@/data/lessons"
import { getLessonsByCourse } from "@/data/lessons"
import { cn } from "@/lib/utils"

export default function LessonPlayerPage({ params }: { params: Promise<{ lessonId: string }> }) {
  const { lessonId } = use(params)
  const lesson = getLessonById(lessonId)
  if (!lesson) notFound()

  const allLessons = getLessonsByCourse(lesson.courseId)
  const currentIdx = allLessons.findIndex((l) => l.id === lessonId)
  const prev = allLessons[currentIdx - 1]
  const next = allLessons[currentIdx + 1]
  const [marked, setMarked] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(true)

  return (
    <div className="flex h-full min-h-[calc(100vh-8rem)] gap-0">
      {/* main */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* video */}
        <div className="bg-black aspect-video w-full flex items-center justify-center">
          {lesson.videoUrl ? (
            <iframe src={lesson.videoUrl} className="w-full h-full" allowFullScreen title={lesson.title} />
          ) : (
            <div className="flex flex-col items-center gap-3 text-white">
              <PlayCircle className="h-16 w-16 opacity-40" />
              <p className="text-sm opacity-60">Video not available for this lesson</p>
            </div>
          )}
        </div>

        {/* lesson content */}
        <div className="flex-1 overflow-y-auto p-6">
          <h1 className="text-xl font-bold text-slate-900 mb-2">{lesson.title}</h1>
          <div className="flex items-center gap-4 text-sm text-slate-500 mb-5">
            <span className="flex items-center gap-1"><Clock className="h-4 w-4" />{lesson.durationMinutes} minutes</span>
            <span className="capitalize">{lesson.type}</span>
          </div>
          <p className="text-slate-600 leading-relaxed">{lesson.content}</p>

          {/* nav */}
          <div className="flex items-center justify-between mt-8 pt-5 border-t">
            <Button variant="outline" disabled={!prev} asChild={!!prev}>
              {prev ? <Link href={`/dashboard/student/lessons/${prev.id}`} className="gap-2"><ChevronLeft className="h-4 w-4" />Previous</Link> : <span className="gap-2"><ChevronLeft className="h-4 w-4" />Previous</span>}
            </Button>
            <Button
              onClick={() => setMarked(true)}
              className={cn("gap-2", marked ? "bg-emerald-600 hover:bg-emerald-700" : "bg-[#F59E0B] hover:bg-amber-600", "text-white font-bold")}
            >
              <CheckCircle2 className="h-4 w-4 text-white" />
              {marked ? "Completed!" : "Mark Complete"}
            </Button>
            <Button variant="outline" disabled={!next} asChild={!!next}>
              {next ? <Link href={`/dashboard/student/lessons/${next.id}`} className="gap-2">Next<ChevronRight className="h-4 w-4" /></Link> : <span className="gap-2">Next<ChevronRight className="h-4 w-4" /></span>}
            </Button>
          </div>
        </div>
      </div>

      {/* curriculum sidebar */}
      {sidebarOpen && (
        <div className="hidden lg:flex flex-col w-72 border-l bg-white overflow-y-auto">
          <div className="p-4 border-b font-semibold text-sm text-slate-900">Course Curriculum</div>
          <div className="divide-y">
            {allLessons.map((l, i) => (
              <Link
                key={l.id}
                href={`/dashboard/student/lessons/${l.id}`}
                className={cn("flex items-center gap-3 px-4 py-3 text-xs transition-colors hover:bg-slate-50", l.id === lessonId && "bg-amber-50 text-amber-700")}
              >
                <div className={cn("flex h-6 w-6 items-center justify-center rounded-full shrink-0 text-[10px] font-bold", l.id === lessonId ? "bg-[#F59E0B] text-white" : i < currentIdx ? "bg-emerald-100 text-emerald-600" : "bg-slate-100 text-slate-500")}>
                  {i < currentIdx ? "✓" : i + 1}
                </div>
                <span className="line-clamp-2 leading-snug">{l.title}</span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
