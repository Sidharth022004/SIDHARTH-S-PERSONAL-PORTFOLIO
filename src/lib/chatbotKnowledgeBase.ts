// Knowledge base for the AI chatbot with information about Sidharth's portfolio
export const knowledgeBase = {
  // About section information
  about: {
    name: "Sidharth",
    title: "Software Engineer",
    description: [
      "As a BCA student passionate about technology, I am seeking opportunities to apply my learning in real-world projects while continuing to develop my skills in software development and quality assurance.",
      "I'm currently pursuing my Bachelor of Computer Applications (BCA) at DPG Degree College, affiliated by MDU Rohtak, Haryana.",
      "I have experience in manual testing, quality assurance, frontend development, and bug reporting."
    ],
    highlights: [
      {
        title: "Education",
        description: "Currently pursuing Bachelor of Computer Applications (BCA) at DPG Degree College"
      },
      {
        title: "Experience",
        description: "Internships in QA testing and frontend development"
      },
      {
        title: "Leadership",
        description: "Certificate for Leadership and 2nd Position in PPT Competition"
      },
      {
        title: "Expertise",
        description: "Manual Testing & QA, HTML, CSS, JavaScript, React Basics, Microsoft Office Suite"
      }
    ],
    stats: {
      years: "1+",
      projects: "3",
      internships: "3",
      commitment: "100% to learning"
    }
  },
  
  // Projects information
  projects: [
    {
      id: 1,
      title: "Learning Management System (Academic Project)",
      description: "A simple learning management system built as part of BCA coursework, focusing on basic CRUD operations and user authentication.",
      fullDescription: "This academic project helped understand fundamental web development concepts including user registration, course enrollment, and basic content management. Built using HTML, CSS, JavaScript, and PHP with MySQL database.",
      technologies: ["HTML", "CSS", "JavaScript", "PHP", "MySQL"],
      year: "2024",
      status: "Academic Project",
      links: {
        live: "https://github.com/sidharth-demo/lms-project",
        github: "https://github.com/sidharth-demo/lms-project"
      }
    },
    {
      id: 2,
      title: "Personal Portfolio Website",
      description: "A personal portfolio website built with React and modern web technologies, showcasing learning journey and projects.",
      fullDescription: "This portfolio represents the journey in learning modern web development. Built with React, TypeScript, and Tailwind CSS, it demonstrates understanding of component-based architecture, responsive design, and modern development practices.",
      technologies: ["React", "TypeScript", "Tailwind CSS", "Framer Motion", "Vite"],
      year: "2024",
      status: "Live",
      links: {
        live: "https://sidha.netlify.app",
        github: "https://github.com/sidharth-demo/portfolio"
      }
    },
    {
      id: 3,
      title: "Simple Calculator App",
      description: "A basic calculator application built while learning JavaScript fundamentals and DOM manipulation.",
      fullDescription: "One of the first JavaScript projects that helped understand event handling, DOM manipulation, and basic programming logic. Features include basic arithmetic operations and a clean, responsive interface.",
      technologies: ["HTML", "CSS", "JavaScript"],
      year: "2024",
      status: "Learning Project",
      links: {
        live: "https://sidharth-calculator.netlify.app",
        github: "https://github.com/sidharth-demo/calculator"
      }
    }
  ],
  
  // CV/Experience information
  experience: [
    {
      role: "QA Testing Intern",
      company: "Loqal.ai",
      period: "June 2024 – August 2024",
      description: "Performing manual testing of web and mobile applications to identify bugs and ensure functionality, usability, and performance. Preparing detailed bug reports and collaborating with the development team to resolve issues efficiently. Participating in test plan creation and contributing to quality assurance process improvements."
    },
    {
      role: "Internshala Student Partner",
      company: "Internshala",
      period: "August 2024 - Dec 2024",
      description: "Represented Internshala in college, guiding students to find suitable courses and internships."
    },
    {
      role: "Frontend + Testing Intern",
      company: "SingleInterface",
      period: "June 2024 – August 2024",
      description: "Completed a 1.5-month internship in web development as a frontend tester. Gained valuable experience working with a supportive team and mentors."
    }
  ],
  
  // Skills information
  skills: {
    technical: [
      "Manual Testing & QA",
      "HTML",
      "CSS",
      "JavaScript (Learning)",
      "React Basics (Learning)",
      "Microsoft Office Suite",
      "Bug Reporting & Documentation"
    ],
    personal: [
      "Attention to Detail",
      "Quick Learner",
      "Team Collaboration"
    ],
    languages: [
      "Hindi (Fluent)",
      "English (Proficient)"
    ]
  },
  
  // Education information
  education: [
    {
      degree: "Bachelor of Computer Applications (BCA)",
      institution: "DPG Degree College, affiliated by MDU Rohtak, Haryana",
      status: "Currently Pursuing"
    },
    {
      degree: "12th Grade (CBSE)",
      period: "2022 - 2023",
      score: "85%"
    },
    {
      degree: "10th Grade (Matric) (CBSE)",
      period: "2020 - 2021",
      score: "50%"
    }
  ],
  
  // Contact information
  contact: {
    email: "sid240711@gmail.com",
    phone: "9870220973",
    location: "Vill. Bharthal, Dwarka Sec-26, South West Delhi 110077"
  }
};

