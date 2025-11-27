import React from 'react';
import { ContentData } from '../types';

interface PartnersProps {
    content: ContentData;
}

const Partners: React.FC<PartnersProps> = ({ content }) => {
    const { title, subtitle, image, partners } = content.partnersSection;

    return (
        <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-4">
                        {title}
                    </h2>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        {subtitle}
                    </p>
                </div>

                <div className="flex flex-col md:flex-row items-center justify-center gap-12">
                    <div className="w-full md:w-1/2 flex justify-center">
                        <div className="relative group">
                            <div className="absolute -inset-1 bg-gradient-to-r from-brand-teal to-blue-600 rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
                            <img
                                src={image}
                                alt="Featured Partner"
                                className="relative rounded-lg shadow-xl w-full max-w-md object-cover transform transition-transform duration-500 hover:scale-105"
                            />
                        </div>
                    </div>

                    <div className="w-full md:w-1/2">
                        <div className="grid grid-cols-2 gap-6">
                            {partners.map((partner, index) => (
                                <div
                                    key={index}
                                    className="flex items-center justify-center p-6 bg-gray-50 rounded-lg border border-gray-100 hover:shadow-md transition-shadow duration-300"
                                >
                                    <span className="text-lg font-medium text-gray-700 text-center">
                                        {partner}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Partners;
