// apps/frontend/src/components/ui/Stack.tsx
import React from 'react';
import { cn } from '../../utils/cn';

export interface StackProps {
  children: React.ReactNode;
  direction?:
    | 'row'
    | 'column'
    | 'row-reverse'
    | 'column-reverse'
    | { xs?: string; sm?: string; md?: string; lg?: string; xl?: string };
  spacing?:
    | number
    | string
    | {
        xs?: number | string;
        sm?: number | string;
        md?: number | string;
        lg?: number | string;
        xl?: number | string;
      };
  alignItems?: 'flex-start' | 'center' | 'flex-end' | 'stretch' | 'baseline';
  justifyContent?:
    | 'flex-start'
    | 'center'
    | 'flex-end'
    | 'space-between'
    | 'space-around'
    | 'space-evenly';
  divider?: React.ReactElement;
  useFlexGap?: boolean;
  className?: string;
  sx?: React.CSSProperties;
}

const Stack = React.forwardRef<HTMLDivElement, StackProps>(
  (
    {
      children,
      direction = 'column',
      spacing = 0,
      alignItems = 'stretch',
      justifyContent = 'flex-start',
      divider,
      useFlexGap = false,
      className,
      sx,
      ...props
    },
    ref
  ) => {
    const childrenArray = React.Children.toArray(children);

    // Se não há children, retorna null
    if (childrenArray.length === 0) {
      return null;
    }

    // Função para obter classes de direção
    const getDirectionClasses = () => {
      if (typeof direction === 'string') {
        return {
          'flex-col': direction === 'column',
          'flex-row': direction === 'row',
          'flex-col-reverse': direction === 'column-reverse',
          'flex-row-reverse': direction === 'row-reverse',
        };
      }

      // Para valores responsivos, retorna classes responsivas
      const classes: Record<string, boolean> = {};
      if (direction?.xs) classes[`flex-${direction.xs}`] = true;
      if (direction?.sm) classes[`sm:flex-${direction.sm}`] = true;
      if (direction?.md) classes[`md:flex-${direction.md}`] = true;
      if (direction?.lg) classes[`lg:flex-${direction.lg}`] = true;
      if (direction?.xl) classes[`xl:flex-${direction.xl}`] = true;

      return classes;
    };

    // Se há apenas um child e não há divider, renderiza diretamente
    if (childrenArray.length === 1 && !divider) {
      return (
        <div
          ref={ref}
          className={cn(
            'flex',
            getDirectionClasses(),
            {
              'items-start': alignItems === 'flex-start',
              'items-center': alignItems === 'center',
              'items-end': alignItems === 'flex-end',
              'items-stretch': alignItems === 'stretch',
              'items-baseline': alignItems === 'baseline',
            },
            {
              'justify-start': justifyContent === 'flex-start',
              'justify-center': justifyContent === 'center',
              'justify-end': justifyContent === 'flex-end',
              'justify-between': justifyContent === 'space-between',
              'justify-around': justifyContent === 'space-around',
              'justify-evenly': justifyContent === 'space-evenly',
            },
            className
          )}
          style={sx}
          {...props}
        >
          {children}
        </div>
      );
    }

    // Se useFlexGap está habilitado, usa CSS gap
    if (useFlexGap) {
      return (
        <div
          ref={ref}
          className={cn(
            'flex',
            getDirectionClasses(),
            {
              'items-start': alignItems === 'flex-start',
              'items-center': alignItems === 'center',
              'items-end': alignItems === 'flex-end',
              'items-stretch': alignItems === 'stretch',
              'items-baseline': alignItems === 'baseline',
            },
            {
              'justify-start': justifyContent === 'flex-start',
              'justify-center': justifyContent === 'center',
              'justify-end': justifyContent === 'flex-end',
              'justify-between': justifyContent === 'space-between',
              'justify-around': justifyContent === 'space-around',
              'justify-evenly': justifyContent === 'space-evenly',
            },
            className
          )}
          style={{
            gap:
              typeof spacing === 'number'
                ? `${spacing * 0.25}rem`
                : typeof spacing === 'string'
                  ? spacing
                  : '0',
            ...sx,
          }}
          {...props}
        >
          {children}
        </div>
      );
    }

    // Implementação com margin (comportamento padrão)
    const renderChildren = () => {
      if (!divider) {
        return childrenArray.map((child, index) => {
          const isLast = index === childrenArray.length - 1;
          // Para valores responsivos, usa 'column' como padrão
          const currentDirection =
            typeof direction === 'string' ? direction : 'column';
          const marginProperty = currentDirection.includes('row')
            ? 'marginRight'
            : 'marginBottom';

          return (
            <div
              key={index}
              style={{
                [marginProperty]: isLast
                  ? 0
                  : typeof spacing === 'number'
                    ? `${spacing * 0.25}rem`
                    : typeof spacing === 'string'
                      ? spacing
                      : '0',
              }}
            >
              {child}
            </div>
          );
        });
      }

      // Com divider
      const result: React.ReactNode[] = [];
      childrenArray.forEach((child, index) => {
        result.push(<div key={`child-${index}`}>{child}</div>);

        if (index < childrenArray.length - 1) {
          result.push(<div key={`divider-${index}`}>{divider}</div>);
        }
      });

      return result;
    };

    return (
      <div
        ref={ref}
        className={cn(
          'flex',
          getDirectionClasses(),
          {
            'items-start': alignItems === 'flex-start',
            'items-center': alignItems === 'center',
            'items-end': alignItems === 'flex-end',
            'items-stretch': alignItems === 'stretch',
            'items-baseline': alignItems === 'baseline',
          },
          {
            'justify-start': justifyContent === 'flex-start',
            'justify-center': justifyContent === 'center',
            'justify-end': justifyContent === 'flex-end',
            'justify-between': justifyContent === 'space-between',
            'justify-around': justifyContent === 'space-around',
            'justify-evenly': justifyContent === 'space-evenly',
          },
          className
        )}
        style={sx}
        {...props}
      >
        {renderChildren()}
      </div>
    );
  }
);

Stack.displayName = 'Stack';

export { Stack };
