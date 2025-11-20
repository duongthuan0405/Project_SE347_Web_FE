import React from "react";
import * as ContextMenuPrimitive from "@radix-ui/react-context-menu";
import { cn } from "@/lib/utils";

const ContextMenu = ContextMenuPrimitive.Root;
const ContextMenuTrigger = ContextMenuPrimitive.Trigger;

const ContextMenuContent = React.forwardRef(({ className, children, ...props }, ref) => (
  <ContextMenuPrimitive.Portal>
    <ContextMenuPrimitive.Content
      ref={ref}
      className={cn("min-w-[8rem] rounded-md border bg-popover p-1 shadow-md", className)}
      {...props}
    >
      {children}
    </ContextMenuPrimitive.Content>
  </ContextMenuPrimitive.Portal>
));
ContextMenuContent.displayName = "ContextMenuContent";

const ContextMenuItem = React.forwardRef(({ className, ...props }, ref) => (
  <ContextMenuPrimitive.Item
    ref={ref}
    className={cn("cursor-pointer px-2 py-1 rounded-sm text-sm hover:bg-accent", className)}
    {...props}
  />
));
ContextMenuItem.displayName = "ContextMenuItem";

export { ContextMenu, ContextMenuTrigger, ContextMenuContent, ContextMenuItem };
