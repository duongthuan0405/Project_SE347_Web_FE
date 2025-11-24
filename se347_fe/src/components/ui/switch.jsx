import React, { use, useEffect, useState } from "react";

export function Switch({ checked: checkedProp, onChange }) {
  const [checked, setChecked] = useState();

  useEffect(
    function () {
      setChecked(!!checkedProp);
    },
    [checkedProp]
  );

  function handleClick() {
    const prev = checked;
    setChecked((prev) => !prev);
    onChange(!prev);
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`w-10 h-5 rounded-full transition-colors duration-200 ${
        checked ? "bg-blue-500" : "bg-gray-300"
      }`}
    >
      <span
        className={`block w-4 h-4 bg-white rounded-full shadow transform transition-transform duration-200 ${
          checked ? "translate-x-5" : "translate-x-0"
        }`}
      />
    </button>
  );
}
