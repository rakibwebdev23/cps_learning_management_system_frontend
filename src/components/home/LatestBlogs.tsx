import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { getPublishedBlogs } from "@/data/blogs"
import { formatDate } from "@/lib/utils"

export default function LatestBlogs() {
  const posts = getPublishedBlogs().slice(0, 3)
  return (
    <section className="py-20 bg-white dark:bg-slate-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
          <div>
            <p className="text-sm font-medium text-amber-600 mb-2">Latest Insights</p>
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white">From the Blog</h2>
          </div>
          <Button variant="outline" asChild>
            <Link href="/blog" className="gap-2 shrink-0">View All Posts <ArrowRight className="h-4 w-4" /></Link>
          </Button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {posts.map((post) => (
            <Link key={post.id} href={`/blog/${post.id}`} className="group block">
              <div className="rounded-xl border overflow-hidden hover:shadow-md transition-shadow">
                <div className="relative h-48 overflow-hidden">
                  <Image src={post.featuredImage} alt={post.title} fill className="object-cover group-hover:scale-105 transition-transform duration-300" sizes="(max-width: 768px) 100vw, 33vw" />
                </div>
                <div className="p-5">
                  <span className="text-xs text-amber-600 font-medium">{post.category}</span>
                  <h3 className="font-semibold text-slate-900 dark:text-white mt-1 mb-2 line-clamp-2 group-hover:text-amber-600 transition-colors leading-snug">{post.title}</h3>
                  <p className="text-xs text-slate-500 line-clamp-2 mb-3">{post.excerpt}</p>
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span>{post.authorName}</span>
                    <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{formatDate(post.createdAt)}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
