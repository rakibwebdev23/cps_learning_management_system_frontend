"use client"

import React, { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Mail, Lock, Eye, EyeOff, CheckCircle2, Loader2, GraduationCap } from "lucide-react"
import { SITE_NAME } from "@/lib/constants"
import { useLoginMutation } from "@/redux/api/featuresApi/auth/authApi"
import { useAppDispatch } from "@/redux/hooks"
import { setCredentials } from "@/redux/api/featuresApi/auth/authSlice"

const schema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
})

type FormData = z.infer<typeof schema>

function LoginContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get("callbackUrl")
  const dispatch = useAppDispatch()
  const [login, { isLoading: isLoginLoading }] = useLoginMutation()

  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [errorMsg, setErrorMsg] = useState("")

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const emailValue = watch("email") || ""
  const isEmailValid = emailValue.includes("@") && emailValue.includes(".")

  const onSubmit = async (data: FormData) => {
    setErrorMsg("")
    try {
      const res = await login({
        identifier: data.email,
        email: data.email,
        password: data.password,
      }).unwrap()

      if (res.jwt && res.user) {
        dispatch(
          setCredentials({
            user: res.user,
            accessToken: res.jwt,
            jwt: res.jwt,
          })
        )

        if (callbackUrl) {
          router.push(callbackUrl)
        } else {
          const role = res.user.user_role
          if (role === "admin") {
            router.push("/dashboard/admin")
          } else if (role === "instructor") {
            router.push("/dashboard/instructor")
          } else if (role === "content_manager") {
            router.push("/dashboard/content-manager")
          } else {
            router.push("/dashboard/student")
          }
        }
      }
    } catch (err: any) {
      const msg = err?.data?.error?.message || err?.message || "Failed to log in. Please check credentials."
      setErrorMsg(msg)
    }
  }

  return (
    <div className="w-full max-w-5xl h-auto lg:h-[660px] bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col lg:flex-row border border-slate-100">
      <div className="w-full lg:w-1/2 p-8 lg:py-10 lg:px-12 flex flex-col justify-between bg-white h-full min-h-[520px] lg:min-h-0">
        <div className="relative">
          <Link href="/" className="inline-flex items-center cursor-pointer">
            <Image src="/logo.png" alt="CPS LMS" width={150} height={45} className="h-10 w-auto object-contain" priority />
          </Link>
        </div>

        <div className="my-auto py-4 max-w-md w-full mx-auto">
          <h1 className="text-3xl font-bold text-slate-900 mb-1">
            Welcome Back
          </h1>
          <p className="text-sm text-slate-500 mb-8">
            Sign in to access your CPS LMS dashboard.
          </p>

          {errorMsg && (
            <div className="mb-5 text-sm text-red-500 bg-red-50 border border-red-200 rounded-xl px-4 py-3">
              {errorMsg}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-400 block cursor-pointer">
                Email Address
              </label>
              <div className="relative flex items-center">
                <Mail className="absolute left-4 w-5 h-5 text-slate-400" />
                <input
                  type="email"
                  {...register("email")}
                  placeholder="name@example.com"
                  className="w-full pl-12 pr-12 py-3.5 border border-slate-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-[#0075FD] focus:border-transparent transition-all text-slate-700"
                  required
                />
                {isEmailValid && (
                  <CheckCircle2 className="absolute right-4 w-5 h-5 text-emerald-500 fill-emerald-500 stroke-white" />
                )}
              </div>
              {errors.email && <p className="text-xs text-red-500 pl-4">{errors.email.message}</p>}
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-400 block cursor-pointer">
                Password
              </label>
              <div className="relative flex items-center">
                <Lock className="absolute left-4 w-5 h-5 text-slate-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  {...register("password")}
                  placeholder="••••••••"
                  className="w-full pl-12 pr-12 py-3.5 border border-slate-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-[#0075FD] focus:border-transparent transition-all text-slate-700 tracking-wider"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 text-slate-400 hover:text-slate-600 transition-colors focus:outline-none cursor-pointer"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5 stroke-[1.5]" />
                  ) : (
                    <Eye className="w-5 h-5 stroke-[1.5]" />
                  )}
                </button>
              </div>
              {errors.password && <p className="text-xs text-red-500 pl-4">{errors.password.message}</p>}
            </div>

            <div className="flex items-center justify-between text-xs pt-1">
              <label className="flex items-center gap-2 text-slate-600 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded border-slate-300 text-[#0075FD] focus:ring-[#0075FD] cursor-pointer"
                />
                Remember me
              </label>
              <Link
                href="/forgot-password"
                className="text-[#0075FD] hover:underline text-xs font-semibold cursor-pointer"
              >
                Forgot password?
              </Link>
            </div>

            <div className="flex justify-center pt-2">
              <button
                type="submit"
                disabled={isLoginLoading}
                className="w-full py-3.5 bg-[#0075FD] hover:bg-blue-600 text-white font-bold rounded-full text-sm shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
              >
                {isLoginLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-white" />
                    Signing in...
                  </>
                ) : (
                  "Log In"
                )}
              </button>
            </div>
          </form>

          <p className="text-center text-xs text-slate-400 mt-6">
            Don't have an account?{" "}
            <Link
              href="/register"
              className="text-[#0075FD] font-bold hover:underline cursor-pointer"
            >
              Register
            </Link>
          </p>
        </div>

        <div />
      </div>

      <div className="hidden lg:block w-1/2 p-3 h-full group">
        <div className="relative w-full h-full rounded-2xl overflow-hidden bg-gradient-to-b from-slate-900 to-black flex flex-col justify-end p-8 lg:p-12 text-white">
          <Image
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&auto=format&fit=crop&q=80"
            alt="Learning environment"
            fill
            priority
            className="object-cover opacity-40 select-none pointer-events-none group-hover:scale-105 transition-all duration-500"
          />

          <div className="relative z-10 space-y-4 max-w-md">
            <h2 className="text-2xl lg:text-3xl 2xl:text-4xl font-bold leading-tight tracking-tight text-white">
              Master In-Demand Skills with Expert Guidance
            </h2>
            <p className="text-sm lg:text-base text-slate-300 font-light italic leading-relaxed">
              Join over 15,000+ learners and industry experts on the leading interactive LMS platform.
            </p>

            <div className="pt-4 border-t border-white/20">
              <p className="text-base font-semibold tracking-wide text-white">
                CPS Learning Team
              </p>
              <p className="text-xs text-slate-400">Professional Education System</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

import { Suspense } from "react"

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center min-h-[60vh]"><Loader2 className="w-8 h-8 animate-spin text-[#0075FD]" /></div>}>
      <LoginContent />
    </Suspense>
  )
}
