"use client"

import Link from "next/link"
import { Bell, Shield, Home, LogOut, ChevronDown } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import { logout } from "@/redux/api/featuresApi/auth/authSlice"
import { baseApi } from "@/redux/api/baseApi/baseApi"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface HeaderProps {
  role: "STUDENT" | "INSTRUCTOR" | "CONTENT_MANAGER" | "ADMIN"
}

export default function DashboardHeader({ role }: HeaderProps) {
  const dispatch = useAppDispatch()
  const { user } = useAppSelector((state) => state.auth)

  const displayName = user?.username || user?.name || "User"
  const initials = displayName.slice(0, 2).toUpperCase()

  const handleLogout = () => {
    if (typeof document !== "undefined") {
      document.cookie = "accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
      document.cookie = "access=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
      document.cookie = "jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
    }
    dispatch(logout())
    dispatch(baseApi.util.resetApiState())
    window.location.href = "/"
  }

  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-slate-200 bg-white/95 backdrop-blur-md px-6">
      {/* role badge (static indicator) */}
      <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-200 bg-slate-50 text-xs font-bold text-slate-700">
        <Shield className="h-3.5 w-3.5 text-[#0075FD]" />
        <span>{role.replace("_", " ")} PORTAL</span>
      </div>

      {/* right user & controls */}
      <div className="flex items-center gap-4">
        {/* notifications */}
        <button className="relative p-2 text-slate-500 hover:text-slate-900 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer">
          <Bell className="h-5 w-5" />
          <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white" />
        </button>

        {/* user profile dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-2 outline-none cursor-pointer p-1 rounded-lg hover:bg-slate-100 transition-colors">
            <Avatar className="h-8 w-8 border border-slate-200">
              <AvatarImage src={user?.avatar || ""} />
              <AvatarFallback className="bg-[#0075FD] text-white text-xs font-bold">{initials}</AvatarFallback>
            </Avatar>
            <span className="text-xs font-bold text-slate-900 hidden sm:inline-block">{displayName}</span>
            <ChevronDown className="h-3.5 w-3.5 text-slate-400" />
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" className="w-48 bg-white border border-slate-200 shadow-lg rounded-xl p-1">
            <DropdownMenuItem asChild className="cursor-pointer font-medium text-xs py-2">
              <Link href="/" className="flex items-center gap-2">
                <Home className="h-4 w-4 text-slate-500" />
                <span>Home Page</span>
              </Link>
            </DropdownMenuItem>

            <DropdownMenuSeparator className="bg-slate-100 my-1" />

            <DropdownMenuItem onClick={handleLogout} className="cursor-pointer font-medium text-xs py-2 text-red-600 focus:bg-red-50 focus:text-red-600">
              <LogOut className="h-4 w-4" />
              <span>Logout</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
