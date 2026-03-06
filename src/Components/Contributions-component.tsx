import React, { useEffect, useState } from "react";
import LabelShadowComponent from "./Label-Shadow";
import GitHubIcon from "@mui/icons-material/GitHub";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";

interface IGHEvent {
    type: string;
    repo: { name: string; url: string };
    payload: any;
    created_at: string;
}

interface RepoContribution {
    repoName: string;
    ownerAvatar: string;
    ownerLogin: string;
    mergedPRs: number;
    totalCommits: number;
    repoUrl: string;
    items: Array<{
        id: string;
        title: string;
        url: string;
        date: string;
        type: "PR" | "Issue" | "Commit";
        status?: "open" | "closed" | "merged";
    }>;
}

interface IContributions {
    isDark: boolean;
    label: string;
}

const ContributionsComponent: React.FC<IContributions> = ({ isDark, label }) => {
    const [contributions, setContributions] = useState<RepoContribution[]>([]);
    const [expandedRepo, setExpandedRepo] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await fetch("https://api.github.com/users/R1Sh0315/events");
                if (!response.ok) throw new Error("Failed to fetch");
                const data: IGHEvent[] = await response.json();
                if (!Array.isArray(data)) {
                    setLoading(false);
                    return;
                }
                const repoGroups: Record<string, RepoContribution> = {};

                const formatDate = (dateStr: any) => {
                    const d = new Date(dateStr);
                    return isNaN(d.getTime()) ? "N/A" : d.toLocaleDateString();
                };

                for (const event of data) {
                    try {
                        if (!event || !event.repo || !event.repo.name) continue;

                        const repoName = event.repo.name;
                        if (!repoGroups[repoName]) {
                            const repoParts = repoName.split('/');
                            const ownerLogin = repoParts[0] || "Unknown";
                            const name = repoParts[1] || repoName;

                            repoGroups[repoName] = {
                                repoName: name,
                                ownerLogin: ownerLogin,
                                ownerAvatar: `https://avatars.githubusercontent.com/${ownerLogin}`,
                                mergedPRs: 0,
                                totalCommits: 0,
                                repoUrl: `https://github.com/${repoName}`,
                                items: [],
                            };
                        }

                        const group = repoGroups[repoName];
                        const payload = event.payload || {};

                        if (event.type === "PullRequestEvent" && payload.pull_request) {
                            const pr = payload.pull_request;
                            const isMerged = !!pr.merged;
                            const action = String(payload.action).toLowerCase();

                            if (action === "closed") {
                                if (isMerged) {
                                    group.mergedPRs++;
                                    group.items.push({
                                        id: String(pr.id || Math.random()),
                                        title: pr.title || "Merged Pull Request",
                                        url: pr.html_url || "#",
                                        date: formatDate(pr.merged_at || event.created_at),
                                        type: "PR",
                                        status: "merged",
                                    });
                                } else {
                                    group.items.push({
                                        id: String(pr.id || Math.random()),
                                        title: pr.title || "Closed Pull Request",
                                        url: pr.html_url || "#",
                                        date: formatDate(pr.closed_at || event.created_at),
                                        type: "PR",
                                        status: "closed",
                                    });
                                }
                            } else if (action === "opened" || action === "reopened") {
                                group.items.push({
                                    id: String(pr.id || Math.random()),
                                    title: pr.title || "Opened Pull Request",
                                    url: pr.html_url || "#",
                                    date: formatDate(pr.created_at || event.created_at),
                                    type: "PR",
                                    status: "open",
                                });
                            }
                        } else if (event.type === "PushEvent") {
                            const commits = Array.isArray(payload.commits) ? payload.commits : [];
                            group.totalCommits += commits.length;
                            commits.forEach((commit: any) => {
                                if (commit) {
                                    group.items.push({
                                        id: commit.sha || Math.random().toString(),
                                        title: commit.message || "Code adjustment",
                                        url: commit.url || `https://github.com/${repoName}/commit/${commit.sha}`,
                                        date: formatDate(event.created_at),
                                        type: "Commit",
                                    });
                                }
                            });
                        } else if (event.type === "IssuesEvent" && payload.issue) {
                            const issue = payload.issue;
                            const action = String(payload.action).toLowerCase();
                            const status: "open" | "closed" = (action === "closed") ? "closed" : "open";

                            group.items.push({
                                id: String(issue.id || Math.random()),
                                title: issue.title || "Issue resolution",
                                url: issue.html_url || "#",
                                date: formatDate(issue.created_at || event.created_at),
                                type: "Issue",
                                status: status,
                            });
                        }
                    } catch (eventError) {
                        console.error("Error processing single event:", event, eventError);
                    }
                }

                const result = Object.values(repoGroups).filter(g => g.items.length > 0);
                setContributions(result);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching GitHub events:", error);
                setLoading(false);
            }
        };

        fetchEvents();
    }, []);

    const toggleExpand = (repoFull: string) => {
        setExpandedRepo(expandedRepo === repoFull ? null : repoFull);
    };

    if (loading) return null;

    return (
        <div id="open-source-contributions" className="contributions-container">
            <LabelShadowComponent isDark={isDark} label={label} />
            <div className="contributions-content">
                {contributions.map((repo) => {
                    const fullKey = `${repo.ownerLogin}/${repo.repoName}`;
                    const isExpanded = expandedRepo === fullKey;
                    return (
                        <div
                            key={fullKey}
                            className={`contribution-card ${isDark ? "dark" : "light"}`}
                        >
                            <div className="card-header" onClick={() => toggleExpand(fullKey)}>
                                <div className="owner-info">
                                    <img src={repo.ownerAvatar} alt={repo.ownerLogin} className="owner-avatar" />
                                    <div className="repo-text">
                                        <span className="owner-role">GitHub Contributor</span>
                                        <span className="owner-name">{repo.ownerLogin} / {repo.repoName}</span>
                                    </div>
                                </div>
                                <div className="expand-icon">
                                    {isExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                                </div>
                            </div>

                            <div className={`card-body ${isExpanded ? "expanded" : "collapsed"}`}>
                                <div className="stats-row">
                                    <div className="stat-item">
                                        <span className="stat-label">MERGED PRS</span>
                                        <span className="stat-value">{repo.mergedPRs}</span>
                                    </div>
                                    <div className="stat-item">
                                        <span className="stat-label">TOTAL COMMITS</span>
                                        <span className="stat-value">{repo.totalCommits}</span>
                                    </div>
                                </div>

                                <ul className="contributions-list">
                                    {repo.items.slice(0, 10).map((item, idx) => (
                                        <li key={idx} className={`contribution-item ${item.status || "commit"}`}>
                                            <a href={item.url} target="_blank" rel="noreferrer">
                                                <span className="item-title">
                                                    #{idx + 1} — {item.title}
                                                </span>
                                                <span className="item-meta">
                                                    {item.status ? item.status.toUpperCase() : item.type} at: {item.date}
                                                </span>
                                            </a>
                                        </li>
                                    ))}
                                </ul>

                                <div className="card-footer">
                                    <a href={repo.repoUrl} target="_blank" rel="noreferrer" className="github-link">
                                        <GitHubIcon />
                                    </a>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default ContributionsComponent;
