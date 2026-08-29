import Link from "next/link"
import { Users, BookOpen, GraduationCap, DollarSign, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import StatCard from "@/components/dashboard/StatCard"
import PageHeader from "@/components/common/PageHeader"
import StatusBadge from "@/components/common/StatusBadge"
import EnrollmentChart from "@/components/charts/EnrollmentChart"
import UserDistributionChart from "@/components/charts/UserDistributionChart"
import { adminStats } from "@/data/dashboard"
import { users } from "@/data/users"
import { enrollments } from "@/data/enrollments"
import { formatPrice, formatDate, getInitials } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function AdminDashboard() {
  const recentUsers = users.slice(0, 5)
  const recentEnrollments = enrollments.slice(0, 5)

  return (
    <div>
      <PageHeader title="Admin Overview" description="Platform key metrics and system health." />

      {/* stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard title="Total Users" value={adminStats.totalUsers.toLocaleString()} icon={Users} iconColor="text-[#F59E0B]" iconBg="bg-amber-50" change="+8% this month" changeType="up" />
        <StatCard title="Total Courses" value={adminStats.totalCourses} icon={BookOpen} iconColor="text-amber-600" iconBg="bg-amber-50" change="+4 new courses" changeType="up" />
        <StatCard title="Enrollments" value={adminStats.totalEnrollments.toLocaleString()} icon={GraduationCap} iconColor="text-emerald-600" iconBg="bg-emerald-50" change="+15% overall" changeType="up" />
        <StatCard title="Total Revenue" value={formatPrice(adminStats.totalRevenue)} icon={DollarSign} iconColor="text-[#F59E0B]" iconBg="bg-amber-50" change="+12% revenue" changeType="up" />
      </div>

      {/* charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2"><EnrollmentChart /></div>
        <UserDistributionChart />
      </div>

      {/* tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* recent users */}
        <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-md shadow-slate-200/50">
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-white">
            <h2 className="font-bold text-slate-900 text-base">Recent Users</h2>
            <Button variant="ghost" size="sm" asChild><Link href="/dashboard/admin/users" className="gap-1 text-xs font-semibold text-[#F59E0B]">View All <ArrowRight className="h-3 w-3" /></Link></Button>
          </div>
          <div className="divide-y divide-slate-100 bg-white">
            {recentUsers.map((u) => (
              <div key={u.id} className="flex items-center justify-between px-6 py-3.5 hover:bg-slate-50 transition-colors">
                <div className="flex items-center gap-3">
                  <Avatar className="h-9 w-9 border border-slate-200">
                    <AvatarImage src={u.avatar} />
                    <AvatarFallback className="text-xs bg-amber-100 text-amber-900 font-bold">{getInitials(u.name)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-semibold text-slate-900">{u.name}</p>
                    <p className="text-xs text-slate-500">{u.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold uppercase px-2.5 py-1 rounded-md bg-slate-100 text-slate-700">{u.role.replace("_", " ")}</span>
                  <StatusBadge status={u.status} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* recent enrollments */}
        <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-md shadow-slate-200/50">
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-white">
            <h2 className="font-bold text-slate-900 text-base">Recent Enrollments</h2>
            <Button variant="ghost" size="sm" asChild><Link href="/dashboard/admin/enrollments" className="gap-1 text-xs font-semibold text-[#F59E0B]">View All <ArrowRight className="h-3 w-3" /></Link></Button>
          </div>
          <div className="divide-y divide-slate-100 bg-white">
            {recentEnrollments.map((e) => (
              <div key={e.id} className="flex items-center justify-between px-6 py-3.5 hover:bg-slate-50 transition-colors">
                <div>
                  <p className="text-sm font-semibold text-slate-900 line-clamp-1">{e.studentName}</p>
                  <p className="text-xs text-slate-500 line-clamp-1">{e.courseTitle}</p>
                </div>
                <div className="text-right">
                  <StatusBadge status={e.status} />
                  <p className="text-xs text-slate-400 font-medium mt-1">{formatDate(e.enrolledAt)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
