import Link from "next/link"
import { HelpCircle, PlayCircle, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import PageHeader from "@/components/common/PageHeader"
import { quizzes } from "@/data/quizzes"
import { getEnrollmentsByStudent } from "@/data/enrollments"

const STUDENT_ID = "u6"

export default function StudentQuizzesPage() {
  const enrollments = getEnrollmentsByStudent(STUDENT_ID)
  const enrolledCourseIds = enrollments.map((e) => e.courseId)
  const availableQuizzes = quizzes.filter((q) => enrolledCourseIds.includes(q.courseId))

  return (
    <div>
      <PageHeader title="My Quizzes" description="Available quizzes from your enrolled courses." />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {availableQuizzes.map((quiz) => (
          <div key={quiz.id} className="rounded-2xl border border-slate-200 bg-white p-5 hover:shadow-md transition-shadow">
            <div className="flex items-start gap-3 mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 shrink-0">
                <HelpCircle className="h-5 w-5 text-[#F59E0B]" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900">{quiz.title}</h3>
                <p className="text-sm text-slate-500 mt-0.5">{quiz.description}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 mb-4 flex-wrap">
              <Badge variant="secondary" className="gap-1 text-xs bg-slate-100 text-slate-700 font-medium"><Clock className="h-3 w-3 text-amber-600" />{quiz.timeLimitMinutes} min</Badge>
              <Badge variant="secondary" className="text-xs bg-slate-100 text-slate-700 font-medium">{quiz.totalMarks} marks</Badge>
              <Badge variant="secondary" className="text-xs bg-slate-100 text-slate-700 font-medium">Pass: {quiz.passingScore}%</Badge>
              <Badge variant="secondary" className="text-xs bg-slate-100 text-slate-700 font-medium">{quiz.attemptLimit} attempts</Badge>
            </div>
            <Button className="w-full bg-[#F59E0B] hover:bg-amber-600 text-white font-bold shadow-sm gap-2" asChild>
              <Link href={`/dashboard/student/quizzes/${quiz.id}`}>
                <PlayCircle className="h-4 w-4 text-white" /> Start Quiz
              </Link>
            </Button>
          </div>
        ))}
      </div>
    </div>
  )
}
