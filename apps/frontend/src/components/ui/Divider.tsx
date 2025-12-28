// apps/frontend/src/components/ui/Divider.tsx
import React from 'react';
import { cn } from '../../utils/cn';

export interface DividerProps {
  orientation?: 'horizontal' | 'vertical';
  variant?: 'fullWidth' | 'inset' | 'middle';
  flexItem?: boolean;
  className?: string;
  sx?: React.CSSProperties;
}

const Divider = React.forwardRef<HTMLHRElement, DividerProps>(
  (
    {
      orientation = 'horizontal',
      variant = 'fullWidth',
      flexItem = false,
      className,
      sx,
      ...props
    },
    ref
  ) => {
    const baseClasses = 'border-0 bg-neutral-border';

    const orientationClasses = {
      horizontal: 'w-full h-px',
      vertical: 'h-full w-px',
    };

    const variantClasses = {
      fullWidth: '',
      inset: orientation === 'horizontal' ? 'ml-4 mr-4' : 'mt-4 mb-4',
      middle: orientation === 'horizontal' ? 'ml-8 mr-8' : 'mt-8 mb-8',
    };

    const flexItemClasses = flexItem ? 'flex-shrink-0' : '';

    return (
      <hr
        ref={ref}
        className={cn(
          baseClasses,
          orientationClasses[orientation],
          variantClasses[variant],
          flexItemClasses,
          className
        )}
        style={sx}
        {...props}
      />
    );
  }
);

Divider.displayName = 'Divider';

export { Divider };
