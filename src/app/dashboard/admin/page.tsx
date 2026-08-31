"use client"
import Link from "next/link"
import { Users, BookOpen, GraduationCap, DollarSign, ArrowRight, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import StatCard from "@/components/dashboard/StatCard"
import PageHeader from "@/components/common/PageHeader"
import StatusBadge from "@/components/common/StatusBadge"
import EnrollmentChart from "@/components/charts/EnrollmentChart"
import UserDistributionChart from "@/components/charts/UserDistributionChart"
import { formatPrice, formatDate, getInitials } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

import { useGetUsersQuery } from "@/redux/api/featuresApi/user/user.api"
import { useGetCoursesQuery } from "@/redux/api/featuresApi/course/course.api"
import { useGetEnrollmentsQuery } from "@/redux/api/featuresApi/enrollment/enrollment.api"

export default function AdminDashboard() {
  const { data: usersData, isLoading: isUsersLoading } = useGetUsersQuery()
  const users = usersData || []

  const { data: coursesData, isLoading: isCoursesLoading } = useGetCoursesQuery()
  const courses = coursesData?.data || []

  const { data: enrollmentsData, isLoading: isEnrollmentsLoading } = useGetEnrollmentsQuery()
  const enrollments = enrollmentsData?.data || []

  const isLoading = isUsersLoading || isCoursesLoading || isEnrollmentsLoading

  if (isLoading) {
    return <div className="flex justify-center p-20"><Loader2 className="w-8 h-8 animate-spin text-[#0075FD]" /></div>
  }

  const recentUsers = [...users].reverse().slice(0, 5)
  const recentEnrollments = [...enrollments].reverse().slice(0, 5)

  // calculate stats
  const totalRevenue = enrollments.reduce((acc: number, curr: any) => {
    // basic calculation if we don't have actual transaction amounts, assume course price
    return acc + (curr.course?.price || 0)
  }, 0)

  return (
    <div>
      <PageHeader title="Admin Overview" description="Platform key metrics and system health." />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard title="Total Users" value={users.length.toLocaleString()} icon={Users} iconColor="text-[#0075FD]" iconBg="bg-blue-50" change="+8% this month" changeType="up" />
        <StatCard title="Total Courses" value={courses.length.toLocaleString()} icon={BookOpen} iconColor="text-[#0075FD]" iconBg="bg-blue-50" change="+4 new courses" changeType="up" />
        <StatCard title="Enrollments" value={enrollments.length.toLocaleString()} icon={GraduationCap} iconColor="text-emerald-600" iconBg="bg-emerald-50" change="+15% overall" changeType="up" />
        <StatCard title="Total Revenue" value={formatPrice(totalRevenue)} icon={DollarSign} iconColor="text-[#0075FD]" iconBg="bg-blue-50" change="+12% revenue" changeType="up" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2"><EnrollmentChart /></div>
        <UserDistributionChart />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-md shadow-slate-200/50">
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-white">
            <h2 className="font-bold text-slate-900 text-base">Recent Users</h2>
            <Button variant="ghost" size="sm" asChild><Link href="/dashboard/admin/users" className="gap-1 text-xs font-semibold text-[#0075FD]">View All <ArrowRight className="h-3 w-3" /></Link></Button>
          </div>
          <div className="divide-y divide-slate-100 bg-white">
            {recentUsers.map((u: any) => (
              <div key={u.id || u.documentId} className="flex items-center justify-between px-6 py-3.5 hover:bg-slate-50 transition-colors">
                <div className="flex items-center gap-3">
                  <Avatar className="h-9 w-9 border border-slate-200">
                    <AvatarImage src={u.avatar} />
                    <AvatarFallback className="text-xs bg-blue-100 text-blue-900 font-bold">{getInitials(u.username || u.name || "User")}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-semibold text-slate-900">{u.username || u.name}</p>
                    <p className="text-xs text-slate-500">{u.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold uppercase px-2.5 py-1 rounded-md bg-slate-100 text-slate-700">{(u.role?.name || "User").replace("_", " ")}</span>
                  <StatusBadge status={u.blocked ? "inactive" : "active"} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-md shadow-slate-200/50">
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-white">
            <h2 className="font-bold text-slate-900 text-base">Recent Enrollments</h2>
            <Button variant="ghost" size="sm" asChild><Link href="/dashboard/admin/enrollments" className="gap-1 text-xs font-semibold text-[#0075FD]">View All <ArrowRight className="h-3 w-3" /></Link></Button>
          </div>
          <div className="divide-y divide-slate-100 bg-white">
            {recentEnrollments.map((e: any) => (
              <div key={e.id || e.documentId} className="flex items-center justify-between px-6 py-3.5 hover:bg-slate-50 transition-colors">
                <div>
                  <p className="text-sm font-semibold text-slate-900 line-clamp-1">{e.student?.username || e.student?.name || "Unknown Student"}</p>
                  <p className="text-xs text-slate-500 line-clamp-1">{e.course?.title || "Unknown Course"}</p>
                </div>
                <div className="text-right">
                  <StatusBadge status={e.status || "active"} />
                  <p className="text-xs text-slate-400 font-medium mt-1">{formatDate(e.createdAt || new Date().toISOString())}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
