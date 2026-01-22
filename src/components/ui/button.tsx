import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-lg text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        // Default dark theme variants (public-facing)
        default: 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white hover:from-cyan-400 hover:to-blue-400 focus-visible:ring-cyan-500',
        outline: 'border border-white/20 bg-transparent text-white hover:bg-white/10 focus-visible:ring-white/30',
        secondary: 'bg-white/10 text-white hover:bg-white/20 focus-visible:ring-white/30',
        ghost: 'text-white hover:bg-white/10 focus-visible:ring-white/30',
        // Admin theme variants - Professional B2B SaaS
        'admin-primary': 'bg-[#4D5BF9] text-white hover:bg-[#3D4BD9] focus-visible:ring-[#4D5BF9] focus-visible:ring-offset-2',
        'admin-secondary': 'bg-white text-[#6B7280] border border-[#E5E7EB] hover:bg-[#F3F4F6] hover:text-[#111827] focus-visible:ring-[#4D5BF9] focus-visible:ring-offset-2',
        'admin-ghost': 'text-[#6B7280] hover:bg-[#F3F4F6] hover:text-[#111827] focus-visible:ring-[#4D5BF9]',
        'admin-danger': 'bg-[#FF5B5B] text-white hover:bg-[#E54545] focus-visible:ring-[#FF5B5B] focus-visible:ring-offset-2',
        'admin-outline': 'bg-transparent text-[#4D5BF9] border border-[#4D5BF9] hover:bg-[#4D5BF9]/5 focus-visible:ring-[#4D5BF9]',
        'admin-success': 'bg-[#10B981] text-white hover:bg-[#059669] focus-visible:ring-[#10B981] focus-visible:ring-offset-2',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 px-3 text-xs',
        lg: 'h-12 px-8 text-base',
        icon: 'h-10 w-10 p-0',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  loading?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, loading, children, disabled, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={disabled || loading}
        {...props}
      >
        {loading && (
          <svg
            className="animate-spin -ml-1 mr-2 h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}
        {children}
      </button>
    )
  }
)
Button.displayName = 'Button'

export { Button, buttonVariants }
