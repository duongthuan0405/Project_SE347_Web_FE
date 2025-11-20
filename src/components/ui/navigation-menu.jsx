import React from "react";
import * as NavigationMenuPrimitive from "@radix-ui/react-navigation-menu";
import { cn } from "@/lib/utils";

const NavigationMenu = NavigationMenuPrimitive.Root;
const NavigationMenuList = NavigationMenuPrimitive.List;

const NavigationMenuItem = NavigationMenuPrimitive.Item;

const NavigationMenuTrigger = React.forwardRef(({ className, ...props }, ref) => (
  <NavigationMenuPrimitive.Trigger
    ref={ref}
    className={cn("px-4 py-2 rounded-md hover:bg-accent text-sm", className)}
    {...props}
  />
));
NavigationMenuTrigger.displayName = "NavigationMenuTrigger";

const NavigationMenuContent = React.forwardRef(({ className, children, ...props }, ref) => (
  <NavigationMenuPrimitive.Content
    ref={ref}
    className={cn("rounded-md border bg-popover p-4 shadow-lg", className)}
    {...props}
  >
    {children}
  </NavigationMenuPrimitive.Content>
));
NavigationMenuContent.displayName = "NavigationMenuContent";

export {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
};
