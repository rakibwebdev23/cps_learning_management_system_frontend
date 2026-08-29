"use client"
import Link from "next/link"
import { useState, useMemo } from "react"
import Image from "next/image"
import { Plus, Eye, Edit, Trash2, Copy, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import PageHeader from "@/components/common/PageHeader"
import ConfirmDialog from "@/components/common/ConfirmDialog"
import StatusBadge from "@/components/common/StatusBadge"
import { useGetCoursesQuery, useDeleteCourseMutation } from "@/redux/api/featuresApi/course/course.api"
import { getCoursesByInstructor } from "@/data/courses"
import { formatDate } from "@/lib/utils"

export default function InstructorCoursesPage() {
  const [search, setSearch] = useState("")
  const [deleteId, setDeleteId] = useState<string | null>(null)

  const { data: apiData, isLoading } = useGetCoursesQuery({ search })
  const [deleteCourse, { isLoading: isDeleting }] = useDeleteCourseMutation()

  const allCourses = useMemo(() => {
    if (apiData?.data && apiData.data.length > 0) {
      return apiData.data.map((c) => ({
        id: String(c.documentId || c.id),
        title: c.title,
        thumbnail: c.thumbnail_url || "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop&q=80",
        level: "intermediate",
        studentCount: 140,
        lessonCount: c.lessonCount || 8,
        status: "published" as const,
        createdAt: c.createdAt || new Date().toISOString(),
      }))
    }
    return getCoursesByInstructor("u3")
  }, [apiData])

  const filtered = useMemo(() => {
    return allCourses.filter((c) => c.title.toLowerCase().includes(search.toLowerCase()))
  }, [allCourses, search])

  const handleDelete = async () => {
    if (!deleteId) return
    try {
      await deleteCourse({ id: deleteId }).unwrap()
    } catch (e) {
      console.error("Delete course error:", e)
    } finally {
      setDeleteId(null)
    }
  }

  return (
    <div>
      <PageHeader
        title="My Courses"
        description="Manage all your course content and students."
        actions={
          <Button className="gap-2 bg-[#F59E0B] hover:bg-amber-600 text-white font-bold cursor-pointer" asChild>
            <Link href="/dashboard/instructor/courses/create"><Plus className="h-4 w-4 text-white" />Create Course</Link>
          </Button>
        }
      />

      <div className="mb-4">
        <Input
          placeholder="Search courses..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-sm"
        />
      </div>

      <div className="rounded-xl border border-slate-200 bg-white overflow-hidden shadow-sm">
        {isLoading ? (
          <div className="flex items-center justify-center py-16">
            <Loader2 className="w-8 h-8 animate-spin text-[#F59E0B]" />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-50">
                <tr>
                  {["Course", "Students", "Lessons", "Status", "Created", "Actions"].map((h) => (
                    <th key={h} className="text-left px-4 py-3 text-xs font-medium text-slate-500 uppercase tracking-wider whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.map((course) => (
                  <tr key={course.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="relative h-10 w-16 rounded-lg overflow-hidden shrink-0">
                          <Image src={course.thumbnail} alt={course.title} fill className="object-cover" sizes="64px" />
                        </div>
                        <div className="min-w-0">
                          <p className="font-medium text-slate-900 line-clamp-1">{course.title}</p>
                          <p className="text-xs text-slate-500 capitalize">{course.level}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-slate-600">{course.studentCount.toLocaleString()}</td>
                    <td className="px-4 py-3 text-slate-600">{course.lessonCount}</td>
                    <td className="px-4 py-3"><StatusBadge status={course.status} /></td>
                    <td className="px-4 py-3 text-slate-500 whitespace-nowrap">{formatDate(course.createdAt)}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1">
                        <Button variant="ghost" size="icon" className="h-8 w-8 cursor-pointer" asChild>
                          <Link href={`/dashboard/instructor/courses/${course.id}`}><Eye className="h-4 w-4" /></Link>
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 cursor-pointer" asChild>
                          <Link href={`/dashboard/instructor/courses/${course.id}/edit`}><Edit className="h-4 w-4" /></Link>
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 cursor-pointer"><Copy className="h-4 w-4" /></Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500 hover:text-red-700 cursor-pointer" onClick={() => setDeleteId(course.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filtered.length === 0 && (
              <div className="text-center py-12 text-slate-400 text-sm">No courses found.</div>
            )}
          </div>
        )}
      </div>

      <ConfirmDialog
        open={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={handleDelete}
        title="Delete Course?"
        description="This will permanently delete the course and all its content. This action cannot be undone."
      />
    </div>
  )
}
