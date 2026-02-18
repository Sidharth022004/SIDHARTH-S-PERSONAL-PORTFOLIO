import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import CV from './components/CV';
import FAQ from './components/FAQ';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';
import BackToTop from './components/BackToTop';
import AIChatbot from './components/AIChatbot';
import { useLanguage } from './contexts/LanguageContext';

// Import separate pages
import AboutPage from './pages/About';
import ProjectsPage from './pages/Projects';
import CVPage from './pages/CV';
import FAQPage from './pages/FAQ';
import ContactPage from './pages/Contact';
import NotFound from './pages/NotFound';

const App = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const sectionRefs = {
    home: useRef<HTMLDivElement>(null),
    about: useRef<HTMLDivElement>(null),
    projects: useRef<HTMLDivElement>(null),
    cv: useRef<HTMLDivElement>(null),
    faq: useRef<HTMLDivElement>(null),
    testimonials: useRef<HTMLDivElement>(null),
    contact: useRef<HTMLDivElement>(null),
  };
  const { language } = useLanguage();

  // Toggle dark mode
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  // Scroll to section
  const scrollToSection = (sectionId: string) => {
    const section = sectionRefs[sectionId as keyof typeof sectionRefs]?.current;
    if (section) {
      window.scrollTo({
        top: section.offsetTop - 80, // Adjust for header height
        behavior: 'smooth'
      });
    }
  };

  // Handle scroll to determine active section
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100;

      Object.entries(sectionRefs).forEach(([sectionId, ref]) => {
        const section = ref.current;
        if (section) {
          const sectionTop = section.offsetTop;
          const sectionHeight = section.offsetHeight;

          if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            setActiveSection(sectionId);
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  },);

  // Apply dark mode class to body
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  return (
    <Router>
      <AIChatbot />
      <Routes>
        {/* Landing Page - keeping original content unchanged */}
        <Route path="/" element={
          <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? 'dark bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
            <Header
              isDarkMode={isDarkMode}
              toggleDarkMode={toggleDarkMode}
              activeSection={activeSection}
              scrollToSection={scrollToSection}
            />

            <main>
              <div ref={sectionRefs.home}>
                <Hero scrollToSection={scrollToSection} />
              </div>

              <div ref={sectionRefs.about}>
                <About />
              </div>

              <div ref={sectionRefs.projects}>
                <Projects />
              </div>

              <div ref={sectionRefs.cv}>
                <CV />
              </div>

              <div ref={sectionRefs.faq}>
                <FAQ />
              </div>

              <div ref={sectionRefs.testimonials}>
                <Testimonials />
              </div>

              <div ref={sectionRefs.contact}>
                <Contact />
              </div>
            </main>

            <Footer />
            <BackToTop />
          </div>
        } />

        {/* Separate Pages */}
        <Route path="/about" element={<AboutPage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/cv" element={<CVPage />} />
        <Route path="/faq" element={<FAQPage />} />
        <Route path="/contact" element={<ContactPage />} />

        {/* Catch-all route for 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
