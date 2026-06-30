export const personalInfo = {
  name: "Muhammad Hammad",
  title: "Agentic AI Engineer",
  headline: "Building AI Employees, Agents & Intelligent Business Systems",
  subheadline:
    "Agentic AI Engineer specializing in AI Agents, OpenAI Agents SDK, MCP, RAG Systems, Automation, and Modern Full-Stack Development.",
  email: "hammad06999@gmail.com",
  whatsapp: "+92 316 2587298",
  social: {
    github: "https://github.com/code-with-hammad",
    linkedin: "https://www.linkedin.com/in/muhammad-hammad-31168b358/",
  },
  resumeUrl: "/resume.pdf",
};

export const aboutContent = {
  paragraphs: [
    {
      title: "The Problem",
      text: "Every business today faces the same silent crisis — manual workflows drowning in operational complexity. Data scattered across tools. Customer inquiries flooding support channels. Decisions delayed by information silos. The gap between intention and execution has never been wider.",
    },
    {
      title: "The Approach",
      text: "I just don't build premium interactive high ticket animated web. I build AI Employees — autonomous digital workers that think, act, and learn. Using advanced Agentic AI architectures, I create systems that reason through problems, execute multi-step workflows, and continuously improve from every interaction. Each system is an intelligent workforce, not just a tool.",
    },
    {
      title: "The Result",
      text: "10x operational leverage. 24/7 autonomous execution. Compound intelligence that grows with your business. Companies that deploy these systems don't just save time — they fundamentally reimagine what's possible. From lead scoring that predicts customer behavior to support agents that resolve 90%+ of issues independently.",
    },
  ],
  stats: [
    { label: "AI Systems Deployed", value: 47, suffix: "+" },
    { label: "Industries Served", value: 12, suffix: "+" },
    { label: "System Uptime", value: 99.2, suffix: "%", decimals: 1 },
    { label: "Automated Tasks", value: 3200000, suffix: "+", format: true },
  ],
};

export const capabilities = [
  { name: "OpenAI Agents SDK", category: "ai-agents", icon: "Bot" },
  { name: "MCP", category: "ai-agents", icon: "Cpu" },
  { name: "Google ADK", category: "ai-agents", icon: "Brain" },
  { name: "AI Agents", category: "ai-agents", icon: "Bot" },
  { name: "RAG Systems", category: "rag", icon: "Library" },
  { name: "Prompt Engineering", category: "rag", icon: "MessageSquare" },
  { name: "FastAPI", category: "backend", icon: "Server" },
  { name: "Python", category: "backend", icon: "Code2" },
  { name: "TypeScript", category: "backend", icon: "Code2" },
  { name: "Next.js", category: "frontend", icon: "Globe" },
  { name: "Node.js", category: "backend", icon: "Server" },
  { name: "Qdrant", category: "rag", icon: "Database" },
  { name: "NeonDB", category: "backend", icon: "Database" },
  { name: "n8n", category: "automation", icon: "Workflow" },
  { name: "AI Automation", category: "automation", icon: "Zap" },
  { name: "Chatbots", category: "ai-agents", icon: "MessageCircle" },
  { name: "OpenClaw", category: "automation", icon: "Claw" },
];

