export interface Lesson {
  id: number | string
  documentId?: string
  title: string
  content?: string
  video_url?: string
  order?: number
  durationMinutes?: number
  course?: {
    id: number | string
    title?: string
  }
  createdAt?: string
  updatedAt?: string
}

export interface LessonListResponse {
  data: Lesson[]
  meta?: {
    pagination?: {
      page: number
      pageSize: number
      pageCount: number
      total: number
    }
  }
}

export interface LessonResponse {
  data: Lesson
}

export interface CreateLessonPayload {
  data: {
    title: string
    content?: string
    video_url?: string
    order?: number
    course?: string | number
  }
}
