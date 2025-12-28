// apps/frontend/src/components/ui/Modal.tsx
import React, { useEffect } from 'react';
import { cn } from '../../utils/cn';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

const Modal = React.forwardRef<HTMLDivElement, ModalProps>(
  (
    { isOpen, onClose, title, children, size = 'md', className, ...props },
    ref
  ) => {
    // Handle escape key
    useEffect(() => {
      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          onClose();
        }
      };

      if (isOpen) {
        document.addEventListener('keydown', handleEscape);
        document.body.style.overflow = 'hidden';
      }

      return () => {
        document.removeEventListener('keydown', handleEscape);
        document.body.style.overflow = 'unset';
      };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    const sizeClasses = {
      sm: 'max-w-md',
      md: 'max-w-lg',
      lg: 'max-w-2xl',
      xl: 'max-w-4xl',
    };

    return (
      <div className='fixed inset-0 z-50 flex items-center justify-center'>
        {/* Backdrop */}
        <div
          className='absolute inset-0 bg-black bg-opacity-50 transition-opacity'
          onClick={onClose}
        />

        {/* Modal */}
        <div
          ref={ref}
          className={cn(
            'relative bg-neutral-bg-card rounded-lg shadow-xl w-full mx-4',
            sizeClasses[size],
            className
          )}
          {...props}
        >
          {/* Header */}
          {title && (
            <div className='flex items-center justify-between p-6 border-b border-neutral-border'>
              <h2 className='text-xl font-semibold text-neutral-text-primary'>
                {title}
              </h2>
              <button
                onClick={onClose}
                className='text-neutral-text-secondary hover:text-neutral-text-primary transition-colors'
              >
                <svg
                  className='w-6 h-6'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M6 18L18 6M6 6l12 12'
                  />
                </svg>
              </button>
            </div>
          )}

          {/* Content */}
          <div className='p-6'>{children}</div>
        </div>
      </div>
    );
  }
);

Modal.displayName = 'Modal';

export { Modal };
