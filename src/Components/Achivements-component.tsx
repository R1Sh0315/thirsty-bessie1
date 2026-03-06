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
    <div className="cer-card" key={el.name}>
      <img className="cer-prev" src={el.icon} alt={el.name} />
      <div className={`car-detail `}>
        <div className="car-info-wrapper">
          <a
            className={`${isDark ? "dark" : "light"}`}
            href={el.url}
            target="_blank"
            rel="noreferrer"
          >
            <div className="car-name">{el.name}</div>
            <div className="car-description">{el?.description}</div>
          </a>
          <div className="car-skill">
            <div className="pill-contient">
              {el?.skills.map((skill: any, idx: number) => (
                <PillComponent key={idx} label={skill} />
              ))}
            </div>
          </div>
        </div>
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
