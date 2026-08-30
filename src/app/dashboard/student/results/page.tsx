"use client"
import Link from "next/link"
import { ClipboardList, CheckCircle2, XCircle, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import PageHeader from "@/components/common/PageHeader"
import EmptyState from "@/components/common/EmptyState"
import { formatDate } from "@/lib/utils"
import { useGetQuizResultsQuery } from "@/redux/api/featuresApi/result/result.api"

export default function StudentResultsPage() {
  const { data: resultsData, isLoading } = useGetQuizResultsQuery()
  const results = resultsData?.data || []

  return (
    <div>
      <PageHeader title="Quiz Results" description="Your quiz performance history." />
      {isLoading ? (
        <div className="flex justify-center p-12"><Loader2 className="w-8 h-8 animate-spin text-[#0075FD]" /></div>
      ) : results.length > 0 ? (
        <div className="space-y-4">
          {results.map((r: any) => {
            const isPassed = (r.percentage || 0) >= (r.quiz?.passingScore || 50)
            const resultIdStr = String(r.documentId || r.id)
            return (
              <div key={resultIdStr} className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm hover:shadow-md transition-all flex flex-col sm:flex-row sm:items-center gap-4">
                <div className={`flex h-12 w-12 items-center justify-center rounded-2xl shrink-0 ${isPassed ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-600"}`}>
                  {isPassed ? <CheckCircle2 className="h-6 w-6" /> : <XCircle className="h-6 w-6" />}
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-slate-900 text-base">{r.quiz?.title || "Quiz Title"}</h3>
                  <p className="text-xs text-slate-500 mt-0.5">Attempt #{r.attempt_no || 1} · Submitted {formatDate(r.createdAt || new Date().toISOString())}</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-center px-2">
                    <p className="text-2xl font-extrabold text-slate-900">{r.percentage || 0}%</p>
                    <p className="text-xs text-slate-400">{r.score || 0}/{r.total_questions || 10}</p>
                  </div>
                  <Badge className={isPassed ? "bg-emerald-50 text-emerald-700 border-emerald-100" : "bg-red-50 text-red-700 border-red-100"}>
                    {isPassed ? "Passed" : "Failed"}
                  </Badge>
                  <Button variant="outline" size="sm" asChild className="rounded-full border-slate-200 hover:bg-slate-50 text-slate-700">
                    <Link href={`/dashboard/student/results/${resultIdStr}`}>Review</Link>
                  </Button>
                </div>
              </div>
            )
          })}
        </div>
      ) : (
        <EmptyState icon={ClipboardList} title="No results yet" description="Complete a quiz to see your results here." />
      )}
    </div>
  )
}
