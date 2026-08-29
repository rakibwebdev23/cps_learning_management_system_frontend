"use client"
import Link from "next/link"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Mail, ArrowLeft } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

const schema = z.object({ email: z.string().email("Invalid email address") })
type FormData = z.infer<typeof schema>

export default function ForgotPasswordPage() {
  const [sent, setSent] = useState(false)
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>({ resolver: zodResolver(schema) })

  const onSubmit = (data: FormData) => {
    console.log("Forgot password:", data)
    setSent(true)
  }

  return (
    <div className="rounded-xl border bg-white dark:bg-slate-900 shadow-sm p-8">
      {sent ? (
        <div className="text-center">
          <div className="h-16 w-16 rounded-full bg-amber-100 flex items-center justify-center mx-auto mb-4">
            <Mail className="h-8 w-8 text-amber-600" />
          </div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Check Your Email</h2>
          <p className="text-sm text-slate-500 mb-6">We've sent a password reset link to your email address. It expires in 30 minutes.</p>
          <Button asChild className="w-full bg-[#F59E0B] hover:bg-amber-600 text-white font-bold"><Link href="/login">Back to Login</Link></Button>
        </div>
      ) : (
        <>
          <div className="text-center mb-7">
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Forgot Password?</h1>
            <p className="text-sm text-slate-500 mt-1">Enter your email and we'll send a reset link.</p>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="email">Email Address</Label>
              <Input id="email" type="email" placeholder="you@example.com" {...register("email")} />
              {errors.email && <p className="text-xs text-red-500">{errors.email.message}</p>}
            </div>
            <Button type="submit" className="w-full bg-[#F59E0B] hover:bg-amber-600 text-white font-bold" disabled={isSubmitting}>
              {isSubmitting ? "Sending..." : "Send Reset Link"}
            </Button>
          </form>
          <div className="text-center mt-4">
            <Link href="/login" className="inline-flex items-center gap-1 text-sm text-slate-500 hover:text-slate-700">
              <ArrowLeft className="h-4 w-4" />Back to Login
            </Link>
          </div>
        </>
      )}
    </div>
  )
}
