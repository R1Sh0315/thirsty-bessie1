import React, { useState } from "react";
import LabelShadowComponent from "./Label-Shadow";
import PillComponent from "./Pill-Component";

interface IData {
  [key: string]: any;
}

interface IPill {
  data?: IData;
  label: string;
  isDark: boolean;
}

const AchivementdsComponent: React.FC<IPill> = ({ data, isDark, label }) => {
  const certElement = data?.map((el: any) => (
    <div className="cer-card">
      <img className="cer-prev" src={el.icon} />
      <div className={`car-detail `}>
        <a className={`${isDark ? "dark" : "light"}`} href={el.url}>
          <div className="car-name">{el.name}</div>
          <div className="car-skill">
            <div className="car-description">{el?.description}</div>
            <div className="pill-contient">
              {el?.skills.map((skill: any) => (
                <PillComponent label={skill} />
              ))}
            </div>
          </div>
        </a>
      </div>
    </div>
  ));

  return (
    <div className="achi-contianer">
      <LabelShadowComponent isDark={isDark} label={label} />
      <div className="achi-content">{certElement}</div>
    </div>
  );
};
export default AchivementdsComponent;
