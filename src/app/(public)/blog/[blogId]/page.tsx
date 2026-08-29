import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Clock, Eye, ArrowLeft, Tag } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { getBlogById } from "@/data/blogs"
import { formatDate } from "@/lib/utils"

export default async function BlogDetailPage({ params }: { params: Promise<{ blogId: string }> }) {
  const { blogId } = await params
  const post = getBlogById(blogId)
  if (!post) notFound()

  return (
    <div className="bg-white dark:bg-slate-900 min-h-screen">
      {/* featured image */}
      <div className="relative h-72 md:h-96 w-full">
        <Image src={post.featuredImage} alt={post.title} fill className="object-cover" priority sizes="100vw" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
          <div className="mx-auto max-w-3xl">
            <Badge className="mb-3 bg-[#F59E0B] text-white border-0">{post.category}</Badge>
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
          {post.content.split("\n\n").map((para, i) => (
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

        <Link href="/blog" className="inline-flex items-center gap-2 mt-8 text-sm text-amber-600 hover:text-amber-700 font-medium">
          <ArrowLeft className="h-4 w-4" /> Back to Blog
        </Link>
      </div>
    </div>
  )
}
