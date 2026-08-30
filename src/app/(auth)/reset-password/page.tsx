"use client"
import Link from "next/link"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { CheckCircle2, Eye, EyeOff } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

const schema = z.object({
  password: z.string().min(8, "At least 8 characters"),
  confirmPassword: z.string(),
}).refine((d) => d.password === d.confirmPassword, { message: "Passwords don't match", path: ["confirmPassword"] })
type FormData = z.infer<typeof schema>

export default function ResetPasswordPage() {
  const [showPw, setShowPw] = useState(false)
  const [done, setDone] = useState(false)
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>({ resolver: zodResolver(schema) })

  const onSubmit = (data: FormData) => {
    console.log("Reset password:", data)
    setDone(true)
  }

  return (
    <div className="rounded-xl border bg-white dark:bg-slate-900 shadow-sm p-8">
      {done ? (
        <div className="text-center">
          <div className="h-16 w-16 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 className="h-8 w-8 text-emerald-600" />
          </div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Password Reset!</h2>
          <p className="text-sm text-slate-500 mb-6">Your password has been updated successfully.</p>
          <Button asChild className="w-full bg-[#0075FD] hover:bg-blue-600 text-white font-bold"><Link href="/login">Sign In Now</Link></Button>
        </div>
      ) : (
        <>
          <div className="text-center mb-7">
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Reset Password</h1>
            <p className="text-sm text-slate-500 mt-1">Enter and confirm your new password.</p>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="password">New Password</Label>
              <div className="relative">
                <Input id="password" type={showPw ? "text" : "password"} placeholder="Min 8 characters" {...register("password")} />
                <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
                  {showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {errors.password && <p className="text-xs text-red-500">{errors.password.message}</p>}
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="confirmPassword">Confirm New Password</Label>
              <Input id="confirmPassword" type={showPw ? "text" : "password"} placeholder="Re-enter password" {...register("confirmPassword")} />
              {errors.confirmPassword && <p className="text-xs text-red-500">{errors.confirmPassword.message}</p>}
            </div>
            <Button type="submit" className="w-full bg-[#0075FD] hover:bg-blue-600 text-white font-bold" disabled={isSubmitting}>
              {isSubmitting ? "Updating..." : "Update Password"}
            </Button>
          </form>
        </>
      )}
    </div>
  )
}
