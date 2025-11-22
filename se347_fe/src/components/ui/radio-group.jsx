import React, { useState, useEffect } from "react";

// RadioGroup wrapper
export function RadioGroup({ initValue, onChange, children, name, className }) {
  const [selectedValue, setSelectedValue] = useState(initValue || "");

  // Đồng bộ khi initValue thay đổi từ bên ngoài
  useEffect(() => {
    if (initValue !== undefined) {
      setSelectedValue(initValue);
    }
  }, [initValue]);

  const enhancedChildren = React.Children.map(children, (child) => {
    if (!React.isValidElement(child)) return child;

    return React.cloneElement(child, {
      name,
      checked: child.props.value === selectedValue,
      onChange: (e) => {
        const val = e.target.value;
        setSelectedValue(val); // Cập nhật state
        onChange && onChange(val); // Gửi value ra ngoài nếu có
      },
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
      <span>{value}</span>
    </label>
  );
}
