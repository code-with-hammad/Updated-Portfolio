import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { Navigation } from "@/components/ui/navigation";
import { Footer } from "@/components/ui/footer";
import { JsonLdSchema } from "@/components/ui/json-ld";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Muhammad Hammad | Agentic AI Engineer",
  description:
    "Building AI Employees, Agents & Intelligent Business Systems. Specializing in AI Agents, OpenAI Agents SDK, MCP, RAG Systems, Automation, and Modern Full-Stack Development.",
  keywords: [
    "AI Engineer",
    "AI Agents",
    "OpenAI Agents SDK",
    "MCP",
    "RAG",
    "Automation",
    "Full Stack Developer",
    "AI Systems",
    "Agentic AI",
  ],
  authors: [{ name: "Muhammad Hammad" }],
  creator: "Muhammad Hammad",
  publisher: "Muhammad Hammad",
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "Muhammad Hammad | Agentic AI Engineer",
    description: "Building AI Employees, Agents & Intelligent Business Systems",
    siteName: "Muhammad Hammad Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Muhammad Hammad | Agentic AI Engineer",
    description: "Building AI Employees, Agents & Intelligent Business Systems",
  },
};

export const viewport: Viewport = {
  themeColor: "#030305",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <a
          href="#main-content"
          className="fixed -top-20 left-4 z-[100] px-4 py-2 rounded-xl bg-primary text-primary-foreground text-sm font-medium transition-all duration-300 focus:top-4"
        >
          Skip to main content
        </a>
        <JsonLdSchema />
        <Providers>
          <Navigation />
          <div id="main-content" className="flex-1">{children}</div>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
