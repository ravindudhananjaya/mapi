import React from 'react';
import { ContentData } from '../types';
import { Users, Target, Award, Heart } from 'lucide-react';

interface AboutProps {
  content: ContentData;
}

const About: React.FC<AboutProps> = ({ content }) => {
  return (
    <div className="bg-white">
      {/* Hero Section for About */}
      <div className="bg-brand-teal text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl mb-4">{content.about.title}</h1>
          <p className="max-w-2xl mx-auto text-xl text-teal-100">{content.about.missionText}</p>
        </div>
      </div>

      {/* Mission & Problem */}
      <div className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Target className="h-8 w-8 text-brand-orange" />
              <h2 className="text-3xl font-bold text-gray-900">{content.about.problemTitle}</h2>
            </div>
            <p className="text-lg text-gray-600 leading-relaxed">
              {content.about.problemText}
            </p>
          </div>
          <div className="relative">
            <img 
              src="https://picsum.photos/800/600?random=3" 
              alt="Elderly couple" 
              className="rounded-lg shadow-xl"
            />
            <div className="absolute -bottom-6 -left-6 bg-brand-light p-6 rounded-lg shadow-lg hidden md:block border border-orange-100">
               <p className="font-bold text-brand-teal text-xl">"Peace of Mind"</p>
               <p className="text-sm text-gray-600">For families abroad</p>
            </div>
          </div>
        </div>
      </div>

      {/* Differentiation */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">{content.about.differentiationTitle}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {content.about.differentiationPoints.map((point, idx) => (
              <div key={idx} className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow border-t-4 border-brand-orange">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{point.title}</h3>
                <p className="text-gray-600">{point.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Team */}
      <div className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center p-3 bg-brand-light rounded-full mb-4">
            <Users className="h-8 w-8 text-brand-teal" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900">{content.about.teamTitle}</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {content.about.team.map((member, idx) => (
            <div key={idx} className="bg-white border border-gray-100 rounded-lg p-4 text-center shadow-sm hover:border-brand-teal transition-colors">
              <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center text-gray-400">
                <Users className="h-8 w-8" />
              </div>
              <p className="font-medium text-gray-900">{member}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;