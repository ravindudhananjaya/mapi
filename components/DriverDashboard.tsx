import React, { useState } from 'react';
import { ContentData, ServiceType } from '../types';
import { MapPin, Navigation, ShoppingCart, CheckCircle, Car, Clock, Package, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

interface DriverDashboardProps {
    content: ContentData;
}

const DriverDashboard: React.FC<DriverDashboardProps> = ({ content }) => {
    const navigate = useNavigate();

    // Mock Data
    const [requests] = useState([
        { id: 201, pickup: 'Kalanki, KTM', dropoff: 'Thamel, KTM', type: 'onetime' as ServiceType, client: 'Tourist Guest' },
    ]);

    const trips = [
        { id: 1, pickup: 'Bhatbhateni Supermarket, Koteshwor', dropoff: 'Ram Kumar\'s Residence, Tinkune', type: 'subscription', status: 'pending', task: 'Grocery', time: '10:00 AM' },
    ];

    const openGoogleMaps = (address: string) => {
        return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
    };

    return (
        <div className="min-h-screen bg-gray-50 p-4 sm:p-8">
            <div className="max-w-5xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-2xl font-bold text-gray-900">{content.driverDashboard.title}</h1>
                    <p className="text-gray-500">Welcome back! Here's your current status.</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column: Active Trip */}
                    <div className="lg:col-span-2 space-y-8">
                        <section>
                            <h2 className="text-lg font-bold text-gray-900 mb-4">Current Active Trip</h2>
                            {trips.length > 0 ? (
                                <div className="bg-white rounded-xl shadow border border-gray-200 overflow-hidden">
                                    <div className={`p-4 text-white flex justify-between items-center ${trips[0].task === 'Grocery' ? 'bg-brand-orange' : 'bg-brand-teal'}`}>
                                        <span className="font-bold flex items-center gap-2">
                                            {trips[0].task === 'Grocery' ? <ShoppingCart className="h-5 w-5" /> : <Car className="h-5 w-5" />}
                                            {trips[0].task === 'Grocery' ? 'Grocery Run' : 'Transport Service'}
                                        </span>
                                        <div className="flex items-center gap-3">
                                            <span className="text-sm bg-white/20 px-2 py-1 rounded flex items-center gap-1"><Clock className="h-3 w-3" /> {trips[0].time}</span>
                                            <span className="text-sm bg-white/20 px-2 py-1 rounded">Active</span>
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
                                                        <p className="text-gray-900 font-medium">{trips[0].pickup}</p>
                                                        <a
                                                            href={openGoogleMaps(trips[0].pickup)}
                                                            target="_blank"
                                                            rel="noreferrer"
                                                            className="text-brand-teal hover:bg-teal-50 p-1.5 rounded-full transition-colors"
                                                        >
                                                            <MapPin className="h-5 w-5" />
                                                        </a>
                                                    </div>
                                                </div>
                                                <div>
                                                    <p className="text-xs text-gray-500 uppercase font-bold mb-1">{content.driverDashboard.labels.dropoff}</p>
                                                    <div className="flex justify-between items-start">
                                                        <p className="text-gray-900 font-medium">{trips[0].dropoff}</p>
                                                        <a
                                                            href={openGoogleMaps(trips[0].dropoff)}
                                                            target="_blank"
                                                            rel="noreferrer"
                                                            className="text-brand-orange hover:bg-orange-50 p-1.5 rounded-full transition-colors"
                                                        >
                                                            <MapPin className="h-5 w-5" />
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 gap-3">
                                            <button className="flex items-center justify-center gap-2 py-3 bg-gray-100 text-gray-700 rounded-lg font-bold hover:bg-gray-200 transition-colors">
                                                <Navigation className="h-5 w-5" /> Navigation
                                            </button>
                                            <button className="flex items-center justify-center gap-2 py-3 bg-brand-teal text-white rounded-lg font-bold hover:bg-teal-900 shadow-md transition-colors">
                                                <CheckCircle className="h-5 w-5" /> Complete
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="bg-white p-6 rounded-xl border border-gray-200 text-center text-gray-500">
                                    No active trips currently.
                                </div>
                            )}
                        </section>
                    </div>

                    {/* Right Column: Summary & Actions */}
                    <div className="space-y-6">
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                            <h3 className="font-bold text-gray-900 mb-4">New Requests</h3>
                            {requests.length > 0 ? (
                                <div className="space-y-4">
                                    <div className="p-4 bg-orange-50 rounded-lg border border-orange-100">
                                        <div className="flex justify-between items-center mb-2">
                                            <span className="font-bold text-gray-900">{requests[0].client}</span>
                                            <span className="text-xs bg-white px-2 py-1 rounded border border-orange-200 text-orange-700 font-bold">NEW</span>
                                        </div>
                                        <p className="text-sm text-gray-600 mb-3 line-clamp-1">To: {requests[0].dropoff}</p>
                                        <button
                                            onClick={() => navigate('/driver-schedule')}
                                            className="w-full py-2 bg-brand-orange text-white rounded-lg text-sm font-medium hover:bg-orange-700 transition-colors"
                                        >
                                            View Request
                                        </button>
                                    </div>
                                    {requests.length > 1 && (
                                        <p className="text-center text-sm text-gray-500">+{requests.length - 1} more requests</p>
                                    )}
                                </div>
                            ) : (
                                <p className="text-gray-500 text-sm">No new requests.</p>
                            )}
                        </div>

                        <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 text-white shadow-lg">
                            <h3 className="font-bold text-lg mb-2">My Trips</h3>
                            <p className="text-gray-300 text-sm mb-6">View your complete trip history and upcoming schedule.</p>
                            <button
                                onClick={() => navigate('/driver-trips')}
                                className="w-full py-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2"
                            >
                                View All Trips <ArrowRight className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DriverDashboard;
