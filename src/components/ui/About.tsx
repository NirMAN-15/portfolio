"use client";

import { motion, type Variants } from "framer-motion";
import styles from "./About.module.css";

const skills = [
  {
    category: "Cloud & DevOps",
    icon: "☁️",
    tools: [
      "Docker & Compose",
      "Linux Server (Ubuntu/Debian)",
      "Nginx (Reverse Proxy & SSL)",
      "GitHub Actions (CI/CD)",
      "AWS & Microsoft Azure",
      "Bash Shell Scripting",
    ],
    color: "cyan",
  },
  {
    category: "Web & Mobile Engineering",
    icon: "📱",
    tools: [
      "React.js & Next.js",
      "Flutter (Android & iOS)",
      "Node.js & Express.js",
      "Vue.js & HTML5/CSS3",
      "Tailwind CSS",
      "RESTful APIs & State Mgmt",
    ],
    color: "green",
  },
  {
    category: "Databases & Architecture",
    icon: "🗄️",
    tools: [
      "PostgreSQL (Migrations & Indexing)",
      "MySQL (3NF Relational Modeling)",
      "SQLite (Offline-First)",
      "Supabase (Cloud PostgreSQL)",
      "Microservices Architecture",
      "Clean Architecture & GitOps",
    ],
    color: "magenta",
  },
  {
    category: "AI & Advanced Systems",
    icon: "🤖",
    tools: [
      "Model Context Protocol (MCP)",
      "Hugging Face Spaces",
      "Transformer Models (LLMs)",
      "Multilingual NLP Pipelines",
      "Prompt Engineering",
      "Conversational E-Commerce Bots",
    ],
    color: "cyan",
  },
  {
    category: "Programming Languages",
    icon: "💻",
    tools: [
      "TypeScript & JavaScript (ES6+)",
      "Python",
      "Go (Golang)",
      "Dart",
      "PHP & Java",
      "SQL",
    ],
    color: "green",
  },
  {
    category: "Education & Leadership",
    icon: "🎓",
    tools: [
      "NDT in IT - ITUM (Univ. of Moratuwa)",
      "Founder @ Vibe Solution",
      "AWS Practitioner (CLF-C02 path)",
      "Azure Fundamentals (AZ-900)",
      "Certified Chess Instructor (CFSL)",
      "ZeroPlastic Sustainability Leader",
    ],
    color: "magenta",
  },
];

const stats = [
  { label: "Production Uptime", value: "99.9%" },
  { label: "University", value: "ITUM" },
  { label: "Agency Founder", value: "Vibe Solution" },
  { label: "Tech Stack", value: "15+ Tools" },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export default function About() {
  return (
    <section id="about" className={styles.aboutContainer}>
      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7 }}
        className={styles.sectionHeader}
      >
        <p className={styles.sectionTag}>// profile &amp; credentials</p>
        <h2 className={styles.sectionTitle}>
          About <span className="text-gradient">Nirman Achintha</span>
        </h2>
      </motion.div>

      {/* Bio + Stats */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, delay: 0.1 }}
        className={`glass-panel ${styles.bioPanelWrapper}`}
      >
        <div className={styles.bioText}>
          <p>
            I am an Information Technology Undergraduate at the{" "}
            <strong>Institute of Technology, University of Moratuwa (ITUM)</strong> and the Founder &amp; Lead Systems Developer at{" "}
            <strong>Vibe Solution</strong> (vibesolution.tech). My engineering focus centers on cloud infrastructure, multi-container Docker orchestration, CI/CD pipeline automation, and resilient full-stack systems.
          </p>
          <p>
            From architecting national agritech platforms like{" "}
            <strong>ASVANNA</strong> (Aswenna) with predictive saturation engines and geo-fenced surplus trading, to engineering conversational e-commerce AI platforms powered by the{" "}
            <strong>Model Context Protocol (MCP)</strong> for Sri Lanka&apos;s largest shopping portal (Kapruka.com), I combine practical DevOps automation with robust software engineering to deliver high-availability, low-latency products.
          </p>
        </div>

        <div className={styles.statsGrid}>
          {stats.map((stat) => (
            <div key={stat.label} className={styles.statBox}>
              <span className={styles.statValue}>{stat.value}</span>
              <span className={styles.statLabel}>{stat.label}</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Skills Grid */}
      <motion.div
        className={styles.skillsHeader}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <p className={styles.sectionTag}>// technical competencies</p>
      </motion.div>

      <motion.div
        className={styles.skillsGrid}
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
      >
        {skills.map((skill) => (
          <motion.div
            key={skill.category}
            variants={cardVariants}
            className={`${styles.skillCard} ${styles[`card--${skill.color}`]}`}
            whileHover={{ y: -6, transition: { duration: 0.2 } }}
          >
            <div className={styles.skillCardHeader}>
              <span className={styles.skillIcon}>{skill.icon}</span>
              <h3 className={styles.skillCategory}>{skill.category}</h3>
            </div>
            <ul className={styles.toolList}>
              {skill.tools.map((tool) => (
                <li key={tool} className={styles.toolItem}>
                  <span className={styles.toolDot} />
                  {tool}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
