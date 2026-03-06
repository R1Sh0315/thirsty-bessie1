import React, { useState } from "react";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";

interface ITBtn {
  label: string;
  isDark?: (value: boolean) => void;
  toToggle?: boolean;
}

const ToggleBtnComponent: React.FC<ITBtn> = ({ label, isDark, toToggle }) => {
  const [isBoolean, setIsBoolean] = useState(toToggle || false);

  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.checked;
    setIsBoolean(newValue);
    if (isDark) {
      isDark(newValue);
    }
  };

  return (
    <div className="TBtn-container" style={{ position: 'absolute', top: 16, right: 16 }}>
      <FormControlLabel
        control={<Switch checked={isBoolean} onChange={onChangeHandler} color="primary" />}
        label={label}
        style={{ color: isBoolean ? "#e2e8f0" : "#1e293b" }}
      />
    </div>
  );
};

export default ToggleBtnComponent;
