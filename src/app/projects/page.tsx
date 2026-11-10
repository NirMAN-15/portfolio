import styles from "./page.module.css";
import Projects from "@/components/ui/Projects";

export const metadata = {
  title: "Projects | Nirman Achintha Portfolio",
  description: "Browse engineering repositories, production architectures, and open-source systems by Nirman Achintha.",
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
