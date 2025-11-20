import React from "react";
import * as DrawerPrimitive from "@radix-ui/react-dialog";
import { cn } from "@/lib/utils";

const Drawer = DrawerPrimitive.Root;
const DrawerTrigger = DrawerPrimitive.Trigger;

const DrawerContent = React.forwardRef(({ className, children, ...props }, ref) => (
  <DrawerPrimitive.Content
    ref={ref}
    className={cn(
      "fixed bottom-0 left-0 right-0 z-50 rounded-t-xl bg-background p-6 shadow-lg",
      className
    )}
    {...props}
  >
    {children}
  </DrawerPrimitive.Content>
));
DrawerContent.displayName = "DrawerContent";

export { Drawer, DrawerTrigger, DrawerContent };
