"use client"
import { useState } from "react"
import Image from "next/image"
import { Search, Trash2 } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import PageHeader from "@/components/common/PageHeader"
import ConfirmDialog from "@/components/common/ConfirmDialog"
import StatusBadge from "@/components/common/StatusBadge"
import { blogs } from "@/data/blogs"
import { formatDate } from "@/lib/utils"

export default function AdminBlogsPage() {
  const [search, setSearch] = useState("")
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const filtered = blogs.filter((b) => b.title.toLowerCase().includes(search.toLowerCase()))

  return (
    <div>
      <PageHeader title="Platform Blogs" description="Manage published and draft blog posts." />
      <div className="mb-4">
        <Input placeholder="Search blogs..." value={search} onChange={(e) => setSearch(e.target.value)} className="max-w-sm" />
      </div>

      <div className="rounded-xl border bg-white dark:bg-slate-900 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 dark:bg-slate-800">
              <tr>
                {["Title", "Category", "Author", "Views", "Status", "Date", "Actions"].map((h) => (
                  <th key={h} className="text-left px-4 py-3 text-xs font-medium text-slate-500 uppercase tracking-wider whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y">
              {filtered.map((b) => (
                <tr key={b.id} className="hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="relative h-10 w-16 rounded-lg overflow-hidden shrink-0">
                        <Image src={b.featuredImage} alt={b.title} fill className="object-cover" sizes="64px" />
                      </div>
                      <p className="font-medium text-slate-900 dark:text-white line-clamp-1">{b.title}</p>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-slate-600 dark:text-slate-400 whitespace-nowrap">{b.category}</td>
                  <td className="px-4 py-3 text-slate-600 dark:text-slate-400 whitespace-nowrap">{b.authorName}</td>
                  <td className="px-4 py-3 text-slate-600 dark:text-slate-400">{b.viewCount.toLocaleString()}</td>
                  <td className="px-4 py-3"><StatusBadge status={b.status} /></td>
                  <td className="px-4 py-3 text-slate-500 whitespace-nowrap">{formatDate(b.createdAt)}</td>
                  <td className="px-4 py-3">
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500 hover:text-red-700" onClick={() => setDeleteId(b.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <ConfirmDialog open={!!deleteId} onClose={() => setDeleteId(null)} onConfirm={() => setDeleteId(null)} title="Delete Post?" description="Are you sure you want to delete this blog post?" />
    </div>
  )
}
