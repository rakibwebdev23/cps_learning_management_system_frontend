import Link from "next/link"
import { ChevronRight, Home } from "lucide-react"
import { cn } from "@/lib/utils"

interface BreadcrumbItem {
  label: string
  href?: string
}

interface Props {
  title: string
  description?: string
  breadcrumbs?: BreadcrumbItem[]
  actions?: React.ReactNode
  className?: string
}

export default function PageHeader({ title, description, breadcrumbs, actions, className }: Props) {
  return (
    <div className={cn("mb-6", className)}>
      {/* breadcrumbs */}
      {breadcrumbs && breadcrumbs.length > 0 && (
        <nav className="flex items-center gap-1 text-xs text-slate-500 mb-3">
          <Link href="#" className="hover:text-slate-700 flex items-center gap-1">
            <Home className="h-3 w-3" />
          </Link>
          {breadcrumbs.map((item, i) => (
            <span key={i} className="flex items-center gap-1">
              <ChevronRight className="h-3 w-3" />
              {item.href ? (
                <Link href={item.href} className="hover:text-slate-700">{item.label}</Link>
              ) : (
                <span className="text-slate-700 dark:text-slate-300 font-medium">{item.label}</span>
              )}
            </span>
          ))}
        </nav>
      )}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">{title}</h1>
          {description && <p className="mt-1 text-sm text-slate-500">{description}</p>}
        </div>
        {actions && <div className="flex items-center gap-2 shrink-0 text-white">{actions}</div>}
      </div>
    </div>
  )
}
