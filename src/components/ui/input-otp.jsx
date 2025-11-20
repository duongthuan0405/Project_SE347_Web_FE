import React, { useRef } from "react";
import { cn } from "@/lib/utils";

const OTPInput = ({ length = 6, value = "", onChange }) => {
  const inputs = useRef([]);

  const handleInput = (i, e) => {
    const val = e.target.value.replace(/\D/g, "");
    const newValue =
      value.substring(0, i) + val + value.substring(i + 1, value.length);

    onChange(newValue);

    if (val && inputs.current[i + 1]) {
      inputs.current[i + 1].focus();
    }
  };

  return (
    <div className="flex gap-2">
      {Array.from({ length }).map((_, i) => (
        <input
          key={i}
          ref={(el) => (inputs.current[i] = el)}
          value={value[i] || ""}
          onChange={(e) => handleInput(i, e)}
          maxLength={1}
          className={cn(
            "h-10 w-10 rounded-md border text-center text-lg",
          )}
        />
      ))}
    </div>
  );
};

export { OTPInput };
