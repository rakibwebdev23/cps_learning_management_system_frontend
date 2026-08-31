"use client"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAppSelector } from "@/redux/hooks"
import { Loader2 } from "lucide-react"

interface ProtectedRouteProps {
  children: React.ReactNode
  allowedRoles?: string[]
}

export default function ProtectedRoute({ children, allowedRoles }: ProtectedRouteProps) {
  const router = useRouter()
  const { isAuthenticated, accessToken, user } = useAppSelector((state) => state.auth)
  const [isHydrated, setIsHydrated] = useState(false)

  useEffect(() => {
    setIsHydrated(true)
  }, [])

  useEffect(() => {
    if (!isHydrated) return

    // check auth status
    const tokenInCookie = typeof document !== "undefined"
      ? document.cookie.split("; ").find((r) => r.startsWith("accessToken=") || r.startsWith("jwt="))
      : null

    const hasAuth = isAuthenticated || !!accessToken || !!tokenInCookie

    if (!hasAuth) {
      router.replace("/login")
      return
    }

    // role check if allowedroles provided
    if (allowedRoles && allowedRoles.length > 0 && user) {
      const userRole = String(user.role || user.user_role || "").toUpperCase()
      const normalizedAllowed = allowedRoles.map((r) => r.toUpperCase())

      if (userRole && !normalizedAllowed.includes(userRole)) {
        if (userRole === "INSTRUCTOR") {
          router.replace("/dashboard/instructor")
        } else if (userRole === "ADMIN") {
          router.replace("/dashboard/admin")
        } else if (userRole === "CONTENT_MANAGER" || userRole === "CONTENT-MANAGER") {
          router.replace("/dashboard/content-manager")
        } else {
          router.replace("/dashboard/student")
        }
      }
    }
  }, [isHydrated, isAuthenticated, accessToken, user, allowedRoles, router])

  if (!isHydrated) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="w-10 h-10 animate-spin text-[#0075FD]" />
          <p className="text-sm font-bold text-black">Verifying authentication...</p>
        </div>
      </div>
    )
  }

  const tokenInCookie = typeof document !== "undefined"
    ? document.cookie.split("; ").find((r) => r.startsWith("accessToken=") || r.startsWith("jwt="))
    : null
  const hasAuth = isAuthenticated || !!accessToken || !!tokenInCookie

  if (!hasAuth) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="w-10 h-10 animate-spin text-[#0075FD]" />
          <p className="text-sm font-bold text-black">Redirecting to login...</p>
        </div>
      </div>
    )
  }

  return <>{children}</>
}
