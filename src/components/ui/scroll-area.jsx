import React from "react";
import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area";
import { cn } from "@/lib/utils";

const ScrollArea = ({ className, children }) => (
  <ScrollAreaPrimitive.Root
    className={cn("relative overflow-hidden", className)}
  >
    <ScrollAreaPrimitive.Viewport className="h-full w-full">
      {children}
    </ScrollAreaPrimitive.Viewport>
    <ScrollAreaPrimitive.Scrollbar
      orientation="vertical"
      className="flex touch-none select-none rounded bg-muted p-0.5"
    >
      <ScrollAreaPrimitive.Thumb className="flex-1 rounded bg-primary/50" />
    </ScrollAreaPrimitive.Scrollbar>
  </ScrollAreaPrimitive.Root>
);

export { ScrollArea };
