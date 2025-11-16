import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';

const Hero: React.FC = () => {
  const { language } = useLanguage();

  const content = {
    en: {
      heading1: 'Quality Healthcare,',
      heading2: 'Now in Your Village.',
      paragraph: 'Easily affordable and accessible primary healthcare for everyone, everywhere. No appointments, no travel, no waiting.',
      button1: 'How It Works',
      button2: 'Learn More',
    },
    hi: {
      heading1: 'उत्तम स्वास्थ्य सेवा,',
      heading2: 'अब आपके गाँव में।',
      paragraph: 'सभी के लिए, हर जगह, सस्ती और सुलभ स्वास्थ्य सेवा। कोई अपॉइंटमेंट नहीं, कोई यात्रा नहीं, कोई इंतज़ार नहीं।',
      button1: 'यह कैसे काम करता है',
      button2: 'और जानें',
    }
  };

  const { heading1, heading2, paragraph, button1, button2 } = content[language];

  return (
    <section className="relative bg-white overflow-hidden">
      <div className="container mx-auto px-6 py-20 md:py-32 text-center md:text-left">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 z-10">
            <motion.h1 
              key={language}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl md:text-6xl font-bold text-brand-secondary leading-tight"
            >
              {heading1} <br />
              <span className="text-brand-primary">{heading2}</span>
            </motion.h1>
            <motion.p 
              key={language + 'p'}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mt-6 text-lg md:text-xl text-brand-dark max-w-xl mx-auto md:mx-0"
            >
              {paragraph}
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mt-10 flex flex-col sm:flex-row gap-4 justify-center md:justify-start"
            >
              <a href="#how-it-works" className="bg-brand-primary text-white font-semibold px-8 py-3 rounded-full hover:bg-opacity-90 transition-all duration-300 shadow-lg flex items-center justify-center gap-2">
                {button1}
              </a>
              <a href="#services" className="bg-transparent border-2 border-brand-secondary text-brand-secondary font-semibold px-8 py-3 rounded-full hover:bg-brand-secondary hover:text-white transition-all duration-300 flex items-center justify-center gap-2">
                {button2} <ArrowRight className="h-5 w-5" />
              </a>
            </motion.div>
          </div>
          <div className="md:w-1/2 mt-12 md:mt-0 relative">
            <motion.img 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              src="https://drive.google.com/file/d/1jnrx_7HCYtwFClUy-wseU4EoiHoe6iPR/view?usp=sharing" 
              alt="A doctor consulting with a patient in a rural setting via a digital screen" 
              className="mx-auto w-full max-w-md md:max-w-xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
