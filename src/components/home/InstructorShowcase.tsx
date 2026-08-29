import Image from "next/image"
import { Star } from "lucide-react"
import { users } from "@/data/users"

const instructors = users.filter((u) => u.role === "INSTRUCTOR")

export default function InstructorShowcase() {
  return (
    <section className="py-20 bg-white dark:bg-slate-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-sm font-medium text-amber-600 mb-2">Meet the Experts</p>
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Learn From the Best</h2>
          <p className="text-slate-500 mt-3">Industry professionals who bring real-world expertise to every lesson.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {instructors.map((instructor) => (
            <div key={instructor.id} className="text-center group">
              <div className="relative h-32 w-32 rounded-full overflow-hidden mx-auto mb-4 ring-4 ring-slate-100 dark:ring-slate-800 group-hover:ring-blue-200 transition-all">
                {instructor.avatar && (
                  <Image src={instructor.avatar} alt={instructor.name} fill className="object-cover" sizes="128px" />
                )}
              </div>
              <h3 className="font-semibold text-slate-900 dark:text-white">{instructor.name}</h3>
              <p className="text-xs text-amber-600 font-medium mt-0.5 mb-2">Expert Instructor</p>
              <p className="text-sm text-slate-500 mb-3 max-w-xs mx-auto leading-relaxed">{instructor.bio}</p>
              <div className="flex items-center justify-center gap-1 text-sm text-slate-600 dark:text-slate-400">
                <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                <span className="font-semibold">4.8</span>
                <span className="text-slate-400">· 2,000+ students</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
