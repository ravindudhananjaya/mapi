import React from 'react';
import { ContentData } from '../types';
import { ShieldCheck, BookOpen, Handshake, CheckCircle } from 'lucide-react';

interface ProcessProps {
  content: ContentData;
}

const Process: React.FC<ProcessProps> = ({ content }) => {
  return (
    <div className="bg-white">
       <div className="bg-brand-orange/10 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl mb-4">{content.process.title}</h1>
          <p className="max-w-2xl mx-auto text-xl text-gray-600">
            How we ensure the best care for your loved ones.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Training Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-20">
          <div>
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
          </div>
          <div className="flex items-center justify-center">
             <img src="https://picsum.photos/600/400?random=4" alt="Training" className="rounded-2xl shadow-xl rotate-2 hover:rotate-0 transition-transform duration-300" />
          </div>
        </div>

        {/* Partners Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-20 lg:flex-row-reverse">
           <div className="lg:order-2">
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
          </div>
          <div className="lg:order-1 flex items-center justify-center">
             <img src="https://picsum.photos/600/400?random=5" alt="Partnerships" className="rounded-2xl shadow-xl -rotate-2 hover:rotate-0 transition-transform duration-300" />
          </div>
        </div>

        {/* Safety Section */}
        <div className="bg-gray-900 rounded-3xl p-8 md:p-12 text-center text-white relative overflow-hidden">
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
        </div>
      </div>
    </div>
  );
};

export default Process;