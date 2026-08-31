"use client"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useRouter } from "next/navigation"
import { ArrowLeft, ArrowRight, Check, Loader2 } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import PageHeader from "@/components/common/PageHeader"
import { COURSE_CATEGORIES, COURSE_LEVELS } from "@/lib/constants"
import { cn } from "@/lib/utils"
import { useCreateCourseMutation } from "@/redux/api/featuresApi/course/course.api"
import { useAppSelector } from "@/redux/hooks"

const steps = ["Course Info", "Lessons", "Quiz"]

const schema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters"),
  shortDescription: z.string().min(10),
  description: z.string().min(20),
  category: z.string().min(1, "Select a category"),
  level: z.string().min(1, "Select a level"),
  price: z.coerce.number().min(0),
})
type FormData = z.infer<typeof schema>

export default function CreateCoursePage() {
  const [step, setStep] = useState(0)
  const [lessons, setLessons] = useState([{ title: "", durationMinutes: 10, type: "video" }])
  const [errorMsg, setErrorMsg] = useState("")
  const router = useRouter()

  const currentUser = useAppSelector((state) => state.auth.user)
  const [createCourse, { isLoading: isCreating }] = useCreateCourseMutation()

  const { register, handleSubmit, setValue, formState: { errors } } = useForm<FormData>({ resolver: zodResolver(schema) as any })

  const onSubmit = async (data: FormData) => {
    setErrorMsg("")
    try {
      await createCourse({
        data: {
          title: data.title,
          description: data.description || data.shortDescription,
          price: data.price,
          instructor: currentUser?.id ? String(currentUser.id) : undefined,
        },
      }).unwrap()

      router.push("/dashboard/instructor/courses")
    } catch (err: any) {
      console.error("Create course error:", err)
      const msg = err?.data?.error?.message || err?.message || "Failed to create course."
      setErrorMsg(msg)
    }
  }

  const addLesson = () => setLessons((prev) => [...prev, { title: "", durationMinutes: 10, type: "video" }])
  const removeLesson = (i: number) => setLessons((prev) => prev.filter((_, idx) => idx !== i))
  const updateLesson = (i: number, field: string, value: string | number) => {
    setLessons((prev) => prev.map((l, idx) => idx === i ? { ...l, [field]: value } : l))
  }

  return (
    <div>
      <PageHeader
        title="Create New Course"
        breadcrumbs={[{ label: "Courses", href: "/dashboard/instructor/courses" }, { label: "Create" }]}
      />

      {errorMsg && (
        <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-sm text-red-600">
          {errorMsg}
        </div>
      )}

      <div className="flex items-center gap-0 mb-8">
        {steps.map((s, i) => (
          <div key={s} className="flex items-center gap-0">
            <div className="flex items-center gap-2">
              <div className={cn("flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold transition-colors",
                i < step ? "bg-emerald-600 text-white" : i === step ? "bg-[#0075FD] text-white" : "bg-slate-200 text-slate-500"
              )}>
                {i < step ? <Check className="h-4 w-4" /> : i + 1}
              </div>
              <span className={cn("text-sm font-medium", i === step ? "text-slate-900" : "text-slate-500")}>{s}</span>
            </div>
            {i < steps.length - 1 && <div className="mx-4 flex-1 h-0.5 bg-slate-200 w-12" />}
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        {step === 0 && (
          <div className="rounded-xl border border-slate-200 bg-white p-6 space-y-4 w-full shadow-sm">
            <h2 className="font-semibold text-slate-900">Course Information</h2>
            <Separator />
            <div className="space-y-1.5">
              <Label>Course Title</Label>
              <Input placeholder="e.g., Complete React.js Bootcamp" {...register("title")} />
              {errors.title && <p className="text-xs text-red-500">{errors.title.message}</p>}
            </div>
            <div className="space-y-1.5">
              <Label>Short Description</Label>
              <Input placeholder="Brief tagline for your course" {...register("shortDescription")} />
              {errors.shortDescription && <p className="text-xs text-red-500">{errors.shortDescription.message}</p>}
            </div>
            <div className="space-y-1.5">
              <Label>Full Description</Label>
              <Textarea rows={4} placeholder="Detailed course overview..." {...register("description")} />
              {errors.description && <p className="text-xs text-red-500">{errors.description.message}</p>}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label>Category</Label>
                <Select onValueChange={(v) => setValue("category", v)}>
                  <SelectTrigger><SelectValue placeholder="Select category" /></SelectTrigger>
                  <SelectContent>{COURSE_CATEGORIES.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
                </Select>
                {errors.category && <p className="text-xs text-red-500">{errors.category.message}</p>}
              </div>
              <div className="space-y-1.5">
                <Label>Level</Label>
                <Select onValueChange={(v) => setValue("level", v)}>
                  <SelectTrigger><SelectValue placeholder="Select level" /></SelectTrigger>
                  <SelectContent>{COURSE_LEVELS.map((l) => <SelectItem key={l} value={l} className="capitalize">{l}</SelectItem>)}</SelectContent>
                </Select>
                {errors.level && <p className="text-xs text-red-500">{errors.level.message}</p>}
              </div>
            </div>
            <div className="space-y-1.5">
              <Label>Price (BDT)</Label>
              <Input type="number" min="0" placeholder="0 for free" {...register("price")} />
            </div>
          </div>
        )}

        {step === 1 && (
          <div className="rounded-xl border border-slate-200 bg-white p-6 w-full shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold text-slate-900">Lessons</h2>
              <Button type="button" size="sm" onClick={addLesson} className="gap-1 bg-[#0075FD] hover:bg-blue-600 text-white font-bold cursor-pointer">+ Add Lesson</Button>
            </div>
            <Separator className="mb-4" />
            <div className="space-y-3">
              {lessons.map((lesson, i) => (
                <div key={i} className="flex items-center gap-3 p-3 rounded-lg border bg-slate-50">
                  <span className="text-xs font-bold text-slate-400 w-5 shrink-0">{i + 1}</span>
                  <Input
                    className="flex-1"
                    placeholder={`Lesson ${i + 1} title`}
                    value={lesson.title}
                    onChange={(e) => updateLesson(i, "title", e.target.value)}
                  />
                  <Input
                    type="number"
                    className="w-20"
                    placeholder="Min"
                    value={lesson.durationMinutes}
                    onChange={(e) => updateLesson(i, "durationMinutes", Number(e.target.value))}
                  />
                  <button type="button" onClick={() => removeLesson(i)} className="text-red-400 hover:text-red-600 text-xs cursor-pointer">✕</button>
                </div>
              ))}
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="rounded-xl border border-slate-200 bg-white p-6 w-full shadow-sm">
            <h2 className="font-semibold text-slate-900 mb-4">Quiz Setup (Optional)</h2>
            <Separator className="mb-4" />
            <p className="text-sm text-slate-500 mb-4">You can add a quiz to assess your students. This can be configured later.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label>Quiz Title</Label>
                <Input placeholder="e.g., Module 1 Assessment" />
              </div>
              <div className="space-y-1.5">
                <Label>Passing Score (%)</Label>
                <Input type="number" defaultValue={70} min={0} max={100} />
              </div>
              <div className="space-y-1.5">
                <Label>Time Limit (minutes)</Label>
                <Input type="number" defaultValue={30} min={5} />
              </div>
              <div className="space-y-1.5">
                <Label>Attempt Limit</Label>
                <Input type="number" defaultValue={3} min={1} />
              </div>
            </div>
          </div>
        )}

        <div className="flex items-center justify-between mt-6">
          <Button type="button" variant="outline" disabled={step === 0} onClick={() => setStep((s) => s - 1)} className="gap-2 cursor-pointer">
            <ArrowLeft className="h-4 w-4" />Previous
          </Button>
          {step < steps.length - 1 ? (
            <Button type="button" onClick={() => setStep((s) => s + 1)} className="gap-2 bg-[#0075FD] hover:bg-blue-600 text-white font-bold cursor-pointer">
              Next<ArrowRight className="h-4 w-4 text-white" />
            </Button>
          ) : (
            <Button type="submit" disabled={isCreating} className="gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold cursor-pointer">
              {isCreating ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-white" />
                  Creating...
                </>
              ) : (
                <>
                  <Check className="h-4 w-4 text-white" />Create Course
                </>
              )}
            </Button>
          )}
        </div>
      </form>
    </div>
  )
}
