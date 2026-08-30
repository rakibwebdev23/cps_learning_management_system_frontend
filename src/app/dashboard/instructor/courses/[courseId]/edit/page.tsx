"use client"
import { use, useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useRouter } from "next/navigation"
import { Save, ArrowLeft, Loader2 } from "lucide-react"
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import PageHeader from "@/components/common/PageHeader"
import { COURSE_CATEGORIES, COURSE_LEVELS } from "@/lib/constants"
import { useGetCourseByIdQuery, useUpdateCourseMutation } from "@/redux/api/featuresApi/course/course.api"

const schema = z.object({
  title: z.string().min(5),
  shortDescription: z.string().min(10).optional().or(z.literal("")),
  description: z.string().min(10).optional().or(z.literal("")),
  category: z.string().optional(),
  level: z.string().optional(),
  price: z.coerce.number().min(0),
})
type FormData = z.infer<typeof schema>

export default function EditCoursePage({ params }: { params: Promise<{ courseId: string }> }) {
  const { courseId } = use(params)
  const router = useRouter()

  const { data: courseData, isLoading: isCourseLoading } = useGetCourseByIdQuery({ id: courseId })
  const course = courseData?.data

  const [updateCourse, { isLoading: isUpdating }] = useUpdateCourseMutation()

  const { register, handleSubmit, reset, setValue, watch, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema) as any,
    defaultValues: { 
      title: "", 
      shortDescription: "", 
      description: "", 
      price: 0,
      category: "",
      level: ""
    },
  })

  useEffect(() => {
    if (course) {
      reset({
        title: course.title || "",
        shortDescription: course.shortDescription || "",
        description: course.description || "",
        price: course.price || 0,
        category: course.category || COURSE_CATEGORIES[0],
        level: course.level || COURSE_LEVELS[0]
      })
    }
  }, [course, reset])

  const onSubmit = async (data: FormData) => {
    try {
      await updateCourse({
        id: courseId,
        payload: { data: data }
      }).unwrap()
      router.push(`/dashboard/instructor/courses/${courseId}`)
    } catch (error) {
      console.error("Failed to update course:", error)
      alert("Failed to update course")
    }
  }

  if (isCourseLoading) return <div className="p-12 flex justify-center"><Loader2 className="w-8 h-8 animate-spin text-[#0075FD]" /></div>
  if (!course) return <div className="p-12 text-center">Course not found</div>

  return (
    <div>
      <PageHeader
        title="Edit Course"
        breadcrumbs={[{ label: "Courses", href: "/dashboard/instructor/courses" }, { label: course.title || "Course", href: `/dashboard/instructor/courses/${courseId}` }, { label: "Edit" }]}
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
          {errors.shortDescription && <p className="text-xs text-red-500">{errors.shortDescription.message}</p>}
        </div>
        <div className="space-y-1.5">
          <Label>Full Description</Label>
          <Textarea rows={4} {...register("description")} />
          {errors.description && <p className="text-xs text-red-500">{errors.description.message}</p>}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <Label>Category</Label>
            <Select value={watch("category")} onValueChange={(val) => setValue("category", val)}>
              <SelectTrigger><SelectValue placeholder="Select Category" /></SelectTrigger>
              <SelectContent>{COURSE_CATEGORIES.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
            </Select>
          </div>
          <div className="space-y-1.5">
            <Label>Level</Label>
            <Select value={watch("level")} onValueChange={(val) => setValue("level", val)}>
              <SelectTrigger><SelectValue placeholder="Select Level" /></SelectTrigger>
              <SelectContent>{COURSE_LEVELS.map((l) => <SelectItem key={l} value={l} className="capitalize">{l}</SelectItem>)}</SelectContent>
            </Select>
          </div>
        </div>
        <div className="space-y-1.5">
          <Label>Price (BDT)</Label>
          <Input type="number" {...register("price")} />
          {errors.price && <p className="text-xs text-red-500">{errors.price.message}</p>}
        </div>
        <Separator />
        <div className="flex gap-3">
          <Button type="submit" disabled={isUpdating} className="gap-2 bg-[#0075FD] hover:bg-blue-600 text-white font-bold cursor-pointer">
            {isUpdating ? <Loader2 className="w-4 h-4 animate-spin text-white" /> : <Save className="h-4 w-4 text-white" />}
            {isUpdating ? "Saving..." : "Save Changes"}
          </Button>
          <Button type="button" variant="outline" asChild disabled={isUpdating}><Link href={`/dashboard/instructor/courses/${courseId}`}><ArrowLeft className="h-4 w-4 mr-1" />Cancel</Link></Button>
        </div>
      </form>
    </div>
  )
}
