"use client"
import { use, useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useRouter } from "next/navigation"
import { Save, Loader2 } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import PageHeader from "@/components/common/PageHeader"
import { BLOG_CATEGORIES } from "@/lib/constants"
import { useGetBlogPostByIdQuery, useUpdateBlogPostMutation } from "@/redux/api/featuresApi/blog/blog.api"

const schema = z.object({
  title: z.string().min(5),
  excerpt: z.string().optional(),
  content: z.string().min(20),
})
type FormData = z.infer<typeof schema>

export default function EditBlogPage({ params }: { params: Promise<{ blogId: string }> }) {
  const { blogId } = use(params)
  const router = useRouter()

  const { data: blogData, isLoading, error } = useGetBlogPostByIdQuery({ id: blogId })
  const blog = blogData?.data
  
  const [updateBlog, { isLoading: isUpdating }] = useUpdateBlogPostMutation()

  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  useEffect(() => {
    if (blog) {
      reset({
        title: blog.title,
        excerpt: blog.excerpt || "",
        content: blog.content,
      })
    }
  }, [blog, reset])

  const onSubmit = async (data: FormData) => {
    try {
      await updateBlog({ id: blogId, payload: { data: { title: data.title, excerpt: data.excerpt, content: data.content } } }).unwrap()
      router.push("/dashboard/content-manager/blogs")
    } catch (err) {
      console.error("Failed to update blog:", err)
      alert("Failed to update blog post")
    }
  }

  if (isLoading) return <div className="p-12 flex justify-center"><Loader2 className="w-8 h-8 animate-spin text-[#0075FD]" /></div>
  if (error || !blog) return <div className="p-6">Blog not found.</div>

  return (
    <div>
      <PageHeader title="Edit Blog Post" breadcrumbs={[{ label: "Blogs", href: "/dashboard/content-manager/blogs" }, { label: "Edit" }]} />
      <form onSubmit={handleSubmit(onSubmit)} className="w-full rounded-xl border bg-white p-6 space-y-4 shadow-sm">
        <div className="space-y-1.5">
          <Label>Post Title</Label>
          <Input {...register("title")} />
          {errors.title && <p className="text-xs text-red-500">{errors.title.message}</p>}
        </div>
        <div className="space-y-1.5">
          <Label>Excerpt</Label>
          <Input {...register("excerpt")} />
        </div>
        <div className="space-y-1.5">
          <Label>Content</Label>
          <Textarea rows={10} {...register("content")} />
          {errors.content && <p className="text-xs text-red-500">{errors.content.message}</p>}
        </div>
        <Separator />
        <Button type="submit" disabled={isUpdating} className="gap-2 bg-[#0075FD] hover:bg-blue-600 text-white font-bold">
          {isUpdating ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4 text-white" />}
          {isUpdating ? "Saving..." : "Save Changes"}
        </Button>
      </form>
    </div>
  )
}
