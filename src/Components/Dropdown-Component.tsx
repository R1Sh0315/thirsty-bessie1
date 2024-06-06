import React, { useState } from "react";

interface IDDown {
  isOpenInput?: boolean;
  outputValue?: (value: boolean) => void;
  arr: JSX.Element[];
  label: JSX.Element;
}

const DropDownComponent: React.FC<IDDown> = ({
  isOpenInput,
  outputValue,
  arr,
  label,
}) => {
  const [isOpen, setIsOpen] = useState(isOpenInput);

  const onClickHandler = () => {
    setIsOpen(!isOpen);
    if (outputValue) {
      outputValue(!isOpen);
    }
  };

  return (
    <div className="dd-container">
      <div className="dd-main" onClick={onClickHandler}>
        {label}
      </div>
      <div className={`dd-option-container-${isOpen ? "unhide" : "hide"}`}>
        {arr.map((el, index) => (
          <div
            key={index}
            className={`dd-option-${isOpen ? "unhide" : "hide"} sub-component`}
          >
            {el}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DropDownComponent;
