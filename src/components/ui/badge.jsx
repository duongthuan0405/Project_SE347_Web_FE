import React from "react";
import { cn } from "@/lib/utils";

const Badge = ({ className, variant = "default", ...props }) => {
  const variants = {
    default: "bg-primary text-white",
    secondary: "bg-secondary text-secondary-foreground",
    outline: "border border-border",
  };
  return (
    <span
      className={cn("inline-flex px-2 py-1 text-xs rounded-full", variants[variant], className)}
      {...props}
    />
  );
};

export { Badge };
