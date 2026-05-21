"use client";

import { motion } from "framer-motion";
import styles from "./About.module.css";

export default function About() {
  return (
    <section id="about" className={styles.aboutContainer}>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className={`glass-panel ${styles.contentWrapper}`}
      >
        <h2 className={styles.title}>System.out.println("About Me");</h2>
        <div className={styles.textContent}>
          <p>
            I am a Site Reliability Engineer and DevOps Specialist dedicated to architecting scalable, resilient, and secure cloud infrastructure. My expertise lies in automating complex delivery pipelines, optimizing system performance, and ensuring high availability for mission-critical applications.
          </p>
          <p>
            With a strong foundation in Infrastructure as Code (IaC) and container orchestration, I bridge the gap between development and operations. I advocate for GitOps methodologies, continuous integration, and proactive observability to drive engineering velocity while minimizing technical debt and operational risk.
          </p>
        </div>
        <div className={styles.skillsGrid}>
          <div className={styles.skillBox}>
            <h3>CI/CD</h3>
            <p>GitHub Actions, Jenkins, GitLab CI</p>
          </div>
          <div className={styles.skillBox}>
            <h3>Containers & Orchestration</h3>
            <p>Docker, Kubernetes, Helm</p>
          </div>
          <div className={styles.skillBox}>
            <h3>Infrastructure</h3>
            <p>AWS, Terraform, Ansible</p>
          </div>
          <div className={styles.skillBox}>
            <h3>Monitoring</h3>
            <p>Prometheus, Grafana, ELK Stack</p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
