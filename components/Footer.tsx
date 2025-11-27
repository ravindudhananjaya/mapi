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
                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor"><path d="M17.523 15.3414c-.5511 0-.9993-.4486-.9993-.9997s.4482-.9997.9993-.9997c.5511 0 .9993.4486.9993.9997s-.4482.9997-.9993.9997m-11.046 0c-.5511 0-.9993-.4486-.9993-.9997s.4482-.9997.9993-.9997c.5511 0 .9993.4486.9993.9997s-.4482.9997-.9993.9997m11.4045-6.02l1.3294-3.887c.4676-1.3662.1208-2.895-1.1025-3.801C17.0125.8203 15.426.915 14.2916 1.848l-3.281 2.703c-.225.1855-.548.1855-.773 0l-3.281-2.703C5.822.915 4.2355.8203 3.139 1.6333c-1.2233.906-1.5701 2.4348-1.1025 3.801l1.3294 3.887c-.864 1.348-1.366 2.955-1.366 4.68 0 4.97 4.029 9 9 9s9-4.03 9-9c0-1.725-.502-3.332-1.366-4.68" /></svg>
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