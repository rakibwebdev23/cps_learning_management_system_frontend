const stats = [
  { value: "15,000+", label: "Active Students", desc: "Learners from 40+ countries" },
  { value: "500+", label: "Courses", desc: "Across 8 categories" },
  { value: "200+", label: "Instructors", desc: "Vetted industry experts" },
  { value: "96%", label: "Satisfaction", desc: "Student satisfaction rate" },
  { value: "4.8★", label: "Average Rating", desc: "Across all courses" },
  { value: "3M+", label: "Lessons Completed", desc: "Since platform launch" },
]

export default function LearningStats() {
  return (
    <section className="py-20 bg-[#F59E0B]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white">Trusted by Thousands of Learners</h2>
          <p className="text-amber-100 mt-3">Our platform delivers measurable outcomes.</p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-3xl font-extrabold text-white">{stat.value}</p>
              <p className="text-sm font-semibold text-amber-50 mt-1">{stat.label}</p>
              <p className="text-xs text-amber-200 mt-0.5">{stat.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
