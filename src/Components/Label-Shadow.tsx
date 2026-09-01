import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

interface ILabel {
  label: string;
  isDark: boolean;
  subtitle?: string;
}

const LabelShadowComponent: React.FC<ILabel> = ({ label, isDark, subtitle }) => {
  return (
    <Box sx={{ position: "relative", mb: 3, textAlign: "left" }}>
      {/* Decorative Background Text */}
      <Typography
        variant="h1"
        sx={{
          position: "absolute",
          top: -22,
          left: -4,
          fontWeight: 900,
          fontSize: { xs: "2.4rem", sm: "3.2rem", md: "4rem" },
          color: isDark ? "rgba(255, 255, 255, 0.03)" : "rgba(0, 0, 0, 0.04)",
          userSelect: "none",
          pointerEvents: "none",
          whiteSpace: "nowrap",
          overflow: "hidden",
          textTransform: "uppercase",
          letterSpacing: "2px",
          zIndex: 0,
        }}
      >
        {label}
      </Typography>

      {/* Main Section Header */}
      <Box sx={{ position: "relative", zIndex: 1, display: "inline-block" }}>
        <Typography
          variant="h4"
          component="h2"
          sx={{
            fontWeight: 800,
            fontSize: { xs: "1.5rem", sm: "1.85rem", md: "2.2rem" },
            letterSpacing: "-0.5px",
            color: isDark ? "#f8fafc" : "#0f172a",
            display: "flex",
            alignItems: "center",
            gap: 1.5,
          }}
        >
          {label}
        </Typography>

        {/* Gradient Underline Accent */}
        <Box
          sx={{
            width: "50px",
            height: "4px",
            borderRadius: "2px",
            mt: 1,
            background: "linear-gradient(90deg, #38bdf8 0%, #a855f7 100%)",
          }}
        />

        {subtitle && (
          <Typography
            variant="body2"
            sx={{
              mt: 1,
              color: isDark ? "#94a3b8" : "#64748b",
              fontSize: { xs: "0.85rem", sm: "0.95rem" },
            }}
          >
            {subtitle}
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default LabelShadowComponent;
