import React from "react";
import { cn } from "@/lib/utils";

const EmptyState = ({ icon: Icon, title, description, className }) => (
  <div className={cn("flex flex-col items-center p-8 text-center", className)}>
    {Icon && <Icon className="h-10 w-10 text-muted-foreground mb-3" />}
    <h3 className="font-semibold">{title}</h3>
    <p className="text-sm text-muted-foreground">{description}</p>
  </div>
);

export { EmptyState };
