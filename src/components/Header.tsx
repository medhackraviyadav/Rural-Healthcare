import React, { useState } from 'react';
import { HeartHandshake, X, Menu, Globe } from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { language, setLanguage } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'hi' : 'en');
  };

  const content = {
    en: {
      navLinks: [
        { name: 'Home', href: '#' },
        { name: 'How It Works', href: '#how-it-works' },
        { name: 'Services', href: '#services' },
        { name: 'Vision', href: '#vision' },
      ],
      contact: 'Contact Us',
      langToggle: 'हिंदी',
    },
    hi: {
      navLinks: [
        { name: 'होम', href: '#' },
        { name: 'कैसे काम करता है', href: '#how-it-works' },
        { name: 'सेवाएं', href: '#services' },
        { name: 'हमारा लक्ष्य', href: '#vision' },
      ],
      contact: 'संपर्क करें',
      langToggle: 'English',
    },
  };

  const { navLinks, contact, langToggle } = content[language];

  return (
    <header className="bg-white/80 backdrop-blur-md sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <a href="#" className="flex items-center space-x-2">
            <HeartHandshake className="h-8 w-8 text-brand-primary" />
            <span className="text-2xl font-bold text-brand-secondary">Health-Bridge</span>
          </a>
          
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a key={link.name} href={link.href} className="text-brand-dark hover:text-brand-primary transition-colors duration-300 font-medium">
                {link.name}
              </a>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <button onClick={toggleLanguage} className="flex items-center gap-2 text-brand-dark hover:text-brand-primary font-semibold transition-colors">
              <Globe className="h-5 w-5" />
              {langToggle}
            </button>
            <a href="#contact" className="bg-brand-primary text-white font-semibold px-6 py-2 rounded-full hover:bg-opacity-90 transition-all duration-300 shadow-md">
              {contact}
            </a>
          </div>

          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu">
              {isOpen ? <X className="h-6 w-6 text-brand-dark" /> : <Menu className="h-6 w-6 text-brand-dark" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="mt-4 md:hidden flex flex-col space-y-4">
            {navLinks.map((link) => (
              <a key={link.name} href={link.href} className="text-brand-dark hover:text-brand-primary transition-colors duration-300" onClick={() => setIsOpen(false)}>
                {link.name}
              </a>
            ))}
             <button onClick={toggleLanguage} className="flex items-center gap-2 text-brand-dark hover:text-brand-primary font-semibold transition-colors py-2">
              <Globe className="h-5 w-5" />
              {langToggle}
            </button>
            <a href="#contact" className="bg-brand-primary text-white text-center font-semibold px-6 py-2 rounded-full hover:bg-opacity-90 transition-all duration-300">
              {contact}
            </a>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
