"use client"
import { use } from "react"
import Link from "next/link"
import { CheckCircle2, XCircle, ArrowLeft, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import PageHeader from "@/components/common/PageHeader"
import { formatDate } from "@/lib/utils"
import { useGetQuizResultByIdQuery } from "@/redux/api/featuresApi/result/result.api"
import { useGetQuizByIdQuery } from "@/redux/api/featuresApi/quiz/quiz.api"

export default function ResultDetailPage({ params }: { params: Promise<{ resultId: string }> }) {
  const { resultId } = use(params)
  
  const { data: resultData, isLoading: isResultLoading } = useGetQuizResultByIdQuery({ id: resultId })
  const result = resultData?.data

  const quizId = result?.quiz?.documentId || result?.quiz?.id
  const { data: quizData, isLoading: isQuizLoading } = useGetQuizByIdQuery({ id: quizId as string }, { skip: !quizId })
  const quiz = quizData?.data

  if (isResultLoading || (quizId && isQuizLoading)) {
    return <div className="p-12 flex justify-center"><Loader2 className="w-8 h-8 animate-spin text-[#0075FD]" /></div>
  }

  if (!result) return <div className="p-12 text-center text-slate-500">Result not found.</div>

  const isPassed = (result.percentage || 0) >= (quiz?.passingScore || 50)
  const questions = quiz?.questions || []
  const totalQuestions = result.total_questions || questions.length || 10
  const correct = result.score || 0
  const wrong = totalQuestions - correct

  return (
    <div>
      <PageHeader
        title="Quiz Result"
        breadcrumbs={[{ label: "Results", href: "/dashboard/student/results" }, { label: result.quiz?.title || "Quiz" }]}
      />

      {/* score card */}
      <div className={`rounded-2xl border p-6 mb-6 ${isPassed ? "bg-emerald-50/70 border-emerald-200" : "bg-red-50/70 border-red-200"}`}>
        <div className="flex flex-col sm:flex-row items-center gap-6">
          <div className={`flex h-24 w-24 items-center justify-center rounded-full text-3xl font-extrabold ${isPassed ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-700"}`}>
            {result.percentage || 0}%
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900 mb-1">
              {isPassed ? "🎉 Congratulations! You Passed!" : "😔 Not Passed This Time"}
            </h2>
            <p className="text-sm text-slate-600">Score: {correct}/{totalQuestions} · Attempt #{result.attempt_no || 1}</p>
            <p className="text-xs text-slate-500">Submitted: {formatDate(result.createdAt || new Date().toISOString())}</p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 mt-5">
          {[
            { label: "Correct", value: correct, color: "text-emerald-600" },
            { label: "Wrong", value: wrong, color: "text-red-600" },
            { label: "Total", value: totalQuestions, color: "text-[#0075FD]" },
          ].map((s) => (
            <div key={s.label} className="text-center bg-white rounded-xl py-3 border border-slate-100">
              <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
              <p className="text-xs text-slate-500">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* question review - usually needs answers, but backend doesn't store them yet. Using questions from quiz as a placeholder */}
      {questions.length > 0 && (
        <div className="rounded-2xl border border-slate-200/80 bg-white overflow-hidden mb-6 shadow-sm">
          <div className="px-5 py-4 border-b border-slate-100 bg-slate-50">
            <h3 className="font-bold text-slate-900 text-sm">Quiz Questions (Review mode not fully supported)</h3>
          </div>
          <div className="divide-y divide-slate-100">
            {questions.map((q: any, i: number) => {
              const correctOpt = q.options?.find((o: any) => o.isCorrect)
              return (
                <div key={q.id || i} className="p-5">
                  <div className="flex items-start gap-3 mb-3">
                    <p className="text-sm font-semibold text-slate-900">{i + 1}. {q.text || q.questionText}</p>
                  </div>
                  <div className="ml-5 space-y-1 text-xs text-slate-600">
                    <p>Correct Answer: <span className="text-emerald-600 font-bold">{correctOpt?.text || correctOpt?.optionText || "Unknown"}</span></p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      <Button variant="outline" asChild className="gap-2 rounded-full border-slate-200">
        <Link href="/dashboard/student/results"><ArrowLeft className="h-4 w-4" />Back to Results</Link>
      </Button>
    </div>
  )
}
