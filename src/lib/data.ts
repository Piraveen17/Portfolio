import { label } from "framer-motion/client";

export const PROFILE = {
  brand: "piraveen",
  name: "Sasikaran Piraveen",
  title: "BSc (Hons) CS (Reading)",
  tagline: "Full-Stack Developer delivering reliable, user-focused products.",
  currently:
    "Currently building scalable full-stack systems and exploring AI research.",
  location: "Jaffna District, Northern Province, Sri Lanka",
  email: "piraveen1727@gmail.com",
  github: "https://github.com/Piraveen17",
  linkedin: "https://www.linkedin.com/in/piraveen-sasikaran-88354a268",
  instagram: "https://www.instagram.com/piraveen.13",
  resumeUrl: "/resume.pdf",
};

export const PROJECTS = [
  {
    title: "Car Rental Management System",
    year: "2026",
    tagline:
      "Enterprise-grade booking logic with strict availability control and role-based access.",
    description:
      "Role-based booking system with strict availability rules and premium UI.",
    accent: "cyan",
    stack: ["React", "TypeScript", "Supabase", "Tailwind", "RLS"],
    github: "https://github.com/Piraveen17/car_rental",
    image: "/projects/car-rental.png",
  },
  {
    title: "nextjs-betterauth-boilerplate",
    year: "2025",
    tagline:
      "Production-ready authentication architecture with secure role-based routing.",
    description:
      "Production-ready authentication starter with clean architecture.",
    accent: "red",
    stack: ["Next.js", "BetterAuth", "TypeScript", "RBAC"],
    github: "https://github.com/Piraveen17/nextjs-betterauth-boilerplate",
    image: "/projects/betterauth.png",
  },
  {
    title: "Weather App",
    year: "2024",
    tagline:
      "High-performance API-driven UI with modern motion and clean state management.",
    description:
      "Modern weather UI with fast API fetch and smooth interactions.",
    accent: "cyan",
    stack: ["React", "Vite", "API", "Framer Motion"],
    github: "https://github.com/Piraveen17/Weather-App",
    image: "/projects/weather.png",
  },
];

export const SKILLS = [
  { label: "Html", group: "Frontend" },
  { label: "Css", group: "Frontend" },
  { label: "JavaScript", group: "Frontend" },
  { label: "React", group: "Frontend" },
  { label: "TypeScript", group: "Frontend" },
  { label: "TailwindCSS", group: "Frontend" },

  { label: "Node.js", group: "Backend" },
  { label: "NestJS", group: "Backend" },
  { label: "REST APIs", group: "Backend" },
  { label: "Auth / RBAC", group: "Backend" },
  { label: "Java", group: "Backend" },
  { label: "Php", group: "Backend" },

  { label: "NextJs", group: "Framework" },

  { label: "Python", group: "AI / ML" },
  { label: "PyTorch", group: "AI / ML" },
  { label: "Deep Learning", group: "AI / ML" },

  { label: "MySQL", group: "Database" },
  { label: "PostgreSQL", group: "Database" },
  { label: "MongoDB", group: "Database" },
  { label: "Git", group: "Tools" },
  { label: "Docker", group: "Tools" },
  { label: "Postman", group: "Tools" },
  { label: "Linux", group: "Tools" },
];

export const EXPERIENCE = [
  {
    role: "Practical Assistant — External Certificate Courses in Computing (Python for Problem Solving)",
    org: "University of Jaffna • Department of Computer Science • Part-time • On-site",
    period: "Feb 2026 – Present",
    bullets: [
      "Support students in hands-on Python laboratory sessions.",
      "Provide guidance on debugging, error resolution, and applying programming concepts.",
      "Mentor learners to improve problem-solving and practical coding confidence.",
    ],
  },
  {
    role: "Practical Assistant — External Certificate Courses in Computing (Python for Problem Solving)",
    org: "University of Jaffna • Department of Computer Science • On-site",
    period: "Feb 2025 – Apr 2025",
    bullets: [
      "Assisted students in Python practical sessions with debugging and troubleshooting.",
      "Supported course facilitators by ensuring smooth lab execution and activity flow.",
      "Helped students understand practical applications of Python programming concepts.",
    ],
  },
  {
    role: "Startup-style Project Builder (Full-stack)",
    org: "Personal + team projects",
    period: "2024 – Present",
    bullets: [
      "Build product-like systems with premium UI, clean architecture, and reliable logic.",
      "Focus on production patterns: auth, roles, validation, maintainability, and performance.",
    ],
  },
];

