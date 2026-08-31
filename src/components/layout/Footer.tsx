import Image from "next/image"
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
    { label: "API Documentation", href: "https://cps-lms.up.railway.app/documentation", external: true },
    { label: "Support Center", href: "/contact" },
    { label: "Create Account", href: "/register" },
    { label: "Business Policy", href: "/about" },
    { label: "All Courses", href: "/courses" },
  ]

  return (
    <footer className="bg-white text-slate-600 text-xs border-t border-slate-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          
          {/* column 1: about us */}
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">ABOUT US</h3>
              <div className="w-10 h-0.5 bg-[#0075FD] mt-2" />
            </div>

            <p className="text-slate-600 leading-relaxed text-xs">
              CPS LMS is a leading learning management platform empowering students and instructors worldwide with modern tools and expert-curated courses.
            </p>

            <div className="pt-2">
              <Image src="/logo.png" alt="CPS LMS" width={150} height={45} className="h-10 w-auto object-contain" />
            </div>
          </div>

          {/* column 2: our course */}
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">OUR COURSE</h3>
              <div className="w-10 h-0.5 bg-[#0075FD] mt-2" />
            </div>

            <ul className="space-y-3 font-medium">
              {ourCourses.map((item, idx) => (
                <li key={idx}>
                  <Link href={item.href} className="flex items-center gap-2 hover:text-[#0075FD] transition-colors group cursor-pointer text-slate-600">
                    <ChevronsRight className="w-3.5 h-3.5 text-[#0075FD] group-hover:translate-x-1 transition-transform" />
                    <span>{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">QUICK LINKS</h3>
              <div className="w-10 h-0.5 bg-[#0075FD] mt-2" />
            </div>

            <ul className="space-y-3 font-medium">
              {quickLinks.map((item, idx) => (
                <li key={idx}>
                  {item.external ? (
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 hover:text-[#0075FD] transition-colors group cursor-pointer text-slate-600"
                    >
                      <ChevronsRight className="w-3.5 h-3.5 text-[#0075FD] group-hover:translate-x-1 transition-transform" />
                      <span>{item.label}</span>
                    </a>
                  ) : (
                    <Link href={item.href} className="flex items-center gap-2 hover:text-[#0075FD] transition-colors group cursor-pointer text-slate-600">
                      <ChevronsRight className="w-3.5 h-3.5 text-[#0075FD] group-hover:translate-x-1 transition-transform" />
                      <span>{item.label}</span>
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">CONTACT US</h3>
              <div className="w-10 h-0.5 bg-[#0075FD] mt-2" />
            </div>

            <ul className="space-y-3 font-medium text-slate-600">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#0075FD] shrink-0 mt-0.5" />
                <span className="leading-relaxed">4080 Little Acres Lane Mattoon, IL 61938, United States</span>
              </li>

              <li className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-[#0075FD] shrink-0 mt-0.5" />
                <div className="flex flex-col">
                  <span>support@cpslms.com</span>
                  <span>info@cpslms.com</span>
                </div>
              </li>

              <li className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-[#0075FD] shrink-0 mt-0.5" />
                <div className="flex flex-col">
                  <span>+880 23456789</span>
                  <span>+880 27 2564687</span>
                </div>
              </li>
            </ul>
          </div>

        </div>
      </div>

      <div className="bg-slate-50 py-4 border-t border-slate-200 text-center text-slate-600 text-xs">
        <p>
          Copyright 2026 © <span className="text-[#0075FD] font-semibold">{SITE_NAME}</span>, Designed by: <span className="text-[#0075FD] font-semibold">CPS LMS Team</span>
        </p>
      </div>
    </footer>
  )
}
