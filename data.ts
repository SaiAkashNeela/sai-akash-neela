import { ResumeData } from './types';

// Helper to generate a placeholder contribution graph
const generateGitHistory = () => {
  const data = [];
  const today = new Date();
  for (let i = 180; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const count = Math.random() > 0.3 ? Math.floor(Math.random() * 8) : 0;
    data.push({
      date: d.toISOString().split('T')[0],
      count: count
    });
  }
  return data;
};

const getFavicon = (domain: string) => `https://www.google.com/s2/favicons?domain=${domain}&sz=128`;

export const resumeData: ResumeData = {
  name: "Akash",
  fullName: "Sai Akash Neela",
  title: "AI & Cloud Operations Engineer",
  contact: {
    email: "saiakashneela@outlook.com",
    phone: "+44 7767934364",
    linkedin: "linkedin.com/in/saiakashneela",
    github: "github.com/saiakashneela",
    x: "x.com/TheSaiAkash",
    medium: "medium.com/@saiakashneela",
    resume: "mega.nz/file/7mwEAKKC#hDrk6LGlggYFBEgZzm3EXU7spPxuABERVpp7zCjTckw",
    location: "United Kingdom"
  },
  summary: "AI & DevOps Engineer obsessed with designing and deploying intelligent, self-healing systems. I leverage AI agents, MCP tooling, and modern cloud primitives (AWS, Cloudflare, Tauri/Rust) to build and operate high-performance software fast. Experienced in orchestrating RAG pipelines, REST/GraphQL APIs, distributed data stores, and automated DevOps workflows.",
  experience: [
    {
      company: "Bell Soft LTD",
      role: "Lead DevOps Engineer",
      period: "2024 - Present",
      logo: getFavicon("bellsoft.co.uk"),
      link: "https://bellsoft.co.uk",
      description: "Designed resilient CI/CD pipelines and orchestrated multi-cloud infrastructure across AWS and Azure environments.",
      highlights: [
        "Engineered end-to-end CI/CD pipelines using Jenkins, GitHub Actions, and Azure DevOps.",
        "Orchestrated production Kubernetes clusters (EKS) with Prometheus and Grafana telemetry.",
        "Penned comprehensive Infrastructure as Code (IaC) utilizing AWS CloudFormation and Terraform.",
        "Automated continuous vulnerability scanning and container security patch pipelines with Snyk.",
        "Streamlined frontend SPA deployments on AWS S3 and CloudFront with edge routing."
      ]
    },
    {
      company: "Qapita Pte Ltd",
      role: "DevOps Engineer",
      period: "2022 - 2024",
      logo: getFavicon("qapita.com"),
      link: "https://qapita.com",
      description: "Ensured seamless multi-region deployments and maintained database health for equity management platform.",
      highlights: [
        "Administered mission-critical databases (MongoDB, PostgreSQL) with automated point-in-time recovery.",
        "Authored infrastructure automation tools and healthcheck daemons in Python and Bash.",
        "Containerized core microservices with Docker and orchestrated blue-green deployments.",
        "Designed CI/CD delivery pipelines reducing deployment rollback rates significantly."
      ]
    },
    {
      company: "Uniquode",
      role: "Junior DevOps & Software Engineer",
      period: "2021 - 2022",
      logo: getFavicon("uniquode.io"),
      link: "https://uniquode.io",
      description: "Started career developing full-stack features and learning cloud infrastructure management.",
      highlights: [
        "Wrote automation scripts in Python and Bash for routine ops workflows.",
        "Contributed to frontend web applications using React, HTML5, and CSS3.",
        "Provisioned and monitored baseline AWS EC2 instances and networking security groups."
      ]
    }
  ],
  indieKit: [
    "BetterAuth",
    "PostgreSQL",
    "MongoDB",
    "Bun",
    "Cloudflare Workers",
    "React + Vite",
    "Tauri + Rust",
    "Next.js"
  ],
  skills: {
    "Cloud & Infrastructure": ["AWS (ECS, RDS, S3)", "Cloudflare (Workers, R2, Tunnels)", "Azure", "DigitalOcean", "Hetzner", "Railway"],
    "DevOps & AI Ops": ["Docker", "Kubernetes (EKS)", "Dokploy", "Coolify", "RAG Pipelines", "MCP Servers", "CI/CD Actions"],
    "Engineering & Frameworks": ["React 19", "TypeScript", "Tauri / Rust", "Node.js", "Python", "Tailwind CSS", "PostgreSQL", "MongoDB"],
    "Telemetry & Automation": ["n8n", "Prometheus", "Grafana", "New Relic", "Snyk", "Git & GitHub CLI"]
  },
  projects: [
    {
      title: "BucketStack",
      description: "Open source, cross-platform S3 bucket desktop manager for macOS, Windows & Linux. A blisteringly fast native GUI that treats cloud storage like a local filesystem.",
      status: "Open Source",
      tech: ["Tauri", "Rust", "React", "TypeScript", "Tailwind"],
      icon: getFavicon("bucketstack.app"),
      link: "https://bucketstack.app",
      githubUrl: "https://github.com/SaiAkashNeela/bucketstack",
      featured: true,
      highlightText: "Native Rust performance with zero AWS console clunkiness. Supports AWS S3, Cloudflare R2, MinIO & Wasabi."
    },
    {
      title: "CheckEmail.dev",
      description: "Developer-first disposable email service with an instant REST API. Effortlessly test signup/auth flows or generate ephemeral inboxes for automated QA testing.",
      status: "Live",
      tech: ["Next.js", "Node.js", "Redis", "Cloudflare", "Tailwind"],
      icon: getFavicon("checkemail.dev"),
      link: "https://checkemail.dev",
      featured: true,
      highlightText: "Built for automated end-to-end testing with zero spam, instant webhook events, and clean API access."
    },
    {
      title: "ZeroForms",
      description: "Serverless form backend engine for static sites. Point standard HTML form actions to an endpoint and receive clean, spam-filtered submissions instantly.",
      status: "Live",
      tech: ["Serverless", "AWS Lambda", "Vue", "API Gateway"],
      icon: getFavicon("zeroforms.dev"),
      link: "https://zeroforms.dev"
    },
    {
      title: "GrabAI",
      description: "A meticulously curated radar and directory indexing top AI models, developer tools, and workflow automation platforms.",
      status: "Live",
      tech: ["React", "Airtable API", "Tailwind", "Vite"],
      icon: getFavicon("grabai.dev"),
      link: "https://grabai.dev"
    },
    {
      title: "StickyDraft",
      description: "Distraction-free, privacy-preserving browser scratchpad for ephemeral thoughts, markdown drafts, and code snippets.",
      status: "Open Source",
      tech: ["React", "LocalFirst", "PWA", "IndexedDB"],
      icon: getFavicon("stickydraft.com"),
      link: "https://stickydraft.com",
      githubUrl: "https://github.com/SaiAkashNeela"
    },
    {
      title: "GeeksDesigns",
      description: "Digital design and engineering studio crafting pixel-perfect web interfaces and bespoke software systems for startups.",
      status: "Live",
      tech: ["WordPress", "PHP", "Tailwind", "Cloudflare"],
      icon: getFavicon("geeksdesigns.com"),
      link: "https://geeksdesigns.com"
    },
    {
      title: "ZingDelights",
      description: "Comprehensive food ordering ecosystem with customer mobile apps, merchant management console, and real-time delivery tracking.",
      status: "Live",
      tech: ["Flutter", "Firebase", "Node.js", "GCP"],
      icon: getFavicon("zingdelights.com"),
      link: "https://zingdelights.com"
    },
    {
      title: "TheMadZone",
      description: "E-commerce and digital media platform with dynamic inventory syncing, checkout, and content hub across mobile and web.",
      status: "Live",
      tech: ["React Native", "MongoDB", "Express", "Node"],
      icon: getFavicon("themadzone.com"),
      link: "https://themadzone.com"
    },
    {
      title: "KLN Traders",
      description: "Modern wholesale digital commerce platform facilitating automated inventory synchronization and order management.",
      status: "Live",
      tech: ["Shopify", "Liquid", "JavaScript"],
      icon: getFavicon("klntraders.com"),
      link: "https://klntraders.com"
    },
    {
      title: "Telugu Film Chamber",
      description: "Official digital governance portal for the Telugu Film Chamber of Commerce, digitizing memberships and registrations.",
      status: "Live",
      tech: ["PHP", "MySQL", "Bootstrap"],
      icon: getFavicon("telugufilmchamber.in"),
      link: "https://telugufilmchamber.in"
    }
  ],
  education: [
    {
      institution: "University of Hertfordshire",
      degree: "Master’s in Advanced Computer Science"
    },
    {
      institution: "KL University",
      degree: "Bachelor’s in Computer Science with Cloud Computing Specialization"
    }
  ],
  certifications: [
    { name: "AWS Solutions Architect Associate", issuer: "Amazon Web Services / SimpliLearn" },
    { name: "Salesforce Certified Administrator", issuer: "Salesforce" },
    { name: "RPA Professional Automation Engineer", issuer: "Automation Anywhere" },
    { name: "Java Professional Certified", issuer: "Wipro" }
  ],
  publications: [
    {
      title: "Research on Cloud Infrastructure Optimization & Edge Computing",
      source: "IEEE Xplore Digital Library",
      id: "Document 9441974"
    }
  ],
  blogPosts: [
    {
      title: "Solving the S3 Headache: Why I Built BucketStack",
      date: "22 Dec 2025",
      readTime: "4 min read",
      content: "I honestly dislike the AWS console for daily file management. It's slow, multi-layered, and finding a single nested asset feels like searching for a needle in a haystack. S3 Browser for Windows works in a pinch, but I divide my time between macOS and Linux machines daily.\n\nSo I built BucketStack using Tauri and Rust. It's a proper, native desktop file manager that interacts with S3 buckets as seamlessly as local directories.\n\nThe standout feature? It's not locked to AWS. I use it constantly with Cloudflare R2, MinIO, and Wasabi. No more wrestling with CLI credentials or sluggish web UIs just to inspect or sync assets.",
      image: "https://images.unsplash.com/photo-1614624532983-4ce03382d63d?q=80&w=2662&auto=format&fit=crop"
    },
    {
      title: "The 'Aha' Moment Behind CheckEmail.dev",
      date: "14 Nov 2025",
      readTime: "3 min read",
      content: "I was debugging an OAuth verification flow for a client project and rapidly exhausted my test email aliases. Existing public temp-mail sites were riddled with popup ads, blocked by spam filters, or lacked a simple JSON API I could script in Playwright.\n\nThat sparked the project: 'Why isn't there a clean, developer-focused API for instantaneous inboxes?'\n\nOver a weekend, I spun up a lightweight Node server with Redis for ephemeral in-memory storage and a minimal Next.js frontend. Now CheckEmail.dev allows engineering teams to provision test inboxes via curl or SDK in milliseconds during CI runs.",
      image: "https://images.unsplash.com/photo-1557200134-90327ee9fafa?q=80&w=2670&auto=format&fit=crop"
    },
    {
      title: "Integrating Model Context Protocol (MCP) with Claude for DevOps Ops",
      date: "01 Oct 2025",
      readTime: "5 min read",
      content: "The Model Context Protocol (MCP) fundamentally changes AI assistance. I developed a specialized MCP server bridging Claude Desktop directly with Cloudflare Workers and Prometheus metrics.\n\nInstead of opening five browser tabs to check error spikes or toggle routing rules, I now ask: 'Inspect error rates on the auth worker over the last 30 minutes.' The agent pulls real-time telemetry, spots the anomaly, and proposes the exact fix.",
      externalLink: {
        text: "View MCP experiments on GitHub",
        url: "https://github.com/saiakashneela"
      }
    },
    {
      title: "Why I Migrated from Complex Kubernetes to Coolify for Solo Projects",
      date: "19 Sep 2025",
      readTime: "4 min read",
      content: "For years, I insisted on deploying everything onto production-grade K8s with Helm charts and ingress controllers. While essential for large enterprises, for independent builders and agile microservices it introduces enormous cognitive tax.\n\nI migrated my personal stack and side projects to Coolify on dedicated Hetzner nodes. The developer experience is stellar: automatic wildcard SSL, instant GitHub PR preview environments, and raw Docker Compose simplicity without losing infrastructure control."
    }
  ],
  gitHistory: generateGitHistory()
};
