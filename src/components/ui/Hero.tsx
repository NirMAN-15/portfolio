"use client";

import { useState, useEffect } from "react";
import { motion, type Variants } from "framer-motion";
import styles from "./Hero.module.css";

const TYPED_STRINGS = [
  "DevOps & Cloud Engineer",
  "Full-Stack Systems Developer",
  "Founder @ Vibe Solution",
  "IT Undergraduate @ ITUM",
  "AI & Automation Specialist",
];

function TypewriterText() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    const current = TYPED_STRINGS[currentIndex];
    const speed = isDeleting ? 35 : 70;

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setDisplayText(current.slice(0, charIndex + 1));
        setCharIndex((c) => c + 1);
        if (charIndex + 1 === current.length) {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        setDisplayText(current.slice(0, charIndex - 1));
        setCharIndex((c) => c - 1);
        if (charIndex - 1 === 0) {
          setIsDeleting(false);
          setCurrentIndex((i) => (i + 1) % TYPED_STRINGS.length);
        }
      }
    }, speed);

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, currentIndex]);

  return (
    <span className={styles.typewriter}>
      {displayText}
      <span className={styles.cursor}>_</span>
    </span>
  );
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.15 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 25 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function Hero() {
  return (
    <section className={styles.heroContainer}>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className={styles.heroContent}
      >
        <motion.p variants={itemVariants} className={styles.greeting}>
          <span className={styles.greetingDot} />
          SYSTEM ONLINE — ALL SERVICES OPERATIONAL
        </motion.p>

        <motion.h1 variants={itemVariants} className={styles.title}>
          Hi, I&apos;m <span className="text-gradient">Nirman Achintha</span>
        </motion.h1>

        <motion.h2 variants={itemVariants} className={styles.subtitle}>
          <TypewriterText />
        </motion.h2>

        <motion.p variants={itemVariants} className={styles.description}>
          IT Undergraduate at <strong>University of Moratuwa (ITUM)</strong> &amp; Founder of{" "}
          <strong className={styles.vibeHighlight}>Vibe Solution</strong>. I architect resilient cloud infrastructure, orchestrate multi-container Docker microservices, build automated CI/CD pipelines, and engineer intelligent full-stack systems.
        </motion.p>

        <motion.div variants={itemVariants} className={styles.terminalSnippet}>
          <span className={styles.termPrompt}>❯</span>
          <span className={styles.termCmd}>docker compose ps &amp;&amp; kubectl get nodes</span>
          <span className={styles.termOutput}> # Cluster Ready (100% Uptime) ✓</span>
        </motion.div>

        <motion.div variants={itemVariants} className={styles.buttonGroup}>
          <a href="#projects" className={styles.primaryButton}>
            <span className={styles.btnIcon}>⚡</span>
            View Deployments
          </a>
          <a
            href="/Nirman_Achintha_CV.pdf"
            download="Nirman_Achintha_CV.pdf"
            className={styles.downloadButton}
            title="Download Nirman's Official Curriculum Vitae"
          >
            <span className={styles.btnIcon}>📄</span>
            Download CV
          </a>
          <a
            href="https://github.com/NirMAN-15"
            target="_blank"
            rel="noreferrer"
            className={styles.secondaryButton}
          >
            <span className={styles.btnIcon}>&lt;/&gt;</span>
            GitHub
          </a>
        </motion.div>

        <motion.div variants={itemVariants} className={styles.statusRow}>
          {[
            "Docker Compose",
            "Linux VPS",
            "GitHub Actions CI/CD",
            "PostgreSQL",
            "React / Next.js",
            "Python / Go",
          ].map((tool) => (
            <span key={tool} className={styles.statusBadge}>
              <span className={styles.statusDot} />
              {tool}
            </span>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className={styles.scrollHint}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
      >
        <span className={styles.scrollText}>SCROLL</span>
        <span className={styles.scrollArrow}>↓</span>
      </motion.div>
    </section>
  );
}
