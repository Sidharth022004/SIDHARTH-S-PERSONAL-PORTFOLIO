import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Code, Users, Award, Download } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import LazyImage from './LazyImage';

const About = () => {
  const { t } = useLanguage();
  
  const highlights = [
    {
      icon: <GraduationCap size={24} />,
      title: t('about.highlights.education'),
      description: t('about.highlights.education.desc')
    },
    {
      icon: <Code size={24} />,
      title: t('about.highlights.experience'),
      description: t('about.highlights.experience.desc')
    },
    {
      icon: <Users size={24} />,
      title: t('about.highlights.leadership'),
      description: t('about.highlights.leadership.desc')
    },
    {
      icon: <Award size={24} />,
      title: t('about.highlights.expertise'),
      description: t('about.highlights.expertise.desc')
    }
  ];

  return (
    <section id="about" className="py-20 bg-gradient-to-br from-blue-50/30 via-white to-purple-50/30 dark:from-gray-900 dark:via-gray-900 dark:to-blue-900/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">{t('about.title')}</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mb-6 rounded-full"></div>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            {t('about.subtitle')}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-center mb-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="relative z-10">
              <LazyImage
                src="/placeholder.svg"
                alt="Sidharth - Software Engineer"
                className="w-full max-w-md mx-auto rounded-2xl shadow-2xl ring-4 ring-blue-500/20"
                width={400}
                height={500}
              />
            </div>
            <div className="absolute -top-4 -right-4 w-full h-full bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl -z-10 opacity-80"></div>
            
            {/* Floating Elements */}
            <motion.div
              className="absolute -top-8 -left-8 w-16 h-16 bg-yellow-400 rounded-full opacity-20"
              animate={{ y: [-10, 10, -10] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute -bottom-8 -right-8 w-12 h-12 bg-blue-400 rounded-full opacity-20"
              animate={{ y: [10, -10, 10] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div className="space-y-4 text-lg leading-relaxed text-gray-600 dark:text-gray-300">
              <p>{t('about.description1')}</p>
              <p>{t('about.description2')}</p>
              <p>{t('about.description3')}</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <motion.button
                onClick={() => document.getElementById('cv')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-full hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center space-x-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Download size={20} />
                <span>{t('about.downloadResume')}</span>
              </motion.button>
              <motion.button
                onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                className="border-2 border-blue-600 text-blue-600 dark:text-blue-400 dark:border-blue-400 px-6 py-3 rounded-full hover:bg-blue-600 hover:text-white dark:hover:bg-blue-400 dark:hover:text-gray-900 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {t('about.viewProjects')}
              </motion.button>
            </div>
          </motion.div>
        </div>

        {/* Enhanced Highlights Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {highlights.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-6 rounded-xl hover:shadow-xl transition-all duration-300 text-center group border border-gray-200/50 dark:border-gray-700/50 hover:border-blue-300/70 dark:hover:border-blue-600/70 hover:bg-white dark:hover:bg-gray-800"
              whileHover={{ y: -5, scale: 1.02 }}
            >
              <div className="text-blue-600 dark:text-blue-400 mb-4 flex justify-center group-hover:scale-110 transition-transform duration-300 bg-blue-50/70 dark:bg-blue-900/20 w-12 h-12 rounded-full items-center mx-auto group-hover:bg-blue-100 dark:group-hover:bg-blue-900/30">
                {item.icon}
              </div>
              <h3 className="font-semibold text-lg mb-2 text-gray-900 dark:text-gray-100">{item.title}</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">{item.description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-8 border border-blue-200 dark:border-blue-800"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">1+</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">{t('hero.stats.years')}</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">3</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">{t('hero.stats.projects')}</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">3</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Internships</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">100%</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Committed to Learning</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;