import React, { useEffect, useRef } from "react";

interface IDPB {
  label: string;
  number?: number; // Making number optional
  icon?: string;
  outputValue?: (value: string) => void;
}

const DProgressbarComponent: React.FC<IDPB> = ({ label, number, outputValue }) => {
  const circleRef = useRef<SVGCircleElement | null>(null);
  const textRef = useRef<SVGTextElement | null>(null);

  useEffect(() => {
    if (circleRef.current && textRef.current) {
      updateDonut(number ? number * 0.35 : 0);
    }
  }, [number]); // Call updateDonut whenever number changes

  const updateDonut = (progress: number) => {
    if (circleRef.current && textRef.current) {
      const circle = circleRef.current;
      const text = textRef.current;
      const radius = circle.r.baseVal.value;
      const circumference = 2 * Math.PI * radius;
      const offset = circumference - (progress / 100) * circumference;

      circle.style.strokeDasharray = `${progress}, 1000`;
      text.textContent = `${(progress / 0.349).toFixed(0)}%`;
    }
  };

  const onClickHandler = (val: string) => {
    if (outputValue) {
      outputValue(val);
    }
  };

  return (
    <div className="DPB-container">
      <div className="donut-container" onClick={() => onClickHandler(label)}>
        <div className="DPB-content">
          <svg className="donut" width="50" height="50">
            <circle
              ref={circleRef}
              className="donut-segment"
              cx="25"
              cy="25"
              r="20"
              stroke="#f72798"
              strokeWidth="5"
              strokeDasharray="0, 1000"
            ></circle>
          </svg>
          <text
            ref={textRef}
            x="50%"
            y="50%"
            textAnchor="middle"
            className="donut-text"
          >
            0%
          </text>
        </div>
        <div className="DPB-label">{label}</div>
      </div>
    </div>
  );
};

export default DProgressbarComponent;
