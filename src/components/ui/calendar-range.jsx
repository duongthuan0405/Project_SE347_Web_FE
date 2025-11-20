import React from "react";
import { DayPicker } from "react-day-picker";
import { cn } from "@/lib/utils";

const CalendarRange = ({ className, ...props }) => {
  return (
    <DayPicker
      mode="range"
      className={cn("p-3 border rounded-md", className)}
      {...props}
    />
  );
};

export { CalendarRange };
