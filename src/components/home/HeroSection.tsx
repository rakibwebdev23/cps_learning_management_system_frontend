import Link from "next/link"
import { Sparkles, ArrowRight, BookOpen, Users, UserCheck, ShieldCheck, Award, Headphones } from "lucide-react"
import { Button } from "@/components/ui/button"

const heroStats = [
  { icon: Users, count: "12,000+", label: "Active Students", color: "text-[#0075FD] bg-blue-50" },
  { icon: BookOpen, count: "1000+", label: "Expert Courses", color: "text-[#0075FD] bg-blue-50" },
  { icon: UserCheck, count: "50+", label: "Top Instructors", color: "text-[#0075FD] bg-blue-50" },
  { icon: ShieldCheck, count: "98%", label: "Success Rate", color: "text-emerald-600 bg-emerald-50" },
]

export default function HeroSection() {
  return (
    <section className="relative pt-6 pb-16 md:pt-10 md:pb-24 bg-white overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

          {/* Left Column Text */}
          <div className="lg:col-span-7 space-y-6">
            {/* Pill Eyebrow */}
            <div className=" text-[#0075FD] text-xs font-bold">
              The Best Learning Platform
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-[56px] font-extrabold text-slate-900 tracking-tight leading-[1.12]">
              Learn Without Limits. <br className="hidden sm:inline" />
              <span className="text-[#0075FD]">Achieve Anything.</span>
            </h1>

            {/* Description */}
            <p className="text-base sm:text-lg text-slate-600 max-w-xl leading-relaxed">
              Join thousands of learners around the world and access high-quality courses from expert instructors.
            </p>

            {/* Dual CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                href="/courses"
                className="group relative border-2 border-[#0075FD] text-white bg-transparent rounded-full px-7 py-3 text-sm font-bold transition-all duration-300 cursor-pointer overflow-hidden z-10 shadow-md shadow-blue-500/10 hover:shadow-blue-500/25 inline-flex items-center justify-center gap-2"
              >
                <span className="absolute inset-0 bg-[#0075FD] -z-20" />
                <span className="absolute inset-0 bg-[#050C1C] translate-y-[101%] group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] -z-10" />
                <span className="relative z-20 text-white transition-colors duration-300 inline-flex items-center gap-2">
                  Explore Courses <ArrowRight className="h-4 w-4 text-white" />
                </span>
              </Link>
              <Button size="lg" variant="outline" className="rounded-full px-7" asChild>
                <Link href="/about">
                  How It Works
                </Link>
              </Button>
            </div>

            {/* Social Proof */}
            <div className="flex items-center gap-4 pt-4 border-t border-slate-100">
              <div className="flex -space-x-2">
                {[
                  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
                  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80",
                  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80",
                ].map((src, i) => (
                  <img key={i} src={src} alt="Learner" className="h-9 w-9 rounded-full border-2 border-white object-cover" />
                ))}
              </div>
              <div className="text-xs text-slate-600">
                <p className="font-semibold text-slate-900">Trusted by 12,000+ learners worldwide</p>
                <div className="flex items-center gap-1 text-[#0075FD] mt-0.5">
                  {"★".repeat(5)} <span className="font-semibold text-slate-700 ml-1">4.9 (1,200 reviews)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column Image with Floating Badges */}
          <div className="lg:col-span-5 relative flex justify-center">
            <div className="relative w-full max-w-md lg:max-w-none aspect-[4/4.2] rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-br from-blue-100 via-slate-50 to-white p-4">
              <img
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&auto=format&fit=crop&q=80"
                alt="Female Student Learning"
                className="w-full h-full object-cover rounded-2xl"
              />

              {/* Floating Badge Top Right */}
              <div className="absolute top-6 right-6 bg-white/95 backdrop-blur-md px-3.5 py-2.5 rounded-xl shadow-lg border border-slate-100 flex items-center gap-2.5">
                <div className="p-2 rounded-lg bg-blue-50 text-[#0075FD]">
                  <BookOpen className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-900">1000+</p>
                  <p className="text-[10px] text-slate-500 font-medium">Expert Courses</p>
                </div>
              </div>

              {/* Floating Badge Middle Left */}
              <div className="absolute top-28 -left-4 bg-white/95 backdrop-blur-md px-3.5 py-2.5 rounded-xl shadow-lg border border-slate-100 flex items-center gap-2.5">
                <div className="p-2 rounded-lg bg-blue-50 text-[#0075FD]">
                  <Users className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-900">50+</p>
                  <p className="text-[10px] text-slate-500 font-medium">Instructors</p>
                </div>
              </div>

              {/* Floating Badge Lower Right */}
              <div className="absolute bottom-16 right-4 bg-white/95 backdrop-blur-md px-3.5 py-2.5 rounded-xl shadow-lg border border-slate-100 flex items-center gap-2.5">
                <div className="p-2 rounded-lg bg-emerald-50 text-emerald-600">
                  <Award className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-900">98%</p>
                  <p className="text-[10px] text-slate-500 font-medium">Satisfaction</p>
                </div>
              </div>

              {/* Floating Badge Bottom Left */}
              <div className="absolute bottom-6 left-6 bg-white/95 backdrop-blur-md px-3.5 py-2.5 rounded-xl shadow-lg border border-slate-100 flex items-center gap-2.5">
                <div className="p-2 rounded-lg bg-blue-50 text-[#0075FD]">
                  <Headphones className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-900">24/7</p>
                  <p className="text-[10px] text-slate-500 font-medium">Support</p>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Stats Row Bar Below Hero */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {heroStats.map((stat, idx) => {
            const Icon = stat.icon
            return (
              <div key={idx} className="flex items-center gap-4 p-5 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${stat.color}`}>
                  <Icon className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900">{stat.count}</h3>
                  <p className="text-xs font-medium text-slate-500">{stat.label}</p>
                </div>
              </div>
            )
          })}
        </div>

      </div>
    </section>
  )
}
