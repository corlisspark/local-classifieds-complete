// apps/frontend/src/components/ui/Input.tsx
import React from 'react';
import { cn } from '../../utils/cn';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, helperText, type, ...props }, ref) => {
    return (
      <div className='w-full'>
        {label && (
          <label className='block text-sm font-medium text-neutral-text-primary mb-2'>
            {label}
          </label>
        )}
        <input
          type={type}
          className={cn(
            'flex h-10 w-full rounded-md border border-neutral-border bg-neutral-bg-card px-3 py-2 text-sm text-neutral-text-primary placeholder:text-neutral-text-secondary focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50',
            error && 'border-status-error focus:ring-status-error',
            className
          )}
          ref={ref}
          {...props}
        />
        {error && <p className='mt-1 text-sm text-status-error'>{error}</p>}
        {helperText && !error && (
          <p className='mt-1 text-sm text-neutral-text-secondary'>
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export { Input };
