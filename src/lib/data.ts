export const PROFILE = {
  brand: "piraveen",
  name: "Sasikaran Piraveen",
  title: "Software Engineering Intern",
  company: "David Pieris Holdings",
  headline: "I build LLM systems where the model proposes and code decides.",
  tagline:
    "I work on an AI-driven ERP automation ecosystem (Python, FastAPI, LangGraph, PostgreSQL, Docker, Redis). Outside work I build agent systems where every write is gated, validated and traceable.",
  about:
    "I am a Computer Science undergraduate at the University of Jaffna (OGPA 3.85/4.0). My focus is production-minded backend and full-stack work: typed tool calls, database-enforced invariants, and interfaces that make system behaviour visible. I also research deep learning for deepfake detection.",
  location: "Jaffna District, Northern Province, Sri Lanka",
  email: "piraveen1727@gmail.com",
  github: "https://github.com/Piraveen17",
  linkedin: "https://www.linkedin.com/in/sasikaran-piraveen",
  instagram: "https://www.instagram.com/piraveen.13",
  resumeUrl: "/resume.pdf",
};

export type Project = {
  title: string;
  year: string;
  tagline: string;
  description: string;
  stack: string[];
  github: string;
  demo?: string;
  image?: string;
  /** Featured projects get a case-file row and an in-app walkthrough. */
  featured?: boolean;
  hasWalkthrough?: boolean;
  /** In-app route of the walkthrough. */
  caseStudyUrl?: string;
  /** Honest status shown next to the title. */
  status?: string;
  /** Label for `demo` when it is not a live URL. */
  demoNote?: string;
  /** Original standalone prototype of the walkthrough (reference only). */
  prototypeUrl?: string;
};

export const PROJECTS: Project[] = [
  {
    title: "WhatsApp Order Management (IntentLatch)",
    year: "2026",
    status: "Alpha, no real-customer traffic yet",
    tagline:
      "Customers create, change and cancel food orders in a normal WhatsApp chat.",
    description:
      "Specialist LLM agents (via OpenRouter) only propose typed tool calls. Deterministic code executes every mutation after an explicit confirmation, and prices and totals are always rendered from verified database reads.",
    stack: ["Python", "FastAPI", "PostgreSQL", "Redis", "Docker", "OpenRouter"],
    github: "https://github.com/Piraveen17/WhatsAPP-API",
    demoNote: "Runs locally with make demo, no live URL",
    featured: true,
    hasWalkthrough: true,
    caseStudyUrl: "/work/intentlatch",
    prototypeUrl: "https://piraveen17.github.io/Piraveen17/?scenario=kottu",
  },
  {
    title: "Car Rental Management: AI-Enabled Booking Platform",
    year: "2025",
    tagline:
      "Multi-role booking platform with database-enforced conflict detection.",
    description:
      "Full booking lifecycle with role-based access, atomic conflict checks backed by a PostgreSQL exclusion constraint, and an admin assistant that turns questions into validated, read-only SQL.",
    stack: ["Next.js", "TypeScript", "Supabase", "PostgreSQL", "shadcn/ui"],
    github: "https://github.com/Piraveen17/car_rental",
    demo: "https://ajcar-rental.vercel.app",
    featured: true,
    hasWalkthrough: true,
    caseStudyUrl: "/work/car-rental",
    prototypeUrl: "https://piraveen17.github.io/Piraveen17/?scenario=admin_rag",
  },
  {
    title: "Olirsuite - Company Management System",
    year: "2025",
    tagline:
      "Responsive company management UI with finance tracking and API integration.",
    description:
      "Frontend development, transaction tracking, and backend API integration.",
    stack: ["Next.js", "TypeScript", "shadcn/ui", "MongoDB"],
    github: "https://github.com/Piraveen17",
    demo: "https://olir-suite-one.vercel.app",
    image: "/projects/olirsuite.svg",
  },
  {
    title: "CheatShield - Exam Environment Control System",
    year: "2026",
    tagline:
      "Allowlist-based exam control with secure policy sync and client validation.",
    description: "Policy sync, secure registration, and API flow validation.",
    stack: ["Next.js", "TypeScript", "MongoDB", "Python", "Postman"],
    github: "https://github.com/Piraveen17",
    demo: "https://cheatshield-dcs.vercel.app",
    image: "/projects/cheatshield.svg",
  },
  {
    title: "JeyaFoods - Food Ordering System",
    year: "2026",
    tagline: "Responsive menu UI with search and filters for fast discovery.",
    description:
      "Reusable components with consistent UI styling across customer pages.",
    stack: ["Next.js", "TypeScript", "MongoDB"],
    github: "https://github.com/Piraveen17",
    image: "/projects/jeyafoods.svg",
  },
  {
    title: "Resource Hub Management System",
    year: "2024",
    tagline: "Scheduling calendar UI with booking workflows and validation.",
    description: "Availability views and create/update/cancel booking flows.",
    stack: ["HTML", "Tailwind CSS", "JavaScript", "PHP"],
    github: "https://github.com/Piraveen17",
    image: "/projects/resource-hub.svg",
  },
];

