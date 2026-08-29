export interface Course {
  id: number | string
  documentId?: string
  title: string
  description?: string
  thumbnail_url?: string
  price?: number
  instructorName?: string
  instructor?: {
    id: number | string
    username?: string
    email?: string
  }
  lessonCount?: number
  createdAt?: string
  updatedAt?: string
}

export interface CourseListResponse {
  data: Course[]
  meta?: {
    pagination?: {
      page: number
      pageSize: number
      pageCount: number
      total: number
    }
  }
}

export interface CourseResponse {
  data: Course
  meta?: Record<string, any>
}

export interface CreateCoursePayload {
  data: {
    title: string
    description?: string
    thumbnail_url?: string
    price?: number
    instructor?: string | number
  }
}
