import React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import Divider from "@mui/material/Divider";
import Tooltip from "@mui/material/Tooltip";

import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import EmailIcon from "@mui/icons-material/Email";
import FavoriteIcon from "@mui/icons-material/Favorite";
import UpdateIcon from "@mui/icons-material/Update";

interface FooterProps {
  isDark: boolean;
  lastUpdateDate?: string;
}

const Footer: React.FC<FooterProps> = ({ isDark, lastUpdateDate }) => {
  const formattedDate = lastUpdateDate
    ? new Date(lastUpdateDate).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : null;

  return (
    <Box
      component="footer"
      sx={{
        py: 6,
        mt: 6,
        borderTop: isDark
          ? "1px solid rgba(255, 255, 255, 0.08)"
          : "1px solid rgba(0, 0, 0, 0.06)",
        bgcolor: isDark ? "rgba(11, 17, 32, 0.95)" : "rgba(248, 250, 252, 0.95)",
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            justifyContent: "space-between",
            alignItems: "center",
            gap: 2.5,
            mb: 3,
          }}
        >
          <Box sx={{ textAlign: { xs: "center", sm: "left" } }}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 800,
                background: isDark
                  ? "linear-gradient(90deg, #38bdf8 0%, #818cf8 100%)"
                  : "linear-gradient(90deg, #0284c7 0%, #4f46e5 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Rishikesh Bhalekar
            </Typography>
            <Typography variant="body2" sx={{ color: isDark ? "#94a3b8" : "#64748b" }}>
              Senior Frontend Developer & UI/UX Specialist
            </Typography>
          </Box>

          {/* Social Links */}
          <Stack direction="row" spacing={1}>
            <Tooltip title="GitHub">
              <IconButton
                component="a"
                href="https://github.com/R1Sh0315"
                target="_blank"
                rel="noreferrer"
                size="small"
                sx={{
                  color: isDark ? "#cbd5e1" : "#475569",
                  bgcolor: isDark ? "rgba(255, 255, 255, 0.05)" : "rgba(0, 0, 0, 0.04)",
                  "&:hover": { color: "primary.main" },
                }}
              >
                <GitHubIcon fontSize="small" />
              </IconButton>
            </Tooltip>

            <Tooltip title="LinkedIn">
              <IconButton
                component="a"
                href="https://www.linkedin.com/in/rishikesh-bhalekar-198041196/"
                target="_blank"
                rel="noreferrer"
                size="small"
                sx={{
                  color: isDark ? "#cbd5e1" : "#475569",
                  bgcolor: isDark ? "rgba(255, 255, 255, 0.05)" : "rgba(0, 0, 0, 0.04)",
                  "&:hover": { color: "#0a66c2" },
                }}
              >
                <LinkedInIcon fontSize="small" />
              </IconButton>
            </Tooltip>

            <Tooltip title="Email">
              <IconButton
                component="a"
                href="mailto:rishikeshbhalekar6@gmail.com"
                size="small"
                sx={{
                  color: isDark ? "#cbd5e1" : "#475569",
                  bgcolor: isDark ? "rgba(255, 255, 255, 0.05)" : "rgba(0, 0, 0, 0.04)",
                  "&:hover": { color: "#ea4335" },
                }}
              >
                <EmailIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </Stack>
        </Box>

        <Divider sx={{ my: 2.5, opacity: 0.4 }} />

        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            justifyContent: "space-between",
            alignItems: "center",
            gap: 1.5,
            textAlign: { xs: "center", sm: "left" },
          }}
        >
          <Typography
            variant="caption"
            sx={{
              color: isDark ? "#94a3b8" : "#64748b",
              display: "flex",
              alignItems: "center",
              gap: 0.5,
            }}
          >
            Built with React, TypeScript & Material-UI
          </Typography>

          {formattedDate && (
            <Typography
              variant="caption"
              sx={{
                color: isDark ? "#94a3b8" : "#64748b",
                display: "flex",
                alignItems: "center",
                gap: 0.6,
              }}
            >
              <UpdateIcon sx={{ fontSize: "14px !important" }} />
              Last updated: {formattedDate}
            </Typography>
          )}
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
