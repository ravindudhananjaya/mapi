import React from 'react';
import { ContentData } from '../types';
import { Calendar, ShoppingCart, ArrowRight, Heart, Clock, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

interface BookServiceProps {
    content: ContentData;
    onSelectType: (type: 'subscription' | 'onetime') => void;
}

const BookService: React.FC<BookServiceProps> = ({ content, onSelectType }) => {
    return (
        <div className="min-h-screen bg-gray-50 py-16 px-4 relative overflow-hidden">
            {/* Decorative background */}
            <div className="absolute top-0 left-0 right-0 h-96 bg-gradient-to-b from-teal-50/50 to-transparent pointer-events-none" />
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-brand-teal/5 rounded-full blur-3xl" />
            <div className="absolute top-1/2 -left-24 w-72 h-72 bg-brand-orange/5 rounded-full blur-3xl" />

            <div className="max-w-6xl mx-auto relative z-10">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-16"
                >
                    <span className="inline-block py-1 px-3 rounded-full bg-brand-teal/10 text-brand-teal text-sm font-bold uppercase tracking-wider mb-4">
                        Our Services
                    </span>
                    <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 mb-6 tracking-tight">
                        Book a <span className="text-brand-teal">Service</span>
                    </h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                        Choose how you'd like to receive care for your loved ones. We offer flexible plans tailored to your needs.
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
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                                onSelectType('subscription');
                            }
                        }}
                        role="button"
                        tabIndex={0}
                        className="group relative bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer overflow-hidden border border-gray-100 hover:border-brand-teal/30 focus:outline-none focus:ring-4 focus:ring-brand-teal/20"
                    >
                        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-brand-teal/5 to-transparent rounded-bl-full transform group-hover:scale-110 transition-transform duration-500" />

                        <div className="p-10 relative z-10 h-full flex flex-col">
                            <div className="w-20 h-20 bg-brand-teal/10 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-300 shadow-sm">
                                <Heart className="w-10 h-10 text-brand-teal" />
                            </div>

                            <h2 className="text-3xl font-bold text-gray-900 mb-4 group-hover:text-brand-teal transition-colors">
                                Monthly Care Plans
                            </h2>

                            <p className="text-gray-600 mb-8 leading-relaxed text-lg flex-grow">
                                Subscribe to ongoing care with regular visits from dedicated healthcare providers. Perfect for continuous support and monitoring.
                            </p>

                            <div className="space-y-4 mb-10">
                                <div className="flex items-center gap-3 text-gray-700">
                                    <CheckCircle2 className="w-5 h-5 text-brand-teal flex-shrink-0" />
                                    <span className="font-medium">Regular scheduled visits</span>
                                </div>
                                <div className="flex items-center gap-3 text-gray-700">
                                    <CheckCircle2 className="w-5 h-5 text-brand-teal flex-shrink-0" />
                                    <span className="font-medium">Dedicated care provider</span>
                                </div>
                                <div className="flex items-center gap-3 text-gray-700">
                                    <CheckCircle2 className="w-5 h-5 text-brand-teal flex-shrink-0" />
                                    <span className="font-medium">Flexible monthly plans</span>
                                </div>
                            </div>

                            <button className="w-full flex items-center justify-center gap-2 px-8 py-4 bg-brand-teal text-white rounded-xl font-bold text-lg hover:bg-teal-800 transition-all shadow-lg shadow-brand-teal/20 group-hover:shadow-brand-teal/30" tabIndex={-1}>
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
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                                onSelectType('onetime');
                            }
                        }}
                        role="button"
                        tabIndex={0}
                        className="group relative bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer overflow-hidden border border-gray-100 hover:border-brand-orange/30 focus:outline-none focus:ring-4 focus:ring-brand-orange/20"
                    >
                        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-brand-orange/5 to-transparent rounded-bl-full transform group-hover:scale-110 transition-transform duration-500" />

                        <div className="p-10 relative z-10 h-full flex flex-col">
                            <div className="w-20 h-20 bg-brand-orange/10 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-300 shadow-sm">
                                <Clock className="w-10 h-10 text-brand-orange" />
                            </div>

                            <h2 className="text-3xl font-bold text-gray-900 mb-4 group-hover:text-brand-orange transition-colors">
                                One-Time Services
                            </h2>

                            <p className="text-gray-600 mb-8 leading-relaxed text-lg flex-grow">
                                Book individual services as needed. Ideal for occasional assistance, transportation, or specific care requirements.
                            </p>

                            <div className="space-y-4 mb-10">
                                <div className="flex items-center gap-3 text-gray-700">
                                    <CheckCircle2 className="w-5 h-5 text-brand-orange flex-shrink-0" />
                                    <span className="font-medium">Book on-demand</span>
                                </div>
                                <div className="flex items-center gap-3 text-gray-700">
                                    <CheckCircle2 className="w-5 h-5 text-brand-orange flex-shrink-0" />
                                    <span className="font-medium">Pay per service</span>
                                </div>
                                <div className="flex items-center gap-3 text-gray-700">
                                    <CheckCircle2 className="w-5 h-5 text-brand-orange flex-shrink-0" />
                                    <span className="font-medium">No commitment required</span>
                                </div>
                            </div>

                            <button className="w-full flex items-center justify-center gap-2 px-8 py-4 bg-brand-orange text-white rounded-xl font-bold text-lg hover:bg-orange-700 transition-all shadow-lg shadow-brand-orange/20 group-hover:shadow-brand-orange/30">
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
                    className="text-center mt-16"
                >
                    <p className="text-gray-500">
                        Not sure which option is right for you? <a href="#" className="text-brand-teal font-bold hover:underline">Contact us</a> for personalized recommendations.
                    </p>
                </motion.div>
            </div>
        </div>
    );
};

export default BookService;
