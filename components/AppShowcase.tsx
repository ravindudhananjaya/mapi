import React from 'react';
import { ContentData } from '../types';
import { Bell, Activity, Camera, MessageCircle, Smartphone } from 'lucide-react';

interface AppShowcaseProps {
    content: ContentData;
}

const AppShowcase: React.FC<AppShowcaseProps> = ({ content }) => {
    const getIcon = (iconName: string) => {
        switch (iconName) {
            case 'bell': return <Bell className="w-6 h-6 text-white" />;
            case 'activity': return <Activity className="w-6 h-6 text-white" />;
            case 'camera': return <Camera className="w-6 h-6 text-white" />;
            case 'message-circle': return <MessageCircle className="w-6 h-6 text-white" />;
            default: return <Bell className="w-6 h-6 text-white" />;
        }
    };

    return (
        <div className="py-24 bg-gray-900 overflow-hidden relative">
            {/* Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
                <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] bg-brand-teal/20 rounded-full blur-3xl"></div>
                <div className="absolute top-[40%] -right-[10%] w-[40%] h-[40%] bg-brand-orange/20 rounded-full blur-3xl"></div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">

                    {/* Content */}
                    <div className="mb-12 lg:mb-0">
                        <h2 className="text-base text-brand-orange font-semibold tracking-wide uppercase mb-2">
                            MAPI App
                        </h2>
                        <h3 className="text-3xl font-extrabold text-white sm:text-4xl mb-6">
                            {content.appShowcase.title}
                        </h3>
                        <p className="text-xl text-gray-300 mb-10">
                            {content.appShowcase.subtitle}
                        </p>

                        <div className="space-y-8">
                            {content.appShowcase.features.map((feature, idx) => (
                                <div key={idx} className="flex">
                                    <div className="flex-shrink-0">
                                        <div className="flex items-center justify-center h-12 w-12 rounded-xl bg-brand-teal shadow-lg">
                                            {getIcon(feature.icon)}
                                        </div>
                                    </div>
                                    <div className="ml-4">
                                        <h4 className="text-lg font-bold text-white">{feature.title}</h4>
                                        <p className="mt-1 text-gray-400">{feature.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* App Mockup Image */}
                    <div className="relative mx-auto w-full max-w-[300px] lg:max-w-[400px]">
                        <div className="relative rounded-[2.5rem] border-[8px] border-gray-800 bg-gray-800 shadow-2xl overflow-hidden">
                            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1/3 h-6 bg-gray-800 rounded-b-xl z-20"></div>
                            <img
                                src="https://images.unsplash.com/photo-1555421689-491a97ff2040?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                                alt="App Screenshot"
                                className="w-full h-auto object-cover relative z-10 opacity-90"
                            />
                            {/* Overlay UI Mockup */}
                            <div className="absolute inset-0 z-20 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-6">
                                <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20 mb-4">
                                    <div className="flex items-center gap-3 mb-2">
                                        <div className="w-10 h-10 rounded-full bg-brand-orange flex items-center justify-center text-white font-bold">S</div>
                                        <div>
                                            <p className="text-white font-bold text-sm">Sita (Saathi)</p>
                                            <p className="text-gray-300 text-xs">Just now</p>
                                        </div>
                                    </div>
                                    <p className="text-white text-sm">"Namaste! I just arrived at Buwa's house. We are having tea now."</p>
                                </div>
                                <div className="flex justify-between items-center text-white">
                                    <div className="flex flex-col items-center">
                                        <Activity className="w-5 h-5 text-brand-teal mb-1" />
                                        <span className="text-[10px]">Vitals</span>
                                    </div>
                                    <div className="flex flex-col items-center">
                                        <div className="w-12 h-12 bg-brand-teal rounded-full flex items-center justify-center -mt-6 border-4 border-gray-900">
                                            <Smartphone className="w-6 h-6" />
                                        </div>
                                    </div>
                                    <div className="flex flex-col items-center">
                                        <MessageCircle className="w-5 h-5 text-gray-400 mb-1" />
                                        <span className="text-[10px]">Chat</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Decorative blob behind phone */}
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[120%] h-[100%] bg-brand-teal/10 rounded-full blur-3xl -z-10"></div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default AppShowcase;
