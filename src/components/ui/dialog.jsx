import React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { cn } from "@/lib/utils";

const Dialog = DialogPrimitive.Root;
const DialogTrigger = DialogPrimitive.Trigger;

const DialogPortal = ({ className, children, ...props }) => (
  <DialogPrimitive.Portal {...props}>
    <div className={cn("fixed inset-0 z-50 flex items-end justify-center sm:items-center", className)}>
      {children}
    </div>
  </DialogPrimitive.Portal>
);

const DialogOverlay = React.forwardRef(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn("fixed inset-0 z-50 bg-black/50 backdrop-blur-sm transition-opacity", className)}
    {...props}
  />
));
DialogOverlay.displayName = "DialogOverlay";

const DialogContent = React.forwardRef(({ className, children, ...props }, ref) => (
  <DialogPrimitive.Content
    ref={ref}
    className={cn("fixed z-50 grid w-full max-w-lg gap-4 rounded-lg bg-white p-6 shadow-lg", className)}
    {...props}
  >
    {children}
    <DialogPrimitive.Close asChild>
      <button className="mt-2 px-4 py-2">Close</button>
    </DialogPrimitive.Close>
  </DialogPrimitive.Content>
));
DialogContent.displayName = "DialogContent";

const DialogTitle = React.forwardRef(({ className, children, ...props }, ref) => (
  <DialogPrimitive.Title ref={ref} className={cn("text-lg font-semibold", className)} {...props}>
    {children}
  </DialogPrimitive.Title>
));
DialogTitle.displayName = "DialogTitle";

const DialogDescription = React.forwardRef(({ className, children, ...props }, ref) => (
  <DialogPrimitive.Description ref={ref} className={cn("text-sm text-muted-foreground", className)} {...props}>
    {children}
  </DialogPrimitive.Description>
));
DialogDescription.displayName = "DialogDescription";

export { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogFooter, DialogTitle, DialogDescription };
