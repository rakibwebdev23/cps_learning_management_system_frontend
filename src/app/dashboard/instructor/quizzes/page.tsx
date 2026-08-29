import Link from "next/link"
import { Plus, HelpCircle, Eye, Edit } from "lucide-react"
import { Button } from "@/components/ui/button"
import PageHeader from "@/components/common/PageHeader"
import { quizzes } from "@/data/quizzes"

export default function InstructorQuizzesPage() {
  return (
    <div>
      <PageHeader
        title="Quizzes"
        description="Manage course quizzes and question banks."
        actions={
          <Button className="gap-2 bg-[#F59E0B] hover:bg-amber-600 text-white font-bold shadow-sm" asChild>
            <Link href="/dashboard/instructor/quizzes/create">
              <Plus className="h-4 w-4 text-white" /> Create Quiz
            </Link>
          </Button>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {quizzes.map((q) => (
          <div key={q.id} className="rounded-2xl border border-slate-200 bg-white p-5 space-y-4 hover:shadow-md transition-shadow">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 shrink-0">
                <HelpCircle className="h-5 w-5 text-[#F59E0B]" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 line-clamp-1">{q.title}</h3>
                <p className="text-xs text-slate-500 mt-0.5">{q.totalMarks} marks · Pass: {q.passingScore}%</p>
              </div>
            </div>

            <p className="text-xs text-slate-600 line-clamp-2">{q.description}</p>

            <div className="flex items-center gap-2 pt-2 border-t border-slate-100">
              <Button size="sm" className="flex-1 bg-[#F59E0B] hover:bg-amber-600 text-white font-bold shadow-sm" asChild>
                <Link href={`/dashboard/instructor/quizzes/${q.id}/questions`} className="gap-1 text-xs text-white">
                  <Edit className="h-3.5 w-3.5 text-white" /> Manage Questions
                </Link>
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
