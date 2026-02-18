import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import FAQ from '../components/FAQ';
import Footer from '../components/Footer';
import BackToTop from '../components/BackToTop';
import { useLanguage } from '../contexts/LanguageContext';

const FAQPage = () => {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const { language } = useLanguage();

    // Toggle dark mode
    const toggleDarkMode = () => {
        setIsDarkMode(!isDarkMode);
    };

    // Apply dark mode class to body
    useEffect(() => {
        if (isDarkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [isDarkMode]);

    return (
        <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? 'dark bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
            <Header
                isDarkMode={isDarkMode}
                toggleDarkMode={toggleDarkMode}
                activeSection="faq"
                scrollToSection={() => { }}
            />

            <main className="pt-20">
                <FAQ />
            </main>

            <Footer />
            <BackToTop />
        </div>
    );
};

export default FAQPage;
