"use client"
import Link from "next/link"
import { HelpCircle, PlayCircle, Clock, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import PageHeader from "@/components/common/PageHeader"
import { useGetQuizzesQuery } from "@/redux/api/featuresApi/quiz/quiz.api"
import { useGetEnrollmentsQuery } from "@/redux/api/featuresApi/enrollment/enrollment.api"

export default function StudentQuizzesPage() {
  const { data: enrollmentsData, isLoading: isLoadingEnrollments } = useGetEnrollmentsQuery()
  const enrollments = enrollmentsData?.data || []
  
  const { data: quizzesData, isLoading: isLoadingQuizzes } = useGetQuizzesQuery()
  const quizzes = quizzesData?.data || []

  const enrolledCourseIds = enrollments.map((e: any) => e.course?.documentId || e.course?.id)
  
  // Optional: only show quizzes that belong to enrolled courses
  // const availableQuizzes = quizzes.filter((q: any) => enrolledCourseIds.includes(q.course?.documentId || q.course?.id))
  const availableQuizzes = quizzes

  const isLoading = isLoadingEnrollments || isLoadingQuizzes

  return (
    <div>
      <PageHeader title="My Quizzes" description="Available quizzes from your enrolled courses." />
      
      {isLoading ? (
        <div className="flex justify-center p-12"><Loader2 className="w-8 h-8 animate-spin text-[#0075FD]" /></div>
      ) : availableQuizzes.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {availableQuizzes.map((quiz: any) => (
            <div key={quiz.id || quiz.documentId} className="rounded-2xl border border-slate-200 bg-white p-5 hover:shadow-md transition-shadow flex flex-col justify-between">
              <div>
                <div className="flex items-start gap-3 mb-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 shrink-0">
                    <HelpCircle className="h-5 w-5 text-[#0075FD]" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900">{quiz.title}</h3>
                    <p className="text-sm text-slate-500 mt-0.5 line-clamp-2">{quiz.description}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 mb-4 flex-wrap">
                  <Badge variant="secondary" className="gap-1 text-xs bg-slate-100 text-slate-700 font-medium"><Clock className="h-3 w-3 text-[#0075FD]" />{quiz.timeLimitMinutes || 30} min</Badge>
                  <Badge variant="secondary" className="text-xs bg-slate-100 text-slate-700 font-medium">{quiz.totalMarks || 100} marks</Badge>
                  <Badge variant="secondary" className="text-xs bg-slate-100 text-slate-700 font-medium">Pass: {quiz.passingScore || 50}%</Badge>
                  <Badge variant="secondary" className="text-xs bg-slate-100 text-slate-700 font-medium">{quiz.attemptLimit || 1} attempts</Badge>
                </div>
              </div>
              <Button className="w-full bg-[#0075FD] hover:bg-blue-600 text-white font-bold shadow-sm gap-2" asChild>
                <Link href={`/dashboard/student/quizzes/${quiz.documentId || quiz.id}`}>
                  <PlayCircle className="h-4 w-4 text-white" /> Start Quiz
                </Link>
              </Button>
            </div>
          ))}
        </div>
      ) : (
        <div className="p-12 text-center bg-white rounded-2xl border border-slate-200">
          <HelpCircle className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-slate-900 mb-1">No Quizzes Available</h3>
          <p className="text-sm text-slate-500">You don't have any quizzes to take right now.</p>
        </div>
      )}
    </div>
  )
}
