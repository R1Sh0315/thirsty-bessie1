import React, { useState } from "react";

interface IPill {
  label: string;
  url?: string;
  icon?: string;
}

const PillComponent: React.FC<IPill> = ({ label, url, icon }) => {
  return (
    <>
      {url ? (
        <a href={url} target="_blank" rel="noreferrer">
          <div className="pill-container">{label}</div>
        </a>
      ) : (
        <div className="pill-container">{label}</div>
      )}
    </>
  );
};
export default PillComponent;
