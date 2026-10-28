export const CASE_STUDY_PATH = "/case-studies/ai-workflow";

export const PROFILE = {
  brand: "piraveen",
  name: "Sasikaran Piraveen",
  title: "Software Engineering Intern",
  tagline:
    "I build AI agents for business workflows where the model suggests actions and tested code carries them out.",
  currently:
    "Automating ERP processes with LLM agents at David Pieris Holdings.",
  location: "Jaffna District, Northern Province, Sri Lanka",
  email: "piraveen1727@gmail.com",
  github: "https://github.com/Piraveen17",
  linkedin: "https://www.linkedin.com/in/sasikaran-piraveen",
  instagram: "https://www.instagram.com/piraveen.13",
  resumeUrl: "/Piraveen-CV.pdf",
};

export type Project = {
  title: string;
  year: string;
  featured?: boolean;
  tagline: string;
  description: string;
  guarantees?: string[];
  stack: string[];
  github: string;
  demo?: string;
  walkthrough?: string;
};

export const PROJECTS: Project[] = [
  {
    title: "WhatsApp Order Agent",
    year: "2026",
    featured: true,
    tagline:
      "Customers place, change and cancel food orders in a normal WhatsApp chat.",
    description:
      "Specialist LLM agents work out what the customer wants and propose typed tool calls. Code validates every call, and anything that places, changes or cancels an order waits for the customer to tap Confirm.",
    guarantees: [
      "No order changes until the customer taps confirm",
      "Prices and totals are read from the database, never written by the model",
      "Customer identity comes from the signed webhook, not from the model",
    ],
    stack: [
      "Python",
      "FastAPI",
      "PostgreSQL",
      "Redis",
      "OpenRouter",
      "WhatsApp Cloud API",
    ],
    github: "https://github.com/Piraveen17/IntentLatch.git",
    walkthrough: `${CASE_STUDY_PATH}?scenario=whatsapp`,
  },
  {
    title: "Car Rental Management System",
    year: "2025",
    featured: true,
    tagline:
      "A booking platform for customers and staff, with an analytics assistant that answers questions from live data.",
    description:
      "The database itself rejects double bookings, and row-level security limits each role to its own data. Admins can ask business questions in plain English; every generated query is parsed and checked before it runs read-only.",
    guarantees: [
      "Overlapping confirmed bookings are rejected by a Postgres constraint",
      "Generated SQL must pass an AST check: one SELECT, approved tables, at most 100 rows",
      "Queries run in an admin-only, read-only Postgres function with a 10-second timeout",
    ],
    stack: [
      "Next.js",
      "TypeScript",
      "Supabase",
      "PostgreSQL",
      "Gemini API",
      "shadcn/ui",
    ],
    github: "https://github.com/Piraveen17/car_rental.git",
    demo: "https://ajcar-rental.vercel.app",
    walkthrough: `${CASE_STUDY_PATH}?scenario=car-rental`,
  },
  {
    title: "Olirsuite",
    year: "2025",
    tagline:
      "Company management system. I built the frontend modules and the income and expense tracking.",
    description:
      "Responsive pages wired to backend APIs, plus debugging and release testing. Group project.",
    stack: ["Next.js", "TypeScript", "shadcn/ui", "MongoDB"],
    github: "https://github.com/ShiyamalanK/olir-suite.git",
  },
  {
    title: "CheatShield",
    year: "2026",
    tagline:
      "Locks exam machines to an allowlist of sites and keeps every client in sync with the admin's policy.",
    description:
      "Polling policy sync, symmetric-key client registration with expiry, and API flows tested end to end in Postman. Group project.",
    stack: ["Next.js", "TypeScript", "MongoDB", "Python"],
    github: "https://github.com/Kamalaraj/cheatshield.git",
  },
  {
    title: "JeyaFoods",
    year: "2026",
    tagline:
      "Food ordering site with search and filters so customers find dishes quickly.",
    description:
      "Reusable menu components shared across the customer pages. Group project.",
    stack: ["Next.js", "TypeScript", "MongoDB"],
    github: "https://github.com/Jeyafoods/jeyafoods_new.git",
  },
  {
    title: "Resource Hub",
    year: "2024",
    tagline:
      "Scheduling calendar that shows free and booked slots for shared resources.",
    description:
      "Create, update and cancel bookings, with input validation. Group project.",
    stack: ["HTML", "Tailwind CSS", "JavaScript", "PHP"],
    github:
      "https://github.com/Group-8-Web-Technology-Project/Resource-Hub-Management.git",
  },
];

export const SKILL_GROUPS = [
  "AI & agents",
  "Backend & data",
  "Languages",
  "Frontend",
  "Tools",
] as const;

