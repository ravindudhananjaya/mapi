import React from 'react';
import { ContentData, ServiceItem } from '../types';
import { Star, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

interface OneTimeServicesProps {
    content: ContentData;
    onSelectService: (service: ServiceItem) => void;
}

const OneTimeServices: React.FC<OneTimeServicesProps> = ({ content, onSelectService }) => {
    return (
        <div className="bg-gray-50 min-h-screen py-20">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-base font-semibold leading-7 text-brand-orange uppercase tracking-wide"
                    >
                        Flexible Care
                    </motion.h2>
                    <motion.h3
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="mt-2 text-3xl font-bold text-gray-900 sm:text-4xl"
                    >
                        {content.pricing.oneTimeTitle}
                    </motion.h3>
                    <motion.p
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto"
                    >
                        Flexible options for when you need specific help without a monthly commitment.
                    </motion.p>
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
                                    onClick={() => onSelectService(service)}
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
        </div>
    );
};

export default OneTimeServices;
