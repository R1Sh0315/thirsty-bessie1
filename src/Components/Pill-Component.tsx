import React, { useState } from "react";

interface IPill {
  label: string;
  url?: string;
  icon?: string;
}

const PillComponent: React.FC<IPill> = ({ label, url, icon }) => {
  return (
    <>
      <a href={url} target="_blank">
        <div className="pill-container">{label}</div>
      </a>
    </>
  );
};
export default PillComponent;
