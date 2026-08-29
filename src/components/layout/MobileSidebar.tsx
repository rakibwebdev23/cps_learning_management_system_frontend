"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, GraduationCap } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { SITE_NAME, studentNavItems, instructorNavItems, contentManagerNavItems, adminNavItems } from "@/lib/constants"

type Role = "student" | "instructor" | "content-manager" | "admin"

const navMap: Record<Role, typeof studentNavItems> = {
  student: studentNavItems,
  instructor: instructorNavItems,
  "content-manager": contentManagerNavItems,
  admin: adminNavItems,
}

export default function MobileSidebar({ role }: { role: Role }) {
  const pathname = usePathname()
  const navItems = navMap[role]

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden h-9 w-9 cursor-pointer">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Open menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-64 p-0 bg-white">
        <div className="flex h-16 items-center gap-2.5 border-b border-slate-100 px-4 font-bold text-slate-900 bg-white">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#F59E0B] text-white">
            <GraduationCap className="h-4 w-4 text-white" />
          </div>
          <span className="font-extrabold text-base tracking-tight">{SITE_NAME}</span>
        </div>
        <nav className="py-4 px-2 space-y-1 bg-white">
          {navItems.map((item) => {
            const active = pathname === item.href || pathname.startsWith(item.href + "/")
            const Icon = item.icon
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all cursor-pointer",
                  active
                    ? "bg-slate-200 text-slate-900 font-bold"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                )}
              >
                <Icon className={cn("h-4 w-4 shrink-0", active ? "text-slate-900" : "text-slate-500")} />
                {item.label}
              </Link>
            )
          })}
        </nav>
      </SheetContent>
    </Sheet>
  )
}