export const services = [
  {
    title: "AI Agents",
    description:
      "Intelligent autonomous agents that reason, plan, and execute complex tasks across your business systems.",
    features: [
      "Custom agent architectures",
      "Memory & context management",
      "Multi-agent orchestration",
      "Human-in-the-loop workflows",
    ],
  },
  {
    title: "AI Employees",
    description:
      "Dedicated digital workers trained on your business logic, operating 24/7 with continuous improvement.",
    features: [
      "Role-specific AI workers",
      "Autonomous task execution",
      "Performance analytics",
      "Scalable workforce management",
    ],
  },
  {
    title: "AI Automation",
    description:
      "End-to-end workflow automation that eliminates manual processes and reduces operational costs.",
    features: [
      "Process analysis & design",
      "Multi-tool integration",
      "Intelligent routing",
      "Real-time monitoring",
    ],
  },
  {
    title: "RAG Systems",
    description:
      "Retrieval-Augmented Generation systems that ground AI responses in your proprietary knowledge base.",
    features: [
      "Vector search pipelines",
      "Document ingestion",
      "Hybrid search (semantic + keyword)",
      "Multi-source knowledge integration",
    ],
  },
  {
    title: "AI Chatbots",
    description:
      "Context-aware conversational interfaces that provide instant, accurate responses across channels.",
    features: [
      "Multi-channel deployment",
      "Intent recognition",
      "Contextual conversation flow",
      "Escalation handling",
    ],
  },
  {
    title: "Custom SaaS Development",
    description:
      "Full-stack SaaS platforms with AI-native architecture, built for scale from day one.",
    features: [
      "Frontend architecture",
      "API design & development",
      "Database optimization",
      "Cloud deployment & scaling",
    ],
  },
  {
    title: "Full Stack Development",
    description:
      "Modern, performant web applications using cutting-edge frameworks and best practices.",
    features: [
      "Next.js / React applications",
      "TypeScript end-to-end",
      "API integration",
      "Performance optimization",
    ],
  },
  {
    title: "Business Workflow Automation",
    description:
      "Strategic automation of complex business processes connecting tools, data, and decisions.",
    features: [
      "Workflow mapping & design",
      "Tool integration (n8n, Zapier)",
      "Data synchronization",
      "Analytics & reporting",
    ],
  },
];

