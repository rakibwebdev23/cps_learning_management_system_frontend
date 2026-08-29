"use client"
import Link from "next/link"
import { useState } from "react"
import Image from "next/image"
import { Plus, Eye, Edit, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import PageHeader from "@/components/common/PageHeader"
import ConfirmDialog from "@/components/common/ConfirmDialog"
import StatusBadge from "@/components/common/StatusBadge"
import { blogs } from "@/data/blogs"
import { formatDate } from "@/lib/utils"

export default function ContentManagerBlogsPage() {
  const [search, setSearch] = useState("")
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const filtered = blogs.filter((b) => b.title.toLowerCase().includes(search.toLowerCase()))

  return (
    <div>
      <PageHeader
        title="Blog Posts"
        description="Create and publish blog articles for marketing."
        actions={
          <Button className="gap-2 bg-[#F59E0B] hover:bg-amber-600 text-white font-bold" asChild>
            <Link href="/dashboard/content-manager/blogs/create"><Plus className="h-4 w-4" />New Post</Link>
          </Button>
        }
      />
      <div className="mb-4">
        <Input placeholder="Search blogs..." value={search} onChange={(e) => setSearch(e.target.value)} className="max-w-sm" />
      </div>

      <div className="rounded-xl border bg-white overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50">
              <tr>
                {["Post Title", "Category", "Author", "Views", "Status", "Date", "Actions"].map((h) => (
                  <th key={h} className="text-left px-4 py-3 text-xs font-medium text-slate-500 uppercase tracking-wider whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y">
              {filtered.map((b) => (
                <tr key={b.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="relative h-10 w-16 rounded-lg overflow-hidden shrink-0">
                        <Image src={b.featuredImage} alt={b.title} fill className="object-cover" sizes="64px" />
                      </div>
                      <p className="font-medium text-slate-900 line-clamp-1">{b.title}</p>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{b.category}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{b.authorName}</td>
                  <td className="px-4 py-3 text-slate-600">{b.viewCount.toLocaleString()}</td>
                  <td className="px-4 py-3"><StatusBadge status={b.status} /></td>
                  <td className="px-4 py-3 text-slate-500 whitespace-nowrap">{formatDate(b.createdAt)}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1">
                      <Button variant="ghost" size="icon" className="h-8 w-8" asChild>
                        <Link href={`/blog/${b.id}`} target="_blank"><Eye className="h-4 w-4" /></Link>
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8" asChild>
                        <Link href={`/dashboard/content-manager/blogs/${b.id}/edit`}><Edit className="h-4 w-4" /></Link>
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500 hover:text-red-700" onClick={() => setDeleteId(b.id)}>
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
        onConfirm={() => { console.log("Delete blog:", deleteId); setDeleteId(null) }}
        title="Delete Blog Post?"
        description="This will permanently remove the article from the platform."
      />
    </div>
  )
}
