import Link from "next/link"
import { Mail, CheckCircle2, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function VerifyEmailPage() {
  return (
    <div className="rounded-xl border bg-white dark:bg-slate-900 shadow-sm p-8 text-center">
      <div className="h-20 w-20 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-6">
        <Mail className="h-10 w-10 text-[#0075FD]" />
      </div>
      <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Verify Your Email</h1>
      <p className="text-sm text-slate-500 mb-6 max-w-xs mx-auto">
        We've sent a verification link to your email address. Click the link to activate your account.
      </p>
      <div className="space-y-3 mb-6">
        {["Check your inbox (and spam folder)", "Click the verification link", "Your account will be activated"].map((step, i) => (
          <div key={i} className="flex items-center gap-3 text-left bg-slate-50 dark:bg-slate-800 rounded-lg px-4 py-3">
            <CheckCircle2 className="h-4 w-4 text-[#0075FD] shrink-0" />
            <span className="text-sm text-slate-700 dark:text-slate-300">{step}</span>
          </div>
        ))}
      </div>
      <Button asChild className="w-full bg-[#0075FD] hover:bg-blue-600 text-white font-bold gap-2">
        <Link href="/login">Go to Login <ArrowRight className="h-4 w-4" /></Link>
      </Button>
      <p className="text-xs text-slate-400 mt-4">Didn't receive the email?{" "}
        <button className="text-[#0075FD] hover:underline">Resend verification</button>
      </p>
    </div>
  )
}
