"use client"
import Link from "next/link"
import { useMemo } from "react"
import { ArrowRight, BookOpen, Loader2 } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import PageHeader from "@/components/common/PageHeader"
import EmptyState from "@/components/common/EmptyState"
import { useGetEnrollmentsQuery } from "@/redux/api/featuresApi/enrollment/enrollment.api"
import { useAppSelector } from "@/redux/hooks"

function CourseProgressCard({ e }: { e: any }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 flex gap-4 items-start hover:shadow-md transition-shadow">
      <img src={e.courseThumbnail} alt={e.courseTitle} className="h-20 w-28 rounded-lg object-cover shrink-0" />
      <div className="flex-1 min-w-0">
        <p className="font-semibold text-slate-900 text-sm line-clamp-2 mb-1 leading-snug">{e.courseTitle}</p>
        <p className="text-xs text-slate-500 mb-3">by {e.instructorName}</p>
        <div className="flex items-center gap-2 mb-3">
          <Progress value={e.progress} className="h-2 flex-1 [&>div]:bg-[#0075FD]" />
          <span className="text-xs font-semibold text-slate-700">{e.progress}%</span>
        </div>
        <p className="text-xs text-slate-500">{e.completedLessons}/{e.totalLessons} lessons completed</p>
      </div>
      <Button size="sm" className="h-8 text-xs bg-[#0075FD] hover:bg-blue-600 text-white font-bold gap-1 shrink-0 cursor-pointer" asChild>
        <Link href={`/dashboard/student/courses/${e.courseId}`}>Continue <ArrowRight className="h-3 w-3 text-white" /></Link>
      </Button>
    </div>
  )
}

export default function StudentCoursesPage() {
  const currentUser = useAppSelector((state) => state.auth.user)
  const { data: apiData, isLoading } = useGetEnrollmentsQuery(
    currentUser?.id ? { studentId: currentUser.id } : undefined
  )

  const all = useMemo(() => {
    if (apiData?.data) {
      return apiData.data.map((item) => ({
        id: String(item.documentId || item.id),
        courseId: String(item.course?.documentId || item.course?.id || "1"),
        courseTitle: item.course?.title || "CPS LMS Enrolled Course",
        courseThumbnail: item.course?.thumbnail_url || "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop&q=80",
        instructorName: "CPS Instructor",
        progress: item.status === "completed" ? 100 : 45,
        completedLessons: item.status === "completed" ? 12 : 5,
        totalLessons: 12,
        status: item.status || "active",
      }))
    }
    return []
  }, [apiData])

  const active = useMemo(() => all.filter((e) => e.status === "active"), [all])
  const completed = useMemo(() => all.filter((e) => e.status === "completed"), [all])
  const dropped = useMemo(() => all.filter((e) => e.status === "dropped"), [all])

  return (
    <div>
      <PageHeader title="My Courses" description="Track your enrolled courses and continue learning." />
      {isLoading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-8 h-8 animate-spin text-[#0075FD]" />
        </div>
      ) : (
        <Tabs defaultValue="all">
          <TabsList className="mb-6">
            <TabsTrigger value="all">All ({all.length})</TabsTrigger>
            <TabsTrigger value="active">Active ({active.length})</TabsTrigger>
            <TabsTrigger value="completed">Completed ({completed.length})</TabsTrigger>
            <TabsTrigger value="dropped">Dropped ({dropped.length})</TabsTrigger>
          </TabsList>
          {[
            { value: "all", list: all },
            { value: "active", list: active },
            { value: "completed", list: completed },
            { value: "dropped", list: dropped },
          ].map(({ value, list }) => (
            <TabsContent key={value} value={value}>
              {list.length > 0 ? (
                <div className="space-y-4">
                  {list.map((e) => <CourseProgressCard key={e.id} e={e} />)}
                </div>
              ) : (
                <EmptyState icon={BookOpen} title="No courses here" description="Browse our catalog to find your next course." action={<Button asChild className="bg-[#0075FD] hover:bg-blue-600 text-white font-bold"><Link href="/courses">Browse Courses</Link></Button>} />
              )}
            </TabsContent>
          ))}
        </Tabs>
      )}
    </div>
  )
}
