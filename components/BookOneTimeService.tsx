import React, { useState } from 'react';
import { ContentData, ServiceItem } from '../types';
import { Star, ArrowRight, Clock, DollarSign, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';

interface BookOneTimeServiceProps {
    content: ContentData;
    onSelectService: (service: ServiceItem) => void;
}

import { apiClient } from '../src/api/client';

const BookOneTimeService: React.FC<BookOneTimeServiceProps> = ({ content, onSelectService }) => {
    const [services, setServices] = useState<ServiceItem[]>(content.pricing.oneTimeServices);

    React.useEffect(() => {
        const fetchServices = async () => {
            try {
                const data = await apiClient.get('/services?type=ONETIME');
                if (data && data.length > 0) {
                    const mappedServices: ServiceItem[] = data.map((service: any) => ({
                        title: service.title,
                        price: `NPR ${service.price}`,
                    }));
                    setServices(mappedServices);
                }
            } catch (error) {
                console.error('Failed to fetch services:', error);
            }
        };
        fetchServices();
    }, []);
    return (
        <div className="bg-gray-50 min-h-screen py-20 relative overflow-hidden">
            {/* Decorative background */}
            <div className="absolute top-0 left-0 right-0 h-[500px] bg-gradient-to-b from-orange-50/50 to-transparent pointer-events-none" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full pointer-events-none">
                <div className="absolute top-20 right-10 w-72 h-72 bg-brand-orange/5 rounded-full blur-3xl" />
                <div className="absolute top-40 left-10 w-96 h-96 bg-brand-teal/5 rounded-full blur-3xl" />
            </div>

            <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
                {/* Header Section */}
                <div className="text-center mb-20">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full mb-8 shadow-sm border border-gray-100"
                    >
                        <Clock className="w-5 h-5 text-brand-orange fill-brand-orange" />
                        <span className="text-brand-orange font-bold text-sm uppercase tracking-wider">
                            Flexible Care
                        </span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-6xl font-extrabold tracking-tight text-gray-900 mb-6"
                    >
                        {content.pricing.oneTimeTitle}
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-xl leading-relaxed text-gray-600 max-w-3xl mx-auto mb-10"
                    >
                        Flexible options for when you need specific help without a monthly commitment.
                    </motion.p>

                    {/* Benefits Grid */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-16"
                    >
                        <div className="flex items-center gap-4 bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
                            <div className="w-12 h-12 bg-brand-orange/10 rounded-xl flex items-center justify-center flex-shrink-0">
                                <Calendar className="w-6 h-6 text-brand-orange" />
                            </div>
                            <span className="text-gray-900 font-bold text-sm text-left">Book On-Demand</span>
                        </div>
                        <div className="flex items-center gap-4 bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
                            <div className="w-12 h-12 bg-brand-orange/10 rounded-xl flex items-center justify-center flex-shrink-0">
                                <DollarSign className="w-6 h-6 text-brand-orange" />
                            </div>
                            <span className="text-gray-900 font-bold text-sm text-left">Pay Per Service</span>
                        </div>
                        <div className="flex items-center gap-4 bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
                            <div className="w-12 h-12 bg-brand-orange/10 rounded-xl flex items-center justify-center flex-shrink-0">
                                <Clock className="w-6 h-6 text-brand-orange" />
                            </div>
                            <span className="text-gray-900 font-bold text-sm text-left">No Commitment Required</span>
                        </div>
                    </motion.div>
                </div>

                {/* Service Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {services.map((service, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                            className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex flex-col justify-between hover:border-brand-orange hover:shadow-xl transition-all group relative overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-orange/5 rounded-bl-full -mr-16 -mt-16 transition-transform group-hover:scale-150" />

                            <div className="relative z-10">
                                <div className="w-14 h-14 bg-orange-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-brand-orange group-hover:scale-110 transition-all duration-300 shadow-sm">
                                    <Star className="w-7 h-7 text-brand-orange group-hover:text-white transition-colors" />
                                </div>
                                <h4 className="font-bold text-xl text-gray-900 mb-2 group-hover:text-brand-orange transition-colors">{service.title}</h4>
                                <p className="text-sm text-gray-500 mb-6 font-medium">Single service request</p>
                            </div>

                            <div className="flex flex-col gap-6 mt-auto relative z-10">
                                <div className="flex items-baseline">
                                    <span className="text-3xl font-extrabold text-gray-900">{service.price}</span>
                                </div>
                                <button
                                    onClick={() => onSelectService(service)}
                                    className="w-full flex items-center justify-center gap-2 px-4 py-3.5 border-2 border-brand-orange text-brand-orange rounded-xl text-sm font-bold hover:bg-brand-orange hover:text-white transition-all shadow-sm hover:shadow-lg hover:shadow-brand-orange/20 active:scale-95"
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
