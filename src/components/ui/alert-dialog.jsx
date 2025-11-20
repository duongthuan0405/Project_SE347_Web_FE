import React from "react";
import * as AlertDialogPrimitive from "@radix-ui/react-alert-dialog";

import { cn } from "@/lib/utils";

const AlertDialog = AlertDialogPrimitive.Root;
const AlertDialogTrigger = AlertDialogPrimitive.Trigger;
const AlertDialogPortal = ({ className, children, ...props }) => (
  <AlertDialogPrimitive.Portal {...props}>
    <div className={cn("fixed inset-0 z-50 flex items-end justify-center sm:items-center", className)}>
      {children}
    </div>
  </AlertDialogPrimitive.Portal>
);
const AlertDialogOverlay = React.forwardRef(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Overlay
    ref={ref}
    className={cn("fixed inset-0 z-50 bg-black/50 backdrop-blur-sm transition-opacity", className)}
    {...props}
  />
));
AlertDialogOverlay.displayName = "AlertDialogOverlay";

const AlertDialogContent = React.forwardRef(({ className, children, ...props }, ref) => (
  <AlertDialogPrimitive.Content
    ref={ref}
    className={cn(
      "fixed z-50 grid w-full max-w-lg scale-100 gap-4 rounded-b-lg bg-white p-6 shadow-lg sm:rounded-lg sm:zoom-in",
      className
    )}
    {...props}
  >
    {children}
    <AlertDialogPrimitive.Cancel asChild>
      <button className="mt-2 px-4 py-2">Hủy</button>
    </AlertDialogPrimitive.Cancel>
  </AlertDialogPrimitive.Content>
));
AlertDialogContent.displayName = "AlertDialogContent";

const AlertDialogTitle = React.forwardRef(({ className, children, ...props }, ref) => (
  <AlertDialogPrimitive.Title ref={ref} className={cn("text-lg font-semibold", className)} {...props}>
    {children}
  </AlertDialogPrimitive.Title>
));
AlertDialogTitle.displayName = "AlertDialogTitle";

const AlertDialogDescription = React.forwardRef(({ className, children, ...props }, ref) => (
  <AlertDialogPrimitive.Description ref={ref} className={cn("text-sm text-muted-foreground", className)} {...props}>
    {children}
  </AlertDialogPrimitive.Description>
));
AlertDialogDescription.displayName = "AlertDialogDescription";

export {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogPortal,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
};
