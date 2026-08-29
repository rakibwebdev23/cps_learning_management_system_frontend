import { cn } from "@/lib/utils"
import { statusColors } from "@/lib/constants"

interface Props {
  status: string
  className?: string
}

export default function StatusBadge({ status, className }: Props) {
  return (
    <span className={cn(
      "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize",
      statusColors[status] ?? "bg-gray-100 text-gray-600",
      className
    )}>
      {status}
    </span>
  )
}
