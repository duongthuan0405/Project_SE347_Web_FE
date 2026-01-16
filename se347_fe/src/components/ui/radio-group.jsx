import { cn } from "@/lib/utils";
import React from "react";

export function RadioGroup({
  currentSelectedValue,
  onChange,
  name,
  children,
  className,
}) {
  const enhancedChildren = React.Children.map(children, (child) => {
    if (!React.isValidElement(child)) return child;
    return React.cloneElement(child, {
      name,
      checked: child.props.value === currentSelectedValue,
      onChange: (e) => onChange(e.target.value),
    });
  });

  return <div className={className}>{enhancedChildren}</div>;
}

export function RadioItem({
  children,
  value,
  checked,
  onChange,
  name,
  className,
}) {
  return (
    <label
      className={cn("flex items-center space-x-5 cursor-pointer", className)}
    >
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
      />
      {children}
    </label>
  );
}
