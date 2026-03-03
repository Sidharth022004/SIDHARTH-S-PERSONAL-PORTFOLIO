import React, { useEffect, useRef } from 'react';
import { ArrowDown } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import { useDarkMode } from '../hooks/useDarkMode';
import * as THREE from 'three';
import TOPOLOGY from 'vanta/dist/vanta.topology.min';

interface HeroProps {
  scrollToSection: (sectionId: string) => void;
}

const Hero = ({ scrollToSection }: HeroProps) => {
  const { t } = useLanguage();
  const vantaRef = useRef<HTMLDivElement>(null);
  const vantaEffect = useRef<any>(null);
  const isDarkMode = useDarkMode();

  const taglines = [
    t('hero.tagline1'),
    t('hero.tagline2'),
    t('hero.tagline3'),
    t('hero.tagline4')
  ];

  const [currentTagline, setCurrentTagline] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTagline((prev) => (prev + 1) % taglines.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [taglines.length]);

  useEffect(() => {
    if (!vantaEffect.current && vantaRef.current) {
      vantaEffect.current = TOPOLOGY({
        el: vantaRef.current,
        THREE: THREE,
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200.00,
        minWidth: 200.00,
        scale: 1.00,
        scaleMobile: 1.00,
        color: isDarkMode ? 0x60a5fa : 0x3b82f6,
        backgroundColor: isDarkMode ? 0x111827 : 0xffffff
      });
    }
    return () => {
      if (vantaEffect.current) {
        vantaEffect.current.destroy();
        vantaEffect.current = null;
      }
    };
  }, [isDarkMode]);

  useEffect(() => {
    if (vantaEffect.current) {
      vantaEffect.current.setOptions({
        color: isDarkMode ? 0x60a5fa : 0x3b82f6,
        backgroundColor: isDarkMode ? 0x111827 : 0xffffff
      });
    }
  }, [isDarkMode]);

  return (
    <section
      id="home"
      ref={vantaRef}
      className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20"
    >

      <div className="relative z-10 text-center text-foreground px-4 max-w-4xl mx-auto">
        <motion.h1
          className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {t('hero.greeting')}{' '}
          <span className="bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
            {t('hero.name')}
          </span>
        </motion.h1>

        {/* Dynamic Tagline */}
        <motion.div
          className="text-2xl md:text-3xl mb-4 h-12 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <motion.span
            key={currentTagline}
            className="font-semibold text-primary inline-block"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            {taglines[currentTagline]}
          </motion.span>
        </motion.div>

        <motion.p
          className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed text-muted-foreground"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          {t('hero.description')}
        </motion.p>

        {/* Enhanced Stats Row */}
        <motion.div
          className="flex flex-wrap justify-center gap-8 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0, duration: 0.8 }}
        >
          <div className="text-center">
            <div className="text-3xl font-bold text-primary">2+</div>
            <div className="text-sm text-muted-foreground">{t('hero.stats.years')}</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary">5+</div>
            <div className="text-sm text-muted-foreground">{t('hero.stats.projects')}</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary">100%</div>
            <div className="text-sm text-muted-foreground">{t('hero.stats.dedicated')}</div>
          </div>
        </motion.div>
        
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          <button
            onClick={() => scrollToSection('projects')}
            className="group bg-primary text-primary-foreground px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-2xl hover:scale-105 hover:-translate-y-0.5"
          >
            <span className="flex items-center space-x-2">
              <span>{t('hero.viewWork')}</span>
              <span className="group-hover:translate-x-1 transition-transform duration-200">
                →
              </span>
            </span>
          </button>
          
          <button
            onClick={() => scrollToSection('contact')}
            className="group border-2 border-primary text-primary px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 hover:bg-primary hover:text-primary-foreground hover:scale-105 hover:-translate-y-0.5"
          >
            {t('hero.getInTouch')}
          </button>
        </motion.div>

        {/* Enhanced Scroll Indicator */}
        <motion.div
          className="flex flex-col items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
        >
          <p className="text-sm text-muted-foreground mb-4">{t('hero.scrollExplore')}</p>
          <motion.button
            onClick={() => scrollToSection('about')}
            className="text-foreground hover:text-primary transition-colors hover:scale-110"
            aria-label="Scroll down to about section"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <ArrowDown size={24} />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero; 