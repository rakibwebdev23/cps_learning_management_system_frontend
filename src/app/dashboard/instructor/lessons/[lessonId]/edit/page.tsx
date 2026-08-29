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
import { Separator } from "@/components/ui/separator"
import PageHeader from "@/components/common/PageHeader"
import { getLessonById } from "@/data/lessons"

const schema = z.object({
  title: z.string().min(3),
  description: z.string().min(10),
  videoUrl: z.string().optional(),
  content: z.string().min(10),
  durationMinutes: z.coerce.number().min(1),
})
type FormData = z.infer<typeof schema>

export default function EditLessonPage({ params }: { params: Promise<{ lessonId: string }> }) {
  const { lessonId } = use(params)
  const lesson = getLessonById(lessonId)
  const router = useRouter()

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema) as any,
    defaultValues: { title: lesson?.title, description: lesson?.description, videoUrl: lesson?.videoUrl, content: lesson?.content, durationMinutes: lesson?.durationMinutes },
  })

  const onSubmit = (data: FormData) => {
    console.log("Edit lesson:", data)
    router.back()
  }

  if (!lesson) return <div className="p-6">Lesson not found.</div>

  return (
    <div>
      <PageHeader title="Edit Lesson" breadcrumbs={[{ label: "Courses", href: "/dashboard/instructor/courses" }, { label: "Edit Lesson" }]} />
      <form onSubmit={handleSubmit(onSubmit)} className="w-full rounded-xl border bg-white p-6 space-y-4 shadow-sm">
        <div className="space-y-1.5">
          <Label>Lesson Title</Label>
          <Input {...register("title")} />
          {errors.title && <p className="text-xs text-red-500">{errors.title.message}</p>}
        </div>
        <div className="space-y-1.5">
          <Label>Description</Label>
          <Input {...register("description")} />
        </div>
        <div className="space-y-1.5">
          <Label>Video URL</Label>
          <Input {...register("videoUrl")} />
        </div>
        <div className="space-y-1.5">
          <Label>Lesson Content</Label>
          <Textarea rows={5} {...register("content")} />
          {errors.content && <p className="text-xs text-red-500">{errors.content.message}</p>}
        </div>
        <div className="space-y-1.5">
          <Label>Duration (minutes)</Label>
          <Input type="number" {...register("durationMinutes")} />
        </div>
        <Separator />
        <Button type="submit" className="gap-2 bg-[#F59E0B] hover:bg-amber-600 text-white font-bold"><Save className="h-4 w-4 text-white" />Save Changes</Button>
      </form>
    </div>
  )
}
