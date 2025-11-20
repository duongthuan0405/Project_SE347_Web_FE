import React from "react";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import { cn } from "@/lib/utils";

const Popover = PopoverPrimitive.Root;
const PopoverTrigger = PopoverPrimitive.Trigger;

const PopoverContent = React.forwardRef(({ className, ...props }, ref) => (
  <PopoverPrimitive.Content
    ref={ref}
    className={cn("rounded-md border bg-popover p-3 shadow-md", className)}
    {...props}
  />
));
PopoverContent.displayName = "PopoverContent";

export { Popover, PopoverTrigger, PopoverContent };
