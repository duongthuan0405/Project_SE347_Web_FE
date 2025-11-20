import React from "react";
import { cn } from "@/lib/utils";

const CommandMenu = ({ className, children }) => {
  return (
    <div
      className={cn("rounded-md border bg-background p-2 shadow-md", className)}
    >
      {children}
    </div>
  );
};

const CommandMenuItem = ({ className, onSelect, children }) => (
  <div
    onClick={onSelect}
    className={cn(
      "cursor-pointer rounded px-3 py-1.5 text-sm hover:bg-accent",
      className
    )}
  >
    {children}
  </div>
);

export { CommandMenu, CommandMenuItem };
