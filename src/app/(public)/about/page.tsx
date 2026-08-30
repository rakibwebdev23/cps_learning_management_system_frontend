import Image from "next/image"
import Link from "next/link"
import { GraduationCap, Target, Users, Award } from "lucide-react"
import { Button } from "@/components/ui/button"
import { users } from "@/data/users"

export default function AboutPage() {
  const instructors = users.filter((u) => u.role === "INSTRUCTOR")
  return (
    <div className="bg-white min-h-screen">
      {/* hero */}
      <div className="bg-white border-b border-slate-100 text-slate-900 pt-20 pb-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <Image src="/logo.png" alt="CPS LMS" width={180} height={60} className="h-16 w-auto mx-auto mb-4 object-contain" priority />
          <h1 className="text-4xl font-extrabold text-black tracking-tight mb-4">About CPS LMS</h1>
          <p className="text-gray-700 text-lg max-w-xl mx-auto font-medium">
            We're on a mission to make professional education accessible, affordable, and impactful for everyone.
          </p>
        </div>
      </div>

      {/* mission */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {[
            { icon: Target, title: "Our Mission", desc: "Provide world-class professional education to learners everywhere, regardless of background or location." },
            { icon: Users, title: "Our Community", desc: "15,000+ active students, 200+ expert instructors, and growing every day." },
            { icon: Award, title: "Our Promise", desc: "Quality courses, industry-recognized certificates, and ongoing support for every learner." },
          ].map((item) => {
            const Icon = item.icon
            return (
              <div key={item.title} className="text-center p-8 border border-slate-200 rounded-2xl bg-white">
                <div className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-blue-50 mb-4">
                  <Icon className="h-7 w-7 text-[#0075FD]" />
                </div>
                <h3 className="text-lg font-bold text-black mb-2">{item.title}</h3>
                <p className="text-gray-700 text-sm leading-relaxed font-medium">{item.desc}</p>
              </div>
            )
          })}
        </div>

        {/* team */}
        <div className="text-center mb-10">
          <h2 className="text-2xl font-extrabold text-black">Meet Our Instructors</h2>
          <p className="text-gray-700 font-medium mt-2">The experts driving learning outcomes on our platform.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-16">
          {instructors.map((p) => (
            <div key={p.id} className="border border-slate-200 p-6 text-center bg-white hover:border-slate-300 transition-colors">
              {p.avatar && <img src={p.avatar} alt={p.name} className="h-20 w-20 rounded-full object-cover mx-auto mb-4" />}
              <h3 className="font-bold text-black text-base">{p.name}</h3>
              <p className="text-xs text-[#0075FD] font-bold mb-2">Senior Instructor</p>
              <p className="text-sm text-gray-700 font-medium">{p.bio}</p>
            </div>
          ))}
        </div>

        <div className="text-center bg-gray-200 border border-gray-300 rounded-2xl p-10">
          <h2 className="text-2xl font-extrabold text-black mb-3">Ready to Join Us?</h2>
          <p className="text-gray-700 font-medium mb-6">Start your learning journey with CPS LMS today.</p>
          <Button size="lg" className="bg-[#0075FD] hover:bg-blue-600 text-white font-bold rounded-full px-8" asChild>
            <Link href="/register">Create Free Account</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
