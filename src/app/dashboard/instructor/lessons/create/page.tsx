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
import { courses } from "@/data/courses"

const schema = z.object({
  title: z.string().min(3, "Title required"),
  description: z.string().min(10),
  videoUrl: z.string().url("Valid URL required").optional().or(z.literal("")),
  content: z.string().min(10),
  durationMinutes: z.coerce.number().min(1),
  order: z.coerce.number().min(1),
  courseId: z.string().min(1, "Select a course"),
})
type FormData = z.infer<typeof schema>

export default function CreateLessonPage() {
  const router = useRouter()
  const { register, handleSubmit, setValue, formState: { errors } } = useForm<FormData>({ resolver: zodResolver(schema) as any })

  const onSubmit = (data: FormData) => {
    console.log("Create lesson:", data)
    router.push("/dashboard/instructor/courses")
  }

  return (
    <div>
      <PageHeader title="Create Lesson" breadcrumbs={[{ label: "Courses", href: "/dashboard/instructor/courses" }, { label: "New Lesson" }]} />
      <form onSubmit={handleSubmit(onSubmit)} className="w-full rounded-xl border bg-white p-6 space-y-4 shadow-sm">
        <div className="space-y-1.5">
          <Label>Course</Label>
          <Select onValueChange={(v) => setValue("courseId", v)}>
            <SelectTrigger><SelectValue placeholder="Select course" /></SelectTrigger>
            <SelectContent>{courses.map((c) => <SelectItem key={c.id} value={c.id}>{c.title}</SelectItem>)}</SelectContent>
          </Select>
          {errors.courseId && <p className="text-xs text-red-500">{errors.courseId.message}</p>}
        </div>
        <div className="space-y-1.5">
          <Label>Lesson Title</Label>
          <Input placeholder="e.g., Introduction to Components" {...register("title")} />
          {errors.title && <p className="text-xs text-red-500">{errors.title.message}</p>}
        </div>
        <div className="space-y-1.5">
          <Label>Description</Label>
          <Input placeholder="Brief lesson overview" {...register("description")} />
        </div>
        <div className="space-y-1.5">
          <Label>Video URL (optional)</Label>
          <Input placeholder="https://youtube.com/embed/..." {...register("videoUrl")} />
          {errors.videoUrl && <p className="text-xs text-red-500">{errors.videoUrl.message}</p>}
        </div>
        <div className="space-y-1.5">
          <Label>Lesson Content</Label>
          <Textarea rows={5} placeholder="Full lesson text content..." {...register("content")} />
          {errors.content && <p className="text-xs text-red-500">{errors.content.message}</p>}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <Label>Duration (minutes)</Label>
            <Input type="number" min="1" defaultValue={15} {...register("durationMinutes")} />
          </div>
          <div className="space-y-1.5">
            <Label>Order</Label>
            <Input type="number" min="1" defaultValue={1} {...register("order")} />
          </div>
        </div>
        <Separator />
        <Button type="submit" className="gap-2 bg-[#F59E0B] hover:bg-amber-600 text-white font-bold"><Save className="h-4 w-4 text-white" />Create Lesson</Button>
      </form>
    </div>
  )
}