export const projects = [
  {
    title: "LeadPulse AI",
    subtitle: "AI Lead Scoring System",
    challenge:
      "A high-growth SaaS company was losing 70% of leads due to manual scoring processes. Sales teams wasted 40% of their time on low-quality leads, while high-intent prospects slipped through the cracks.",
    solution:
      "Built an autonomous AI agent that analyzes behavioral data, firmographics, engagement patterns, and historical conversion data in real-time. The system assigns dynamic lead scores and automatically routes high-value leads to the right sales rep within seconds.",
    architecture:
      "Multi-agent system using OpenAI Agents SDK with MCP integration. Lead data flows through a RAG pipeline enriched by Qdrant vector search, scored via ML models, and synced to CRM through automated n8n workflows.",
    results: [
      { label: "Lead Conversion", value: "312%", desc: "increase" },
      { label: "Response Time", value: "<30s", desc: "from 24 hours" },
      { label: "Revenue Impact", value: "$2.4M", desc: "additional pipeline" },
    ],
    tech: [
      "OpenAI Agents SDK",
      "MCP",
      "Qdrant",
      "n8n",
      "Next.js",
      "FastAPI",
      "NeonDB",
    ],
  },
  {
    title: "AI Research Agent",
    subtitle: "Autonomous Research & Analysis System",
    challenge:
      "A financial analytics firm needed to process 500+ research documents daily. Manual analysis was taking 40+ hours per week and missing critical market signals buried in unstructured data.",
    solution:
      "Developed an autonomous research agent that ingests documents, PDFs, web content, and data feeds. The agent performs multi-modal analysis, extracts key insights, generates structured reports, and alerts stakeholders to high-impact findings.",
    architecture:
      "RAG-based system with multi-source document ingestion. Google ADK orchestrates the agent pipeline, Qdrant powers semantic search across the knowledge base, and GPT-4o handles deep reasoning and report generation.",
    results: [
      { label: "Processing Speed", value: "50x", desc: "faster than manual" },
      { label: "Accuracy", value: "94.7%", desc: "insight extraction" },
      { label: "Hours Saved", value: "1,200+", desc: "per quarter" },
    ],
    tech: [
      "Google ADK",
      "RAG",
      "Qdrant",
      "OpenAI",
      "Python",
      "FastAPI",
      "NeonDB",
    ],
  },
  {
    title: "AI Customer Support Agent",
    subtitle: "Intelligent Support Automation",
    challenge:
      "An e-commerce platform was receiving 10,000+ support tickets monthly with only 12 human agents. Average resolution time was 48 hours, and customer satisfaction was dropping below 80%.",
    solution:
      "Deployed AI support agents that understand context, access order history, process returns, and resolve 87% of inquiries without human intervention. Complex issues are intelligently escalated with full conversation context.",
    architecture:
      "Multi-agent support system using OpenAI Agents SDK. Agents access a RAG pipeline with product catalog, policy docs, and order history via Qdrant. n8n automates ticket routing and CRM updates across Zendesk and Shopify.",
    results: [
      { label: "Auto-Resolution", value: "87%", desc: "of all tickets" },
      { label: "Response Time", value: "<2min", desc: "from 48 hours" },
      { label: "CSAT Score", value: "94.2", desc: "out of 100" },
    ],
    tech: [
      "OpenAI Agents SDK",
      "RAG",
      "Qdrant",
      "n8n",
      "Python",
      "FastAPI",
      "NeonDB",
    ],
  },
  {
    title: "RAG Knowledge Assistant",
    subtitle: "Enterprise Knowledge Management",
    challenge:
      "A legal firm with 30+ years of case documents was unable to leverage their institutional knowledge. Associates spent 60% of their time searching for precedents across disconnected databases.",
    solution:
      "Built a comprehensive RAG system that ingests, indexes, and makes searchable the entire document repository. Lawyers can ask natural language questions and receive cited, context-aware answers with source references.",
    architecture:
      "Enterprise RAG pipeline with multi-format document processing. Qdrant vector database powers semantic search across 500K+ documents. Custom chunking strategy preserves legal context. Fine-tuned embedding models for legal domain accuracy.",
    results: [
      { label: "Search Time", value: "95%", desc: "faster retrieval" },
      { label: "Document Coverage", value: "500K+", desc: "documents indexed" },
      { label: "Research Time Saved", value: "70%", desc: "reduction" },
    ],
    tech: [
      "RAG",
      "Qdrant",
      "OpenAI",
      "Python",
      "FastAPI",
      "NeonDB",
      "MCP",
    ],
  },
  {
    title: "AI Workflow Automation System",
    subtitle: "End-to-End Business Process Automation",
    challenge:
      "A logistics company was running 15+ manual processes across 8 different tools. Data entry errors caused 23% of shipments to have incorrect documentation, leading to $500K+ in annual penalties.",
    solution:
      "Designed and deployed a comprehensive automation system using n8n orchestration with AI decision nodes. The system automates data extraction, validation, cross-tool synchronization, and document generation with human oversight for exceptions.",
    architecture:
      "n8n as the orchestration layer connecting CRM, ERP, shipping platforms, and document management. AI agents powered by OpenAI handle unstructured data processing and decision-making throughout the workflow.",
    results: [
      { label: "Error Rate", value: "0.3%", desc: "from 23%" },
      { label: "Process Time", value: "87%", desc: "faster" },
      { label: "Annual Savings", value: "$480K", desc: "in penalties avoided" },
    ],
    tech: [
      "n8n",
      "OpenAI",
      "MCP",
      "Python",
      "FastAPI",
      "NeonDB",
      "Next.js",
    ],
  },
];

export const architectureFlow = [
  { id: "user", label: "User", icon: "User", description: "Natural language input or API request" },
  { id: "agent", label: "AI Agent", icon: "Brain", description: "Orchestrates reasoning, planning, and tool selection" },
  { id: "mcp", label: "MCP Layer", icon: "Cpu", description: "Model Context Protocol - standardized tool communication" },
  { id: "tools", label: "Tools", icon: "Wrench", description: "Function calls, APIs, web search, code execution" },
  { id: "knowledge", label: "Knowledge Base", icon: "Library", description: "Vector stores, documents, structured data" },
  { id: "qdrant", label: "Qdrant", icon: "Database", description: "Vector database for semantic search and retrieval" },
  { id: "neondb", label: "NeonDB", icon: "Database", description: "Serverless PostgreSQL for structured data" },
  { id: "response", label: "Response", icon: "MessageSquare", description: "Structured output, actions, and insights" },
];
