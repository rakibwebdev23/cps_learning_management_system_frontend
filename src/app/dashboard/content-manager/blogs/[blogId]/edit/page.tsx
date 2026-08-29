"use client"
import { use } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useRouter } from "next/navigation"
import { Save } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import PageHeader from "@/components/common/PageHeader"
import { getBlogById } from "@/data/blogs"
import { BLOG_CATEGORIES } from "@/lib/constants"

const schema = z.object({
  title: z.string().min(5),
  excerpt: z.string().min(10),
  content: z.string().min(20),
})
type FormData = z.infer<typeof schema>

export default function EditBlogPage({ params }: { params: Promise<{ blogId: string }> }) {
  const { blogId } = use(params)
  const blog = getBlogById(blogId)
  const router = useRouter()

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { title: blog?.title, excerpt: blog?.excerpt, content: blog?.content },
  })

  const onSubmit = (data: FormData) => {
    console.log("Edit blog:", data)
    router.push("/dashboard/content-manager/blogs")
  }

  if (!blog) return <div className="p-6">Blog not found.</div>

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
        </div>
        <Separator />
        <Button type="submit" className="gap-2 bg-[#F59E0B] hover:bg-amber-600 text-white font-bold"><Save className="h-4 w-4 text-white" />Save Changes</Button>
      </form>
    </div>
  )
}
