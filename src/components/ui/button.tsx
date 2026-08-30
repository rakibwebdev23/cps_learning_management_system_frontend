import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-bold ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 cursor-pointer",
  {
    variants: {
      variant: {
        default: "bg-[#0075FD] text-white font-bold hover:bg-blue-600 shadow-sm",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90 rounded-lg",
        outline:
          "border border-slate-200 bg-background text-slate-700 hover:bg-slate-50 hover:text-slate-900 rounded-lg",
        secondary:
          "bg-slate-100 text-slate-900 hover:bg-slate-200 rounded-lg",
        ghost: "hover:bg-blue-50 hover:text-[#0075FD] rounded-lg",
        link: "text-[#0075FD] underline-offset-4 hover:underline",
      },
      size: {
        default: "px-5 py-2.5 min-h-[40px] rounded-lg",
        sm: "px-3 py-1.5 text-xs min-h-[32px] rounded-md",
        lg: "px-7 py-3 text-base min-h-[48px] rounded-xl",
        icon: "h-9 w-9 p-0 rounded-lg",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
