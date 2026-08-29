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
import { Separator } from "@/components/ui/separator"
import PageHeader from "@/components/common/PageHeader"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { courses } from "@/data/courses"

const schema = z.object({
  title: z.string().min(3),
  description: z.string().min(10),
  courseId: z.string().min(1, "Select a course"),
  passingScore: z.coerce.number().min(1).max(100),
  timeLimitMinutes: z.coerce.number().min(5),
  totalMarks: z.coerce.number().min(10),
  attemptLimit: z.coerce.number().min(1),
})
type FormData = z.infer<typeof schema>

export default function CreateQuizPage() {
  const router = useRouter()
  const { register, handleSubmit, setValue, formState: { errors } } = useForm<FormData>({ resolver: zodResolver(schema) as any })

  const onSubmit = (data: FormData) => {
    console.log("Create quiz:", data)
    router.push("/dashboard/instructor/quizzes")
  }

  return (
    <div>
      <PageHeader title="Create Quiz" breadcrumbs={[{ label: "Quizzes", href: "/dashboard/instructor/quizzes" }, { label: "Create" }]} />
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
          <Label>Quiz Title</Label>
          <Input placeholder="e.g., Module 1 Assessment" {...register("title")} />
          {errors.title && <p className="text-xs text-red-500">{errors.title.message}</p>}
        </div>
        <div className="space-y-1.5">
          <Label>Description</Label>
          <Textarea rows={2} placeholder="Brief quiz description" {...register("description")} />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <Label>Passing Score (%)</Label>
            <Input type="number" defaultValue={70} min={1} max={100} {...register("passingScore")} />
          </div>
          <div className="space-y-1.5">
            <Label>Time Limit (min)</Label>
            <Input type="number" defaultValue={30} min={5} {...register("timeLimitMinutes")} />
          </div>
          <div className="space-y-1.5">
            <Label>Total Marks</Label>
            <Input type="number" defaultValue={50} min={10} {...register("totalMarks")} />
          </div>
          <div className="space-y-1.5">
            <Label>Attempt Limit</Label>
            <Input type="number" defaultValue={3} min={1} {...register("attemptLimit")} />
          </div>
        </div>
        <Separator />
        <Button type="submit" className="gap-2 bg-[#F59E0B] hover:bg-amber-600 text-white font-bold"><Save className="h-4 w-4 text-white" />Create Quiz</Button>
      </form>
    </div>
  )
}
