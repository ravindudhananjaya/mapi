import React from 'react';
import { ContentData } from '../types';
import { ShieldCheck, BookOpen, Handshake, CheckCircle, UserCheck, Heart, Smartphone } from 'lucide-react';
import { motion } from 'framer-motion';

interface ProcessProps {
  content: ContentData;
}

const Process: React.FC<ProcessProps> = ({ content }) => {
  const stepsIcons = [UserCheck, Heart, Smartphone];

  return (
    <div className="bg-white">
      <div className="bg-brand-orange/10 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl mb-4"
          >
            {content.process.title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="max-w-2xl mx-auto text-xl text-gray-600"
          >
            {content.process.subtitle}
          </motion.p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* 3-Step Process */}
        <div className="mb-24">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
            {/* Connecting Line (Desktop) */}
            <div className="hidden md:block absolute top-12 left-0 w-full h-0.5 bg-gray-200 -z-10 transform -translate-y-1/2"></div>

            {content.process.steps.map((step, idx) => {
              const Icon = stepsIcons[idx];
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.2 }}
                  className="text-center bg-white pt-4"
                >
                  <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-white border-4 border-brand-teal text-brand-teal mb-6 shadow-lg relative z-10">
                    <Icon className="w-10 h-10" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
                  <p className="text-gray-600 leading-relaxed px-4">{step.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Training Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-20">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-brand-teal p-2 rounded-lg">
                <BookOpen className="h-6 w-6 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900">{content.process.trainingTitle}</h2>
            </div>
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
              <ul className="divide-y divide-gray-100">
                {content.process.trainingPoints.map((point, idx) => (
                  <li key={idx} className="p-4 flex items-center gap-3 hover:bg-gray-50 transition-colors">
                    <CheckCircle className="h-5 w-5 text-brand-orange flex-shrink-0" />
                    <span className="text-gray-700 font-medium">{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex items-center justify-center"
          >
            <img src="/quality-assurance-nepali.png" alt="Training" className="rounded-2xl shadow-xl rotate-2 hover:rotate-0 transition-transform duration-300 object-cover w-full h-80" />
          </motion.div>
        </div>

        {/* Partners Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-20 lg:flex-row-reverse">
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:order-2"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-brand-orange p-2 rounded-lg">
                <Handshake className="h-6 w-6 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900">{content.process.partnersTitle}</h2>
            </div>
            <div className="bg-brand-light rounded-2xl p-8 border border-orange-100">
              <ul className="space-y-4">
                {content.process.partners.map((partner, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <div className="h-2 w-2 rounded-full bg-brand-teal mt-2.5"></div>
                    <span className="text-lg text-gray-800">{partner}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:order-1 flex items-center justify-center"
          >
            <img src="/about-hero.png" alt="Partnerships" className="rounded-2xl shadow-xl -rotate-2 hover:rotate-0 transition-transform duration-300 object-cover w-full h-80" />
          </motion.div>
        </div>

        {/* Safety Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-gray-900 rounded-3xl p-8 md:p-12 text-center text-white relative overflow-hidden"
        >
          <div className="relative z-10">
            <div className="inline-block p-4 bg-white/10 rounded-full mb-6">
              <ShieldCheck className="h-10 w-10 text-brand-orange" />
            </div>
            <h2 className="text-3xl font-bold mb-6">{content.process.safetyTitle}</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              {content.process.safetyText}
            </p>
          </div>
          {/* Decorative circles */}
          <div className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-brand-teal rounded-full opacity-20 blur-3xl"></div>
          <div className="absolute bottom-0 right-0 translate-x-1/2 translate-y-1/2 w-64 h-64 bg-brand-orange rounded-full opacity-20 blur-3xl"></div>
        </motion.div>
      </div>
    </div>
  );
};

export default Process;