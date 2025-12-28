// apps/frontend/src/components/ui/Badge.tsx
import React from 'react';
import { cn } from '../../utils/cn';

export interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  (
    { children, variant = 'default', size = 'md', className, ...props },
    ref
  ) => {
    const baseClasses = 'inline-flex items-center font-medium rounded-full';

    const variantClasses = {
      default: 'bg-neutral-border text-neutral-text-primary',
      success: 'bg-status-success text-white',
      warning: 'bg-status-warning text-white',
      error: 'bg-status-error text-white',
      info: 'bg-status-info text-white',
    };

    const sizeClasses = {
      sm: 'px-2 py-0.5 text-xs',
      md: 'px-2.5 py-1 text-sm',
      lg: 'px-3 py-1.5 text-base',
    };

    return (
      <span
        ref={ref}
        className={cn(
          baseClasses,
          variantClasses[variant],
          sizeClasses[size],
          className
        )}
        {...props}
      >
        {children}
      </span>
    );
  }
);

Badge.displayName = 'Badge';

export { Badge };
