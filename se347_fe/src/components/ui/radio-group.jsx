import React from "react";

// RadioGroup wrapper
export function RadioGroup({ value, onChange, children, name, className }) {
  // clone children để thêm props
  const enhancedChildren = React.Children.map(children, (child) => {
    if (!React.isValidElement(child)) return child;
    return React.cloneElement(child, {
      name,
      checked: child.props.value === value,
      onChange: (e) => onChange(e.target.value),
    });
  });

  return <div className={className}>{enhancedChildren}</div>;
}

// RadioGroupItem
export function RadioGroupItem({ value, checked, onChange, className }) {
  return (
    <label
      className={`flex items-center cursor-pointer space-x-2 ${
        className || ""
      }`}
    >
      <input
        type="radio"
        value={value}
        checked={checked}
        onChange={onChange}
        className="sr-only"
      />
      <span
        className={`h-4 w-4 rounded-full border border-primary flex items-center justify-center ${
          checked ? "bg-primary" : "bg-white"
        }`}
      >
        {checked && <span className="h-2 w-2 bg-white rounded-full" />}
      </span>
    </label>
  );
}
