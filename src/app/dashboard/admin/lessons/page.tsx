"use client"
import { useState } from "react"
import { Search, Trash2, Loader2 } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import PageHeader from "@/components/common/PageHeader"
import ConfirmDialog from "@/components/common/ConfirmDialog"
import { useGetLessonsQuery, useDeleteLessonMutation } from "@/redux/api/featuresApi/lesson/lesson.api"

export default function AdminLessonsPage() {
  const [search, setSearch] = useState("")
  const [deleteId, setDeleteId] = useState<string | null>(null)

  const { data: lessonsData, isLoading } = useGetLessonsQuery()
  const lessonsList = lessonsData?.data || []

  const [deleteLesson] = useDeleteLessonMutation()

  const filtered = lessonsList.filter((l: any) => (l.title || "").toLowerCase().includes(search.toLowerCase()))

  const handleDelete = async () => {
    if (deleteId) {
      try {
        await deleteLesson({ id: deleteId }).unwrap()
        setDeleteId(null)
      } catch (error) {
        console.error("Failed to delete lesson:", error)
        alert("Failed to delete lesson")
      }
    }
  }

  return (
    <div>
      <PageHeader title="Platform Lessons" description="Manage all lessons uploaded across the platform." />
      <div className="mb-4">
        <Input placeholder="Search lessons..." value={search} onChange={(e) => setSearch(e.target.value)} className="max-w-sm" />
      </div>

      <div className="rounded-xl border bg-white dark:bg-slate-900 overflow-hidden">
        <div className="overflow-x-auto">
          {isLoading ? (
            <div className="flex justify-center p-12"><Loader2 className="w-8 h-8 animate-spin text-[#0075FD]" /></div>
          ) : (
            <table className="w-full text-sm">
              <thead className="bg-slate-50 dark:bg-slate-800">
                <tr>
                  {["Lesson Title", "Course", "Type", "Duration", "Free Preview", "Actions"].map((h) => (
                    <th key={h} className="text-left px-4 py-3 text-xs font-medium text-slate-500 uppercase tracking-wider whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y">
                {filtered.map((l: any) => (
                  <tr key={l.id || l.documentId} className="hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                    <td className="px-4 py-3 font-medium text-slate-900 dark:text-white">{l.title}</td>
                    <td className="px-4 py-3 text-slate-600 dark:text-slate-400 max-w-[200px] truncate">{l.course?.title || "Unknown"}</td>
                    <td className="px-4 py-3 text-slate-600 dark:text-slate-400 capitalize">{l.type || "video"}</td>
                    <td className="px-4 py-3 text-slate-600 dark:text-slate-400">{l.durationMinutes || 0}m</td>
                    <td className="px-4 py-3">
                      <span className={`text-xs px-2 py-0.5 rounded-full ${l.isFree ? "bg-blue-100 text-amber-700" : "bg-gray-100 text-gray-600"}`}>{l.isFree ? "Yes" : "No"}</span>
                    </td>
                    <td className="px-4 py-3">
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500 hover:text-red-700" onClick={() => setDeleteId(l.documentId || l.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
      <ConfirmDialog open={!!deleteId} onClose={() => setDeleteId(null)} onConfirm={handleDelete} title="Delete Lesson?" description="Are you sure you want to delete this lesson?" />
    </div>
  )
}
