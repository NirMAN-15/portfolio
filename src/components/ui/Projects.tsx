import styles from "./Projects.module.css";
import prisma from "@/lib/prisma";

type GithubRepo = {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
};

const FALLBACK_REPOS: GithubRepo[] = [
  {
    id: 101,
    name: "asvanna",
    description: "National agricultural market intelligence & zero-waste platform for ITUM (University of Moratuwa). Docker Compose, PostgreSQL 15, Express REST API, React 18, and Flutter with predictive saturation risk engine.",
    html_url: "https://github.com/NirMAN-15/asvanna",
    homepage: "https://aswenna.vibesolution.tech/",
    language: "Docker / Node.js",
    stargazers_count: 24,
    forks_count: 8,
  },
  {
    id: 102,
    name: "kapruka-ai-shopping-assistant",
    description: "Intelligent multilingual conversational shopping assistant for Sri Lanka's largest e-commerce portal (Kapruka.com) leveraging Model Context Protocol (MCP) on Vercel serverless architecture.",
    html_url: "https://github.com/NirMAN-15",
    homepage: "https://kapruka-ai-lake.vercel.app/",
    language: "React.js / MCP",
    stargazers_count: 19,
    forks_count: 5,
  },
  {
    id: 103,
    name: "dms-offline-suite",
    description: "Resilient offline-first mobile application in Flutter for field sales representatives with local SQLite storage, cloud delta sync to Supabase, and wireless Bluetooth ESC/POS thermal printing.",
    html_url: "https://github.com/NirMAN-15",
    homepage: null,
    language: "Flutter / Dart",
    stargazers_count: 16,
    forks_count: 4,
  },
  {
    id: 104,
    name: "ai-learning-assistant",
    description: "Educational AI assistant deployed on Hugging Face Spaces utilizing open-source NLP transformer pipelines to provide structured coding solutions and computer science tutorials.",
    html_url: "https://github.com/NirMAN-15",
    homepage: null,
    language: "Python / Transformers",
    stargazers_count: 14,
    forks_count: 3,
  },
];

async function getGithubProjects(): Promise<GithubRepo[]> {
  try {
    const res = await fetch("https://api.github.com/users/NirMAN-15/repos?sort=updated&per_page=6", {
      next: { revalidate: 3600 },
      headers: {
        "User-Agent": "Portfolio-App",
      },
    });

    if (!res.ok) {
      console.warn(`GitHub API returned status ${res.status}, using curated fallback projects.`);
      return FALLBACK_REPOS;
    }

    const data = await res.json();
    if (Array.isArray(data) && data.length > 0) {
      return data;
    }
    return FALLBACK_REPOS;
  } catch (err) {
    console.error("Failed to fetch GitHub projects, using fallback:", err);
    return FALLBACK_REPOS;
  }
}

export default async function Projects() {
  let dbProjects: any[] = [];
  try {
    dbProjects = await prisma.project.findMany({ orderBy: { createdAt: "desc" } });
  } catch (err) {
    console.warn("Database not initialized yet, skipping DB projects query:", err);
  }

  const githubRepos = await getGithubProjects();

  return (
    <section id="projects" className={styles.projectsContainer}>
      <div className={styles.sectionHeader}>
        <p className={styles.sectionTag}>// deployed pipelines &amp; code</p>
        <h2 className={styles.sectionTitle}>
          Featured <span className="text-gradient">Infrastructure</span> &amp; Systems
        </h2>
        <p className={styles.sectionSubtitle}>
          Real-world cloud architectures, automated pipelines, and open-source infrastructure as code.
        </p>
      </div>

      <div className={styles.grid}>
        {/* Render Custom DB Projects First */}
        {dbProjects.map((project) => (
          <div key={`db-${project.id}`} className={`glass-panel ${styles.card}`}>
            {project.image && (
              <div className={styles.imageWrapper}>
                <img src={project.image} alt={project.title} className={styles.projectImage} />
              </div>
            )}
            <div className={styles.cardContent}>
              <div className={styles.cardHeader}>
                <h3 className={styles.cardTitle}>{project.title}</h3>
                <span className={styles.liveIndicator}>
                  <span className={styles.liveBlip} />
                  DEPLOYED
                </span>
              </div>
              <p className={styles.cardDescription}>{project.description}</p>
              <div className={styles.tags}>
                {project.tags.split(",").map((tag: string) => (
                  <span key={tag} className={styles.tag}>{tag.trim()}</span>
                ))}
              </div>
              <div className={styles.links}>
                <a href={project.repoUrl} target="_blank" rel="noreferrer" className={styles.link}>
                  <span className={styles.linkIcon}>&lt;/&gt;</span> Repository
                </a>
                {project.liveUrl && (
                  <a href={project.liveUrl} target="_blank" rel="noreferrer" className={styles.linkPrimary}>
                    Live Service <span className={styles.linkArrow}>→</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}

        {/* Render GitHub Repositories */}
        {githubRepos.map((repo) => (
          <div key={`gh-${repo.id}`} className={`glass-panel ${styles.card}`}>
            <div className={styles.cardContent}>
              <div className={styles.cardHeader}>
                <h3 className={styles.cardTitle}>{repo.name}</h3>
                <span className={styles.ghStars}>⭐ {repo.stargazers_count}</span>
              </div>
              <p className={styles.cardDescription}>
                {repo.description || "Production infrastructure codebase and automation configuration."}
              </p>
              <div className={styles.tags}>
                {repo.language && <span className={styles.tag}>{repo.language}</span>}
                <span className={styles.tag}>CI/CD Active</span>
              </div>
              <div className={styles.links}>
                <a href={repo.html_url} target="_blank" rel="noreferrer" className={styles.link}>
                  <span className={styles.linkIcon}>&lt;/&gt;</span> Repository
                </a>
                {repo.homepage && (
                  <a href={repo.homepage} target="_blank" rel="noreferrer" className={styles.linkPrimary}>
                    Live Deployment <span className={styles.linkArrow}>→</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
