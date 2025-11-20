import React from "react";
import { cn } from "@/lib/utils";

const Textarea = React.forwardRef(({ className, ...props }, ref) => (
  <textarea
    ref={ref}
    className={cn("min-h-[100px] w-full rounded-md border px-3 py-2 text-sm", className)}
    {...props}
  />
));
Textarea.displayName = "Textarea";

export { Textarea };
