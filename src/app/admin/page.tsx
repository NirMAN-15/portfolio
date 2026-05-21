import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import styles from "./Admin.module.css";
import Link from "next/link";
import DeployProjectForm from "@/components/admin/DeployProjectForm";
import DeployedSiteForm from "@/components/admin/DeployedSiteForm";
import { logoutAction } from "@/app/login/actions";

export const dynamic = 'force-dynamic';

// Server Action to delete a project
async function deleteProject(formData: FormData) {
  "use server";
  const id = parseInt(formData.get("id") as string, 10);
  if (id) {
    await prisma.project.delete({ where: { id } });
    revalidatePath("/");
    revalidatePath("/admin");
    revalidatePath("/projects");
  }
}

// Server Action to delete a deployed site
async function deleteSite(formData: FormData) {
  "use server";
  const id = parseInt(formData.get("id") as string, 10);
  if (id) {
    await prisma.deployedSite.delete({ where: { id } });
    revalidatePath("/sites");
    revalidatePath("/admin");
  }
}

export default async function AdminPage() {
  const [projects, sites] = await Promise.all([
    prisma.project.findMany({ orderBy: { createdAt: "desc" } }),
    prisma.deployedSite.findMany({ orderBy: { createdAt: "desc" } }),
  ]);

  return (
    <div className={styles.adminContainer}>
      <header className={styles.header}>
        <h1>Admin Control Panel</h1>
        <div style={{ display: "flex", gap: "1.5rem", alignItems: "center" }}>
          <Link href="/" className={styles.backLink}>← Back to Portfolio</Link>
          <form action={logoutAction}>
            <button type="submit" style={{ background: "transparent", border: "none", color: "var(--accent-magenta)", cursor: "pointer", fontWeight: "bold" }}>
              Logout
            </button>
          </form>
        </div>
      </header>

      <div className={styles.content}>
        {/* ── Section 1: Deploy a GitHub Project ── */}
        <DeployProjectForm />

        <section className={`glass-panel ${styles.listSection}`}>
          <h2>Manage Projects</h2>
          {projects.length === 0 ? (
            <p className={styles.empty}>No projects found in database.</p>
          ) : (
            <ul className={styles.projectList}>
              {projects.map(project => (
                <li key={project.id} className={styles.projectItem}>
                  <div>
                    <h3>{project.title}</h3>
                    <p>{project.tags}</p>
                  </div>
                  <form action={deleteProject}>
                    <input type="hidden" name="id" value={project.id} />
                    <button type="submit" className={styles.deleteBtn}>Delete</button>
                  </form>
                </li>
              ))}
            </ul>
          )}
        </section>

        {/* ── Section 2: Add Deployed Site ── */}
        <DeployedSiteForm />

        <section className={`glass-panel ${styles.listSection}`}>
          <h2>Manage Deployed Sites</h2>
          {sites.length === 0 ? (
            <p className={styles.empty}>No deployed sites yet. Add them above!</p>
          ) : (
            <ul className={styles.projectList}>
              {sites.map(site => (
                <li key={site.id} className={styles.projectItem}>
                  <div>
                    <h3>{site.title}</h3>
                    <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.8rem", color: "var(--accent-cyan)" }}>{site.url}</p>
                    <p style={{ fontSize: "0.8rem", color: "var(--text-secondary)", marginTop: "0.25rem" }}>{site.techStack}</p>
                  </div>
                  <form action={deleteSite}>
                    <input type="hidden" name="id" value={site.id} />
                    <button type="submit" className={styles.deleteBtn}>Delete</button>
                  </form>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </div>
  );
}
