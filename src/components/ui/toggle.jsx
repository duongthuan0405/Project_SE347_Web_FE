import React from "react";
import { cn } from "@/lib/utils";

const Toggle = React.forwardRef(({ className, pressed, ...props }, ref) => (
  <button
    ref={ref}
    data-pressed={pressed}
    className={cn(
      "inline-flex items-center rounded-md px-3 py-1.5 text-sm data-[pressed=true]:bg-primary data-[pressed=true]:text-white",
      className
    )}
    {...props}
  />
));
Toggle.displayName = "Toggle";

export { Toggle };
