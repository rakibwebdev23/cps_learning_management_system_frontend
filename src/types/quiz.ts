export interface Option {
  id: string
  text: string
  isCorrect: boolean
}

export interface Question {
  id: string
  quizId: string
  text: string
  options: Option[]
  order: number
  marks: number
}

export interface Quiz {
  id: string
  courseId: string
  title: string
  description: string
  passingScore: number
  timeLimitMinutes: number
  totalMarks: number
  attemptLimit: number
  createdAt: string
}
