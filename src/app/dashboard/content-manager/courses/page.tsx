"use client"
import Link from "next/link"
import { useState } from "react"
import Image from "next/image"
import { Search, Eye, Edit, Trash2, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import PageHeader from "@/components/common/PageHeader"
import ConfirmDialog from "@/components/common/ConfirmDialog"
import StatusBadge from "@/components/common/StatusBadge"
import { formatDate, getValidImageUrl } from "@/lib/utils"
import { useGetCoursesQuery, useDeleteCourseMutation } from "@/redux/api/featuresApi/course/course.api"

export default function ContentManagerCoursesPage() {
  const [search, setSearch] = useState("")
  const [deleteId, setDeleteId] = useState<string | null>(null)

  const { data: coursesData, isLoading } = useGetCoursesQuery()
  const coursesList = coursesData?.data || []

  const [deleteCourse] = useDeleteCourseMutation()

  const filtered = coursesList.filter((c: any) => (c.title || "").toLowerCase().includes(search.toLowerCase()))

  const handleDelete = async () => {
    if (deleteId) {
      try {
        await deleteCourse({ id: deleteId }).unwrap()
        setDeleteId(null)
      } catch (error) {
        console.error("Failed to delete course:", error)
        alert("Failed to delete course")
      }
    }
  }

  return (
    <div>
      <PageHeader title="All Courses" description="Manage all platform courses and publish statuses." />
      <div className="mb-4">
        <Input
          placeholder="Search courses..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-sm"
        />
      </div>

      <div className="rounded-xl border bg-white dark:bg-slate-900 overflow-hidden">
        <div className="overflow-x-auto">
          {isLoading ? (
            <div className="flex justify-center p-12"><Loader2 className="w-8 h-8 animate-spin text-[#0075FD]" /></div>
          ) : (
            <table className="w-full text-sm">
              <thead className="bg-slate-50 dark:bg-slate-800">
                <tr>
                  {["Course", "Instructor", "Category", "Level", "Status", "Created", "Actions"].map((h) => (
                    <th key={h} className="text-left px-4 py-3 text-xs font-medium text-slate-500 uppercase tracking-wider whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y">
                {filtered.map((course: any) => (
                  <tr key={course.id || course.documentId} className="hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="relative h-10 w-16 rounded-lg overflow-hidden shrink-0 bg-slate-100">
                          {course.thumbnail_url && <Image src={getValidImageUrl(course.thumbnail_url)} alt={course.title} fill className="object-cover" sizes="64px" />}
                        </div>
                        <p className="font-medium text-slate-900 dark:text-white line-clamp-1">{course.title}</p>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-slate-600 dark:text-slate-400 whitespace-nowrap">{course.instructor?.username || course.instructor?.name || "Unknown"}</td>
                    <td className="px-4 py-3 text-slate-600 dark:text-slate-400 whitespace-nowrap">{course.category || "Uncategorized"}</td>
                    <td className="px-4 py-3 text-slate-600 dark:text-slate-400 capitalize">{course.level || "beginner"}</td>
                    <td className="px-4 py-3"><StatusBadge status={course.status || "active"} /></td>
                    <td className="px-4 py-3 text-slate-500 whitespace-nowrap">{formatDate(course.createdAt || new Date().toISOString())}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1">
                        <Button variant="ghost" size="icon" className="h-8 w-8" asChild>
                          <Link href={`/courses/${course.documentId || course.id}`} target="_blank"><Eye className="h-4 w-4" /></Link>
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500 hover:text-red-700" onClick={() => setDeleteId(course.documentId || course.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      <ConfirmDialog
        open={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={handleDelete}
        title="Delete Course?"
        description="This will permanently delete the course and all associated lessons."
      />
    </div>
  )
}