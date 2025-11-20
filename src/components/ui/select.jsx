import React from "react";
import * as SelectPrimitive from "@radix-ui/react-select";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

const Select = SelectPrimitive.Root;
const SelectTrigger = React.forwardRef(({ className, ...props }, ref) => (
  <SelectPrimitive.Trigger
    ref={ref}
    className={cn(
      "flex h-10 w-full items-center justify-between rounded-md border px-3 text-sm",
      className
    )}
    {...props}
  />
));
SelectTrigger.displayName = "SelectTrigger";

const SelectContent = React.forwardRef(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Content
    ref={ref}
    className={cn(
      "z-50 overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md",
      className
    )}
    {...props}
  >
    <SelectPrimitive.Viewport className="p-1">{children}</SelectPrimitive.Viewport>
  </SelectPrimitive.Content>
));
SelectContent.displayName = "SelectContent";

const SelectItem = React.forwardRef(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Item
    ref={ref}
    className={cn("relative flex cursor-pointer items-center rounded-sm py-1.5 pl-8 pr-2 text-sm", className)}
    {...props}
  >
    <SelectPrimitive.ItemIndicator className="absolute left-2">
      <Check className="h-4 w-4" />
    </SelectPrimitive.ItemIndicator>
    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
  </SelectPrimitive.Item>
));
SelectItem.displayName = "SelectItem";

export { Select, SelectTrigger, SelectContent, SelectItem };
