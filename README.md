# <div align="center">Next.js Portfolio | DevOps & Cyberpunk Aesthetic</div>

<div align="center">
  <img src="https://img.shields.io/badge/Next.js-15.0-black?style=for-the-badge&logo=next.js&logoColor=white" alt="Next.js" />
  <img src="https://img.shields.io/badge/React-19.0-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white" alt="Prisma" />
  <img src="https://img.shields.io/badge/SQLite-07405E?style=for-the-badge&logo=sqlite&logoColor=white" alt="SQLite" />
</div>

<br />

A highly dynamic, multi-page personal portfolio built for a **DevOps Engineer**. It features a modern Cyberpunk/Glassmorphism design, a fully functional local CMS, an automated GitHub project deployment pipeline, and a gallery for live websites.

## ✨ Features

- **Cyberpunk / Glassmorphism UI**: Neon accents, floating nodes, and a sleek dark mode design.
- **Dynamic 3D Hero Section**: Interactive nodes representing tech stacks and CI/CD pipelines.
- **Admin Dashboard & Local CMS**: 
  - Manage live websites and GitHub projects directly from the `/admin` panel.
  - SQLite backend using `better-sqlite3` and `Prisma`.
- **Live Sites Showcase (`/sites`)**: A gallery for deployed websites with thumbnails, live indicators, and tech stack badges.
- **Automated Deployments**: Custom Server Actions to initialize GitHub repos and inject CI/CD pipelines right from the admin form.
- **Multi-Page Architecture**: Dedicated pages for Projects, Live Sites, and Contact info.

## 🚀 Getting Started

### Prerequisites
- Node.js 18.x or later
- npm or yarn

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/NirMAN-15/portfolio.git
   cd portfolio
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up the database:**
   Ensure Prisma generates the client and syncs the schema with SQLite:
   ```bash
   npx prisma generate
   npx prisma db push
   ```

4. **Start the development server:**
   ```bash
   npm run dev
   ```

5. **Access the application:**
   - **Frontend:** `http://localhost:3000`
   - **Admin Panel:** `http://localhost:3000/admin` 
   - **Login Password:** `admin123` (Configured in `.env`)

## 🛠️ Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Database**: [SQLite](https://www.sqlite.org/) with [better-sqlite3](https://github.com/WiseLibs/better-sqlite3)
- **ORM**: [Prisma v7](https://www.prisma.io/)
- **Styling**: Vanilla CSS Modules (Glassmorphism & Neon Design System)
- **Icons**: React Icons (Lucide / Phosphor styles)

## 📂 Project Structure

- `src/app/`: Next.js App Router pages (`/`, `/projects`, `/sites`, `/admin`, `/contact`)
- `src/components/`: Reusable UI components (Navbar, Admin Forms, LiveSiteCards)
- `src/lib/`: Core utilities (Prisma Client singleton)
- `prisma/`: Prisma schema and database configuration

## 📜 License

This project is open-source and available under the [MIT License](LICENSE).
"# portfolio" 
