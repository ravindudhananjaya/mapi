import React, { useState } from 'react';
import { ContentData, ServiceType } from '../types';
import { Package } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface DriverScheduleProps {
    content: ContentData;
}

const DriverSchedule: React.FC<DriverScheduleProps> = ({ content }) => {
    const [requests, setRequests] = useState([
        { id: 201, pickup: 'Kalanki, KTM', dropoff: 'Thamel, KTM', type: 'onetime' as ServiceType, client: 'Tourist Guest' },
    ]);

    const handleAccept = (id: number) => {
        setRequests(requests.filter(r => r.id !== id));
        alert("Trip Accepted");
    };

    const handleDecline = (id: number) => {
        setRequests(requests.filter(r => r.id !== id));
        alert("Trip Declined");
    };

    return (
        <div className="min-h-screen bg-gray-50 p-4 sm:p-8 relative overflow-hidden">
            {/* Decorative background */}
            <div className="absolute top-0 left-0 right-0 h-64 bg-gradient-to-b from-orange-50/50 to-transparent pointer-events-none" />

            <div className="max-w-3xl mx-auto relative z-10">
                <div className="mb-8">
                    <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight mb-2">New Requests</h1>
                    <p className="text-gray-500 text-lg">Review and accept new trip requests.</p>
                </div>

                <AnimatePresence>
                    <div className="space-y-6">
                        {requests.map((req) => (
                            <motion.div
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                key={req.id}
                                className="glass-panel p-8 rounded-2xl border-l-4 border-l-brand-orange card-hover"
                            >
                                <div className="flex justify-between items-start mb-6">
                                    <div>
                                        <h3 className="text-xl font-bold text-gray-900">{req.client}</h3>
                                        <div className="flex items-center gap-3 mt-2">
                                            <span className="text-xs px-2.5 py-1 rounded-lg bg-blue-50 text-blue-700 border border-blue-100 uppercase font-bold tracking-wider">{req.type}</span>
                                            <span className="text-xs px-2.5 py-1 rounded-lg bg-gray-100 text-gray-600 border border-gray-200 flex items-center gap-1.5 font-medium"><Package className="h-3.5 w-3.5" /> Transport</span>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <span className="block text-2xl font-extrabold text-brand-orange tracking-tight">NPR 1,200</span>
                                        <span className="text-xs text-gray-400 font-medium uppercase tracking-wide">Est. Earning</span>
                                    </div>
                                </div>

                                <div className="space-y-4 mb-8 bg-gray-50 p-4 rounded-xl border border-gray-100">
                                    <div className="flex gap-4 items-center">
                                        <span className="text-xs font-bold text-gray-400 uppercase w-12 tracking-wider">From</span>
                                        <span className="font-medium text-gray-900">{req.pickup}</span>
                                    </div>
                                    <div className="w-full h-px bg-gray-200" />
                                    <div className="flex gap-4 items-center">
                                        <span className="text-xs font-bold text-gray-400 uppercase w-12 tracking-wider">To</span>
                                        <span className="font-medium text-gray-900">{req.dropoff}</span>
                                    </div>
                                </div>

                                <div className="flex gap-4">
                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        onClick={() => handleDecline(req.id)}
                                        className="flex-1 py-3 border border-gray-200 text-gray-600 rounded-xl font-bold hover:bg-gray-50 hover:text-gray-900 transition-colors"
                                    >
                                        {content.driverDashboard.actions.decline}
                                    </motion.button>
                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        onClick={() => handleAccept(req.id)}
                                        className="flex-1 py-3 bg-brand-orange text-white rounded-xl font-bold hover:bg-orange-700 shadow-lg shadow-brand-orange/20 hover:shadow-xl hover:shadow-brand-orange/30 transition-all"
                                    >
                                        {content.driverDashboard.actions.accept}
                                    </motion.button>
                                </div>
                            </motion.div>
                        ))}
                        {requests.length === 0 && (
                            <div className="glass-panel p-12 rounded-2xl border border-dashed border-gray-300 text-center text-gray-500 flex flex-col items-center gap-4">
                                <div className="p-4 bg-gray-50 rounded-full">
                                    <Package className="h-8 w-8 text-gray-400" />
                                </div>
                                <p className="font-medium">No new trip requests.</p>
                            </div>
                        )}
                    </div>
                </AnimatePresence>
            </div>
        </div>
    );
};

export default DriverSchedule;
