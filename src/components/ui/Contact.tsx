"use client";

import { motion } from "framer-motion";
import styles from "./Contact.module.css";
import Link from "next/link";

export default function Contact() {
  return (
    <section id="contact" className={styles.contactContainer}>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className={`glass-panel ${styles.contentWrapper}`}
      >
        <h2 className={styles.title}>Initiate Connection</h2>
        <p className={styles.subtitle}>
          Open for opportunities, collaborations, and architectural discussions.
        </p>

        <div className={styles.linksGrid}>
          <a href="https://github.com/NirMAN-15" target="_blank" rel="noopener noreferrer" className={styles.contactCard}>
            <div className={styles.icon}>&lt;/&gt;</div>
            <h3>GitHub</h3>
            <p>NirMAN-15</p>
          </a>
          
          <a href="https://linkedin.com/in/nirman-devops" target="_blank" rel="noopener noreferrer" className={styles.contactCard}>
            <div className={styles.icon}>in</div>
            <h3>LinkedIn</h3>
            <p>Connect with me</p>
          </a>

          <a href="mailto:contact@nirman.dev" className={styles.contactCard}>
            <div className={styles.icon}>@</div>
            <h3>Email</h3>
            <p>contact@nirman.dev</p>
          </a>
        </div>
      </motion.div>
    </section>
  );
}
