import React from 'react';
import { ContentData, PricingTier, ServiceItem } from '../types';
import { Check, X, ArrowRight } from 'lucide-react';

interface ServicesProps {
  content: ContentData;
  onSelectPlan?: (plan: PricingTier) => void;
  onSelectService?: (service: ServiceItem) => void;
}

const Services: React.FC<ServicesProps> = ({ content, onSelectPlan, onSelectService }) => {
  return (
    <div id="services" className="bg-gray-50 py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-base font-semibold leading-7 text-brand-orange uppercase tracking-wide">MAPI Care</h2>
          <p className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            {content.pricing.title}
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            {content.pricing.subtitle}
          </p>
        </div>
        
        <div className="isolate mx-auto mt-16 grid max-w-md grid-cols-1 gap-y-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3 lg:gap-x-8">
          {content.pricing.tiers.map((tier, tierIdx) => (
            <div
              key={tier.name}
              className={`
                ${tier.highlight ? 'bg-white ring-2 ring-brand-orange scale-105 z-10 shadow-2xl' : 'bg-white/60 ring-1 ring-gray-200 shadow-xl'} 
                rounded-3xl p-8 xl:p-10 transition-all hover:scale-[1.02] flex flex-col justify-between
              `}
            >
              <div>
                <div className="flex items-center justify-between gap-x-4">
                  <h3 id={tier.name} className={`text-lg font-semibold leading-8 ${tier.highlight ? 'text-brand-orange' : 'text-gray-900'}`}>
                    {tier.name}
                  </h3>
                  {tier.highlight ? (
                    <p className="rounded-full bg-brand-orange/10 px-2.5 py-1 text-xs font-semibold leading-5 text-brand-orange">
                      Most Popular
                    </p>
                  ) : null}
                </div>
                <p className="mt-4 text-sm leading-6 text-gray-600 font-medium">Monthly Subscription</p>
                <p className="mt-2 flex items-baseline gap-x-1">
                  <span className="text-3xl font-bold tracking-tight text-gray-900">{tier.price}</span>
                </p>
                <ul role="list" className="mt-8 space-y-3 text-sm leading-6 text-gray-600">
                  {tier.features.map((feature, idx) => (
                    <li key={idx} className="flex gap-x-3">
                      {feature.included ? (
                         <Check className="h-6 w-5 flex-none text-brand-teal" aria-hidden="true" />
                      ) : (
                          <X className="h-6 w-5 flex-none text-gray-300" aria-hidden="true" />
                      )}
                      <span className={feature.included ? 'text-gray-700' : 'text-gray-400 line-through'}>{feature.text}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <button
                onClick={() => onSelectPlan && onSelectPlan(tier)}
                className={`
                  mt-8 block w-full rounded-md py-2 px-3 text-center text-sm font-semibold leading-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 
                  ${tier.highlight 
                    ? 'bg-brand-orange text-white shadow-sm hover:bg-orange-600 focus-visible:outline-brand-orange' 
                    : 'bg-brand-teal text-white shadow-sm hover:bg-teal-900 focus-visible:outline-brand-teal'}
                `}
              >
                {content.pricing.selectButton}
              </button>
            </div>
          ))}
        </div>

        {/* One Time Services */}
        <div className="mt-20 border-t border-gray-200 pt-12">
            <h3 className="text-2xl font-bold text-gray-900 text-center mb-10">{content.pricing.oneTimeTitle}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {content.pricing.oneTimeServices.map((service, index) => (
                    <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col justify-between hover:border-brand-orange transition-colors group">
                        <h4 className="font-semibold text-gray-900 mb-2">{service.title}</h4>
                        <div className="flex flex-col gap-4 mt-4">
                            <span className="text-brand-teal font-bold text-lg">{service.price}</span>
                            <button
                              onClick={() => onSelectService && onSelectService(service)} 
                              className="w-full flex items-center justify-center gap-2 px-4 py-2 border border-brand-orange text-brand-orange rounded-md text-sm font-medium hover:bg-brand-orange hover:text-white transition-colors"
                            >
                                {content.pricing.bookButton}
                                <ArrowRight className="h-4 w-4" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
      </div>
    </div>
  );
};

export default Services;