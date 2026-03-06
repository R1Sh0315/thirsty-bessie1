import React from "react";
import Button from "@mui/material/Button";

interface ButtonProps {
  label: string;
  onClick?: () => String | number | void;
  bgColor?: "primary" | "secondary" | "inherit" | "error" | "info" | "success" | "warning";
  isDark?: boolean;
}

const ButtonComponent: React.FC<ButtonProps> = ({
  label,
  onClick,
  bgColor = "primary",
}) => {
  return (
    <Button
      variant={bgColor === "inherit" ? "text" : "contained"}
      color={bgColor !== "inherit" ? bgColor as any : "primary"}
      onClick={onClick}
      style={{ margin: '7px 9px', minWidth: '250px' }}
      sx={{
        borderRadius: 2,
        boxShadow: bgColor !== "inherit" ? "0 8px 32px 0 rgba(57, 167, 255, 0.4)" : "none",
        fontWeight: 600
      }}
    >
      {label}
    </Button>
  );
};

export default ButtonComponent;
