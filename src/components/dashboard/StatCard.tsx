import { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface Props {
  title: string
  value: string | number
  change?: string
  changeType?: "up" | "down" | "neutral"
  icon: LucideIcon
  iconColor?: string
  iconBg?: string
  description?: string
}

export default function StatCard({
  title,
  value,
  change,
  changeType = "up",
  icon: Icon,
  iconColor = "text-[#4F46E5]",
  iconBg = "bg-indigo-50",
  description,
}: Props) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-md shadow-slate-200/50 hover:shadow-lg transition-all">
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{title}</p>
          <p className="text-3xl font-extrabold text-slate-900 tracking-tight">{value}</p>
          {change && (
            <p className={cn("text-xs font-medium pt-0.5", changeType === "up" ? "text-emerald-600" : changeType === "down" ? "text-red-500" : "text-slate-500")}>
              {change}
            </p>
          )}
          {description && <p className="text-xs text-slate-400">{description}</p>}
        </div>
        <div className={cn("flex h-12 w-12 items-center justify-center rounded-2xl shrink-0", iconBg)}>
          <Icon className={cn("h-6 w-6", iconColor)} />
        </div>
      </div>
    </div>
  )
}
