import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-semibold ring-offset-background transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]',
  {
    variants: {
      variant: {
        default:
          'bg-[#0A2540] text-white shadow-sm hover:bg-[#0d3060] hover:shadow-md',
        secondary:
          'bg-[#00A6FB] text-white shadow-sm hover:bg-[#0097e8] hover:shadow-md',
        accent:
          'bg-[#22C55E] text-white shadow-sm hover:bg-[#16A34A] hover:shadow-md',
        outline:
          'border-2 border-[#0A2540] bg-transparent text-[#0A2540] hover:bg-[#0A2540] hover:text-white',
        ghost:
          'bg-transparent text-[#0A2540] hover:bg-[#0A2540]/10',
        link:
          'text-[#00A6FB] underline-offset-4 hover:underline p-0 h-auto shadow-none',
        destructive:
          'bg-destructive text-white hover:bg-destructive/90',
        muted:
          'bg-muted text-foreground hover:bg-muted/80',
      },
      size: {
        default: 'h-11 px-6 py-2.5',
        sm: 'h-9 rounded-lg px-4 py-2 text-xs',
        lg: 'h-12 rounded-xl px-8 py-3 text-base',
        xl: 'h-14 rounded-xl px-10 py-4 text-base',
        icon: 'h-10 w-10 p-0',
        'icon-sm': 'h-8 w-8 p-0',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

const Button = React.forwardRef(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
