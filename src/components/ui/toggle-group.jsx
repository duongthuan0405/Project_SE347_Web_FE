import React from "react";
import * as ToggleGroupPrimitive from "@radix-ui/react-toggle-group";
import { cn } from "@/lib/utils";

const ToggleGroup = ToggleGroupPrimitive.Root;

const ToggleGroupItem = React.forwardRef(({ className, ...props }, ref) => (
  <ToggleGroupPrimitive.Item
    ref={ref}
    className={cn(
      "px-3 py-1.5 rounded-md data-[state=on]:bg-primary data-[state=on]:text-white",
      className
    )}
    {...props}
  />
));
ToggleGroupItem.displayName = "ToggleGroupItem";

export { ToggleGroup, ToggleGroupItem };
