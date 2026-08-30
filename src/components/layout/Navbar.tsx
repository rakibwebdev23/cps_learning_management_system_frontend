"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import Image from "next/image"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export default function Navbar() {
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const controlNavbar = () => {
      if (typeof window !== "undefined") {
        if (window.scrollY > lastScrollY && window.scrollY > 80) {
          setIsVisible(false)
        } else {
          setIsVisible(true)
        }
        setLastScrollY(window.scrollY)
      }
    }

    if (typeof window !== "undefined") {
      window.addEventListener("scroll", controlNavbar)
      return () => {
        window.removeEventListener("scroll", controlNavbar)
      }
    }
  }, [lastScrollY])

  const navLinks = [
    { label: "Courses", href: "/courses" },
    { label: "Blog", href: "/blog" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ]

  return (
    <div
      className={cn(
        "fixed top-3 md:top-6 left-0 right-0 z-50 transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]",
        isVisible
          ? "translate-y-0 opacity-100"
          : "-translate-y-[150%] opacity-0"
      )}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <nav className="bg-white/95 backdrop-blur-md rounded-2xl py-3 px-4 md:py-4 md:px-6 shadow-xl border border-slate-100 relative">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 cursor-pointer">
              <Image src="/logo.png" alt="CPS LMS" width={140} height={40} className="h-9 w-auto object-contain" priority />
            </Link>

            {/* Desktop Nav Links */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => {
                const isActive = pathname === link.href
                return (
                  <Link
                    key={link.label}
                    href={link.href}
                    className={cn(
                      "text-sm font-medium transition-colors duration-200 cursor-pointer py-1",
                      isActive
                        ? "text-[#0075FD] font-bold"
                        : "text-slate-700 hover:text-[#0075FD]"
                    )}
                  >
                    {link.label}
                  </Link>
                )
              })}
            </div>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center gap-4">
              <Link
                href="/login"
                className="text-sm font-medium text-slate-700 hover:text-[#0075FD] transition-colors cursor-pointer px-3 py-2"
              >
                Log In
              </Link>

              <Link
                href="/register"
                className="group relative border-2 border-[#0075FD] text-white bg-transparent rounded-full px-6 py-2 text-sm font-bold transition-all duration-300 cursor-pointer overflow-hidden z-10 shadow-md shadow-blue-500/10 hover:shadow-blue-500/25 inline-flex items-center justify-center"
              >
                {/* Default background color */}
                <span className="absolute inset-0 bg-[#0075FD] -z-20" />

                {/* Smooth sliding background fill */}
                <span className="absolute inset-0 bg-slate-900 translate-y-[101%] group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] -z-10" />

                <span className="relative z-20 text-white transition-colors duration-300">
                  Get Started
                </span>
              </Link>
            </div>

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden text-slate-700 hover:text-[#0075FD] transition-colors cursor-pointer"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </Button>
          </div>

          {/* Mobile Menu */}
          <div
            className={cn(
              "md:hidden overflow-hidden transition-all duration-300",
              mobileMenuOpen
                ? "max-h-[400px] mt-3 pt-3 border-t border-slate-100"
                : "max-h-0"
            )}
          >
            <div className="flex flex-col gap-2 pb-2">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className={cn(
                    "text-sm font-medium py-2 px-3 rounded-lg transition-colors cursor-pointer",
                    pathname === link.href
                      ? "text-[#0075FD] bg-blue-50 font-bold"
                      : "text-slate-700 hover:bg-slate-50 hover:text-[#0075FD]"
                  )}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}

              <div className="pt-2 flex flex-col gap-2 border-t border-slate-100 mt-1">
                <Link
                  href="/login"
                  className="text-center text-sm font-medium text-slate-700 hover:bg-slate-50 py-2 rounded-lg transition-colors cursor-pointer"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Log In
                </Link>
                <Link
                  href="/register"
                  className="group relative w-full border-2 border-[#0075FD] text-white bg-transparent rounded-full py-2.5 text-sm font-bold transition-all duration-300 cursor-pointer overflow-hidden z-10 text-center inline-flex items-center justify-center"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span className="absolute inset-0 bg-[#0075FD] -z-20" />
                  <span className="absolute inset-0 bg-slate-900 translate-y-[101%] group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] -z-10" />
                  <span className="relative z-20 text-white">Get Started</span>
                </Link>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </div>
  )
}
