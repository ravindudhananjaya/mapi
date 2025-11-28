import React, { useState } from 'react';
import { ContentData, PricingTier } from '../types';
import { Check, X, Heart, Calendar, Shield, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

interface BookSubscriptionProps {
    content: ContentData;
    onSelectPlan: (plan: PricingTier) => void;
}

import { apiClient } from '../src/api/client';

const BookSubscription: React.FC<BookSubscriptionProps> = ({ content, onSelectPlan }) => {
    const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
    const [plans, setPlans] = useState<PricingTier[]>(content.pricing.tiers);

    React.useEffect(() => {
        const fetchPlans = async () => {
            try {
                const data = await apiClient.get('/services?type=SUBSCRIPTION');
                if (data && data.length > 0) {
                    const mappedPlans: PricingTier[] = data.map((service: any) => ({
                        name: service.title,
                        price: `NPR ${service.price}`,
                        features: service.features.map((f: string) => ({ text: f, included: true })),
                        highlight: service.title.toLowerCase().includes('premium') || service.title.toLowerCase().includes('gold'),
                    }));
                    setPlans(mappedPlans);
                }
            } catch (error) {
                console.error('Failed to fetch plans:', error);
            }
        };
        fetchPlans();
    }, []);

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
        <div className="bg-gray-50 min-h-screen py-20 relative overflow-hidden">
            {/* Decorative background */}
            <div className="absolute top-0 left-0 right-0 h-[500px] bg-gradient-to-b from-teal-50/50 to-transparent pointer-events-none" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full pointer-events-none">
                <div className="absolute top-20 left-10 w-72 h-72 bg-brand-teal/5 rounded-full blur-3xl" />
                <div className="absolute top-40 right-10 w-96 h-96 bg-brand-orange/5 rounded-full blur-3xl" />
            </div>

            <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
                {/* Header Section */}
                <div className="text-center mb-20">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full mb-8 shadow-sm border border-gray-100"
                    >
                        <Heart className="w-5 h-5 text-brand-teal fill-brand-teal" />
                        <span className="text-brand-teal font-bold text-sm uppercase tracking-wider">
                            Care Plans
                        </span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-6xl font-extrabold tracking-tight text-gray-900 mb-6"
                    >
                        {content.pricing.title}
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-xl leading-relaxed text-gray-600 max-w-3xl mx-auto mb-10"
                    >
                        {content.pricing.subtitle}
                    </motion.p>

                    {/* Billing Toggle */}
                    <div className="flex justify-center mb-16">
                        <div className="bg-white p-1.5 rounded-full flex items-center relative shadow-sm border border-gray-200">
                            <button
                                onClick={() => setBillingCycle('monthly')}
                                className={`relative px-8 py-2.5 rounded-full text-sm font-bold transition-colors z-10 ${billingCycle === 'monthly' ? 'text-gray-900' : 'text-gray-500 hover:text-gray-700'
                                    }`}
                            >
                                {billingCycle === 'monthly' && (
                                    <motion.div
                                        layoutId="billingCycle"
                                        className="absolute inset-0 bg-gray-100 rounded-full"
                                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                    />
                                )}
                                <span className="relative z-10">Monthly</span>
                            </button>
                            <button
                                onClick={() => setBillingCycle('yearly')}
                                className={`relative px-8 py-2.5 rounded-full text-sm font-bold transition-colors z-10 ${billingCycle === 'yearly' ? 'text-gray-900' : 'text-gray-500 hover:text-gray-700'
                                    }`}
                            >
                                {billingCycle === 'yearly' && (
                                    <motion.div
                                        layoutId="billingCycle"
                                        className="absolute inset-0 bg-gray-100 rounded-full"
                                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                    />
                                )}
                                <span className="relative z-10 flex items-center gap-2">
                                    Yearly <span className="text-[10px] text-brand-orange font-extrabold bg-orange-50 px-2 py-0.5 rounded-full border border-orange-100 uppercase tracking-wide">Save 20%</span>
                                </span>
                            </button>
                        </div>
                    </div>

                    {/* Benefits Grid */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-16"
                    >
                        <div className="flex items-center gap-4 bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
                            <div className="w-12 h-12 bg-brand-teal/10 rounded-xl flex items-center justify-center flex-shrink-0">
                                <Calendar className="w-6 h-6 text-brand-teal" />
                            </div>
                            <span className="text-gray-900 font-bold text-sm text-left">Regular Scheduled Visits</span>
                        </div>
                        <div className="flex items-center gap-4 bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
                            <div className="w-12 h-12 bg-brand-teal/10 rounded-xl flex items-center justify-center flex-shrink-0">
                                <Shield className="w-6 h-6 text-brand-teal" />
                            </div>
                            <span className="text-gray-900 font-bold text-sm text-left">Dedicated Care Provider</span>
                        </div>
                        <div className="flex items-center gap-4 bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
                            <div className="w-12 h-12 bg-brand-teal/10 rounded-xl flex items-center justify-center flex-shrink-0">
                                <Clock className="w-6 h-6 text-brand-teal" />
                            </div>
                            <span className="text-gray-900 font-bold text-sm text-left">Flexible Plans</span>
                        </div>
                    </motion.div>
                </div>

                {/* Pricing Cards */}
                <div className="isolate mx-auto grid max-w-md grid-cols-1 gap-y-8 lg:mx-0 lg:max-w-none lg:grid-cols-3 lg:gap-x-8">
                    {plans.map((tier, tierIdx) => (
                        <motion.div
                            key={tier.name}
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.4 + tierIdx * 0.15 }}
                            className={`
                ${tier.highlight ? 'bg-white ring-4 ring-brand-orange scale-105 z-10 shadow-2xl' : 'bg-white ring-1 ring-gray-200 shadow-xl'} 
                rounded-3xl p-8 xl:p-10 transition-all hover:scale-[1.02] flex flex-col justify-between relative overflow-hidden group
              `}
                        >
                            {tier.highlight && (
                                <div className="absolute top-0 right-0 bg-brand-orange text-white text-xs font-bold px-4 py-1.5 rounded-bl-2xl uppercase tracking-wider shadow-sm">
                                    Recommended
                                </div>
                            )}
                            <div>
                                <div className="flex items-center justify-between gap-x-4 mb-6">
                                    <h3 id={tier.name} className={`text-2xl font-bold leading-8 ${tier.highlight ? 'text-brand-orange' : 'text-gray-900'}`}>
                                        {tier.name}
                                    </h3>
                                </div>
                                <div className="flex items-baseline gap-x-1 mb-2">
                                    <span className="text-4xl font-extrabold tracking-tight text-gray-900">
                                        {getPrice(tier.price, billingCycle)}
                                    </span>
                                </div>
                                <p className="text-sm leading-6 text-gray-500 font-bold uppercase tracking-wide mb-8">
                                    {billingCycle === 'monthly' ? 'per month' : 'per year'}
                                </p>

                                <div className="w-full h-px bg-gray-100 mb-8" />

                                <ul role="list" className="space-y-4 text-sm leading-6 text-gray-600 mb-8">
                                    {tier.features.map((feature, idx) => (
                                        <li key={idx} className="flex gap-x-3 items-start">
                                            {feature.included ? (
                                                <div className="bg-teal-50 rounded-full p-1 mt-0.5 flex-shrink-0">
                                                    <Check className="h-3.5 w-3.5 text-brand-teal stroke-[3]" aria-hidden="true" />
                                                </div>
                                            ) : (
                                                <X className="h-5 w-5 flex-none text-gray-300 mt-0.5" aria-hidden="true" />
                                            )}
                                            <span className={feature.included ? 'text-gray-900 font-medium' : 'text-gray-400 line-through'}>{feature.text}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <button
                                onClick={() => onSelectPlan({ ...tier, price: getPrice(tier.price, billingCycle) })}
                                className={`
                  mt-auto block w-full rounded-xl py-4 px-3 text-center text-base font-bold leading-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 transition-all shadow-lg active:scale-95
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
