import React from 'react';
import { motion } from 'framer-motion';
import { Store, ArrowRightLeft, Sprout } from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';

interface VisionCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: number;
}

const VisionCard: React.FC<VisionCardProps> = ({ icon, title, description, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
    viewport={{ once: true }}
    className="bg-white p-8 rounded-2xl shadow-lg text-center flex flex-col items-center h-full"
  >
    <div className="bg-brand-primary/10 p-4 rounded-full mb-6">
      {icon}
    </div>
    <h3 className="text-2xl font-bold text-brand-secondary mb-3">{title}</h3>
    <p className="text-brand-dark leading-relaxed">{description}</p>
  </motion.div>
);

const Vision: React.FC = () => {
  const { language } = useLanguage();

  const content = {
    en: {
      title: 'Our Vision for a Healthier India',
      subtitle: 'We are committed to transforming rural healthcare from the ground up.',
      visions: [
        {
          icon: <Store className="h-10 w-10 text-brand-primary" />,
          title: 'Empowering Villages',
          description: 'Bringing state-of-the-art health tech to the most remote corners, ensuring no one is left behind.',
        },
        {
          icon: <ArrowRightLeft className="h-10 w-10 text-brand-primary" />,
          title: 'Bridging the Gap',
          description: 'Connecting patients with expert doctors instantly, breaking down barriers of distance and time.',
        },
        {
          icon: <Sprout className="h-10 w-10 text-brand-primary" />,
          title: 'A Healthier Future',
          description: 'Building a sustainable healthcare ecosystem that is preventive, predictive, and personalized for every citizen.',
        },
      ]
    },
    hi: {
      title: 'एक स्वस्थ भारत के लिए हमारी दृष्टि',
      subtitle: 'हम ग्रामीण स्वास्थ्य सेवा को जमीनी स्तर से बदलने के लिए प्रतिबद्ध हैं।',
      visions: [
        {
          icon: <Store className="h-10 w-10 text-brand-primary" />,
          title: 'गांवों को सशक्त बनाना',
          description: 'अत्याधुनिक स्वास्थ्य तकनीक को सबसे दूरस्थ कोनों तक पहुंचाना, यह सुनिश्चित करना कि कोई भी पीछे न छूटे।',
        },
        {
          icon: <ArrowRightLeft className="h-10 w-10 text-brand-primary" />,
          title: 'अंतर को पाटना',
          description: 'रोगियों को विशेषज्ञ डॉक्टरों से तुरंत जोड़ना, दूरी और समय की बाधाओं को तोड़ना।',
        },
        {
          icon: <Sprout className="h-10 w-10 text-brand-primary" />,
          title: 'एक स्वस्थ भविष्य',
          description: 'एक स्थायी स्वास्थ्य पारिस्थितिकी तंत्र का निर्माण करना जो प्रत्येक नागरिक के लिए व्यक्तिगत हो।',
        },
      ]
    }
  };

  const { title, subtitle, visions } = content[language];

  return (
    <section id="vision" className="py-20 md:py-28 bg-brand-light">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-brand-secondary">{title}</h2>
          <p className="mt-4 text-lg text-brand-dark max-w-2xl mx-auto">{subtitle}</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {visions.map((vision, index) => (
            <VisionCard key={vision.title} {...vision} delay={index * 0.2} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Vision;
