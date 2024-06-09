import React, { useState } from "react";
import LightModeIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeIcon from "@mui/icons-material/DarkModeOutlined";
// import moon from "../utility/Darkmode.svg";
// import sun from "../utility/Lightmode.svg";
import WbSunnyIcon from "@mui/icons-material/WbSunny";

interface ITBtn {
  label: string;
  isDark?: (value: boolean) => void;
  toToggle?: boolean;
}

const ToggleBtnComponent: React.FC<ITBtn> = ({ label, isDark, toToggle }) => {
  const [isBoolean, setIsBoolean] = useState(toToggle || false);

  const onClickHandler = () => {
    const newValue = !isBoolean;
    setIsBoolean(newValue);
    if (isDark) {
      isDark(newValue);
    }
  };

  return (
    <div className="TBtn-container" onClick={onClickHandler}>
      {isBoolean ? (
        // <img
        //   className="theme-container"
        //   src={"../utility/Darkmode.svg"}
        //   alt="Dark mode"
        // />
        <WbSunnyIcon />
      ) : (
        <WbSunnyIcon />
      )}
    </div>
  );
};

export default ToggleBtnComponent;
