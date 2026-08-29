"use client"
import { use, useState } from "react"
import { Plus, Trash2, CheckCircle2 } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import PageHeader from "@/components/common/PageHeader"
import { getQuizById, getQuestionsByQuiz } from "@/data/quizzes"
import type { Question, Option } from "@/types/quiz"

export default function QuizQuestionsPage({ params }: { params: Promise<{ quizId: string }> }) {
  const { quizId } = use(params)
  const quiz = getQuizById(quizId)
  const initialQuestions = getQuestionsByQuiz(quizId)
  const [questions, setQuestions] = useState(initialQuestions)
  const [saved, setSaved] = useState(false)

  const addQuestion = () => {
    const newQ: Question = {
      id: `new-${Date.now()}`,
      quizId,
      text: "",
      options: [
        { id: `o-${Date.now()}-1`, text: "", isCorrect: true },
        { id: `o-${Date.now()}-2`, text: "", isCorrect: false },
      ],
      order: questions.length + 1,
      marks: 10,
    }
    setQuestions((prev) => [...prev, newQ])
  }

  const updateQuestion = (qi: number, text: string) => {
    setQuestions((prev) => prev.map((q, i) => i === qi ? { ...q, text } : q))
  }

  const updateOption = (qi: number, oi: number, text: string) => {
    setQuestions((prev) => prev.map((q, i) => i === qi ? {
      ...q, options: q.options.map((o, j) => j === oi ? { ...o, text } : o)
    } : q))
  }

  const setCorrect = (qi: number, optId: string) => {
    setQuestions((prev) => prev.map((q, i) => i === qi ? {
      ...q, options: q.options.map((o) => ({ ...o, isCorrect: o.id === optId }))
    } : q))
  }

  const addOption = (qi: number) => {
    setQuestions((prev) => prev.map((q, i) => i === qi ? {
      ...q, options: [...q.options, { id: `o-${Date.now()}`, text: "", isCorrect: false }]
    } : q))
  }

  const removeQuestion = (qi: number) => setQuestions((prev) => prev.filter((_, i) => i !== qi))

  const handleSave = () => {
    console.log("Quiz questions:", questions)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  if (!quiz) return <div>Quiz not found</div>

  return (
    <div>
      <PageHeader
        title={`Questions: ${quiz.title}`}
        breadcrumbs={[{ label: "Quizzes", href: "/dashboard/instructor/quizzes" }, { label: quiz.title }]}
        actions={
          <Button onClick={handleSave} className="gap-2 bg-[#F59E0B] hover:bg-amber-600 text-white font-bold">
            <CheckCircle2 className="h-4 w-4 text-white" />{saved ? "Saved!" : "Save All"}
          </Button>
        }
      />

      <div className="space-y-4 w-full">
        {questions.map((q, qi) => (
          <div key={q.id} className="rounded-xl border bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-slate-400">Question {qi + 1}</span>
              <button onClick={() => removeQuestion(qi)} className="text-red-400 hover:text-red-600">
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
            <Input
              placeholder="Enter your question here..."
              value={q.text}
              onChange={(e) => updateQuestion(qi, e.target.value)}
              className="mb-4"
            />
            <Label className="text-xs text-slate-500 mb-2 block">Options (select correct answer)</Label>
            <RadioGroup value={q.options.find((o) => o.isCorrect)?.id} onValueChange={(v) => setCorrect(qi, v)} className="space-y-2">
              {q.options.map((opt, oi) => (
                <div key={opt.id} className="flex items-center gap-2">
                  <RadioGroupItem value={opt.id} id={`${q.id}-${opt.id}`} />
                  <Input
                    placeholder={`Option ${oi + 1}`}
                    value={opt.text}
                    onChange={(e) => updateOption(qi, oi, e.target.value)}
                    className="flex-1"
                  />
                </div>
              ))}
            </RadioGroup>
            <Button type="button" variant="ghost" size="sm" onClick={() => addOption(qi)} className="mt-2 text-xs text-amber-600">
              + Add Option
            </Button>
          </div>
        ))}

        <Button onClick={addQuestion} variant="outline" className="w-full gap-2 border-dashed">
          <Plus className="h-4 w-4" />Add Question
        </Button>
      </div>
    </div>
  )
}
