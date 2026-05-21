import prisma from "@/lib/prisma";
import styles from "./page.module.css";

export const metadata = {
  title: "Live Sites | NirMAN-15 DevOps Portfolio",
  description: "Published and deployed websites by NirMAN-15 — DevOps & SRE Engineer.",
};

export const revalidate = 3600;

export default async function SitesPage() {
  const sites = await prisma.deployedSite.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <main className={styles.pageMain}>
      <div className={styles.pageHeader}>
        <p className={styles.preTitle}>// deployed &amp; live</p>
        <h1 className={styles.pageTitle}>
          Published <span className="text-gradient">Websites</span>
        </h1>
        <p className={styles.pageSubtitle}>
          Real-world applications I have built, shipped, and currently maintain in production.
        </p>
      </div>

      {sites.length === 0 ? (
        <div className={styles.emptyState}>
          <p className={styles.emptyIcon}>🚀</p>
          <p>No deployed sites yet. Add them from the Admin panel.</p>
        </div>
      ) : (
        <div className={styles.grid}>
          {sites.map((site) => (
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
                    <span className={styles.placeholderUrl}>{new URL(site.url).hostname}</span>
                  </div>
                )}
                <div className={styles.thumbnailOverlay}>
                  <span className={styles.visitLabel}>Visit Site →</span>
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
                    {site.techStack.split(",").map((tech) => (
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
      )}
    </main>
  );
}
