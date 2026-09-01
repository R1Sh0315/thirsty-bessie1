import React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Chip from "@mui/material/Chip";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";

import LaunchIcon from "@mui/icons-material/Launch";
import VerifiedIcon from "@mui/icons-material/Verified";

// React Icons for exact brand/technology SVG vectors
import {
  SiPython,
  SiJavascript,
  SiReact,
  SiAngular,
  SiNodedotjs,
  SiMysql,
  SiTryhackme,
  SiHackerrank,
  SiFreecodecamp,
} from "react-icons/si";
import { FaDatabase, FaShieldAlt, FaAward } from "react-icons/fa";

import LabelShadowComponent from "./Label-Shadow";

interface IData {
  [key: string]: any;
}

interface IAchievementProps {
  data?: IData[];
  label: string;
  isDark: boolean;
}

const renderVectorIcon = (IconComponent: any, size: number, color: string) => {
  return React.createElement(IconComponent, { size, color });
};

const getCertIconData = (name: string, skills: string[] = []) => {
  const lowerName = name.toLowerCase();
  const lowerSkills = skills.map((s) => s.toLowerCase());

  if (lowerName.includes("react") || lowerSkills.includes("reactjs") || lowerSkills.includes("react")) {
    return {
      icon: renderVectorIcon(SiReact, 26, "#61dafb"),
      bg: "rgba(97, 218, 251, 0.12)",
      border: "rgba(97, 218, 251, 0.3)",
      glow: "rgba(97, 218, 251, 0.4)",
    };
  }

  if (lowerName.includes("python") || lowerSkills.includes("python")) {
    return {
      icon: renderVectorIcon(SiPython, 26, "#38bdf8"),
      bg: "rgba(56, 189, 248, 0.12)",
      border: "rgba(56, 189, 248, 0.3)",
      glow: "rgba(56, 189, 248, 0.4)",
    };
  }

  if (lowerName.includes("cyber security") || lowerSkills.includes("cyber security")) {
    return {
      icon: renderVectorIcon(FaShieldAlt, 24, "#10b981"),
      bg: "rgba(16, 185, 129, 0.12)",
      border: "rgba(16, 185, 129, 0.3)",
      glow: "rgba(16, 185, 129, 0.4)",
    };
  }

  if (lowerName.includes("sql") || lowerSkills.includes("sql")) {
    return {
      icon: renderVectorIcon(SiMysql, 28, "#0284c7"),
      bg: "rgba(2, 132, 199, 0.12)",
      border: "rgba(2, 132, 199, 0.3)",
      glow: "rgba(2, 132, 199, 0.4)",
    };
  }

  if (lowerName.includes("angular") || lowerSkills.includes("angular")) {
    return {
      icon: renderVectorIcon(SiAngular, 26, "#dd0031"),
      bg: "rgba(221, 0, 49, 0.12)",
      border: "rgba(221, 0, 49, 0.3)",
      glow: "rgba(221, 0, 49, 0.4)",
    };
  }

  if (lowerName.includes("node") || lowerSkills.includes("nodejs")) {
    return {
      icon: renderVectorIcon(SiNodedotjs, 26, "#22c55e"),
      bg: "rgba(34, 197, 94, 0.12)",
      border: "rgba(34, 197, 94, 0.3)",
      glow: "rgba(34, 197, 94, 0.4)",
    };
  }

  if (lowerName.includes("javascript") || lowerSkills.includes("javascript")) {
    return {
      icon: renderVectorIcon(SiJavascript, 24, "#f7df1e"),
      bg: "rgba(247, 223, 30, 0.12)",
      border: "rgba(247, 223, 30, 0.3)",
      glow: "rgba(247, 223, 30, 0.4)",
    };
  }

  return {
    icon: renderVectorIcon(FaAward, 24, "#38bdf8"),
    bg: "rgba(56, 189, 248, 0.12)",
    border: "rgba(56, 189, 248, 0.3)",
    glow: "rgba(56, 189, 248, 0.4)",
  };
};

const getPlatformBadge = (url: string = "") => {
  if (url.includes("hackerrank")) {
    return {
      name: "HackerRank",
      icon: renderVectorIcon(SiHackerrank, 13, "#2ec866"),
      color: "#2ec866",
    };
  }
  if (url.includes("freecodecamp")) {
    return {
      name: "freeCodeCamp",
      icon: renderVectorIcon(SiFreecodecamp, 13, "#a855f7"),
      color: "#a855f7",
    };
  }
  if (url.includes("tryhackme")) {
    return {
      name: "TryHackMe",
      icon: renderVectorIcon(SiTryhackme, 13, "#ef4444"),
      color: "#ef4444",
    };
  }
  return {
    name: "Verified",
    icon: <VerifiedIcon sx={{ fontSize: 13, color: "primary.main" }} />,
    color: "#38bdf8",
  };
};

