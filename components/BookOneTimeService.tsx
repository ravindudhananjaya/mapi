import React from 'react';
import { ContentData, ServiceItem } from '../types';
import { Star, ArrowRight, Clock, DollarSign, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';

interface BookOneTimeServiceProps {
    content: ContentData;
    onSelectService: (service: ServiceItem) => void;
}

const BookOneTimeService: React.FC<BookOneTimeServiceProps> = ({ content, onSelectService }) => {
    return (
        <div className="bg-gradient-to-br from-orange-50 via-white to-amber-50 min-h-screen py-20">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                {/* Header Section */}
                <div className="text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="inline-flex items-center gap-2 bg-brand-orange/10 px-4 py-2 rounded-full mb-6"
                    >
                        <Clock className="w-5 h-5 text-brand-orange" />
                        <span className="text-brand-orange font-semibold text-sm uppercase tracking-wide">
                            Flexible Care
                        </span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 mb-6"
                    >
                        {content.pricing.oneTimeTitle}
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-xl leading-8 text-gray-600 max-w-3xl mx-auto mb-8"
                    >
                        Flexible options for when you need specific help without a monthly commitment.
                    </motion.p>

                    {/* Benefits Grid */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12"
                    >
                        <div className="flex items-center gap-3 bg-white p-4 rounded-xl shadow-sm">
                            <div className="w-10 h-10 bg-brand-orange/10 rounded-lg flex items-center justify-center flex-shrink-0">
                                <Calendar className="w-5 h-5 text-brand-orange" />
                            </div>
                            <span className="text-gray-700 font-medium text-sm">Book On-Demand</span>
                        </div>
                        <div className="flex items-center gap-3 bg-white p-4 rounded-xl shadow-sm">
                            <div className="w-10 h-10 bg-brand-orange/10 rounded-lg flex items-center justify-center flex-shrink-0">
                                <DollarSign className="w-5 h-5 text-brand-orange" />
                            </div>
                            <span className="text-gray-700 font-medium text-sm">Pay Per Service</span>
                        </div>
                        <div className="flex items-center gap-3 bg-white p-4 rounded-xl shadow-sm">
                            <div className="w-10 h-10 bg-brand-orange/10 rounded-lg flex items-center justify-center flex-shrink-0">
                                <Clock className="w-5 h-5 text-brand-orange" />
                            </div>
                            <span className="text-gray-700 font-medium text-sm">No Commitment Required</span>
                        </div>
                    </motion.div>
                </div>

                {/* Service Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {content.pricing.oneTimeServices.map((service, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
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

export default BookOneTimeService;
