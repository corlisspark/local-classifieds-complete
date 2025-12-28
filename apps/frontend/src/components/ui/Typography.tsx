// apps/frontend/src/components/ui/Typography.tsx
import { cn } from '../../utils/cn';

interface TypographyProps {
  children: React.ReactNode;
  className?: string;
}

export function H1({ children, className }: TypographyProps) {
  return (
    <h1
      className={cn(
        'text-4xl font-bold text-neutral-text-primary leading-tight',
        className
      )}
    >
      {children}
    </h1>
  );
}

export function H2({ children, className }: TypographyProps) {
  return (
    <h2
      className={cn(
        'text-3xl font-semibold text-neutral-text-primary leading-tight',
        className
      )}
    >
      {children}
    </h2>
  );
}

export function H3({ children, className }: TypographyProps) {
  return (
    <h3
      className={cn(
        'text-2xl font-semibold text-neutral-text-primary leading-snug',
        className
      )}
    >
      {children}
    </h3>
  );
}

export function Body({ children, className }: TypographyProps) {
  return (
    <p
      className={cn(
        'text-base text-neutral-text-primary leading-relaxed',
        className
      )}
    >
      {children}
    </p>
  );
}

export function Small({ children, className }: TypographyProps) {
  return (
    <small
      className={cn(
        'text-sm text-neutral-text-secondary leading-normal',
        className
      )}
    >
      {children}
    </small>
  );
}
