import React from "react";
import { cn } from "@/lib/utils";

const Pagination = ({ className, children, ...props }) => (
  <div className={cn("flex items-center gap-2", className)} {...props}>
    {children}
  </div>
);

const PaginationButton = ({ className, children, ...props }) => (
  <button
    className={cn(
      "px-3 py-1 border rounded-md text-sm hover:bg-accent",
      className
    )}
    {...props}
  >
    {children}
  </button>
);

export { Pagination, PaginationButton };
