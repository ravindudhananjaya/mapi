import React from 'react';
import { ContentData, PricingTier } from '../types';
import { Check, X } from 'lucide-react';
import { motion } from 'framer-motion';

interface SubscriptionPlansProps {
    content: ContentData;
    onSelectPlan: (plan: PricingTier) => void;
}

const SubscriptionPlans: React.FC<SubscriptionPlansProps> = ({ content, onSelectPlan }) => {
    return (
        <div className="bg-gray-50 min-h-screen py-20">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-base font-semibold leading-7 text-brand-orange uppercase tracking-wide"
                    >
                        Monthly Care Plans
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl"
                    >
                        {content.pricing.title}
                    </motion.p>
                    <motion.p
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="mt-6 text-xl leading-8 text-gray-600 max-w-2xl mx-auto"
                    >
                        {content.pricing.subtitle}
                    </motion.p>
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
                                onClick={() => onSelectPlan(tier)}
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
            </div>
        </div>
    );
};

export default SubscriptionPlans;
