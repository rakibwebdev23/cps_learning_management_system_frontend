"use client"
import { use } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useRouter } from "next/navigation"
import { Save, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import PageHeader from "@/components/common/PageHeader"
import { getCourseById } from "@/data/courses"
import { COURSE_CATEGORIES, COURSE_LEVELS } from "@/lib/constants"

const schema = z.object({
  title: z.string().min(5),
  shortDescription: z.string().min(10),
  description: z.string().min(20),
  price: z.coerce.number().min(0),
})
type FormData = z.infer<typeof schema>

export default function EditCoursePage({ params }: { params: Promise<{ courseId: string }> }) {
  const { courseId } = use(params)
  const course = getCourseById(courseId)
  const router = useRouter()

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema) as any,
    defaultValues: { title: course?.title, shortDescription: course?.shortDescription, description: course?.description, price: course?.price },
  })

  const onSubmit = (data: FormData) => {
    console.log("Edit course:", data)
    router.push(`/dashboard/instructor/courses/${courseId}`)
  }

  if (!course) return <div>Course not found</div>

  return (
    <div>
      <PageHeader
        title="Edit Course"
        breadcrumbs={[{ label: "Courses", href: "/dashboard/instructor/courses" }, { label: course.title, href: `/dashboard/instructor/courses/${courseId}` }, { label: "Edit" }]}
      />
      <form onSubmit={handleSubmit(onSubmit)} className="w-full rounded-xl border bg-white p-6 space-y-4 shadow-sm">
        <div className="space-y-1.5">
          <Label>Course Title</Label>
          <Input {...register("title")} />
          {errors.title && <p className="text-xs text-red-500">{errors.title.message}</p>}
        </div>
        <div className="space-y-1.5">
          <Label>Short Description</Label>
          <Input {...register("shortDescription")} />
        </div>
        <div className="space-y-1.5">
          <Label>Full Description</Label>
          <Textarea rows={4} {...register("description")} />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <Label>Category</Label>
            <Select defaultValue={course.category}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>{COURSE_CATEGORIES.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
            </Select>
          </div>
          <div className="space-y-1.5">
            <Label>Level</Label>
            <Select defaultValue={course.level}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>{COURSE_LEVELS.map((l) => <SelectItem key={l} value={l} className="capitalize">{l}</SelectItem>)}</SelectContent>
            </Select>
          </div>
        </div>
        <div className="space-y-1.5">
          <Label>Price (BDT)</Label>
          <Input type="number" {...register("price")} />
        </div>
        <Separator />
        <div className="flex gap-3">
          <Button type="submit" className="gap-2 bg-[#F59E0B] hover:bg-amber-600 text-white font-bold"><Save className="h-4 w-4 text-white" />Save Changes</Button>
          <Button type="button" variant="outline" asChild><Link href={`/dashboard/instructor/courses/${courseId}`}><ArrowLeft className="h-4 w-4 mr-1" />Cancel</Link></Button>
        </div>
      </form>
    </div>
  )
}
