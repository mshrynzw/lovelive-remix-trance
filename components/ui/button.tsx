import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-jp text-sm tracking-widest transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aurora-mint focus-visible:ring-offset-2 focus-visible:ring-offset-night-deep disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary:
          "bg-gradient-to-r from-aurora-cyan to-aurora-mint text-night-deep font-semibold shadow-glow hover:shadow-glow-mint hover:scale-[1.03] active:scale-[0.98]",
        outline:
          "border border-aurora-ice/40 text-ink-light hover:border-aurora-ice hover:bg-aurora-ice/5 hover:scale-[1.02]",
        ghost:
          "text-ink-soft hover:text-aurora-ice hover:bg-white/5",
      },
      size: {
        default: "h-12 px-8 py-3",
        sm: "h-9 px-5 text-xs",
        icon: "h-11 w-11",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
