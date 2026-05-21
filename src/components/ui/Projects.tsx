import styles from "./Projects.module.css";
import prisma from "@/lib/prisma";

async function getGithubProjects() {
  const res = await fetch("https://api.github.com/users/NirMAN-15/repos?sort=updated&per_page=6", {
    next: { revalidate: 3600 }, // Revalidate every hour
  });
  
  if (!res.ok) {
    return [];
  }
  
  return res.json();
}

export default async function Projects() {
  const [githubRepos, dbProjects] = await Promise.all([
    getGithubProjects(),
    prisma.project.findMany({ orderBy: { createdAt: 'desc' } })
  ]);

  return (
    <section id="projects" className={styles.projectsContainer}>
      <h2 className={styles.sectionTitle}>
        Deployed <span className="text-gradient">Infrastructure</span> & Code
      </h2>
      
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
              <h3 className={styles.cardTitle}>{project.title}</h3>
              <p className={styles.cardDescription}>{project.description}</p>
              <div className={styles.tags}>
                {project.tags.split(",").map(tag => (
                  <span key={tag} className={styles.tag}>{tag.trim()}</span>
                ))}
              </div>
              <div className={styles.links}>
                <a href={project.repoUrl} target="_blank" rel="noreferrer" className={styles.link}>
                  <span className={styles.linkIcon}>&lt;/&gt;</span> Repository
                </a>
                {project.liveUrl && (
                  <a href={project.liveUrl} target="_blank" rel="noreferrer" className={styles.linkPrimary}>
                    Live Deployment <span className={styles.linkArrow}>→</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
        
        {/* Render GitHub Projects */}
        {githubRepos.map((repo: any) => (
          <div key={`gh-${repo.id}`} className={`glass-panel ${styles.card}`}>
            <div className={styles.cardContent}>
              <h3 className={styles.cardTitle}>{repo.name}</h3>
              <p className={styles.cardDescription}>{repo.description || "No description provided."}</p>
              <div className={styles.tags}>
                {repo.language && <span className={styles.tag}>{repo.language}</span>}
                <span className={styles.tag}>⭐ {repo.stargazers_count}</span>
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
