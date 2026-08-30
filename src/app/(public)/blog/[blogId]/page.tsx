"use client"
import React, { useMemo } from "react"
import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Clock, Eye, ArrowLeft, Tag, Loader2 } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { formatDate, getValidImageUrl } from "@/lib/utils"
import { useGetBlogPostByIdQuery } from "@/redux/api/featuresApi/blog/blog.api"

export default function BlogDetailPage({ params }: { params: Promise<{ blogId: string }> }) {
  const { blogId } = React.use(params)
  
  const { data: blogData, isLoading, error } = useGetBlogPostByIdQuery({ id: blogId })
  const apiPost = blogData?.data

  const post = useMemo(() => {
    if (!apiPost) return null
    return {
      id: String(apiPost.documentId || apiPost.id),
      title: apiPost.title,
      slug: apiPost.slug || apiPost.title.toLowerCase().replace(/\s+/g, "-"),
      content: apiPost.content || "",
      category: "Education", // Hardcoded fallback if not in API
      tags: ["elearning", "tips"], // Hardcoded fallback if not in API
      authorName: apiPost.authorName || "CPS Author",
      authorAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&auto=format&fit=crop&q=80",
      featuredImage: apiPost.thumbnail_url || "https://images.unsplash.com/photo-1516321497487-e288fb19713f?w=1200&auto=format&fit=crop&q=80",
      viewCount: 1250,
      createdAt: apiPost.createdAt || new Date().toISOString(),
      updatedAt: apiPost.updatedAt || new Date().toISOString(),
    }
  }, [apiPost])

  if (isLoading) {
    return (
      <div className="bg-white dark:bg-slate-900 min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-[#0075FD]" />
      </div>
    )
  }

  if (error || !post) {
    return (
      <div className="bg-white dark:bg-slate-900 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Blog post not found</h2>
          <Link href="/blog" className="text-[#0075FD] hover:underline">Back to Blog</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white dark:bg-slate-900 min-h-screen">
      {/* featured image */}
      <div className="relative h-72 md:h-96 w-full">
        <Image src={getValidImageUrl(post.featuredImage)} alt={post.title} fill className="object-cover" priority sizes="100vw" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
          <div className="mx-auto max-w-3xl">
            <Badge className="mb-3 bg-[#0075FD] text-white border-0">{post.category}</Badge>
            <h1 className="text-2xl md:text-3xl font-bold text-white leading-tight">{post.title}</h1>
          </div>
        </div>
      </div>

      {/* content */}
      <div className="mx-auto max-w-3xl px-4 sm:px-6 py-10">
        {/* meta */}
        <div className="flex flex-wrap items-center gap-4 pb-6 border-b mb-8 text-sm text-slate-500">
          <div className="flex items-center gap-2">
            {post.authorAvatar && <img src={post.authorAvatar} alt={post.authorName} className="h-8 w-8 rounded-full object-cover" />}
            <span className="font-medium text-slate-900">{post.authorName}</span>
          </div>
          <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" />{formatDate(post.createdAt)}</span>
          <span className="flex items-center gap-1"><Eye className="h-3.5 w-3.5" />{post.viewCount.toLocaleString()} views</span>
        </div>

        {/* body */}
        <div className="prose prose-slate max-w-none text-slate-700 leading-relaxed">
          {post.content.split("\n\n").map((para: string, i: number) => (
            <p key={i} className="mb-4">{para.replace(/^#+ /, "")}</p>
          ))}
        </div>

        {/* tags */}
        <div className="flex flex-wrap gap-2 mt-8 pt-6 border-t">
          <Tag className="h-4 w-4 text-slate-400 mt-0.5" />
          {post.tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>
          ))}
        </div>

        <Link href="/blog" className="inline-flex items-center gap-2 mt-8 text-sm text-[#0075FD] hover:text-amber-700 font-medium">
          <ArrowLeft className="h-4 w-4" /> Back to Blog
        </Link>
      </div>
    </div>
  )
}