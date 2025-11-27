import React from 'react';
import { ContentData } from '../types';
import { Calendar, ShoppingCart, ArrowRight, Heart, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

interface BookServiceProps {
    content: ContentData;
    onSelectType: (type: 'subscription' | 'onetime') => void;
}

const BookService: React.FC<BookServiceProps> = ({ content, onSelectType }) => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-orange-50 py-16 px-4">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-16"
                >
                    <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
                        Book a Service
                    </h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Choose how you'd like to receive care for your loved ones
                    </p>
                </motion.div>

                {/* Service Type Cards */}
                <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                    {/* Subscription Card */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 }}
                        onClick={() => onSelectType('subscription')}
                        className="group relative bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer overflow-hidden border-2 border-transparent hover:border-brand-teal"
                    >
                        <div className="absolute top-0 right-0 w-32 h-32 bg-brand-teal opacity-10 rounded-bl-full transform group-hover:scale-150 transition-transform duration-500"></div>

                        <div className="p-8 relative z-10">
                            <div className="w-16 h-16 bg-brand-teal bg-opacity-10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <Heart className="w-8 h-8 text-brand-teal" />
                            </div>

                            <h2 className="text-2xl font-bold text-gray-900 mb-4">
                                Monthly Care Plans
                            </h2>

                            <p className="text-gray-600 mb-6 leading-relaxed">
                                Subscribe to ongoing care with regular visits from dedicated healthcare providers. Perfect for continuous support and monitoring.
                            </p>

                            <div className="space-y-3 mb-8">
                                <div className="flex items-center gap-3 text-gray-700">
                                    <div className="w-2 h-2 bg-brand-teal rounded-full"></div>
                                    <span className="text-sm">Regular scheduled visits</span>
                                </div>
                                <div className="flex items-center gap-3 text-gray-700">
                                    <div className="w-2 h-2 bg-brand-teal rounded-full"></div>
                                    <span className="text-sm">Dedicated care provider</span>
                                </div>
                                <div className="flex items-center gap-3 text-gray-700">
                                    <div className="w-2 h-2 bg-brand-teal rounded-full"></div>
                                    <span className="text-sm">Flexible monthly plans</span>
                                </div>
                            </div>

                            <button className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-brand-teal text-white rounded-xl font-bold hover:bg-teal-900 transition-all group-hover:shadow-lg">
                                View Plans
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </button>
                        </div>
                    </motion.div>

                    {/* One-Time Services Card */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        onClick={() => onSelectType('onetime')}
                        className="group relative bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer overflow-hidden border-2 border-transparent hover:border-brand-orange"
                    >
                        <div className="absolute top-0 right-0 w-32 h-32 bg-brand-orange opacity-10 rounded-bl-full transform group-hover:scale-150 transition-transform duration-500"></div>

                        <div className="p-8 relative z-10">
                            <div className="w-16 h-16 bg-brand-orange bg-opacity-10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <Clock className="w-8 h-8 text-brand-orange" />
                            </div>

                            <h2 className="text-2xl font-bold text-gray-900 mb-4">
                                One-Time Services
                            </h2>

                            <p className="text-gray-600 mb-6 leading-relaxed">
                                Book individual services as needed. Ideal for occasional assistance, transportation, or specific care requirements.
                            </p>

                            <div className="space-y-3 mb-8">
                                <div className="flex items-center gap-3 text-gray-700">
                                    <div className="w-2 h-2 bg-brand-orange rounded-full"></div>
                                    <span className="text-sm">Book on-demand</span>
                                </div>
                                <div className="flex items-center gap-3 text-gray-700">
                                    <div className="w-2 h-2 bg-brand-orange rounded-full"></div>
                                    <span className="text-sm">Pay per service</span>
                                </div>
                                <div className="flex items-center gap-3 text-gray-700">
                                    <div className="w-2 h-2 bg-brand-orange rounded-full"></div>
                                    <span className="text-sm">No commitment required</span>
                                </div>
                            </div>

                            <button className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-brand-orange text-white rounded-xl font-bold hover:bg-orange-600 transition-all group-hover:shadow-lg">
                                Browse Services
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </button>
                        </div>
                    </motion.div>
                </div>

                {/* Help Text */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="text-center mt-12"
                >
                    <p className="text-gray-500 text-sm">
                        Not sure which option is right for you? <a href="#" className="text-brand-teal font-medium hover:underline">Contact us</a> for personalized recommendations.
                    </p>
                </motion.div>
            </div>
        </div>
    );
};

export default BookService;
