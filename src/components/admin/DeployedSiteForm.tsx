"use client";

import { useActionState } from "react";
import { addDeployedSite } from "@/app/admin/siteAction";
import styles from "@/app/admin/Admin.module.css";

type SiteActionState = { error?: string; success?: boolean } | null;

const initialState: SiteActionState = null;

export default function DeployedSiteForm() {
  const [state, formAction, isPending] = useActionState(
    async (_prev: SiteActionState, formData: FormData): Promise<SiteActionState> => {
      return await addDeployedSite(formData);
    },
    initialState
  );

  return (
    <section className={`glass-panel ${styles.formSection}`}>
      <h2 className={styles.formTitle}>
        <span className={styles.titleIcon}>🌐</span> Add Deployed Website
      </h2>
      <p className={styles.formSubtitle}>
        Showcase your published sites like <code>careerpath.fwh.is</code>, <code>vibesolution.tech</code>, etc.
      </p>

      <form action={formAction} className={styles.form}>
        <div className={styles.inputGroup}>
          <label htmlFor="site_title">Site Name *</label>
          <input type="text" id="site_title" name="site_title" placeholder="e.g. CareerPath" required />
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="site_url">Live URL *</label>
          <input type="url" id="site_url" name="site_url" placeholder="https://careerpath.fwh.is" required />
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="site_description">Description *</label>
          <textarea id="site_description" name="site_description" rows={3} placeholder="Explain what this site does, who it's for, and key features..." required />
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="site_techStack">Tech Stack (comma separated) *</label>
          <input type="text" id="site_techStack" name="site_techStack" placeholder="e.g. Next.js, Node.js, Docker, PostgreSQL" required />
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="site_thumbnail">Thumbnail / Screenshot (Optional)</label>
          <input type="file" id="site_thumbnail" name="site_thumbnail" accept="image/png, image/jpeg, image/webp" style={{ border: "1px dashed var(--accent-magenta)" }} />
          <p style={{ fontSize: "0.8rem", color: "var(--text-secondary)", marginTop: "0.25rem" }}>
            Upload a screenshot of the live site.
          </p>
        </div>

        {state?.error && (
          <p style={{ color: "var(--accent-magenta)", background: "rgba(255,0,128,0.1)", padding: "0.75rem", borderRadius: "6px" }}>
            {state.error}
          </p>
        )}
        {state?.success && (
          <p style={{ color: "var(--accent-green)", background: "rgba(0,255,102,0.1)", padding: "0.75rem", borderRadius: "6px" }}>
            ✅ Site added successfully! It is now live on the /sites page.
          </p>
        )}

        <button type="submit" className={styles.submitBtn} disabled={isPending}>
          {isPending ? "Adding..." : "🌐 Add to Portfolio"}
        </button>
      </form>
    </section>
  );
}
