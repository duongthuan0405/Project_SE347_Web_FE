import React from "react";
import * as MenubarPrimitive from "@radix-ui/react-menubar";
import { cn } from "@/lib/utils";

const Menubar = MenubarPrimitive.Root;
const MenubarMenu = MenubarPrimitive.Menu;

const MenubarTrigger = React.forwardRef(({ className, ...props }, ref) => (
  <MenubarPrimitive.Trigger
    ref={ref}
    className={cn("px-3 py-2 text-sm hover:bg-accent rounded-md", className)}
    {...props}
  />
));
MenubarTrigger.displayName = "MenubarTrigger";

const MenubarContent = React.forwardRef(({ className, children, ...props }, ref) => (
  <MenubarPrimitive.Content
    ref={ref}
    className={cn("rounded-md border bg-popover p-1 shadow-md", className)}
    {...props}
  >
    {children}
  </MenubarPrimitive.Content>
));
MenubarContent.displayName = "MenubarContent";

export { Menubar, MenubarMenu, MenubarTrigger, MenubarContent };
