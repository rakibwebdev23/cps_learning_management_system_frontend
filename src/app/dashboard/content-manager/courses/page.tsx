"use client"
import Link from "next/link"
import { useState } from "react"
import Image from "next/image"
import { Search, Eye, Edit, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import PageHeader from "@/components/common/PageHeader"
import ConfirmDialog from "@/components/common/ConfirmDialog"
import StatusBadge from "@/components/common/StatusBadge"
import { courses } from "@/data/courses"
import { formatDate } from "@/lib/utils"

export default function ContentManagerCoursesPage() {
  const [search, setSearch] = useState("")
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const filtered = courses.filter((c) => c.title.toLowerCase().includes(search.toLowerCase()))

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
          <table className="w-full text-sm">
            <thead className="bg-slate-50 dark:bg-slate-800">
              <tr>
                {["Course", "Instructor", "Category", "Level", "Status", "Created", "Actions"].map((h) => (
                  <th key={h} className="text-left px-4 py-3 text-xs font-medium text-slate-500 uppercase tracking-wider whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y">
              {filtered.map((course) => (
                <tr key={course.id} className="hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="relative h-10 w-16 rounded-lg overflow-hidden shrink-0">
                        <Image src={course.thumbnail} alt={course.title} fill className="object-cover" sizes="64px" />
                      </div>
                      <p className="font-medium text-slate-900 dark:text-white line-clamp-1">{course.title}</p>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-slate-600 dark:text-slate-400 whitespace-nowrap">{course.instructorName}</td>
                  <td className="px-4 py-3 text-slate-600 dark:text-slate-400 whitespace-nowrap">{course.category}</td>
                  <td className="px-4 py-3 text-slate-600 dark:text-slate-400 capitalize">{course.level}</td>
                  <td className="px-4 py-3"><StatusBadge status={course.status} /></td>
                  <td className="px-4 py-3 text-slate-500 whitespace-nowrap">{formatDate(course.createdAt)}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1">
                      <Button variant="ghost" size="icon" className="h-8 w-8" asChild>
                        <Link href={`/courses/${course.id}`} target="_blank"><Eye className="h-4 w-4" /></Link>
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500 hover:text-red-700" onClick={() => setDeleteId(course.id)}>
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

      <ConfirmDialog
        open={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={() => { console.log("Delete course:", deleteId); setDeleteId(null) }}
        title="Delete Course?"
        description="This will permanently delete the course and all associated lessons."
      />
    </div>
  )
}
