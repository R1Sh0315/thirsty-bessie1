import React, { useState, useMemo } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Chip from "@mui/material/Chip";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";

import LaunchIcon from "@mui/icons-material/Launch";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import VerifiedIcon from "@mui/icons-material/Verified";

// Vector Icons
import { SiPython, SiJavascript, SiAngular, SiNodedotjs, SiMysql, SiReact, SiHackerrank, SiFreecodecamp, SiTryhackme, SiGo } from "react-icons/si";
import { FaShieldAlt, FaAward, FaCode, FaServer, FaCubes } from "react-icons/fa";

import LabelShadowComponent from "./Label-Shadow";

interface IAchievement {
  name: string;
  url?: string;
  icon?: string;
  skills?: string[];
  description?: string;
}

interface IAchievementProps {
  label: string;
  isDark: boolean;
  data: IAchievement[];
}

const renderVectorIcon = (IconComponent: any, size: number, color: string) => {
  return React.createElement(IconComponent, { size, color });
};

// Group categories with their specific theme colors and icons
const getCategoryMeta = (category: string) => {
  switch (category) {
    case "Python":
      return {
        icon: renderVectorIcon(SiPython, 28, "#3776ab"),
        bg: "rgba(55, 118, 171, 0.12)",
        border: "rgba(55, 118, 171, 0.3)",
      };
    case "JavaScript & React":
      return {
        icon: renderVectorIcon(SiJavascript, 26, "#f7df1e"),
        bg: "rgba(247, 223, 30, 0.12)",
        border: "rgba(247, 223, 30, 0.3)",
      };
    case "Angular":
      return {
        icon: renderVectorIcon(SiAngular, 28, "#dd0031"),
        bg: "rgba(221, 0, 49, 0.12)",
        border: "rgba(221, 0, 49, 0.3)",
      };
    case "Software Engineering & Problem Solving":
      return {
        icon: renderVectorIcon(FaCode, 26, "#38bdf8"),
        bg: "rgba(56, 189, 248, 0.12)",
        border: "rgba(56, 189, 248, 0.3)",
      };
    case "Databases":
      return {
        icon: renderVectorIcon(SiMysql, 30, "#4479a1"),
        bg: "rgba(68, 121, 161, 0.12)",
        border: "rgba(68, 121, 161, 0.3)",
      };
    case "Cyber Security":
      return {
        icon: renderVectorIcon(FaShieldAlt, 24, "#22c55e"),
        bg: "rgba(34, 197, 94, 0.12)",
        border: "rgba(34, 197, 94, 0.3)",
      };
    default:
      return {
        icon: renderVectorIcon(FaAward, 26, "#8b5cf6"),
        bg: "rgba(139, 92, 246, 0.12)",
        border: "rgba(139, 92, 246, 0.3)",
      };
  }
};

const getPlatformBadge = (url: string = "") => {
  if (url.includes("hackerrank")) {
    return { name: "HackerRank", icon: renderVectorIcon(SiHackerrank, 13, "#2ec866"), color: "#2ec866" };
  }
  if (url.includes("freecodecamp")) {
    return { name: "freeCodeCamp", icon: renderVectorIcon(SiFreecodecamp, 13, "#a855f7"), color: "#a855f7" };
  }
  if (url.includes("tryhackme")) {
    return { name: "TryHackMe", icon: renderVectorIcon(SiTryhackme, 13, "#ef4444"), color: "#ef4444" };
  }
  return { name: "Verified", icon: <VerifiedIcon sx={{ fontSize: 13, color: "primary.main" }} />, color: "#38bdf8" };
};

