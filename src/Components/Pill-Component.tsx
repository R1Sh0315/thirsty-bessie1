import React from "react";
import Chip from "@mui/material/Chip";

interface IPill {
  label: string;
  url?: string;
  icon?: React.ReactElement; // Typically MUI icons are ReactElements
}

const PillComponent: React.FC<IPill> = ({ label, url, icon }) => {
  return (
    <Chip
      label={label}
      icon={icon}
      component={url ? "a" : "div"}
      href={url}
      target={url ? "_blank" : undefined}
      rel={url ? "noreferrer" : undefined}
      clickable={!!url}
      sx={{
        margin: '4px',
        fontWeight: 600,
        backgroundColor: "rgba(57, 167, 255, 0.1)",
        color: "#39a7ff",
        border: "1px solid rgba(57, 167, 255, 0.3)",
        '&:hover': {
          backgroundColor: "rgba(57, 167, 255, 0.2)",
          borderColor: "rgba(57, 167, 255, 0.5)"
        }
      }}
    />
  );
};

export default PillComponent;
