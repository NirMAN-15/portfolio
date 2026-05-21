"use client";

import { motion } from "framer-motion";
import styles from "./Hero.module.css";

export default function Hero() {
  return (
    <section className={styles.heroContainer}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className={styles.heroContent}
      >
        <p className={styles.greeting}>Initialize system...</p>
        <h1 className={styles.title}>
          Hi, I'm <span className="text-gradient">NirMAN</span>
        </h1>
        <h2 className={styles.subtitle}>DevOps Engineer & Automation Expert</h2>
        <p className={styles.description}>
          I build robust, scalable infrastructure, architect CI/CD pipelines, and bring cloud-native applications to life. Welcome to my operational environment.
        </p>
        
        <div className={styles.buttonGroup}>
          <a href="#projects" className={styles.primaryButton}>
            View Deployments
          </a>
          <a href="https://github.com/NirMAN-15" target="_blank" rel="noreferrer" className={styles.secondaryButton}>
            Access GitHub
          </a>
        </div>
      </motion.div>
    </section>
  );
}
