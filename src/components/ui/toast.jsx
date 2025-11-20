import React from "react";
import { ToastProvider, ToastViewport, Toast, ToastTitle, ToastDescription } from "sonner";
import { cn } from "@/lib/utils";

const AppToastProvider = ({ children }) => (
  <ToastProvider>
    {children}
    <ToastViewport className="fixed bottom-4 right-4" />
  </ToastProvider>
);

export { AppToastProvider, Toast, ToastTitle, ToastDescription };
