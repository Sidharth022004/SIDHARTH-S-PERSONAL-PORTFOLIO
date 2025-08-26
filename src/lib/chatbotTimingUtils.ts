// Utility functions for chatbot timing and typing indicators

// Calculate response time based on message length and complexity
export const calculateResponseTime = (message: string): number => {
  // Base time of 1 second
  let time = 1000;
  
  // Add time based on message length (10ms per character)
  time += message.length * 10;
  
  // Add time for complexity (more complex responses take longer)
  const complexityFactors = [
    'project', 'experience', 'skill', 'education', 'contact',
    'technology', 'development', 'implementation'
  ];
  
  complexityFactors.forEach(factor => {
    if (message.toLowerCase().includes(factor)) {
      time += 300;
    }
  });
  
  // Add some randomness to make it more realistic (±30%)
  const randomness = 0.3;
  const randomFactor = 1 + (Math.random() * 2 - 1) * randomness;
  
  return Math.max(800, time * randomFactor); // Minimum 800ms
};

// Typing indicator patterns for different contexts
export const typingIndicatorPatterns: {
  greeting: [number, number];
  simple: [number, number];
  complex: [number, number];
  detailed: [number, number];
} = {
  greeting: [1000, 1500],
  simple: [800, 1200],
  complex: [1500, 2500],
  detailed: [2000, 3500]
};

// Get appropriate typing pattern based on message content
export const getTypingPattern = (message: string): [number, number] => {
  const lowerMessage = message.toLowerCase();
  
  // Detailed responses for specific information requests
  if (lowerMessage.includes('detail') || lowerMessage.includes('specific') || 
      lowerMessage.includes('tell me more') || lowerMessage.includes('explain')) {
    return typingIndicatorPatterns.detailed;
  }
  
  // Complex responses for project, experience, skill queries
  const complexKeywords = ['project', 'experience', 'skill', 'education', 'contact'];
  if (complexKeywords.some(keyword => lowerMessage.includes(keyword))) {
    return typingIndicatorPatterns.complex;
  }
  
  // Simple responses for short or basic queries
  if (message.length < 50) {
    return typingIndicatorPatterns.simple;
  }
  
  // Default to greeting pattern
  return typingIndicatorPatterns.greeting;
};

// Generate typing delay based on pattern
export const generateTypingDelay = (pattern: [number, number]): number => {
  const [min, max] = pattern;
  return min + Math.random() * (max - min);
};