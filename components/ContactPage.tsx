import React from 'react';
import { ContentData } from '../types';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

interface ContactPageProps {
  content: ContentData;
}

const ContactPage: React.FC<ContactPageProps> = ({ content }) => {
  return (
    <div className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl mb-4">{content.contactPage.title}</h1>
          <p className="text-xl text-gray-600">{content.contactPage.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="bg-brand-teal rounded-2xl p-8 md:p-12 text-white shadow-xl">
            <h3 className="text-2xl font-bold mb-8">{content.contactPage.offices}</h3>
            
            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="bg-white/10 p-3 rounded-lg">
                  <MapPin className="h-6 w-6 text-brand-orange" />
                </div>
                <div>
                  <h4 className="font-semibold text-lg mb-1">Kathmandu Head Office</h4>
                  <p className="text-teal-100">Baneshwor, Kathmandu<br/>Nepal</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-white/10 p-3 rounded-lg">
                  <Phone className="h-6 w-6 text-brand-orange" />
                </div>
                <div>
                  <h4 className="font-semibold text-lg mb-1">Phone / WhatsApp</h4>
                  <p className="text-teal-100">+977 9800000000</p>
                  <p className="text-sm text-teal-200 mt-1">(Available 24/7 for emergencies)</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-white/10 p-3 rounded-lg">
                  <Mail className="h-6 w-6 text-brand-orange" />
                </div>
                <div>
                  <h4 className="font-semibold text-lg mb-1">Email</h4>
                  <p className="text-teal-100">info@mapi.com.np</p>
                  <p className="text-teal-100">support@mapi.com.np</p>
                </div>
              </div>
            </div>

            <div className="mt-12 pt-12 border-t border-teal-700">
               <p className="text-teal-200 text-sm">
                 Operating Hours: Sunday - Friday, 9:00 AM - 6:00 PM (NST)
               </p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm">
            <form className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  {content.contactPage.formName}
                </label>
                <input
                  type="text"
                  id="name"
                  className="mt-1 block w-full rounded-md border-gray-300 bg-white shadow-sm focus:border-brand-teal focus:ring-brand-teal sm:text-sm p-3 border"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  {content.contactPage.formEmail}
                </label>
                <input
                  type="email"
                  id="email"
                  className="mt-1 block w-full rounded-md border-gray-300 bg-white shadow-sm focus:border-brand-teal focus:ring-brand-teal sm:text-sm p-3 border"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                  {content.contactPage.formMessage}
                </label>
                <textarea
                  id="message"
                  rows={4}
                  className="mt-1 block w-full rounded-md border-gray-300 bg-white shadow-sm focus:border-brand-teal focus:ring-brand-teal sm:text-sm p-3 border"
                />
              </div>

              <button
                type="button"
                className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-brand-orange hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-orange transition-colors"
              >
                <Send className="h-4 w-4 mr-2" />
                {content.contactPage.submit}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;