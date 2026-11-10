import type { Metadata } from "next";
import { Inter, Fira_Code } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/ui/Navbar";
import TerminalConsole from "@/components/ui/TerminalConsole";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const firaCode = Fira_Code({
  variable: "--font-fira-code",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Nirman Achintha | DevOps, Cloud & Systems Engineer Portfolio",
  description: "DevOps & Cloud Systems Engineer Portfolio of Nirman Achintha (Founder @ Vibe Solution, ITUM Moratuwa) featuring interactive 3D elements, automated CI/CD pipelines, and cloud-native architecture.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${firaCode.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#050511] text-slate-200">
        <Navbar />
        {children}
        <TerminalConsole />
      </body>
    </html>
  );
}
