import prisma from "@/lib/prisma";
import styles from "./page.module.css";

export const metadata = {
  title: "Live Sites | Nirman Achintha Portfolio",
  description: "Published and deployed production applications by Nirman Achintha — DevOps, Cloud & Systems Engineer.",
};

export const revalidate = 3600;

function getHostname(urlStr: string) {
  try {
    return new URL(urlStr).hostname;
  } catch {
    return urlStr;
  }
}

const DEFAULT_SITES = [
  {
    id: 1,
    title: "Aswenna (ASVANNA)",
    url: "https://aswenna.vibesolution.tech/",
    description: "National agricultural market intelligence & zero-waste direct farmer trading platform designed for ITUM (University of Moratuwa).",
    techStack: "Docker, PostgreSQL, Node.js, React, Flutter, Nginx SSL, Linux VPS, GitHub Actions",
    featured: true,
  },
  {
    id: 2,
    title: "Kapruka AI Shopping Assistant",
    url: "https://kapruka-ai-lake.vercel.app/",
    description: "Conversational e-commerce intelligence assistant with Model Context Protocol (MCP) server integration and multilingual NLP.",
    techStack: "React.js, Express.js Serverless, Model Context Protocol (MCP), Multilingual NLP, Vercel",
    featured: true,
  },
  {
    id: 3,
    title: "Vibe Solution Agency Platform",
    url: "https://vibesolution.tech/",
    description: "Client web engineering portal, Linux cloud automation, and digital enterprise consultancy showcase.",
    techStack: "Next.js, React, Node.js, Linux Cloud VPS, Nginx, Docker, GitHub Actions",
    featured: true,
  },
  {
    id: 4,
    title: "Career Path (Career Compass)",
    url: "http://careerpath.fwh.is/",
    description: "Diagnostic IT career analytics engine with normalized 3NF MySQL schema handling high university onboarding concurrency.",
    techStack: "PHP, MySQL (3NF Normalized), JavaScript, HTML5/CSS3, Linux Hosting",
    featured: false,
  },
];

export default async function SitesPage() {
  let sites: any[] = [];
  try {
    sites = await prisma.deployedSite.findMany({
      orderBy: { createdAt: "desc" },
    });
  } catch (err) {
    console.error("Error fetching deployed sites:", err);
  }

  const displaySites = sites.length > 0 ? sites : DEFAULT_SITES;

  return (
    <main className={styles.pageMain}>
      <div className={styles.pageHeader}>
        <p className={styles.preTitle}>// deployed &amp; operational</p>
        <h1 className={styles.pageTitle}>
          Published <span className="text-gradient">Production Services</span>
        </h1>
        <p className={styles.pageSubtitle}>
          Real-world applications engineered, containerized, and deployed by Nirman Achintha.
        </p>
      </div>

      <div className={styles.grid}>
        {displaySites.map((site) => (
            <a
              key={site.id}
              href={site.url}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.siteCard}
            >
              {/* Thumbnail */}
              <div className={styles.thumbnailWrapper}>
                {site.thumbnail ? (
                  <img
                    src={site.thumbnail}
                    alt={`${site.title} thumbnail`}
                    className={styles.thumbnail}
                  />
                ) : (
                  <div className={styles.thumbnailPlaceholder}>
                    <span className={styles.placeholderGlobe}>🌐</span>
                    <span className={styles.placeholderUrl}>{getHostname(site.url)}</span>
                  </div>
                )}
                <div className={styles.thumbnailOverlay}>
                  <span className={styles.visitLabel}>Visit Live Site →</span>
                </div>
              </div>

              {/* Content */}
              <div className={styles.cardContent}>
                <div className={styles.cardHeader}>
                  <h2 className={styles.cardTitle}>{site.title}</h2>
                  <span className={styles.liveIndicator}>
                    <span className={styles.liveBlip}></span>
                    LIVE
                  </span>
                </div>

                <p className={styles.cardUrl}>{site.url}</p>
                <p className={styles.cardDescription}>{site.description}</p>

                {/* Tech Stack */}
                <div className={styles.techStackSection}>
                  <p className={styles.techLabel}>Tech Stack</p>
                  <div className={styles.techBadges}>
                    {site.techStack.split(",").map((tech: string) => (
                      <span key={tech.trim()} className={styles.techBadge}>
                        {tech.trim()}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>
    </main>
  );
}
