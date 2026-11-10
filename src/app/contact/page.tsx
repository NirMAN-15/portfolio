import styles from "./page.module.css";
import Contact from "@/components/ui/Contact";

export const metadata = {
  title: "Contact | Nirman Achintha Portfolio",
  description: "Get in touch with Nirman Achintha — DevOps, Cloud & Systems Engineer.",
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
