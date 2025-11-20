import React from "react";
import { cn } from "@/lib/utils";

const Spinner = ({ className }) => (
  <div
    className={cn(
      "h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent",
      className
    )}
  />
);

export { Spinner };
