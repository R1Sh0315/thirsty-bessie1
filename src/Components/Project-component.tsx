import React, { useState } from "react";
import LabelShadowComponent from "./Label-Shadow";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkIcon from "@mui/icons-material/Link";
import CodeIcon from "@mui/icons-material/Code";

import fig from "../utility/1667px-Figma-logo.svg";
import PillComponent from "./Pill-Component";

interface IData {
  [key: string]: any;
}

interface IProject {
  label: string;
  url?: string;
  isDark: boolean;
  data: IData;
}

const ProjectComponent: React.FC<IProject> = ({ label, url, isDark, data }) => {
  console.log(data);

  const projectCard = data.map((el: any, key: number) => (
    <div className="project-card-container" key={key}>
      <div className="project-header">
        <GitHubIcon
          className={`git-icon ${isDark ? "dark-mode" : "light-mode"}`}
        />
        <div className="project-name-container">{el.name}</div>
      </div>
      <div className="project-body">
        <div className="project-discription">
          {el.description}
          <div className="link-container">
            {el.link ? (
              <a
                href={el.link}
                className={`${isDark ? "dark-mode" : "light-mode"}`}
              >
                <LinkIcon className="git-link" />
              </a>
            ) : (
              ""
            )}
            {el.gitLink ? (
              <a
                href={el.gitLink}
                className={`${isDark ? "dark-mode" : "light-mode"}`}
              >
                <CodeIcon className="source-code" />
              </a>
            ) : (
              ""
            )}
            {el.figma ? (
              <a
                href={el.figma}
                className={`${isDark ? "dark-mode" : "light-mode"}`}
              >
                <div className="figma-icon">Figma</div>
              </a>
            ) : (
              ""
            )}
          </div>
          <div className="skills-pill-container">
            {el?.skills.map((skill: any) => <PillComponent label={skill} />)}
          </div>
        </div>
      </div>
    </div>
  ));

  return (
    <div className="project-contianer">
      <div className="label-container">
        <LabelShadowComponent isDark={isDark} label={label} />
        <div className="git-container">
          GitLink
          <a href="https://github.com/R1Sh0315">
            <div className="git-username">R1Sh0315</div>
          </a>
        </div>
      </div>
      <div className="project-content">{projectCard}</div>
    </div>
  );
};
export default ProjectComponent;
