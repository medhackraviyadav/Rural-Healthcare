import React from 'react';
import { HeartHandshake, Twitter, Facebook, Linkedin } from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';

const Footer: React.FC = () => {
  const { language } = useLanguage();
  const currentYear = new Date().getFullYear();

  const content = {
    en: {
      slogan: 'Easily affordable and accessible healthcare, everywhere, for everyone.',
      quickLinks: 'Quick Links',
      howItWorks: 'How It Works',
      services: 'Services',
      vision: 'Vision',
      forDoctors: 'For Doctors',
      legal: 'Legal',
      privacy: 'Privacy Policy',
      terms: 'Terms of Service',
      contact: 'Contact',
      rights: 'All Rights Reserved.',
    },
    hi: {
      slogan: 'सभी के लिए, हर जगह, सस्ती और सुलभ स्वास्थ्य सेवा।',
      quickLinks: 'त्वरित लिंक्स',
      howItWorks: 'कैसे काम करता है',
      services: 'सेवाएं',
      vision: 'हमारा लक्ष्य',
      forDoctors: 'डॉक्टरों के लिए',
      legal: 'कानूनी',
      privacy: 'गोपनीयता नीति',
      terms: 'सेवा की शर्तें',
      contact: 'संपर्क करें',
      rights: 'सर्वाधिकार सुरक्षित।',
    }
  };

  const t = content[language];

  return (
    <footer id="contact" className="bg-brand-secondary text-white">
      <div className="container mx-auto px-6 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-1">
            <a href="#" className="flex items-center space-x-2 mb-4">
              <HeartHandshake className="h-8 w-8 text-white" />
              <span className="text-2xl font-bold">Health-Bridge</span>
            </a>
            <p className="text-gray-300">{t.slogan}</p>
            <div className="flex space-x-4 mt-6">
              <a href="#" className="text-gray-300 hover:text-white transition-colors"><Twitter /></a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors"><Facebook /></a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors"><Linkedin /></a>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-8 md:col-span-2">
            <div>
              <h4 className="font-semibold text-lg mb-4">{t.quickLinks}</h4>
              <ul className="space-y-2">
                <li><a href="#how-it-works" className="text-gray-300 hover:text-white">{t.howItWorks}</a></li>
                <li><a href="#services" className="text-gray-300 hover:text-white">{t.services}</a></li>
                <li><a href="#vision" className="text-gray-300 hover:text-white">{t.vision}</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white">{t.forDoctors}</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-lg mb-4">{t.legal}</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-300 hover:text-white">{t.privacy}</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white">{t.terms}</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white">{t.contact}</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-12 border-t border-gray-600 pt-6 text-center text-gray-400">
          <p>&copy; {currentYear} Health-Bridge. {t.rights}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
