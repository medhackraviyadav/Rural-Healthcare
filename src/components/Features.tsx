import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { HeartPulse, Video, Accessibility, Thermometer, Droplet, Wind, Scale, Stethoscope, User, Baby, ArrowRight } from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';
import Modal from './Modal';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: number;
  onClick?: () => void;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description, delay, onClick }) => {
  const CardWrapper = onClick ? 'button' : 'div';

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true }}
      className="h-full"
    >
      <CardWrapper
        onClick={onClick}
        className={`bg-white p-8 rounded-2xl shadow-lg text-center flex flex-col items-center h-full w-full ${onClick ? 'cursor-pointer hover:shadow-xl hover:-translate-y-1 transition-all duration-300' : ''}`}
      >
        <div className="bg-brand-primary/10 p-4 rounded-full mb-6">
          {icon}
        </div>
        <h3 className="text-2xl font-bold text-brand-secondary mb-3">{title}</h3>
        <p className="text-brand-dark leading-relaxed flex-grow">{description}</p>
        {onClick && (
          <div className="mt-4 text-brand-primary font-semibold flex items-center gap-2">
            {useLanguage().language === 'en' ? 'Learn More' : 'और जानें'}
            <ArrowRight className="h-4 w-4" />
          </div>
        )}
      </CardWrapper>
    </motion.div>
  );
};


