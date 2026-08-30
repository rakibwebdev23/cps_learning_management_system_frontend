"use client"
import DashboardSidebar from "./DashboardSidebar"
import DashboardHeader from "./DashboardHeader"
import ProtectedRoute from "@/components/common/ProtectedRoute"

type Role = "student" | "instructor" | "content-manager" | "admin"

const roleToNormalized: Record<Role, "STUDENT" | "INSTRUCTOR" | "CONTENT_MANAGER" | "ADMIN"> = {
  student: "STUDENT",
  instructor: "INSTRUCTOR",
  "content-manager": "CONTENT_MANAGER",
  admin: "ADMIN",
}

export default function DashboardLayout({ children, role }: { children: React.ReactNode; role: Role }) {
  const normalizedRole = roleToNormalized[role] || "STUDENT"

  return (
    <ProtectedRoute allowedRoles={[normalizedRole]}>
      <div className="min-h-screen bg-[#F8FAFC]">
        {/* Fixed Navy Sidebar */}
        <DashboardSidebar role={normalizedRole} />

        {/* Main Content AreaOffset by Sidebar width (64 = 16rem = 256px) */}
        <div className="pl-64 flex flex-col min-h-screen">
          <DashboardHeader role={normalizedRole} />
          <main className="flex-1 p-6 md:p-8 animate-fade-in">
            {children}
          </main>
        </div>
      </div>
    </ProtectedRoute>
  )
}
