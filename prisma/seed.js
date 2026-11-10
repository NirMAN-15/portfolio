const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database with Nirman Achintha's true CV & project data...");

  // Upsert True Profile
  await prisma.profile.upsert({
    where: { id: 1 },
    update: {
      name: "Nirman Achintha Wedikkara",
      bio: "Performance-driven Information Technology Undergraduate at Institute of Technology, University of Moratuwa (ITUM) & Founder of Vibe Solution. Specializing in DevOps, Cloud Infrastructure, Docker containerization, CI/CD automation, and Full-Stack Systems Engineering.",
      email: "nirmanachintha1313@gmail.com",
      phone: "+94 78 859 7202",
      location: "Colombo & Bandarawela, Sri Lanka",
      github: "https://github.com/NirMAN-15",
      linkedin: "https://linkedin.com/in/w-nirman-achintha",
    },
    create: {
      id: 1,
      name: "Nirman Achintha Wedikkara",
      bio: "Performance-driven Information Technology Undergraduate at Institute of Technology, University of Moratuwa (ITUM) & Founder of Vibe Solution. Specializing in DevOps, Cloud Infrastructure, Docker containerization, CI/CD automation, and Full-Stack Systems Engineering.",
      email: "nirmanachintha1313@gmail.com",
      phone: "+94 78 859 7202",
      location: "Colombo & Bandarawela, Sri Lanka",
      github: "https://github.com/NirMAN-15",
      linkedin: "https://linkedin.com/in/w-nirman-achintha",
    },
  });

  // Reset and seed Deployed Sites with user's verified live links
  await prisma.deployedSite.deleteMany({});
  await prisma.deployedSite.createMany({
    data: [
      {
        title: "Aswenna (ASVANNA) Agritech Platform",
        url: "https://aswenna.vibesolution.tech/",
        description: "National agricultural market intelligence and zero-waste platform engineered for ITUM (University of Moratuwa). Features multi-container Docker orchestration, predictive saturation risk engine, and a 5km geo-fenced surplus trading marketplace.",
        techStack: "Docker Compose, PostgreSQL 15, Node.js/Express, React 18, Flutter, Nginx SSL, Linux VPS, GitHub Actions",
        featured: true,
      },
      {
        title: "Kapruka AI Shopping Assistant",
        url: "https://kapruka-ai-lake.vercel.app/",
        description: "Intelligent multilingual conversational shopping assistant supporting English, Sinhala, and Tanglish for Sri Lanka's largest e-commerce platform (Kapruka.com). Connects React to serverless proxies using Model Context Protocol (MCP) for real-time catalog querying.",
        techStack: "React.js, Express.js Serverless, Model Context Protocol (MCP), Multilingual NLP, Vercel",
        featured: true,
      },
      {
        title: "Vibe Solution Agency Portal",
        url: "https://vibesolution.tech/",
        description: "Official web presence of Vibe Solution. High-performance cloud hosting on Linux VPS (Ubuntu/Debian), automated SSL renewal, DNS management, Nginx reverse proxy, and custom client AI workflow integrations.",
        techStack: "Next.js, React, Node.js, Linux Cloud VPS, Nginx, Docker, GitHub Actions CI/CD",
        featured: true,
      },
      {
        title: "Career Path (Career Compass)",
        url: "http://careerpath.fwh.is/",
        description: "Diagnostic IT career analytics and aptitude evaluation platform for undergraduates. Engineered with a normalized 3NF MySQL schema with automated backups and deployed on Linux cloud hosting handling high concurrency during university launches.",
        techStack: "PHP, MySQL (3NF Normalized), JavaScript, HTML5/CSS3, Linux Hosting",
        featured: true,
      },
    ],
  });
  console.log("Seeded verified deployed sites.");

  // Reset and seed Featured Projects from CV
  await prisma.project.deleteMany({});
  await prisma.project.createMany({
    data: [
      {
        title: "ASVANNA - Agritech Intelligence & Zero-Waste Platform",
        description: "Flagship ITUM national agricultural platform. Containerized PostgreSQL, Express REST API, and React frontend with Docker Compose. Automated GitHub Actions CI pipeline and deployed to Linux VPS with Nginx SSL. Includes pre-cultivation saturation calculator and geo-fenced surplus marketplace.",
        repoUrl: "https://github.com/NirMAN-15/asvanna",
        liveUrl: "https://aswenna.vibesolution.tech/",
        tags: "Docker Compose, PostgreSQL 15, Express.js, React 18, Flutter, GitHub Actions, Nginx, Linux VPS",
        featured: true,
      },
      {
        title: "Kapruka AI Conversational Shopping Assistant",
        description: "AI-powered conversational e-commerce interface integrating Model Context Protocol (MCP) server for live product catalog querying, intent clarification, and multilingual NLP support (English, Sinhala, Tanglish) on Vercel serverless architecture.",
        repoUrl: "https://github.com/NirMAN-15",
        liveUrl: "https://kapruka-ai-lake.vercel.app/",
        tags: "React.js, Serverless Express, Model Context Protocol (MCP), Multilingual NLP, Vercel",
        featured: true,
      },
      {
        title: "Distribution Management System (DMS) - Offline-First",
        description: "Enterprise mobile suite for field sales representatives built with Flutter and local SQLite database for uninterrupted order processing in remote offline zones. Features automated morning sync to Supabase PostgreSQL and wireless Bluetooth ESC/POS receipt printing.",
        repoUrl: "https://github.com/NirMAN-15",
        liveUrl: null,
        tags: "Flutter, SQLite, Supabase, PostgreSQL, Node.js, ESC/POS Bluetooth",
        featured: true,
      },
      {
        title: "AI Learning Assistant & Educational NLP Engine",
        description: "Educational AI assistant deployed on Hugging Face Spaces utilizing open-source transformer models and NLP pipelines to provide structured coding solutions, computer science conceptual tutorials, and student doubt resolution.",
        repoUrl: "https://github.com/NirMAN-15",
        liveUrl: null,
        tags: "Python, Hugging Face Spaces, Transformers, LLMs, Prompt Engineering",
        featured: true,
      },
      {
        title: "Enterprise ERP Asset Management Module",
        description: "Full-stack corporate asset tracking services engineered in Go (Golang) and Vue.js for managing company hardware inventory, lifecycle status transitions, disposal records, and searchable audit trails with strict concurrency consistency.",
        repoUrl: "https://github.com/NirMAN-15",
        liveUrl: null,
        tags: "Go (Golang), Vue.js, RESTful API, Enterprise Architecture, Audit Trails",
        featured: true,
      },
      {
        title: "Career Path (Career Compass) Analytics Engine",
        description: "IT aptitude diagnostic platform developed with normalized 3NF MySQL relational database and deployed to Linux cloud server. Successfully supported university student onboarding waves with low-latency response times.",
        repoUrl: "https://github.com/NirMAN-15",
        liveUrl: "http://careerpath.fwh.is/",
        tags: "PHP, MySQL 3NF, JavaScript, HTML5/CSS3, Linux Hosting",
        featured: true,
      },
    ],
  });
  console.log("Seeded verified projects.");

  console.log("Seeding complete with 100% authentic CV data!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
