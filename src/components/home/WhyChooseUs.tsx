import { UserCheck, Clock, Laptop, Award } from "lucide-react"

const features = [
  {
    icon: UserCheck,
    title: "Expert Instructors",
    description: "Learn from industry experts with real-world experience.",
    color: "bg-indigo-50 text-[#4F46E5]",
  },
  {
    icon: Clock,
    title: "Flexible Learning",
    description: "Study at your own pace with lifetime access.",
    color: "bg-emerald-50 text-emerald-600",
  },
  {
    icon: Laptop,
    title: "Hands-on Projects",
    description: "Build real projects and enhance your portfolio.",
    color: "bg-purple-50 text-purple-600",
  },
  {
    icon: Award,
    title: "Certificate",
    description: "Earn recognized certificates upon course completion.",
    color: "bg-amber-50 text-amber-600",
  },
]

export default function WhyChooseUs() {
  return (
    <section className="py-16 bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="mb-12">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">Why Choose CPS LMS?</h2>
          <p className="text-sm text-slate-500 mt-1">We provide the best learning experience with our amazing features.</p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((item, idx) => {
            const Icon = item.icon
            return (
              <div key={idx} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow space-y-4">
                <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${item.color}`}>
                  <Icon className="h-6 w-6" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-base font-bold text-slate-900">{item.title}</h3>
                  <p className="text-xs text-slate-500 leading-relaxed">{item.description}</p>
                </div>
              </div>
            )
          })}
        </div>

      </div>
    </section>
  )
}
