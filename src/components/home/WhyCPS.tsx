import { Shield, Zap, Award, Users, Clock, BookOpen } from "lucide-react"

const features = [
  { icon: Award, title: "Expert Instructors", desc: "Learn from industry professionals with 10+ years of real-world experience.", color: "text-[#0075FD]", bg: "bg-blue-50" },
  { icon: BookOpen, title: "Structured Curriculum", desc: "Every course follows a proven curriculum designed for maximum retention.", color: "text-violet-600", bg: "bg-violet-50" },
  { icon: Clock, title: "Learn at Your Pace", desc: "Lifetime access to all materials. Resume wherever you left off, anytime.", color: "text-emerald-600", bg: "bg-emerald-50" },
  { icon: Shield, title: "Certified Learning", desc: "Earn industry-recognized certificates upon successful course completion.", color: "text-[#0075FD]", bg: "bg-blue-50" },
  { icon: Users, title: "Community Support", desc: "Join 15,000+ learners in active discussion forums and study groups.", color: "text-rose-600", bg: "bg-rose-50" },
  { icon: Zap, title: "Instant Progress", desc: "Real-time progress tracking, quiz analytics, and performance insights.", color: "text-cyan-600", bg: "bg-cyan-50" },
]

export default function WhyCPS() {
  return (
    <section className="py-20 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-sm font-medium text-[#0075FD] mb-2 uppercase tracking-wider">Why Choose Us</p>
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Everything You Need to Succeed</h2>
          <p className="text-slate-500 mt-3 max-w-xl mx-auto">CPS LMS provides everything from quality content to performance analytics to help you grow.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f) => {
            const Icon = f.icon
            return (
              <div key={f.title} className="p-6 rounded-xl border hover:shadow-md transition-shadow">
                <div className={`inline-flex h-12 w-12 items-center justify-center rounded-xl ${f.bg} mb-4`}>
                  <Icon className={`h-6 w-6 ${f.color}`} />
                </div>
                <h3 className="font-semibold text-slate-900 dark:text-white mb-2">{f.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{f.desc}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
