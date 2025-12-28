'use client';

import React, { useState, useRef, useEffect } from 'react';
import { cn } from '../../utils/cn';

export interface AutocompleteOption {
  value: string;
  label: string;
  description?: string;
}

export interface AutocompleteProps {
  options: AutocompleteOption[];
  value?: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  emptyMessage?: string;
  loading?: boolean;
  searchable?: boolean;
}

export function Autocomplete({
  options,
  value,
  onChange,
  placeholder = 'Selecione uma opção...',
  disabled = false,
  className,
  emptyMessage = 'Nenhuma opção encontrada',
  loading = false,
  searchable = true,
}: AutocompleteProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  // Find selected option
  const selectedOption = options.find(option => option.value === value);

  // Filter options based on search term
  const filteredOptions = options.filter(option =>
    searchable
      ? option.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
        option.description?.toLowerCase().includes(searchTerm.toLowerCase())
      : true
  );

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setSearchTerm(newValue);
    setHighlightedIndex(-1);

    if (!isOpen) {
      setIsOpen(true);
    }
  };

  // Handle option selection
  const handleOptionSelect = (option: AutocompleteOption) => {
    onChange(option.value);
    setSearchTerm('');
    setIsOpen(false);
    setHighlightedIndex(-1);
  };

  // Handle input focus
  const handleInputFocus = () => {
    if (!disabled) {
      setIsOpen(true);
      setSearchTerm('');
    }
  };

  // Handle input blur
  const handleInputBlur = (_e: React.FocusEvent) => {
    // Delay to allow option click
    setTimeout(() => {
      if (!listRef.current?.contains(document.activeElement)) {
        setIsOpen(false);
        setSearchTerm('');
        setHighlightedIndex(-1);
      }
    }, 150);
  };

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) {
      if (e.key === 'Enter' || e.key === 'ArrowDown') {
        e.preventDefault();
        setIsOpen(true);
      }
      return;
    }

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setHighlightedIndex(prev =>
          prev < filteredOptions.length - 1 ? prev + 1 : 0
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setHighlightedIndex(prev =>
          prev > 0 ? prev - 1 : filteredOptions.length - 1
        );
        break;
      case 'Enter':
        e.preventDefault();
        if (highlightedIndex >= 0 && filteredOptions[highlightedIndex]) {
          handleOptionSelect(filteredOptions[highlightedIndex]);
        }
        break;
      case 'Escape':
        setIsOpen(false);
        setSearchTerm('');
        setHighlightedIndex(-1);
        inputRef.current?.blur();
        break;
    }
  };

  // Scroll highlighted option into view
  useEffect(() => {
    if (highlightedIndex >= 0 && listRef.current) {
      const highlightedElement = listRef.current.children[
        highlightedIndex
      ] as HTMLElement;
      if (highlightedElement) {
        highlightedElement.scrollIntoView({
          block: 'nearest',
          behavior: 'smooth',
        });
      }
    }
  }, [highlightedIndex]);

  return (
    <div className={cn('relative', className)}>
      {/* Input */}
      <div className='relative'>
        <input
          ref={inputRef}
          type='text'
          value={
            isOpen && searchable ? searchTerm : selectedOption?.label || ''
          }
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          disabled={disabled}
          className={cn(
            'flex h-10 w-full rounded-md border border-neutral-border bg-neutral-bg-card px-3 py-2 text-sm text-neutral-text-primary placeholder:text-neutral-text-secondary focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50',
            isOpen && 'rounded-b-none border-b-0'
          )}
        />

        {/* Dropdown arrow */}
        <div className='absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none'>
          <svg
            className={cn(
              'h-4 w-4 text-neutral-text-secondary transition-transform duration-200',
              isOpen && 'rotate-180'
            )}
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M19 9l-7 7-7-7'
            />
          </svg>
        </div>
      </div>

      {/* Dropdown */}
      {isOpen && (
        <div className='absolute z-50 w-full mt-0 bg-white border border-neutral-border border-t-0 rounded-b-md shadow-lg max-h-60 overflow-auto'>
          {loading ? (
            <div className='p-3 text-center text-sm text-neutral-text-secondary'>
              Carregando...
            </div>
          ) : filteredOptions.length === 0 ? (
            <div className='p-3 text-center text-sm text-neutral-text-secondary'>
              {emptyMessage}
            </div>
          ) : (
            <ul ref={listRef} className='py-1'>
              {filteredOptions.map((option, index) => (
                <li key={option.value}>
                  <button
                    type='button'
                    onClick={() => handleOptionSelect(option)}
                    className={cn(
                      'w-full px-3 py-2 text-left text-sm hover:bg-neutral-bg-hover focus:bg-neutral-bg-hover focus:outline-none transition-colors',
                      highlightedIndex === index && 'bg-neutral-bg-hover',
                      option.value === value &&
                        'bg-brand-primary/10 text-brand-primary'
                    )}
                  >
                    <div className='font-medium'>{option.label}</div>
                    {option.description && (
                      <div className='text-xs text-neutral-text-secondary mt-1'>
                        {option.description}
                      </div>
                    )}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}

// Export for easy access
export default Autocomplete;
