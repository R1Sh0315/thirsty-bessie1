import React, { useEffect, useRef } from "react";

interface ButtonProps {
  label: string;
  onClick?: () => String | number | void;
  bgColor?: string;
  isDark?: boolean;
}

const ButtonComponent: React.FC<ButtonProps> = ({
  label,
  onClick,
  bgColor,
}) => {
  const backColor =
    bgColor === "primary"
      ? "primary-btn"
      : bgColor === "secondary"
        ? "secondary-btn"
        : "ghost-btn";

  return (
    <div className={`btn-contianer ${backColor}`} onClick={onClick}>
      {label}
    </div>
  );
};

export default ButtonComponent;
