import React, { useState } from 'react';
import { ContentData } from '../types';
import { Mail, Phone, MapPin, Send, MessageCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ContactPageProps {
  content: ContentData;
}

const ContactPage: React.FC<ContactPageProps> = ({ content }) => {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const faqs = [
    {
      question: "How do I book a caregiver?",
      answer: "You can book a caregiver directly through our app or website. Simply select the service you need, choose a date and time, and confirm your booking."
    },
    {
      question: "Are your caregivers certified?",
      answer: "Yes, all our caregivers undergo rigorous background checks and are certified professionals with experience in elderly care."
    },
    {
      question: "What areas do you serve?",
      answer: "We currently serve the entire Kathmandu Valley, including Lalitpur and Bhaktapur. We are expanding to other cities soon."
    },
    {
      question: "Can I cancel a booking?",
      answer: "Yes, you can cancel a booking up to 24 hours in advance for a full refund. Cancellations within 24 hours may be subject to a fee."
    }
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <div className="bg-brand-teal text-white py-20 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
          <div className="absolute -top-[50%] -left-[20%] w-[80%] h-[80%] bg-white/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-[10%] right-[10%] w-[40%] h-[40%] bg-brand-orange/10 rounded-full blur-3xl"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-extrabold sm:text-6xl mb-6"
          >
            {content.contactPage.title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-teal-100 max-w-2xl mx-auto"
          >
            {content.contactPage.subtitle}
          </motion.p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-20 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Contact Info Cards */}
          <div className="lg:col-span-1 space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="bg-brand-orange/10 p-3 rounded-xl">
                  <Phone className="h-6 w-6 text-brand-orange" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">Call Us</h3>
                  <p className="text-sm text-gray-500">Mon-Fri from 9am to 6pm</p>
                </div>
              </div>
              <p className="text-2xl font-bold text-brand-teal">+977 9800000000</p>
              <button className="mt-4 w-full py-2 border border-brand-teal text-brand-teal rounded-lg hover:bg-teal-50 font-medium transition-colors">
                Request Callback
              </button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="bg-blue-100 p-3 rounded-xl">
                  <Mail className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">Email Us</h3>
                  <p className="text-sm text-gray-500">We reply within 24 hours</p>
                </div>
              </div>
              <p className="text-lg font-medium text-gray-900">info@mapi.com.np</p>
              <p className="text-lg font-medium text-gray-900">support@mapi.com.np</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="bg-green-100 p-3 rounded-xl">
                  <MapPin className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">Visit Us</h3>
                  <p className="text-sm text-gray-500">Come say hello at our office</p>
                </div>
              </div>
              <p className="text-gray-700 leading-relaxed">
                Baneshwor, Kathmandu<br />
                Bagmati Province, Nepal
              </p>
            </motion.div>
          </div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="lg:col-span-2 bg-white rounded-3xl shadow-2xl p-8 md:p-12 border border-gray-100"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Send us a Message</h2>
            <p className="text-gray-600 mb-8">Fill out the form below and our team will get back to you shortly.</p>

            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-bold text-gray-700 mb-2">
                    {content.contactPage.formName}
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="block w-full rounded-xl border-gray-200 bg-gray-50 focus:bg-white shadow-sm focus:border-brand-teal focus:ring-brand-teal sm:text-sm p-4 transition-all"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-bold text-gray-700 mb-2">
                    {content.contactPage.formEmail}
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="block w-full rounded-xl border-gray-200 bg-gray-50 focus:bg-white shadow-sm focus:border-brand-teal focus:ring-brand-teal sm:text-sm p-4 transition-all"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-bold text-gray-700 mb-2">
                  Subject
                </label>
                <select
                  id="subject"
                  className="block w-full rounded-xl border-gray-200 bg-gray-50 focus:bg-white shadow-sm focus:border-brand-teal focus:ring-brand-teal sm:text-sm p-4 transition-all"
                >
                  <option>General Inquiry</option>
                  <option>Service Booking</option>
                  <option>Partnership</option>
                  <option>Feedback</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-bold text-gray-700 mb-2">
                  {content.contactPage.formMessage}
                </label>
                <textarea
                  id="message"
                  rows={6}
                  className="block w-full rounded-xl border-gray-200 bg-gray-50 focus:bg-white shadow-sm focus:border-brand-teal focus:ring-brand-teal sm:text-sm p-4 transition-all"
                  placeholder="How can we help you today?"
                />
              </div>

              <button
                type="button"
                className="w-full md:w-auto flex justify-center items-center py-4 px-8 border border-transparent rounded-xl shadow-lg text-base font-bold text-white bg-brand-orange hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-orange transition-all transform hover:-translate-y-1"
              >
                <Send className="h-5 w-5 mr-2" />
                {content.contactPage.submit}
              </button>
            </form>
          </motion.div>

        </div>

        {/* Map Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 h-96 relative"
        >
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d56516.31625951266!2d85.3240!3d27.7172!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb198a307baabf%3A0xb5137c1bf18db1ea!2sKathmandu%2044600!5e0!3m2!1sen!2snp!4v1625561123456!5m2!1sen!2snp"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            title="MAPI Office Location"
            className="grayscale hover:grayscale-0 transition-all duration-700"
          ></iframe>
          <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-md p-4 rounded-xl shadow-lg max-w-xs">
            <h4 className="font-bold text-gray-900 flex items-center gap-2"><MapPin className="h-4 w-4 text-brand-orange" /> Our Location</h4>
            <p className="text-sm text-gray-600 mt-1">Visit us at our main office in Kathmandu for a consultation.</p>
          </div>
        </motion.div>

        {/* FAQ Section */}
        <div className="mt-24 max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Frequently Asked Questions</h2>
            <p className="text-gray-600 mt-2">Find answers to common questions about our services.</p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
              >
                <button
                  onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                  className="w-full flex justify-between items-center p-6 text-left hover:bg-gray-50 transition-colors"
                >
                  <span className="font-bold text-gray-900">{faq.question}</span>
                  {activeFaq === idx ? <ChevronUp className="h-5 w-5 text-brand-teal" /> : <ChevronDown className="h-5 w-5 text-gray-400" />}
                </button>
                <AnimatePresence>
                  {activeFaq === idx && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="px-6 pb-6"
                    >
                      <p className="text-gray-600 leading-relaxed border-t border-gray-100 pt-4">{faq.answer}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default ContactPage;