"use client"
import { useState } from "react"
import Image from "next/image"
import { Search, Trash2, Eye } from "lucide-react"
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import PageHeader from "@/components/common/PageHeader"
import ConfirmDialog from "@/components/common/ConfirmDialog"
import StatusBadge from "@/components/common/StatusBadge"
import { courses as initialCourses } from "@/data/courses"
import { formatDate, formatPrice } from "@/lib/utils"

export default function AdminCoursesPage() {
  const [search, setSearch] = useState("")
  const [coursesList, setCoursesList] = useState(initialCourses)
  const [deleteId, setDeleteId] = useState<string | null>(null)

  const filtered = coursesList.filter((c) => c.title.toLowerCase().includes(search.toLowerCase()))

  const handleDelete = () => {
    if (deleteId) {
      setCoursesList((prev) => prev.filter((c) => c.id !== deleteId))
      setDeleteId(null)
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
          <table className="w-full text-sm">
            <thead className="bg-slate-50 dark:bg-slate-800">
              <tr>
                {["Course Title", "Instructor", "Category", "Price", "Students", "Status", "Actions"].map((h) => (
                  <th key={h} className="text-left px-4 py-3 text-xs font-medium text-slate-500 uppercase tracking-wider whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y">
              {filtered.map((c) => (
                <tr key={c.id} className="hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="relative h-10 w-16 rounded-lg overflow-hidden shrink-0">
                        <Image src={c.thumbnail} alt={c.title} fill className="object-cover" sizes="64px" />
                      </div>
                      <p className="font-medium text-slate-900 dark:text-white line-clamp-1">{c.title}</p>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-slate-600 dark:text-slate-400 whitespace-nowrap">{c.instructorName}</td>
                  <td className="px-4 py-3 text-slate-600 dark:text-slate-400 whitespace-nowrap">{c.category}</td>
                  <td className="px-4 py-3 text-slate-900 dark:text-white font-semibold">{formatPrice(c.discountPrice ?? c.price)}</td>
                  <td className="px-4 py-3 text-slate-600 dark:text-slate-400">{c.studentCount.toLocaleString()}</td>
                  <td className="px-4 py-3"><StatusBadge status={c.status} /></td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1">
                      <Button variant="ghost" size="icon" className="h-8 w-8" asChild>
                        <Link href={`/courses/${c.id}`} target="_blank"><Eye className="h-4 w-4" /></Link>
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500 hover:text-red-700" onClick={() => setDeleteId(c.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <ConfirmDialog open={!!deleteId} onClose={() => setDeleteId(null)} onConfirm={handleDelete} title="Delete Course?" description="This will permanently delete the course and all associated data." />
    </div>
  )
}
