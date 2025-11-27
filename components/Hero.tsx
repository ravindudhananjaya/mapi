import React from 'react';
import { ContentData } from '../types';
import { ShieldCheck, Heart, Clock, Phone } from 'lucide-react';

interface HeroProps {
  content: ContentData;
  onCtaClick?: () => void;
}

const Hero: React.FC<HeroProps> = ({ content, onCtaClick }) => {
  const icons = [ShieldCheck, Heart, Clock, Phone];

  return (
    <div className="relative overflow-hidden bg-brand-light">
      <div className="max-w-7xl mx-auto">
        <div className="relative z-10 pb-8 bg-brand-light sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
          <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
            <div className="sm:text-center lg:text-left">
              <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                <span className="block xl:inline text-brand-teal">{content.hero.title}</span>
              </h1>
              <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                {content.hero.subtitle}
              </p>
              <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                <div className="rounded-md shadow">
                  <button
                    onClick={onCtaClick}
                    className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-brand-orange hover:bg-orange-700 md:py-4 md:text-lg transition-all shadow-lg hover:shadow-xl cursor-pointer"
                  >
                    {content.hero.cta}
                  </button>
                </div>
              </div>
              <p className="mt-4 text-sm text-gray-400 font-medium">
                {content.hero.trust}
              </p>
            </div>
          </main>
        </div>
      </div>
      <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
        <img
          className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full"
          src="https://picsum.photos/1200/800?grayscale"
          alt="Elderly care"
        />
        <div className="absolute inset-0 bg-brand-teal mix-blend-multiply opacity-20 lg:hidden"></div>
      </div>

      {/* Value Proposition Section */}
      <div className="bg-white py-12 relative z-20 shadow-xl -mt-8 mx-4 rounded-xl lg:mx-auto lg:max-w-7xl lg:mt-[-4rem]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-extrabold text-gray-900">{content.valueProp.title}</h2>
          </div>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {content.valueProp.items.map((item, index) => {
              const Icon = icons[index % icons.length];
              return (
                <div key={index} className="pt-6">
                  <div className="flow-root bg-gray-50 rounded-lg px-6 pb-8 h-full hover:shadow-md transition-shadow">
                    <div className="-mt-6">
                      <div>
                        <span className="inline-flex items-center justify-center p-3 bg-brand-teal rounded-md shadow-lg">
                          <Icon className="h-6 w-6 text-white" aria-hidden="true" />
                        </span>
                      </div>
                      <h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight">{item.title}</h3>
                      <p className="mt-5 text-base text-gray-500">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;