import React from 'react';
import { ContentData } from '../types';
import { Mail, Phone, MapPin, Facebook, Instagram, Linkedin, CreditCard } from 'lucide-react';

interface FooterProps {
  content: ContentData;
}

const Footer: React.FC<FooterProps> = ({ content }) => {
  return (
    <footer id="contact" className="bg-brand-teal text-white">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="space-y-8 xl:col-span-1">
            <div className="flex items-center gap-2">
              <img src="/logo.png" alt="MAPI Logo" className="h-10 w-auto brightness-0 invert" />
              <span className="text-2xl font-extrabold text-white tracking-tight">MAPI</span>
            </div>
            <p className="text-gray-300 text-base">
              {content.footer.tagline}
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <span className="sr-only">Facebook</span>
                <Facebook className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <span className="sr-only">Instagram</span>
                <Instagram className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <span className="sr-only">LinkedIn</span>
                <Linkedin className="h-6 w-6" />
              </a>
            </div>
          </div>
          <div className="mt-12 grid grid-cols-2 gap-8 xl:mt-0 xl:col-span-2">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold text-gray-200 tracking-wider uppercase">{content.nav.services}</h3>
                <ul role="list" className="mt-4 space-y-4">
                  <li><a href="#" className="text-base text-gray-300 hover:text-white transition-colors">Basic Care</a></li>
                  <li><a href="#" className="text-base text-gray-300 hover:text-white transition-colors">Standard Care</a></li>
                  <li><a href="#" className="text-base text-gray-300 hover:text-white transition-colors">Premium Care</a></li>
                  <li><a href="#" className="text-base text-gray-300 hover:text-white transition-colors">Transportation</a></li>
                </ul>
              </div>
              <div className="mt-12 md:mt-0">
                <h3 className="text-sm font-semibold text-gray-200 tracking-wider uppercase">{content.footer.contact}</h3>
                <ul role="list" className="mt-4 space-y-4">
                  <li className="flex items-start gap-3">
                    <MapPin className="h-6 w-6 text-brand-orange shrink-0" />
                    <span className="text-base text-gray-300">Kathmandu, Nepal</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Phone className="h-6 w-6 text-brand-orange shrink-0" />
                    <span className="text-base text-gray-300">+977 9800000000</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Mail className="h-6 w-6 text-brand-orange shrink-0" />
                    <span className="text-base text-gray-300">info@mapi.com.np</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-12 border-t border-teal-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-base text-gray-400">
            {content.footer.copyright}
          </p>
          <div className="flex items-center gap-4 opacity-50 grayscale hover:grayscale-0 transition-all">
            <div className="flex items-center gap-1 text-white font-bold text-xs bg-white/10 px-2 py-1 rounded"><span className="italic">VISA</span></div>
            <div className="flex items-center gap-1 text-white font-bold text-xs bg-white/10 px-2 py-1 rounded"><span>Mastercard</span></div>
            <div className="flex items-center gap-1 text-white font-bold text-xs bg-white/10 px-2 py-1 rounded"><span>eSewa</span></div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;