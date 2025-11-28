import React from 'react';
import { ContentData } from '../types';
import { Calendar, Clock, ArrowRight, Heart, Shield } from 'lucide-react';
import { motion } from 'framer-motion';

interface ServiceSelectionProps {
    content: ContentData;
    onSelectType: (type: 'subscription' | 'onetime') => void;
}

const ServiceSelection: React.FC<ServiceSelectionProps> = ({ content, onSelectType }) => {
    return (
        <div className="min-h-screen bg-gray-50 py-20 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
            <div className="max-w-5xl w-full">
                <div className="text-center mb-16">
                    <motion.h1
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl font-extrabold text-gray-900 mb-4"
                    >
                        Choose Your Care Path
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-xl text-gray-600"
                    >
                        Select the type of service that best fits your needs.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    {/* Subscription Option */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        onClick={() => onSelectType('subscription')}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                                onSelectType('subscription');
                            }
                        }}
                        role="button"
                        tabIndex={0}
                        className="group relative bg-white rounded-3xl shadow-xl overflow-hidden cursor-pointer border-2 border-transparent hover:border-brand-teal transition-all duration-300 hover:scale-[1.02] focus:outline-none focus:ring-4 focus:ring-brand-teal/20"
                    >
                        <div className="absolute top-0 right-0 bg-brand-teal/10 w-32 h-32 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-150"></div>

                        <div className="p-10 relative z-10">
                            <div className="w-16 h-16 bg-brand-teal/10 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-brand-teal transition-colors">
                                <Calendar className="w-8 h-8 text-brand-teal group-hover:text-white transition-colors" />
                            </div>

                            <h2 className="text-2xl font-bold text-gray-900 mb-4">Monthly Care Plans</h2>
                            <p className="text-gray-600 mb-8 leading-relaxed">
                                Comprehensive ongoing care for your loved ones. Includes regular visits, health monitoring, and dedicated support.
                            </p>

                            <ul className="space-y-3 mb-8">
                                <li className="flex items-center gap-3 text-gray-600">
                                    <Heart className="w-5 h-5 text-brand-orange" /> Dedicated Caregiver
                                </li>
                                <li className="flex items-center gap-3 text-gray-600">
                                    <Shield className="w-5 h-5 text-brand-orange" /> Health Monitoring
                                </li>
                            </ul>

                            <div className="flex items-center text-brand-teal font-bold group-hover:translate-x-2 transition-transform">
                                View Plans <ArrowRight className="w-5 h-5 ml-2" />
                            </div>
                        </div>
                    </motion.div>

                    {/* One-Time Option */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                        onClick={() => onSelectType('onetime')}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                                onSelectType('onetime');
                            }
                        }}
                        role="button"
                        tabIndex={0}
                        className="group relative bg-white rounded-3xl shadow-xl overflow-hidden cursor-pointer border-2 border-transparent hover:border-brand-orange transition-all duration-300 hover:scale-[1.02] focus:outline-none focus:ring-4 focus:ring-brand-orange/20"
                    >
                        <div className="absolute top-0 right-0 bg-brand-orange/10 w-32 h-32 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-150"></div>

                        <div className="p-10 relative z-10">
                            <div className="w-16 h-16 bg-brand-orange/10 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-brand-orange transition-colors">
                                <Clock className="w-8 h-8 text-brand-orange group-hover:text-white transition-colors" />
                            </div>

                            <h2 className="text-2xl font-bold text-gray-900 mb-4">One-Time Services</h2>
                            <p className="text-gray-600 mb-8 leading-relaxed">
                                Flexible, on-demand assistance when you need it. Perfect for hospital visits, check-ups, or specific tasks.
                            </p>

                            <ul className="space-y-3 mb-8">
                                <li className="flex items-center gap-3 text-gray-600">
                                    <Heart className="w-5 h-5 text-brand-orange" /> Pay Per Visit
                                </li>
                                <li className="flex items-center gap-3 text-gray-600">
                                    <Shield className="w-5 h-5 text-brand-orange" /> No Commitment
                                </li>
                            </ul>

                            <div className="flex items-center text-brand-orange font-bold group-hover:translate-x-2 transition-transform">
                                View Services <ArrowRight className="w-5 h-5 ml-2" />
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default ServiceSelection;
