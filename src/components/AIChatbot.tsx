import React, { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, User, Sun, Moon, MessageCircle, X, Mic } from "lucide-react";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";

// Import portfolio data
import { portfolioSections, PortfolioSection } from "../data/portfolioData";

// ==== Types ====
type NavButton = {
  key: string;
  label: string;
};

type Message = {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: string;
  navBtns?: NavButton[];
};

// ==== Speech function ====
function speak(text: string) {
  if ("speechSynthesis" in window) {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1;
    utterance.pitch = 1;
    utterance.lang = "en-US";
    window.speechSynthesis.speak(utterance);
  }
}

// ==== Helper: get response ====
function getPortfolioResponse(msg: string): PortfolioSection | null {
  const lower = msg.toLowerCase();
  if (lower.includes("about")) return portfolioSections[0];
  if (lower.includes("skill")) return portfolioSections[1];
  if (lower.includes("project")) return portfolioSections[2];
  if (lower.includes("experience") || lower.includes("work"))
    return portfolioSections[3];
  if (
    lower.includes("contact") ||
    lower.includes("email") ||
    lower.includes("linkedin") ||
    lower.includes("github")
  )
    return portfolioSections[4];
  return null;
}

// ==== MAIN CHATBOT ====
const AIChatbot: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [showSendButton, setShowSendButton] = useState(false);
  const [listening, setListening] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const { transcript, resetTranscript, browserSupportsSpeechRecognition } =
    useSpeechRecognition();

  // Initialize Greeting
  const initializeChat = useCallback(() => {
    setMessages([
      {
        id: "greet",
        text: portfolioSections[0].content,
        isUser: false,
        timestamp: new Date().toISOString(),
      },
      {
        id: "help",
        text: "Ask me about skills, experience, projects, or contact details.",
        isUser: false,
        timestamp: new Date().toISOString(),
      },
    ]);
  }, []);

  // Effects
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  useEffect(() => {
    setShowSendButton(inputValue.trim().length > 0);
  }, [inputValue]);

  useEffect(() => {
    if (isOpen && messages.length === 0) initializeChat();
  }, [isOpen, messages.length, initializeChat]);

  useEffect(() => {
    if (!listening && transcript) setInputValue(transcript);
  }, [listening, transcript]);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(
        textareaRef.current.scrollHeight,
        150
      )}px`;
    }
  }, [inputValue]);

  // Speech Recognition
  const startListening = () => {
    if (browserSupportsSpeechRecognition) {
      setListening(true);
      resetTranscript();
      SpeechRecognition.startListening({ continuous: false, language: "en-US" });
    }
  };
  const stopListening = () => {
    setListening(false);
    SpeechRecognition.stopListening();
  };

  // Send Message
  const handleSendMessage = () => {
    if (!inputValue.trim()) return;
    const userMessage: Message = {
      id: Date.now() + "",
      text: inputValue,
      isUser: true,
      timestamp: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    setTimeout(() => {
      const respSection = getPortfolioResponse(userMessage.text);
      let response: string;
      let navBtns: NavButton[] = [];

      if (respSection) {
        response = `Here is my ${respSection.label}:\n${respSection.content}`;
        navBtns = portfolioSections
          .filter((s) => s.key !== respSection.key)
          .map((sec) => ({ key: sec.key, label: sec.label }));
      } else {
        response =
          "Please ask about About, Skills, Projects, Experience, or Contact.";
        navBtns = portfolioSections.map((sec) => ({
          label: sec.label,
          key: sec.key,
        }));
      }

      const aiResponse: Message = {
        id: Date.now() + "ai",
        text: response,
        navBtns,
        isUser: false,
        timestamp: new Date().toISOString(),
      };

      setMessages((prev) => [...prev, aiResponse]);
      setIsTyping(false);
      speak(response);
    }, 900);
  };

  // Nav Click handler
  const handleNavClick = (key: string) => {
    const section = portfolioSections.find((s) => s.key === key);
    if (section) {
      const userMessage: Message = {
        id: Date.now() + "",
        text: `Show me your ${section.label}`,
        isUser: true,
        timestamp: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, userMessage]);
      setIsTyping(true);

      setTimeout(() => {
        const aiResponse: Message = {
          id: Date.now() + "ai",
          text: `Here is my ${section.label}:\n${section.content}`,
          navBtns: portfolioSections
            .filter((s) => s.key !== key)
            .map((sec) => ({ key: sec.key, label: sec.label })),
          isUser: false,
          timestamp: new Date().toISOString(),
        };
        setMessages((prev) => [...prev, aiResponse]);
        setIsTyping(false);
        speak(`Here is my ${section.label}. ${section.content}`);
      }, 800);
    }
  };

  // Keyboard send
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // ====== RENDER ======
  return (
    <>
      {/* Floating open button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-50 w-14 h-14 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full ${
          isOpen ? "hidden" : "flex"
        } items-center justify-center`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
      >
        <MessageCircle size={24} />
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className={`fixed bottom-6 right-6 z-50 w-96 h-[600px] rounded-xl shadow-2xl flex flex-col ${
              isDarkMode
                ? "bg-gray-900 text-white border border-gray-700"
                : "bg-white text-gray-900 border border-gray-200"
            }`}
          >
            {/* Header */}
            <div
              className={`p-4 border-b flex justify-between ${
                isDarkMode ? "border-gray-700 bg-gray-800" : "bg-gray-50"
              }`}
            >
              <h3 className="font-semibold">AI Assistant</h3>
              <div className="flex gap-2">
                <button onClick={() => setIsDarkMode(!isDarkMode)}>
                  {isDarkMode ? <Sun size={16} /> : <Moon size={16} />}
                </button>
                <button onClick={() => setIsOpen(false)}>
                  <X size={16} />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((m) => (
                <div
                  key={m.id}
                  className={`flex ${m.isUser ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`px-4 py-2 rounded-lg ${
                      m.isUser
                        ? "bg-blue-600 text-white"
                        : isDarkMode
                        ? "bg-gray-800"
                        : "bg-gray-100"
                    }`}
                  >
                    <p className="whitespace-pre-line">{m.text}</p>

                    {m.navBtns && (
                      <div className="mt-2 flex flex-wrap gap-2">
                        {m.navBtns.map((btn) => (
                          <button
                            key={btn.key}
                            onClick={() => handleNavClick(btn.key)}
                            className="px-3 py-1 rounded bg-blue-500 text-white text-xs hover:bg-blue-700"
                          >
                            {btn.label}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {isTyping && <p className="text-sm text-gray-500">🤖 Typing...</p>}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div
              className={`p-4 border-t flex gap-2 ${
                isDarkMode ? "border-gray-700 bg-gray-800" : "bg-gray-50"
              }`}
            >
              <button
                onClick={listening ? stopListening : startListening}
                disabled={!browserSupportsSpeechRecognition}
              >
                <Mic size={20} />
              </button>
              <textarea
                ref={textareaRef}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                className={`flex-1 resize-none rounded px-3 py-2 border ${
                  isDarkMode
                    ? "bg-gray-700 border-gray-600 text-white"
                    : "bg-white border-gray-300"
                }`}
              />
              {showSendButton && (
                <button
                  onClick={handleSendMessage}
                  className="px-4 py-2 bg-blue-600 text-white rounded"
                >
                  <Send size={16} />
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AIChatbot;
