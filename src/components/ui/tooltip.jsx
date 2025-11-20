import React from "react";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { cn } from "@/lib/utils";

const TooltipProvider = TooltipPrimitive.Provider;

const Tooltip = ({ children, content, ...props }) => (
  <TooltipProvider>
    <TooltipPrimitive.Root>
      <TooltipPrimitive.Trigger asChild>{children}</TooltipPrimitive.Trigger>
      <TooltipPrimitive.Content
        className={cn("rounded-md bg-popover px-2 py-1 text-sm shadow")}
        {...props}
      >
        {content}
      </TooltipPrimitive.Content>
    </TooltipPrimitive.Root>
  </TooltipProvider>
);

export { Tooltip, TooltipProvider };
