// src/lib/emailService.ts
import emailjs from "@emailjs/browser";

// Types
export interface EmailData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface EmailJSConfig {
  serviceId: string;
  templateId: string;
  publicKey: string;
}

// ✅ EmailJS configuration with your provided credentials
export const emailConfig: EmailJSConfig = {
  serviceId: "service_zcs78oe",
  templateId: "template_99niu0d",
  publicKey: "ei0M6UgMq2pVvKGNg",
};

// ✅ Send Email Function
export const sendEmail = async (data: EmailData): Promise<boolean> => {
  try {
    console.log("=== EMAIL SERVICE DEBUG ===");
    console.log("EmailJS Config:", emailConfig);
    console.log("Input data:", data);

    const templateParams = {
      from_name: data.name,
      from_email: data.email,
      subject: data.subject,
      message: data.message,
      to_name: "Sidharth",
      to_email: "sidharthkardam287@gmail.com",
      reply_to: data.email,
      // Extra keys in case template expects them
      user_name: data.name,
      user_email: data.email,
      user_subject: data.subject,
      user_message: data.message,
    };

    console.log("Sending email with params:", {
      service_id: emailConfig.serviceId,
      template_id: emailConfig.templateId,
      public_key: emailConfig.publicKey,
      template_params: templateParams,
    });

    const result = await emailjs.send(
      emailConfig.serviceId,
      emailConfig.templateId,
      templateParams,
      emailConfig.publicKey
    );

    console.log("EmailJS result:", result);

    // EmailJS returns { status: 200, text: "OK" } on success
    return result.status === 200;
  } catch (error) {
    console.error("EmailJS error:", error);
    throw error; // let component handle UI
  }
};

// ✅ Email validation
export const validateEmail = (email: string): boolean => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

// ✅ Input sanitization (prevent XSS)
export const sanitizeInput = (input: string): string => {
  return input.trim().replace(/[<>]/g, "");
};

// ✅ Simple rate limiter (1-minute cooldown)
export const checkRateLimit = (): boolean => {
  const lastSent = localStorage.getItem("lastEmailSubmission");
  const now = Date.now();
  const cooldown = 60000; // 1 min

  if (lastSent && now - parseInt(lastSent, 10) < cooldown) {
    return false;
  }

  localStorage.setItem("lastEmailSubmission", now.toString());
  return true;
};
