import React, { useEffect, useRef } from "react";
import { Chart as ChartJS } from "chart.js/auto";

const Chart = ({ type = "bar", data, options }) => {
  const ref = useRef(null);
  const chartRef = useRef(null);

  useEffect(() => {
    if (!ref.current) return;

    if (chartRef.current) chartRef.current.destroy();

    chartRef.current = new ChartJS(ref.current, {
      type,
      data,
      options,
    });
  }, [type, data, options]);

  return <canvas ref={ref} />;
};

export { Chart };
