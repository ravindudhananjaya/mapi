import React from 'react';
import { ContentData } from '../types';
import { Users, Target, Award, Heart } from 'lucide-react';
import { motion } from 'framer-motion';

interface AboutProps {
  content: ContentData;
}

const About: React.FC<AboutProps> = ({ content }) => {
  return (
    <div className="bg-white overflow-hidden">
      {/* Hero Section for About */}
      <div className="relative bg-brand-teal text-white py-24">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-[50%] -left-[20%] w-[80%] h-[80%] bg-white/5 rounded-full blur-3xl"></div>
          <div className="absolute top-[50%] -right-[20%] w-[80%] h-[80%] bg-brand-orange/10 rounded-full blur-3xl"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-extrabold tracking-tight sm:text-6xl mb-6"
          >
            {content.about.title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-3xl mx-auto text-xl text-teal-50"
          >
            {content.about.missionText}
          </motion.p>
        </div>
      </div>

      {/* Mission & Problem */}
      <div className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-brand-orange/10 rounded-xl">
                <Target className="h-8 w-8 text-brand-orange" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900">{content.about.problemTitle}</h2>
            </div>
            <p className="text-lg text-gray-600 leading-relaxed mb-6">
              {content.about.problemText}
            </p>
            <div className="bg-gray-50 p-6 rounded-xl border-l-4 border-brand-teal">
              <p className="italic text-gray-700">"We believe that distance should never be a barrier to care. Our mission is to bridge that gap with love and technology."</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-brand-teal/10 transform rotate-3 rounded-2xl"></div>
            <img
              src="/about-hero.png"
              alt="Elderly couple in garden"
              className="relative rounded-2xl shadow-2xl w-full h-auto object-cover transform -rotate-3 hover:rotate-0 transition-transform duration-500"
            />
            <div className="absolute -bottom-10 -left-10 bg-white p-6 rounded-xl shadow-xl hidden md:block border border-gray-100 max-w-xs">
              <div className="flex items-center gap-3 mb-2">
                <Heart className="w-6 h-6 text-red-500 fill-current" />
                <p className="font-bold text-gray-900 text-lg">Trusted Care</p>
              </div>
              <p className="text-sm text-gray-600">Providing peace of mind to families across 15+ countries.</p>
            </div>
          </motion.div>
        </div>

        {/* Team Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-32"
        >
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-4">
              {content.about.teamTitle}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Meet the dedicated professionals who make MAPI a trusted family for your loved ones.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {content.about.team.map((member, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100"
              >
                <div className="aspect-w-3 aspect-h-4 relative overflow-hidden h-80">
                  <div className="absolute inset-0 bg-brand-teal/20 group-hover:bg-transparent transition-colors duration-300 z-10"></div>
                  <img
                    src={member.image}
                    alt={member.name}
                    className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6 text-center relative z-20 bg-white">
                  <h3 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
                  <p className="text-brand-teal font-medium uppercase tracking-wide text-xs">{member.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Differentiation */}
      <div className="bg-gray-50 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">{content.about.differentiationTitle}</h2>
            <div className="w-24 h-1 bg-brand-orange mx-auto mt-4 rounded-full"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {content.about.differentiationPoints.map((point, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all border-t-4 border-brand-teal group"
              >
                <div className="w-12 h-12 bg-teal-50 rounded-full flex items-center justify-center mb-6 group-hover:bg-brand-teal transition-colors">
                  <Award className="w-6 h-6 text-brand-teal group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{point.title}</h3>
                <p className="text-gray-600 leading-relaxed">{point.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>


    </div>
  );
};

export default About;