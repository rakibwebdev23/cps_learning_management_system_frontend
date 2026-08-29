import type { Quiz, Question } from "@/types/quiz"

export const quizzes: Quiz[] = [
  { id: "q1", courseId: "c1", title: "Next.js Fundamentals Quiz", description: "Test your knowledge of App Router concepts.", passingScore: 70, timeLimitMinutes: 15, totalMarks: 50, attemptLimit: 3, createdAt: "2024-08-07" },
  { id: "q2", courseId: "c2", title: "Python & Data Science Basics", description: "Assess your Python and NumPy/Pandas understanding.", passingScore: 75, timeLimitMinutes: 20, totalMarks: 50, attemptLimit: 2, createdAt: "2024-06-20" },
  { id: "q3", courseId: "c3", title: "React Native Foundations", description: "Test mobile development concepts.", passingScore: 65, timeLimitMinutes: 12, totalMarks: 40, attemptLimit: 3, createdAt: "2024-09-05" },
  { id: "q4", courseId: "c5", title: "AWS Cloud Services", description: "Test knowledge of core AWS services.", passingScore: 80, timeLimitMinutes: 25, totalMarks: 60, attemptLimit: 2, createdAt: "2024-05-20" },
]

export const questions: Question[] = [
  // q1 — Next.js
  { id: "qn1", quizId: "q1", text: "In Next.js App Router, what is the default component type for every file in the `app/` directory?", options: [{ id: "o1", text: "Client Component", isCorrect: false }, { id: "o2", text: "Server Component", isCorrect: true }, { id: "o3", text: "Shared Component", isCorrect: false }, { id: "o4", text: "Static Component", isCorrect: false }], order: 1, marks: 10 },
  { id: "qn2", quizId: "q1", text: "Which directive must be added to convert a Server Component into a Client Component?", options: [{ id: "o5", text: "'use server'", isCorrect: false }, { id: "o6", text: "'use strict'", isCorrect: false }, { id: "o7", text: "'use client'", isCorrect: true }, { id: "o8", text: "'use browser'", isCorrect: false }], order: 2, marks: 10 },
  { id: "qn3", quizId: "q1", text: "In Next.js 15+, what type is the `params` prop in dynamic route pages?", options: [{ id: "o9", text: "Object", isCorrect: false }, { id: "o10", text: "String", isCorrect: false }, { id: "o11", text: "Promise<Object>", isCorrect: true }, { id: "o12", text: "Array", isCorrect: false }], order: 3, marks: 10 },
  { id: "qn4", quizId: "q1", text: "What file should you create to define a shared layout for a route segment?", options: [{ id: "o13", text: "template.tsx", isCorrect: false }, { id: "o14", text: "layout.tsx", isCorrect: true }, { id: "o15", text: "wrapper.tsx", isCorrect: false }, { id: "o16", text: "root.tsx", isCorrect: false }], order: 4, marks: 10 },
  { id: "qn5", quizId: "q1", text: "Which hook is used to programmatically navigate in the App Router?", options: [{ id: "o17", text: "useHistory", isCorrect: false }, { id: "o18", text: "useNavigate", isCorrect: false }, { id: "o19", text: "useRouter from next/navigation", isCorrect: true }, { id: "o20", text: "useRouter from next/router", isCorrect: false }], order: 5, marks: 10 },

  // q2 — Python
  { id: "qn6", quizId: "q2", text: "Which NumPy function creates an array of zeros with a given shape?", options: [{ id: "o21", text: "np.empty()", isCorrect: false }, { id: "o22", text: "np.zeros()", isCorrect: true }, { id: "o23", text: "np.blank()", isCorrect: false }, { id: "o24", text: "np.null()", isCorrect: false }], order: 1, marks: 10 },
  { id: "qn7", quizId: "q2", text: "In Pandas, which method is used to handle missing values by removing them?", options: [{ id: "o25", text: "fillna()", isCorrect: false }, { id: "o26", text: "replace()", isCorrect: false }, { id: "o27", text: "dropna()", isCorrect: true }, { id: "o28", text: "removena()", isCorrect: false }], order: 2, marks: 10 },
  { id: "qn8", quizId: "q2", text: "Which Scikit-learn method splits data into training and testing sets?", options: [{ id: "o29", text: "split_data()", isCorrect: false }, { id: "o30", text: "train_test_split()", isCorrect: true }, { id: "o31", text: "data_split()", isCorrect: false }, { id: "o32", text: "model_split()", isCorrect: false }], order: 3, marks: 10 },

  // q3 — React Native
  { id: "qn9", quizId: "q3", text: "What is the React Native equivalent of a `<div>` in web development?", options: [{ id: "o33", text: "Text", isCorrect: false }, { id: "o34", text: "Container", isCorrect: false }, { id: "o35", text: "View", isCorrect: true }, { id: "o36", text: "Box", isCorrect: false }], order: 1, marks: 10 },
  { id: "qn10", quizId: "q3", text: "Which layout system does React Native use for styling?", options: [{ id: "o37", text: "Grid", isCorrect: false }, { id: "o38", text: "Flexbox", isCorrect: true }, { id: "o39", text: "Absolute", isCorrect: false }, { id: "o40", text: "Float", isCorrect: false }], order: 2, marks: 10 },
]

export const getQuizById = (id: string) => quizzes.find((q) => q.id === id)
export const getQuizzesByCourse = (courseId: string) => quizzes.filter((q) => q.courseId === courseId)
export const getQuestionsByQuiz = (quizId: string) =>
  questions.filter((q) => q.quizId === quizId).sort((a, b) => a.order - b.order)