// Common questions and their responses
export const commonResponses = {
  greeting: [
    "Hello! I'm Sidharth's AI assistant. How can I help you today?",
    "Hi there! I'm here to help you learn more about Sidharth and his work. What would you like to know?",
    "Welcome! I'm Sidharth's virtual assistant. Feel free to ask me anything about his portfolio."
  ],
  about: [
    "Sidharth is a BCA student passionate about technology, seeking opportunities to apply his learning in real-world projects.",
    "He's currently pursuing his Bachelor of Computer Applications at DPG Degree College, affiliated by MDU Rohtak.",
    "Sidharth has experience in manual testing, quality assurance, frontend development, and bug reporting."
  ],
  projects: [
    "Sidharth has worked on several projects including a Learning Management System, a Personal Portfolio Website, and a Simple Calculator App.",
    "His projects showcase his learning journey with technologies like HTML, CSS, JavaScript, PHP, MySQL, React, TypeScript, and Tailwind CSS.",
    "You can view his projects in the Projects section. Would you like details about a specific project?"
  ],
  skills: [
    "Sidharth is developing skills in manual testing, QA, HTML, CSS, JavaScript, and React.",
    "His technical skills include Manual Testing & QA, HTML, CSS, JavaScript (Learning), React Basics (Learning), and Microsoft Office Suite.",
    "He also has personal skills like Attention to Detail, Quick Learning ability, and Team Collaboration."
  ],
  experience: [
    "Sidharth has completed internships in QA testing at Loqal.ai and frontend development at SingleInterface.",
    "He also worked as an Internshala Student Partner, helping students find suitable courses and internships.",
    "His experience includes manual testing of web and mobile applications, bug reporting, and frontend development."
  ],
  education: [
    "Sidharth is currently pursuing his Bachelor of Computer Applications (BCA) at DPG Degree College.",
    "He completed his 12th grade with 85% and his 10th grade with 50%.",
    "His education background shows a strong commitment to learning computer applications."
  ],
  contact: [
    "You can reach Sidharth at sid240711@gmail.com or call him at 9870220973.",
    "He's located in Vill. Bharthal, Dwarka Sec-26, South West Delhi 110077.",
    "Feel free to contact him through the contact form on this portfolio or directly via email."
  ]
};

// Keywords mapping for context-aware responses
export const keywordMappings = {
  about: ["about", "introduce", "introduction", "who are you", "who is sidharth"],
  projects: ["project", "projects", "work", "portfolio", "lms", "calculator", "website"],
  skills: ["skill", "skills", "technologies", "technology", "programming", "javascript", "react", "html", "css"],
  experience: ["experience", "internship", "internships", "job", "work experience", "qa", "testing"],
  education: ["education", "degree", "bca", "college", "school", "study", "student"],
  contact: ["contact", "email", "phone", "reach", "location", "address", "hire"]
};