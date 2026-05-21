import styles from "./page.module.css";
import Contact from "@/components/ui/Contact";

export const metadata = {
  title: "Contact | NirMAN-15 DevOps Portfolio",
  description: "Get in touch with NirMAN-15 — DevOps & SRE Engineer.",
};

export default function ContactPage() {
  return (
    <main className={styles.pageMain}>
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>
          <span className="text-gradient">Get In Touch</span>
        </h1>
        <p className={styles.pageSubtitle}>
          Open for collaborations, opportunities, and architectural discussions.
        </p>
      </div>
      <Contact />
    </main>
  );
}
