export interface Enrollment {
  id: number | string
  documentId?: string
  status: "active" | "completed" | "dropped"
  enrolledAt?: string
  completedAt?: string
  studentName?: string
  progress?: number
  completedLessons?: number
  student?: {
    id: number | string
    documentId?: string
    username?: string
    name?: string
    email?: string
  }
  course?: {
    id: number | string
    documentId?: string
    title?: string
    description?: string
    thumbnail_url?: string
  }
  createdAt?: string
}

export interface EnrollmentListResponse {
  data: Enrollment[]
  meta?: Record<string, any>
}

export interface EnrollmentResponse {
  data: Enrollment
}

export interface CreateEnrollmentPayload {
  data: {
    course: string | number
  }
}
