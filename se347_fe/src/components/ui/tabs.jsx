import React, { useState } from "react";
import { cn } from "@/lib/utils"; // hoặc thay bằng className bình thường

export function Tabs({ defaultValue, children }) {
  const [activeTab, setActiveTab] = useState(defaultValue);

  // clone children để truyền activeTab
  const clonedChildren = React.Children.map(children, (child) => {
    if (!React.isValidElement(child)) return child;
    return React.cloneElement(child, { activeTab, setActiveTab });
  });

  return <div>{clonedChildren}</div>;
}

export function TabsList({ children, className, activeTab, setActiveTab }) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-1 rounded-md bg-muted p-1",
        className
      )}
    >
      {React.Children.map(children, (child) => {
        if (!React.isValidElement(child)) return child;
        return React.cloneElement(child, { activeTab, setActiveTab });
      })}
    </div>
  );
}

export function TabsTrigger({
  value,
  children,
  className,
  activeTab,
  setActiveTab,
}) {
  const isActive = activeTab === value;
  return (
    <button
      onClick={() => setActiveTab(value)}
      className={cn(
        "px-3 py-1.5 rounded text-sm",
        isActive ? "bg-background shadow" : "",
        className
      )}
    >
      {children}
    </button>
  );
}

export function TabsContent({ value, children, className, activeTab }) {
  if (activeTab !== value) return null;
  return <div className={cn("mt-2", className)}>{children}</div>;
}
