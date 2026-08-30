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
import { Separator } from "@/components/ui/separator"
import PageHeader from "@/components/common/PageHeader"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useGetCoursesQuery } from "@/redux/api/featuresApi/course/course.api"
import { useCreateQuizMutation } from "@/redux/api/featuresApi/quiz/quiz.api"

const schema = z.object({
  title: z.string().min(3),
  description: z.string().min(10),
  course: z.string().min(1, "Select a course"),
  passingScore: z.coerce.number().min(1).max(100),
  timeLimitMinutes: z.coerce.number().min(5),
  totalMarks: z.coerce.number().min(10),
  attemptLimit: z.coerce.number().min(1),
})
type FormData = z.infer<typeof schema>

export default function CreateQuizPage() {
  const router = useRouter()
  
  const { data: coursesData, isLoading: isLoadingCourses } = useGetCoursesQuery()
  const courses = coursesData?.data || []

  const [createQuiz, { isLoading: isCreating }] = useCreateQuizMutation()

  const { register, handleSubmit, setValue, formState: { errors } } = useForm<FormData>({ resolver: zodResolver(schema) as any })

  const onSubmit = async (data: FormData) => {
    try {
      await createQuiz({ data }).unwrap()
      router.push("/dashboard/instructor/quizzes")
    } catch (error) {
      console.error("Failed to create quiz:", error)
      alert("Failed to create quiz. Check console.")
    }
  }

  return (
    <div>
      <PageHeader title="Create Quiz" breadcrumbs={[{ label: "Quizzes", href: "/dashboard/instructor/quizzes" }, { label: "Create" }]} />
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
          <Label>Quiz Title</Label>
          <Input placeholder="e.g., Module 1 Assessment" {...register("title")} />
          {errors.title && <p className="text-xs text-red-500">{errors.title.message}</p>}
        </div>
        <div className="space-y-1.5">
          <Label>Description</Label>
          <Textarea rows={2} placeholder="Brief quiz description" {...register("description")} />
          {errors.description && <p className="text-xs text-red-500">{errors.description.message}</p>}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <Label>Passing Score (%)</Label>
            <Input type="number" defaultValue={70} min={1} max={100} {...register("passingScore")} />
            {errors.passingScore && <p className="text-xs text-red-500">{errors.passingScore.message}</p>}
          </div>
          <div className="space-y-1.5">
            <Label>Time Limit (min)</Label>
            <Input type="number" defaultValue={30} min={5} {...register("timeLimitMinutes")} />
            {errors.timeLimitMinutes && <p className="text-xs text-red-500">{errors.timeLimitMinutes.message}</p>}
          </div>
          <div className="space-y-1.5">
            <Label>Total Marks</Label>
            <Input type="number" defaultValue={50} min={10} {...register("totalMarks")} />
            {errors.totalMarks && <p className="text-xs text-red-500">{errors.totalMarks.message}</p>}
          </div>
          <div className="space-y-1.5">
            <Label>Attempt Limit</Label>
            <Input type="number" defaultValue={3} min={1} {...register("attemptLimit")} />
            {errors.attemptLimit && <p className="text-xs text-red-500">{errors.attemptLimit.message}</p>}
          </div>
        </div>
        <Separator />
        <Button type="submit" disabled={isCreating} className="gap-2 bg-[#0075FD] hover:bg-blue-600 text-white font-bold">
          {isCreating ? <Loader2 className="h-4 w-4 animate-spin text-white" /> : <Save className="h-4 w-4 text-white" />}
          {isCreating ? "Creating..." : "Create Quiz"}
        </Button>
      </form>
    </div>
  )
}
