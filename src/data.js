// Portfolio data
export const SITE = {
  name: "Leon Muyesu",
  title_kicker: "Full‑Stack Developer",
  hero_phrases: [
    "I design UX/UI.",
    "I architect APIs.",
    "I ship reliable software.",
  ],
  subtitle:
    "I build fast, accessible web apps with Python/Django and JavaScript/Node.js. " +
    "I love crafting delightful experiences with thoughtful UI and high‑quality code.",
  email: "leonmuyesu15@gmail.com",
  socials: [
    { label: "GitHub", href: "https://github.com/68Weezky" },
    { label: "LinkedIn", href: "https://linkedin.com/in/leon-muyesu-6314a1273" },
    { label: "Resume", href: "/media/CV_LEON MUYESU.pdf" },
  ],
};

export const SKILLS = [
  {
    title: "Front‑end",
    progress: 90,
    tags: [
      "HTML5",
      "CSS3",
      "JavaScript (ES6+)",
      "React",
      "Svelte-kit",
      "Bootstrap",
      "Tailwind CSS",
      "Vanilla CSS",
      "Responsive UI",
      "UI/UX Design",
    ],
  },
  {
    title: "Back‑end",
    progress: 85,
    tags: [
      "Python",
      "JavaScript",
      "PHP",
      "Java",
      "MySQL",
      "MongoDB",
      "PostgreSQL",
      "Django",
      "Vue.js",
      "Node.js",
      "Express",
      "REST APIs",
    ],
  },
  {
    title: "Tools",
    progress: 80,
    tags: ["Git", "GitHub", "Vite", "Netlify", "Render", "Figma", "Docker", "VS Code", "Helix", "PyCharm", "Sublime Text"],
  },
];

export const PROJECTS = [
  {
    thumb: "/media/portfolio.jpg",
    thumbAlt: "Portfolio Website Interface",
    title: "Portfolio Website",
    desc: "Modern, responsive portfolio website built with React and Vite. Features dark/light theme toggle, smooth animations, and a clean component-based architecture.",
    tags: ["React", "Vite", "JavaScript", "CSS3", "Responsive Design"],
    demo: "https://leonmuyesuportfolio.netlify.app/",
    code: "https://github.com/68Weezky/portfolio", 
  },
  {
    thumb: "/media/hotel-mgt.jpg",
    thumbAlt: "Hotel Management System Interface",
    title: "The Whitehouse Lounge",
    desc: "Comprehensive hotel management system for reservations, guest services, and operations.",
    tags: ["Python", "Django", "PostgreSQL"],
    demo: "https://hotelmgt.onrender.com/",
    code: "https://github.com/68Weezky/hotelmgt",
  },
  {
    thumb: "/media/jobkonekt.jpg",
    thumbAlt: "Marketplace Platform Interface",
    title: "JobKonekt",
    desc: "Platform bridging the gap between skilled traders and their clientele in the marketplace.",
    tags: ["JavaScript", "Node.js", "PostgreSQL"],
    demo: null,
    code: "https://github.com/68Weezky/jobKonekt",
  },
  {
    thumb: "/media/field-hockey.jpg",
    thumbAlt: "Hockey Sports Analytics Dashboard",
    title: "HockeyKE",
    desc: "Sports analytics application for grassroots hockey teams in Kenya.",
    tags: ["JavaScript", "D3js", "PostgreSQL"],
    demo: null,
    code: "https://github.com/68Weezky/analytics",
  },
  {
    thumb: "/media/ai-query.jpeg",
    thumbAlt: "AI Query Interface Application",
    title: "AI Query Interface",
    desc: "Full-stack web application providing an interface for AI-powered queries. FastAPI backend with Google Gemini LLM integration and Next.js responsive frontend with real-time formatted responses.",
    tags: ["FastAPI", "Python", "Next.js", "TypeScript", "TailwindCSS", "Google Gemini API"],
    demo: null,
    code: "https://github.com/68Weezky/AI-Query-Interface",
  },
  {
    thumb: "/media/focus-flow.jpg",
    thumbAlt: "Focus Flow - Pomodoro Task Management Dashboard",
    title: "Focus Flow",
    desc: "Modern task management application combining task tracking with the Pomodoro Technique. Features real-time timer with persistence, browser notifications, analytics dashboard with charts, and automated task status transitions.",
    tags: ["React", "Node.js", "Express", "PostgreSQL", "Prisma", "Recharts", "JWT Auth", "Axios"],
    demo: null,
    code: "https://github.com/68Weezky/focus_flow",
  },
];

export const TIMELINE = [
  {
    heading: "Software Engineering Intern — Pan African Climate Justice Alliance(PACJA)",
    meta: "May 2023 - July 2023 · On-site",
    text: "Built a web application for the organization to manage their campaigns and events.",
  },
  {
    heading: "Software Engineering Intern — Dockonekt",
    meta: "May 2024 - August 2024 · Remote",
    text:
      "Collaborated with a colleague to build a web application that served the purpose of easing the medical processes of patients in hospitals; from booking appointments to doctors making referrals.",
  },
  {
    heading: "BSc. Computer Science — Multimedia University of Kenya",
    meta: "September 2021 - October 2025",
    text:
      "Specialization in full‑stack web development, with electives in distributed systems and HCI. Graduated with a Second Class Honours(upper division) in Computer Science.",
  },
  {
    heading: "High School — Nairobi School",
    meta: "January 2017 - April 2021",
    text:
      "Completed my high school education with a passion for technology and a strong foundation in science and mathematics. Scored an A-(minus) in the Kenya Certificate of Secondary Education(KCSE) examination.",
  },
];
