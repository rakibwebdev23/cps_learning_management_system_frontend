"use client"
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
import { BLOG_CATEGORIES } from "@/lib/constants"

const schema = z.object({
  title: z.string().min(5, "Title required"),
  category: z.string().min(1, "Select a category"),
  excerpt: z.string().min(10, "Excerpt required"),
  content: z.string().min(20, "Content required"),
  tags: z.string().min(2, "Tags required (comma separated)"),
  status: z.enum(["draft", "published"]),
})
type FormData = z.infer<typeof schema>

export default function CreateBlogPage() {
  const router = useRouter()
  const { register, handleSubmit, setValue, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { status: "draft" },
  })

  const onSubmit = (data: FormData) => {
    console.log("Create blog:", data)
    router.push("/dashboard/content-manager/blogs")
  }

  return (
    <div>
      <PageHeader title="Create Blog Post" breadcrumbs={[{ label: "Blogs", href: "/dashboard/content-manager/blogs" }, { label: "Create" }]} />
      <form onSubmit={handleSubmit(onSubmit)} className="w-full rounded-xl border bg-white p-6 space-y-4 shadow-sm">
        <div className="space-y-1.5">
          <Label>Post Title</Label>
          <Input placeholder="e.g., 10 Tips for Learning Next.js in 2026" {...register("title")} />
          {errors.title && <p className="text-xs text-red-500">{errors.title.message}</p>}
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <Label>Category</Label>
            <Select onValueChange={(v) => setValue("category", v)}>
              <SelectTrigger><SelectValue placeholder="Select category" /></SelectTrigger>
              <SelectContent>{BLOG_CATEGORIES.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
            </Select>
            {errors.category && <p className="text-xs text-red-500">{errors.category.message}</p>}
          </div>
          <div className="space-y-1.5">
            <Label>Status</Label>
            <Select defaultValue="draft" onValueChange={(v) => setValue("status", v as any)}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="published">Published</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="space-y-1.5">
          <Label>Excerpt</Label>
          <Input placeholder="Short summary for post cards" {...register("excerpt")} />
          {errors.excerpt && <p className="text-xs text-red-500">{errors.excerpt.message}</p>}
        </div>
        <div className="space-y-1.5">
          <Label>Content (Markdown supported)</Label>
          <Textarea rows={10} placeholder="Write full article here..." {...register("content")} />
          {errors.content && <p className="text-xs text-red-500">{errors.content.message}</p>}
        </div>
        <div className="space-y-1.5">
          <Label>Tags (comma separated)</Label>
          <Input placeholder="React, WebDev, Tutorial" {...register("tags")} />
        </div>
        <Separator />
        <Button type="submit" className="gap-2 bg-[#0075FD] hover:bg-blue-600 text-white font-bold"><Save className="h-4 w-4 text-white" />Save Post</Button>
      </form>
    </div>
  )
}
