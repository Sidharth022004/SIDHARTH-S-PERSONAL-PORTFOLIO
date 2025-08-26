export type PortfolioSection = {
  key: string;
  label: string;
  content: string;
};

export const portfolioSections: PortfolioSection[] = [
  {
    key: "about",
    label: "About",
    content:
      "Hi, I'm Sidharth! A full-stack developer passionate about crafting robust web apps, AI integration, and beautiful UI/UX.",
  },
  {
    key: "skills",
    label: "Skills",
    content:
      "React, Next.js, Node, Express, TypeScript, Python, MongoDB, SQL, Docker, Redux, TailwindCSS, Framer Motion, and more.",
  },
  {
    key: "projects",
    label: "Projects",
    content:
      "Project 1: Smart Portfolio Bot\nTech stack: React, Node, GPT\nDescription: Conversational portfolio chatbot.\n\nProject 2: Personal Finance App\nTech stack: Python, React Native\nDescription: Expense tracker with analytics.",
  },
  {
    key: "experience",
    label: "Experience",
    content:
      "2022–Present: Senior Developer at Innovatech\n2021–2022: Full Stack Engineer at CodeLabs\nIntern: AI intern at DataCorp.",
  },
  {
    key: "contact",
    label: "Contact",
    content:
      "Email: sidharth@email.com\nLinkedIn: linkedin.com/in/sidharth\nGitHub: github.com/sidharthdev",
  },
];
