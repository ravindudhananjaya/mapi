import React from 'react';
import { ContentData } from '../types';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { motion } from 'framer-motion';

interface ContactPageProps {
  content: ContentData;
}

const ContactPage: React.FC<ContactPageProps> = ({ content }) => {
  return (
    <div className="bg-white py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-extrabold text-gray-900 sm:text-5xl mb-4"
          >
            {content.contactPage.title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-gray-600"
          >
            {content.contactPage.subtitle}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-brand-teal rounded-3xl p-8 md:p-12 text-white shadow-2xl relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-40 h-40 bg-brand-orange/20 rounded-full blur-3xl"></div>

            <h3 className="text-2xl font-bold mb-8 relative z-10">{content.contactPage.offices}</h3>

            <div className="space-y-8 relative z-10">
              <div className="flex items-start gap-4">
                <div className="bg-white/10 p-4 rounded-xl backdrop-blur-sm">
                  <MapPin className="h-6 w-6 text-brand-orange" />
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-1">Kathmandu Head Office</h4>
                  <p className="text-teal-100 leading-relaxed">Baneshwor, Kathmandu<br />Nepal</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-white/10 p-4 rounded-xl backdrop-blur-sm">
                  <Phone className="h-6 w-6 text-brand-orange" />
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-1">Phone / WhatsApp</h4>
                  <p className="text-teal-100 font-mono text-lg">+977 9800000000</p>
                  <p className="text-sm text-teal-200 mt-1">(Available 24/7 for emergencies)</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-white/10 p-4 rounded-xl backdrop-blur-sm">
                  <Mail className="h-6 w-6 text-brand-orange" />
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-1">Email</h4>
                  <p className="text-teal-100">info@mapi.com.np</p>
                  <p className="text-teal-100">support@mapi.com.np</p>
                </div>
              </div>
            </div>

            <div className="mt-12 pt-12 border-t border-teal-700 relative z-10">
              <p className="text-teal-200 text-sm flex items-center gap-2">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                Operating Hours: Sunday - Friday, 9:00 AM - 6:00 PM (NST)
              </p>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-white rounded-3xl p-8 md:p-12 border border-gray-100 shadow-xl"
          >
            <form className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-bold text-gray-700 mb-2">
                  {content.contactPage.formName}
                </label>
                <input
                  type="text"
                  id="name"
                  className="block w-full rounded-xl border-gray-200 bg-gray-50 shadow-sm focus:border-brand-teal focus:ring-brand-teal sm:text-sm p-4 transition-all hover:bg-white"
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-bold text-gray-700 mb-2">
                  {content.contactPage.formEmail}
                </label>
                <input
                  type="email"
                  id="email"
                  className="block w-full rounded-xl border-gray-200 bg-gray-50 shadow-sm focus:border-brand-teal focus:ring-brand-teal sm:text-sm p-4 transition-all hover:bg-white"
                  placeholder="Enter your email address"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-bold text-gray-700 mb-2">
                  {content.contactPage.formMessage}
                </label>
                <textarea
                  id="message"
                  rows={4}
                  className="block w-full rounded-xl border-gray-200 bg-gray-50 shadow-sm focus:border-brand-teal focus:ring-brand-teal sm:text-sm p-4 transition-all hover:bg-white"
                  placeholder="How can we help you?"
                />
              </div>

              <button
                type="button"
                className="w-full flex justify-center items-center py-4 px-4 border border-transparent rounded-xl shadow-lg text-base font-bold text-white bg-brand-orange hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-orange transition-all transform hover:-translate-y-1"
              >
                <Send className="h-5 w-5 mr-2" />
                {content.contactPage.submit}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;