import React from "react";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";

import SchoolIcon from "@mui/icons-material/SchoolOutlined";
import MailOutlineIcon from "@mui/icons-material/MailOutlineOutlined";
import LocationOnIcon from "@mui/icons-material/LocationOnOutlined";
import WorkHistoryIcon from "@mui/icons-material/WorkHistoryOutlined";
import SendIcon from "@mui/icons-material/Send";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import LabelShadowComponent from "./Label-Shadow";

interface AboutCardComponentProps {
  isDark: boolean;
}

const AboutCardComponent: React.FC<AboutCardComponentProps> = ({ isDark }) => {
  const details = [
    {
      icon: <SchoolIcon sx={{ color: "primary.main" }} />,
      label: "Degree",
      value: "B.E. in Mechanical Engineering",
      subValue: "Transitioned to IT & Full-Stack",
    },
    {
      icon: <MailOutlineIcon sx={{ color: "primary.main" }} />,
      label: "Email",
      value: "rishikeshbhalekar6@gmail.com",
      link: "mailto:rishikeshbhalekar6@gmail.com",
    },
    {
      icon: <LocationOnIcon sx={{ color: "primary.main" }} />,
      label: "Location",
      value: "Pune, Maharashtra, India",
      subValue: "PIN: 410506",
    },
    {
      icon: <WorkHistoryIcon sx={{ color: "primary.main" }} />,
      label: "Focus Areas",
      value: "Frontend & UI/UX Engineering",
      subValue: "React, TypeScript, Material-UI, Next.js",
    },
  ];

  return (
    <Box id="about" sx={{ py: { xs: 3, md: 5 } }}>
      <Card
        sx={{
          p: { xs: 2.5, sm: 3.5, md: 4.5 },
          bgcolor: isDark ? "rgba(30, 41, 59, 0.7)" : "rgba(255, 255, 255, 0.8)",
          backdropFilter: "blur(12px)",
          border: isDark
            ? "1px solid rgba(255, 255, 255, 0.08)"
            : "1px solid rgba(0, 0, 0, 0.06)",
        }}
      >
        <Box sx={{ mb: 3 }}>
          <LabelShadowComponent isDark={isDark} label="About Me" />
        </Box>

        <Typography
          variant="h5"
          component="h2"
          sx={{
            fontWeight: 700,
            fontSize: { xs: "1.25rem", sm: "1.5rem", md: "1.75rem" },
            mb: 2,
            color: isDark ? "#f1f5f9" : "#0f172a",
          }}
        >
          Building scalable, intuitive digital experiences
        </Typography>

        {/* Motivational Note Card */}
        <Box
          sx={{
            p: { xs: 2, sm: 2.5 },
            mb: 4,
            borderRadius: 3,
            bgcolor: isDark ? "rgba(56, 189, 248, 0.06)" : "rgba(2, 132, 199, 0.04)",
            borderLeft: "4px solid",
            borderColor: "primary.main",
          }}
        >
          <Typography
            variant="body1"
            sx={{
              fontStyle: "italic",
              fontSize: { xs: "0.95rem", sm: "1.05rem" },
              lineHeight: 1.6,
              color: isDark ? "#cbd5e1" : "#334155",
            }}
          >
            “I'm a dedicated web engineer committed to crafting clean, high-performance web designs and user experiences with cutting-edge technologies and best design practices.”
          </Typography>
        </Box>

        {/* Info Grid */}
        <Grid container spacing={2.5} sx={{ mb: 3 }}>
          {details.map((item, index) => (
            <Grid item xs={12} sm={6} key={index}>
              <Box
                sx={{
                  p: 2,
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                  borderRadius: 2.5,
                  bgcolor: isDark ? "rgba(15, 23, 42, 0.4)" : "rgba(241, 245, 249, 0.6)",
                  border: isDark
                    ? "1px solid rgba(255, 255, 255, 0.05)"
                    : "1px solid rgba(0, 0, 0, 0.04)",
                  transition: "transform 0.2s ease, border-color 0.2s ease",
                  "&:hover": {
                    transform: "translateY(-2px)",
                    borderColor: isDark ? "rgba(56, 189, 248, 0.3)" : "rgba(2, 132, 199, 0.3)",
                  },
                }}
              >
                <Avatar
                  sx={{
                    bgcolor: isDark ? "rgba(56, 189, 248, 0.12)" : "rgba(2, 132, 199, 0.1)",
                    width: 48,
                    height: 48,
                  }}
                >
                  {item.icon}
                </Avatar>
                <Box sx={{ overflow: "hidden" }}>
                  <Typography
                    variant="caption"
                    sx={{
                      fontWeight: 700,
                      textTransform: "uppercase",
                      letterSpacing: "0.5px",
                      color: "primary.main",
                      display: "block",
                      mb: 0.25,
                    }}
                  >
                    {item.label}
                  </Typography>
                  {item.link ? (
                    <Typography
                      component="a"
                      href={item.link}
                      variant="body2"
                      sx={{
                        fontWeight: 600,
                        color: isDark ? "#e2e8f0" : "#1e293b",
                        textDecoration: "none",
                        "&:hover": { color: "primary.main" },
                        wordBreak: "break-all",
                      }}
                    >
                      {item.value}
                    </Typography>
                  ) : (
                    <Typography
                      variant="body2"
                      sx={{
                        fontWeight: 600,
                        color: isDark ? "#e2e8f0" : "#1e293b",
                      }}
                    >
                      {item.value}
                    </Typography>
                  )}
                  {item.subValue && (
                    <Typography
                      variant="caption"
                      sx={{
                        color: isDark ? "#94a3b8" : "#64748b",
                        display: "block",
                        mt: 0.2,
                      }}
                    >
                      {item.subValue}
                    </Typography>
                  )}
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>

        <Divider sx={{ my: 3, opacity: 0.6 }} />

        {/* Action CTAs */}
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
          <Button
            variant="contained"
            color="primary"
            component="a"
            href="mailto:rishikeshbhalekar6@gmail.com"
            startIcon={<SendIcon />}
            size="large"
            sx={{
              py: 1.2,
              px: 3.5,
              fontWeight: 600,
              boxShadow: "0 8px 24px -4px rgba(56, 189, 248, 0.4)",
              "&:hover": {
                boxShadow: "0 12px 28px -4px rgba(56, 189, 248, 0.5)",
              },
            }}
          >
            Get In Touch
          </Button>

          <Button
            variant="outlined"
            component="a"
            href="https://www.linkedin.com/in/rishikesh-bhalekar-198041196/"
            target="_blank"
            rel="noreferrer"
            startIcon={<LinkedInIcon />}
            size="large"
            sx={{
              py: 1.2,
              px: 3,
              fontWeight: 600,
              borderColor: isDark ? "rgba(10, 102, 194, 0.4)" : "rgba(10, 102, 194, 0.3)",
              color: isDark ? "#60a5fa" : "#0a66c2",
              "&:hover": {
                borderColor: "#0a66c2",
                bgcolor: isDark ? "rgba(10, 102, 194, 0.1)" : "rgba(10, 102, 194, 0.08)",
              },
            }}
          >
            LinkedIn
          </Button>

          <Button
            variant="outlined"
            component="a"
            href="https://github.com/R1Sh0315"
            target="_blank"
            rel="noreferrer"
            startIcon={<GitHubIcon />}
            size="large"
            sx={{
              py: 1.2,
              px: 3,
              fontWeight: 600,
              borderColor: isDark ? "rgba(255, 255, 255, 0.2)" : "rgba(0, 0, 0, 0.2)",
              color: isDark ? "#f1f5f9" : "#0f172a",
              "&:hover": {
                borderColor: "primary.main",
                bgcolor: isDark ? "rgba(56, 189, 248, 0.08)" : "rgba(2, 132, 199, 0.08)",
              },
            }}
          >
            GitHub
          </Button>
        </Box>
      </Card>
    </Box>
  );
};

export default AboutCardComponent;
