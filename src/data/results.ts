import type { QuizResult } from "@/types/result"

export const results: QuizResult[] = [
  {
    id: "r1", quizId: "q1", studentId: "u6", studentName: "Alex Johnson", quizTitle: "Next.js Fundamentals Quiz", courseId: "c1",
    score: 40, totalMarks: 50, percentage: 80, passed: true, attemptNumber: 1,
    answers: [
      { questionId: "qn1", selectedOptionId: "o2", isCorrect: true },
      { questionId: "qn2", selectedOptionId: "o7", isCorrect: true },
      { questionId: "qn3", selectedOptionId: "o11", isCorrect: true },
      { questionId: "qn4", selectedOptionId: "o14", isCorrect: true },
      { questionId: "qn5", selectedOptionId: "o20", isCorrect: false },
    ],
    submittedAt: "2025-07-15T10:30:00Z",
  },
  {
    id: "r2", quizId: "q2", studentId: "u6", studentName: "Alex Johnson", quizTitle: "Python & Data Science Basics", courseId: "c2",
    score: 20, totalMarks: 30, percentage: 67, passed: false, attemptNumber: 1,
    answers: [
      { questionId: "qn6", selectedOptionId: "o21", isCorrect: false },
      { questionId: "qn7", selectedOptionId: "o27", isCorrect: true },
      { questionId: "qn8", selectedOptionId: "o30", isCorrect: true },
    ],
    submittedAt: "2025-07-20T14:15:00Z",
  },
  {
    id: "r3", quizId: "q1", studentId: "u7", studentName: "Emily Chen", quizTitle: "Next.js Fundamentals Quiz", courseId: "c1",
    score: 50, totalMarks: 50, percentage: 100, passed: true, attemptNumber: 1,
    answers: [
      { questionId: "qn1", selectedOptionId: "o2", isCorrect: true },
      { questionId: "qn2", selectedOptionId: "o7", isCorrect: true },
      { questionId: "qn3", selectedOptionId: "o11", isCorrect: true },
      { questionId: "qn4", selectedOptionId: "o14", isCorrect: true },
      { questionId: "qn5", selectedOptionId: "o19", isCorrect: true },
    ],
    submittedAt: "2025-07-18T09:45:00Z",
  },
  {
    id: "r4", quizId: "q3", studentId: "u8", studentName: "Mohammed Al-Rashid", quizTitle: "React Native Foundations", courseId: "c3",
    score: 30, totalMarks: 40, percentage: 75, passed: true, attemptNumber: 1,
    answers: [
      { questionId: "qn9", selectedOptionId: "o35", isCorrect: true },
      { questionId: "qn10", selectedOptionId: "o38", isCorrect: true },
    ],
    submittedAt: "2025-08-01T11:00:00Z",
  },
  {
    id: "r5", quizId: "q2", studentId: "u6", studentName: "Alex Johnson", quizTitle: "Python & Data Science Basics", courseId: "c2",
    score: 28, totalMarks: 30, percentage: 93, passed: true, attemptNumber: 2,
    answers: [
      { questionId: "qn6", selectedOptionId: "o22", isCorrect: true },
      { questionId: "qn7", selectedOptionId: "o27", isCorrect: true },
      { questionId: "qn8", selectedOptionId: "o30", isCorrect: true },
    ],
    submittedAt: "2025-07-25T16:00:00Z",
  },
]

export const getResultById = (id: string) => results.find((r) => r.id === id)
export const getResultsByStudent = (studentId: string) => results.filter((r) => r.studentId === studentId)
export const getResultsByQuiz = (quizId: string) => results.filter((r) => r.quizId === quizId)
