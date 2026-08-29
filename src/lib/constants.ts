import {
  LayoutDashboard, BookOpen, FileText, HelpCircle, BarChart3,
  Users, Settings, UserCircle, BookMarked, ClipboardList,
  GraduationCap, PenSquare, Newspaper,
} from "lucide-react"

export const SITE_NAME = "CPS LMS"
export const SITE_TAGLINE = "Learn Without Limits"

export const COURSE_CATEGORIES = [
  "Web Development", "Mobile Development", "Data Science", "Design",
  "Business", "Marketing", "Cybersecurity", "Cloud Computing",
] as const

export const COURSE_LEVELS = ["beginner", "intermediate", "advanced"] as const

export const COURSE_SORT_OPTIONS = [
  { label: "Most Popular", value: "popular" },
  { label: "Highest Rated", value: "rating" },
  { label: "Newest", value: "newest" },
  { label: "Price: Low to High", value: "price_asc" },
  { label: "Price: High to Low", value: "price_desc" },
]

export const BLOG_CATEGORIES = [
  "Web Development", "Mobile Development", "Data Science", "Design",
  "Business", "Cloud Computing", "Cybersecurity",
]

export const studentNavItems = [
  { label: "Dashboard", href: "/dashboard/student", icon: LayoutDashboard },
  { label: "My Courses", href: "/dashboard/student/courses", icon: BookOpen },
  { label: "Quizzes", href: "/dashboard/student/quizzes", icon: HelpCircle },
  { label: "Results", href: "/dashboard/student/results", icon: ClipboardList },
  { label: "Profile", href: "/dashboard/student/profile", icon: UserCircle },
]

export const instructorNavItems = [
  { label: "Dashboard", href: "/dashboard/instructor", icon: LayoutDashboard },
  { label: "Courses", href: "/dashboard/instructor/courses", icon: BookOpen },
  { label: "Quizzes", href: "/dashboard/instructor/quizzes", icon: HelpCircle },
  { label: "Students", href: "/dashboard/instructor/students", icon: Users },
  { label: "Profile", href: "/dashboard/instructor/profile", icon: UserCircle },
]

export const contentManagerNavItems = [
  { label: "Dashboard", href: "/dashboard/content-manager", icon: LayoutDashboard },
  { label: "Courses", href: "/dashboard/content-manager/courses", icon: BookOpen },
  { label: "Lessons", href: "/dashboard/content-manager/lessons", icon: FileText },
  { label: "Quizzes", href: "/dashboard/content-manager/quizzes", icon: HelpCircle },
  { label: "Blogs", href: "/dashboard/content-manager/blogs", icon: Newspaper },
  { label: "Profile", href: "/dashboard/content-manager/profile", icon: UserCircle },
]

export const adminNavItems = [
  { label: "Dashboard", href: "/dashboard/admin", icon: LayoutDashboard },
  { label: "Users", href: "/dashboard/admin/users", icon: Users },
  { label: "Courses", href: "/dashboard/admin/courses", icon: BookOpen },
  { label: "Lessons", href: "/dashboard/admin/lessons", icon: FileText },
  { label: "Quizzes", href: "/dashboard/admin/quizzes", icon: HelpCircle },
  { label: "Enrollments", href: "/dashboard/admin/enrollments", icon: BookMarked },
  { label: "Results", href: "/dashboard/admin/results", icon: ClipboardList },
  { label: "Blogs", href: "/dashboard/admin/blogs", icon: Newspaper },
  { label: "Statistics", href: "/dashboard/admin/statistics", icon: BarChart3 },
  { label: "Settings", href: "/dashboard/admin/settings", icon: Settings },
  { label: "Profile", href: "/dashboard/admin/profile", icon: UserCircle },
]

export const roleLabels: Record<string, string> = {
  ADMIN: "Admin",
  CONTENT_MANAGER: "Content Manager",
  INSTRUCTOR: "Instructor",
  STUDENT: "Student",
}

export const statusColors: Record<string, string> = {
  active: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
  inactive: "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400",
  suspended: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
  completed: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
  dropped: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400",
  published: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
  draft: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
  archived: "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400",
}

export const levelColors: Record<string, string> = {
  beginner: "bg-green-100 text-green-700",
  intermediate: "bg-amber-100 text-amber-700",
  advanced: "bg-purple-100 text-purple-700",
}
