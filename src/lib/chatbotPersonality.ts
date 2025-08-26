// Personality traits and response variations for the AI chatbot

export const personalityTraits = {
  friendly: true,
  helpful: true,
  enthusiastic: true,
  knowledgeable: true,
  supportive: true
};

// Response templates with personality
export const responseTemplates = {
  greeting: [
    "Hello there! 👋 I'm Sidharth's AI assistant. How can I help you today?",
    "Hi! I'm here to help you learn more about Sidharth and his work. What would you like to know?",
    "Welcome! I'm Sidharth's virtual assistant. Feel free to ask me anything about his portfolio! 😊"
  ],
  about: [
    "Sidharth is a BCA student who's really passionate about technology! He's always eager to apply what he's learning in real-world projects.",
    "As a BCA student, Sidharth is focused on developing his skills in software development and quality assurance. He's quite dedicated!",
    "Did you know Sidharth is currently pursuing his Bachelor of Computer Applications? He's working hard to build a career in tech!"
  ],
  projects: [
    "Sidharth has worked on some really interesting projects! His Learning Management System shows his understanding of web development fundamentals.",
    "I'm particularly proud of Sidharth's portfolio website - it's built with modern technologies like React and Tailwind CSS!",
    "His calculator app was one of his first JavaScript projects. It's amazing to see how far he's come in his learning journey!"
  ],
  skills: [
    "Sidharth is developing skills in manual testing, QA, HTML, CSS, and JavaScript. He's also learning React!",
    "What's great about Sidharth is his attention to detail - especially important in QA testing!",
    "He's a quick learner and always eager to pick up new technologies. His skills are growing every day!"
  ],
  experience: [
    "Sidharth has gained valuable experience through his internships at Loqal.ai and SingleInterface!",
    "His role as a QA Testing Intern helped him develop a keen eye for detail and bug reporting skills.",
    "As an Internshala Student Partner, Sidharth helped other students find opportunities - he's quite collaborative!"
  ],
  education: [
    "Sidharth is currently pursuing his Bachelor of Computer Applications (BCA) - he's really committed to his education!",
    "He did quite well in his 12th grade with an 85% score. His dedication shows in his academic performance!",
    "Education is important to Sidharth, and he's always looking for ways to apply what he's learning."
  ],
  contact: [
    "You can reach Sidharth at sid240711@gmail.com or call him at 9870220973. He'd love to hear from you!",
    "Feel free to contact Sidharth through the contact form on this portfolio. He's always open to new opportunities!",
    "If you'd like to get in touch with Sidharth, his email is sid240711@gmail.com. He responds promptly!"
  ],
  fallback: [
    "I'm here to help you learn more about Sidharth and his portfolio. What would you like to know?",
    "That's an interesting question! I can tell you more about Sidharth's projects, skills, or experience. What interests you most?",
    "I'd be happy to help with that. You can ask me about his background, projects, or how to contact him!"
  ],
  appreciation: [
    "Thank you for your interest! I'm glad I could help. 😊",
    "You're very welcome! Is there anything else you'd like to know?",
    "I'm happy to assist! Feel free to ask me anything else about Sidharth."
  ],
  clarification: [
    "Could you tell me a bit more about what you're looking for?",
    "I'd like to help with that. Could you be more specific about what information you need?",
    "That's an interesting question. Could you clarify what you'd like to know?"
  ]
};

// Emojis to add personality to responses
export const personalityEmojis = {
  greeting: ["👋", "😊", "🙋‍♂️"],
  about: ["💡", "🎓", "🚀"],
  projects: ["💻", "🔧", "📊"],
  skills: ["🔧", "🧠", "📈"],
  experience: ["💼", "👥", "🏆"],
  education: ["📚", "🎓", "📖"],
  contact: ["📧", "📱", "📍"],
  appreciation: ["😊", "🙏", "👍"],
  clarification: ["🤔", "❓", "🔍"]
};

// Add personality to responses
export const addPersonality = (response: string, category: string): string => {
  // Add emojis based on category
  const emojis = personalityEmojis[category as keyof typeof personalityEmojis] || [];
  if (emojis.length > 0 && Math.random() > 0.5) {
    const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
    // Add emoji either at the beginning or end
    if (Math.random() > 0.5) {
      response = `${randomEmoji} ${response}`;
    } else {
      response = `${response} ${randomEmoji}`;
    }
  }
  
  return response;
};

// Get personalized response based on category
export const getPersonalizedResponse = (category: string): string => {
  const templates = responseTemplates[category as keyof typeof responseTemplates] || responseTemplates.fallback;
  const randomTemplate = templates[Math.floor(Math.random() * templates.length)];
  return addPersonality(randomTemplate, category);
};