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
  iconColor = "text-[#0075FD]",
  iconBg = "bg-blue-50",
  description,
}: Props) {
  return (
    <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm hover:shadow-md transition-all space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{title}</span>
        <div className={cn("flex h-10 w-10 items-center justify-center rounded-xl shrink-0", iconBg)}>
          <Icon className={cn("h-5 w-5", iconColor)} />
        </div>
      </div>
      <div>
        <p className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">{value}</p>
        {change && (
          <p className={cn("text-xs font-medium pt-0.5", changeType === "up" ? "text-emerald-600" : changeType === "down" ? "text-red-500" : "text-slate-500")}>
            {change}
          </p>
        )}
        {description && <p className="text-xs text-slate-400 mt-0.5">{description}</p>}
      </div>
    </div>
  )
}
