'use client';

import React from 'react';
import { cn } from '../../utils/cn';

// Table Component
export interface TableProps
  extends React.TableHTMLAttributes<HTMLTableElement> {
  children: React.ReactNode;
}

export const Table: React.FC<TableProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <div className='overflow-x-auto'>
      <table
        className={cn('min-w-full divide-y divide-neutral-200', className)}
        {...props}
      >
        {children}
      </table>
    </div>
  );
};

Table.displayName = 'Table';

// TableHeader Component
export interface TableHeaderProps
  extends React.HTMLAttributes<HTMLTableSectionElement> {
  children: React.ReactNode;
}

export const TableHeader: React.FC<TableHeaderProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <thead className={cn('bg-neutral-50', className)} {...props}>
      {children}
    </thead>
  );
};

TableHeader.displayName = 'TableHeader';

// TableBody Component
export interface TableBodyProps
  extends React.HTMLAttributes<HTMLTableSectionElement> {
  children: React.ReactNode;
}

export const TableBody: React.FC<TableBodyProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <tbody
      className={cn('bg-white divide-y divide-neutral-200', className)}
      {...props}
    >
      {children}
    </tbody>
  );
};

TableBody.displayName = 'TableBody';

// TableRow Component
export interface TableRowProps
  extends React.HTMLAttributes<HTMLTableRowElement> {
  children: React.ReactNode;
  hover?: boolean;
}

export const TableRow: React.FC<TableRowProps> = ({
  children,
  hover = true,
  className,
  ...props
}) => {
  return (
    <tr className={cn(hover && 'hover:bg-neutral-50', className)} {...props}>
      {children}
    </tr>
  );
};

TableRow.displayName = 'TableRow';

// TableHead Component
export interface TableHeadProps
  extends React.ThHTMLAttributes<HTMLTableCellElement> {
  children: React.ReactNode;
  sortable?: boolean;
  sortDirection?: 'asc' | 'desc' | null;
  onSort?: () => void;
}

export const TableHead: React.FC<TableHeadProps> = ({
  children,
  sortable,
  sortDirection,
  onSort,
  className,
  ...props
}) => {
  return (
    <th
      className={cn(
        'px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider',
        sortable && 'cursor-pointer select-none hover:bg-neutral-100',
        className
      )}
      onClick={sortable ? onSort : undefined}
      {...props}
    >
      <div className='flex items-center space-x-1'>
        <span>{children}</span>
        {sortable && (
          <div className='flex flex-col'>
            <svg
              className={cn(
                'w-3 h-3',
                sortDirection === 'asc'
                  ? 'text-neutral-900'
                  : 'text-neutral-400'
              )}
              fill='currentColor'
              viewBox='0 0 20 20'
            >
              <path d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z' />
            </svg>
            <svg
              className={cn(
                'w-3 h-3 -mt-1',
                sortDirection === 'desc'
                  ? 'text-neutral-900'
                  : 'text-neutral-400'
              )}
              fill='currentColor'
              viewBox='0 0 20 20'
            >
              <path d='M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z' />
            </svg>
          </div>
        )}
      </div>
    </th>
  );
};

TableHead.displayName = 'TableHead';

// TableCell Component
export interface TableCellProps
  extends React.TdHTMLAttributes<HTMLTableCellElement> {
  children: React.ReactNode;
}

export const TableCell: React.FC<TableCellProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <td
      className={cn(
        'px-6 py-4 whitespace-nowrap text-sm text-neutral-900',
        className
      )}
      {...props}
    >
      {children}
    </td>
  );
};

TableCell.displayName = 'TableCell';

// TableEmpty Component
export interface TableEmptyProps {
  colSpan: number;
  message?: string;
  action?: React.ReactNode;
}

export const TableEmpty: React.FC<TableEmptyProps> = ({
  colSpan,
  message = 'No data available',
  action,
}) => {
  return (
    <tr>
      <td colSpan={colSpan} className='px-6 py-12 text-center'>
        <div className='flex flex-col items-center space-y-4'>
          <div className='text-neutral-400'>
            <svg
              className='w-12 h-12 mx-auto'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={1}
                d='M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z'
              />
            </svg>
          </div>
          <p className='text-neutral-500'>{message}</p>
          {action && <div>{action}</div>}
        </div>
      </td>
    </tr>
  );
};

// TableLoading Component
export interface TableLoadingProps {
  colSpan: number;
  rows?: number;
}

export const TableLoading: React.FC<TableLoadingProps> = ({
  colSpan,
  rows = 3,
}) => {
  return (
    <>
      {Array.from({ length: rows }).map((_, index) => (
        <tr key={index}>
          {Array.from({ length: colSpan }).map((_, cellIndex) => (
            <td key={cellIndex} className='px-6 py-4'>
              <div className='animate-pulse'>
                <div className='h-4 bg-neutral-200 rounded w-3/4'></div>
              </div>
            </td>
          ))}
        </tr>
      ))}
    </>
  );
};
