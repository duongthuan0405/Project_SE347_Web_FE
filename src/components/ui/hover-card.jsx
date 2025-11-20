import React from "react";
import * as HoverCardPrimitive from "@radix-ui/react-hover-card";
import { cn } from "@/lib/utils";

const HoverCard = HoverCardPrimitive.Root;
const HoverCardTrigger = HoverCardPrimitive.Trigger;

const HoverCardContent = React.forwardRef(({ className, ...props }, ref) => (
  <HoverCardPrimitive.Content
    ref={ref}
    className={cn("rounded-md border bg-popover p-3 shadow-md", className)}
    {...props}
  />
));
HoverCardContent.displayName = "HoverCardContent";

export { HoverCard, HoverCardTrigger, HoverCardContent };
