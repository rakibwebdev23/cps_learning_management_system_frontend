import Link from "next/link"
import { ClipboardList, CheckCircle2, XCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import PageHeader from "@/components/common/PageHeader"
import EmptyState from "@/components/common/EmptyState"
import { getResultsByStudent } from "@/data/results"
import { formatDate } from "@/lib/utils"

const STUDENT_ID = "u6"

export default function StudentResultsPage() {
  const results = getResultsByStudent(STUDENT_ID)

  return (
    <div>
      <PageHeader title="Quiz Results" description="Your quiz performance history." />
      {results.length > 0 ? (
        <div className="space-y-4">
          {results.map((r) => (
            <div key={r.id} className="rounded-xl border bg-white dark:bg-slate-900 p-5 flex flex-col sm:flex-row sm:items-center gap-4">
              <div className={`flex h-12 w-12 items-center justify-center rounded-full shrink-0 ${r.passed ? "bg-emerald-100" : "bg-red-100"}`}>
                {r.passed ? <CheckCircle2 className="h-6 w-6 text-emerald-600" /> : <XCircle className="h-6 w-6 text-red-600" />}
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-slate-900 dark:text-white">{r.quizTitle}</h3>
                <p className="text-xs text-slate-500">Attempt #{r.attemptNumber} · Submitted {formatDate(r.submittedAt)}</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-slate-900 dark:text-white">{r.percentage}%</p>
                  <p className="text-xs text-slate-500">{r.score}/{r.totalMarks}</p>
                </div>
                <Badge className={r.passed ? "bg-emerald-100 text-emerald-700 border-0" : "bg-red-100 text-red-700 border-0"}>
                  {r.passed ? "Passed" : "Failed"}
                </Badge>
                <Button variant="outline" size="sm" asChild>
                  <Link href={`/dashboard/student/results/${r.id}`}>Review</Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <EmptyState icon={ClipboardList} title="No results yet" description="Complete a quiz to see your results here." />
      )}
    </div>
  )
}