export const RESEARCH = [
  {
    title: "BSc (Hons) CS (Reading)",
    description:
      "A light research showcase section — add your titles, datasets, and results here.",
    tags: ["AI/ML", "Systems", "Optimization"],
  },
];

export const ACHIEVEMENTS = [
  {
    title: "Leadership — Batch Representative (UoJ)",
    desc: "Coordinated batch initiatives (t-shirts) and managed logistics for a ~260-student trip; acted as student–faculty liaison.",
  },
  {
    title: "Teaching Support — Practical Assistant",
    desc: "Guided students in Python labs with debugging, troubleshooting, and practical problem solving.",
  },
  {
    title: "Certifications (Web + Python)",
    desc: "Completed structured learning via edX, University of Moratuwa, IEEE, and Sololearn.",
  },
  {
    title: "Basketball",
    desc: "Team sport discipline — consistency, teamwork, and resilience under pressure.",
  },
];

export const EDUCATION = [
  {
    school: "University of Jaffna",
    program: "BSc (Hons) in Computer Science (Reading)",
    period: "Sep 2022 – Present • Expected Dec 2026",
  },
  {
    school: "Hartley College",
    program: "Secondary Education • Basketball",
    period: "Dec 2011 – Oct 2020",
  },
];

export const CERTIFICATIONS = [
  {
    title: "Python Basics for Data Science",
    issuer: "edX",
    issued: "Jun 2024",
  },
  {
    title: "Web Design for Beginners",
    issuer: "University of Moratuwa",
    issued: "Mar 2024",
  },
  {
    title: "Introduction to Web Development with HTML5, CSS3, and JavaScript",
    issuer: "edX",
    issued: "Mar 2024",
  },
  { title: "IEEEXtreme 17.0", issuer: "IEEE", issued: "Dec 2023" },
  { title: "Introduction to Python", issuer: "Sololearn", issued: "Dec 2023" },
  { title: "Introduction to HTML", issuer: "Sololearn", issued: "Sep 2023" },
  {
    title: "Python for Beginners",
    issuer: "University of Moratuwa",
    issued: "Aug 2023",
  },
];

export const VOLUNTEERING = [
  {
    role: "3rd Year Batch Representative",
    org: "University of Jaffna",
    period: "Jan 2025 – Dec 2025",
    bullets: [
      "Coordinated design and printing of custom batch t-shirts, strengthening batch unity.",
      "Organized and led a batch trip to Hanthana, managing logistics and activities for ~260 participants.",
      "Acted as a liaison between students and faculty, improving engagement and addressing concerns.",
    ],
  },
  {
    role: "Editor",
    org: "Leo Club of Nallur",
    period: "Aug 2024 – Present",
    bullets: [
      "Supported club communication/content for activities and initiatives.",
    ],
  },
  {
    role: "Student Member",
    org: "IEEE Student Branch, University of Jaffna",
    period: "May 2023 – May 2024",
    bullets: [
      "Participated in student-branch activities and technical community events.",
    ],
  },
  {
    role: "Member",
    org: "CompSoc-UOJ",
    period: "Dec 2022 – Present",
    bullets: [
      "Active member in computing society events and student tech community.",
    ],
  },
];

export const LANGUAGES = [
  { name: "Tamil", level: "Native / Bilingual" },
  { name: "English", level: "Intermediate" },
  { name: "Sinhala", level: "Basic" },
];
