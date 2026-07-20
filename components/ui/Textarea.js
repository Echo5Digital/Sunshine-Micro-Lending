import * as React from 'react';
import { cn } from '@/lib/utils';

const Textarea = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        'flex min-h-[100px] w-full rounded-lg border border-input bg-white px-4 py-3 text-sm text-foreground shadow-sm',
        'placeholder:text-muted-foreground',
        'transition-all duration-200',
        'focus:border-[#00A6FB] focus:outline-none focus:ring-2 focus:ring-[#00A6FB]/20',
        'disabled:cursor-not-allowed disabled:opacity-50',
        'resize-none',
        className
      )}
      ref={ref}
      {...props}
    />
  );
});
Textarea.displayName = 'Textarea';

export { Textarea };
