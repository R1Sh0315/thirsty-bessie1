import React, { useEffect, useState } from "react";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";

import "./styles.css";
import { getAppTheme } from "./theme";
import Navbar from "./Components/Navbar";
import AboutComponent from "./Components/About-Component";
import AboutCardComponent from "./Components/About-card-component";
import SkillComponent from "./Components/Skill-Component";
import ExperienceComponent from "./Components/Experience-Component";
import ContributionsComponent from "./Components/Contributions-component";
import ProjectComponent from "./Components/Project-component";
import AchivementdsComponent from "./Components/Achivements-component";
import Footer from "./Components/Footer";
import ScrollToTop from "./Components/ScrollToTop";

import jsonData from "./Json/my.json";

export default function App() {
  // Default to dark mode for modern developer portfolio aesthetics
  const [isDarkMode, setDarkMode] = useState(true);
  const [lastUpdateDate, setLastUpdateDate] = useState("");

  useEffect(() => {
    fetch("https://api.github.com/repos/R1Sh0315/thirsty-bessie1")
      .then((response) => response.json())
      .then((data) => {
        if (data && data.updated_at) {
          setLastUpdateDate(data.updated_at);
        }
      })
      .catch((err) => console.error("Error fetching repo info:", err));
  }, []);

  const theme = getAppTheme(isDarkMode);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className={`App ${isDarkMode ? "dark-mode" : "light-mode"}`}>
        <Navbar isDark={isDarkMode} onToggleTheme={setDarkMode} />

        <Container maxWidth="lg" sx={{ px: { xs: 2, sm: 3, md: 4 }, flexGrow: 1 }}>
          <AboutComponent isDark={isDarkMode} />
          <AboutCardComponent isDark={isDarkMode} />
          <SkillComponent isDark={isDarkMode} label="Technical Skills" />
          <ExperienceComponent
            isDark={isDarkMode}
            label="Experience & Qualification"
          />
          <ContributionsComponent
            isDark={isDarkMode}
            label="Open Source Contributions"
          />
          <ProjectComponent
            label="Featured Projects"
            isDark={isDarkMode}
            data={jsonData.Projects}
          />
          <AchivementdsComponent
            data={jsonData.Achievement}
            isDark={isDarkMode}
            label="Licenses & Certifications"
          />
        </Container>

        <Footer isDark={isDarkMode} lastUpdateDate={lastUpdateDate} />
        <ScrollToTop />
      </div>
    </ThemeProvider>
  );
}
