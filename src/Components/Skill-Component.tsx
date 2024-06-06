import React, { useEffect, useRef, useState } from "react";
import CardComponent from "./Card-Components";
import LabelShadowComponent from "./Label-Shadow";
import ProgressBarComponent from "./Progress-Component";
import DropDownComponent from "./Dropdown-Component";
import DProgressbarComponent from "./DProgressbar-component";

import LinkIcon from "@mui/icons-material/Link";

import jsonData from "../Json/my.json";

interface ILabel {
  label: string;
  isDark: boolean;
}

const SkillComponent: React.FC<ILabel> = ({ label, isDark }) => {
  const [subTitle, setSubTitle] = useState("");
  const [subDetail, setDetail] = useState({ label: "", dic: "", url: "" });

  const JData = jsonData.Discription;

  const calculateYearsAndMonths = () => {
    const currentDate: Date = new Date();

    // Set the start date to April 2021
    const startDate: Date = new Date("2021-04-01");

    // Calculate the difference in milliseconds
    const differenceMs: number = currentDate.getTime() - startDate.getTime();

    // Convert the difference to years and months
    const years: number = Math.floor(
      differenceMs / (1000 * 60 * 60 * 24 * 365.25),
    );
    const months: number = Math.floor(
      (differenceMs % (1000 * 60 * 60 * 24 * 365.25)) /
        (1000 * 60 * 60 * 24 * 30.44),
    );

    return { years, months };
  };
  const { years, months } = calculateYearsAndMonths();

  const arrFEData = [
    <DProgressbarComponent
      label="HTML"
      number={75}
      outputValue={(e) => {
        setSubTitle(e);
        setDetail({
          label: JData[1].label,
          dic: JData[1].disc,
          url: JData[1].url,
        });
      }}
    />,
    <DProgressbarComponent
      label="CSS"
      number={75}
      outputValue={(e) => {
        setSubTitle(e);
        setDetail({
          label: JData[2].label,
          dic: JData[2].disc,
          url: JData[2].url,
        });
      }}
    />,
    <DProgressbarComponent
      label="JS"
      number={70}
      outputValue={(e) => {
        setSubTitle(e);
        setDetail({
          label: JData[0].label,
          dic: JData[0].disc,
          url: JData[0].url,
        });
      }}
    />,
    <DProgressbarComponent
      label="ReactJs"
      number={65}
      outputValue={(e) => {
        setSubTitle(e);
        setDetail({
          label: JData[5].label,
          dic: JData[5].disc,
          url: JData[5].url,
        });
      }}
    />,
    <DProgressbarComponent
      label="Angular"
      number={75}
      outputValue={(e) => {
        setSubTitle(e);
        setDetail({
          label: JData[6].label,
          dic: JData[6].disc,
          url: JData[6].url,
        });
      }}
    />,
  ];

  const arrBEData = [
    <DProgressbarComponent
      label="nodejs"
      number={50}
      outputValue={(e) => {
        setSubTitle(e);
        setDetail({
          label: JData[3].label,
          dic: JData[3].disc,
          url: JData[3].url,
        });
      }}
    />,
    <DProgressbarComponent
      label="mongodb"
      number={25}
      outputValue={(e) => {
        setSubTitle(e);
        setDetail({
          label: JData[4].label,
          dic: JData[4].disc,
          url: JData[4].url,
        });
      }}
    />,
  ];

  const frontEndPbar = (
    <ProgressBarComponent percentage="72" pbLabel="Frontend" />
  );

  const backEndPbar = (
    <ProgressBarComponent percentage="37.5" pbLabel="Backend" />
  );

  return (
    <div className="skill-container">
      <LabelShadowComponent isDark={isDark} label={label} />
      <div className="skill-description">
        <div className="skill-disc-panel">
          <div className="skill-summary">
            I'm experienced frontend developer proficient with {years}.
            {months + " "}
            years of experience. Skilled in building responsive and dynamic web
            applications, implementing complex UI features, and optimizing
            performance. Strong understanding of modern web development
            practices, including component-based architecture, state management,
            and RESTful APIs. Passionate about delivering high-quality user
            experiences and staying updated with the latest technologies.
          </div>
          <div className="skill-score"></div>
          <div className="DD-cont">
            <DropDownComponent arr={arrFEData} label={frontEndPbar} />
            <DropDownComponent arr={arrBEData} label={backEndPbar} />
          </div>
        </div>
        <div className="experience-container">
          <div>
            <span className="yexp">{years}</span>
            <span className="dot">.</span>
            <span className="mexp">{months + " "}</span>
          </div>
          <div>
            <span className="skill-ye">Years experience</span>
          </div>
          {subTitle == "" ? (
            ""
          ) : (
            <div className="sub-in-detail">
              <div className="Exp-sub-card-title">
                {subDetail.label}{" "}
                <a href={subDetail.url} target="_blank">
                  <LinkIcon />
                </a>
              </div>
              <div className="Exp-sub-card-disc">{subDetail.dic}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SkillComponent;
