import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import * as LucideIcons from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';
import Modal from './Modal';
import Spinner from './Spinner';
import { getCheckups, getDoctorSpecialities, requestConsultation } from '../services/api';
import { Checkup, DoctorSpeciality } from '../types';

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
          <div className="mt-4 text-brand-primary font-semibold flex items-center gap-2 justify-center">
            {useLanguage().language === 'en' ? 'Learn More' : 'और जानें'}
            <LucideIcons.ArrowRight className="h-4 w-4" />
          </div>
        )}
      </CardWrapper>
    </motion.div>
  );
};

const Features: React.FC = () => {
  const { language } = useLanguage();
  const [modalContent, setModalContent] = useState<'checkups' | 'doctors' | null>(null);
  
  const [checkups, setCheckups] = useState<Checkup[]>([]);
  const [doctors, setDoctors] = useState<DoctorSpeciality[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!modalContent) return;

      setIsLoading(true);
      setError(null);
      try {
        if (modalContent === 'checkups') {
          const data = await getCheckups();
          setCheckups(data);
        } else if (modalContent === 'doctors') {
          const data = await getDoctorSpecialities();
          setDoctors(data);
        }
      } catch (err) {
        setError(language === 'en' ? 'Failed to load data. Please try again later.' : 'डेटा लोड करने में विफल। कृपया बाद में पुनः प्रयास करें।');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [modalContent, language]);

  const handleConnectClick = async (speciality: DoctorSpeciality) => {
    setIsConnecting(speciality.id);
    setError(null);
    try {
      const result = await requestConsultation(speciality.id);
      if(result.success) {
        // In a real app, you would redirect to the consultation page
        // e.g., router.push(`/consultation/${result.consultationId}`)
        alert(language === 'en' ? `Connecting you now... (ID: ${result.consultationId})` : `अब आपको कनेक्ट कर रहे हैं... (ID: ${result.consultationId})`);
        setModalContent(null); // Close modal on success
      }
    } catch (err) {
      setError(language === 'en' ? 'Failed to connect. Please try again.' : 'कनेक्ट करने में विफल। कृपया पुनः प्रयास करें।');
    } finally {
      setIsConnecting(null);
    }
  };

  const content = {
    en: {
      title: 'Your Health, Simplified',
      subtitle: 'We provide a complete primary care solution, from testing to treatment.',
      features: [
        {
          id: 'checkups',
          icon: <LucideIcons.HeartPulse className="h-10 w-10 text-brand-primary" />,
          title: 'Instant Checkups',
          description: 'Get your temperature, BP, sugar levels, and more measured in minutes with our easy-to-use devices.',
        },
        {
          id: 'doctors',
          icon: <LucideIcons.Video className="h-10 w-10 text-brand-primary" />,
          title: 'Expert Doctors, Remotely',
          description: 'Connect with qualified doctors through a video call in your local language, right after your checkup.',
        },
        {
          id: 'accessible',
          icon: <LucideIcons.Accessibility className="h-10 w-10 text-brand-primary" />,
          title: 'Affordable & Accessible',
          description: 'High-quality healthcare that is close to home and light on your pocket, available without any prior appointment.',
        },
      ],
      checkupsModalTitle: 'Available Instant Checkups',
      doctorsModalTitle: 'Connect with a Doctor',
      doctorsModalSubtitle: 'Our doctors are available to help you. Choose a speciality to connect.',
      connectButton: 'Connect Now',
      connectingButton: 'Connecting...',
    },
    hi: {
      title: 'आपका स्वास्थ्य, अब सरल',
      subtitle: 'हम जांच से लेकर इलाज तक, एक संपूर्ण प्राथमिक देखभाल समाधान प्रदान करते हैं।',
      features: [
        {
          id: 'checkups',
          icon: <LucideIcons.HeartPulse className="h-10 w-10 text-brand-primary" />,
          title: 'तुरंत जांच',
          description: 'हमारे आसान उपकरणों से मिनटों में अपना तापमान, बीपी, शुगर लेवल, और बहुत कुछ मापें।',
        },
        {
          id: 'doctors',
          icon: <LucideIcons.Video className="h-10 w-10 text-brand-primary" />,
          title: 'विशेषज्ञ डॉक्टर, दूर से',
          description: 'जांच के तुरंत बाद, अपनी स्थानीय भाषा में वीडियो कॉल के माध्यम से योग्य डॉक्टरों से जुड़ें।',
        },
        {
          id: 'accessible',
          icon: <LucideIcons.Accessibility className="h-10 w-10 text-brand-primary" />,
          title: 'सस्ता और सुलभ',
          description: 'उच्च गुणवत्ता वाली स्वास्थ्य सेवा जो घर के करीब और सस्ती है, बिना किसी अपॉइंटमेंट के उपलब्ध है।',
        },
      ],
      checkupsModalTitle: 'उपलब्ध तत्काल जांच',
      doctorsModalTitle: 'डॉक्टर से जुड़ें',
      doctorsModalSubtitle: 'हमारे डॉक्टर आपकी मदद के लिए उपलब्ध हैं। जुड़ने के लिए एक विशेषज्ञता चुनें।',
      connectButton: 'अभी कनेक्ट करें',
      connectingButton: 'कनेक्ट हो रहा है...',
    }
  };

  const t = content[language];
  const modalTitle = modalContent === 'checkups' ? t.checkupsModalTitle : modalContent === 'doctors' ? t.doctorsModalTitle : '';

  const renderIcon = (iconName: keyof typeof LucideIcons, props: object) => {
    const IconComponent = LucideIcons[iconName];
    return IconComponent ? <IconComponent {...props} /> : null;
  };

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
        {isLoading ? <Spinner /> : error ? <p className="text-red-500 text-center">{error}</p> : (
          <>
            {modalContent === 'checkups' && (
              <ul className="space-y-4">
                {checkups.map(item => (
                  <li key={item.id} className="flex items-center gap-4 bg-gray-50 p-4 rounded-lg">
                    <div className="bg-brand-primary/10 p-2 rounded-full">
                      {renderIcon(item.icon, { className: "h-6 w-6 text-brand-primary" })}
                    </div>
                    <span className="text-lg text-brand-dark font-medium">{language === 'hi' ? item.name.replace('Body Temperature', 'शरीर का तापमान').replace('Blood Pressure & Pulse', 'रक्तचाप और पल्स').replace('Blood Sugar (Glucose)', 'ब्लड शुगर (ग्लूकोज)').replace('Oxygen Saturation (SpO2)', 'ऑक्सीजन स्तर (SpO2)').replace('Weight & BMI', 'वजन और बीएमआई') : item.name}</span>
                  </li>
                ))}
              </ul>
            )}
            {modalContent === 'doctors' && (
              <div>
                <p className="mb-6 text-brand-dark">{t.doctorsModalSubtitle}</p>
                <ul className="space-y-3 mb-8">
                  {doctors.map(item => (
                    <li key={item.id} className="flex items-center justify-between gap-4 bg-gray-50 p-3 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="bg-brand-primary/10 p-2 rounded-full">
                          {renderIcon(item.icon, { className: "h-6 w-6 text-brand-primary" })}
                        </div>
                        <div>
                          <span className="text-lg text-brand-dark font-medium">{language === 'hi' ? item.name.replace('General Physician', 'सामान्य चिकित्सक').replace('Pediatrician', 'बाल रोग विशेषज्ञ').replace('Diabetologist', 'मधुमेह विशेषज्ञ').replace('Cardiologist', 'हृदय रोग विशेषज्ञ') : item.name}</span>
                          {item.description && <p className="text-sm text-gray-500">{language === 'hi' ? item.description.replace('Child Specialist', 'बाल विशेषज्ञ').replace('Sugar Specialist', 'शुगर विशेषज्ञ').replace('Heart - Referral', 'हृदय - रेफरल') : item.description}</p>}
                        </div>
                      </div>
                      <button 
                        onClick={() => handleConnectClick(item)}
                        disabled={isConnecting !== null}
                        className="bg-brand-primary text-white font-semibold px-4 py-2 rounded-full hover:bg-opacity-90 transition-all duration-300 shadow-md text-sm disabled:bg-gray-400 disabled:cursor-not-allowed"
                      >
                        {isConnecting === item.id ? t.connectingButton : t.connectButton}
                      </button>
                    </li>
                  ))}
                </ul>
                {error && <p className="text-red-500 text-center mb-4">{error}</p>}
              </div>
            )}
          </>
        )}
      </Modal>
    </>
  );
};

export default Features;
