"use client"
import { useState } from "react"
import Image from "next/image"
import { Search, Trash2, Eye, Loader2 } from "lucide-react"
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import PageHeader from "@/components/common/PageHeader"
import ConfirmDialog from "@/components/common/ConfirmDialog"
import StatusBadge from "@/components/common/StatusBadge"
import { formatDate, formatPrice, getValidImageUrl } from "@/lib/utils"
import { useGetCoursesQuery, useDeleteCourseMutation } from "@/redux/api/featuresApi/course/course.api"

export default function AdminCoursesPage() {
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
      <PageHeader title="Platform Courses" description="Overview of all courses across all instructors." />
      <div className="mb-4">
        <Input placeholder="Search courses..." value={search} onChange={(e) => setSearch(e.target.value)} className="max-w-sm" />
      </div>

      <div className="rounded-xl border bg-white dark:bg-slate-900 overflow-hidden">
        <div className="overflow-x-auto">
          {isLoading ? (
            <div className="flex justify-center p-12"><Loader2 className="w-8 h-8 animate-spin text-[#0075FD]" /></div>
          ) : (
            <table className="w-full text-sm">
              <thead className="bg-slate-50 dark:bg-slate-800">
                <tr>
                  {["Course Title", "Instructor", "Category", "Price", "Students", "Status", "Actions"].map((h) => (
                    <th key={h} className="text-left px-4 py-3 text-xs font-medium text-slate-500 uppercase tracking-wider whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y">
                {filtered.map((c: any) => (
                  <tr key={c.id || c.documentId} className="hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="relative h-10 w-16 rounded-lg overflow-hidden shrink-0 bg-slate-100">
                          {c.thumbnail_url && <Image src={getValidImageUrl(c.thumbnail_url)} alt={c.title} fill className="object-cover" sizes="64px" />}
                        </div>
                        <p className="font-medium text-slate-900 dark:text-white line-clamp-1">{c.title}</p>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-slate-600 dark:text-slate-400 whitespace-nowrap">{c.instructor?.username || c.instructor?.name || "Unknown"}</td>
                    <td className="px-4 py-3 text-slate-600 dark:text-slate-400 whitespace-nowrap">{c.category || "Uncategorized"}</td>
                    <td className="px-4 py-3 text-slate-900 dark:text-white font-semibold">{formatPrice(c.discountPrice ?? c.price)}</td>
                    <td className="px-4 py-3 text-slate-600 dark:text-slate-400">{(c.enrollments?.length || 0).toLocaleString()}</td>
                    <td className="px-4 py-3"><StatusBadge status={c.status || "active"} /></td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1">
                        <Button variant="ghost" size="icon" className="h-8 w-8" asChild>
                          <Link href={`/courses/${c.documentId || c.id}`} target="_blank"><Eye className="h-4 w-4" /></Link>
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500 hover:text-red-700" onClick={() => setDeleteId(c.documentId || c.id)}>
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

      <ConfirmDialog open={!!deleteId} onClose={() => setDeleteId(null)} onConfirm={handleDelete} title="Delete Course?" description="This will permanently delete the course and all associated data." />
    </div>
  )
}