export const SKILLS = [
  { label: "Java", group: "Programming" },
  { label: "Python", group: "Programming" },
  { label: "C", group: "Programming" },
  { label: "C++", group: "Programming" },
  { label: "PHP", group: "Programming" },
  { label: "JavaScript", group: "Programming" },
  { label: "TypeScript", group: "Programming" },

  { label: "HTML", group: "Web Development" },
  { label: "CSS", group: "Web Development" },
  { label: "Tailwind CSS", group: "Web Development" },
  { label: "React.js", group: "Web Development" },

  { label: "Next.js", group: "Frameworks" },

  { label: "FastAPI", group: "Agents and backend" },
  { label: "LangGraph", group: "Agents and backend" },
  { label: "LLM tool calling (OpenRouter)", group: "Agents and backend" },
  { label: "Redis", group: "Agents and backend" },
  { label: "Docker", group: "Agents and backend" },

  { label: "MySQL", group: "Databases" },
  { label: "MongoDB", group: "Databases" },
  { label: "PostgreSQL", group: "Databases" },
  { label: "Supabase", group: "Databases" },

  { label: "Visual Studio", group: "Tools & IDEs" },
  { label: "IntelliJ IDEA", group: "Tools & IDEs" },
  { label: "MATLAB", group: "Tools & IDEs" },

  { label: "Canva", group: "Editing & Design" },
];

export const EXPERIENCE = [
  {
    role: "Software Engineering Intern",
    org: "David Pieris Holdings",
    period: "13 May 2026 - Present",
    bullets: [
      "Working on an AI-driven ERP automation ecosystem.",
      "Stack: Python, FastAPI, LangGraph, PostgreSQL, Docker, Redis.",
    ],
  },
  {
    role: "Practical Assistant, Python Essentials for Problem Solvers",
    org: "Department of Computer Science, Faculty of Science, University of Jaffna",
    period: "Present",
    bullets: [
      "Supported hands-on Python labs and guided students through exercises.",
      "Assisted with debugging, troubleshooting, and core programming concepts.",
      "Helped maintain smooth lab sessions and learner confidence.",
    ],
  },
  {
    role: "Practical Assistant, Python for Problem Solving",
    org: "Department of Computer Science, Faculty of Science, University of Jaffna",
    period: "2025",
    bullets: [
      "Supported hands-on Python labs and guided students through exercises.",
      "Assisted with debugging, troubleshooting, and core programming concepts.",
      "Helped maintain smooth lab sessions and learner confidence.",
    ],
  },
];

export const RESEARCH = [
  {
    title:
      "Reliability-Aware Attention Fusion of RGB Semantics and ELA Forensics for Deepfake Detection.",
    description:
      "Developing a deep learning approach that fuses RGB visual features with ELA-based forensic features using adaptive attention weighting.",
    tags: ["Deep Learning", "PyTorch", "Python", "Google Colab"],
  },
];

export const ACHIEVEMENTS = [
  {
    title: "IEEE Xtreme 17.0",
    desc: "International programming competition participation (2023).",
  },
  {
    title: "CodeStorm 2.0 - Yarl IT Hub",
    desc: "National hackathon participation (2024).",
  },
  {
    title: "UOJ Coders V 4.0",
    desc: "University of Jaffna hackathon participation (2025).",
  },
];

export const EDUCATION = [
  {
    school: "University of Jaffna",
    program:
      "BSc (Hons) in Computer Science (Reading) - OGPA 3.85/4.0 (96/120 credits)",
    period: "Nov 2022 - Nov 2026",
  },
  {
    school: "J/ Hartley College",
    program: "Physical Science - [G.C.E. O/L , G.C.E. A/L]",
    period: "Dec 2011 - Oct 2020",
  },
];

export const CERTIFICATIONS = [
  {
    title: "Web Design for Beginners",
    issuer: "University of Moratuwa (CODL)",
    issued: "2024",
  },
  {
    title: "Python for Beginners",
    issuer: "University of Moratuwa (CODL)",
    issued: "2023",
  },
  {
    title: "Introduction to Web Development with HTML5, CSS3, and JavaScript",
    issuer: "edX",
    issued: "2024",
  },
  {
    title: "Python Basics for Data Science",
    issuer: "edX",
    issued: "2024",
  },
  {
    title: "Introduction to HTML",
    issuer: "Sololearn",
    issued: "2023",
  },
  {
    title: "Introduction to Python",
    issuer: "Sololearn",
    issued: "2023",
  },
];

export const VOLUNTEERING = [
  {
    role: "3rd Year Representative",
    org: "Faculty of Science, University of Jaffna",
    period: "Jan 2025 - Dec 2025",
    bullets: [
      "Represented the batch and supported coordination with faculty members.",
    ],
  },
  {
    role: "Editor",
    org: "Leo Club of Nallur (Leo District 306 D12, MD 306)",
    period: "Aug 2024 - Present",
    bullets: [
      "Supported club communications and content updates for activities.",
    ],
  },
];

export const HIGHLIGHTS = [
  { label: "Current OGPA", value: "3.85/4.0 (96/120 credits)" },
  { label: "G.C.E. O/L", value: "7A, 2B (2017)" },
  { label: "G.C.E. A/L", value: "A, B, C; Z-score 1.3841 (2020)" },
];
