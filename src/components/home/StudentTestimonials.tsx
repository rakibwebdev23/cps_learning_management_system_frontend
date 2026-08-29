import { Star } from "lucide-react"

const testimonials = [
  {
    name: "David Miller",
    handle: "@davidmiller",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
    quote: "\"CPS LMS has completely transformed my career. The courses are well structured and easy to follow.\"",
    rating: 5.0,
  },
  {
    name: "Sarah Wilson",
    handle: "@sarahwilson",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80",
    quote: "\"The instructors are amazing and the content is top-notch. Highly recommended!\"",
    rating: 5.0,
  },
  {
    name: "Michael Brown",
    handle: "@michaelbrown",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80",
    quote: "\"Great platform with practical courses. The projects helped me get my dream job.\"",
    rating: 5.0,
  },
]

export default function StudentTestimonials() {
  return (
    <section className="py-16 bg-white border-t border-slate-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-12">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">What Our Students Say</h2>
          <p className="text-sm text-slate-500 mt-1">Join thousands of satisfied learners.</p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((item, idx) => (
            <div key={idx} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between space-y-4">
              
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <img src={item.avatar} alt={item.name} className="h-10 w-10 rounded-full object-cover" />
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">{item.name}</h4>
                    <p className="text-xs text-slate-400 font-medium">{item.handle}</p>
                  </div>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed italic">
                  {item.quote}
                </p>
              </div>

              <div className="flex items-center gap-1 text-amber-500 pt-3 border-t border-slate-100 text-xs font-bold">
                {"★".repeat(5)} <span className="text-slate-900 ml-1">5.0</span>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
