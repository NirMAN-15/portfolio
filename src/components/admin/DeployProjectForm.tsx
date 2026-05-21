"use client";

import { useActionState, useRef } from "react";
import { deployProject } from "@/app/admin/deployAction";
import styles from "@/app/admin/Admin.module.css";

export default function DeployProjectForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [state, formAction, isPending] = useActionState(async (prevState: any, formData: FormData) => {
    const res = await deployProject(formData);
    if (res?.success) {
      formRef.current?.reset();
    }
    return res;
  }, null);

  return (
    <section className={`glass-panel ${styles.formSection}`}>
      <h2>Automated Project Deployment</h2>
      <p style={{ color: "var(--text-secondary)", marginBottom: "1.5rem", fontSize: "0.9rem" }}>
        Upload a .zip file of your project. The system will create a GitHub repository, push your code, and inject a CI/CD workflow automatically.
      </p>

      <form action={formAction} ref={formRef} className={styles.form}>
        <div className={styles.inputGroup}>
          <label htmlFor="title">Project Title *</label>
          <input type="text" id="title" name="title" required placeholder="e.g. My Microservice" />
        </div>
        
        <div className={styles.inputGroup}>
          <label htmlFor="description">Description *</label>
          <textarea id="description" name="description" rows={3} required placeholder="What does this project do?" />
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="projectZip">Project ZIP Archive *</label>
          <input type="file" id="projectZip" name="projectZip" accept=".zip" required style={{ border: "1px dashed var(--accent-cyan)" }} />
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="coverImage">Cover Image (Optional)</label>
          <input type="file" id="coverImage" name="coverImage" accept="image/png, image/jpeg, image/webp" />
          <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>Upload a preview image to display on the project card.</p>
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="tags">Tags (comma separated)</label>
          <input type="text" id="tags" name="tags" placeholder="e.g. Node, React, CI/CD" />
        </div>

        {state?.error && (
          <p style={{ color: "#ff3366", fontSize: "0.9rem" }}>Error: {state.error}</p>
        )}
        
        {state?.success && (
          <p style={{ color: "var(--accent-cyan)", fontSize: "0.9rem" }}>Successfully deployed to GitHub and added to Portfolio!</p>
        )}

        <button type="submit" className={styles.submitBtn} disabled={isPending}>
          {isPending ? "Deploying Pipeline & Code..." : "Deploy to GitHub"}
        </button>
      </form>
    </section>
  );
}
