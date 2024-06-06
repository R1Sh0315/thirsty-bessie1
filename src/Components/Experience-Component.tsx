import React, { useState } from "react";
import LabelShadowComponent from "./Label-Shadow";
import ButtonGroupComponent from "./Buttongroup-Component";
import TimeLineComponent from "./Timeline-component";

import jsonData from "../Json/my.json";

interface IExp {
  label: string;
  isDark: boolean;
}

const bgList = ["Experience", "Qualification"];

const ExperienceComponent: React.FC<IExp> = ({ label, isDark }) => {
  const qualificationData = jsonData.Qualification;
  const experienceData = jsonData.Experience;

  const [btnGrpValue, setBtnGrpValue] = useState<number>(0);

  const selectedValue = (value: number) => {
    setBtnGrpValue(value);
  };

  const experience = (
    <div className="exp-body">
      <TimeLineComponent
        timelineType={"vertical"}
        cell2Type={"initial"}
        data={experienceData}
      />
    </div>
  );

  const qualification = (
    <div className="exp-body">
      <TimeLineComponent
        timelineType={"vertical"}
        cell2Type={"initial"}
        data={qualificationData}
      />
    </div>
  );

  return (
    <div className="exp-contianer">
      <LabelShadowComponent isDark={isDark} label={label} />
      <div className="exp-content">
        <ButtonGroupComponent isDark={isDark} bgList={bgList} outputValue={selectedValue} />
      </div>
      <div className="exp-body-container">
        {bgList[btnGrpValue] === "Qualification" ? qualification : experience}
      </div>
    </div>
  );
};

export default ExperienceComponent;
