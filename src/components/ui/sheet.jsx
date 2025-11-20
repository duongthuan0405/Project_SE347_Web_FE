import React from "react";
import * as SheetPrimitive from "@radix-ui/react-dialog";
import { cn } from "@/lib/utils";

const Sheet = SheetPrimitive.Root;
const SheetTrigger = SheetPrimitive.Trigger;

const SheetContent = React.forwardRef(({ className, children, side = "right", ...props }, ref) => (
  <SheetPrimitive.Content
    ref={ref}
    className={cn(
      "fixed z-50 bg-white p-6 shadow-lg transition-transform",
      side === "right" && "right-0 top-0 h-full w-80",
      side === "left" && "left-0 top-0 h-full w-80",
      className
    )}
    {...props}
  >
    {children}
  </SheetPrimitive.Content>
));
SheetContent.displayName = "SheetContent";

export { Sheet, SheetTrigger, SheetContent };
