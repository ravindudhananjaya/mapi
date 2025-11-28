import React, { useState } from 'react';
import { ContentData } from '../types';
import { MapPin, Navigation, ShoppingCart, CheckCircle, Filter, Car, Check, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

interface DriverTripsProps {
    content: ContentData;
}

const DriverTrips: React.FC<DriverTripsProps> = ({ content }) => {
    const [filterType, setFilterType] = useState<'all' | 'subscription' | 'onetime'>('all');

    const trips = [
        { id: 1, pickup: 'Bhatbhateni Supermarket, Koteshwor', dropoff: 'Ram Kumar\'s Residence, Tinkune', type: 'subscription', status: 'pending', task: 'Grocery', time: '10:00 AM' },
        { id: 2, pickup: 'Baneshwor Height', dropoff: 'Norvic Hospital', type: 'onetime', status: 'pending', task: 'Transport', time: '02:00 PM' },
        { id: 3, pickup: 'Lalitpur Grocery', dropoff: 'Sita Home, Patan', type: 'subscription', status: 'completed', task: 'Grocery', time: 'Yesterday' },
    ];

    const openGoogleMaps = (address: string) => {
        return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
    };

    const filteredTrips = trips.filter(trip => filterType === 'all' || trip.type === filterType);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        <div className="min-h-screen bg-gray-50 p-4 sm:p-8 relative overflow-hidden">
            {/* Decorative background */}
            <div className="absolute top-0 left-0 right-0 h-64 bg-gradient-to-b from-teal-50/50 to-transparent pointer-events-none" />

            <div className="max-w-4xl mx-auto relative z-10">
                <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight mb-2">My Trips</h1>
                        <p className="text-gray-500 text-lg">Manage your assigned trips and tasks.</p>
                    </div>

                    <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-xl border border-gray-200 shadow-sm hover:border-brand-teal transition-colors">
                        <Filter className="h-4 w-4 text-brand-teal" />
                        <select
                            className="text-sm border-none focus:ring-0 text-gray-700 bg-transparent outline-none cursor-pointer font-medium"
                            value={filterType}
                            onChange={(e) => setFilterType(e.target.value as any)}
                        >
                            <option value="all">{content.driverDashboard.filters.all}</option>
                            <option value="subscription">{content.driverDashboard.filters.subscription}</option>
                            <option value="onetime">{content.driverDashboard.filters.oneTime}</option>
                        </select>
                    </div>
                </div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="space-y-6"
                >
                    {filteredTrips.map((trip) => (
                        <motion.div
                            variants={itemVariants}
                            key={trip.id}
                            className="glass-panel rounded-2xl overflow-hidden card-hover"
                        >
                            <div className={`p-5 text-white flex justify-between items-center ${trip.task === 'Grocery' ? 'bg-gradient-to-r from-orange-500 to-red-500' : 'bg-gradient-to-r from-teal-600 to-teal-500'}`}>
                                <span className="font-bold flex items-center gap-3 text-lg">
                                    <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                                        {trip.task === 'Grocery' ? <ShoppingCart className="h-5 w-5" /> : <Car className="h-5 w-5" />}
                                    </div>
                                    {trip.task === 'Grocery' ? 'Grocery Run' : 'Transport Service'}
                                </span>
                                <div className="flex items-center gap-3">
                                    <span className="text-sm bg-black/20 backdrop-blur-sm px-3 py-1.5 rounded-lg flex items-center gap-1.5 font-medium border border-white/10">
                                        <Clock className="h-4 w-4" /> {trip.time}
                                    </span>
                                    {trip.status === 'pending' && <span className="text-sm bg-white text-teal-700 px-3 py-1.5 rounded-lg font-bold shadow-sm">Active</span>}
                                    {trip.status === 'completed' && <span className="text-sm bg-green-500 text-white px-3 py-1.5 rounded-lg flex items-center gap-1 font-bold shadow-sm"><Check className="h-4 w-4" /> Done</span>}
                                </div>
                            </div>
                            <div className="p-8 space-y-8">
                                <div className="flex gap-6 relative">
                                    <div className="flex flex-col items-center pt-2">
                                        <div className="w-4 h-4 bg-gray-300 rounded-full ring-4 ring-gray-100"></div>
                                        <div className="w-0.5 h-full bg-gray-200 my-2"></div>
                                        <div className={`w-4 h-4 rounded-full ring-4 ring-opacity-50 shadow-sm ${trip.status === 'completed' ? 'bg-green-500 ring-green-100' : 'bg-brand-teal ring-teal-100'}`}></div>
                                    </div>
                                    <div className="flex-1 space-y-8">
                                        <div className="group">
                                            <p className="text-xs text-gray-400 uppercase font-bold mb-2 tracking-wider">{content.driverDashboard.labels.pickup}</p>
                                            <div className="flex justify-between items-start p-4 bg-gray-50 rounded-xl border border-gray-100 group-hover:border-gray-200 transition-colors">
                                                <p className="text-gray-900 font-semibold text-lg">{trip.pickup}</p>
                                                <a
                                                    href={openGoogleMaps(trip.pickup)}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    className="text-brand-teal bg-white p-2.5 rounded-xl shadow-sm hover:shadow-md hover:scale-105 transition-all border border-gray-100"
                                                    title={content.driverDashboard.actions.openMap}
                                                >
                                                    <MapPin className="h-5 w-5" />
                                                </a>
                                            </div>
                                        </div>
                                        <div className="group">
                                            <p className="text-xs text-gray-400 uppercase font-bold mb-2 tracking-wider">{content.driverDashboard.labels.dropoff}</p>
                                            <div className="flex justify-between items-start p-4 bg-gray-50 rounded-xl border border-gray-100 group-hover:border-gray-200 transition-colors">
                                                <p className="text-gray-900 font-semibold text-lg">{trip.dropoff}</p>
                                                <a
                                                    href={openGoogleMaps(trip.dropoff)}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    className="text-brand-orange bg-white p-2.5 rounded-xl shadow-sm hover:shadow-md hover:scale-105 transition-all border border-gray-100"
                                                    title={content.driverDashboard.actions.openMap}
                                                >
                                                    <MapPin className="h-5 w-5" />
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {trip.status !== 'completed' && (
                                    <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-100">
                                        <motion.button
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            className="flex items-center justify-center gap-2 py-3.5 bg-white border border-gray-200 text-gray-700 rounded-xl font-bold hover:bg-gray-50 hover:border-gray-300 transition-all shadow-sm"
                                        >
                                            <Navigation className="h-5 w-5" /> Navigation
                                        </motion.button>
                                        <motion.button
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            className="flex items-center justify-center gap-2 py-3.5 bg-brand-teal text-white rounded-xl font-bold hover:bg-teal-800 shadow-lg shadow-brand-teal/20 hover:shadow-xl hover:shadow-brand-teal/30 transition-all"
                                        >
                                            <CheckCircle className="h-5 w-5" /> {content.driverDashboard.actions.complete}
                                        </motion.button>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </div>
    );
};

export default DriverTrips;
