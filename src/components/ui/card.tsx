import React from 'react'
import { cn } from '@/lib/utils'

type CardVariant = 'default' | 'admin' | 'admin-metric'
type MetricAccent = 'blue' | 'red' | 'green' | 'purple' | 'yellow'

interface CardProps {
  children: React.ReactNode
  className?: string
  title?: string
  subtitle?: string
  variant?: CardVariant
  accent?: MetricAccent
  action?: React.ReactNode
}

export function Card({ 
  children, 
  className, 
  title, 
  subtitle,
  variant = 'default',
  accent = 'blue',
  action
}: CardProps) {
  // Default dark theme card
  if (variant === 'default') {
    return (
      <div className={cn('bg-white rounded-lg shadow-md p-6', className)}>
        {title && (
          <h3 className="text-lg font-semibold mb-4">{title}</h3>
        )}
        {children}
      </div>
    )
  }

  // Admin metric card with top accent
  if (variant === 'admin-metric') {
    return (
      <div 
        className={cn(
          'bg-white rounded-xl border border-[#E5E7EB] p-6 relative overflow-hidden',
          'shadow-[0px_4px_12px_rgba(0,0,0,0.05)]',
          className
        )}
      >
        {/* Top accent bar */}
        <div 
          className={cn(
            'absolute top-0 left-0 right-0 h-1',
            accent === 'blue' && 'bg-gradient-to-r from-[#4D5BF9] to-[#6B77FA]',
            accent === 'red' && 'bg-[#FF5B5B]',
            accent === 'green' && 'bg-[#10B981]',
            accent === 'purple' && 'bg-gradient-to-r from-[#8B5CF6] to-[#A78BFA]',
            accent === 'yellow' && 'bg-[#F59E0B]'
          )}
        />
        {children}
      </div>
    )
  }

  // Admin standard card
  return (
    <div 
      className={cn(
        'bg-white rounded-xl border border-[#E5E7EB] p-6',
        'shadow-[0px_4px_12px_rgba(0,0,0,0.05)]',
        className
      )}
    >
      {(title || action) && (
        <div className="flex items-center justify-between mb-4">
          <div>
            {title && (
              <h3 className="text-base font-semibold text-[#111827]">{title}</h3>
            )}
            {subtitle && (
              <p className="text-sm text-[#6B7280] mt-0.5">{subtitle}</p>
            )}
          </div>
          {action && (
            <div>{action}</div>
          )}
        </div>
      )}
      {children}
    </div>
  )
}

// Admin-specific card components
export function AdminMetricCard({ 
  value, 
  label, 
  accent = 'blue',
  trend,
  icon,
  className 
}: { 
  value: string | number
  label: string
  accent?: MetricAccent
  trend?: { value: string; positive: boolean }
  icon?: React.ReactNode
  className?: string
}) {
  return (
    <Card variant="admin-metric" accent={accent} className={className}>
      <div className="flex items-start justify-between">
        <div>
          <div className="text-3xl font-light text-[#111827] mb-1">{value}</div>
          <div className="text-sm font-medium text-[#6B7280]">{label}</div>
          {trend && (
            <div className={cn(
              'text-xs font-medium mt-2',
              trend.positive ? 'text-[#10B981]' : 'text-[#FF5B5B]'
            )}>
              {trend.positive ? '↑' : '↓'} {trend.value}
            </div>
          )}
        </div>
        {icon && (
          <div className={cn(
            'p-2 rounded-lg',
            accent === 'blue' && 'bg-[#E0E4FF] text-[#4D5BF9]',
            accent === 'red' && 'bg-red-50 text-[#FF5B5B]',
            accent === 'green' && 'bg-emerald-50 text-[#10B981]',
            accent === 'purple' && 'bg-purple-50 text-purple-600',
            accent === 'yellow' && 'bg-amber-50 text-[#F59E0B]'
          )}>
            {icon}
          </div>
        )}
      </div>
    </Card>
  )
}

