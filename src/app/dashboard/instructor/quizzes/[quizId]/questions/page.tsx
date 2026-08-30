"use client"
import { use, useState, useEffect } from "react"
import { Plus, Trash2, CheckCircle2, Loader2 } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import PageHeader from "@/components/common/PageHeader"
import { useGetQuizByIdQuery, useUpdateQuizMutation } from "@/redux/api/featuresApi/quiz/quiz.api"

export default function QuizQuestionsPage({ params }: { params: Promise<{ quizId: string }> }) {
  const { quizId } = use(params)
  
  const { data: quizData, isLoading: isQuizLoading } = useGetQuizByIdQuery({ id: quizId })
  const quiz = quizData?.data

  const [updateQuiz, { isLoading: isUpdating }] = useUpdateQuizMutation()

  const [questions, setQuestions] = useState<any[]>([])
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    if (quiz && quiz.questions) {
      // Map API data to local state format, ensuring each option has an ID for radio groups to work
      const mappedQuestions = quiz.questions.map((q: any) => ({
        id: q.id || `q-${Math.random()}`,
        questionText: q.questionText || q.text || "",
        marks: q.marks || 10,
        options: (q.options || []).map((o: any) => ({
          id: o.id || `o-${Math.random()}`,
          optionText: o.optionText || o.text || "",
          isCorrect: !!o.isCorrect
        }))
      }))
      setQuestions(mappedQuestions)
    }
  }, [quiz])

  const addQuestion = () => {
    const newQ = {
      id: `new-${Date.now()}`,
      questionText: "",
      options: [
        { id: `o-${Date.now()}-1`, optionText: "", isCorrect: true },
        { id: `o-${Date.now()}-2`, optionText: "", isCorrect: false },
      ],
      marks: 10,
    }
    setQuestions((prev) => [...prev, newQ])
  }

  const updateQuestion = (qi: number, text: string) => {
    setQuestions((prev) => prev.map((q, i) => i === qi ? { ...q, questionText: text } : q))
  }

  const updateOption = (qi: number, oi: number, text: string) => {
    setQuestions((prev) => prev.map((q, i) => i === qi ? {
      ...q, options: q.options.map((o: any, j: number) => j === oi ? { ...o, optionText: text } : o)
    } : q))
  }

  const setCorrect = (qi: number, optId: string) => {
    setQuestions((prev) => prev.map((q, i) => i === qi ? {
      ...q, options: q.options.map((o: any) => ({ ...o, isCorrect: String(o.id) === String(optId) }))
    } : q))
  }

  const addOption = (qi: number) => {
    setQuestions((prev) => prev.map((q, i) => i === qi ? {
      ...q, options: [...q.options, { id: `o-${Date.now()}`, optionText: "", isCorrect: false }]
    } : q))
  }

  const removeQuestion = (qi: number) => setQuestions((prev) => prev.filter((_, i) => i !== qi))

  const handleSave = async () => {
    if (!quiz) return;
    try {
      // Clean up temp IDs if needed by Strapi component architecture, or let Strapi handle it.
      // Usually, if we send `id` back for new components that are strings, it might crash.
      const cleanedQuestions = questions.map((q) => {
        const qId = typeof q.id === "string" && q.id.startsWith("new-") ? undefined : q.id
        return {
          id: qId,
          questionText: q.questionText,
          marks: q.marks,
          options: q.options.map((o: any) => {
            const oId = typeof o.id === "string" && o.id.startsWith("o-") ? undefined : o.id
            return {
              id: oId,
              optionText: o.optionText,
              isCorrect: o.isCorrect
            }
          })
        }
      })

      await updateQuiz({
        id: quiz.documentId || quiz.id,
        payload: {
          data: {
            questions: cleanedQuestions
          }
        }
      }).unwrap()

      setSaved(true)
      setTimeout(() => setSaved(false), 2000)
    } catch (error) {
      console.error("Failed to save questions:", error)
      alert("Failed to save questions")
    }
  }

  if (isQuizLoading) return <div className="p-12 flex justify-center"><Loader2 className="w-8 h-8 animate-spin text-[#0075FD]" /></div>
  if (!quiz) return <div className="p-12 text-center text-slate-500">Quiz not found</div>

  return (
    <div>
      <PageHeader
        title={`Questions: ${quiz.title}`}
        breadcrumbs={[{ label: "Quizzes", href: "/dashboard/instructor/quizzes" }, { label: quiz.title }]}
        actions={
          <Button onClick={handleSave} disabled={isUpdating} className="gap-2 bg-[#0075FD] hover:bg-blue-600 text-white font-bold">
            {isUpdating ? <Loader2 className="w-4 h-4 animate-spin text-white" /> : <CheckCircle2 className="h-4 w-4 text-white" />}
            {isUpdating ? "Saving..." : saved ? "Saved!" : "Save All"}
          </Button>
        }
      />

      <div className="space-y-4 w-full">
        {questions.map((q, qi) => (
          <div key={q.id || qi} className="rounded-xl border bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-slate-400">Question {qi + 1}</span>
              <button onClick={() => removeQuestion(qi)} className="text-red-400 hover:text-red-600">
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
            <Input
              placeholder="Enter your question here..."
              value={q.questionText}
              onChange={(e) => updateQuestion(qi, e.target.value)}
              className="mb-4"
            />
            <Label className="text-xs text-slate-500 mb-2 block">Options (select correct answer)</Label>
            <RadioGroup value={String(q.options.find((o: any) => o.isCorrect)?.id)} onValueChange={(v) => setCorrect(qi, v)} className="space-y-2">
              {q.options.map((opt: any, oi: number) => (
                <div key={opt.id || oi} className="flex items-center gap-2">
                  <RadioGroupItem value={String(opt.id)} id={`${q.id}-${opt.id}`} />
                  <Input
                    placeholder={`Option ${oi + 1}`}
                    value={opt.optionText}
                    onChange={(e) => updateOption(qi, oi, e.target.value)}
                    className="flex-1"
                  />
                </div>
              ))}
            </RadioGroup>
            <Button type="button" variant="ghost" size="sm" onClick={() => addOption(qi)} className="mt-2 text-xs text-[#0075FD]">
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
