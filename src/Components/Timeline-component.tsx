import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";

import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import SchoolIcon from "@mui/icons-material/SchoolOutlined";
import LaunchIcon from "@mui/icons-material/Launch";
import VerifiedIcon from "@mui/icons-material/Verified";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import ApartmentIcon from "@mui/icons-material/Apartment";

interface IData {
  [key: string]: any;
}

interface ITimeline {
  data: IData[];
  isDark?: boolean;
  timelineType?: string;
  cell2Type?: string;
  istoggle?: boolean;
}

const TimeLineComponent: React.FC<ITimeline> = ({ data, isDark }) => {
  return (
    <Box sx={{ py: 1 }}>
      {data.map((item: any, idx: number) => {
        const isWork = item?.isWorkingPlace;
        const isLast = idx === data.length - 1;
        const title = item?.designation || item?.qualificationIn;
        const organization = item?.companyName || item?.collegeName;

        return (
          <Box
            key={idx}
            sx={{
              display: "flex",
              gap: { xs: 2, sm: 3 },
              position: "relative",
            }}
          >
            {/* Left Column: Perfectly Centered Node and Connector Line */}
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                minWidth: { xs: 40, sm: 48 },
              }}
            >
              {/* Glowing Node Avatar */}
              <Box
                sx={{
                  width: { xs: 40, sm: 48 },
                  height: { xs: 40, sm: 48 },
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: isWork
                    ? "linear-gradient(135deg, #0284c7 0%, #38bdf8 100%)"
                    : "linear-gradient(135deg, #db2777 0%, #f472b6 100%)",
                  boxShadow: isWork
                    ? "0 0 16px rgba(56, 189, 248, 0.55), 0 4px 12px rgba(0,0,0,0.3)"
                    : "0 0 16px rgba(244, 114, 182, 0.55), 0 4px 12px rgba(0,0,0,0.3)",
                  border: isDark
                    ? "3px solid rgba(255, 255, 255, 0.18)"
                    : "3px solid #ffffff",
                  zIndex: 2,
                  flexShrink: 0,
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  "&:hover": {
                    transform: "scale(1.12)",
                    boxShadow: isWork
                      ? "0 0 24px rgba(56, 189, 248, 0.8), 0 6px 16px rgba(0,0,0,0.4)"
                      : "0 0 24px rgba(244, 114, 182, 0.8), 0 6px 16px rgba(0,0,0,0.4)",
                  },
                }}
              >
                {isWork ? (
                  <WorkOutlineIcon sx={{ fontSize: { xs: 20, sm: 24 }, color: "#ffffff" }} />
                ) : (
                  <SchoolIcon sx={{ fontSize: { xs: 20, sm: 24 }, color: "#ffffff" }} />
                )}
              </Box>

              {/* Vertical Connector Line */}
              {!isLast && (
                <Box
                  sx={{
                    width: "3px",
                    flexGrow: 1,
                    minHeight: "40px",
                    my: 0.8,
                    background: isWork
                      ? isDark
                        ? "linear-gradient(180deg, #38bdf8 0%, rgba(56, 189, 248, 0.2) 100%)"
                        : "linear-gradient(180deg, #0284c7 0%, rgba(2, 132, 199, 0.2) 100%)"
                      : isDark
                        ? "linear-gradient(180deg, #f472b6 0%, rgba(244, 114, 182, 0.2) 100%)"
                        : "linear-gradient(180deg, #db2777 0%, rgba(219, 39, 119, 0.2) 100%)",
                    borderRadius: "3px",
                  }}
                />
              )}
            </Box>

            {/* Right Column: Milestone Card Content */}
            <Box
              sx={{
                flexGrow: 1,
                pb: isLast ? 0 : { xs: 3.5, sm: 4.5 },
              }}
            >
              <Box
                sx={{
                  p: { xs: 2.2, sm: 3 },
                  borderRadius: 3,
                  bgcolor: isDark ? "rgba(15, 23, 42, 0.55)" : "rgba(241, 245, 249, 0.75)",
                  border: isDark
                    ? "1px solid rgba(255, 255, 255, 0.08)"
                    : "1px solid rgba(0, 0, 0, 0.06)",
                  backdropFilter: "blur(8px)",
                  boxShadow: isDark
                    ? "0 4px 20px -4px rgba(0,0,0,0.4)"
                    : "0 4px 20px -4px rgba(0,0,0,0.06)",
                  transition: "transform 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease",
                  "&:hover": {
                    transform: "translateY(-3px)",
                    borderColor: isWork ? "primary.main" : "secondary.main",
                    boxShadow: isWork
                      ? isDark
                        ? "0 8px 24px -4px rgba(56, 189, 248, 0.25)"
                        : "0 8px 24px -4px rgba(2, 132, 199, 0.18)"
                      : isDark
                        ? "0 8px 24px -4px rgba(244, 114, 182, 0.25)"
                        : "0 8px 24px -4px rgba(219, 39, 119, 0.18)",
                  },
                }}
              >
                {/* Header: Title, Organization, and Year Chip */}
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: { xs: "column", sm: "row" },
                    justifyContent: "space-between",
                    alignItems: { xs: "flex-start", sm: "center" },
                    gap: 1,
                    mb: 1.5,
                  }}
                >
                  <Box>
                    <Typography
                      variant="h6"
                      component="h3"
                      sx={{
                        fontWeight: 700,
                        fontSize: { xs: "1.08rem", sm: "1.25rem" },
                        color: isDark ? "#f8fafc" : "#0f172a",
                      }}
                    >
                      {title}
                    </Typography>

                    <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 0.5 }}>
                      <Typography
                        variant="subtitle2"
                        sx={{
                          fontWeight: 700,
                          color: isWork ? "primary.main" : "secondary.main",
                          fontSize: { xs: "0.92rem", sm: "1.02rem" },
                          display: "flex",
                          alignItems: "center",
                          gap: 0.5,
                        }}
                      >
                        <ApartmentIcon sx={{ fontSize: 16 }} />
                        {organization}
                      </Typography>

                      {item?.url && (
                        <Button
                          size="small"
                          href={item.url}
                          target="_blank"
                          rel="noreferrer"
                          endIcon={<LaunchIcon sx={{ fontSize: "14px !important" }} />}
                          sx={{
                            p: 0,
                            minWidth: "auto",
                            fontSize: "0.75rem",
                            fontWeight: 600,
                            color: isDark ? "#94a3b8" : "#64748b",
                            "&:hover": { color: "primary.main" },
                          }}
                        >
                          Visit
                        </Button>
                      )}
                    </Box>
                  </Box>

                  {/* Year of Work Badge */}
                  <Chip
                    icon={<CalendarTodayIcon sx={{ fontSize: "14px !important" }} />}
                    label={item?.yearOfWork}
                    size="small"
                    sx={{
                      fontWeight: 600,
                      fontSize: "0.78rem",
                      bgcolor: isDark ? "rgba(255, 255, 255, 0.08)" : "rgba(0, 0, 0, 0.05)",
                      color: isDark ? "#e2e8f0" : "#334155",
                      border: isDark
                        ? "1px solid rgba(255, 255, 255, 0.08)"
                        : "1px solid rgba(0, 0, 0, 0.06)",
                    }}
                  />
                </Box>

                {/* Work Description */}
                <Typography
                  variant="body2"
                  sx={{
                    color: isDark ? "#cbd5e1" : "#475569",
                    lineHeight: 1.7,
                    fontSize: { xs: "0.88rem", sm: "0.95rem" },
                    mb: item?.certificate ? 2 : 0,
                  }}
                >
                  {item?.workDiscription}
                </Typography>

                {/* Credential Tags */}
                {item?.certificate && item.certificate.length > 0 && (
                  <Stack direction="row" spacing={1} sx={{ flexWrap: "wrap", gap: 1, mt: 1.8 }}>
                    {item.certificate.map((cert: any, cIdx: number) => (
                      <Chip
                        key={cIdx}
                        icon={<VerifiedIcon sx={{ fontSize: "16px !important", color: "primary.main" }} />}
                        label={cert.name}
                        component="a"
                        href={cert.url}
                        target="_blank"
                        rel="noreferrer"
                        clickable
                        size="small"
                        sx={{
                          fontWeight: 600,
                          fontSize: "0.8rem",
                          bgcolor: isDark ? "rgba(56, 189, 248, 0.12)" : "rgba(2, 132, 199, 0.08)",
                          color: "primary.main",
                          border: "1px solid",
                          borderColor: isDark ? "rgba(56, 189, 248, 0.3)" : "rgba(2, 132, 199, 0.25)",
                          "&:hover": {
                            bgcolor: isDark ? "rgba(56, 189, 248, 0.2)" : "rgba(2, 132, 199, 0.15)",
                          },
                        }}
                      />
                    ))}
                  </Stack>
                )}
              </Box>
            </Box>
          </Box>
        );
      })}
    </Box>
  );
};

export default TimeLineComponent;
