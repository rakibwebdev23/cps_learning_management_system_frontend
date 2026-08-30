export interface QuizResult {
  id: number | string
  documentId?: string
  attempt_no?: number
  score: number
  total_questions: number
  percentage: number
  submittedAt?: string
  student?: {
    id: number | string
    username?: string
    email?: string
  }
  quiz?: {
    id: number | string
    documentId?: string
    title?: string
    course?: {
      id: number | string
      documentId?: string
      title?: string
    }
  }
  isPassed?: boolean
  status?: string
  createdAt?: string
}

export interface QuizResultListResponse {
  data: QuizResult[]
  meta?: Record<string, any>
}

export interface QuizResultResponse {
  data: QuizResult
}

export interface SubmitQuizPayload {
  data: {
    quiz: string | number
    score: number
    total_questions: number
    percentage: number
  }
}
