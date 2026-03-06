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
                // Fetch PRs using search API for comprehensive data (open, merged, closed)
                const prResponse = await fetch("https://api.github.com/search/issues?q=author:R1Sh0315+type:pr");
                let prData: any = null;
                if (prResponse.ok) {
                    prData = await prResponse.json();
                }

                // Fetch recent events for commits
                const eventsResponse = await fetch("https://api.github.com/users/R1Sh0315/events");
                let eventsData: any = null;
                if (eventsResponse.ok) {
                    eventsData = await eventsResponse.json();
                }

                const repoGroups: Record<string, RepoContribution> = {};

                const formatDate = (dateStr: any) => {
                    const d = new Date(dateStr);
                    return isNaN(d.getTime()) ? "N/A" : d.toLocaleDateString();
                };

                const getOrInitGroup = (repoFullName: string) => {
                    if (!repoGroups[repoFullName]) {
                        const parts = repoFullName.split('/');
                        const ownerLogin = parts[0] || "Unknown";
                        const name = parts[1] || repoFullName;
                        repoGroups[repoFullName] = {
                            repoName: name,
                            ownerLogin: ownerLogin,
                            ownerAvatar: `https://avatars.githubusercontent.com/${ownerLogin}`,
                            mergedPRs: 0,
                            totalCommits: 0,
                            repoUrl: `https://github.com/${repoFullName}`,
                            items: [],
                        };
                    }
                    return repoGroups[repoFullName];
                };

                // Process PRs
                if (prData && Array.isArray(prData.items)) {
                    prData.items.forEach((pr: any) => {
                        try {
                            // repository_url is like "https://api.github.com/repos/owner/repo"
                            const urlParts = pr.repository_url.split('/');
                            const repoName = `${urlParts[urlParts.length - 2]}/${urlParts[urlParts.length - 1]}`;
                            const group = getOrInitGroup(repoName);

                            let status: "open" | "closed" | "merged" = "open";
                            if (pr.pull_request && pr.pull_request.merged_at) {
                                status = "merged";
                                group.mergedPRs++;
                            } else if (pr.state === "closed") {
                                status = "closed";
                            }

                            group.items.push({
                                id: String(pr.id || Math.random()),
                                title: pr.title || "Pull Request",
                                url: pr.html_url || "#",
                                date: formatDate(pr.created_at),
                                type: "PR",
                                status: status
                            });
                        } catch (e) {
                            console.error("Error parsing PR", e);
                        }
                    });
                }

                // Process Events for Commits and Issues
                if (Array.isArray(eventsData)) {
                    eventsData.forEach((event: IGHEvent) => {
                        try {
                            if (!event || !event.repo || !event.repo.name) return;
                            const repoName = event.repo.name;
                            const group = getOrInitGroup(repoName);
                            const payload = event.payload || {};

                            // We only process PushEvent and IssuesEvent here, PRs handled via search
                            if (event.type === "PushEvent") {
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
                                            status: "commit" as any
                                        });
                                    }
                                });
                            } else if (event.type === "IssuesEvent" && payload.issue) {
                                const issue = payload.issue;
                                const action = String(payload.action).toLowerCase();
                                const status: "open" | "closed" = (action === "closed") ? "closed" : "open";

                                // check if we already added this issue
                                const existingIssue = group.items.find(i => String(i.id) === String(issue.id || ""));
                                if (!existingIssue) {
                                    group.items.push({
                                        id: String(issue.id || Math.random()),
                                        title: issue.title || "Issue resolution",
                                        url: issue.html_url || "#",
                                        date: formatDate(issue.created_at || event.created_at),
                                        type: "Issue",
                                        status: status,
                                    });
                                }
                            }
                        } catch (e) {
                            console.error("Error parsing Event", e);
                        }
                    });
                }

                const result = Object.values(repoGroups).filter(g => g.items.length > 0);

                // Sort items roughly by date
                result.forEach(group => {
                    group.items.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
                });

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
