import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Send,
  CheckCircle,
  AlertCircle,
  Mail,
  Phone,
  MapPin,
  Clock,
} from "lucide-react";

// ✅ Importing our fixed email service utils
import {
  sendEmail,
  validateEmail,
  sanitizeInput,
  checkRateLimit,
  type EmailData,
} from "../lib/emailService";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // ✅ Validation logic
  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.subject.trim()) {
      newErrors.subject = "Subject is required";
    } else if (formData.subject.trim().length < 5) {
      newErrors.subject = "Subject must be at least 5 characters";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters";
    } else if (formData.message.length > 1000) {
      newErrors.message = "Message must be less than 1000 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ✅ Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    if (!checkRateLimit()) {
      setSubmitStatus("error");
      setErrors({
        submit: "Please wait a minute before sending another message.",
      });
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus("sending");
    setErrors({});

    try {
      // Sanitize inputs
      const sanitizedData: EmailData = {
        name: sanitizeInput(formData.name),
        email: sanitizeInput(formData.email),
        subject: sanitizeInput(formData.subject),
        message: sanitizeInput(formData.message),
      };

      const success = await sendEmail(sanitizedData);

      if (success) {
        setSubmitStatus("success");
        setFormData({ name: "", email: "", subject: "", message: "" });

        // Auto-reset after 5s
        setTimeout(() => setSubmitStatus("idle"), 5000);
      } else {
        throw new Error("Failed to send email");
      }
    } catch (error) {
      console.error("EmailJS Error:", error);
      setSubmitStatus("error");

      let errorMessage =
        "Failed to send message. Please try again or contact me directly.";
      if (error instanceof Error) {
        if (error.message.includes("422")) {
          errorMessage =
            "Email service misconfigured. Please contact me directly at sidharthkardam287@gmail.com.";
        } else if (error.message.includes("401")) {
          errorMessage =
            "Email service authentication failed. Please contact me directly.";
        } else if (error.message.includes("404")) {
          errorMessage =
            "Email service not found. Please contact me directly at sidharthkardam287@gmail.com.";
        } else if (
          error.message.includes("network") ||
          error.message.includes("fetch")
        ) {
          errorMessage =
            "Network error. Please check your connection and try again.";
        }
      }

      setErrors({ submit: errorMessage });

      setTimeout(() => {
        setSubmitStatus("idle");
        setErrors({});
      }, 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const inputVariants = {
    focus: { scale: 1.02, transition: { duration: 0.2 } },
    blur: { scale: 1, transition: { duration: 0.2 } },
  };

  return (
    <section
      id="contact"
      className="py-20 bg-gradient-to-br from-blue-50/30 via-white to-purple-50/30 dark:from-gray-900 dark:via-gray-900 dark:to-blue-900/10"
    >
      {/* ✂️ Keeping your JSX form UI exactly the same */}
      {/* Only logic above has been fixed */}
    </section>
  );
};

export default Contact;
