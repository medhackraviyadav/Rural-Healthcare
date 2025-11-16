import React from 'react';
import { motion } from 'framer-motion';
import { Footprints, Activity, FileText, PhoneForwarded } from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';

const HowItWorks: React.FC = () => {
  const { language } = useLanguage();

  const content = {
    en: {
      title: 'Simple Steps to Better Health',
      subtitle: 'Our process is designed to be quick, easy, and stress-free.',
      steps: [
        { icon: Footprints, title: 'Step 1: Walk In', description: 'Visit our health cubicle anytime. No appointment needed.' },
        { icon: Activity, title: 'Step 2: Use Devices', description: 'Follow simple on-screen instructions to perform your own checkups.' },
        { icon: FileText, title: 'Step 3: Get Report', description: 'View your health report instantly in simple, clear language.' },
        { icon: PhoneForwarded, title: 'Step 4: Talk to Doctor', description: 'If needed, connect with a remote doctor via video call for diagnosis.' },
      ]
    },
    hi: {
      title: 'बेहतर स्वास्थ्य के लिए सरल कदम',
      subtitle: 'हमारी प्रक्रिया त्वरित, आसान और तनाव-मुक्त होने के लिए डिज़ाइन की गई है।',
      steps: [
        { icon: Footprints, title: 'कदम 1: अंदर आएं', description: 'हमारे स्वास्थ्य बूथ पर कभी भी आएं। किसी अपॉइंटमेंट की आवश्यकता नहीं है।' },
        { icon: Activity, title: 'कदम 2: उपकरण इस्तेमाल करें', description: 'स्क्रीन पर दिए गए सरल निर्देशों का पालन करके अपनी जांच स्वयं करें।' },
        { icon: FileText, title: 'कदम 3: रिपोर्ट देखें', description: 'अपनी स्वास्थ्य रिपोर्ट तुरंत सरल, स्पष्ट भाषा में देखें।' },
        { icon: PhoneForwarded, title: 'कदम 4: डॉक्टर से बात करें', description: 'यदि आवश्यक हो, तो निदान के लिए वीडियो कॉल के माध्यम से डॉक्टर से जुड़ें।' },
      ]
    }
  };

  const { title, subtitle, steps } = content[language];

  return (
    <section id="how-it-works" className="py-20 md:py-28 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-brand-secondary">{title}</h2>
          <p className="mt-4 text-lg text-brand-dark max-w-2xl mx-auto">{subtitle}</p>
        </div>
        <div className="relative">
          {/* Dotted line for desktop */}
          <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-brand-primary/30" style={{transform: 'translateY(-50%)'}}></div>

          <div className="grid md:grid-cols-4 gap-10 md:gap-0">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="flex flex-col items-center text-center relative"
              >
                <div className="bg-white border-4 border-brand-primary/30 p-4 rounded-full mb-4 z-10">
                  <div className="bg-brand-primary text-white p-5 rounded-full">
                    <step.icon className="h-8 w-8" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-brand-secondary mb-2">{step.title}</h3>
                <p className="text-brand-dark max-w-xs">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
