import React from 'react'
import { cn } from '@/lib/utils'

type InputVariant = 'light' | 'dark' | 'admin'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  hint?: string
  variant?: InputVariant
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
}

export function Input({ 
  label, 
  error, 
  hint,
  variant = 'light', 
  leftIcon,
  rightIcon,
  className, 
  ...props 
}: InputProps) {
  const isDark = variant === 'dark'
  const isAdmin = variant === 'admin'
  
  // Admin theme styles
  if (isAdmin) {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-[#111827] mb-1.5">
            {label}
          </label>
        )}
        <div className="relative">
          {leftIcon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9CA3AF]">
              {leftIcon}
            </div>
          )}
          <input
            className={cn(
              'w-full px-4 py-2.5 bg-white border border-[#E5E7EB] rounded-lg text-sm text-[#111827]',
              'placeholder:text-[#9CA3AF]',
              'focus:outline-none focus:ring-2 focus:ring-[#4D5BF9]/20 focus:border-[#4D5BF9]',
              'transition-all duration-200',
              'disabled:bg-[#F3F4F6] disabled:text-[#9CA3AF] disabled:cursor-not-allowed',
              error && 'border-[#FF5B5B] focus:ring-[#FF5B5B]/20 focus:border-[#FF5B5B]',
              leftIcon && 'pl-10',
              rightIcon && 'pr-10',
              className
            )}
            {...props}
          />
          {rightIcon && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9CA3AF]">
              {rightIcon}
            </div>
          )}
        </div>
        {hint && !error && (
          <p className="mt-1 text-xs text-[#9CA3AF]">{hint}</p>
        )}
        {error && (
          <p className="mt-1 text-xs text-[#FF5B5B]">{error}</p>
        )}
      </div>
    )
  }

  // Dark theme (public-facing)
  if (isDark) {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium mb-1.5 text-gray-300">
            {label}
          </label>
        )}
        <input
          className={cn(
            'w-full px-4 py-2 rounded-lg focus:outline-none focus:ring-2',
            'bg-[#0e1330] border border-white/15 text-white placeholder:text-gray-500 focus:ring-cyan-500 focus:border-cyan-500',
            'disabled:bg-white/5',
            error && 'border-red-500 focus:ring-red-500',
            className
          )}
          {...props}
        />
        {error && (
          <p className="mt-1 text-sm text-red-600">{error}</p>
        )}
      </div>
    )
  }
  
  // Light theme (default)
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium mb-1.5 text-gray-700">
          {label}
        </label>
      )}
      <input
        className={cn(
          'w-full px-4 py-2 rounded-lg focus:outline-none focus:ring-2',
          'border border-gray-300 text-gray-900 placeholder:text-gray-400 focus:ring-blue-500 focus:border-blue-500',
          'disabled:bg-gray-100',
          error && 'border-red-500 focus:ring-red-500',
          className
        )}
        {...props}
      />
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  )
}

// Admin Select component
interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  error?: string
  hint?: string
  options: { value: string; label: string }[]
}

export function AdminSelect({ 
  label, 
  error, 
  hint,
  options,
  className, 
  ...props 
}: SelectProps) {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-[#111827] mb-1.5">
          {label}
        </label>
      )}
      <select
        className={cn(
          'w-full px-4 py-2.5 bg-white border border-[#E5E7EB] rounded-lg text-sm text-[#111827]',
          'focus:outline-none focus:ring-2 focus:ring-[#4D5BF9]/20 focus:border-[#4D5BF9]',
          'transition-all duration-200 appearance-none cursor-pointer',
          'disabled:bg-[#F3F4F6] disabled:text-[#9CA3AF] disabled:cursor-not-allowed',
          'bg-no-repeat bg-[length:1.25em_1.25em] bg-[right_0.75rem_center]',
          error && 'border-[#FF5B5B] focus:ring-[#FF5B5B]/20 focus:border-[#FF5B5B]',
          className
        )}
        style={{
          backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236B7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
          paddingRight: '2.5rem'
        }}
        {...props}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {hint && !error && (
        <p className="mt-1 text-xs text-[#9CA3AF]">{hint}</p>
      )}
      {error && (
        <p className="mt-1 text-xs text-[#FF5B5B]">{error}</p>
      )}
    </div>
  )
}

