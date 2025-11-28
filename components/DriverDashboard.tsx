import React, { useState } from 'react';
import { ContentData, ServiceType } from '../types';
import { apiClient } from '../src/api/client';
import { MapPin, Navigation, ShoppingCart, CheckCircle, Car, Clock, Package, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

interface DriverDashboardProps {
    content: ContentData;
}

const DriverDashboard: React.FC<DriverDashboardProps> = ({ content }) => {
    const navigate = useNavigate();

    const [requests, setRequests] = useState<any[]>([]);
    const [trips, setTrips] = useState<any[]>([]);
    const [user, setUser] = useState<any>(null);

    React.useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            setUser(parsedUser);
            fetchData(parsedUser.id);
        }
    }, []);

    const fetchData = async (userId: number) => {
        try {
            // Fetch assigned bookings (APPROVED)
            const data = await apiClient.get(`/bookings?driverUserId=${userId}&status=APPROVED`);

            // Map to requests/trips
            // For now, let's treat all APPROVED as "New Requests" unless they are marked as "Started" (which we don't have yet)
            // Or maybe we treat today's bookings as "Trips" and future as "Requests"?

            const today = new Date().toDateString();

            const newRequests = data.filter((b: any) => new Date(b.date).toDateString() !== today).map((b: any) => ({
                id: b.id,
                pickup: 'Pickup Location', // Placeholder as we don't have pickup/dropoff in Booking model yet
                dropoff: b.user?.address || 'Client Address',
                type: b.service?.type === 'SUBSCRIPTION' ? 'subscription' : 'onetime',
                client: b.user?.name || 'Unknown Client',
                service: b.service?.title
            }));

            const activeTrips = data.filter((b: any) => new Date(b.date).toDateString() === today).map((b: any) => ({
                id: b.id,
                pickup: 'Pickup Location',
                dropoff: b.user?.address || 'Client Address',
                type: b.service?.type === 'SUBSCRIPTION' ? 'subscription' : 'onetime',
                status: 'pending',
                task: b.service?.title,
                time: new Date(b.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            }));

            setRequests(newRequests);
            setTrips(activeTrips);

        } catch (error) {
            console.error("Failed to fetch driver bookings:", error);
        }
    };

    const openGoogleMaps = (address: string) => {
        return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
    };

    return (
        <div className="min-h-screen bg-gray-50 p-4 sm:p-8 relative overflow-hidden">
            {/* Decorative background */}
            <div className="absolute top-0 left-0 right-0 h-64 bg-gradient-to-b from-teal-50/50 to-transparent pointer-events-none" />

            <div className="max-w-5xl mx-auto relative z-10">
                <div className="mb-8">
                    <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight mb-2">{content.driverDashboard.title}</h1>
                    <p className="text-gray-500 text-lg">Welcome back! Here's your current status.</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column: Active Trip */}
                    <div className="lg:col-span-2 space-y-8">
                        <section>
                            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                                <Car className="h-5 w-5 text-brand-teal" />
                                Current Active Trip
                            </h2>
                            {trips.length > 0 ? (
                                <div className="glass-panel rounded-2xl overflow-hidden card-hover">
                                    <div className={`p-6 text-white flex justify-between items-center ${trips[0].task === 'Grocery' ? 'bg-gradient-to-r from-orange-500 to-red-500' : 'bg-gradient-to-r from-teal-600 to-teal-500'}`}>
                                        <span className="font-bold flex items-center gap-3 text-lg">
                                            <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                                                {trips[0].task === 'Grocery' ? <ShoppingCart className="h-6 w-6" /> : <Car className="h-6 w-6" />}
                                            </div>
                                            {trips[0].task === 'Grocery' ? 'Grocery Run' : 'Transport Service'}
                                        </span>
                                        <div className="flex items-center gap-3">
                                            <span className="text-sm bg-black/20 backdrop-blur-sm px-3 py-1.5 rounded-lg flex items-center gap-1.5 font-medium border border-white/10">
                                                <Clock className="h-4 w-4" /> {trips[0].time}
                                            </span>
                                            <span className="text-sm bg-white text-teal-700 px-3 py-1.5 rounded-lg font-bold shadow-sm">Active</span>
                                        </div>
                                    </div>
                                    <div className="p-8 space-y-8">
                                        <div className="flex gap-6 relative">
                                            <div className="flex flex-col items-center pt-2">
                                                <div className="w-4 h-4 bg-gray-300 rounded-full ring-4 ring-gray-100"></div>
                                                <div className="w-0.5 h-full bg-gray-200 my-2"></div>
                                                <div className="w-4 h-4 bg-brand-teal rounded-full ring-4 ring-teal-100 shadow-sm"></div>
                                            </div>
                                            <div className="flex-1 space-y-8">
                                                <div className="group">
                                                    <p className="text-xs text-gray-400 uppercase font-bold mb-2 tracking-wider">{content.driverDashboard.labels.pickup}</p>
                                                    <div className="flex justify-between items-start p-4 bg-gray-50 rounded-xl border border-gray-100 group-hover:border-gray-200 transition-colors">
                                                        <p className="text-gray-900 font-semibold text-lg">{trips[0].pickup}</p>
                                                        <a
                                                            href={openGoogleMaps(trips[0].pickup)}
                                                            target="_blank"
                                                            rel="noreferrer"
                                                            className="text-brand-teal bg-white p-2.5 rounded-xl shadow-sm hover:shadow-md hover:scale-105 transition-all border border-gray-100"
                                                        >
                                                            <MapPin className="h-5 w-5" />
                                                        </a>
                                                    </div>
                                                </div>
                                                <div className="group">
                                                    <p className="text-xs text-gray-400 uppercase font-bold mb-2 tracking-wider">{content.driverDashboard.labels.dropoff}</p>
                                                    <div className="flex justify-between items-start p-4 bg-gray-50 rounded-xl border border-gray-100 group-hover:border-gray-200 transition-colors">
                                                        <p className="text-gray-900 font-semibold text-lg">{trips[0].dropoff}</p>
                                                        <a
                                                            href={openGoogleMaps(trips[0].dropoff)}
                                                            target="_blank"
                                                            rel="noreferrer"
                                                            className="text-brand-orange bg-white p-2.5 rounded-xl shadow-sm hover:shadow-md hover:scale-105 transition-all border border-gray-100"
                                                        >
                                                            <MapPin className="h-5 w-5" />
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-100">
                                            <button className="flex items-center justify-center gap-2 py-3.5 bg-white border border-gray-200 text-gray-700 rounded-xl font-bold hover:bg-gray-50 hover:border-gray-300 transition-all shadow-sm">
                                                <Navigation className="h-5 w-5" /> Navigation
                                            </button>
                                            <button className="flex items-center justify-center gap-2 py-3.5 bg-brand-teal text-white rounded-xl font-bold hover:bg-teal-800 shadow-lg shadow-brand-teal/20 hover:shadow-xl hover:shadow-brand-teal/30 transition-all active:scale-95">
                                                <CheckCircle className="h-5 w-5" /> Complete Trip
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="glass-panel p-12 rounded-2xl border border-dashed border-gray-300 text-center text-gray-500 flex flex-col items-center gap-4">
                                    <div className="p-4 bg-gray-50 rounded-full">
                                        <Car className="h-8 w-8 text-gray-400" />
                                    </div>
                                    <p className="font-medium">No active trips currently.</p>
                                </div>
                            )}
                        </section>
                    </div>

                    {/* Right Column: Summary & Actions */}
                    <div className="space-y-6">
                        <div className="glass-panel rounded-2xl p-6 card-hover">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="font-bold text-gray-900 text-lg">New Requests</h3>
                                <span className="bg-brand-orange/10 text-brand-orange text-xs font-bold px-2 py-1 rounded-full">{requests.length} New</span>
                            </div>
                            {requests.length > 0 ? (
                                <div className="space-y-4">
                                    <div className="p-5 bg-gradient-to-br from-orange-50 to-white rounded-xl border border-orange-100 shadow-sm relative overflow-hidden group">
                                        <div className="absolute top-0 right-0 w-16 h-16 bg-orange-100 rounded-bl-full -mr-8 -mt-8 opacity-50 group-hover:scale-110 transition-transform" />

                                        <div className="flex justify-between items-center mb-3 relative z-10">
                                            <span className="font-bold text-gray-900 flex items-center gap-2">
                                                <div className="w-2 h-2 rounded-full bg-brand-orange animate-pulse" />
                                                {requests[0].client}
                                            </span>
                                            <span className="text-[10px] bg-white px-2 py-1 rounded-full border border-orange-200 text-orange-700 font-bold shadow-sm uppercase tracking-wider">New</span>
                                        </div>
                                        <p className="text-sm text-gray-600 mb-4 line-clamp-1 font-medium flex items-center gap-2">
                                            <MapPin className="h-3 w-3 text-gray-400" />
                                            To: {requests[0].dropoff}
                                        </p>
                                        <button
                                            onClick={() => navigate('/driver-schedule')}
                                            className="w-full py-2.5 bg-brand-orange text-white rounded-lg text-sm font-bold hover:bg-orange-700 transition-all shadow-md shadow-orange-200 hover:shadow-lg active:scale-95"
                                        >
                                            View Request
                                        </button>
                                    </div>
                                    {requests.length > 1 && (
                                        <p className="text-center text-sm text-gray-500 font-medium">+{requests.length - 1} more requests</p>
                                    )}
                                </div>
                            ) : (
                                <p className="text-gray-500 text-sm text-center py-4">No new requests.</p>
                            )}
                        </div>

                        <div className="bg-gray-900 rounded-2xl p-8 text-white shadow-xl relative overflow-hidden group">
                            {/* Decorative circles */}
                            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16 blur-2xl group-hover:bg-white/10 transition-colors" />
                            <div className="absolute bottom-0 left-0 w-24 h-24 bg-brand-teal/20 rounded-full -ml-12 -mb-12 blur-xl" />

                            <div className="relative z-10">
                                <h3 className="font-bold text-xl mb-2">My Trips</h3>
                                <p className="text-gray-400 text-sm mb-8 leading-relaxed">View your complete trip history and upcoming schedule.</p>
                                <button
                                    onClick={() => navigate('/driver-trips')}
                                    className="w-full py-3 bg-white/10 hover:bg-white/20 border border-white/10 rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-2 backdrop-blur-sm group-hover:border-white/30"
                                >
                                    View All Trips <ArrowRight className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DriverDashboard;
