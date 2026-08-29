import Image from "next/image"
import Link from "next/link"
import { Clock, Eye, ArrowRight } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { getPublishedBlogs } from "@/data/blogs"
import { formatDate } from "@/lib/utils"

export default function BlogPage() {
  const posts = getPublishedBlogs()
  return (
    <div className="bg-white dark:bg-slate-900 min-h-screen">
      <div className="bg-slate-900 text-white py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold mb-2">CPS LMS Blog</h1>
          <p className="text-slate-400">Expert insights on technology, design, and professional development.</p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        {/* featured post */}
        {posts[0] && (
          <Link href={`/blog/${posts[0].id}`} className="group block mb-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 rounded-xl border overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative h-72 lg:h-auto">
                <Image src={posts[0].featuredImage} alt={posts[0].title} fill className="object-cover group-hover:scale-105 transition-transform duration-300" sizes="(max-width: 1024px) 100vw, 50vw" />
              </div>
              <div className="p-8 flex flex-col justify-center">
                <Badge className="w-fit mb-3 bg-amber-100 text-amber-700 border-0">{posts[0].category}</Badge>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-amber-600 transition-colors leading-snug">{posts[0].title}</h2>
                <p className="text-slate-500 mb-4 leading-relaxed">{posts[0].excerpt}</p>
                <div className="flex items-center gap-4 text-sm text-slate-400">
                  <span>{posts[0].authorName}</span>
                  <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" />{formatDate(posts[0].createdAt)}</span>
                  <span className="flex items-center gap-1"><Eye className="h-3.5 w-3.5" />{posts[0].viewCount.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </Link>
        )}

        {/* grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.slice(1).map((post) => (
            <Link key={post.id} href={`/blog/${post.id}`} className="group block">
              <div className="rounded-xl border overflow-hidden hover:shadow-md transition-shadow h-full flex flex-col">
                <div className="relative h-48 overflow-hidden">
                  <Image src={post.featuredImage} alt={post.title} fill className="object-cover group-hover:scale-105 transition-transform duration-300" sizes="(max-width: 768px) 100vw, 33vw" />
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <Badge className="w-fit mb-2 text-xs bg-slate-100 text-slate-600 border-0">{post.category}</Badge>
                  <h3 className="font-semibold text-slate-900 dark:text-white mb-2 line-clamp-2 group-hover:text-amber-600 transition-colors leading-snug flex-1">{post.title}</h3>
                  <p className="text-xs text-slate-500 line-clamp-2 mb-3">{post.excerpt}</p>
                  <div className="flex items-center justify-between text-xs text-slate-400 pt-3 border-t">
                    <span>{post.authorName}</span>
                    <span>{formatDate(post.createdAt)}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
