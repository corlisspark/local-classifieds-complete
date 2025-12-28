// /Users/thiagotavares/Projects/Services/apps/frontend/src/components/ui/Select.tsx

import React, { forwardRef } from 'react';
import { cn } from '../../utils/cn';

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  helperText?: string;
  options: SelectOption[];
  placeholder?: string;
  required?: boolean;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      label,
      error,
      helperText,
      options,
      placeholder,
      required,
      className,
      ...props
    },
    ref
  ) => {
    return (
      <div className='w-full'>
        {label && (
          <label className='block text-sm font-medium text-neutral-700 mb-1'>
            {label}
            {required && <span className='text-red-500 ml-1'>*</span>}
          </label>
        )}

        <select
          ref={ref}
          className={cn(
            'w-full px-3 py-2 border rounded-md shadow-sm transition-colors',
            'focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500',
            'disabled:bg-neutral-100 disabled:text-neutral-500 disabled:cursor-not-allowed',
            error
              ? 'border-red-300 text-red-900 placeholder-red-300 focus:ring-red-500 focus:border-red-500'
              : 'border-neutral-300 text-neutral-900 placeholder-neutral-400',
            className
          )}
          {...props}
        >
          {placeholder && (
            <option value='' disabled>
              {placeholder}
            </option>
          )}
          {options.map(option => (
            <option
              key={option.value}
              value={option.value}
              disabled={option.disabled}
            >
              {option.label}
            </option>
          ))}
        </select>

        {error && <p className='mt-1 text-sm text-red-600'>{error}</p>}

        {helperText && !error && (
          <p className='mt-1 text-sm text-neutral-500'>{helperText}</p>
        )}
      </div>
    );
  }
);

Select.displayName = 'Select';
