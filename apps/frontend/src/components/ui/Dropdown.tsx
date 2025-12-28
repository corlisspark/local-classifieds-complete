'use client';

import React, { useState, useRef, useEffect, forwardRef } from 'react';
import { cn } from '../../utils/cn';

export interface DropdownItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  onClick?: () => void;
  href?: string;
  disabled?: boolean;
  divider?: boolean;
  variant?: 'default' | 'danger';
}

export interface DropdownProps {
  trigger: React.ReactNode;
  items: DropdownItem[];
  align?: 'left' | 'right';
  className?: string;
  triggerClassName?: string;
  contentClassName?: string;
}

export const Dropdown: React.FC<DropdownProps> = ({
  trigger,
  items,
  align = 'right',
  className,
  triggerClassName,
  contentClassName,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen]);

  const handleItemClick = (item: DropdownItem) => {
    if (item.disabled) return;

    if (item.onClick) {
      item.onClick();
    }

    setIsOpen(false);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      setIsOpen(!isOpen);
    }
  };

  return (
    <div ref={dropdownRef} className={cn('relative', className)}>
      <button
        ref={triggerRef}
        onClick={() => setIsOpen(!isOpen)}
        onKeyDown={handleKeyDown}
        className={cn(
          'inline-flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2',
          triggerClassName
        )}
        aria-expanded={isOpen}
        aria-haspopup='true'
      >
        {trigger}
      </button>

      {isOpen && (
        <div
          className={cn(
            'absolute z-[9999999] mt-2 w-56 rounded-md shadow-xl bg-white border border-neutral-200 focus:outline-none isolate',
            align === 'right' ? 'right-0' : 'left-0',
            contentClassName
          )}
          role='menu'
          aria-orientation='vertical'
        >
          <div
            className='py-1 bg-white rounded-md relative'
            role='none'
            style={{ zIndex: 999999 }}
          >
            {items.map((item, index) => {
              if (item.divider) {
                return (
                  <div
                    key={`divider-${index}`}
                    className='border-t border-neutral-200 my-1'
                  />
                );
              }

              if (item.href) {
                return (
                  <a
                    key={item.id}
                    href={item.href}
                    className={cn(
                      'flex items-center px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-100 hover:text-neutral-900',
                      item.disabled && 'opacity-50 cursor-not-allowed'
                    )}
                    role='menuitem'
                    tabIndex={-1}
                  >
                    {item.icon && (
                      <span className='mr-3 h-4 w-4 text-neutral-400'>
                        {item.icon}
                      </span>
                    )}
                    {item.label}
                  </a>
                );
              }

              return (
                <button
                  key={item.id}
                  onClick={() => handleItemClick(item)}
                  disabled={item.disabled}
                  className={cn(
                    'flex w-full items-center px-4 py-2 text-left text-sm text-neutral-700 hover:bg-neutral-100 hover:text-neutral-900 focus:outline-none focus:bg-neutral-100 focus:text-neutral-900',
                    item.disabled && 'opacity-50 cursor-not-allowed'
                  )}
                  role='menuitem'
                  tabIndex={-1}
                >
                  {item.icon && (
                    <span className='mr-3 h-4 w-4 text-neutral-400'>
                      {item.icon}
                    </span>
                  )}
                  {item.label}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

// Menu Button Component (commonly used with Dropdown)
export interface MenuButtonProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const MenuButton = forwardRef<HTMLDivElement, MenuButtonProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center w-10 h-10 rounded-lg border border-neutral-200 bg-white text-neutral-600 hover:text-neutral-800 hover:bg-neutral-50 hover:border-neutral-300 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 cursor-pointer text-lg shadow-sm hover:shadow-md transition-all duration-200',
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

MenuButton.displayName = 'MenuButton';

// Common dropdown items
export const createDropdownItems = {
  edit: (onEdit: () => void): DropdownItem => ({
    id: 'edit',
    label: 'Edit',
    icon: (
      <svg
        className='w-4 h-4'
        fill='none'
        stroke='currentColor'
        viewBox='0 0 24 24'
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth={2}
          d='M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z'
        />
      </svg>
    ),
    onClick: onEdit,
  }),

  delete: (onDelete: () => void): DropdownItem => ({
    id: 'delete',
    label: 'Delete',
    icon: (
      <svg
        className='w-4 h-4'
        fill='none'
        stroke='currentColor'
        viewBox='0 0 24 24'
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth={2}
          d='M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16'
        />
      </svg>
    ),
    onClick: onDelete,
  }),

  view: (onView: () => void): DropdownItem => ({
    id: 'view',
    label: 'View',
    icon: (
      <svg
        className='w-4 h-4'
        fill='none'
        stroke='currentColor'
        viewBox='0 0 24 24'
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth={2}
          d='M15 12a3 3 0 11-6 0 3 3 0 016 0z'
        />
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth={2}
          d='M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z'
        />
      </svg>
    ),
    onClick: onView,
  }),

  divider: (): DropdownItem => ({
    id: 'divider',
    label: '',
    divider: true,
  }),
};
