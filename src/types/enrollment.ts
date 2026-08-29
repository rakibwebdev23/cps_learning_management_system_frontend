export type EnrollmentStatus = "active" | "completed" | "dropped"

export interface Enrollment {
  id: string
  studentId: string
  studentName: string
  studentEmail: string
  studentAvatar?: string
  courseId: string
  courseTitle: string
  courseThumbnail?: string
  instructorName: string
  status: EnrollmentStatus
  progress: number
  completedLessons: number
  totalLessons: number
  quizAverage?: number
  enrolledAt: string
  completedAt?: string
}
