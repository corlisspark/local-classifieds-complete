// apps/frontend/src/components/ui/Sidebar.tsx
import React from 'react';
import { cn } from '../../utils/cn';

export interface SidebarItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  onClick: () => void;
  active?: boolean;
}

export interface SidebarProps {
  items: SidebarItem[];
  className?: string;
}

const Sidebar = React.forwardRef<HTMLDivElement, SidebarProps>(
  ({ items, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'w-64 bg-neutral-bg-card border-r border-neutral-border h-full flex flex-col',
          className
        )}
        {...props}
      >
        {/* Header */}
        <div className='p-6 border-b border-neutral-border'>
          <h1 className='text-xl font-bold text-neutral-text-primary'>
            Admin Panel
          </h1>
        </div>

        {/* Menu Items */}
        <nav className='flex-1 p-4'>
          <ul className='space-y-2'>
            {items.map(item => (
              <li key={item.id}>
                <button
                  onClick={item.onClick}
                  className={cn(
                    'w-full flex items-center px-4 py-3 text-left rounded-lg transition-colors',
                    'hover:bg-neutral-bg-light',
                    item.active
                      ? 'bg-brand-primary text-white hover:bg-brand-primary-dark'
                      : 'text-neutral-text-primary hover:text-neutral-text-primary'
                  )}
                >
                  {item.icon && (
                    <span className='mr-3 flex-shrink-0'>{item.icon}</span>
                  )}
                  <span className='font-medium'>{item.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    );
  }
);

Sidebar.displayName = 'Sidebar';

export { Sidebar };
