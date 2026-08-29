export interface Enrollment {
  id: number | string
  documentId?: string
  status: "active" | "completed" | "dropped"
  enrolledAt?: string
  completedAt?: string
  student?: {
    id: number | string
    username?: string
    email?: string
  }
  course?: {
    id: number | string
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
