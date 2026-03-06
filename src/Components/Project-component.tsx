import React, { useState } from "react";
import LabelShadowComponent from "./Label-Shadow";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkIcon from "@mui/icons-material/Link";
import CodeIcon from "@mui/icons-material/Code";
import IconButton from "@mui/material/IconButton";
import DesignServicesIcon from "@mui/icons-material/DesignServices";

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

  const projectCard = data.map((el: any, key: number) => (
    <div className="project-card-container" key={key}>
      <div className="project-header">
        <div className="card-footer">
          <a href={el.gitLink || "#"} target="_blank" rel="noreferrer" className="github-link">
            <GitHubIcon />
          </a>
        </div>
        <div className="project-name-container"><strong style={{ color: '#242424' }}>
          {el.name}
        </strong>
        </div>
      </div>
      <div className="project-body">
        <div className="project-discription">
          {el.description}
          <div className="link-container" style={{ display: 'flex', gap: '8px', marginTop: '12px', marginBottom: '12px' }}>
            {el.link ? (
              <IconButton
                component="a"
                href={el.link}
                target="_blank"
                rel="noreferrer"
                title="Live Link"
                sx={{ backgroundColor: isDark ? '#1e293b' : '#f1f5f9', color: isDark ? '#e2e8f0' : '#1e293b', borderRadius: '8px', '&:hover': { backgroundColor: isDark ? '#334155' : '#e2e8f0' } }}
              >
                <LinkIcon className="git-link" />
              </IconButton>
            ) : null}
            {el.gitLink ? (
              <IconButton
                component="a"
                href={el.gitLink}
                target="_blank"
                rel="noreferrer"
                title="Source Code"
                sx={{ backgroundColor: isDark ? '#1e293b' : '#f1f5f9', color: isDark ? '#e2e8f0' : '#1e293b', borderRadius: '8px', '&:hover': { backgroundColor: isDark ? '#334155' : '#e2e8f0' } }}
              >
                <GitHubIcon className="source-code" />
              </IconButton>
            ) : null}
            {el.figma ? (
              <IconButton
                component="a"
                href={el.figma}
                target="_blank"
                rel="noreferrer"
                title="Figma Design"
                sx={{ backgroundColor: isDark ? '#1e293b' : '#f1f5f9', color: isDark ? '#e2e8f0' : '#1e293b', borderRadius: '8px', '&:hover': { backgroundColor: isDark ? '#334155' : '#e2e8f0' } }}
              >
                <DesignServicesIcon className="figma-icon" />
              </IconButton>
            ) : null}
          </div>
          <div className="skills-pill-container">
            {el?.skills.map((skill: any, idx: number) => (
              <PillComponent key={idx} label={skill} />
            ))}
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
