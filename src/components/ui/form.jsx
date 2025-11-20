import React from "react";
import { FormProvider, useFormContext } from "react-hook-form";
import { cn } from "@/lib/utils";

const Form = ({ className, children, ...props }) => {
  return (
    <form className={cn("space-y-6", className)} {...props}>
      {children}
    </form>
  );
};

const FormField = ({ name, children }) => {
  const form = useFormContext();
  return children({
    field: form.register(name),
    formState: form.formState,
  });
};

const FormItem = ({ className, ...props }) => (
  <div className={cn("space-y-1", className)} {...props} />
);

const FormLabel = ({ className, ...props }) => (
  <label className={cn("text-sm font-medium", className)} {...props} />
);

const FormMessage = ({ children, className }) => (
  <p className={cn("text-sm text-red-500", className)}>{children}</p>
);

export { Form, FormProvider, FormField, FormItem, FormLabel, FormMessage };
