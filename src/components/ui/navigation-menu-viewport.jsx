import React from "react";
import * as NavigationMenuPrimitive from "@radix-ui/react-navigation-menu";
import { cn } from "@/lib/utils";

const NavigationMenuViewport = React.forwardRef(({ className, ...props }, ref) => (
  <NavigationMenuPrimitive.Viewport
    ref={ref}
    className={cn(
      "absolute top-full left-0 w-full overflow-hidden rounded-md border bg-popover shadow-md",
      className
    )}
    {...props}
  />
));
NavigationMenuViewport.displayName = "NavigationMenuViewport";

export { NavigationMenuViewport };
