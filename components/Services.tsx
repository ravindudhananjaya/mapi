import React from 'react';
import { ContentData, PricingTier, ServiceItem } from '../types';
import { Check, X, ArrowRight, Star } from 'lucide-react';
import { motion } from 'framer-motion';

interface ServicesProps {
  content: ContentData;
  onSelectPlan?: (plan: PricingTier) => void;
  onSelectService?: (service: ServiceItem) => void;
}

const Services: React.FC<ServicesProps> = ({ content, onSelectPlan, onSelectService }) => {
  return (
    <div id="services" className="bg-gray-50">
      {/* Hero Section */}
      <div className="relative bg-brand-teal text-white py-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src="/service-health.png" alt="Health Service" className="w-full h-full object-cover opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-b from-brand-teal/80 to-brand-teal"></div>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-base font-semibold leading-7 text-brand-orange uppercase tracking-wide"
          >
            MAPI Care Plans
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-2 text-4xl font-bold tracking-tight text-white sm:text-5xl"
          >
            {content.pricing.title}
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-6 text-xl leading-8 text-teal-100 max-w-2xl mx-auto"
          >
            {content.pricing.subtitle}
          </motion.p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-24 sm:py-32 -mt-20 relative z-20">

        {/* Detailed Services Section */}
        <div className="mb-32 space-y-24">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">{content.detailedServices.title}</h2>
            <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">{content.detailedServices.subtitle}</p>
          </div>

          {content.detailedServices.items.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className={`flex flex-col lg:flex-row gap-12 items-center ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}
            >
              <div className="lg:w-1/2 relative">
                <div className={`absolute inset-0 bg-brand-teal/10 rounded-3xl transform ${index % 2 === 0 ? '-rotate-3' : 'rotate-3'}`}></div>
                <img
                  src={item.image}
                  alt={item.title}
                  className="relative rounded-3xl shadow-xl w-full object-cover h-80 lg:h-96 hover:scale-[1.02] transition-transform duration-500"
                />
              </div>
              <div className="lg:w-1/2 space-y-6">
                <h3 className="text-3xl font-bold text-gray-900">{item.title}</h3>
                <p className="text-lg text-gray-600 leading-relaxed">{item.description}</p>
                <ul className="space-y-3">
                  {item.benefits.map((benefit, idx) => (
                    <li key={idx} className="flex items-center gap-3">
                      <div className="bg-brand-orange/10 p-1 rounded-full">
                        <Check className="w-5 h-5 text-brand-orange" />
                      </div>
                      <span className="text-gray-700 font-medium">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="isolate mx-auto grid max-w-md grid-cols-1 gap-y-8 lg:mx-0 lg:max-w-none lg:grid-cols-3 lg:gap-x-8">
          {content.pricing.tiers.map((tier, tierIdx) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: tierIdx * 0.2 }}
              className={`
                ${tier.highlight ? 'bg-white ring-4 ring-brand-orange scale-105 z-10 shadow-2xl' : 'bg-white ring-1 ring-gray-200 shadow-xl'} 
                rounded-3xl p-8 xl:p-10 transition-all hover:scale-[1.02] flex flex-col justify-between relative overflow-hidden
              `}
            >
              {tier.highlight && (
                <div className="absolute top-0 right-0 bg-brand-orange text-white text-xs font-bold px-3 py-1 rounded-bl-xl uppercase tracking-wider">
                  Recommended
                </div>
              )}
              <div>
                <div className="flex items-center justify-between gap-x-4">
                  <h3 id={tier.name} className={`text-xl font-bold leading-8 ${tier.highlight ? 'text-brand-orange' : 'text-gray-900'}`}>
                    {tier.name}
                  </h3>
                </div>
                <p className="mt-4 text-sm leading-6 text-gray-500 font-medium uppercase tracking-wide">Monthly Subscription</p>
                <p className="mt-2 flex items-baseline gap-x-1">
                  <span className="text-4xl font-bold tracking-tight text-gray-900">{tier.price}</span>
                </p>
                <ul role="list" className="mt-8 space-y-4 text-sm leading-6 text-gray-600">
                  {tier.features.map((feature, idx) => (
                    <li key={idx} className="flex gap-x-3 items-start">
                      {feature.included ? (
                        <div className="bg-teal-50 rounded-full p-1 mt-0.5">
                          <Check className="h-4 w-4 flex-none text-brand-teal" aria-hidden="true" />
                        </div>
                      ) : (
                        <X className="h-5 w-5 flex-none text-gray-300 mt-0.5" aria-hidden="true" />
                      )}
                      <span className={feature.included ? 'text-gray-700 font-medium' : 'text-gray-400 line-through'}>{feature.text}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <button
                onClick={() => onSelectPlan && onSelectPlan(tier)}
                className={`
                  mt-8 block w-full rounded-xl py-3 px-3 text-center text-base font-bold leading-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 transition-all shadow-lg
                  ${tier.highlight
                    ? 'bg-brand-orange text-white hover:bg-orange-600 hover:shadow-orange-500/30'
                    : 'bg-brand-teal text-white hover:bg-teal-900 hover:shadow-teal-500/30'}
                `}
              >
                {content.pricing.selectButton}
              </button>
            </motion.div>
          ))}
        </div>

        {/* One Time Services */}
        <div className="mt-32">
          <div className="text-center mb-16">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">{content.pricing.oneTimeTitle}</h3>
            <p className="text-gray-600 max-w-2xl mx-auto">Flexible options for when you need specific help without a monthly commitment.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {content.pricing.oneTimeServices.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between hover:border-brand-orange hover:shadow-xl transition-all group"
              >
                <div>
                  <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center mb-4 group-hover:bg-brand-orange transition-colors">
                    <Star className="w-6 h-6 text-brand-orange group-hover:text-white transition-colors" />
                  </div>
                  <h4 className="font-bold text-xl text-gray-900 mb-2">{service.title}</h4>
                  <p className="text-sm text-gray-500 mb-4">Single service request</p>
                </div>
                <div className="flex flex-col gap-4 mt-4">
                  <span className="text-brand-teal font-bold text-2xl">{service.price}</span>
                  <button
                    onClick={() => onSelectService && onSelectService(service)}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 border-2 border-brand-orange text-brand-orange rounded-xl text-sm font-bold hover:bg-brand-orange hover:text-white transition-all"
                  >
                    {content.pricing.bookButton}
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Testimonials Section */}
        <div className="mt-32">
          <div className="text-center mb-16">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">What Families Say</h3>
            <p className="text-gray-600 max-w-2xl mx-auto">Hear from children living abroad who trust MAPI with their parents' care.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {content.serviceTestimonials.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 relative"
              >
                <div className="flex items-center gap-4 mb-6">
                  <img src={item.image} alt={item.name} className="w-14 h-14 rounded-full object-cover border-2 border-brand-orange" />
                  <div>
                    <h4 className="font-bold text-gray-900">{item.name}</h4>
                    <p className="text-sm text-gray-500">{item.location}</p>
                    <p className="text-xs text-brand-teal font-medium uppercase tracking-wide">{item.role}</p>
                  </div>
                </div>
                <p className="text-gray-600 italic">"{item.quote}"</p>
                <div className="absolute top-6 right-8 text-brand-orange/20">
                  <Star className="w-8 h-8 fill-current" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;