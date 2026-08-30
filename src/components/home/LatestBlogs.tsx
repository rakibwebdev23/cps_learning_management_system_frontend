"use client"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Clock, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useGetBlogPostsQuery } from "@/redux/api/featuresApi/blog/blog.api"
import { formatDate, getValidImageUrl } from "@/lib/utils"

export default function LatestBlogs() {
  const { data, isLoading } = useGetBlogPostsQuery()
  const posts = (data?.data || [])
    .filter((p: any) => p.status === "published")
    .reverse()
    .slice(0, 3)

  return (
    <section className="py-20 bg-white dark:bg-slate-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
          <div>
            <p className="text-sm font-medium text-[#0075FD] mb-2 uppercase tracking-wider">Latest Insights</p>
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white">From the Blog</h2>
          </div>
          <Button variant="outline" asChild>
            <Link href="/blog" className="gap-2 shrink-0">View All Posts <ArrowRight className="h-4 w-4" /></Link>
          </Button>
        </div>
        
        {isLoading ? (
          <div className="flex justify-center py-10"><Loader2 className="w-8 h-8 animate-spin text-[#0075FD]" /></div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {posts.map((post: any) => (
              <Link key={post.id || post.documentId} href={`/blog/${post.documentId || post.id}`} className="group block">
                <div className="rounded-xl border overflow-hidden hover:shadow-md transition-shadow">
                  <div className="relative h-48 overflow-hidden bg-slate-100">
                    <Image src={getValidImageUrl(post.featuredImage)} alt={post.title} fill className="object-cover group-hover:scale-105 transition-transform duration-300" sizes="(max-width: 768px) 100vw, 33vw" />
                  </div>
                  <div className="p-5">
                    <span className="text-xs text-[#0075FD] font-medium">{post.category || "Uncategorized"}</span>
                    <h3 className="font-semibold text-slate-900 dark:text-white mt-1 mb-2 line-clamp-2 group-hover:text-[#0075FD] transition-colors leading-snug">{post.title}</h3>
                    <p className="text-xs text-slate-500 line-clamp-2 mb-3">{post.excerpt || ""}</p>
                    <div className="flex items-center justify-between text-xs text-slate-400">
                      <span>{post.author?.username || post.author?.name || "Unknown"}</span>
                      <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{formatDate(post.createdAt || new Date().toISOString())}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
