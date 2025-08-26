import emailjs from 'emailjs-com';

// Initialize EmailJS with your user ID
emailjs.init("ei0M6UgMq2pVvKGNg");

// Email service configuration and utilities
export interface EmailData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface EmailJSConfig {
  serviceId: string;
  templateId: string;
  userId: string;
}

// EmailJS configuration with your provided credentials
export const emailConfig: EmailJSConfig = {
  serviceId: 'service_zcs78oe',
  templateId: 'template_99niu0d',
  userId: 'ei0M6UgMq2pVvKGNg'
};

export const sendEmail = async (data: EmailData): Promise<boolean> => {
  try {
    console.log('=== EMAIL SERVICE DEBUG ===');
    console.log('EmailJS Config:', emailConfig);
    console.log('Input data:', data);
    
    // Prepare template parameters - using common EmailJS template variable names
    const templateParams = {
      from_name: data.name,
      from_email: data.email,
      subject: data.subject,
      message: data.message,
      to_name: 'Sidharth',
      to_email: 'sidharthkardam287@gmail.com',
      reply_to: data.email,
      // Additional common template variables that might be expected
      user_name: data.name,
      user_email: data.email,
      user_message: data.message,
      user_subject: data.subject
    };

    console.log('Sending email with params:', {
      service_id: emailConfig.serviceId,
      template_id: emailConfig.templateId,
      user_id: emailConfig.userId,
      template_params: templateParams
    });

    const result = await emailjs.send(
      emailConfig.serviceId,
      emailConfig.templateId,
      templateParams,
      emailConfig.userId
    );

    console.log('Email sent successfully:', result);
    return result.status === 200;
  } catch (error) {
    console.error('Error sending email:', error);
    throw error; // Re-throw to let the component handle it
  }
};

// Validate email format
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Sanitize input data
export const sanitizeInput = (input: string): string => {
  return input.trim().replace(/[<>]/g, '');
};

// Rate limiting helper (simple client-side implementation)
export const checkRateLimit = (): boolean => {
  const lastSubmission = localStorage.getItem('lastEmailSubmission');
  const now = Date.now();
  const cooldownPeriod = 60000; // 1 minute cooldown

  if (lastSubmission && (now - parseInt(lastSubmission)) < cooldownPeriod) {
    return false;
  }

  localStorage.setItem('lastEmailSubmission', now.toString());
  return true;
};