const AchivementdsComponent: React.FC<IAchievementProps> = ({ data = [], isDark, label }) => {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  const groupedData = useMemo(() => {
    const groups: Record<string, IAchievement[]> = {};

    data.forEach((cert) => {
      let category = "Other";
      const nameLower = cert.name.toLowerCase();
      
      if (nameLower.includes("python")) category = "Python";
      else if (nameLower.includes("angular")) category = "Angular";
      else if (nameLower.includes("javascript") || nameLower.includes("react") || nameLower.includes("node")) category = "JavaScript & React";
      else if (nameLower.includes("sql") || nameLower.includes("database")) category = "Databases";
      else if (nameLower.includes("cyber security") || nameLower.includes("cyber")) category = "Cyber Security";
      else if (nameLower.includes("problem solving") || nameLower.includes("software engineer") || nameLower.includes("rest api") || nameLower.includes("go")) category = "Software Engineering & Problem Solving";

      if (!groups[category]) groups[category] = [];
      groups[category].push(cert);
    });

    // Sort categories (you can customize order if you like)
    return Object.entries(groups).sort(([catA], [catB]) => catA.localeCompare(catB));
  }, [data]);

  const toggleExpand = (category: string) => {
    setExpandedCategory(expandedCategory === category ? null : category);
  };

  return (
    <Box id="certifications" sx={{ py: { xs: 3, md: 5 } }}>
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
          subtitle="Verified technical assessments, professional accreditations, and engineering certificates"
        />

        <Stack spacing={2.5}>
          {groupedData.map(([category, certs]) => {
            const isExpanded = expandedCategory === category;
            const meta = getCategoryMeta(category);

            return (
              <Box
                key={category}
                sx={{
                  borderRadius: 3,
                  bgcolor: isDark ? "rgba(15, 23, 42, 0.5)" : "rgba(241, 245, 249, 0.75)",
                  border: isDark
                    ? "1px solid rgba(255, 255, 255, 0.08)"
                    : "1px solid rgba(0, 0, 0, 0.06)",
                  overflow: "hidden",
                  transition: "all 0.25s ease",
                  "&:hover": {
                    borderColor: "primary.main",
                    boxShadow: isDark
                      ? "0 10px 28px -10px rgba(56, 189, 248, 0.2)"
                      : "0 10px 28px -10px rgba(2, 132, 199, 0.15)",
                  },
                }}
              >
                {/* Accordion Header */}
                <Box
                  onClick={() => toggleExpand(category)}
                  sx={{
                    p: { xs: 2, sm: 2.5 },
                    display: "flex",
                    flexDirection: { xs: "column", sm: "row" },
                    justifyContent: "space-between",
                    alignItems: { xs: "flex-start", sm: "center" },
                    gap: 2,
                    cursor: "pointer",
                    "&:hover": {
                      bgcolor: isDark ? "rgba(255, 255, 255, 0.02)" : "rgba(0, 0, 0, 0.02)",
                    },
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <Avatar
                      sx={{
                        width: 50,
                        height: 50,
                        bgcolor: meta.bg,
                        border: `1.5px solid ${meta.border}`,
                        boxShadow: `0 4px 14px 0 ${meta.bg}`,
                      }}
                    >
                      {meta.icon}
                    </Avatar>
                    <Box>
                      <Typography
                        variant="subtitle1"
                        sx={{
                          fontWeight: 700,
                          color: isDark ? "#f8fafc" : "#0f172a",
                          lineHeight: 1.2,
                          fontSize: "1.1rem",
                        }}
                      >
                        {category}
                      </Typography>
                      <Typography
                        variant="caption"
                        sx={{
                          color: isDark ? "#cbd5e1" : "#475569",
                          display: "block",
                          mt: 0.3,
                          fontWeight: 500,
                        }}
                      >
                        {certs.length} {certs.length === 1 ? "Certificate" : "Certificates"}
                      </Typography>
                    </Box>
                  </Box>

                  <IconButton size="small" sx={{ color: isDark ? "#cbd5e1" : "#475569", ml: { xs: 0, sm: "auto" } }}>
                    {isExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                  </IconButton>
                </Box>

                {/* Accordion Body */}
                <Collapse in={isExpanded} timeout="auto" unmountOnExit>
                  <Box
                    sx={{
                      p: { xs: 2, sm: 2.5 },
                      pt: { xs: 0, sm: 0 },
                      borderTop: isDark
                        ? "1px solid rgba(255, 255, 255, 0.05)"
                        : "1px solid rgba(0, 0, 0, 0.04)",
                      bgcolor: isDark ? "rgba(0, 0, 0, 0.2)" : "rgba(0, 0, 0, 0.02)",
                    }}
                  >
                    <Stack spacing={2} sx={{ mt: 2 }}>
                      {certs.map((cert, idx) => {
                        const platform = getPlatformBadge(cert.url);
                        return (
                          <Box
                            key={idx}
                            sx={{
                              p: 2,
                              borderRadius: 2.5,
                              bgcolor: isDark ? "rgba(15, 23, 42, 0.45)" : "rgba(255, 255, 255, 0.9)",
                              border: isDark
                                ? "1px solid rgba(255, 255, 255, 0.06)"
                                : "1px solid rgba(0, 0, 0, 0.05)",
                              display: "flex",
                              flexDirection: "column",
                              gap: 1.5,
                              transition: "all 0.2s ease",
                              "&:hover": {
                                borderColor: "primary.main",
                                transform: "translateX(4px)",
                              },
                            }}
                          >
                            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 1.5 }}>
                              <Typography
                                variant="body1"
                                sx={{
                                  fontWeight: 700,
                                  color: isDark ? "#f1f5f9" : "#0f172a",
                                  lineHeight: 1.4,
                                }}
                              >
                                {cert.name}
                              </Typography>

                              <Chip
                                icon={platform.icon}
                                label={platform.name}
                                size="small"
                                sx={{
                                  height: 24,
                                  fontSize: "0.7rem",
                                  fontWeight: 700,
                                  bgcolor: isDark ? "rgba(255, 255, 255, 0.06)" : "rgba(0, 0, 0, 0.04)",
                                  color: platform.color,
                                  border: isDark
                                    ? "1px solid rgba(255, 255, 255, 0.08)"
                                    : "1px solid rgba(0, 0, 0, 0.06)",
                                }}
                              />
                            </Box>

                            <Typography
                              variant="body2"
                              sx={{
                                color: isDark ? "#94a3b8" : "#64748b",
                                lineHeight: 1.5,
                                fontSize: "0.88rem",
                              }}
                            >
                              {cert.description}
                            </Typography>

                            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 1.5, mt: 0.5 }}>
                              {cert.skills && cert.skills.length > 0 && (
                                <Stack direction="row" spacing={1} sx={{ flexWrap: "wrap", gap: 1 }}>
                                  {cert.skills.map((skill, sIdx) => (
                                    <Chip
                                      key={sIdx}
                                      label={skill}
                                      size="small"
                                      sx={{
                                        height: 22,
                                        fontSize: "0.72rem",
                                        fontWeight: 600,
                                        bgcolor: isDark ? "rgba(255, 255, 255, 0.05)" : "rgba(0, 0, 0, 0.04)",
                                        color: isDark ? "#cbd5e1" : "#475569",
                                      }}
                                    />
                                  ))}
                                </Stack>
                              )}

                              <Button
                                component="a"
                                variant="text"
                                size="small"
                                href={cert.url || "#"}
                                target="_blank"
                                rel="noreferrer"
                                endIcon={<LaunchIcon sx={{ fontSize: "14px !important" }} />}
                                sx={{
                                  fontWeight: 700,
                                  fontSize: "0.8rem",
                                  color: "primary.main",
                                  p: 0,
                                  minWidth: "auto",
                                  "&:hover": {
                                    bgcolor: "transparent",
                                    textDecoration: "underline",
                                  },
                                }}
                              >
                                View Certificate
                              </Button>
                            </Box>
                          </Box>
                        );
                      })}
                    </Stack>
                  </Box>
                </Collapse>
              </Box>
            );
          })}
        </Stack>
      </Card>
    </Box>
  );
};

export default AchivementdsComponent;
