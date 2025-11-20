import React from "react";
import { cn } from "@/lib/utils";

const Command = ({ className, ...props }) => (
  <div className={cn("rounded-md border p-2", className)} {...props} />
);

const CommandItem = ({ className, ...props }) => (
  <div className={cn("px-2 py-1 text-sm hover:bg-accent rounded", className)} {...props} />
);

export { Command, CommandItem };
