"use client"
import { use, useState } from "react"
import { useRouter } from "next/navigation"
import { notFound } from "next/navigation"
import { Timer, ChevronLeft, ChevronRight, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription,
} from "@/components/ui/dialog"
import { getQuizById } from "@/data/quizzes"
import { getQuestionsByQuiz } from "@/data/quizzes"

export default function QuizPlayerPage({ params }: { params: Promise<{ quizId: string }> }) {
  const { quizId } = use(params)
  const quiz = getQuizById(quizId)
  if (!quiz) notFound()

  const questions = getQuestionsByQuiz(quizId)
  const router = useRouter()
  const [current, setCurrent] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [confirmOpen, setConfirmOpen] = useState(false)

  const question = questions[current]
  const progress = ((current + 1) / questions.length) * 100
  const selectedOption = answers[question?.id ?? ""]

  const handleSelect = (optionId: string) => {
    setAnswers((prev) => ({ ...prev, [question.id]: optionId }))
  }

  const handleSubmit = () => {
    console.log("Quiz answers:", answers)
    setConfirmOpen(false)
    router.push("/dashboard/student/results")
  }

  if (!question) return null

  return (
    <div className="w-full">
      {/* header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900">{quiz.title}</h1>
          <p className="text-sm text-slate-500">Question {current + 1} of {questions.length}</p>
        </div>
        <div className="flex items-center gap-2 text-sm text-slate-500 bg-slate-100 px-3 py-1.5 rounded-full">
          <Timer className="h-4 w-4" />
          <span className="font-mono font-semibold">{quiz.timeLimitMinutes}:00</span>
        </div>
      </div>

      {/* progress */}
      <Progress value={progress} className="h-2 mb-6" />

      {/* question card */}
      <div className="rounded-xl border bg-white p-6 mb-6 shadow-sm">
        <p className="text-slate-900 font-semibold text-base mb-6 leading-relaxed">
          {question.text}
        </p>

        <RadioGroup value={selectedOption} onValueChange={handleSelect} className="space-y-3">
          {question.options.map((opt) => (
            <label
              key={opt.id}
              className={`flex items-center gap-3 p-4 rounded-lg border-2 cursor-pointer transition-all ${selectedOption === opt.id ? "border-[#F59E0B] bg-amber-50" : "border-slate-200 hover:border-slate-300 hover:bg-slate-50"}`}
            >
              <RadioGroupItem value={opt.id} id={opt.id} />
              <Label htmlFor={opt.id} className="cursor-pointer text-sm">{opt.text}</Label>
            </label>
          ))}
        </RadioGroup>
      </div>

      {/* navigation */}
      <div className="flex items-center justify-between">
        <Button variant="outline" onClick={() => setCurrent((c) => c - 1)} disabled={current === 0} className="gap-2">
          <ChevronLeft className="h-4 w-4" /> Previous
        </Button>
        <span className="text-xs text-slate-500">{Object.keys(answers).length}/{questions.length} answered</span>
        {current < questions.length - 1 ? (
          <Button onClick={() => setCurrent((c) => c + 1)} className="gap-2 bg-[#F59E0B] hover:bg-amber-600 text-white font-bold">
            Next <ChevronRight className="h-4 w-4 text-white" />
          </Button>
        ) : (
          <Button onClick={() => setConfirmOpen(true)} className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold">
            Submit Quiz
          </Button>
        )}
      </div>

      {/* confirm dialog */}
      <Dialog open={confirmOpen} onOpenChange={setConfirmOpen}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-100">
                <AlertCircle className="h-5 w-5 text-amber-600" />
              </div>
              <DialogTitle>Submit Quiz?</DialogTitle>
            </div>
            <DialogDescription className="pt-2">
              You've answered {Object.keys(answers).length} of {questions.length} questions. Are you ready to submit?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => setConfirmOpen(false)}>Review Answers</Button>
            <Button className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold" onClick={handleSubmit}>Submit Now</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
