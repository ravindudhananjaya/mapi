import React from 'react';
import { ContentData } from '../types';
import { Star, Quote } from 'lucide-react';

interface TestimonialsProps {
    content: ContentData;
}

const Testimonials: React.FC<TestimonialsProps> = ({ content }) => {
    return (
        <div className="bg-brand-light py-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-base text-brand-orange font-semibold tracking-wide uppercase">Testimonials</h2>
                    <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                        {content.testimonials.title}
                    </p>
                    <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
                        {content.testimonials.subtitle}
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {content.testimonials.items.map((item, idx) => (
                        <div key={idx} className="bg-white rounded-2xl p-8 shadow-lg relative">
                            <Quote className="absolute top-6 right-6 w-10 h-10 text-brand-teal/10" />
                            <div className="flex items-center gap-1 mb-6">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                                ))}
                            </div>
                            <p className="text-gray-600 mb-8 italic relative z-10">
                                "{item.quote}"
                            </p>
                            <div className="flex items-center gap-4">
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    className="w-12 h-12 rounded-full object-cover border-2 border-brand-teal"
                                />
                                <div>
                                    <h4 className="font-bold text-gray-900">{item.name}</h4>
                                    <p className="text-sm text-gray-500">{item.location}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Testimonials;
