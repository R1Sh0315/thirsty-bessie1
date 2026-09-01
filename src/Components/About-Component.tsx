import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";

import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import EmailIcon from "@mui/icons-material/Email";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import CodeIcon from "@mui/icons-material/Code";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";

interface AboutComponentProps {
  isDark?: boolean;
}

const roles = [
  "Senior Software Engineer",
  "Frontend Developer",
  "React Specialist",
  "UI/UX Enthusiast",
];

const AboutComponent: React.FC<AboutComponentProps> = ({ isDark }) => {
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentRole = roles[currentRoleIndex];
    const typingSpeed = isDeleting ? 40 : 80;

    const timer = setTimeout(() => {
      if (!isDeleting) {
        if (displayedText.length < currentRole.length) {
          setDisplayedText(currentRole.slice(0, displayedText.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        if (displayedText.length > 0) {
          setDisplayedText(currentRole.slice(0, displayedText.length - 1));
        } else {
          setIsDeleting(false);
          setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [displayedText, isDeleting, currentRoleIndex]);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const offset = 80;
      const pos = el.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({ top: pos, behavior: "smooth" });
    }
  };

  return (
    <Box
      id="hero"
      sx={{
        py: { xs: 4, sm: 6, md: 8 },
        px: { xs: 2, sm: 3 },
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {/* Availability Status Badge */}
      <Chip
        icon={
          <FiberManualRecordIcon
            sx={{
              fontSize: "12px !important",
              color: "#22c55e !important",
              animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
              "@keyframes pulse": {
                "0%, 100%": { opacity: 1 },
                "50%": { opacity: 0.4 },
              },
            }}
          />
        }
        label="Available for full-time & freelance projects"
        size="small"
        sx={{
          mb: 3,
          px: 1,
          py: 0.5,
          fontWeight: 600,
          fontSize: { xs: "0.75rem", sm: "0.82rem" },
          bgcolor: isDark ? "rgba(34, 197, 94, 0.12)" : "rgba(34, 197, 94, 0.1)",
          color: isDark ? "#4ade80" : "#16a34a",
          border: isDark ? "1px solid rgba(34, 197, 94, 0.3)" : "1px solid rgba(34, 197, 94, 0.2)",
        }}
      />

      {/* Name Heading */}
      <Typography
        variant="h2"
        component="h1"
        sx={{
          fontWeight: 800,
          fontSize: { xs: "2.2rem", sm: "3.2rem", md: "4rem" },
          letterSpacing: "-1px",
          mb: 1.5,
          lineHeight: 1.15,
        }}
      >
        Hi, I'm{" "}
        <Box
          component="span"
          sx={{
            background: isDark
              ? "linear-gradient(135deg, #38bdf8 0%, #a855f7 100%)"
              : "linear-gradient(135deg, #0284c7 0%, #7c3aed 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Rishikesh Bhalekar
        </Box>
      </Typography>

      {/* Dynamic Animated Roles */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "44px",
          mb: 2.5,
        }}
      >
        <CodeIcon sx={{ color: "primary.main", mr: 1, fontSize: { xs: 20, sm: 26 } }} />
        <Typography
          variant="h5"
          component="div"
          sx={{
            fontWeight: 600,
            fontSize: { xs: "1.1rem", sm: "1.5rem", md: "1.75rem" },
            color: isDark ? "#cbd5e1" : "#475569",
          }}
        >
          {displayedText}
          <Box
            component="span"
            sx={{
              borderRight: "2px solid",
              borderColor: "primary.main",
              animation: "blink 1s infinite",
              ml: 0.5,
              "@keyframes blink": {
                "0%, 100%": { opacity: 1 },
                "50%": { opacity: 0 },
              },
            }}
          />
        </Typography>
      </Box>

      {/* Bio Paragraph */}
      <Typography
        variant="body1"
        sx={{
          maxWidth: "680px",
          fontSize: { xs: "0.95rem", sm: "1.1rem" },
          lineHeight: 1.7,
          color: isDark ? "#94a3b8" : "#64748b",
          mb: 4,
        }}
      >
        Passionate frontend engineer specializing in crafting pixel-perfect, accessible, and high-performance web applications with React, TypeScript, and modern UI frameworks.
      </Typography>

      {/* CTA Action Buttons */}
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={2}
        sx={{ width: { xs: "100%", sm: "auto" }, mb: 4 }}
      >
        <Button
          variant="contained"
          size="large"
          onClick={() => scrollToSection("projects")}
          endIcon={<ArrowDownwardIcon />}
          sx={{
            px: 3.5,
            py: 1.4,
            fontSize: "1rem",
            background: "linear-gradient(135deg, #0284c7 0%, #38bdf8 100%)",
            boxShadow: "0 8px 24px -4px rgba(56, 189, 248, 0.4)",
            "&:hover": {
              background: "linear-gradient(135deg, #0369a1 0%, #0284c7 100%)",
              boxShadow: "0 12px 28px -4px rgba(56, 189, 248, 0.5)",
            },
          }}
        >
          Explore Projects
        </Button>

        <Button
          variant="outlined"
          size="large"
          onClick={() => scrollToSection("about")}
          sx={{
            px: 3.5,
            py: 1.4,
            fontSize: "1rem",
            borderColor: isDark ? "rgba(255, 255, 255, 0.2)" : "rgba(0, 0, 0, 0.2)",
            color: isDark ? "#f1f5f9" : "#0f172a",
            "&:hover": {
              borderColor: "primary.main",
              bgcolor: isDark ? "rgba(56, 189, 248, 0.08)" : "rgba(2, 132, 199, 0.08)",
            },
          }}
        >
          More About Me
        </Button>
      </Stack>

      {/* Social Links */}
      <Stack direction="row" spacing={1.5}>
        <Tooltip title="GitHub Profile">
          <IconButton
            component="a"
            href="https://github.com/R1Sh0315"
            target="_blank"
            rel="noreferrer"
            sx={{
              color: isDark ? "#cbd5e1" : "#475569",
              bgcolor: isDark ? "rgba(255, 255, 255, 0.05)" : "rgba(0, 0, 0, 0.04)",
              border: isDark ? "1px solid rgba(255, 255, 255, 0.08)" : "1px solid rgba(0, 0, 0, 0.06)",
              "&:hover": {
                color: "primary.main",
                transform: "translateY(-3px)",
                bgcolor: isDark ? "rgba(56, 189, 248, 0.1)" : "rgba(2, 132, 199, 0.1)",
              },
              transition: "all 0.25s ease",
            }}
          >
            <GitHubIcon />
          </IconButton>
        </Tooltip>

        <Tooltip title="LinkedIn Profile">
          <IconButton
            component="a"
            href="https://www.linkedin.com/in/rishikesh-bhalekar-198041196/"
            target="_blank"
            rel="noreferrer"
            sx={{
              color: isDark ? "#cbd5e1" : "#475569",
              bgcolor: isDark ? "rgba(255, 255, 255, 0.05)" : "rgba(0, 0, 0, 0.04)",
              border: isDark ? "1px solid rgba(255, 255, 255, 0.08)" : "1px solid rgba(0, 0, 0, 0.06)",
              "&:hover": {
                color: "#0a66c2",
                transform: "translateY(-3px)",
                bgcolor: isDark ? "rgba(10, 102, 194, 0.1)" : "rgba(10, 102, 194, 0.1)",
              },
              transition: "all 0.25s ease",
            }}
          >
            <LinkedInIcon />
          </IconButton>
        </Tooltip>

        <Tooltip title="Send Email">
          <IconButton
            component="a"
            href="mailto:rishikeshbhalekar6@gmail.com"
            sx={{
              color: isDark ? "#cbd5e1" : "#475569",
              bgcolor: isDark ? "rgba(255, 255, 255, 0.05)" : "rgba(0, 0, 0, 0.04)",
              border: isDark ? "1px solid rgba(255, 255, 255, 0.08)" : "1px solid rgba(0, 0, 0, 0.06)",
              "&:hover": {
                color: "#ea4335",
                transform: "translateY(-3px)",
                bgcolor: isDark ? "rgba(234, 67, 53, 0.1)" : "rgba(234, 67, 53, 0.1)",
              },
              transition: "all 0.25s ease",
            }}
          >
            <EmailIcon />
          </IconButton>
        </Tooltip>
      </Stack>
    </Box>
  );
};

export default AboutComponent;
