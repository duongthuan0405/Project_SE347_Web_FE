import React from "react";
import { DayPicker } from "react-day-picker";
import { cn } from "@/lib/utils";

const Calendar = ({ className, ...props }) => {
  return <DayPicker className={cn("p-3", className)} {...props} />;
};

export { Calendar };
