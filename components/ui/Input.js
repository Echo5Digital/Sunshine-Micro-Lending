import * as React from 'react';
import { cn } from '@/lib/utils';

const Input = React.forwardRef(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn(
        'flex h-11 w-full rounded-lg border border-input bg-white px-4 py-2.5 text-base text-foreground shadow-sm sm:text-sm',
        'placeholder:text-muted-foreground',
        'transition-all duration-200',
        'focus:border-[#00A6FB] focus:outline-none focus:ring-2 focus:ring-[#00A6FB]/20',
        'disabled:cursor-not-allowed disabled:opacity-50',
        'file:border-0 file:bg-transparent file:text-sm file:font-medium',
        className
      )}
      ref={ref}
      {...props}
    />
  );
});
Input.displayName = 'Input';

export { Input };
