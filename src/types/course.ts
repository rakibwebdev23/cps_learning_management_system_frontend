export type CourseLevel = "beginner" | "intermediate" | "advanced"
export type CourseStatus = "draft" | "published" | "archived"
export type CourseCategory =
  | "Web Development"
  | "Mobile Development"
  | "Data Science"
  | "Design"
  | "Business"
  | "Marketing"
  | "Cybersecurity"
  | "Cloud Computing"

export interface Course {
  id: string
  title: string
  slug: string
  description: string
  shortDescription: string
  thumbnail: string
  category: CourseCategory
  level: CourseLevel
  status: CourseStatus
  price: number
  discountPrice?: number
  instructorId: string
  instructorName: string
  instructorAvatar?: string
  rating: number
  reviewCount: number
  studentCount: number
  lessonCount: number
  durationMinutes: number
  tags: string[]
  requirements: string[]
  learningOutcomes: string[]
  createdAt: string
  updatedAt: string
}
