export interface QuizAnswer {
  questionId: string
  selectedOptionId: string
  isCorrect: boolean
}

export interface QuizResult {
  id: string
  quizId: string
  studentId: string
  studentName: string
  quizTitle: string
  courseId: string
  score: number
  totalMarks: number
  percentage: number
  passed: boolean
  attemptNumber: number
  answers: QuizAnswer[]
  submittedAt: string
}
