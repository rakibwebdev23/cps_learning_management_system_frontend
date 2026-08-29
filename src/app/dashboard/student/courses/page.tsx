"use client"
import Link from "next/link"
import { useState } from "react"
import { ArrowRight } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import PageHeader from "@/components/common/PageHeader"
import EmptyState from "@/components/common/EmptyState"
import { getEnrollmentsByStudent } from "@/data/enrollments"
import type { Enrollment } from "@/types/enrollment"
import { BookOpen } from "lucide-react"

const STUDENT_ID = "u6"

function CourseProgressCard({ e }: { e: Enrollment }) {
  return (
    <div className="rounded-xl border bg-white p-4 flex gap-4 items-start hover:shadow-md transition-shadow">
      <img src={e.courseThumbnail} alt={e.courseTitle} className="h-20 w-28 rounded-lg object-cover shrink-0" />
      <div className="flex-1 min-w-0">
        <p className="font-semibold text-slate-900 text-sm line-clamp-2 mb-1 leading-snug">{e.courseTitle}</p>
        <p className="text-xs text-slate-500 mb-3">by {e.instructorName}</p>
        <div className="flex items-center gap-2 mb-3">
          <Progress value={e.progress} className="h-2 flex-1" />
          <span className="text-xs font-semibold text-slate-700">{e.progress}%</span>
        </div>
        <p className="text-xs text-slate-500">{e.completedLessons}/{e.totalLessons} lessons completed</p>
      </div>
      <Button size="sm" className="h-8 text-xs bg-[#F59E0B] hover:bg-amber-600 text-white font-bold gap-1 shrink-0" asChild>
        <Link href={`/dashboard/student/courses/${e.courseId}`}>Continue <ArrowRight className="h-3 w-3 text-white" /></Link>
      </Button>
    </div>
  )
}

export default function StudentCoursesPage() {
  const all = getEnrollmentsByStudent(STUDENT_ID)
  const active = all.filter((e) => e.status === "active")
  const completed = all.filter((e) => e.status === "completed")
  const dropped = all.filter((e) => e.status === "dropped")

  return (
    <div>
      <PageHeader title="My Courses" description="Track your enrolled courses and continue learning." />
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
              <EmptyState icon={BookOpen} title="No courses here" description="Browse our catalog to find your next course." action={<Button asChild className="bg-[#F59E0B] hover:bg-amber-600 text-white font-bold"><Link href="/courses">Browse Courses</Link></Button>} />
            )}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}
