import { notFound } from "next/navigation"
import Link from "next/link"
import { CheckCircle2, XCircle, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import PageHeader from "@/components/common/PageHeader"
import { getResultById } from "@/data/results"
import { getQuestionsByQuiz } from "@/data/quizzes"
import { formatDate } from "@/lib/utils"

export default async function ResultDetailPage({ params }: { params: Promise<{ resultId: string }> }) {
  const { resultId } = await params
  const result = getResultById(resultId)
  if (!result) notFound()

  const questions = getQuestionsByQuiz(result.quizId)
  const correct = result.answers.filter((a) => a.isCorrect).length
  const wrong = result.answers.filter((a) => !a.isCorrect).length

  return (
    <div>
      <PageHeader
        title="Quiz Result"
        breadcrumbs={[{ label: "Results", href: "/dashboard/student/results" }, { label: result.quizTitle }]}
      />

      {/* score card */}
      <div className={`rounded-2xl border p-6 mb-6 ${result.passed ? "bg-emerald-50/70 border-emerald-200" : "bg-red-50/70 border-red-200"}`}>
        <div className="flex flex-col sm:flex-row items-center gap-6">
          <div className={`flex h-24 w-24 items-center justify-center rounded-full text-3xl font-extrabold ${result.passed ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-700"}`}>
            {result.percentage}%
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900 mb-1">
              {result.passed ? "🎉 Congratulations! You Passed!" : "😔 Not Passed This Time"}
            </h2>
            <p className="text-sm text-slate-600">Score: {result.score}/{result.totalMarks} · Attempt #{result.attemptNumber}</p>
            <p className="text-xs text-slate-500">Submitted: {formatDate(result.submittedAt)}</p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 mt-5">
          {[
            { label: "Correct", value: correct, color: "text-emerald-600" },
            { label: "Wrong", value: wrong, color: "text-red-600" },
            { label: "Total", value: questions.length, color: "text-amber-600" },
          ].map((s) => (
            <div key={s.label} className="text-center bg-white rounded-xl py-3 border border-slate-100">
              <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
              <p className="text-xs text-slate-500">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* question review */}
      <div className="rounded-2xl border border-slate-200/80 bg-white overflow-hidden mb-6 shadow-sm">
        <div className="px-5 py-4 border-b border-slate-100 bg-slate-50">
          <h3 className="font-bold text-slate-900 text-sm">Question Review</h3>
        </div>
        <div className="divide-y divide-slate-100">
          {questions.map((q, i) => {
            const answer = result.answers.find((a) => a.questionId === q.id)
            const selectedOpt = q.options.find((o) => o.id === answer?.selectedOptionId)
            const correctOpt = q.options.find((o) => o.isCorrect)
            return (
              <div key={q.id} className="p-5">
                <div className="flex items-start gap-3 mb-3">
                  <div className={`flex h-6 w-6 items-center justify-center rounded-full shrink-0 mt-0.5 ${answer?.isCorrect ? "bg-emerald-100" : "bg-red-100"}`}>
                    {answer?.isCorrect ? <CheckCircle2 className="h-4 w-4 text-emerald-600" /> : <XCircle className="h-4 w-4 text-red-600" />}
                  </div>
                  <p className="text-sm font-semibold text-slate-900">{i + 1}. {q.text}</p>
                </div>
                <div className="ml-9 space-y-1 text-xs text-slate-600">
                  <p>Your answer: <span className={answer?.isCorrect ? "text-emerald-600 font-bold" : "text-red-600 font-bold"}>{selectedOpt?.text ?? "Not answered"}</span></p>
                  {!answer?.isCorrect && <p>Correct: <span className="text-emerald-600 font-bold">{correctOpt?.text}</span></p>}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <Button variant="outline" asChild className="gap-2 rounded-full border-slate-200">
        <Link href="/dashboard/student/results"><ArrowLeft className="h-4 w-4" />Back to Results</Link>
      </Button>
    </div>
  )
}
