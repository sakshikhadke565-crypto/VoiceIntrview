import React from 'react';
import { cn } from '../../utils/cn';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  glass?: boolean;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, glass = true, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'rounded-2xl border border-slate-800/50 bg-slate-900/50 p-6',
          glass && 'backdrop-blur-md shadow-xl',
          className
        )}
        {...props}
      />
    );
  }
);
Card.displayName = 'Card';
