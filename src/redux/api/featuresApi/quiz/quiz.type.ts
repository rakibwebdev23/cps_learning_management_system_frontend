export interface QuizOption {
  id: number | string
  documentId?: string
  option_text: string
  is_correct: boolean
}

export interface QuizQuestion {
  id: number | string
  documentId?: string
  question: string
  order?: number
  options?: QuizOption[]
}

export interface Quiz {
  id: number | string
  documentId?: string
  title: string
  description?: string
  course?: {
    id: number | string
    title?: string
  }
  questions?: QuizQuestion[]
  createdAt?: string
  updatedAt?: string
}

export interface QuizListResponse {
  data: Quiz[]
  meta?: Record<string, any>
}

export interface QuizResponse {
  data: Quiz
}

export interface CreateQuizPayload {
  data: {
    title: string
    description?: string
    course?: string | number
  }
}
