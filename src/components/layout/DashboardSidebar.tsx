"use client"

import Image from "next/image"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import {
  GraduationCap, LayoutDashboard, BookOpen, Layers, HelpCircle, Award,
  MessageSquare, User, Settings, LogOut, Shield, FileText, BarChart3, Users
} from "lucide-react"
import { SITE_NAME } from "@/lib/constants"
import { useAppDispatch } from "@/redux/hooks"
import { logout } from "@/redux/api/featuresApi/auth/authSlice"
import { baseApi } from "@/redux/api/baseApi/baseApi"

interface SidebarProps {
  role: "STUDENT" | "INSTRUCTOR" | "CONTENT_MANAGER" | "ADMIN"
}

export default function DashboardSidebar({ role }: SidebarProps) {
  const pathname = usePathname()
  const router = useRouter()
  const dispatch = useAppDispatch()

  const handleLogout = () => {
    if (typeof document !== "undefined") {
      document.cookie = "accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
      document.cookie = "access=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
      document.cookie = "jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
    }
    dispatch(logout())
    dispatch(baseApi.util.resetApiState())
    window.location.href = "/"
  }

  // Dynamic menu per role
  const getNavItems = () => {
    switch (role) {
      case "INSTRUCTOR":
        return [
          { label: "Dashboard", href: "/dashboard/instructor", icon: LayoutDashboard },
          { label: "My Courses", href: "/dashboard/instructor/courses", icon: BookOpen },
          { label: "Lessons", href: "/dashboard/instructor/lessons/create", icon: Layers },
          { label: "Quizzes", href: "/dashboard/instructor/quizzes", icon: HelpCircle },
          { label: "Students", href: "/dashboard/instructor/students", icon: Users },
          { label: "Profile", href: "/dashboard/instructor/profile", icon: User },
        ]
      case "CONTENT_MANAGER":
        return [
          { label: "Dashboard", href: "/dashboard/content-manager", icon: LayoutDashboard },
          { label: "Courses", href: "/dashboard/content-manager/courses", icon: BookOpen },
          { label: "Lessons", href: "/dashboard/content-manager/lessons", icon: Layers },
          { label: "Quizzes", href: "/dashboard/content-manager/quizzes", icon: HelpCircle },
          { label: "Blogs", href: "/dashboard/content-manager/blogs", icon: FileText },
          { label: "Profile", href: "/dashboard/content-manager/profile", icon: User },
        ]
      case "ADMIN":
        return [
          { label: "Dashboard", href: "/dashboard/admin", icon: LayoutDashboard },
          { label: "Users", href: "/dashboard/admin/users", icon: Users },
          { label: "Courses", href: "/dashboard/admin/courses", icon: BookOpen },
          { label: "Enrollments", href: "/dashboard/admin/enrollments", icon: Shield },
          { label: "Statistics", href: "/dashboard/admin/statistics", icon: BarChart3 },
          { label: "Settings", href: "/dashboard/admin/settings", icon: Settings },
          { label: "Profile", href: "/dashboard/admin/profile", icon: User },
        ]
      case "STUDENT":
      default:
        return [
          { label: "Dashboard", href: "/dashboard/student", icon: LayoutDashboard },
          { label: "My Courses", href: "/dashboard/student/courses", icon: BookOpen },
          { label: "Quizzes", href: "/dashboard/student/quizzes", icon: HelpCircle },
          { label: "Results", href: "/dashboard/student/results", icon: Award },
          { label: "Messages", href: "#", icon: MessageSquare, badge: 3 },
          { label: "Profile", href: "/dashboard/student/profile", icon: User },
        ]
    }
  }

  const navItems = getNavItems()

  const rootDashboardPaths = [
    "/dashboard/student",
    "/dashboard/instructor",
    "/dashboard/content-manager",
    "/dashboard/admin",
  ]

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 bg-white text-slate-700 flex flex-col justify-between border-r border-slate-200">

      <div>
        {/* Brand Header - exact h-16 alignment with top header */}
        <div className="flex h-16 items-center px-6 border-b border-slate-200">
          <Link href="/">
            <Image src="/logo.png" alt="CPS LMS" width={140} height={40} className="h-9 w-auto object-contain" priority />
          </Link>
        </div>

        {/* Nav Items */}
        <nav className="space-y-1 p-4">
          {navItems.map((item) => {
            const Icon = item.icon
            
            const isActive =
              item.href !== "#" &&
              (pathname === item.href ||
                (!rootDashboardPaths.includes(item.href) && pathname.startsWith(item.href + "/")))

            return (
              <Link
                key={item.label}
                href={item.href}
                className={`flex items-center justify-between px-3.5 py-2.5 rounded-lg text-sm font-medium transition-all cursor-pointer ${
                  isActive
                    ? "bg-blue-50 text-[#0075FD] font-bold"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`h-4 w-4 ${isActive ? "text-[#0075FD]" : "text-slate-500"}`} />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className={`flex h-5 w-5 items-center justify-center rounded-full text-[11px] font-bold ${
                    isActive ? "bg-slate-900 text-white" : "bg-red-500 text-white"
                  }`}>
                    {item.badge}
                  </span>
                )}
              </Link>
            )
          })}
        </nav>
      </div>

      {/* Logout Footer */}
      <div className="p-4 border-t border-slate-100">
        <button
          onClick={handleLogout}
          type="button"
          className="flex w-full items-center gap-3 px-3.5 py-2.5 rounded-lg text-sm font-medium text-slate-600 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
        >
          <LogOut className="h-4 w-4" />
          <span>Logout</span>
        </button>
      </div>

    </aside>
  )
}
