"use client"
import { useState } from "react"
import { Search, Trash2, Loader2 } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import PageHeader from "@/components/common/PageHeader"
import ConfirmDialog from "@/components/common/ConfirmDialog"
import { useGetQuizzesQuery, useDeleteQuizMutation } from "@/redux/api/featuresApi/quiz/quiz.api"

export default function ContentManagerQuizzesPage() {
  const [search, setSearch] = useState("")
  const [deleteId, setDeleteId] = useState<string | null>(null)
  
  const { data: quizzesData, isLoading } = useGetQuizzesQuery()
  const quizzesList = quizzesData?.data || []

  const [deleteQuiz] = useDeleteQuizMutation()

  const filtered = quizzesList.filter((q: any) => (q.title || "").toLowerCase().includes(search.toLowerCase()))

  const handleDelete = async () => {
    if (deleteId) {
      try {
        await deleteQuiz({ id: deleteId }).unwrap()
        setDeleteId(null)
      } catch (error) {
        console.error("Failed to delete quiz:", error)
        alert("Failed to delete quiz")
      }
    }
  }

  return (
    <div>
      <PageHeader title="All Quizzes" description="Manage all quizzes on the platform." />
      <div className="mb-4">
        <Input placeholder="Search quizzes..." value={search} onChange={(e) => setSearch(e.target.value)} className="max-w-sm" />
      </div>

      <div className="rounded-xl border bg-white dark:bg-slate-900 overflow-hidden">
        <div className="overflow-x-auto">
          {isLoading ? (
            <div className="flex justify-center p-12"><Loader2 className="w-8 h-8 animate-spin text-[#0075FD]" /></div>
          ) : (
            <table className="w-full text-sm">
              <thead className="bg-slate-50 dark:bg-slate-800">
                <tr>
                  {["Quiz Title", "Time Limit", "Total Marks", "Pass Score", "Attempts", "Actions"].map((h) => (
                    <th key={h} className="text-left px-4 py-3 text-xs font-medium text-slate-500 uppercase tracking-wider whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y">
                {filtered.map((q: any) => (
                  <tr key={q.id || q.documentId} className="hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                    <td className="px-4 py-3 font-medium text-slate-900 dark:text-white">{q.title}</td>
                    <td className="px-4 py-3 text-slate-600 dark:text-slate-400">{q.timeLimitMinutes || 0}m</td>
                    <td className="px-4 py-3 text-slate-600 dark:text-slate-400">{q.totalMarks || (q.questions?.length || 0) * 10}</td>
                    <td className="px-4 py-3 text-slate-600 dark:text-slate-400">{q.passingScore || 50}%</td>
                    <td className="px-4 py-3 text-slate-600 dark:text-slate-400">{q.attemptLimit || 0}</td>
                    <td className="px-4 py-3">
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500 hover:text-red-700" onClick={() => setDeleteId(q.documentId || q.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      <ConfirmDialog
        open={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={handleDelete}
        title="Delete Quiz?"
        description="Are you sure you want to delete this quiz?"
      />
    </div>
  )
}
