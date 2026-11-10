"use client";

import { motion, type Variants } from "framer-motion";
import styles from "./Contact.module.css";

const contacts = [
  {
    icon: "✉",
    platform: "Email",
    handle: "nirmanachintha1313@gmail.com",
    href: "mailto:nirmanachintha1313@gmail.com",
    color: "cyan",
    description: "Direct email for inquiries & collaborations",
  },
  {
    icon: "📞",
    platform: "Mobile / WhatsApp",
    handle: "+94 78 859 7202",
    href: "tel:+94788597202",
    color: "green",
    description: "Voice calls & WhatsApp messaging",
  },
  {
    icon: "in",
    platform: "LinkedIn",
    handle: "w-nirman-achintha",
    href: "https://linkedin.com/in/w-nirman-achintha",
    color: "blue",
    description: "Professional network & endorsements",
  },
  {
    icon: "</>",
    platform: "GitHub",
    handle: "NirMAN-15",
    href: "https://github.com/NirMAN-15",
    color: "cyan",
    description: "Explore open-source repositories & IaC",
  },
  {
    icon: "🌐",
    platform: "Vibe Solution",
    handle: "vibesolution.tech",
    href: "https://vibesolution.tech",
    color: "magenta",
    description: "Founder & Lead Systems Developer portal",
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 25, scale: 0.96 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.45 } },
};

export default function Contact() {
  return (
    <section id="contact" className={styles.contactContainer}>
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className={styles.sectionHeader}
      >
        <p className={styles.sectionTag}>// communication channels</p>
        <h2 className={styles.sectionTitle}>Get In Touch</h2>
        <p className={styles.subtitle}>
          Open for DevOps, Cloud, AI &amp; Software Engineering internships, full-stack development, and architectural consultations.
        </p>
        <p className={styles.locationTag}>
          📍 Based in <strong>Colombo &amp; Bandarawela, Sri Lanka</strong> (Available for Remote &amp; On-Site)
        </p>
      </motion.div>

      <motion.div
        className={styles.linksGrid}
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {contacts.map((c) => (
          <motion.a
            key={c.platform}
            href={c.href}
            target={c.href.startsWith("mailto") || c.href.startsWith("tel") ? undefined : "_blank"}
            rel="noopener noreferrer"
            className={`${styles.contactCard} ${styles[`card--${c.color}`]}`}
            variants={cardVariants}
            whileHover={{ y: -6, transition: { duration: 0.2 } }}
          >
            <div className={styles.iconWrapper}>
              <span className={styles.icon}>{c.icon}</span>
            </div>
            <div className={styles.cardBody}>
              <h3 className={styles.platform}>{c.platform}</h3>
              <p className={styles.handle}>{c.handle}</p>
              <p className={styles.description}>{c.description}</p>
            </div>
            <span className={styles.arrow}>→</span>
          </motion.a>
        ))}
      </motion.div>

      {/* Availability indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4 }}
        className={styles.availabilityBanner}
      >
        <span className={styles.availDot} />
        <span>Currently actively seeking DevOps, Cloud &amp; SE opportunities</span>
        <span className={styles.availDot} />
      </motion.div>
    </section>
  );
}
