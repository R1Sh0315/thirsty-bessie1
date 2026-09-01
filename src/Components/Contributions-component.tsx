import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Chip from "@mui/material/Chip";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Collapse from "@mui/material/Collapse";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import CircularProgress from "@mui/material/CircularProgress";
import Tooltip from "@mui/material/Tooltip";

import GitHubIcon from "@mui/icons-material/GitHub";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import LaunchIcon from "@mui/icons-material/Launch";
import CommitIcon from "@mui/icons-material/Commit";
import CallMergeIcon from "@mui/icons-material/CallMerge";
import AdjustIcon from "@mui/icons-material/Adjust";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";

import LabelShadowComponent from "./Label-Shadow";

interface IGHEvent {
  type: string;
  repo: { name: string; url: string };
  payload: any;
  created_at: string;
}

interface ContributionItem {
  id: string;
  number?: number;
  title: string;
  url: string;
  date: string;
  type: "PR" | "Issue" | "Commit";
  category: "Feature" | "Bug Fix" | "Testing" | "Refactor" | "Migration" | "Full-Stack" | "Docs";
  status?: "open" | "closed" | "merged" | "commit";
}

interface RepoContribution {
  repoName: string;
  ownerAvatar: string;
  ownerLogin: string;
  domain: string;
  keySkills: string[];
  totalPRs: number;
  mergedPRs: number;
  openPRs: number;
  totalCommits: number;
  totalContributions: number;
  repoUrl: string;
  items: ContributionItem[];
}

interface ContributionsComponentProps {
  isDark: boolean;
  label: string;
}

const getRepoDomainMeta = (repoFullName: string) => {
  const lower = repoFullName.toLowerCase();
  if (lower.includes("react-ts-ui-lib")) {
    return {
      domain: "UI Component Library & Design System",
      keySkills: ["TypeScript", "React 18", "Unit Testing", "Props & A11y"],
    };
  }
  if (lower.includes("cognifast-ai")) {
    return {
      domain: "AI & EdTech Interactive Platform",
      keySkills: ["React", "State Management", "ErrorBoundaries", "Collapsible UX"],
    };
  }
  if (lower.includes("local-express")) {
    return {
      domain: "Full-Stack E-Commerce & Web App",
      keySkills: ["Express.js", "React Router", "Authentication", "REST API"],
    };
  }
  if (lower.includes("the_cheat_sheet")) {
    return {
      domain: "Open Source Developer Knowledge Base",
      keySkills: ["React Ecosystem", "Technical Documentation", "Architecture"],
    };
  }
  if (lower.includes("oras-www")) {
    return {
      domain: "Cloud Native / CNCF Tooling Web Portal",
      keySkills: ["React 19 Migration", "Build Tooling", "Dependency Upgrades"],
    };
  }
  return {
    domain: "Open Source Web Application",
    keySkills: ["Frontend Development", "Git Workflow", "Code Review"],
  };
};

const classifyContribution = (title: string): ContributionItem["category"] => {
  const t = title.toLowerCase();
  if (t.includes("test:") || t.includes("unit test") || t.includes("jest")) return "Testing";
  if (t.includes("fix:") || t.includes("bug") || t.includes("resolve")) return "Bug Fix";
  if (t.includes("feat:") || t.includes("feature") || t.includes("add") || t.includes("implement")) return "Feature";
  if (t.includes("refactor:") || t.includes("refactor") || t.includes("clean")) return "Refactor";
  if (t.includes("upgrade") || t.includes("migration") || t.includes("build")) return "Migration";
  if (t.includes("backend") || t.includes("auth") || t.includes("api") || t.includes("registration")) return "Full-Stack";
  return "Docs";
};

