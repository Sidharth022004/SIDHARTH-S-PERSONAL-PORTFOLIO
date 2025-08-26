import { knowledgeBase, commonResponses, keywordMappings } from './chatbotKnowledgeBase';

// Function to find relevant keywords in user input
const findKeywords = (input: string): string[] => {
  const keywords: string[] = [];
  const lowerInput = input.toLowerCase();
  
  // Check each keyword category
  Object.entries(keywordMappings).forEach(([category, words]) => {
    if (words.some(word => lowerInput.includes(word))) {
      keywords.push(category);
    }
  });
  
  return keywords;
};

// Function to generate response based on keywords
export const generateResponse = (input: string): string => {
  // If input is empty or just whitespace, return a default response
  if (!input.trim()) {
    return "Hello! I'm Sidharth's AI assistant. How can I help you today?";
  }
  
  // Find relevant keywords in the input
  const keywords = findKeywords(input);
  
  // If no keywords found, return a general response
  if (keywords.length === 0) {
    return "I'm here to help you learn more about Sidharth and his portfolio. You can ask me about his projects, skills, experience, or how to contact him.";
  }
  
  // Generate response based on keywords
  const responses: string[] = [];
  
  keywords.forEach(keyword => {
    switch (keyword) {
      case 'about':
        responses.push(commonResponses.about[Math.floor(Math.random() * commonResponses.about.length)]);
        break;
      case 'projects':
        responses.push(commonResponses.projects[Math.floor(Math.random() * commonResponses.projects.length)]);
        break;
      case 'skills':
        responses.push(commonResponses.skills[Math.floor(Math.random() * commonResponses.skills.length)]);
        break;
      case 'experience':
        responses.push(commonResponses.experience[Math.floor(Math.random() * commonResponses.experience.length)]);
        break;
      case 'education':
        responses.push(commonResponses.education[Math.floor(Math.random() * commonResponses.education.length)]);
        break;
      case 'contact':
        responses.push(commonResponses.contact[Math.floor(Math.random() * commonResponses.contact.length)]);
        break;
      default:
        // For any other keywords, add a general response
        responses.push("I can provide more information about Sidharth's background, projects, and skills. What specifically would you like to know?");
    }
  });
  
  // If we have responses, join them together
  if (responses.length > 0) {
    return responses.join(' ');
  }
  
  // Fallback response
  return "I'm here to help you learn more about Sidharth and his portfolio. What would you like to know?";
};

// Function to get project details
export const getProjectDetails = (projectId: number) => {
  const project = knowledgeBase.projects.find(p => p.id === projectId);
  if (project) {
    return `Project: ${project.title}
Description: ${project.fullDescription}
Technologies: ${project.technologies.join(', ')}
Year: ${project.year}
Status: ${project.status}`;
  }
  return "I couldn't find details for that project. Would you like to know about another project?";
};

// Function to get experience details
export const getExperienceDetails = (company: string) => {
  const experience = knowledgeBase.experience.find(exp => 
    exp.company.toLowerCase().includes(company.toLowerCase()) || 
    exp.role.toLowerCase().includes(company.toLowerCase())
  );
  
  if (experience) {
    return `Role: ${experience.role}
Company: ${experience.company}
Period: ${experience.period}
Description: ${experience.description}`;
  }
  
  return "I don't have specific details about that experience. Would you like to know about his other experiences?";
};

// Function to get skill details
export const getSkillDetails = (skill: string) => {
  const technicalSkills = knowledgeBase.skills.technical;
  const personalSkills = knowledgeBase.skills.personal;
  const languages = knowledgeBase.skills.languages;
  
  if (technicalSkills.some(s => s.toLowerCase().includes(skill.toLowerCase()))) {
    return `Sidharth is developing skills in ${technicalSkills.filter(s => s.toLowerCase().includes(skill.toLowerCase())).join(', ')}.`;
  }
  
  if (personalSkills.some(s => s.toLowerCase().includes(skill.toLowerCase()))) {
    return `His personal skills include ${personalSkills.filter(s => s.toLowerCase().includes(skill.toLowerCase())).join(', ')}.`;
  }
  
  if (languages.some(s => s.toLowerCase().includes(skill.toLowerCase()))) {
    return `He speaks ${languages.filter(s => s.toLowerCase().includes(skill.toLowerCase())).join(', ')}.`;
  }
  
  return "I don't have specific information about that skill. Would you like to know about his other skills?";
};

// Function to get education details
export const getEducationDetails = () => {
  return `Sidharth is currently pursuing his Bachelor of Computer Applications (BCA) at DPG Degree College, affiliated by MDU Rohtak, Haryana. 
He completed his 12th grade with 85% and his 10th grade with 50%.`;
};

// Function to get contact details
export const getContactDetails = () => {
  return `You can reach Sidharth at:
Email: ${knowledgeBase.contact.email}
Phone: ${knowledgeBase.contact.phone}
Location: ${knowledgeBase.contact.location}
Feel free to contact him through the contact form on this portfolio or directly via email.`;
};