const Features: React.FC = () => {
  const { language } = useLanguage();
  const [modalContent, setModalContent] = useState<'checkups' | 'doctors' | null>(null);

  const content = {
    en: {
      title: 'Your Health, Simplified',
      subtitle: 'We provide a complete primary care solution, from testing to treatment.',
      features: [
        {
          id: 'checkups',
          icon: <HeartPulse className="h-10 w-10 text-brand-primary" />,
          title: 'Instant Checkups',
          description: 'Get your temperature, BP, sugar levels, and more measured in minutes with our easy-to-use devices.',
        },
        {
          id: 'doctors',
          icon: <Video className="h-10 w-10 text-brand-primary" />,
          title: 'Expert Doctors, Remotely',
          description: 'Connect with qualified doctors through a video call in your local language, right after your checkup.',
        },
        {
          id: 'accessible',
          icon: <Accessibility className="h-10 w-10 text-brand-primary" />,
          title: 'Affordable & Accessible',
          description: 'High-quality healthcare that is close to home and light on your pocket, available without any prior appointment.',
        },
      ],
      checkupsModal: {
        title: 'Available Instant Checkups',
        items: [
          { icon: <Thermometer className="h-6 w-6 text-brand-primary" />, name: 'Body Temperature' },
          { icon: <HeartPulse className="h-6 w-6 text-brand-primary" />, name: 'Blood Pressure & Pulse' },
          { icon: <Droplet className="h-6 w-6 text-brand-primary" />, name: 'Blood Sugar (Glucose)' },
          { icon: <Wind className="h-6 w-6 text-brand-primary" />, name: 'Oxygen Saturation (SpO2)' },
          { icon: <Scale className="h-6 w-6 text-brand-primary" />, name: 'Weight & BMI' },
        ]
      },
      doctorsModal: {
        title: 'Connect with a Doctor',
        subtitle: 'Our doctors are available to help you. Choose a speciality to connect.',
        items: [
          { icon: <Stethoscope className="h-6 w-6 text-brand-primary" />, name: 'General Physician' },
          { icon: <Baby className="h-6 w-6 text-brand-primary" />, name: 'Pediatrician (Child Specialist)' },
          { icon: <User className="h-6 w-6 text-brand-primary" />, name: 'Diabetologist (Sugar Specialist)' },
          { icon: <HeartPulse className="h-6 w-6 text-brand-primary" />, name: 'Cardiologist (Heart - Referral)' },
        ],
        button: 'Connect Now'
      }
    },
    hi: {
      title: 'आपका स्वास्थ्य, अब सरल',
      subtitle: 'हम जांच से लेकर इलाज तक, एक संपूर्ण प्राथमिक देखभाल समाधान प्रदान करते हैं।',
      features: [
        {
          id: 'checkups',
          icon: <HeartPulse className="h-10 w-10 text-brand-primary" />,
          title: 'तुरंत जांच',
          description: 'हमारे आसान उपकरणों से मिनटों में अपना तापमान, बीपी, शुगर लेवल, और बहुत कुछ मापें।',
        },
        {
          id: 'doctors',
          icon: <Video className="h-10 w-10 text-brand-primary" />,
          title: 'विशेषज्ञ डॉक्टर, दूर से',
          description: 'जांच के तुरंत बाद, अपनी स्थानीय भाषा में वीडियो कॉल के माध्यम से योग्य डॉक्टरों से जुड़ें।',
        },
        {
          id: 'accessible',
          icon: <Accessibility className="h-10 w-10 text-brand-primary" />,
          title: 'सस्ता और सुलभ',
          description: 'उच्च गुणवत्ता वाली स्वास्थ्य सेवा जो घर के करीब और सस्ती है, बिना किसी अपॉइंटमेंट के उपलब्ध है।',
        },
      ],
      checkupsModal: {
        title: 'उपलब्ध तत्काल जांच',
        items: [
          { icon: <Thermometer className="h-6 w-6 text-brand-primary" />, name: 'शरीर का तापमान' },
          { icon: <HeartPulse className="h-6 w-6 text-brand-primary" />, name: 'रक्तचाप और पल्स' },
          { icon: <Droplet className="h-6 w-6 text-brand-primary" />, name: 'ब्लड शुगर (ग्लूकोज)' },
          { icon: <Wind className="h-6 w-6 text-brand-primary" />, name: 'ऑक्सीजन स्तर (SpO2)' },
          { icon: <Scale className="h-6 w-6 text-brand-primary" />, name: 'वजन और बीएमआई' },
        ]
      },
      doctorsModal: {
        title: 'डॉक्टर से जुड़ें',
        subtitle: 'हमारे डॉक्टर आपकी मदद के लिए उपलब्ध हैं। जुड़ने के लिए एक विशेषज्ञता चुनें।',
        items: [
          { icon: <Stethoscope className="h-6 w-6 text-brand-primary" />, name: 'सामान्य चिकित्सक' },
          { icon: <Baby className="h-6 w-6 text-brand-primary" />, name: 'बाल रोग विशेषज्ञ' },
          { icon: <User className="h-6 w-6 text-brand-primary" />, name: 'मधुमेह विशेषज्ञ (शुगर)' },
          { icon: <HeartPulse className="h-6 w-6 text-brand-primary" />, name: 'हृदय रोग विशेषज्ञ (रेफरल)' },
        ],
        button: 'अभी कनेक्ट करें'
      }
    }
  };

  const t = content[language];
  const modalTitle = modalContent === 'checkups' ? t.checkupsModal.title : modalContent === 'doctors' ? t.doctorsModal.title : '';

  return (
    <>
      <section id="services" className="py-20 md:py-28 bg-brand-light">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-brand-secondary">{t.title}</h2>
            <p className="mt-4 text-lg text-brand-dark max-w-2xl mx-auto">{t.subtitle}</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {t.features.map((feature, index) => (
              <FeatureCard 
                key={feature.id} 
                {...feature} 
                delay={index * 0.2} 
                onClick={feature.id === 'checkups' || feature.id === 'doctors' ? () => setModalContent(feature.id as 'checkups' | 'doctors') : undefined}
              />
            ))}
          </div>
        </div>
      </section>

      <Modal isOpen={modalContent !== null} onClose={() => setModalContent(null)} title={modalTitle}>
        {modalContent === 'checkups' && (
          <ul className="space-y-4">
            {t.checkupsModal.items.map(item => (
              <li key={item.name} className="flex items-center gap-4 bg-gray-50 p-4 rounded-lg">
                <div className="bg-brand-primary/10 p-2 rounded-full">{item.icon}</div>
                <span className="text-lg text-brand-dark font-medium">{item.name}</span>
              </li>
            ))}
          </ul>
        )}
        {modalContent === 'doctors' && (
          <div>
            <p className="mb-6 text-brand-dark">{t.doctorsModal.subtitle}</p>
            <ul className="space-y-4 mb-8">
              {t.doctorsModal.items.map(item => (
                <li key={item.name} className="flex items-center gap-4 bg-gray-50 p-4 rounded-lg">
                  <div className="bg-brand-primary/10 p-2 rounded-full">{item.icon}</div>
                  <span className="text-lg text-brand-dark font-medium">{item.name}</span>
                </li>
              ))}
            </ul>
            <button className="w-full bg-brand-primary text-white font-semibold px-8 py-3 rounded-full hover:bg-opacity-90 transition-all duration-300 shadow-lg flex items-center justify-center gap-2">
              {t.doctorsModal.button}
            </button>
          </div>
        )}
      </Modal>
    </>
  );
};

export default Features;
