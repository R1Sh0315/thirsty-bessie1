import { useEffect, useRef, useState } from "react";
import "./styles.css";
import AboutComponent from "./Components/About-Component";
import ButtonComponent from "./Components/Button-Component";
import AboutCardComponent from "./Components/About-card-component";
import CardComponent from "./Components/Card-Components";
import SkillComponent from "./Components/Skill-Component";
// import backPic from "./utility/background.svg";
import ExperienceComponent from "./Components/Experience-Component";
import ContributionsComponent from "./Components/Contributions-component";
import AnimatedHeader from "./Components/Node-Animation-Component";
import ToggleBtnComponent from "./Components/Toggle-btn";
import AchivementdsComponent from "./Components/Achivements-component";

import jsonData from "./Json/my.json";
import ProjectComponent from "./Components/Project-component";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

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
        setLastUpdateDate(data.updated_at);
      });
  }, []);

  const theme = createTheme({
    palette: {
      mode: isDarkMode ? 'dark' : 'light',
      primary: {
        main: '#39a7ff',
      },
      secondary: {
        main: '#f72798',
      },
    },
    typography: {
      fontFamily: '"Fredoka", "Roboto", "Helvetica", "Arial", sans-serif',
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
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
        <ContributionsComponent isDark={isDarkMode} label="Open Source Contributions" />
        <ProjectComponent
          label="My Project"
          isDark={isDarkMode}
          data={jsonData.Projects}
        />
        <AchivementdsComponent
          data={achivementData}
          isDark={isDarkMode}
          label="Licenses & certifications"
        />
        <div className="update-content" style={{ padding: '20px 0', opacity: 0.7 }}>Last updated date: {lastUpdateDate}</div>
      </div>
    </ThemeProvider>
  );
}
