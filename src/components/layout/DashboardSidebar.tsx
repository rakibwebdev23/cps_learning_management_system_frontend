"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  GraduationCap, LayoutDashboard, BookOpen, Layers, HelpCircle, Award,
  MessageSquare, User, Settings, LogOut, Shield, FileText, BarChart3, Users
} from "lucide-react"
import { SITE_NAME } from "@/lib/constants"

interface SidebarProps {
  role: "STUDENT" | "INSTRUCTOR" | "CONTENT_MANAGER" | "ADMIN"
}

export default function DashboardSidebar({ role }: SidebarProps) {
  const pathname = usePathname()

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
        <div className="flex h-16 items-center gap-3 px-6 border-b border-slate-200">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#F59E0B] text-white shrink-0">
            <GraduationCap className="h-5 w-5 text-white" />
          </div>
          <span className="font-extrabold text-lg text-slate-900 tracking-tight">{SITE_NAME}</span>
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
                    ? "bg-slate-200 text-slate-900 font-bold"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`h-4 w-4 ${isActive ? "text-slate-900" : "text-slate-500"}`} />
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
        <Link
          href="/login"
          className="flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-sm font-medium text-slate-600 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
        >
          <LogOut className="h-4 w-4" />
          <span>Logout</span>
        </Link>
      </div>

    </aside>
  )
}
