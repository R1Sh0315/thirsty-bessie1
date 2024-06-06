import React, { useEffect, useRef } from "react";
import LabelShadowComponent from "./Label-Shadow";

interface ILabel {
  label: string;
  isDark: boolean;
}

const CardComponent: React.FC<ILabel> = ({ label , isDark}) => {
  return (
    <div className="card-container">
      <LabelShadowComponent isDark={isDark} label={label} />
    </div>
  );
};

export default CardComponent;
