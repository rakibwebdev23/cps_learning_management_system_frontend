"use client"

import Link from "next/link"
import { BookOpen, CheckCircle, Clock, Trophy, ArrowRight, FileCheck, PlayCircle, HelpCircle } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import StatCard from "@/components/dashboard/StatCard"
import CalendarWidget from "@/components/dashboard/CalendarWidget"
import LearningProgressChart from "@/components/charts/EnrollmentChart"
import CourseProgressDonut from "@/components/charts/CompletionChart"

const continueLearning = [
  { id: "c-1", title: "React - The Complete Guide", progress: 75, thumbnail: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=300&auto=format&fit=crop&q=80" },
  { id: "c-2", title: "Node.js & Express.js Mastery", progress: 45, thumbnail: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=300&auto=format&fit=crop&q=80" },
  { id: "c-3", title: "UI/UX Design Fundamentals", progress: 25, thumbnail: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=300&auto=format&fit=crop&q=80" },
]

const recentQuizResults = [
  { title: "JavaScript Fundamentals", score: "90%", date: "2 days ago", color: "text-amber-600 bg-amber-50" },
  { title: "React Components", score: "85%", date: "5 days ago", color: "text-amber-600 bg-amber-50" },
  { title: "Node.js Basics", score: "76%", date: "1 week ago", color: "text-emerald-600 bg-emerald-50" },
]

const recentActivities = [
  { title: "Completed lesson \"React Hooks\"", time: "2 hours ago", icon: FileCheck, color: "text-emerald-600 bg-emerald-50" },
  { title: "Started quiz \"JavaScript Fundamentals\"", time: "1 day ago", icon: HelpCircle, color: "text-amber-600 bg-amber-50" },
  { title: "Scored 90% in \"React Components Quiz\"", time: "2 days ago", icon: Trophy, color: "text-amber-600 bg-amber-50" },
  { title: "Enrolled in \"Node.js & Express.js Mastery\"", time: "3 days ago", icon: BookOpen, color: "text-amber-600 bg-amber-50" },
  { title: "Completed lesson \"Node.js Basics\"", time: "1 week ago", icon: FileCheck, color: "text-emerald-600 bg-emerald-50" },
]

const upcomingDeadlines = [
  { title: "React Assignment", date: "May 25, 2024", color: "bg-red-50 text-red-600 border-red-100" },
  { title: "JavaScript Quiz", date: "May 28, 2024", color: "bg-amber-50 text-amber-600 border-amber-100" },
  { title: "Node.js Project", date: "June 2, 2024", color: "bg-amber-50 text-amber-600 border-amber-100" },
]

export default function StudentDashboard() {
  return (
    <div className="space-y-6 pb-12">
      {/* Header Banner */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">Dashboard</h1>
        <p className="text-sm text-slate-500 mt-1">Welcome back, David! Keep learning and achieve your goals.</p>
      </div>

      {/* Row 1 Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Enrolled Courses" value="8" icon={BookOpen} iconColor="text-emerald-600" iconBg="bg-emerald-50" />
        <StatCard title="In Progress" value="3" icon={Clock} iconColor="text-[#F59E0B]" iconBg="bg-amber-50" />
        <StatCard title="Completed" value="5" icon={CheckCircle} iconColor="text-[#F59E0B]" iconBg="bg-amber-50" />
        <StatCard title="Quiz Average" value="87%" icon={Trophy} iconColor="text-amber-600" iconBg="bg-amber-50" />
      </div>

      {/* Main Grid: 2/3 Content + 1/3 Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column (2 Cols) */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Continue Learning & Recent Quiz Results Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Continue Learning Card */}
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-slate-900">Continue Learning</h3>
                <Link href="/dashboard/student/courses" className="text-xs font-semibold text-[#F59E0B] hover:underline">View All</Link>
              </div>
              <div className="space-y-3.5">
                {continueLearning.map((item) => (
                  <div key={item.id} className="flex items-center gap-3">
                    <img src={item.thumbnail} alt={item.title} className="h-10 w-14 rounded-lg object-cover shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-slate-900 truncate">{item.title}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Progress value={item.progress} className="h-1.5 flex-1 bg-slate-100" />
                        <span className="text-[11px] font-medium text-slate-500">{item.progress}%</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Quiz Results Card */}
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-slate-900">Recent Quiz Results</h3>
                <Link href="/dashboard/student/results" className="text-xs font-semibold text-[#F59E0B] hover:underline">View All</Link>
              </div>
              <div className="space-y-3">
                {recentQuizResults.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between p-2.5 rounded-xl border border-slate-100 bg-white">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${item.color}`}>
                        <HelpCircle className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-slate-900">{item.title}</p>
                        <p className="text-[11px] text-slate-400">{item.date}</p>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-slate-900">{item.score}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Charts Row: Learning Progress & Course Progress */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <LearningProgressChart />
            <CourseProgressDonut />
          </div>

          {/* My Courses & Recent Activity Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* My Courses List */}
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-slate-900">My Courses</h3>
                <Link href="/dashboard/student/courses" className="text-xs font-semibold text-[#F59E0B] hover:underline">View All</Link>
              </div>
              <div className="space-y-3">
                {continueLearning.concat([{ id: "c-4", title: "JavaScript Advanced", progress: 60, thumbnail: "https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=300&auto=format&fit=crop&q=80" }]).map((c) => (
                  <div key={c.id} className="flex items-center gap-3 p-2 rounded-xl hover:bg-slate-50 transition-colors">
                    <img src={c.thumbnail} alt={c.title} className="h-10 w-12 rounded-lg object-cover" />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-slate-900 truncate">{c.title}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Progress value={c.progress} className="h-1.5 flex-1 bg-slate-100" />
                        <span className="text-[10px] text-slate-500">{c.progress}%</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Activity */}
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-slate-900">Recent Activity</h3>
                <span className="text-xs font-semibold text-[#F59E0B]">View All</span>
              </div>
              <div className="space-y-3">
                {recentActivities.map((act, idx) => {
                  const Icon = act.icon
                  return (
                    <div key={idx} className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div className={`p-1.5 rounded-lg shrink-0 ${act.color}`}>
                          <Icon className="h-3.5 w-3.5" />
                        </div>
                        <p className="font-medium text-slate-700 truncate">{act.title}</p>
                      </div>
                      <span className="text-[11px] text-slate-400 shrink-0 ml-2">{act.time}</span>
                    </div>
                  )
                })}
              </div>
            </div>

          </div>

        </div>

        {/* Right Column (1 Col Sidebar) */}
        <div className="space-y-6">
          
          {/* Calendar Widget */}
          <CalendarWidget />

          {/* Upcoming Deadlines Widget */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900">Upcoming Deadlines</h3>
              <span className="text-xs font-semibold text-[#F59E0B] hover:underline cursor-pointer">View All</span>
            </div>
            <div className="space-y-2.5">
              {upcomingDeadlines.map((item, idx) => (
                <div key={idx} className={`p-3 rounded-xl border ${item.color} flex items-center justify-between`}>
                  <div>
                    <p className="text-xs font-bold text-slate-900">{item.title}</p>
                    <p className="text-[11px] font-medium opacity-80">{item.date}</p>
                  </div>
                  <Clock className="h-4 w-4 opacity-70" />
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  )
}
