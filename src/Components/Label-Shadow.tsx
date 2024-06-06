import React, { useEffect, useRef } from "react";

interface ILabel {
  label: string;
  isDark: boolean;
}

const LabelShadowComponent: React.FC<ILabel> = ({ label, isDark }) => {
  return (
    <div className="ls-container">
      <div className={`title-background ${isDark?'tb-dark':'tb-light'}`}>{label}</div>
      <div className="title-label">{label}</div>
    </div>
  );
};

export default LabelShadowComponent;
