import styles from "./page.module.css";
import Projects from "@/components/ui/Projects";

export const metadata = {
  title: "Projects | NirMAN-15 DevOps Portfolio",
  description: "Browse all open-source repositories and DevOps projects by NirMAN-15.",
};

export default function ProjectsPage() {
  return (
    <main className={styles.pageMain}>
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>
          <span className="text-gradient">Projects</span> & Open Source
        </h1>
        <p className={styles.pageSubtitle}>
          GitHub repositories, automated deployments, and infrastructure code.
        </p>
      </div>
      <Projects />
    </main>
  );
}
