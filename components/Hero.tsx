import React from 'react';
import { ContentData } from '../types';
import { Star } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

interface HeroProps {
  content: ContentData;
  onCtaClick?: () => void;
}

const Hero: React.FC<HeroProps> = ({ content, onCtaClick }) => {
  const navigate = useNavigate();

  const handleCtaClick = () => {
    if (onCtaClick) {
      onCtaClick();
    } else {
      navigate('/services');
    }
  };

  return (
    <div className="relative bg-brand-light overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="relative z-10 pb-8 bg-brand-light sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
          <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
            <div className="sm:text-center lg:text-left">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center px-3 py-1 rounded-full border border-brand-orange/30 bg-orange-50 text-brand-orange text-sm font-medium mb-6"
              >
                <Star className="w-4 h-4 mr-2 fill-current" />
                #1 Elderly Care in Nepal
              </motion.div>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl mb-6"
              >
                <span className="block xl:inline leading-tight">{content.hero.title}</span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0"
              >
                {content.hero.subtitle}
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="mt-8 sm:mt-10 sm:flex sm:justify-center lg:justify-start gap-4"
              >
                <div className="rounded-md shadow">
                  <button
                    onClick={handleCtaClick}
                    className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-full text-white bg-brand-teal hover:bg-teal-700 md:py-4 md:text-lg transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                  >
                    {content.hero.cta}
                  </button>
                </div>
                <div className="mt-3 sm:mt-0 sm:ml-3">
                  <button
                    onClick={() => navigate('/services')}
                    className="w-full flex items-center justify-center px-8 py-3 border border-gray-300 text-base font-medium rounded-full text-gray-700 bg-white hover:bg-gray-50 md:py-4 md:text-lg transition-all hover:shadow-md"
                  >
                    View Services
                  </button>
                </div>
              </motion.div>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="mt-6 text-sm text-gray-500 font-medium flex items-center gap-2"
              >
                <span className="flex -space-x-2">
                  <img className="w-8 h-8 rounded-full border-2 border-white object-cover" src="/avatar-1.png" alt="User" />
                  <img className="w-8 h-8 rounded-full border-2 border-white object-cover" src="/avatar-2.png" alt="User" />
                  <img className="w-8 h-8 rounded-full border-2 border-white object-cover" src="/avatar-3.png" alt="User" />
                </span>
                {content.hero.trust}
              </motion.p>
            </div>
          </main>
        </div>
      </div>
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2"
      >
        <img
          className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full"
          src="/hero-image.png"
          alt="Happy elderly person with caregiver"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-light via-brand-light/20 to-transparent lg:via-brand-light/10"></div>
      </motion.div>
    </div>
  );
};

export default Hero;