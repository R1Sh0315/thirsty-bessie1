import { useEffect, useRef, useState } from "react";
import "./styles.css";
import AboutComponent from "./Components/About-Component";
import ButtonComponent from "./Components/Button-Component";
import AboutCardComponent from "./Components/About-card-component";
import CardComponent from "./Components/Card-Components";
import SkillComponent from "./Components/Skill-Component";
// import backPic from "./utility/background.svg";
import ExperienceComponent from "./Components/Experience-Component";
import AnimatedHeader from "./Components/Node-Animation-Component";
import ToggleBtnComponent from "./Components/Toggle-btn";
import AchivementdsComponent from "./Components/Achivements-component";

import jsonData from "./Json/my.json";
import ProjectComponent from "./Components/Project-component";

export default function App() {
  const handleClick = (action: string): string => {
    console.log(action);
    return `${action}`;
  };
  const navList = ["About", "Skills", "Experience", "Project", "Resume"];
  const [isDarkMode, setDarkMode] = useState(false);
  const [lastUpdateDate, setLastUpdateDate] = useState("");
  const achivementData = jsonData.Achievement;

  useEffect(() => {
    fetch("https://api.github.com/repos/R1Sh0315/thirsty-bessie1")
      .then((response) => response.json())
      .then((data) => {
        console.log("Last updated date:", data.updated_at);
        setLastUpdateDate(data.updated_at);
      });
  }, []);

  return (
    <div className={`App ${isDarkMode ? "dark-mode" : "light-mode"}`}>
      <ToggleBtnComponent
        label="Dark Mode"
        toToggle={isDarkMode}
        isDark={setDarkMode}
      />
      <AboutComponent />
      <AboutCardComponent isDark={isDarkMode} />
      <SkillComponent isDark={isDarkMode} label="Skills" />{" "}
      <ExperienceComponent
        isDark={isDarkMode}
        label="Experience & Qualification"
      />
      <ProjectComponent
        label="My Project"
        isDark={isDarkMode}
        data={jsonData.Pojects}
      />
      <AchivementdsComponent
        data={achivementData}
        isDark={isDarkMode}
        label="Licenses & certifications"
      />
      <div className="update-content">Last updated date: {lastUpdateDate}</div>
    </div>
  );
}
