import React from "react";
import { cn } from "@/lib/utils";

const Breadcrumb = ({ className, children, ...props }) => (
  <nav className={cn("flex items-center space-x-2 text-sm", className)} {...props}>
    {children}
  </nav>
);

const BreadcrumbItem = ({ className, children, ...props }) => (
  <div className={cn("flex items-center gap-1", className)} {...props}>
    {children}
  </div>
);

export { Breadcrumb, BreadcrumbItem };
