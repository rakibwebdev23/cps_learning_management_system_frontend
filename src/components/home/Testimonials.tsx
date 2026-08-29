import { Star } from "lucide-react"

const testimonials = [
  { name: "Alex Johnson", role: "Software Engineer", avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=80&q=80", rating: 5, text: "CPS LMS completely transformed my career. The Next.js Bootcamp gave me everything I needed to land my dream job. The instructors are world-class." },
  { name: "Emily Chen", role: "UX Designer", avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=80&q=80", rating: 5, text: "The UI/UX Design course was exceptional. Real-world projects, detailed feedback, and a fantastic community. Best investment I've made in my skills." },
  { name: "Mohammed Al-Rashid", role: "Mobile Developer", avatar: "https://images.unsplash.com/photo-1531891437562-4301cf35b7e4?w=80&q=80", rating: 5, text: "I built and published my first mobile app in 6 weeks using the React Native course. The step-by-step approach makes complex topics approachable." },
  { name: "Fatima Noor", role: "Cloud Architect", avatar: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=80&q=80", rating: 5, text: "Passed my AWS Solutions Architect exam on the first attempt thanks to CPS LMS. The content is current, comprehensive, and beautifully structured." },
]

export default function Testimonials() {
  return (
    <section className="py-20 bg-slate-50 dark:bg-slate-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-sm font-medium text-amber-600 mb-2">Student Stories</p>
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white">What Our Learners Say</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((t) => (
            <div key={t.name} className="bg-white dark:bg-slate-900 rounded-xl border p-6 hover:shadow-md transition-shadow">
              <div className="flex gap-0.5 mb-4">
                {[...Array(t.rating)].map((_, i) => <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />)}
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-4">&quot;{t.text}&quot;</p>
              <div className="flex items-center gap-3">
                <img src={t.avatar} alt={t.name} className="h-10 w-10 rounded-full object-cover" />
                <div>
                  <p className="text-sm font-semibold text-slate-900 dark:text-white">{t.name}</p>
                  <p className="text-xs text-slate-500">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
