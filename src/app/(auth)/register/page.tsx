"use client"

import React, { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Mail, Lock, User, Shield, Eye, EyeOff, CheckCircle2, Loader2, GraduationCap } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { SITE_NAME } from "@/lib/constants"
import { useRegisterMutation } from "@/redux/api/featuresApi/auth/authApi"
import { useAppDispatch } from "@/redux/hooks"
import { setCredentials } from "@/redux/api/featuresApi/auth/authSlice"

const schema = z.object({
  username: z.string().min(2, "Username is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  user_role: z.enum(["student", "instructor", "content_manager", "admin"]),
})

type FormData = z.infer<typeof schema>

export default function RegisterPage() {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const [registerUser, { isLoading: isRegisterLoading }] = useRegisterMutation()

  const [showPassword, setShowPassword] = useState(false)
  const [errorMsg, setErrorMsg] = useState("")

  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      user_role: "student",
    },
  })

  const emailValue = watch("email") || ""
  const isEmailValid = emailValue.includes("@") && emailValue.includes(".")

  const onSubmit = async (data: FormData) => {
    setErrorMsg("")
    try {
      const res = await registerUser({
        username: data.username,
        email: data.email,
        password: data.password,
        user_role: data.user_role,
      }).unwrap()

      if (res.jwt && res.user) {
        dispatch(
          setCredentials({
            user: res.user,
            accessToken: res.jwt,
            jwt: res.jwt,
          })
        )

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
    } catch (err: any) {
      const msg = err?.data?.error?.message || err?.message || "Registration failed. Please try again."
      setErrorMsg(msg)
    }
  }

  return (
    <div className="w-full max-w-5xl h-auto lg:h-[660px] bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col lg:flex-row border border-slate-100">
      {/* Left Side: Form Area */}
      <div className="w-full lg:w-1/2 p-8 lg:py-8 lg:px-12 flex flex-col justify-between bg-white h-full min-h-[520px] lg:min-h-0">
        {/* Brand Header */}
        <div className="relative">
          <Link href="/" className="inline-flex items-center gap-3 cursor-pointer">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#F59E0B] text-white shadow-sm shadow-amber-200">
              <GraduationCap className="h-6 w-6 text-white" />
            </div>
            <span className="font-extrabold text-xl text-slate-900 tracking-tight">{SITE_NAME}</span>
          </Link>
        </div>

        {/* Form Content */}
        <div className="my-auto py-2 max-w-md w-full mx-auto">
          <h1 className="text-3xl font-bold text-slate-900 mb-1">
            Create Account
          </h1>
          <p className="text-sm text-slate-500 mb-6">
            Join thousands of learners and instructors on CPS LMS.
          </p>

          {errorMsg && (
            <div className="mb-4 text-sm text-red-500 bg-red-50 border border-red-200 rounded-xl px-4 py-3">
              {errorMsg}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Field 1: Username */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-400 block cursor-pointer">
                Username
              </label>
              <div className="relative flex items-center">
                <User className="absolute left-4 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  {...register("username")}
                  placeholder="JohnDoe"
                  className="w-full pl-12 pr-4 py-3 border border-slate-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-[#F59E0B] focus:border-transparent transition-all text-slate-700"
                  required
                />
              </div>
              {errors.username && <p className="text-xs text-red-500 pl-4">{errors.username.message}</p>}
            </div>

            {/* Field 2: Email Input */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-400 block cursor-pointer">
                Email Address
              </label>
              <div className="relative flex items-center">
                <Mail className="absolute left-4 w-5 h-5 text-slate-400" />
                <input
                  type="email"
                  {...register("email")}
                  placeholder="john@example.com"
                  className="w-full pl-12 pr-12 py-3 border border-slate-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-[#F59E0B] focus:border-transparent transition-all text-slate-700"
                  required
                />
                {isEmailValid && (
                  <CheckCircle2 className="absolute right-4 w-5 h-5 text-emerald-500 fill-emerald-500 stroke-white" />
                )}
              </div>
              {errors.email && <p className="text-xs text-red-500 pl-4">{errors.email.message}</p>}
            </div>

            {/* Field 3: Password Input */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-400 block cursor-pointer">
                Password
              </label>
              <div className="relative flex items-center">
                <Lock className="absolute left-4 w-5 h-5 text-slate-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  {...register("password")}
                  placeholder="••••••••"
                  className="w-full pl-12 pr-12 py-3 border border-slate-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-[#F59E0B] focus:border-transparent transition-all text-slate-700 tracking-wider"
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

            {/* Field 4: User Role */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-400 block cursor-pointer">
                Select User Role
              </label>
              <div className="relative flex items-center">
                <Shield className="absolute left-4 z-10 w-5 h-5 text-slate-400 pointer-events-none" />
                <Controller
                  name="user_role"
                  control={control}
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className="w-full pl-12 pr-4 py-5 border border-slate-200 rounded-full text-sm focus:ring-2 focus:ring-[#F59E0B] text-slate-700 cursor-pointer">
                        <SelectValue placeholder="Select role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="student" className="cursor-pointer">Student</SelectItem>
                        <SelectItem value="instructor" className="cursor-pointer">Instructor</SelectItem>
                        <SelectItem value="content_manager" className="cursor-pointer">Content Manager</SelectItem>
                        <SelectItem value="admin" className="cursor-pointer">Admin</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>
              {errors.user_role && <p className="text-xs text-red-500 pl-4">{errors.user_role.message}</p>}
            </div>

            {/* Submit Button */}
            <div className="flex justify-center pt-2">
              <button
                type="submit"
                disabled={isRegisterLoading}
                className="w-full py-3.5 bg-[#F59E0B] hover:bg-amber-600 text-white font-bold rounded-full text-sm shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
              >
                {isRegisterLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-white" />
                    Creating account...
                  </>
                ) : (
                  "Register Now"
                )}
              </button>
            </div>
          </form>

          {/* Login Prompt */}
          <p className="text-center text-xs text-slate-400 mt-5">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-[#F59E0B] font-bold hover:underline cursor-pointer"
            >
              Log In
            </Link>
          </p>
        </div>

        <div />
      </div>

      {/* Right Side: Visual Hero Card */}
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
              Start Your Journey with CPS LMS Today
            </h2>
            <p className="text-sm lg:text-base text-slate-300 font-light italic leading-relaxed">
              Unlock access to world-class courses, quizzes, and certificates crafted by industry experts.
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
