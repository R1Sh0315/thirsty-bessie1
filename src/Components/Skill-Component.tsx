import React, { useState } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import LinearProgress from "@mui/material/LinearProgress";
import Chip from "@mui/material/Chip";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import Tooltip from "@mui/material/Tooltip";

import LaunchIcon from "@mui/icons-material/Launch";
import CodeIcon from "@mui/icons-material/Code";
import StorageIcon from "@mui/icons-material/Storage";
import BuildIcon from "@mui/icons-material/Build";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import LabelShadowComponent from "./Label-Shadow";

import jsonData from "../Json/my.json";

interface SkillComponentProps {
  label: string;
  isDark: boolean;
}

interface SkillItem {
  name: string;
  level: number;
  description: string;
  url: string;
  category: "Frontend" | "Backend" | "Tools";
}

const SkillComponent: React.FC<SkillComponentProps> = ({ label, isDark }) => {
  const JData = jsonData.Discription;

  const calculateExperience = () => {
    const currentDate = new Date();
    const startDate = new Date("2021-04-01");
    const differenceMs = currentDate.getTime() - startDate.getTime();

    const years = Math.floor(differenceMs / (1000 * 60 * 60 * 24 * 365.25));
    const months = Math.floor(
      (differenceMs % (1000 * 60 * 60 * 24 * 365.25)) / (1000 * 60 * 60 * 24 * 30.44)
    );

    return { years, months };
  };

  const { years, months } = calculateExperience();

  const skills: SkillItem[] = [
    {
      name: "React.js",
      level: 85,
      description: JData[5]?.disc || "Declarative component-based UI library with hooks, context, and modern state architecture.",
      url: JData[5]?.url || "https://react.dev",
      category: "Frontend",
    },
    {
      name: "JavaScript (ES6+)",
      level: 80,
      description: JData[0]?.disc || "Modern ECMAScript features, async/await, closures, and functional programming patterns.",
      url: JData[0]?.url || "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
      category: "Frontend",
    },
    {
      name: "HTML5 & CSS3",
      level: 90,
      description: "Semantic web structuring, modern CSS grid, flexbox layouts, animations, and responsive UI design.",
      url: "https://www.w3schools.com/html/",
      category: "Frontend",
    },
    {
      name: "Angular",
      level: 70,
      description: JData[6]?.disc || "Component architecture, dependency injection, RxJS observables, and TypeScript tooling.",
      url: JData[6]?.url || "https://angular.io",
      category: "Frontend",
    },
    {
      name: "Node.js & Express",
      level: 65,
      description: JData[3]?.disc || "Server-side JavaScript runtime for building REST APIs, middleware, and microservices.",
      url: JData[3]?.url || "https://nodejs.org",
      category: "Backend",
    },
    {
      name: "MongoDB",
      level: 60,
      description: JData[4]?.disc || "Document-oriented NoSQL database for flexible data modeling and aggregation pipelines.",
      url: JData[4]?.url || "https://www.mongodb.com",
      category: "Backend",
    },
  ];

  const [selectedSkill, setSelectedSkill] = useState<SkillItem>(skills[0]);
  const [activeCategory, setActiveCategory] = useState<"All" | "Frontend" | "Backend">("All");

  const filteredSkills = activeCategory === "All"
    ? skills
    : skills.filter((s) => s.category === activeCategory);

  return (
    <Box id="skills" sx={{ py: { xs: 3, md: 5 } }}>
      <Card
        sx={{
          p: { xs: 2.5, sm: 3.5, md: 4.5 },
          bgcolor: isDark ? "rgba(30, 41, 59, 0.7)" : "rgba(255, 255, 255, 0.8)",
          backdropFilter: "blur(12px)",
        }}
      >
        <LabelShadowComponent
          isDark={isDark}
          label={label}
          subtitle="Technical skills, proficiency levels, and core engineering toolkit"
        />

        {/* Category Filter Chips */}
        <Stack direction="row" spacing={1} sx={{ mb: 3.5, flexWrap: "wrap", gap: 1 }}>
          {(["All", "Frontend", "Backend"] as const).map((cat) => (
            <Chip
              key={cat}
              label={cat === "All" ? "All Skills" : `${cat} Stack`}
              clickable
              onClick={() => setActiveCategory(cat)}
              color={activeCategory === cat ? "primary" : "default"}
              variant={activeCategory === cat ? "filled" : "outlined"}
              sx={{
                fontWeight: 600,
                fontSize: "0.85rem",
                px: 1,
              }}
            />
          ))}
        </Stack>

        <Grid container spacing={3.5}>
          {/* Left Column: Skills List with Progress Bars */}
          <Grid item xs={12} lg={7}>
            <Typography
              variant="body2"
              sx={{
                color: isDark ? "#94a3b8" : "#64748b",
                mb: 2.5,
                lineHeight: 1.6,
              }}
            >
              Click any skill below to inspect details, stack specifics, and official documentation:
            </Typography>

            <Stack spacing={2}>
              {filteredSkills.map((skill) => {
                const isSelected = selectedSkill.name === skill.name;
                return (
                  <Box
                    key={skill.name}
                    onClick={() => setSelectedSkill(skill)}
                    sx={{
                      p: 2,
                      borderRadius: 2.5,
                      cursor: "pointer",
                      bgcolor: isSelected
                        ? isDark
                          ? "rgba(56, 189, 248, 0.12)"
                          : "rgba(2, 132, 199, 0.08)"
                        : isDark
                          ? "rgba(15, 23, 42, 0.4)"
                          : "rgba(241, 245, 249, 0.6)",
                      border: isSelected
                        ? "1.5px solid"
                        : "1px solid",
                      borderColor: isSelected
                        ? "primary.main"
                        : isDark
                          ? "rgba(255, 255, 255, 0.05)"
                          : "rgba(0, 0, 0, 0.04)",
                      transition: "all 0.2s ease-in-out",
                      "&:hover": {
                        transform: "translateX(4px)",
                        borderColor: "primary.main",
                      },
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        mb: 1,
                      }}
                    >
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <Typography
                          variant="subtitle2"
                          sx={{
                            fontWeight: 700,
                            color: isSelected
                              ? "primary.main"
                              : isDark
                                ? "#f1f5f9"
                                : "#0f172a",
                          }}
                        >
                          {skill.name}
                        </Typography>
                        <Chip
                          label={skill.category}
                          size="small"
                          sx={{
                            height: 20,
                            fontSize: "0.68rem",
                            fontWeight: 600,
                            bgcolor: isDark ? "rgba(255, 255, 255, 0.06)" : "rgba(0, 0, 0, 0.05)",
                          }}
                        />
                      </Box>
                      <Typography
                        variant="caption"
                        sx={{
                          fontWeight: 700,
                          color: "primary.main",
                        }}
                      >
                        {skill.level}%
                      </Typography>
                    </Box>

                    <LinearProgress
                      variant="determinate"
                      value={skill.level}
                      sx={{
                        height: 8,
                        borderRadius: 4,
                        bgcolor: isDark ? "rgba(255, 255, 255, 0.08)" : "rgba(0, 0, 0, 0.08)",
                        "& .MuiLinearProgress-bar": {
                          borderRadius: 4,
                          background:
                            skill.category === "Frontend"
                              ? "linear-gradient(90deg, #38bdf8 0%, #0284c7 100%)"
                              : "linear-gradient(90deg, #f472b6 0%, #db2777 100%)",
                        },
                      }}
                    />
                  </Box>
                );
              })}
            </Stack>
          </Grid>

          {/* Right Column: Experience Metric Card & Selected Skill Inspector */}
          <Grid item xs={12} lg={5}>
            <Stack spacing={3}>
              {/* Experience Stat Card */}
              <Box
                sx={{
                  p: 3,
                  borderRadius: 3,
                  background: isDark
                    ? "linear-gradient(135deg, rgba(56, 189, 248, 0.12) 0%, rgba(168, 85, 247, 0.08) 100%)"
                    : "linear-gradient(135deg, rgba(2, 132, 199, 0.08) 0%, rgba(124, 58, 237, 0.06) 100%)",
                  border: isDark
                    ? "1px solid rgba(56, 189, 248, 0.2)"
                    : "1px solid rgba(2, 132, 199, 0.2)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Box>
                  <Typography
                    variant="caption"
                    sx={{
                      fontWeight: 700,
                      textTransform: "uppercase",
                      letterSpacing: "0.8px",
                      color: "primary.main",
                    }}
                  >
                    Professional Experience
                  </Typography>
                  <Typography
                    variant="h3"
                    component="div"
                    sx={{
                      fontWeight: 800,
                      color: isDark ? "#f1f5f9" : "#0f172a",
                      my: 0.5,
                    }}
                  >
                    {years}
                    <Box component="span" sx={{ color: "primary.main", fontSize: "0.7em" }}>
                      .{months}
                    </Box>{" "}
                    <Typography component="span" variant="h5" sx={{ fontWeight: 600 }}>
                      Years
                    </Typography>
                  </Typography>
                  <Typography variant="body2" sx={{ color: isDark ? "#94a3b8" : "#64748b" }}>
                    Delivering production-grade frontend applications
                  </Typography>
                </Box>

                <Avatar
                  sx={{
                    width: 56,
                    height: 56,
                    bgcolor: "primary.main",
                    boxShadow: "0 8px 20px -4px rgba(56, 189, 248, 0.5)",
                  }}
                >
                  <AutoAwesomeIcon sx={{ color: "#fff", fontSize: 28 }} />
                </Avatar>
              </Box>

              {/* Selected Skill Inspector Card */}
              {selectedSkill && (
                <Box
                  sx={{
                    p: 3,
                    borderRadius: 3,
                    bgcolor: isDark ? "rgba(15, 23, 42, 0.5)" : "rgba(241, 245, 249, 0.7)",
                    border: isDark
                      ? "1px solid rgba(255, 255, 255, 0.08)"
                      : "1px solid rgba(0, 0, 0, 0.06)",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      mb: 1.5,
                    }}
                  >
                    <Typography variant="h6" fontWeight={700} color="primary.main">
                      {selectedSkill.name}
                    </Typography>
                    <Button
                      variant="text"
                      size="small"
                      href={selectedSkill.url}
                      target="_blank"
                      rel="noreferrer"
                      endIcon={<LaunchIcon sx={{ fontSize: "16px !important" }} />}
                      sx={{ fontWeight: 600 }}
                    >
                      Docs
                    </Button>
                  </Box>

                  <Typography
                    variant="body2"
                    sx={{
                      color: isDark ? "#cbd5e1" : "#475569",
                      lineHeight: 1.65,
                      mb: 2,
                    }}
                  >
                    {selectedSkill.description}
                  </Typography>

                  <Divider sx={{ my: 1.5, opacity: 0.5 }} />

                  <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <Typography variant="caption" sx={{ color: isDark ? "#94a3b8" : "#64748b" }}>
                      Category: <strong>{selectedSkill.category}</strong>
                    </Typography>
                    <Typography variant="caption" sx={{ color: "primary.main", fontWeight: 700 }}>
                      Mastery: {selectedSkill.level}%
                    </Typography>
                  </Box>
                </Box>
              )}
            </Stack>
          </Grid>
        </Grid>
      </Card>
    </Box>
  );
};

export default SkillComponent;
