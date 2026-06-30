import { personalInfo } from "@/lib/constants";

export function JsonLdSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: personalInfo.name,
    jobTitle: personalInfo.title,
    description: personalInfo.headline,
    email: personalInfo.email,
    url: "https://hammad-portfolio.vercel.app",
    sameAs: [
      personalInfo.social.github,
      personalInfo.social.linkedin,
    ],
    knowsAbout: [
      "AI Agents",
      "OpenAI Agents SDK",
      "MCP",
      "RAG Systems",
      "Prompt Engineering",
      "Full Stack Development",
      "Next.js",
      "Python",
      "FastAPI",
      "Qdrant",
      "NeonDB",
      "n8n",
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
