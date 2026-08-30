"use client"
import Link from "next/link"
import { Plus, HelpCircle, Eye, Edit, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import PageHeader from "@/components/common/PageHeader"
import { useGetQuizzesQuery } from "@/redux/api/featuresApi/quiz/quiz.api"

export default function InstructorQuizzesPage() {
  const { data: quizzesData, isLoading } = useGetQuizzesQuery()
  const quizzes = quizzesData?.data || []

  return (
    <div>
      <PageHeader
        title="Quizzes"
        description="Manage course quizzes and question banks."
        actions={
          <Button className="gap-2 bg-[#0075FD] hover:bg-blue-600 text-white font-bold shadow-sm" asChild>
            <Link href="/dashboard/instructor/quizzes/create">
              <Plus className="h-4 w-4 text-white" /> Create Quiz
            </Link>
          </Button>
        }
      />

      {isLoading ? (
        <div className="flex justify-center p-12">
          <Loader2 className="w-8 h-8 animate-spin text-[#0075FD]" />
        </div>
      ) : quizzes.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {quizzes.map((q: any) => (
            <div key={q.id || q.documentId} className="rounded-2xl border border-slate-200 bg-white p-5 space-y-4 hover:shadow-md transition-shadow">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 shrink-0">
                  <HelpCircle className="h-5 w-5 text-[#0075FD]" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 line-clamp-1">{q.title}</h3>
                  <p className="text-xs text-slate-500 mt-0.5">{q.totalMarks || 100} marks · Pass: {q.passingScore || 50}%</p>
                </div>
              </div>

              <p className="text-xs text-slate-600 line-clamp-2">{q.description || "No description provided."}</p>

              <div className="flex items-center gap-2 pt-2 border-t border-slate-100">
                <Button size="sm" className="flex-1 bg-[#0075FD] hover:bg-blue-600 text-white font-bold shadow-sm" asChild>
                  <Link href={`/dashboard/instructor/quizzes/${q.documentId || q.id}/questions`} className="gap-1 text-xs text-white">
                    <Edit className="h-3.5 w-3.5 text-white" /> Manage Questions
                  </Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center p-12 bg-white rounded-2xl border border-slate-200">
          <HelpCircle className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-slate-900 mb-1">No Quizzes Found</h3>
          <p className="text-slate-500 mb-4 text-sm">You haven't created any quizzes yet.</p>
          <Button className="bg-[#0075FD] hover:bg-blue-600 text-white font-bold" asChild>
            <Link href="/dashboard/instructor/quizzes/create">Create your first quiz</Link>
          </Button>
        </div>
      )}
    </div>
  )
}
