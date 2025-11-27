import React from 'react';
import { ContentData } from '../types';
import { Heart, Stethoscope, ShoppingBag, PhoneCall, CreditCard, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

interface FeaturesProps {
    content: ContentData;
}

const Features: React.FC<FeaturesProps> = ({ content }) => {
    const getIcon = (iconName: string) => {
        switch (iconName) {
            case 'heart': return <Heart className="w-10 h-10 text-brand-orange" />;
            case 'stethoscope': return <Stethoscope className="w-10 h-10 text-brand-teal" />;
            case 'shopping-bag': return <ShoppingBag className="w-10 h-10 text-blue-500" />;
            case 'phone-call': return <PhoneCall className="w-10 h-10 text-red-500" />;
            default: return <Heart className="w-10 h-10 text-brand-orange" />;
        }
    };

    return (
        <div id="features" className="py-24 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Short About Section */}
                <div className="mb-24 flex flex-col lg:flex-row items-center gap-16">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="lg:w-1/2"
                    >
                        <img src="/about-hero.png" alt="About MAPI" className="rounded-3xl shadow-2xl w-full object-cover h-96" />
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="lg:w-1/2"
                    >
                        <h2 className="text-brand-orange font-bold tracking-wide uppercase text-sm mb-2">Who We Are</h2>
                        <h3 className="text-3xl font-bold text-gray-900 mb-6">{content.about.missionTitle}</h3>
                        <p className="text-lg text-gray-600 leading-relaxed mb-8">
                            {content.about.missionText}
                        </p>
                        <div className="grid grid-cols-2 gap-6">
                            <div className="bg-gray-50 p-4 rounded-xl">
                                <h4 className="font-bold text-2xl text-brand-teal mb-1">500+</h4>
                                <p className="text-sm text-gray-500">Happy Families</p>
                            </div>
                            <div className="bg-gray-50 p-4 rounded-xl">
                                <h4 className="font-bold text-2xl text-brand-teal mb-1">50+</h4>
                                <p className="text-sm text-gray-500">Trained Saathis</p>
                            </div>
                        </div>
                    </motion.div>
                </div>

                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-base text-brand-teal font-semibold tracking-wide uppercase"
                    >
                        Our Services
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl"
                    >
                        {content.landingServices.title}
                    </motion.p>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto"
                    >
                        {content.landingServices.subtitle}
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {content.landingServices.services.map((service, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className="relative group bg-white p-8 rounded-3xl shadow-sm hover:shadow-2xl transition-all duration-300 border border-gray-100 overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 -mt-8 -mr-8 w-32 h-32 bg-brand-light rounded-full opacity-50 group-hover:scale-150 transition-transform duration-500"></div>

                            <div className="relative z-10 bg-white rounded-2xl p-4 inline-block mb-6 shadow-md group-hover:scale-110 transition-transform duration-300">
                                {getIcon(service.icon)}
                            </div>
                            <h3 className="relative z-10 text-xl font-bold text-gray-900 mb-3">
                                {service.title}
                            </h3>
                            <p className="relative z-10 text-gray-500 mb-6 leading-relaxed">
                                {service.description}
                            </p>
                            <div className="relative z-10 flex items-center text-brand-teal font-medium group-hover:translate-x-2 transition-transform cursor-pointer">
                                Learn more <ArrowRight className="w-4 h-4 ml-2" />
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Partners Strip */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                    className="mt-24 pt-10 border-t border-gray-100"
                >
                    <p className="text-center text-gray-400 font-medium mb-8 uppercase tracking-widest text-sm">Supported Payment Methods</p>
                    <div className="flex flex-wrap justify-center gap-8 md:gap-12 items-center opacity-70 grayscale hover:grayscale-0 transition-all duration-500">
                        <div className="flex items-center gap-2 font-bold text-2xl text-blue-900 bg-gray-50 px-4 py-2 rounded-lg border border-gray-200">
                            <span className="italic">VISA</span>
                        </div>
                        <div className="flex items-center gap-2 font-bold text-2xl text-red-600 bg-gray-50 px-4 py-2 rounded-lg border border-gray-200">
                            <div className="flex -space-x-2">
                                <div className="w-6 h-6 rounded-full bg-red-500 opacity-80"></div>
                                <div className="w-6 h-6 rounded-full bg-yellow-500 opacity-80"></div>
                            </div>
                            <span>Mastercard</span>
                        </div>
                        <div className="flex items-center gap-2 font-bold text-xl text-blue-500 bg-gray-50 px-4 py-2 rounded-lg border border-gray-200">
                            <span>AMERICAN EXPRESS</span>
                        </div>
                        <div className="flex items-center gap-2 font-bold text-xl text-green-600 bg-gray-50 px-4 py-2 rounded-lg border border-gray-200">
                            <CreditCard className="w-6 h-6" /> eSewa
                        </div>
                        <div className="flex items-center gap-2 font-bold text-xl text-purple-600 bg-gray-50 px-4 py-2 rounded-lg border border-gray-200">
                            <CreditCard className="w-6 h-6" /> Khalti
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Features;