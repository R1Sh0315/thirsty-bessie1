import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Chip from "@mui/material/Chip";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";
import Avatar from "@mui/material/Avatar";

import GitHubIcon from "@mui/icons-material/GitHub";
import LaunchIcon from "@mui/icons-material/Launch";
import DesignServicesIcon from "@mui/icons-material/DesignServices";
import FolderSpecialIcon from "@mui/icons-material/FolderSpecial";
import CodeIcon from "@mui/icons-material/Code";
import UpdateIcon from "@mui/icons-material/Update";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import LabelShadowComponent from "./Label-Shadow";

interface IData {
  [key: string]: any;
}

interface IProject {
  label: string;
  url?: string;
  isDark: boolean;
  data: IData[];
}

interface RepoMeta {
  updated_at: string;
  pushed_at: string;
  stars: number;
  forks: number;
  language: string;
}

const ProjectComponent: React.FC<IProject> = ({ label, isDark, data }) => {
  const [selectedTech, setSelectedTech] = useState<string>("All");
  const [repoMetadata, setRepoMetadata] = useState<Record<string, RepoMeta>>({});

  useEffect(() => {
    fetch("https://api.github.com/users/R1Sh0315/repos?per_page=100")
      .then((res) => (res.ok ? res.json() : []))
      .then((repos) => {
        if (Array.isArray(repos)) {
          const map: Record<string, RepoMeta> = {};
          repos.forEach((repo: any) => {
            if (repo && repo.name) {
              map[repo.name.toLowerCase()] = {
                updated_at: repo.updated_at,
                pushed_at: repo.pushed_at,
                stars: repo.stargazers_count || 0,
                forks: repo.forks_count || 0,
                language: repo.language || "",
              };
            }
          });
          setRepoMetadata(map);
        }
      })
      .catch((err) => console.error("Error fetching project repos:", err));
  }, []);

  const getRepoKeyFromLink = (gitLink?: string, name?: string) => {
    if (gitLink) {
      const parts = gitLink.trim().replace(/\/+$/, "").split("/");
      const lastPart = parts[parts.length - 1];
      if (lastPart) return lastPart.toLowerCase();
    }
    if (name) {
      return name.toLowerCase().replace(/\s+/g, "-");
    }
    return "";
  };

  const formatLastUpdated = (dateStr?: string) => {
    if (!dateStr) return null;
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return null;
    return date.toLocaleDateString("en-US", {
      month: "short",
      year: "numeric",
    });
  };

  const filterOptions = ["All", "React", "JavaScript", "Socket.io", "Figma"];

  const filteredProjects = data.filter((project) => {
    if (selectedTech === "All") return true;
    if (selectedTech === "Figma") return !!project.figma;
    return project.skills?.some(
      (s: string) => s.toLowerCase() === selectedTech.toLowerCase()
    );
  });

  return (
    <Box id="projects" sx={{ py: { xs: 3, md: 5 } }}>
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
            mb: 3,
          }}
        >
          <LabelShadowComponent
            isDark={isDark}
            label={label}
            subtitle="Featured web applications, UI components, and software experiments with live repository sync"
          />

          <Button
            variant="outlined"
            component="a"
            href="https://github.com/R1Sh0315"
            target="_blank"
            rel="noreferrer"
            startIcon={<GitHubIcon />}
            size="small"
            sx={{
              fontWeight: 600,
              borderColor: isDark ? "rgba(255, 255, 255, 0.2)" : "rgba(0, 0, 0, 0.2)",
              color: isDark ? "#f1f5f9" : "#0f172a",
              "&:hover": {
                borderColor: "primary.main",
                bgcolor: isDark ? "rgba(56, 189, 248, 0.08)" : "rgba(2, 132, 199, 0.08)",
              },
            }}
          >
            @R1Sh0315 on GitHub
          </Button>
        </Box>

        {/* Tech Filter Chips */}
        <Stack direction="row" spacing={1} sx={{ mb: 4, flexWrap: "wrap", gap: 1 }}>
          {filterOptions.map((tech) => (
            <Chip
              key={tech}
              label={tech}
              clickable
              onClick={() => setSelectedTech(tech)}
              color={selectedTech === tech ? "primary" : "default"}
              variant={selectedTech === tech ? "filled" : "outlined"}
              sx={{
                fontWeight: 600,
                fontSize: "0.85rem",
                px: 1,
              }}
            />
          ))}
        </Stack>

        {/* Projects Grid */}
        <Grid container spacing={3}>
          {filteredProjects.map((project, index) => {
            const repoKey = getRepoKeyFromLink(project.gitLink, project.name);
            const repoMeta = repoMetadata[repoKey];
            const updatedDate = repoMeta?.pushed_at || repoMeta?.updated_at;
            const formattedDate = formatLastUpdated(updatedDate);

            return (
              <Grid item xs={12} sm={6} lg={4} key={index}>
                <Card
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    bgcolor: isDark ? "rgba(15, 23, 42, 0.5)" : "rgba(241, 245, 249, 0.7)",
                    border: isDark
                      ? "1px solid rgba(255, 255, 255, 0.08)"
                      : "1px solid rgba(0, 0, 0, 0.06)",
                    borderRadius: 3,
                    transition: "transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease",
                    "&:hover": {
                      transform: "translateY(-6px)",
                      borderColor: "primary.main",
                      boxShadow: isDark
                        ? "0 14px 30px -10px rgba(56, 189, 248, 0.25)"
                        : "0 14px 30px -10px rgba(2, 132, 199, 0.2)",
                    },
                  }}
                >
                  <CardContent sx={{ p: 2.5, pb: 1.5 }}>
                    {/* Top Bar: Icon + Last Updated Badge + Quick GitHub Link */}
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                        mb: 2,
                      }}
                    >
                      <Avatar
                        sx={{
                          width: 44,
                          height: 44,
                          bgcolor: isDark ? "rgba(56, 189, 248, 0.15)" : "rgba(2, 132, 199, 0.1)",
                          color: "primary.main",
                        }}
                      >
                        <FolderSpecialIcon fontSize="medium" />
                      </Avatar>

                      <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                        {formattedDate && (
                          <Chip
                            icon={<UpdateIcon sx={{ fontSize: "13px !important" }} />}
                            label={`Updated ${formattedDate}`}
                            size="small"
                            sx={{
                              height: 22,
                              fontSize: "0.72rem",
                              fontWeight: 600,
                              bgcolor: isDark ? "rgba(56, 189, 248, 0.1)" : "rgba(2, 132, 199, 0.08)",
                              color: "primary.main",
                              border: isDark
                                ? "1px solid rgba(56, 189, 248, 0.2)"
                                : "1px solid rgba(2, 132, 199, 0.15)",
                            }}
                          />
                        )}

                        {project.gitLink && (
                          <Tooltip title="View Source Code">
                            <IconButton
                              size="small"
                              component="a"
                              href={project.gitLink}
                              target="_blank"
                              rel="noreferrer"
                              sx={{ color: isDark ? "#94a3b8" : "#64748b" }}
                            >
                              <GitHubIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>
                        )}
                        {project.link && (
                          <Tooltip title="Live Preview">
                            <IconButton
                              size="small"
                              component="a"
                              href={project.link}
                              target="_blank"
                              rel="noreferrer"
                              sx={{ color: "primary.main" }}
                            >
                              <LaunchIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>
                        )}
                      </Box>
                    </Box>

                    {/* Project Title */}
                    <Typography
                      variant="h6"
                      component="h3"
                      sx={{
                        fontWeight: 700,
                        fontSize: "1.15rem",
                        color: isDark ? "#f1f5f9" : "#0f172a",
                        mb: 1,
                      }}
                    >
                      {project.name}
                    </Typography>

                    {/* Project Description */}
                    <Typography
                      variant="body2"
                      sx={{
                        color: isDark ? "#94a3b8" : "#64748b",
                        lineHeight: 1.6,
                        fontSize: "0.9rem",
                        mb: 2.2,
                        minHeight: "48px",
                      }}
                    >
                      {project.description}
                    </Typography>

                    {/* Skill Chips */}
                    <Stack direction="row" spacing={0.8} sx={{ flexWrap: "wrap", gap: 0.8 }}>
                      {project.skills?.map((skill: string, sIdx: number) => (
                        <Chip
                          key={sIdx}
                          label={skill}
                          size="small"
                          sx={{
                            fontWeight: 600,
                            fontSize: "0.75rem",
                            height: 24,
                            bgcolor: isDark ? "rgba(255, 255, 255, 0.06)" : "rgba(0, 0, 0, 0.05)",
                            color: isDark ? "#cbd5e1" : "#475569",
                          }}
                        />
                      ))}
                    </Stack>
                  </CardContent>

                  {/* Card Action Buttons */}
                  <CardActions sx={{ p: 2.5, pt: 1, gap: 1, flexWrap: "wrap" }}>
                    {project.link && (
                      <Button
                        variant="contained"
                        size="small"
                        href={project.link}
                        target="_blank"
                        rel="noreferrer"
                        startIcon={<LaunchIcon sx={{ fontSize: "16px !important" }} />}
                        sx={{
                          fontWeight: 600,
                          fontSize: "0.82rem",
                          boxShadow: "none",
                          "&:hover": {
                            boxShadow: "0 4px 12px 0 rgba(56, 189, 248, 0.3)",
                          },
                        }}
                      >
                        Live Demo
                      </Button>
                    )}

                    {project.gitLink && (
                      <Button
                        variant="outlined"
                        size="small"
                        href={project.gitLink}
                        target="_blank"
                        rel="noreferrer"
                        startIcon={<CodeIcon sx={{ fontSize: "16px !important" }} />}
                        sx={{
                          fontWeight: 600,
                          fontSize: "0.82rem",
                          borderColor: isDark ? "rgba(255, 255, 255, 0.15)" : "rgba(0, 0, 0, 0.15)",
                          color: isDark ? "#cbd5e1" : "#475569",
                          "&:hover": {
                            borderColor: "primary.main",
                            color: "primary.main",
                          },
                        }}
                      >
                        Code
                      </Button>
                    )}

                    {project.figma && (
                      <Button
                        variant="outlined"
                        size="small"
                        href={project.figma}
                        target="_blank"
                        rel="noreferrer"
                        startIcon={<DesignServicesIcon sx={{ fontSize: "16px !important" }} />}
                        sx={{
                          fontWeight: 600,
                          fontSize: "0.82rem",
                          borderColor: isDark ? "rgba(244, 114, 182, 0.3)" : "rgba(219, 39, 119, 0.3)",
                          color: isDark ? "#f472b6" : "#db2777",
                          "&:hover": {
                            borderColor: isDark ? "#f472b6" : "#db2777",
                            bgcolor: isDark ? "rgba(244, 114, 182, 0.1)" : "rgba(219, 39, 119, 0.08)",
                          },
                        }}
                      >
                        Figma
                      </Button>
                    )}
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

export default ProjectComponent;
