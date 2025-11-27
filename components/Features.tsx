import React from 'react';
import { ContentData } from '../types';
import { Smartphone, Stethoscope, MapPin, CreditCard, Activity, Camera } from 'lucide-react';

interface FeaturesProps {
  content: ContentData;
}

const Features: React.FC<FeaturesProps> = ({ content }) => {
  return (
    <div id="features" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center mb-16">
          <h2 className="text-base text-brand-orange font-semibold tracking-wide uppercase">Mobile App</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            {content.appFeatures.title}
          </p>
        </div>

        <div className="mt-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Family Features */}
            <div className="bg-brand-light rounded-2xl p-8 border border-orange-100">
                <div className="flex items-center gap-4 mb-6">
                    <div className="bg-brand-orange p-3 rounded-xl shadow-lg">
                        <Smartphone className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">{content.appFeatures.familyTitle}</h3>
                </div>
                <ul className="space-y-4">
                    {content.appFeatures.familyFeatures.map((feat, idx) => (
                        <li key={idx} className="flex items-start">
                            <div className="flex-shrink-0">
                                <Activity className="h-6 w-6 text-brand-teal" />
                            </div>
                            <p className="ml-3 text-base text-gray-700">{feat}</p>
                        </li>
                    ))}
                </ul>
                <div className="mt-8">
                    <img 
                        src="https://picsum.photos/600/400?random=1" 
                        alt="Family App Interface" 
                        className="rounded-xl shadow-md w-full h-64 object-cover"
                    />
                </div>
            </div>

            {/* Provider Features */}
            <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200">
                <div className="flex items-center gap-4 mb-6">
                    <div className="bg-brand-teal p-3 rounded-xl shadow-lg">
                        <Stethoscope className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">{content.appFeatures.providerTitle}</h3>
                </div>
                <ul className="space-y-4">
                    {content.appFeatures.providerFeatures.map((feat, idx) => (
                        <li key={idx} className="flex items-start">
                            <div className="flex-shrink-0">
                                <MapPin className="h-6 w-6 text-brand-orange" />
                            </div>
                            <p className="ml-3 text-base text-gray-700">{feat}</p>
                        </li>
                    ))}
                </ul>
                 <div className="mt-8">
                    <img 
                        src="https://picsum.photos/600/400?random=2" 
                        alt="Care Provider App Interface" 
                        className="rounded-xl shadow-md w-full h-64 object-cover"
                    />
                </div>
            </div>
          </div>
        </div>

        {/* Partners Strip */}
        <div className="mt-20 pt-10 border-t border-gray-100">
            <p className="text-center text-gray-400 font-medium mb-8 uppercase tracking-widest text-sm">Supported Payment Methods</p>
            <div className="flex justify-center gap-8 md:gap-16 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
                <div className="flex items-center gap-2 font-bold text-xl text-green-600"><CreditCard/> eSewa</div>
                <div className="flex items-center gap-2 font-bold text-xl text-purple-600"><CreditCard/> Khalti</div>
                <div className="flex items-center gap-2 font-bold text-xl text-blue-600"><CreditCard/> Stripe</div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Features;