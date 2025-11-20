import React from "react";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import { cn } from "@/lib/utils";

const RadioGroup = RadioGroupPrimitive.Root;

const RadioGroupItem = React.forwardRef(({ className, ...props }, ref) => (
  <RadioGroupPrimitive.Item
    ref={ref}
    className={cn(
      "h-4 w-4 rounded-full border border-primary flex items-center justify-center",
      className
    )}
    {...props}
  >
    <RadioGroupPrimitive.Indicator className="h-2 w-2 bg-primary rounded-full" />
  </RadioGroupPrimitive.Item>
));
RadioGroupItem.displayName = "RadioGroupItem";

export { RadioGroup, RadioGroupItem };
