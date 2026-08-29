import Image from "next/image"
import Link from "next/link"
import { GraduationCap, Target, Users, Award } from "lucide-react"
import { Button } from "@/components/ui/button"
import { users } from "@/data/users"

export default function AboutPage() {
  const instructors = users.filter((u) => u.role === "INSTRUCTOR")
  return (
    <div className="bg-white dark:bg-slate-900 min-h-screen">
      {/* hero */}
      <div className="bg-gradient-to-br from-slate-900 to-blue-950 text-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <GraduationCap className="h-16 w-16 text-amber-400 mx-auto mb-6" />
          <h1 className="text-4xl font-extrabold mb-4">About CPS LMS</h1>
          <p className="text-slate-300 text-lg max-w-xl mx-auto">
            We're on a mission to make professional education accessible, affordable, and impactful for everyone.
          </p>
        </div>
      </div>

      {/* mission */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {[
            { icon: Target, title: "Our Mission", desc: "Provide world-class professional education to learners everywhere, regardless of background or location." },
            { icon: Users, title: "Our Community", desc: "15,000+ active students, 200+ expert instructors, and growing every day." },
            { icon: Award, title: "Our Promise", desc: "Quality courses, industry-recognized certificates, and ongoing support for every learner." },
          ].map((item) => {
            const Icon = item.icon
            return (
              <div key={item.title} className="text-center p-8 rounded-xl border">
                <div className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-amber-50 dark:bg-amber-950 mb-4">
                  <Icon className="h-7 w-7 text-amber-600" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">{item.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
            )
          })}
        </div>

        {/* team */}
        <div className="text-center mb-10">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Meet Our Instructors</h2>
          <p className="text-slate-500 mt-2">The experts driving learning outcomes on our platform.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-16">
          {instructors.map((p) => (
            <div key={p.id} className="rounded-xl border p-6 text-center hover:shadow-md transition-shadow">
              {p.avatar && <img src={p.avatar} alt={p.name} className="h-20 w-20 rounded-full object-cover mx-auto mb-4" />}
              <h3 className="font-semibold text-slate-900 dark:text-white">{p.name}</h3>
              <p className="text-xs text-amber-600 font-medium mb-2">Senior Instructor</p>
              <p className="text-sm text-slate-500">{p.bio}</p>
            </div>
          ))}
        </div>

        <div className="text-center bg-amber-50 dark:bg-amber-950 rounded-2xl p-10">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">Ready to Join Us?</h2>
          <p className="text-slate-500 mb-6">Start your learning journey with CPS LMS today.</p>
          <Button size="lg" className="bg-[#F59E0B] hover:bg-amber-600 text-white font-bold" asChild>
            <Link href="/register">Create Free Account</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