export const SKILLS: { label: string; group: (typeof SKILL_GROUPS)[number] }[] =
  [
    { label: "LangGraph", group: "AI & agents" },
    { label: "LLM tool calling", group: "AI & agents" },
    { label: "Prompt engineering", group: "AI & agents" },
    { label: "PyTorch", group: "AI & agents" },

    { label: "FastAPI", group: "Backend & data" },
    { label: "PostgreSQL", group: "Backend & data" },
    { label: "SQLAlchemy", group: "Backend & data" },
    { label: "Redis", group: "Backend & data" },
    { label: "Supabase", group: "Backend & data" },
    { label: "MySQL", group: "Backend & data" },
    { label: "MongoDB", group: "Backend & data" },

    { label: "Python", group: "Languages" },
    { label: "TypeScript", group: "Languages" },
    { label: "JavaScript", group: "Languages" },
    { label: "Java", group: "Languages" },
    { label: "C", group: "Languages" },
    { label: "C++", group: "Languages" },
    { label: "PHP", group: "Languages" },

    { label: "React", group: "Frontend" },
    { label: "Next.js", group: "Frontend" },
    { label: "Tailwind CSS", group: "Frontend" },
    { label: "HTML", group: "Frontend" },
    { label: "CSS", group: "Frontend" },

    { label: "Docker", group: "Tools" },
    { label: "Git", group: "Tools" },
    { label: "Postman", group: "Tools" },
    { label: "IntelliJ IDEA", group: "Tools" },
    { label: "Visual Studio", group: "Tools" },
    { label: "MATLAB", group: "Tools" },
    { label: "Canva", group: "Tools" },
  ];

export const EXPERIENCE = [
  {
    role: "Software Engineering Intern",
    org: "David Pieris Holdings",
    period: "May 2026 – Present",
    current: true,
    bullets: [
      "Build FastAPI services that connect LLM-driven workflows to ERP systems, turning model output into validated, structured data the ERP can use.",
      "Write the prompts and orchestration for LLM decision steps in ERP automation workflows.",
      "Add tracing to agent pipelines so each step's input, decision and outcome can be inspected.",
    ],
  },
  {
    role: "Practical Assistant, Python Essentials for Problem Solvers",
    org: "Department of Computer Science, University of Jaffna",
    period: "2026",
    current: false,
    bullets: [
      "Run hands-on Python lab sessions for certificate-course students.",
      "Help students debug their code and work through core programming concepts.",
    ],
  },
  {
    role: "Practical Assistant, Python for Problem Solving",
    org: "Department of Computer Science, University of Jaffna",
    period: "2025",
    current: false,
    bullets: [
      "Ran hands-on Python lab sessions for certificate-course students.",
      "Helped students debug their code and work through core programming concepts.",
    ],
  },
];

export const RESEARCH = [
  {
    title:
      "Reliability-Aware Attention Fusion of RGB Semantics and ELA Forensics for Deepfake Detection",
    description:
      "A detector that combines what an image shows (RGB features) with traces of editing (error level analysis), and learns how much to trust each signal per image.",
    status: "In progress",
    tags: ["PyTorch", "Python", "Google Colab"],
  },
];

export const ACHIEVEMENTS = [
  {
    title: "IEEEXtreme 17.0",
    desc: "International 24-hour programming competition",
    year: "2023",
  },
  {
    title: "CodeStorm 2.0",
    desc: "National hackathon, Yarl IT Hub",
    year: "2024",
  },
  {
    title: "UOJ Coders V4.0",
    desc: "University of Jaffna hackathon",
    year: "2025",
  },
];

export const EDUCATION = [
  {
    school: "University of Jaffna",
    program:
      "BSc (Hons) in Computer Science (reading). OGPA 3.85/4.0 after 96 of 120 credits.",
    period: "Nov 2022 – Nov 2026",
  },
  {
    school: "J/ Hartley College",
    program: "Physical Science, G.C.E. O/L and A/L",
    period: "Dec 2011 – Oct 2020",
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
  { title: "Python Basics for Data Science", issuer: "edX", issued: "2024" },
  { title: "Introduction to HTML", issuer: "Sololearn", issued: "2023" },
  { title: "Introduction to Python", issuer: "Sololearn", issued: "2023" },
];

export const VOLUNTEERING = [
  {
    role: "3rd Year Representative",
    org: "Faculty of Science, University of Jaffna",
    period: "Jan 2025 – Dec 2025",
    bullets: ["Represented the batch and coordinated with faculty staff."],
  },
  {
    role: "Editor",
    org: "Leo Club of Nallur (Leo District 306 D12, MD 306)",
    period: "Aug 2024 – Sep 2026",
    bullets: [
      "Write and update the club's communications about its activities.",
    ],
  },
];

export const HIGHLIGHTS = [
  { label: "Current OGPA", value: "3.85/4.0 (96/120 credits)" },
  { label: "Dean's List", value: "Level 1S (2021), Level 2S (2022)" },
  { label: "G.C.E. O/L", value: "7A, 2B (2017)" },
  { label: "G.C.E. A/L", value: "A, B, C; Z-score 1.3841 (2020)" },
];
