import React, { useEffect, useRef } from "react";

interface ILabel {
  description: string;
  isDark?: boolean;
}

const NoteComponent: React.FC<ILabel> = ({ description, isDark }) => {
  return (
    <div className={`n-container bg-n-${isDark?'dark':'light'}`}>
      <div className="n-content">" {description}"</div>
    </div>
  );
};

export default NoteComponent;
