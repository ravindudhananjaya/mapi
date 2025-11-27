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
        <div className="min-h-screen bg-gray-50 p-4 sm:p-8">
            <div className="max-w-3xl mx-auto">
                <div className="mb-6">
                    <h1 className="text-2xl font-bold text-gray-900">My Trips</h1>
                    <p className="text-gray-500">Manage your assigned trips and tasks.</p>
                </div>

                <div className="space-y-6">
                    <div className="flex justify-end">
                        <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-md border border-gray-200 shadow-sm">
                            <Filter className="h-4 w-4 text-gray-400" />
                            <select
                                className="text-sm border-none focus:ring-0 text-gray-600 bg-transparent outline-none cursor-pointer"
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
                                className="bg-white rounded-xl shadow border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
                            >
                                <div className={`p-4 text-white flex justify-between items-center ${trip.task === 'Grocery' ? 'bg-brand-orange' : 'bg-brand-teal'}`}>
                                    <span className="font-bold flex items-center gap-2">
                                        {trip.task === 'Grocery' ? <ShoppingCart className="h-5 w-5" /> : <Car className="h-5 w-5" />}
                                        {trip.task === 'Grocery' ? 'Grocery Run' : 'Transport Service'}
                                    </span>
                                    <div className="flex items-center gap-3">
                                        <span className="text-sm bg-white/20 px-2 py-1 rounded flex items-center gap-1"><Clock className="h-3 w-3" /> {trip.time}</span>
                                        {trip.status === 'pending' && <span className="text-sm bg-white/20 px-2 py-1 rounded">Active</span>}
                                        {trip.status === 'completed' && <span className="text-sm bg-green-500/50 px-2 py-1 rounded flex items-center gap-1"><Check className="h-3 w-3" /> Done</span>}
                                    </div>
                                </div>
                                <div className="p-6 space-y-6">
                                    <div className="flex gap-4 relative">
                                        <div className="flex flex-col items-center pt-1">
                                            <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
                                            <div className="w-0.5 h-full bg-gray-200 my-1"></div>
                                            <div className="w-3 h-3 bg-brand-teal rounded-full"></div>
                                        </div>
                                        <div className="flex-1 space-y-6">
                                            <div>
                                                <p className="text-xs text-gray-500 uppercase font-bold mb-1">{content.driverDashboard.labels.pickup}</p>
                                                <div className="flex justify-between items-start">
                                                    <p className="text-gray-900 font-medium">{trip.pickup}</p>
                                                    <a
                                                        href={openGoogleMaps(trip.pickup)}
                                                        target="_blank"
                                                        rel="noreferrer"
                                                        className="text-brand-teal hover:bg-teal-50 p-1.5 rounded-full transition-colors"
                                                        title={content.driverDashboard.actions.openMap}
                                                    >
                                                        <MapPin className="h-5 w-5" />
                                                    </a>
                                                </div>
                                            </div>
                                            <div>
                                                <p className="text-xs text-gray-500 uppercase font-bold mb-1">{content.driverDashboard.labels.dropoff}</p>
                                                <div className="flex justify-between items-start">
                                                    <p className="text-gray-900 font-medium">{trip.dropoff}</p>
                                                    <a
                                                        href={openGoogleMaps(trip.dropoff)}
                                                        target="_blank"
                                                        rel="noreferrer"
                                                        className="text-brand-orange hover:bg-orange-50 p-1.5 rounded-full transition-colors"
                                                        title={content.driverDashboard.actions.openMap}
                                                    >
                                                        <MapPin className="h-5 w-5" />
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {trip.status !== 'completed' && (
                                        <div className="grid grid-cols-2 gap-3">
                                            <motion.button
                                                whileHover={{ scale: 1.02 }}
                                                className="flex items-center justify-center gap-2 py-3 bg-gray-100 text-gray-700 rounded-lg font-bold hover:bg-gray-200 transition-colors"
                                            >
                                                <Navigation className="h-5 w-5" /> Navigation
                                            </motion.button>
                                            <motion.button
                                                whileHover={{ scale: 1.02 }}
                                                className="flex items-center justify-center gap-2 py-3 bg-brand-teal text-white rounded-lg font-bold hover:bg-teal-900 shadow-md transition-colors"
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
        </div>
    );
};

export default DriverTrips;
