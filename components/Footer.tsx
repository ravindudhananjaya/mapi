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
                <h3 className="text-sm font-semibold text-gray-200 tracking-wider uppercase">Quick Links</h3>
                <ul role="list" className="mt-4 space-y-4">
                  <li><a href="#" className="text-base text-gray-300 hover:text-white transition-colors">Home</a></li>
                  <li><a href="#about" className="text-base text-gray-300 hover:text-white transition-colors">About Us</a></li>
                  <li><a href="#services" className="text-base text-gray-300 hover:text-white transition-colors">Services</a></li>
                  <li><a href="#contact" className="text-base text-gray-300 hover:text-white transition-colors">Contact</a></li>
                </ul>
              </div>
              <div className="mt-12 md:mt-0">
                <h3 className="text-sm font-semibold text-gray-200 tracking-wider uppercase">{content.nav.services}</h3>
                <ul role="list" className="mt-4 space-y-4">
                  <li><a href="#" className="text-base text-gray-300 hover:text-white transition-colors">Basic Care</a></li>
                  <li><a href="#" className="text-base text-gray-300 hover:text-white transition-colors">Standard Care</a></li>
                  <li><a href="#" className="text-base text-gray-300 hover:text-white transition-colors">Premium Care</a></li>
                  <li><a href="#" className="text-base text-gray-300 hover:text-white transition-colors">Transportation</a></li>
                </ul>
              </div>
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
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
              <div className="mt-12 md:mt-0">
                <h3 className="text-sm font-semibold text-gray-200 tracking-wider uppercase">Get the App</h3>
                <p className="mt-4 text-sm text-gray-300 mb-4">Manage care for your loved ones from anywhere.</p>
                <div className="flex flex-col gap-3">
                  <button className="flex items-center justify-center gap-2 bg-gray-900 hover:bg-gray-800 text-white px-4 py-2 rounded-lg transition-colors border border-gray-700">
                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.68-.83 1.14-1.99 1.01-3.15-1.02.05-2.26.69-3.01 1.57-.67.78-1.26 2.03-1.11 3.17 1.14.09 2.3-.63 3.11-1.59z" /></svg>
                    <div className="text-left">
                      <div className="text-[10px] leading-none">Download on the</div>
                      <div className="text-sm font-bold leading-none">App Store</div>
                    </div>
                  </button>
                  <button className="flex items-center justify-center gap-2 bg-gray-900 hover:bg-gray-800 text-white px-4 py-2 rounded-lg transition-colors border border-gray-700">
                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor"><path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.5,12.92 20.16,13.19L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" /></svg>
                    <div className="text-left">
                      <div className="text-[10px] leading-none">GET IT ON</div>
                      <div className="text-sm font-bold leading-none">Google Play</div>
                    </div>
                  </button>
                </div>
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