"use client"
import { useMemo } from "react"
import Image from "next/image"
import Link from "next/link"
import { Clock, Eye, Loader2 } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { formatDate, getValidImageUrl } from "@/lib/utils"
import { useGetBlogPostsQuery } from "@/redux/api/featuresApi/blog/blog.api"

export default function BlogPage() {
  const { data: apiData, isLoading } = useGetBlogPostsQuery()

  const posts = useMemo(() => {
    if (apiData?.data) {
      return apiData.data.map((b) => ({
        id: String(b.documentId || b.id),
        title: b.title,
        excerpt: b.body?.substring(0, 140) || "Insights from CPS LMS learning platform...",
        category: "Education",
        featuredImage: getValidImageUrl(b.cover_image_url),
        authorName: b.author?.username || "CPS Team",
        viewCount: 240,
        createdAt: b.createdAt || new Date().toISOString(),
      }))
    }
    return []
  }, [apiData])

  return (
    <div className="bg-white min-h-screen">
      <div className="bg-white border-b border-slate-100 text-slate-900 pt-20 pb-6">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-extrabold text-black tracking-tight mb-2">CPS LMS Blog</h1>
          <p className="text-slate-600 font-medium">Expert insights on technology, design, and professional development.</p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-[#0075FD]" />
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-20 text-slate-500">No blog posts found.</div>
        ) : (
          <>
            {posts[0] && (
              <Link href={`/blog/${posts[0].id}`} className="group block mb-12 cursor-pointer">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 border border-slate-200 overflow-hidden hover:shadow-lg transition-shadow bg-white">
                  <div className="relative h-72 lg:h-auto">
                    <Image src={getValidImageUrl(posts[0].featuredImage)} alt={posts[0].title} fill className="object-cover group-hover:scale-105 transition-transform duration-300" sizes="(max-width: 1024px) 100vw, 50vw" />
                  </div>
                  <div className="p-8 flex flex-col justify-center">
                    <Badge className="w-fit mb-3 bg-blue-50 text-[#0075FD] border-0 font-bold">{posts[0].category}</Badge>
                    <h2 className="text-2xl font-extrabold text-black mb-3 group-hover:text-[#0075FD] transition-colors leading-snug">{posts[0].title}</h2>
                    <p className="text-gray-700 mb-4 leading-relaxed font-medium">{posts[0].excerpt}</p>
                    <div className="flex items-center gap-4 text-sm text-gray-700 font-medium">
                      <span className="font-bold text-black">{posts[0].authorName}</span>
                      <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5 text-gray-700" />{formatDate(posts[0].createdAt)}</span>
                      <span className="flex items-center gap-1"><Eye className="h-3.5 w-3.5 text-gray-700" />{posts[0].viewCount.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </Link>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.slice(1).map((post) => (
                <Link key={post.id} href={`/blog/${post.id}`} className="group block cursor-pointer">
                  <div className="border border-slate-200 overflow-hidden hover:shadow-md transition-shadow h-full flex flex-col bg-white">
                    <div className="relative h-48 overflow-hidden">
                      <Image src={getValidImageUrl(post.featuredImage)} alt={post.title} fill className="object-cover group-hover:scale-105 transition-transform duration-300" sizes="(max-width: 768px) 100vw, 33vw" />
                    </div>
                    <div className="p-5 flex flex-col flex-1">
                      <Badge className="w-fit mb-2 text-xs bg-slate-100 text-slate-700 border-0 font-medium">{post.category}</Badge>
                      <h3 className="font-bold text-black text-base mb-2 line-clamp-2 group-hover:text-[#0075FD] transition-colors leading-snug flex-1">{post.title}</h3>
                      <p className="text-xs text-gray-700 line-clamp-2 mb-3 font-medium">{post.excerpt}</p>
                      <div className="flex items-center justify-between text-xs text-gray-700 font-medium pt-3 border-t border-slate-100">
                        <span className="font-bold text-black">{post.authorName}</span>
                        <span>{formatDate(post.createdAt)}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
