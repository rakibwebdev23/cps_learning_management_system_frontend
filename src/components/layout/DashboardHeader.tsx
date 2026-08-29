"use client"

import { useState } from "react"
import { Search, Bell, Shield, ChevronDown } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel,
  DropdownMenuSeparator, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from "next/link"
import { useRouter } from "next/navigation"

interface HeaderProps {
  role: "STUDENT" | "INSTRUCTOR" | "CONTENT_MANAGER" | "ADMIN"
}

export default function DashboardHeader({ role }: HeaderProps) {
  const router = useRouter()
  const [search, setSearch] = useState("")

  const switchRole = (newRole: string) => {
    switch (newRole) {
      case "STUDENT": router.push("/dashboard/student"); break;
      case "INSTRUCTOR": router.push("/dashboard/instructor"); break;
      case "CONTENT_MANAGER": router.push("/dashboard/content-manager"); break;
      case "ADMIN": router.push("/dashboard/admin"); break;
    }
  }

  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-slate-200 bg-white/95 backdrop-blur-md px-6">

      {/* Search Input */}
      <div className="relative w-72">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
        <Input
          placeholder="Search anything..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="h-9 w-full pl-9 pr-4 text-xs bg-slate-50 border-slate-200 focus:bg-white focus:ring-1 focus:ring-indigo-500 rounded-xl"
        />
      </div>

      {/* Right User & Controls */}
      <div className="flex items-center gap-4">

        {/* Role Quick Switcher */}
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-200 bg-slate-50 text-xs font-semibold text-slate-700 hover:bg-slate-100 transition-colors">
            <Shield className="h-3.5 w-3.5 text-[#4F46E5]" />
            <span>Role: {role.replace("_", " ")}</span>
            <ChevronDown className="h-3 w-3 text-slate-400" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuLabel className="text-[11px] text-slate-400 uppercase tracking-wider">Switch View</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => switchRole("STUDENT")}>Student Portal</DropdownMenuItem>
            <DropdownMenuItem onClick={() => switchRole("INSTRUCTOR")}>Instructor Portal</DropdownMenuItem>
            <DropdownMenuItem onClick={() => switchRole("CONTENT_MANAGER")}>Content Manager</DropdownMenuItem>
            <DropdownMenuItem onClick={() => switchRole("ADMIN")}>Admin Portal</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Notifications */}
        <button className="relative p-2 text-slate-500 hover:text-slate-900 rounded-lg hover:bg-slate-100 transition-colors">
          <Bell className="h-5 w-5" />
          <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white" />
        </button>

        {/* Avatar */}
        <Avatar className="h-8 w-8 border border-slate-200">
          <AvatarImage src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80" />
          <AvatarFallback className="bg-indigo-600 text-white text-xs">DM</AvatarFallback>
        </Avatar>

      </div>
    </header>
  )
}
