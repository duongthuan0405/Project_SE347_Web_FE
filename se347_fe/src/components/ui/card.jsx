import React from "react";
import { cn } from "@/lib/utils";

const Card = ({ className, children, ...props }) => {
  return (
    <div
      className={cn("rounded-lg border bg-card p-4 shadow-sm", className)}
      {...props}
    >
      {children}
    </div>
  );
};

const CardHeader = ({ className, children, ...props }) => (
  <div
    className={cn("mb-2 flex items-center justify-between", className)}
    {...props}
  >
    {children}
  </div>
);
const CardTitle = ({ className, children, ...props }) => (
  <h3 className={cn("text-lg font-semibold", className)} {...props}>
    {children}
  </h3>
);
const CardDescription = ({ className, children, ...props }) => (
  <p className={cn("text-sm text-muted-foreground", className)} {...props}>
    {children}
  </p>
);

const CardContent = ({ className, children, ...props }) => (
  <div className={cn("p-6 pt-0", className)} {...props}>
    {children}
  </div>
);

export { Card, CardHeader, CardTitle, CardDescription, CardContent };
