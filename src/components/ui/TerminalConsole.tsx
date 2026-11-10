"use client";

import { useState, useRef, useEffect } from "react";
import styles from "./TerminalConsole.module.css";

type CommandHistoryItem = {
  command: string;
  output: React.ReactNode;
};

const HELP_TEXT = (
  <div className={styles.outputBlock}>
    <p className={styles.accent}>Available operational commands:</p>
    <div className={styles.cmdGrid}>
      <div><span className={styles.highlight}>help</span> - Display this manual</div>
      <div><span className={styles.highlight}>whoami</span> - Display engineer profile</div>
      <div><span className={styles.highlight}>skills</span> - Enumerate tech stack &amp; tooling</div>
      <div><span className={styles.highlight}>projects</span> - List infrastructure &amp; git repositories</div>
      <div><span className={styles.highlight}>sites</span> - List live production websites</div>
      <div><span className={styles.highlight}>status</span> - Cluster health &amp; uptime diagnostics</div>
      <div><span className={styles.highlight}>ping</span> - Measure simulated network latency</div>
      <div><span className={styles.highlight}>contact</span> - Direct communication channels</div>
      <div><span className={styles.highlight}>clear</span> - Wipe terminal screen</div>
    </div>
  </div>
);

export default function TerminalConsole() {
  const [isOpen, setIsOpen] = useState(false);
  const [inputVal, setInputVal] = useState("");
  const [history, setHistory] = useState<CommandHistoryItem[]>([
    {
      command: "system --init",
      output: (
        <div>
          <p className={styles.success}>✓ NirMAN-15 DevOps Operational Console initialized.</p>
          <p className={styles.dim}>Type <span className={styles.highlight}>help</span> to view available system commands.</p>
        </div>
      ),
    },
  ]);

  const inputRef = useRef<HTMLInputElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen]);

  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
    }
  }, [history, isOpen]);

  const handleCommand = (rawCmd: string) => {
    const cmd = rawCmd.trim().toLowerCase();
    if (!cmd) return;

    if (cmd === "clear") {
      setHistory([]);
      setInputVal("");
      return;
    }

    let output: React.ReactNode = null;

    switch (cmd) {
      case "help":
        output = HELP_TEXT;
        break;
      case "whoami":
      case "about":
        output = (
          <div className={styles.outputBlock}>
            <p className={styles.cyan}><strong>Nirman Achintha Wedikkara</strong> | DevOps, Cloud &amp; Systems Engineer</p>
            <p className={styles.dim}>IT Undergraduate at Institute of Technology, University of Moratuwa (ITUM) &amp; Founder of Vibe Solution.</p>
            <p>📍 Colombo &amp; Bandarawela, Sri Lanka</p>
            <p>📞 Phone/WhatsApp: <a href="tel:+94788597202" className={styles.link}>+94 78 859 7202</a></p>
            <p>✉ Email: <a href="mailto:nirmanachintha1313@gmail.com" className={styles.link}>nirmanachintha1313@gmail.com</a></p>
            <p>🔗 LinkedIn: <a href="https://linkedin.com/in/w-nirman-achintha" target="_blank" rel="noreferrer" className={styles.link}>linkedin.com/in/w-nirman-achintha</a></p>
            <p>🐙 GitHub: <a href="https://github.com/NirMAN-15" target="_blank" rel="noreferrer" className={styles.link}>github.com/NirMAN-15</a></p>
          </div>
        );
        break;
      case "skills":
        output = (
          <div className={styles.outputBlock}>
            <p><span className={styles.cyan}>[Cloud &amp; DevOps]</span> Docker, Docker Compose, Linux VPS (Ubuntu/Debian), Nginx SSL, GitHub Actions CI/CD, AWS, Azure</p>
            <p><span className={styles.green}>[Web &amp; Mobile]</span> React.js, Next.js, Flutter, Node.js, Express.js, Vue.js, Tailwind CSS</p>
            <p><span className={styles.magenta}>[Databases]</span> PostgreSQL 15, MySQL (3NF), SQLite (Offline-First), Supabase</p>
            <p><span className={styles.cyan}>[AI &amp; MCP]</span> Model Context Protocol (MCP), Hugging Face Spaces, Transformers, Multilingual NLP</p>
            <p><span className={styles.green}>[Languages]</span> TypeScript, Python, Go (Golang), Dart, JavaScript, PHP, Java, SQL, Bash</p>
          </div>
        );
        break;
      case "projects":
        output = (
          <div className={styles.outputBlock}>
            <p className={styles.accent}>Featured Production Projects:</p>
            <p>1. <span className={styles.cyan}>ASVANNA (Aswenna)</span> - Agritech Market Platform (Docker Compose, PostgreSQL 15, Express, React, Flutter, Nginx SSL, Linux VPS)</p>
            <p>2. <span className={styles.green}>Kapruka AI Shopping Assistant</span> - Multilingual E-Commerce Assistant (React, Model Context Protocol MCP, Serverless Express, Vercel)</p>
            <p>3. <span className={styles.magenta}>Distribution Management System (DMS)</span> - Offline-First Flutter Mobile App with SQLite &amp; Supabase delta sync</p>
            <p>4. <span className={styles.cyan}>AI Learning Assistant</span> - Hugging Face Spaces &amp; Transformers</p>
            <p>5. <span className={styles.green}>Enterprise ERP Asset Management</span> - High-concurrency Go &amp; Vue.js</p>
            <p className={styles.dim}>Navigate to <a href="/projects" className={styles.link}>/projects</a> for full inspection.</p>
          </div>
        );
        break;
      case "sites":
        output = (
          <div className={styles.outputBlock}>
            <p className={styles.accent}>Live Production Services:</p>
            <p>• <a href="https://aswenna.vibesolution.tech/" target="_blank" rel="noreferrer" className={styles.link}>https://aswenna.vibesolution.tech/</a> [Aswenna Agritech Platform]</p>
            <p>• <a href="https://kapruka-ai-lake.vercel.app/" target="_blank" rel="noreferrer" className={styles.link}>https://kapruka-ai-lake.vercel.app/</a> [Kapruka AI Shopping Assistant]</p>
            <p>• <a href="https://vibesolution.tech/" target="_blank" rel="noreferrer" className={styles.link}>https://vibesolution.tech/</a> [Vibe Solution Agency Portal]</p>
            <p>• <a href="http://careerpath.fwh.is/" target="_blank" rel="noreferrer" className={styles.link}>http://careerpath.fwh.is/</a> [Career Path IT Diagnostics]</p>
            <p className={styles.dim}>Navigate to <a href="/sites" className={styles.link}>/sites</a> to view screenshots &amp; metrics.</p>
          </div>
        );
        break;
      case "status":
        output = (
          <div className={styles.outputBlock}>
            <p><span className={styles.green}>● SYSTEM STATUS:</span> ALL OPERATIONAL</p>
            <p>• Lead Architect: Nirman Achintha (ITUM University of Moratuwa)</p>
            <p>• Agency: Vibe Solution (vibesolution.tech)</p>
            <p>• Production Uptime: 99.9%</p>
            <p>• Container Engine: Docker Compose / Linux VPS</p>
            <p>• Ingress: Nginx Reverse Proxy with TLS/SSL</p>
          </div>
        );
        break;
      case "ping":
        output = (
          <div className={styles.outputBlock}>
            <p>64 bytes from aswenna.vibesolution.tech: icmp_seq=1 ttl=56 time=14.2 ms</p>
            <p>64 bytes from kapruka-ai-lake.vercel.app: icmp_seq=2 ttl=58 time=9.8 ms</p>
            <p>64 bytes from vibesolution.tech: icmp_seq=3 ttl=57 time=12.1 ms</p>
            <p className={styles.green}>--- 0% packet loss | min/avg/max = 9.8/12.0/14.2 ms ---</p>
          </div>
        );
        break;
      case "contact":
        output = (
          <div className={styles.outputBlock}>
            <p>📞 Phone/WhatsApp: <a href="tel:+94788597202" className={styles.link}>+94 78 859 7202</a></p>
            <p>✉ Email: <a href="mailto:nirmanachintha1313@gmail.com" className={styles.link}>nirmanachintha1313@gmail.com</a></p>
            <p>🔗 LinkedIn: <a href="https://linkedin.com/in/w-nirman-achintha" target="_blank" rel="noreferrer" className={styles.link}>in/w-nirman-achintha</a></p>
            <p>🐙 GitHub: <a href="https://github.com/NirMAN-15" target="_blank" rel="noreferrer" className={styles.link}>@NirMAN-15</a></p>
            <p>🌐 Web: <a href="https://vibesolution.tech" target="_blank" rel="noreferrer" className={styles.link}>vibesolution.tech</a></p>
          </div>
        );
        break;
      default:
        output = (
          <p className={styles.error}>
            zsh: command not found: {cmd}. Type <span className={styles.highlight}>help</span> for valid commands.
          </p>
        );
    }

    setHistory((prev) => [...prev, { command: rawCmd, output }]);
    setInputVal("");
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleCommand(inputVal);
    }
  };

  return (
    <>
      {/* Floating launcher trigger */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className={styles.launcherBtn}
        aria-label="Open DevOps Interactive Terminal"
        title="Interactive Terminal Console"
      >
        <span className={styles.launcherPrompt}>&gt;_</span>
        <span className={styles.launcherText}>{isOpen ? "Close CLI" : "Terminal"}</span>
      </button>

      {/* Terminal Modal Drawer */}
      {isOpen && (
        <div className={styles.terminalOverlay}>
          <div className={styles.terminalContainer}>
            {/* Window title bar */}
            <div className={styles.titleBar}>
              <div className={styles.windowControls}>
                <span className={`${styles.dot} ${styles.dotRed}`} onClick={() => setIsOpen(false)} />
                <span className={`${styles.dot} ${styles.dotYellow}`} />
                <span className={`${styles.dot} ${styles.dotGreen}`} />
              </div>
              <div className={styles.windowTitle}>nirman@devops-gateway: ~ (zsh)</div>
              <button className={styles.closeBtn} onClick={() => setIsOpen(false)}>✕</button>
            </div>

            {/* Scrollable output area */}
            <div ref={bodyRef} className={styles.terminalBody}>
              {history.map((item, idx) => (
                <div key={idx} className={styles.historyRow}>
                  <div className={styles.commandLine}>
                    <span className={styles.prompt}>nirman@ops:~$</span>
                    <span className={styles.commandText}>{item.command}</span>
                  </div>
                  <div className={styles.commandOutput}>{item.output}</div>
                </div>
              ))}

              {/* Active command prompt */}
              <div className={styles.activeCommandLine}>
                <span className={styles.prompt}>nirman@ops:~$</span>
                <input
                  ref={inputRef}
                  type="text"
                  value={inputVal}
                  onChange={(e) => setInputVal(e.target.value)}
                  onKeyDown={onKeyDown}
                  className={styles.terminalInput}
                  placeholder="type command (e.g. help, skills, ping)..."
                  autoFocus
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
