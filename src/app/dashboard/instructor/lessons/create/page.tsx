"use client"
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
import { useGetCoursesQuery } from "@/redux/api/featuresApi/course/course.api"
import { useCreateLessonMutation } from "@/redux/api/featuresApi/lesson/lesson.api"

const schema = z.object({
  title: z.string().min(3, "Title required"),
  description: z.string().min(10),
  videoUrl: z.string().url("Valid URL required").optional().or(z.literal("")),
  content: z.string().min(10),
  durationMinutes: z.coerce.number().min(1),
  order: z.coerce.number().min(1),
  course: z.string().min(1, "Select a course"),
})
type FormData = z.infer<typeof schema>

export default function CreateLessonPage() {
  const router = useRouter()
  const { data: coursesData, isLoading: isLoadingCourses } = useGetCoursesQuery()
  const courses = coursesData?.data || []

  const [createLesson, { isLoading: isCreating }] = useCreateLessonMutation()

  const { register, handleSubmit, setValue, formState: { errors } } = useForm<FormData>({ resolver: zodResolver(schema) as any })

  const onSubmit = async (data: FormData) => {
    try {
      await createLesson({ data }).unwrap()
      router.push("/dashboard/instructor/courses")
    } catch (error) {
      console.error("Failed to create lesson:", error)
      alert("Failed to create lesson. Check console.")
    }
  }

  return (
    <div>
      <PageHeader title="Create Lesson" breadcrumbs={[{ label: "Courses", href: "/dashboard/instructor/courses" }, { label: "New Lesson" }]} />
      <form onSubmit={handleSubmit(onSubmit)} className="w-full rounded-xl border bg-white p-6 space-y-4 shadow-sm">
        <div className="space-y-1.5">
          <Label>Course</Label>
          <Select onValueChange={(v) => setValue("course", v)} disabled={isLoadingCourses}>
            <SelectTrigger><SelectValue placeholder={isLoadingCourses ? "Loading courses..." : "Select course"} /></SelectTrigger>
            <SelectContent>
              {courses.map((c: any) => (
                <SelectItem key={c.id || c.documentId} value={String(c.documentId || c.id)}>{c.title}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.course && <p className="text-xs text-red-500">{errors.course.message}</p>}
        </div>
        <div className="space-y-1.5">
          <Label>Lesson Title</Label>
          <Input placeholder="e.g., Introduction to Components" {...register("title")} />
          {errors.title && <p className="text-xs text-red-500">{errors.title.message}</p>}
        </div>
        <div className="space-y-1.5">
          <Label>Description</Label>
          <Input placeholder="Brief lesson overview" {...register("description")} />
          {errors.description && <p className="text-xs text-red-500">{errors.description.message}</p>}
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
            {errors.durationMinutes && <p className="text-xs text-red-500">{errors.durationMinutes.message}</p>}
          </div>
          <div className="space-y-1.5">
            <Label>Order</Label>
            <Input type="number" min="1" defaultValue={1} {...register("order")} />
            {errors.order && <p className="text-xs text-red-500">{errors.order.message}</p>}
          </div>
        </div>
        <Separator />
        <Button type="submit" disabled={isCreating} className="gap-2 bg-[#0075FD] hover:bg-blue-600 text-white font-bold">
          {isCreating ? <Loader2 className="h-4 w-4 animate-spin text-white" /> : <Save className="h-4 w-4 text-white" />}
          {isCreating ? "Creating..." : "Create Lesson"}
        </Button>
      </form>
    </div>
  )
}
