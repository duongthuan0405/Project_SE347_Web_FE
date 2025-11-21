import React from "react";
import { cn } from "@/lib/utils";

const Button = React.forwardRef(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    const base =
      "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";
    const variants = {
      default: "bg-red-500 text-white hover:bg-primary/90",
      outline: "border border-input bg-background hover:bg-accent",
      ghost: "bg-transparent hover:bg-accent",
      link: "bg-transparent underline-offset-4 hover:underline",
    };
    const sizes = {
      default: "h-10 py-2 px-4",
      sm: "h-8 px-3",
      lg: "h-11 px-8",
    };
    return (
      <button
        ref={ref}
        className={cn(base, variants[variant], sizes[size], className)}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button };
