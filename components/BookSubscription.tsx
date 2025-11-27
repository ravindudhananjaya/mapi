import React, { useState } from 'react';
import { ContentData, PricingTier } from '../types';
import { Check, X, Heart, Calendar, Shield, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

interface BookSubscriptionProps {
    content: ContentData;
    onSelectPlan: (plan: PricingTier) => void;
}

const BookSubscription: React.FC<BookSubscriptionProps> = ({ content, onSelectPlan }) => {
    const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

    const getPrice = (priceString: string, cycle: 'monthly' | 'yearly') => {
        if (cycle === 'monthly') return priceString;

        // Extract numbers and calculate yearly price (assuming 10x for yearly discount)
        const numbers = priceString.match(/\d+(?:,\d+)?/g);
        if (!numbers) return priceString;

        const yearlyNumbers = numbers.map(num => {
            const val = parseInt(num.replace(/,/g, ''), 10);
            return (val * 10).toLocaleString();
        });

        let newPriceString = priceString;
        numbers.forEach((num, index) => {
            newPriceString = newPriceString.replace(num, yearlyNumbers[index]);
        });

        return newPriceString.replace('NPR', 'NPR (Yearly)');
    };

    return (
        <div className="bg-gradient-to-br from-teal-50 via-white to-blue-50 min-h-screen py-20">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                {/* Header Section */}
                <div className="text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="inline-flex items-center gap-2 bg-brand-teal/10 px-4 py-2 rounded-full mb-6"
                    >
                        <Heart className="w-5 h-5 text-brand-teal" />
                        <span className="text-brand-teal font-semibold text-sm uppercase tracking-wide">
                            Care Plans
                        </span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 mb-6"
                    >
                        {content.pricing.title}
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-xl leading-8 text-gray-600 max-w-3xl mx-auto mb-8"
                    >
                        {content.pricing.subtitle}
                    </motion.p>

                    {/* Billing Toggle */}
                    <div className="flex justify-center mb-12">
                        <div className="bg-gray-100 p-1 rounded-full flex items-center relative">
                            <button
                                onClick={() => setBillingCycle('monthly')}
                                className={`relative px-6 py-2 rounded-full text-sm font-medium transition-colors z-10 ${billingCycle === 'monthly' ? 'text-gray-900' : 'text-gray-500'
                                    }`}
                            >
                                {billingCycle === 'monthly' && (
                                    <motion.div
                                        layoutId="billingCycle"
                                        className="absolute inset-0 bg-white rounded-full shadow-sm"
                                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                    />
                                )}
                                <span className="relative z-10">Monthly</span>
                            </button>
                            <button
                                onClick={() => setBillingCycle('yearly')}
                                className={`relative px-6 py-2 rounded-full text-sm font-medium transition-colors z-10 ${billingCycle === 'yearly' ? 'text-gray-900' : 'text-gray-500'
                                    }`}
                            >
                                {billingCycle === 'yearly' && (
                                    <motion.div
                                        layoutId="billingCycle"
                                        className="absolute inset-0 bg-white rounded-full shadow-sm"
                                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                    />
                                )}
                                <span className="relative z-10 flex items-center gap-2">
                                    Yearly <span className="text-xs text-brand-orange font-bold bg-orange-100 px-2 py-0.5 rounded-full">Save 20%</span>
                                </span>
                            </button>
                        </div>
                    </div>

                    {/* Benefits Grid */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12"
                    >
                        <div className="flex items-center gap-3 bg-white p-4 rounded-xl shadow-sm">
                            <div className="w-10 h-10 bg-brand-teal/10 rounded-lg flex items-center justify-center flex-shrink-0">
                                <Calendar className="w-5 h-5 text-brand-teal" />
                            </div>
                            <span className="text-gray-700 font-medium text-sm">Regular Scheduled Visits</span>
                        </div>
                        <div className="flex items-center gap-3 bg-white p-4 rounded-xl shadow-sm">
                            <div className="w-10 h-10 bg-brand-teal/10 rounded-lg flex items-center justify-center flex-shrink-0">
                                <Shield className="w-5 h-5 text-brand-teal" />
                            </div>
                            <span className="text-gray-700 font-medium text-sm">Dedicated Care Provider</span>
                        </div>
                        <div className="flex items-center gap-3 bg-white p-4 rounded-xl shadow-sm">
                            <div className="w-10 h-10 bg-brand-teal/10 rounded-lg flex items-center justify-center flex-shrink-0">
                                <Clock className="w-5 h-5 text-brand-teal" />
                            </div>
                            <span className="text-gray-700 font-medium text-sm">Flexible Plans</span>
                        </div>
                    </motion.div>
                </div>

                {/* Pricing Cards */}
                <div className="isolate mx-auto grid max-w-md grid-cols-1 gap-y-8 lg:mx-0 lg:max-w-none lg:grid-cols-3 lg:gap-x-8">
                    {content.pricing.tiers.map((tier, tierIdx) => (
                        <motion.div
                            key={tier.name}
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.4 + tierIdx * 0.15 }}
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
                                <p className="mt-4 text-sm leading-6 text-gray-500 font-medium uppercase tracking-wide">
                                    {billingCycle === 'monthly' ? 'Monthly Subscription' : 'Yearly Subscription'}
                                </p>
                                <p className="mt-2 flex items-baseline gap-x-1">
                                    <span className="text-4xl font-bold tracking-tight text-gray-900">
                                        {getPrice(tier.price, billingCycle)}
                                    </span>
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
                                onClick={() => onSelectPlan({ ...tier, price: getPrice(tier.price, billingCycle) })}
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

export default BookSubscription;
