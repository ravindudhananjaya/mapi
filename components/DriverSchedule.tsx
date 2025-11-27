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
        <div className="min-h-screen bg-gray-50 p-4 sm:p-8">
            <div className="max-w-3xl mx-auto">
                <div className="mb-6">
                    <h1 className="text-2xl font-bold text-gray-900">New Requests</h1>
                    <p className="text-gray-500">Review and accept new trip requests.</p>
                </div>

                <AnimatePresence>
                    <div className="space-y-4">
                        {requests.map((req) => (
                            <motion.div
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                key={req.id}
                                className="bg-white p-6 rounded-xl shadow-md border-l-4 border-brand-orange"
                            >
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <h3 className="text-lg font-bold text-gray-900">{req.client}</h3>
                                        <div className="flex items-center gap-2 mt-1">
                                            <span className="text-xs px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200 uppercase font-bold tracking-wider">{req.type}</span>
                                            <span className="text-xs px-2 py-0.5 rounded bg-gray-100 text-gray-600 border border-gray-200 flex items-center gap-1"><Package className="h-3 w-3" /> Transport</span>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <span className="block text-brand-orange font-bold">NPR 1,200</span>
                                        <span className="text-xs text-gray-400">Est. Earning</span>
                                    </div>
                                </div>

                                <div className="space-y-2 mb-6 text-sm text-gray-600">
                                    <div className="flex gap-2">
                                        <span className="font-semibold w-16">From:</span>
                                        <span>{req.pickup}</span>
                                    </div>
                                    <div className="flex gap-2">
                                        <span className="font-semibold w-16">To:</span>
                                        <span>{req.dropoff}</span>
                                    </div>
                                </div>

                                <div className="flex gap-3">
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={() => handleDecline(req.id)}
                                        className="flex-1 py-2 border border-gray-300 text-gray-600 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                                    >
                                        {content.driverDashboard.actions.decline}
                                    </motion.button>
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={() => handleAccept(req.id)}
                                        className="flex-1 py-2 bg-brand-orange text-white rounded-lg font-medium hover:bg-orange-700 shadow-sm transition-colors"
                                    >
                                        {content.driverDashboard.actions.accept}
                                    </motion.button>
                                </div>
                            </motion.div>
                        ))}
                        {requests.length === 0 && (
                            <div className="text-center py-12 text-gray-500">No new trip requests.</div>
                        )}
                    </div>
                </AnimatePresence>
            </div>
        </div>
    );
};

export default DriverSchedule;
