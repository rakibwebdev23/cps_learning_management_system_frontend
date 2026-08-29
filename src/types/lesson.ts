export type LessonType = "video" | "article" | "quiz"

export interface Lesson {
  id: string
  courseId: string
  title: string
  description: string
  type: LessonType
  videoUrl?: string
  content: string
  durationMinutes: number
  order: number
  isFree: boolean
  createdAt: string
}
