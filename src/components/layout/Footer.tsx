import Link from "next/link"
import { BookOpen, ChevronsRight, MapPin, Mail, Phone } from "lucide-react"
import { SITE_NAME } from "@/lib/constants"

export default function Footer() {
  const ourCourses = [
    { label: "Web Development", href: "/courses" },
    { label: "Graphics Design", href: "/courses" },
    { label: "Data Science", href: "/courses" },
    { label: "Cyber Security", href: "/courses" },
    { label: "Support Center", href: "/contact" },
  ]

  const quickLinks = [
    { label: "Support Center", href: "/contact" },
    { label: "Create Account", href: "/register" },
    { label: "Business Policy", href: "/about" },
    { label: "Terms & Conditions", href: "/about" },
    { label: "All Courses", href: "/courses" },
  ]

  return (
    <footer className="bg-[#1c2033] text-slate-300 text-xs border-t border-slate-800/80">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          
          {/* Column 1: ABOUT US */}
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">ABOUT US</h3>
              <div className="w-10 h-0.5 bg-[#F59E0B] mt-2" />
            </div>

            <p className="text-slate-300 leading-relaxed text-xs">
              CPS LMS is a leading learning management platform empowering students and instructors worldwide with modern tools and expert-curated courses.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#F59E0B] text-white shadow-md shrink-0">
                <BookOpen className="h-6 w-6 text-white" />
              </div>
              <div>
                <span className="text-lg font-bold text-white tracking-tight">{SITE_NAME}</span>
                <p className="text-[10px] text-[#F59E0B] font-semibold uppercase tracking-wider">Education Center</p>
              </div>
            </div>
          </div>

          {/* Column 2: OUR COURSE */}
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">OUR COURSE</h3>
              <div className="w-10 h-0.5 bg-[#F59E0B] mt-2" />
            </div>

            <ul className="space-y-3 font-medium">
              {ourCourses.map((item, idx) => (
                <li key={idx}>
                  <Link href={item.href} className="flex items-center gap-2 hover:text-[#F59E0B] transition-colors group cursor-pointer">
                    <ChevronsRight className="w-3.5 h-3.5 text-[#F59E0B] group-hover:translate-x-1 transition-transform" />
                    <span>{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: QUICK LINKS */}
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">QUICK LINKS</h3>
              <div className="w-10 h-0.5 bg-[#F59E0B] mt-2" />
            </div>

            <ul className="space-y-3 font-medium">
              {quickLinks.map((item, idx) => (
                <li key={idx}>
                  <Link href={item.href} className="flex items-center gap-2 hover:text-[#F59E0B] transition-colors group cursor-pointer">
                    <ChevronsRight className="w-3.5 h-3.5 text-[#F59E0B] group-hover:translate-x-1 transition-transform" />
                    <span>{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: CONTACT US */}
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">CONTACT US</h3>
              <div className="w-10 h-0.5 bg-[#F59E0B] mt-2" />
            </div>

            <ul className="space-y-3 font-medium">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#F59E0B] shrink-0 mt-0.5" />
                <span className="leading-relaxed">4080 Little Acres Lane Mattoon, IL 61938, United States</span>
              </li>

              <li className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-[#F59E0B] shrink-0 mt-0.5" />
                <div className="flex flex-col">
                  <span>support@cpslms.com</span>
                  <span>info@cpslms.com</span>
                </div>
              </li>

              <li className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-[#F59E0B] shrink-0 mt-0.5" />
                <div className="flex flex-col">
                  <span>+880 23456789</span>
                  <span>+880 27 2564687</span>
                </div>
              </li>
            </ul>
          </div>

        </div>
      </div>

      {/* Bottom Copyright Bar */}
      <div className="bg-[#131625] py-4 border-t border-slate-800/60 text-center text-slate-400 text-xs">
        <p>
          Copyright 2026 © <span className="text-[#F59E0B] font-semibold">{SITE_NAME}</span>, Designed by: <span className="text-[#F59E0B] font-semibold">CPS LMS Team</span>
        </p>
      </div>
    </footer>
  )
}