const ContributionsComponent: React.FC<ContributionsComponentProps> = ({ isDark, label }) => {
  const [contributions, setContributions] = useState<RepoContribution[]>([]);
  // By default, everything is collapsed (expandedRepo = null)
  const [expandedRepo, setExpandedRepo] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const [prRes, commitRes, eventsRes] = await Promise.all([
          fetch("https://api.github.com/search/issues?q=author:R1Sh0315+type:pr")
            .then((r) => (r.ok ? r.json() : { items: [] }))
            .catch(() => ({ items: [] })),
          fetch("https://api.github.com/search/commits?q=author:R1Sh0315", {
            headers: { Accept: "application/vnd.github.cloak-preview" },
          })
            .then((r) => (r.ok ? r.json() : { items: [] }))
            .catch(() => ({ items: [] })),
          fetch("https://api.github.com/users/R1Sh0315/events")
            .then((r) => (r.ok ? r.json() : []))
            .catch(() => []),
        ]);

        const repoGroups: Record<string, RepoContribution> = {};

        const formatDate = (dateStr: any) => {
          const d = new Date(dateStr);
          return isNaN(d.getTime()) ? "N/A" : d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
        };

        const getOrInitGroup = (repoFullName: string) => {
          if (!repoGroups[repoFullName]) {
            const parts = repoFullName.split("/");
            const ownerLogin = parts[0] || "Unknown";
            const name = parts[1] || repoFullName;
            const meta = getRepoDomainMeta(repoFullName);

            repoGroups[repoFullName] = {
              repoName: name,
              ownerLogin: ownerLogin,
              ownerAvatar: `https://avatars.githubusercontent.com/${ownerLogin}`,
              domain: meta.domain,
              keySkills: meta.keySkills,
              totalPRs: 0,
              mergedPRs: 0,
              openPRs: 0,
              totalCommits: 0,
              totalContributions: 0,
              repoUrl: `https://github.com/${repoFullName}`,
              items: [],
            };
          }
          return repoGroups[repoFullName];
        };

        // 1. Process Pull Requests
        if (prRes && Array.isArray(prRes.items)) {
          prRes.items.forEach((pr: any) => {
            try {
              const urlParts = pr.repository_url.split("/");
              const repoName = `${urlParts[urlParts.length - 2]}/${urlParts[urlParts.length - 1]}`;
              const group = getOrInitGroup(repoName);

              group.totalPRs++;
              let status: "open" | "closed" | "merged" = "open";

              if (pr.pull_request && pr.pull_request.merged_at) {
                status = "merged";
                group.mergedPRs++;
              } else if (pr.state === "closed") {
                status = "merged";
                group.mergedPRs++;
              } else {
                status = "open";
                group.openPRs++;
              }

              group.items.push({
                id: String(pr.id || Math.random()),
                number: pr.number,
                title: pr.title || "Pull Request",
                url: pr.html_url || "#",
                date: formatDate(pr.created_at),
                type: "PR",
                category: classifyContribution(pr.title || ""),
                status: status,
              });
            } catch (e) {
              console.error("Error parsing PR", e);
            }
          });
        }

        // 2. Process Commits
        if (commitRes && Array.isArray(commitRes.items)) {
          commitRes.items.forEach((commitItem: any) => {
            try {
              const repoName = commitItem.repository?.full_name;
              if (!repoName) return;
              const group = getOrInitGroup(repoName);
              group.totalCommits++;

              const message = commitItem.commit?.message?.split("\n")[0] || "Code adjustment";
              const commitSha = commitItem.sha;
              const exists = group.items.find((i) => i.id === commitSha);

              if (!exists) {
                group.items.push({
                  id: commitSha || Math.random().toString(),
                  title: message,
                  url: commitItem.html_url || `https://github.com/${repoName}/commit/${commitSha}`,
                  date: formatDate(commitItem.commit?.author?.date || Date.now()),
                  type: "Commit",
                  category: classifyContribution(message),
                  status: "commit",
                });
              }
            } catch (e) {
              console.error("Error parsing commit search", e);
            }
          });
        }

        // 3. Process Events
        if (Array.isArray(eventsRes)) {
          eventsRes.forEach((event: IGHEvent) => {
            try {
              if (!event || !event.repo || !event.repo.name) return;
              const repoName = event.repo.name;
              const group = getOrInitGroup(repoName);
              const payload = event.payload || {};

              if (event.type === "PushEvent") {
                const commits = Array.isArray(payload.commits) ? payload.commits : [];
                commits.forEach((commit: any) => {
                  if (commit) {
                    const commitSha = commit.sha;
                    const exists = group.items.find((i) => i.id === commitSha);
                    if (!exists) {
                      group.totalCommits++;
                      group.items.push({
                        id: commitSha || Math.random().toString(),
                        title: commit.message?.split("\n")[0] || "Code update",
                        url: commit.url || `https://github.com/${repoName}/commit/${commitSha}`,
                        date: formatDate(event.created_at),
                        type: "Commit",
                        category: classifyContribution(commit.message || ""),
                        status: "commit",
                      });
                    }
                  }
                });
              }
            } catch (e) {
              console.error("Error parsing Event", e);
            }
          });
        }

        const excludeRepos = ["complexpotato/Faitagram"];
        const result = Object.values(repoGroups).filter((g) => {
          const fullRepoName = `${g.ownerLogin}/${g.repoName}`;
          g.totalContributions = g.items.length;
          return (
            g.items.length > 0 &&
            g.ownerLogin !== "R1Sh0315" &&
            !excludeRepos.includes(fullRepoName)
          );
        });

        // Sort repos by merged PRs descending
        result.sort((a, b) => b.mergedPRs - a.mergedPRs);

        // Sort items by date
        result.forEach((group) => {
          group.totalContributions = group.items.length;
          group.items.sort(
            (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
          );
        });

        setContributions(result);
        // By default, leave all collapsed
        setExpandedRepo(null);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching GitHub contributions:", error);
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  const toggleExpand = (repoFull: string) => {
    setExpandedRepo(expandedRepo === repoFull ? null : repoFull);
  };

  const getCategoryBadge = (category: ContributionItem["category"]) => {
    const colors: Record<string, { bg: string; text: string }> = {
      Testing: { bg: "rgba(16, 185, 129, 0.15)", text: "#10b981" },
      Feature: { bg: "rgba(56, 189, 248, 0.15)", text: "#38bdf8" },
      "Bug Fix": { bg: "rgba(239, 68, 68, 0.15)", text: "#f87171" },
      "Full-Stack": { bg: "rgba(168, 85, 247, 0.15)", text: "#c084fc" },
      Refactor: { bg: "rgba(245, 158, 11, 0.15)", text: "#fbbf24" },
      Migration: { bg: "rgba(99, 102, 241, 0.15)", text: "#818cf8" },
      Docs: { bg: "rgba(148, 163, 184, 0.15)", text: "#94a3b8" },
    };

    const c = colors[category] || colors.Feature;

    return (
      <Chip
        label={category}
        size="small"
        sx={{
          height: 20,
          fontSize: "0.68rem",
          fontWeight: 700,
          bgcolor: c.bg,
          color: c.text,
          border: `1px solid ${c.bg}`,
        }}
      />
    );
  };

  const getStatusChip = (status?: string) => {
    if (status === "merged") {
      return (
        <Chip
          icon={<CallMergeIcon sx={{ fontSize: "13px !important" }} />}
          label="Merged into Main"
          size="small"
          sx={{
            bgcolor: isDark ? "rgba(168, 85, 247, 0.18)" : "rgba(147, 51, 234, 0.12)",
            color: isDark ? "#c084fc" : "#7e22ce",
            fontWeight: 700,
            fontSize: "0.72rem",
            height: 22,
          }}
        />
      );
    }
    if (status === "open") {
      return (
        <Chip
          icon={<AdjustIcon sx={{ fontSize: "13px !important" }} />}
          label="Under Review"
          size="small"
          sx={{
            bgcolor: isDark ? "rgba(34, 197, 94, 0.18)" : "rgba(22, 163, 74, 0.12)",
            color: isDark ? "#4ade80" : "#15803d",
            fontWeight: 700,
            fontSize: "0.72rem",
            height: 22,
          }}
        />
      );
    }
    return (
      <Chip
        icon={<CommitIcon sx={{ fontSize: "13px !important" }} />}
        label="Commit"
        size="small"
        sx={{
          bgcolor: isDark ? "rgba(56, 189, 248, 0.15)" : "rgba(2, 132, 199, 0.1)",
          color: "primary.main",
          fontWeight: 700,
          fontSize: "0.72rem",
          height: 22,
        }}
      />
    );
  };

  return (
    <Box id="contributions" sx={{ py: { xs: 3, md: 5 } }}>
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
          subtitle="Production pull requests, merged architecture features, and unit tests contributed to global open-source projects"
        />

        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", py: 6 }}>
            <CircularProgress color="primary" />
          </Box>
        ) : contributions.length === 0 ? (
          <Box
            sx={{
              p: 4,
              textAlign: "center",
              borderRadius: 3,
              bgcolor: isDark ? "rgba(15, 23, 42, 0.3)" : "rgba(241, 245, 249, 0.5)",
            }}
          >
            <Typography variant="body1" sx={{ color: isDark ? "#94a3b8" : "#64748b" }}>
              Active open source contributions will show up automatically via GitHub Live sync.
            </Typography>
          </Box>
        ) : (
          <Stack spacing={2.5}>
            {contributions.map((repo) => {
              const fullKey = `${repo.ownerLogin}/${repo.repoName}`;
              const isExpanded = expandedRepo === fullKey;

              return (
                <Box
                  key={fullKey}
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
                  {/* Header Bar */}
                  <Box
                    onClick={() => toggleExpand(fullKey)}
                    sx={{
                      p: { xs: 2, sm: 2.5 },
                      display: "flex",
                      flexDirection: { xs: "column", md: "row" },
                      justifyContent: "space-between",
                      alignItems: { xs: "flex-start", md: "center" },
                      gap: 2,
                      cursor: "pointer",
                      "&:hover": {
                        bgcolor: isDark ? "rgba(255, 255, 255, 0.02)" : "rgba(0, 0, 0, 0.02)",
                      },
                    }}
                  >
                    {/* Left: Avatar + Names + Domain */}
                    <Box sx={{ display: "flex", alignItems: "center", gap: 2, minWidth: { md: "280px" } }}>
                      <Avatar
                        src={repo.ownerAvatar}
                        alt={repo.ownerLogin}
                        sx={{
                          width: 48,
                          height: 48,
                          border: "2px solid",
                          borderColor: "primary.main",
                          boxShadow: "0 4px 12px rgba(56, 189, 248, 0.3)",
                        }}
                      />
                      <Box>
                        <Typography
                          variant="caption"
                          sx={{
                            color: isDark ? "#94a3b8" : "#64748b",
                            fontWeight: 600,
                            display: "block",
                          }}
                        >
                          {repo.ownerLogin}
                        </Typography>
                        <Typography
                          variant="subtitle1"
                          sx={{
                            fontWeight: 700,
                            color: "primary.main",
                            lineHeight: 1.2,
                            fontSize: "1.08rem",
                          }}
                        >
                          {repo.repoName}
                        </Typography>
                        <Typography
                          variant="caption"
                          sx={{
                            color: isDark ? "#cbd5e1" : "#475569",
                            display: "block",
                            mt: 0.2,
                            fontWeight: 500,
                          }}
                        >
                          {repo.domain}
                        </Typography>
                      </Box>
                    </Box>

                    {/* Middle: Skills */}
                    <Box
                      sx={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: 0.8,
                        flexGrow: 1,
                        justifyContent: { xs: "flex-start", md: "center" },
                      }}
                    >
                      {repo.keySkills.map((skill, sIdx) => (
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
                    </Box>

                    {/* Right: Stats + Action Icons */}
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1.5,
                        flexWrap: "wrap",
                        justifyContent: { xs: "space-between", md: "flex-end" },
                        width: { xs: "100%", md: "auto" },
                      }}
                    >
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <Chip
                          label={`${repo.mergedPRs} Merged`}
                          size="small"
                          sx={{
                            height: 22,
                            fontWeight: 700,
                            fontSize: "0.74rem",
                            bgcolor: isDark ? "rgba(168, 85, 247, 0.18)" : "rgba(147, 51, 234, 0.12)",
                            color: isDark ? "#c084fc" : "#7e22ce",
                          }}
                        />
                        <Chip
                          label={`${repo.totalPRs || repo.totalContributions} Total PRs`}
                          size="small"
                          sx={{
                            height: 22,
                            fontWeight: 700,
                            fontSize: "0.74rem",
                            bgcolor: isDark ? "rgba(56, 189, 248, 0.18)" : "rgba(2, 132, 199, 0.12)",
                            color: "primary.main",
                          }}
                        />
                        <Chip
                          icon={<VerifiedUserIcon sx={{ fontSize: "13px !important" }} />}
                          label="Verified"
                          size="small"
                          sx={{
                            height: 22,
                            fontSize: "0.72rem",
                            fontWeight: 700,
                            bgcolor: isDark ? "rgba(34, 197, 94, 0.12)" : "rgba(22, 163, 74, 0.08)",
                            color: isDark ? "#4ade80" : "#16a34a",
                          }}
                        />
                      </Box>

                      <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                        <Tooltip title="View Project on GitHub">
                          <IconButton
                            size="small"
                            component="a"
                            href={repo.repoUrl}
                            target="_blank"
                            rel="noreferrer"
                            onClick={(e: React.MouseEvent) => e.stopPropagation()}
                            sx={{ color: isDark ? "#cbd5e1" : "#475569" }}
                          >
                            <GitHubIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                        <IconButton size="small" sx={{ color: isDark ? "#cbd5e1" : "#475569" }}>
                          {isExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                        </IconButton>
                      </Box>
                    </Box>
                  </Box>

                  {/* Expandable Contributions Details */}
                  <Collapse in={isExpanded} timeout="auto" unmountOnExit>
                    <Box
                      sx={{
                        p: { xs: 2, sm: 2.5 },
                        borderTop: isDark
                          ? "1px solid rgba(255, 255, 255, 0.05)"
                          : "1px solid rgba(0, 0, 0, 0.04)",
                        bgcolor: isDark ? "rgba(0, 0, 0, 0.2)" : "rgba(0, 0, 0, 0.02)",
                      }}
                    >
                      <Typography
                        variant="caption"
                        sx={{
                          color: isDark ? "#94a3b8" : "#64748b",
                          fontWeight: 700,
                          textTransform: "uppercase",
                          letterSpacing: "0.5px",
                          display: "block",
                          mb: 1.5,
                        }}
                      >
                        Pull Requests & Engineering Deliverables
                      </Typography>

                      <Stack spacing={1.5}>
                        {repo.items.slice(0, 10).map((item, idx) => (
                          <Box
                            key={item.id || idx}
                            sx={{
                              p: 1.8,
                              borderRadius: 2.5,
                              bgcolor: isDark ? "rgba(15, 23, 42, 0.45)" : "rgba(255, 255, 255, 0.9)",
                              border: isDark
                                ? "1px solid rgba(255, 255, 255, 0.06)"
                                : "1px solid rgba(0, 0, 0, 0.05)",
                              display: "flex",
                              flexDirection: "column",
                              gap: 1,
                              transition: "all 0.2s ease",
                              "&:hover": {
                                borderColor: "primary.main",
                                transform: "translateX(4px)",
                              },
                            }}
                          >
                            {/* Top row: PR Number + Category + Title + Code Diff Button */}
                            <Box
                              sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "flex-start",
                                gap: 1.5,
                              }}
                            >
                              <Box sx={{ display: "flex", alignItems: "center", gap: 1, flexWrap: "wrap" }}>
                                {item.number && (
                                  <Chip
                                    label={`#${item.number}`}
                                    size="small"
                                    sx={{
                                      height: 20,
                                      fontSize: "0.7rem",
                                      fontWeight: 700,
                                      bgcolor: isDark ? "rgba(255, 255, 255, 0.08)" : "rgba(0, 0, 0, 0.06)",
                                      color: isDark ? "#cbd5e1" : "#475569",
                                    }}
                                  />
                                )}
                                {getCategoryBadge(item.category)}
                              </Box>

                              <Button
                                variant="outlined"
                                size="small"
                                component="a"
                                href={item.url}
                                target="_blank"
                                rel="noreferrer"
                                endIcon={<LaunchIcon sx={{ fontSize: "13px !important" }} />}
                                sx={{
                                  py: 0.2,
                                  px: 1.2,
                                  fontSize: "0.72rem",
                                  fontWeight: 600,
                                  minWidth: "auto",
                                  borderRadius: 1.5,
                                  borderColor: isDark ? "rgba(255, 255, 255, 0.15)" : "rgba(0, 0, 0, 0.15)",
                                  color: isDark ? "#cbd5e1" : "#475569",
                                  "&:hover": {
                                    borderColor: "primary.main",
                                    color: "primary.main",
                                  },
                                }}
                              >
                                Code Diff
                              </Button>
                            </Box>

                            {/* Title */}
                            <Typography
                              variant="body2"
                              sx={{
                                fontWeight: 600,
                                color: isDark ? "#f1f5f9" : "#0f172a",
                                lineHeight: 1.45,
                              }}
                            >
                              {item.title}
                            </Typography>

                            {/* Bottom row: Status + Date */}
                            <Box
                              sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                pt: 0.5,
                                borderTop: isDark ? "1px solid rgba(255, 255, 255, 0.04)" : "1px solid rgba(0, 0, 0, 0.03)",
                              }}
                            >
                              {getStatusChip(item.status)}
                              <Typography
                                variant="caption"
                                sx={{ color: isDark ? "#94a3b8" : "#64748b", fontWeight: 500 }}
                              >
                                {item.date}
                              </Typography>
                            </Box>
                          </Box>
                        ))}
                      </Stack>
                    </Box>
                  </Collapse>
                </Box>
              );
            })}
          </Stack>
        )}
      </Card>
    </Box>
  );
};

export default ContributionsComponent;
