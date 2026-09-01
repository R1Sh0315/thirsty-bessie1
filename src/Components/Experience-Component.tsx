import React, { useState } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import SchoolIcon from "@mui/icons-material/SchoolOutlined";

import LabelShadowComponent from "./Label-Shadow";
import TimeLineComponent from "./Timeline-component";
import jsonData from "../Json/my.json";

interface ExperienceComponentProps {
  label: string;
  isDark: boolean;
}

const ExperienceComponent: React.FC<ExperienceComponentProps> = ({ label, isDark }) => {
  const [activeTab, setActiveTab] = useState<string>("Experience");

  const qualificationData = jsonData.Qualification;
  const experienceData = jsonData.Experience;

  const handleTabChange = (
    event: React.MouseEvent<HTMLElement>,
    newTab: string | null
  ) => {
    if (newTab !== null) {
      setActiveTab(newTab);
    }
  };

  return (
    <Box id="experience" sx={{ py: { xs: 3, md: 5 } }}>
      <Card
        sx={{
          p: { xs: 2.5, sm: 3.5, md: 4.5 },
          bgcolor: isDark ? "rgba(30, 41, 59, 0.7)" : "rgba(255, 255, 255, 0.8)",
          backdropFilter: "blur(12px)",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            justifyContent: "space-between",
            alignItems: { xs: "flex-start", sm: "center" },
            gap: 2,
            mb: 4,
          }}
        >
          <LabelShadowComponent
            isDark={isDark}
            label={label}
            subtitle="Career path, professional work history, and academic qualifications"
          />

          {/* Segmented Toggle for Experience vs Education */}
          <ToggleButtonGroup
            value={activeTab}
            exclusive
            onChange={handleTabChange}
            aria-label="experience or qualification"
            size="small"
            sx={{
              bgcolor: isDark ? "rgba(15, 23, 42, 0.6)" : "rgba(241, 245, 249, 0.9)",
              p: 0.5,
              borderRadius: 3,
              "& .MuiToggleButton-root": {
                border: "none",
                borderRadius: "10px !important",
                px: { xs: 1.5, sm: 2.5 },
                py: 0.8,
                fontWeight: 600,
                fontSize: { xs: "0.82rem", sm: "0.9rem" },
                color: isDark ? "#94a3b8" : "#64748b",
                "&.Mui-selected": {
                  bgcolor: "primary.main",
                  color: "#ffffff",
                  boxShadow: "0 4px 12px 0 rgba(56, 189, 248, 0.35)",
                  "&:hover": {
                    bgcolor: "primary.dark",
                  },
                },
              },
            }}
          >
            <ToggleButton value="Experience" aria-label="experience">
              <WorkOutlineIcon sx={{ mr: 1, fontSize: 18 }} />
              Experience
            </ToggleButton>
            <ToggleButton value="Qualification" aria-label="qualification">
              <SchoolIcon sx={{ mr: 1, fontSize: 18 }} />
              Education
            </ToggleButton>
          </ToggleButtonGroup>
        </Box>

        {/* Timeline Content */}
        <Box sx={{ mt: 2 }}>
          {activeTab === "Experience" ? (
            <TimeLineComponent data={experienceData} isDark={isDark} />
          ) : (
            <TimeLineComponent data={qualificationData} isDark={isDark} />
          )}
        </Box>
      </Card>
    </Box>
  );
};

export default ExperienceComponent;
