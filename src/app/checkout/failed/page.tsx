import Link from "next/link"
import { XCircle, RefreshCcw, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function CheckoutFailedPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-2xl border shadow-sm p-8 text-center">
        <div className="h-20 w-20 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-5">
          <XCircle className="h-10 w-10 text-red-600" />
        </div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Payment Failed</h1>
        <p className="text-slate-500 text-sm mb-2">We couldn't process your payment. This could be due to:</p>
        <ul className="text-sm text-slate-500 text-left list-disc list-inside mb-6 space-y-1 bg-slate-50 dark:bg-slate-800 rounded-xl p-4">
          <li>Insufficient funds on your card</li>
          <li>Incorrect card details entered</li>
          <li>Bank declined the transaction</li>
          <li>Network connectivity issue</li>
        </ul>
        <div className="flex flex-col gap-3">
          <Button className="w-full bg-[#0075FD] hover:bg-blue-600 text-white font-bold gap-2" asChild>
            <Link href="/checkout"><RefreshCcw className="h-4 w-4" /> Try Again</Link>
          </Button>
          <Button variant="outline" className="w-full gap-2" asChild>
            <Link href="/courses"><ArrowLeft className="h-4 w-4" /> Back to Course</Link>
          </Button>
        </div>
        <p className="text-xs text-slate-400 mt-4">Need help? <a href="mailto:support@cpslms.com" className="text-[#0075FD] hover:underline">Contact support</a></p>
      </div>
    </div>
  )
}
