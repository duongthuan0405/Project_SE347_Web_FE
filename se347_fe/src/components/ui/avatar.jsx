import React from "react";
import { cn } from "@/lib/utils";

const AvatarImage = React.forwardRef(({ className, ...props }, ref) => (
  <img
    ref={ref}
    className={cn("object-cover rounded-full", className)}
    {...props}
  />
));

export { AvatarImage };