const AchivementdsComponent: React.FC<IAchievementProps> = ({ data = [], isDark, label }) => {
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

        <Grid container spacing={3}>
          {data.map((cert, index) => {
            const iconData = getCertIconData(cert.name, cert.skills);
            const platform = getPlatformBadge(cert.url);

            return (
              <Grid item xs={12} sm={6} lg={4} key={cert.name || index}>
                <Card
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    bgcolor: isDark ? "rgba(15, 23, 42, 0.55)" : "rgba(241, 245, 249, 0.75)",
                    border: isDark
                      ? "1px solid rgba(255, 255, 255, 0.08)"
                      : "1px solid rgba(0, 0, 0, 0.06)",
                    borderRadius: 3,
                    backdropFilter: "blur(8px)",
                    transition: "transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease",
                    "&:hover": {
                      transform: "translateY(-6px)",
                      borderColor: "primary.main",
                      boxShadow: isDark
                        ? `0 14px 30px -8px ${iconData.glow}`
                        : "0 14px 30px -8px rgba(2, 132, 199, 0.2)",
                    },
                  }}
                >
                  <CardContent sx={{ p: 2.5, pb: 1.5 }}>
                    {/* Top Header: Vector Icon Avatar + Platform Badge */}
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        mb: 2.2,
                      }}
                    >
                      <Avatar
                        sx={{
                          width: 50,
                          height: 50,
                          bgcolor: iconData.bg,
                          border: `1.5px solid ${iconData.border}`,
                          boxShadow: `0 4px 14px 0 ${iconData.bg}`,
                        }}
                      >
                        {iconData.icon}
                      </Avatar>

                      <Chip
                        icon={platform.icon}
                        label={platform.name}
                        size="small"
                        sx={{
                          height: 24,
                          fontSize: "0.74rem",
                          fontWeight: 700,
                          bgcolor: isDark ? "rgba(255, 255, 255, 0.06)" : "rgba(0, 0, 0, 0.04)",
                          color: platform.color,
                          border: isDark
                            ? "1px solid rgba(255, 255, 255, 0.08)"
                            : "1px solid rgba(0, 0, 0, 0.06)",
                        }}
                      />
                    </Box>

                    {/* Certificate Title */}
                    <Typography
                      variant="h6"
                      component="h3"
                      sx={{
                        fontWeight: 700,
                        fontSize: "1.08rem",
                        color: isDark ? "#f8fafc" : "#0f172a",
                        lineHeight: 1.35,
                        mb: 1.2,
                      }}
                    >
                      {cert.name}
                    </Typography>

                    {/* Description */}
                    <Typography
                      variant="body2"
                      sx={{
                        color: isDark ? "#94a3b8" : "#64748b",
                        lineHeight: 1.6,
                        fontSize: "0.86rem",
                        mb: 2.2,
                        minHeight: "42px",
                      }}
                    >
                      {cert.description}
                    </Typography>

                    {/* Skill Tags */}
                    {cert.skills && (
                      <Stack direction="row" spacing={0.8} sx={{ flexWrap: "wrap", gap: 0.8 }}>
                        {cert.skills.map((skill: string, idx: number) => (
                          <Chip
                            key={idx}
                            label={skill}
                            size="small"
                            sx={{
                              height: 22,
                              fontSize: "0.72rem",
                              fontWeight: 600,
                              bgcolor: isDark ? "rgba(255, 255, 255, 0.06)" : "rgba(0, 0, 0, 0.05)",
                              color: isDark ? "#cbd5e1" : "#475569",
                            }}
                          />
                        ))}
                      </Stack>
                    )}
                  </CardContent>

                  {/* Footer Action: Verify Direct Link */}
                  <CardActions sx={{ p: 2.5, pt: 0.5 }}>
                    <Button
                      variant="text"
                      size="small"
                      href={cert.url}
                      target="_blank"
                      rel="noreferrer"
                      endIcon={<LaunchIcon sx={{ fontSize: "16px !important" }} />}
                      sx={{
                        fontWeight: 700,
                        fontSize: "0.85rem",
                        color: "primary.main",
                        p: 0,
                        "&:hover": {
                          bgcolor: "transparent",
                          textDecoration: "underline",
                        },
                      }}
                    >
                      Verify Credential
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </Card>
    </Box>
  );
};

export default AchivementdsComponent;
