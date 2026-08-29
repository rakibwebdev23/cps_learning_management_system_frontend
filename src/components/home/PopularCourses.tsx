import Link from "next/link"
import { ArrowRight, Star, Bookmark } from "lucide-react"

const popularCourses = [
  {
    id: "c-1",
    title: "React - The Complete Guide",
    category: "Development",
    instructor: "John Smith",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
    rating: 4.8,
    reviews: 1230,
    price: "$49.00",
    lessons: "24 Lessons",
    thumbnail: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=600&auto=format&fit=crop&q=80",
    badgeColor: "bg-amber-50 text-[#F59E0B]",
  },
  {
    id: "c-2",
    title: "UI/UX Design Fundamentals",
    category: "Design",
    instructor: "Sarah Johnson",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80",
    rating: 4.7,
    reviews: 980,
    price: "$39.00",
    lessons: "18 Lessons",
    thumbnail: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=600&auto=format&fit=crop&q=80",
    badgeColor: "bg-amber-50 text-amber-700",
  },
  {
    id: "c-3",
    title: "Node.js & Express.js Mastery",
    category: "Development",
    instructor: "Michael Brown",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80",
    rating: 4.9,
    reviews: 1510,
    price: "$39.00",
    lessons: "32 Lessons",
    thumbnail: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&auto=format&fit=crop&q=80",
    badgeColor: "bg-amber-50 text-[#F59E0B]",
  },
  {
    id: "c-4",
    title: "Digital Marketing Strategy",
    category: "Marketing",
    instructor: "Emily Davis",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&auto=format&fit=crop&q=80",
    rating: 4.6,
    reviews: 750,
    price: "$29.00",
    lessons: "15 Lessons",
    thumbnail: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&auto=format&fit=crop&q=80",
    badgeColor: "bg-emerald-50 text-emerald-600",
  },
]

export default function PopularCourses() {
  return (
    <section className="py-16 bg-white border-y border-slate-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">Popular Courses</h2>
            <p className="text-sm text-slate-500 mt-1">Explore our most popular and top-rated courses.</p>
          </div>
          <Link href="/courses" className="inline-flex items-center gap-1.5 text-xs font-bold text-[#F59E0B] hover:underline cursor-pointer">
            View All Courses <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {popularCourses.map((course) => (
            <div key={course.id} className="group rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col cursor-pointer">
              
              {/* Thumbnail Container */}
              <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                <img
                  src={course.thumbnail}
                  alt={course.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <button className="absolute top-3 right-3 p-2 rounded-full bg-white/80 backdrop-blur-md text-slate-600 hover:text-[#F59E0B] transition-colors cursor-pointer">
                  <Bookmark className="h-4 w-4" />
                </button>
              </div>

              {/* Card Body */}
              <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                <div className="space-y-2">
                  <span className={`inline-block px-2.5 py-0.5 rounded-md text-[10px] font-bold ${course.badgeColor}`}>
                    {course.category}
                  </span>
                  <h3 className="text-sm font-bold text-slate-900 group-hover:text-[#F59E0B] transition-colors line-clamp-2">
                    {course.title}
                  </h3>
                </div>

                {/* Instructor & Rating */}
                <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-100">
                  <div className="flex items-center gap-2">
                    <img src={course.avatar} alt={course.instructor} className="h-6 w-6 rounded-full object-cover" />
                    <span className="text-[11px] font-medium text-slate-600 truncate max-w-[90px]">{course.instructor}</span>
                  </div>
                  <div className="flex items-center gap-1 text-amber-500 font-semibold text-[11px]">
                    <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                    <span>{course.rating}</span>
                    <span className="text-slate-400">({course.reviews})</span>
                  </div>
                </div>

                {/* Price & Lessons */}
                <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
                  <span className="text-base font-bold text-slate-900">{course.price}</span>
                  <span className="text-slate-500 text-[11px] font-medium">{course.lessons}</span>
                </div>

              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
