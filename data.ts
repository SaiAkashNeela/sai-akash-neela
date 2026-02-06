import { ResumeData } from './types';

// Helper to generate a fake contribution graph 
// This serves as a placeholder until the Cloudflare Worker loads the real data
const generateGitHistory = () => {
  const data = [];
  const today = new Date();
  // Generate approx 6 months (180 days) to match the worker
  for (let i = 180; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    // Random count between 0 and 10, weighted towards 0-5
    const count = Math.random() > 0.3 ? Math.floor(Math.random() * 8) : 0;
    data.push({
      date: d.toISOString().split('T')[0],
      count: count
    });
  }
  return data;
};

// Helper to get favicon URL
const getFavicon = (domain: string) => `https://www.google.com/s2/favicons?domain=${domain}&sz=128`;

export const resumeData: ResumeData = {
  name: "Akash",
  fullName: "Sai Akash Neela",
  title: "AI & Cloud Operations Guy",
  contact: {
    email: "saiakashneela@outlook.com",
    phone: "+44 7767934364",
    linkedin: "www.linkedin.com/in/saiakashneela",
    github: "www.github.com/saiakashneela",
    x: "x.com/TheSaiAkash",
    medium: "medium.com/@saiakashneela",
    resume: "mega.nz/file/7mwEAKKC#hDrk6LGlggYFBEgZzm3EXU7spPxuABERVpp7zCjTckw"
  },
  summary: "I'm an AI & DevOps Engineer passionate about designing and deploying intelligent systems that solve real‑world problems. I heavily leverage AI to build high-performance mobile, desktop, and web applications faster and better. Experienced in developing and deploying scalable AI and cloud systems, building REST APIs, data models, and React frontends, I specialize in integrating RAG pipelines, MCP servers, and automation tools to support real operational workflows.",
  experience: [
    {
      company: "Roxonn",
      role: "Cloud Operations Engineer",
      description: "Currently handling the cloud infrastructure and automation stack. My focus is on keeping things fast and reliable while automating the boring stuff.",
      highlights: [
        "Managing AWS environments (ECS Fargate, EC2, RDS, S3) to ensure uptime.",
        "Deploying containerized apps using Dokploy and Coolify.",
        "Building workflow automation with n8n to connect internal systems.",
        "Maintaining Cloudflare infrastructure (R2, Workers, Tunnels).",
        "Experimenting with MCP servers and custom scripts for better ops.",
        "Supporting internal AI systems by managing vector indexes."
      ]
    },
    {
      company: "Bell Soft LTD",
      role: "Lead DevOps Engineer",
      description: "Designed and optimized DevOps processes to keep applications running smoothly.",
      highlights: [
        "Built CI/CD pipelines using Jenkins, GitHub Actions, and Azure DevOps.",
        "Worked extensively with AWS and Azure, handling hybrid cloud setups.",
        "Orchestrated Kubernetes clusters (EKS) and monitoring (Prometheus/Grafana).",
        "Wrote Infrastructure as Code using CloudFormation.",
        "Automated security patching and vulnerability scanning.",
        "Deployed React apps on S3/CloudFront and managed SQL deployments."
      ]
    },
    {
      company: "Qapita Pte Ltd",
      role: "DevOps Engineer",
      description: "Helped ensure seamless deployments and kept our infrastructure healthy.",
      highlights: [
        "Managed multiple databases (MongoDB, Postgres) and automated backups.",
        "Scripted automation tasks using Python and Bash.",
        "Built and integrated frontend websites using ReactJS and WordPress.",
        "Worked with AWS services and containerized apps with Docker.",
        "Configured CI/CD pipelines to reduce manual deployment errors."
      ]
    },
    {
      company: "Uniquode",
      role: "Junior DevOps & Software Engineer",
      description: "Started out working across both DevOps and software development, fixing bugs and learning the ropes.",
      highlights: [
        "Wrote simple automation scripts in Python and Bash.",
        "Worked on frontend updates (HTML, CSS, ReactJS).",
        "Assisted with basic AWS tasks like launching EC2 instances.",
        "Used Git for version control and collaborated on code updates."
      ]
    }
  ],
  indieKit: [
    "BetterAuth for Auth",
    "Postgres & Mongo for DBs",
    "Nodejs backend",
    "Bun toolkit",
    "Cloudflare for almost everything",
    "React + Vite & sometimes NextJs"
  ],
  skills: {
    "Cloud & Infra": ["AWS", "Azure", "Cloudflare", "DigitalOcean", "Hetzner", "Railway"],
    "DevOps & AI Ops": ["Docker", "Kubernetes", "Dokploy", "Coolify", "RAG Pipelines", "MCP Servers"],
    "App Development": ["React", "RN Expo", "Tauri", "Rust", "TypeScript", "Python", "Postgres", "MongoDB"],
    "Toolkit": ["n8n", "Prometheus", "Grafana", "New Relic", "Snyk", "Git"]
  },
  projects: [
    {
      title: "BucketStack",
      description: "Open source S3 file manager for macOS, Windows & Linux. A fast, native way to manage your buckets without the clunky AWS console.",
      status: "Open Source",
      tech: ["Tauri", "Rust", "React"],
      icon: getFavicon("bucketstack.app"),
      link: "https://bucketstack.app"
    },
    {
      title: "CheckEmail.dev",
      description: "A developer-friendly disposable email service. Test your email flows or just avoid spam with clean, instant inboxes.",
      status: "Live",
      tech: ["Next.js", "Node.js", "Redis"],
      icon: getFavicon("checkemail.dev"),
      link: "https://checkemail.dev"
    },
    {
      title: "ZeroForms",
      description: "Serverless form backend for static sites. Point your HTML forms to our API and get submissions straight to your email.",
      status: "Live",
      tech: ["Serverless", "AWS Lambda", "Vue"],
      icon: getFavicon("zeroforms.dev"),
      link: "https://zeroforms.dev"
    },
    {
      title: "GrabAI",
      description: "A curated directory of the best AI tools and resources. I built this to keep track of the explosion in the AI ecosystem.",
      status: "Live",
      tech: ["React", "Airtable", "Tailwind"],
      icon: getFavicon("grabai.dev"),
      link: "https://grabai.dev"
    },
    {
      title: "Roxonn",
      description: "Roxonn DSO: The First Truly Decentralized Software Organization. Vote on Decisions, Contribute Code, and Earn Rewards - All Powered by Blockchain Technology.",
      status: "DSO",
      tech: ["Next.js", "Cloudflare", "Blockchain"],
      icon: getFavicon("roxonn.com"),
      link: "https://roxonn.com"
    },
    {
      title: "GeeksDesigns",
      description: "Creative design studio offering pixel-perfect web design and development services for startups.",
      status: "Live",
      tech: ["WordPress", "PHP", "CSS3"],
      icon: getFavicon("geeksdesigns.com"),
      link: "https://geeksdesigns.com"
    },
    {
      title: "StickyDraft",
      description: "A distraction-free, privacy-focused sticky note app for quick thoughts and drafts in your browser.",
      status: "Open Source",
      tech: ["React", "LocalFirst", "PWA"],
      icon: getFavicon("stickydraft.com"),
      link: "https://stickydraft.com"
    },
    {
      title: "ZingDelights",
      description: "Comprehensive food ordering platform with Mobile & Web apps. Streamlining the path from hungry to happy.",
      status: "Live",
      tech: ["Flutter", "Firebase", "Node.js"],
      icon: getFavicon("zingdelights.com"),
      link: "https://zingdelights.com"
    },
    {
      title: "TheMadZone",
      description: "E-commerce platform for digital entertainment and merchandise. A space for engaging content and shopping across mobile and web.",
      status: "Live",
      tech: ["React Native", "MongoDB", "Express"],
      icon: getFavicon("themadzone.com"),
      link: "https://themadzone.com"
    },
    {
      title: "Arcatic",
      description: "Software solutions provider delivering custom mobile and web applications for enterprise clients.",
      status: "Agency",
      tech: ["MERN Stack", "DevOps"],
      icon: getFavicon("arcatic.com"),
      link: "https://arcatic.com"
    },
    {
      title: "KLN Traders",
      description: "E-commerce platform facilitating seamless trading and inventory management for local businesses.",
      status: "Live",
      tech: ["Shopify", "Liquid", "JS"],
      icon: getFavicon("klntraders.com"),
      link: "https://klntraders.com"
    },
    {
      title: "Telugu Film Chamber",
      description: "Official digital portal for the Telugu Film Chamber of Commerce, digitizing industry operations and memberships.",
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
      degree: "Bachelor’s Degree in Computer Science with Cloud Specialization"
    }
  ],
  certifications: [
    { name: "AWS Solutions Architect Associate Level", issuer: "SimpliLearn" },
    { name: "Salesforce Certified Administrator", issuer: "Salesforce" },
    { name: "RPA Professional", issuer: "Automation Anywhere" },
    { name: "Java", issuer: "Wipro" }
  ],
  publications: [
    {
      title: "Project Paper Published in IEEE",
      source: "IEEE Xplore",
      id: "Document 9441974"
    }
  ],
  blogPosts: [
    {
      title: "Solving the S3 Headache: Why I Built BucketStack",
      date: "22nd December 2025",
      content: "I honestly hate the AWS console. It's slow, clunky, and I feel like I need a map just to find a file. S3 Browser for Windows is okay, but I'm on Mac half the time and Linux the other half. \n\nSo, I decided to fix it myself. I built BucketStack using Tauri and Rust. It's a proper, native file manager that treats your S3 buckets just like local folders. \n\nThe best part? It's not just for AWS. I use it daily with Cloudflare R2 and Wasabi. No more struggling with APIs or CLI commands just to upload a few assets. It just works.",
      image: "https://images.unsplash.com/photo-1614624532983-4ce03382d63d?q=80&w=2662&auto=format&fit=crop"
    },
    {
      title: "The 'Aha' Moment Behind CheckEmail.dev",
      date: "14th November 2025",
      content: "I was in the middle of building an auth flow for a client project and ran out of email aliases to test with. I went to those usual 'temp mail' sites, and they were either riddled with ads or didn't have an API I could automate. \n\nThat was the spark. I thought, 'Why isn't there a clean, developer-focused API for this?' \n\nI spent the weekend spinning up a simple Node server with Redis for fast storage and a clean Next.js frontend. Now, CheckEmail.dev lets me (and other devs) grab instant inboxes via API for E2E testing. It was a simple problem with a simple solution, and those are usually the best ones."
    },
    {
      title: "Integrating MCP Servers with Claude for Better DevOps Automation",
      date: "1st October 2025",
      content: "The Model Context Protocol (MCP) is a game changer. I built a custom MCP server that connects Claude Desktop directly to my Cloudflare Workers. \n\nNow, instead of logging into the dashboard to check logs or toggle routes, I just ask Claude: 'Check the error rate on the auth-worker' and it fetches real-time data. It's like having a junior DevOps engineer who never sleeps.",
      externalLink: {
        text: "View the source on GitHub",
        url: "https://github.com/saiakashneela"
      }
    },
    {
      title: "Why I Switched from Kubernetes to Coolify for My Side Projects",
      date: "19th September 2025",
      content: "For years, I was obsessed with 'doing it right'—which meant full K8s clusters, Helm charts, and complexity. But for solo devs, that's just overhead. \n\nI recently migrated my entire homelab and SaaS experiments to Coolify. The DX is incredible. It feels like having your own Vercel but on a $5 Hetzner VPS. The automatic SSL, preview deployments, and simple Docker Compose support have saved me hours of config management."
      // Image removed as requested
    }
  ],
  gitHistory: generateGitHistory()
};