"use client"
import { useState } from "react"
import { Search, Trash2 } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import PageHeader from "@/components/common/PageHeader"
import ConfirmDialog from "@/components/common/ConfirmDialog"
import { lessons } from "@/data/lessons"

export default function ContentManagerLessonsPage() {
  const [search, setSearch] = useState("")
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const filtered = lessons.filter((l) => l.title.toLowerCase().includes(search.toLowerCase()))

  return (
    <div>
      <PageHeader title="All Lessons" description="Browse and manage lessons across all courses." />
      <div className="mb-4">
        <Input
          placeholder="Search lessons..."
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
                {["Lesson Title", "Type", "Duration", "Order", "Free Preview", "Actions"].map((h) => (
                  <th key={h} className="text-left px-4 py-3 text-xs font-medium text-slate-500 uppercase tracking-wider whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y">
              {filtered.map((l) => (
                <tr key={l.id} className="hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                  <td className="px-4 py-3 font-medium text-slate-900 dark:text-white">{l.title}</td>
                  <td className="px-4 py-3 text-slate-600 dark:text-slate-400 capitalize">{l.type}</td>
                  <td className="px-4 py-3 text-slate-600 dark:text-slate-400">{l.durationMinutes}m</td>
                  <td className="px-4 py-3 text-slate-600 dark:text-slate-400">#{l.order}</td>
                  <td className="px-4 py-3">
                    <span className={`text-xs px-2 py-0.5 rounded-full ${l.isFree ? "bg-amber-100 text-amber-700" : "bg-gray-100 text-gray-600"}`}>
                      {l.isFree ? "Yes" : "No"}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500 hover:text-red-700" onClick={() => setDeleteId(l.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
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
        onConfirm={() => { console.log("Delete lesson:", deleteId); setDeleteId(null) }}
        title="Delete Lesson?"
        description="Are you sure you want to delete this lesson?"
      />
    </div>
  )
}
