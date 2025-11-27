import React, { useState } from 'react';
import { ContentData, ServiceType } from '../types';
import { MapPin, CheckCircle, Calendar, Clock, Filter, Check, X, MessageSquare, User, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

interface ProviderDashboardProps {
    content: ContentData;
}

const ProviderDashboard: React.FC<ProviderDashboardProps> = ({ content }) => {
    const navigate = useNavigate();

    // Mock Data
    const [requests, setRequests] = useState([
        { id: 101, patient: 'Ram Bahadur', address: 'Baneshwor, KTM', time: '10:00 AM', type: 'subscription' as ServiceType, date: 'Oct 25, 2024' },
        { id: 102, patient: 'Gita Devi', address: 'Koteshwor, KTM', time: '02:00 PM', type: 'onetime' as ServiceType, date: 'Oct 26, 2024' },
    ]);

    const messages = [
        { id: 1, from: 'Ram Kumar (Son)', text: 'Please check BP twice today.', time: '2 hours ago' },
        { id: 2, from: 'Sita Devi', text: 'I am running late for the appointment.', time: 'Yesterday' },
    ];

    const handleApprove = (id: number) => {
        setRequests(requests.filter(r => r.id !== id));
        alert("Booking Approved!");
    };

    const handleDecline = (id: number) => {
        setRequests(requests.filter(r => r.id !== id));
        alert("Booking Declined");
    };

    return (
        <div className="min-h-screen bg-gray-50 p-4 sm:p-8">
            <div className="max-w-5xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-2xl font-bold text-gray-900">{content.providerDashboard.title}</h1>
                    <p className="text-gray-500">Welcome back! Here's your daily overview.</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column: Requests & Messages */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Booking Requests */}
                        <section>
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                                    New Requests
                                    {requests.length > 0 && <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">{requests.length}</span>}
                                </h2>
                            </div>

                            <div className="space-y-4">
                                <AnimatePresence>
                                    {requests.length === 0 ? (
                                        <div className="text-center py-8 bg-white rounded-xl shadow-sm border border-gray-200">
                                            <div className="bg-green-100 p-3 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                                                <CheckCircle className="h-6 w-6 text-green-600" />
                                            </div>
                                            <p className="text-gray-500 text-sm">No new booking requests.</p>
                                        </div>
                                    ) : (
                                        requests.map((req) => (
                                            <motion.div
                                                layout
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, scale: 0.95 }}
                                                key={req.id}
                                                className="bg-white rounded-xl shadow-sm border border-gray-200 p-5"
                                            >
                                                <div className="flex justify-between items-start mb-4">
                                                    <div>
                                                        <h3 className="font-bold text-gray-900">{req.patient}</h3>
                                                        <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
                                                            <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {req.date}</span>
                                                            <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {req.time}</span>
                                                        </div>
                                                    </div>
                                                    <span className={`text-xs px-2 py-1 rounded border capitalize ${req.type === 'subscription' ? 'bg-purple-50 text-purple-700 border-purple-100' : 'bg-blue-50 text-blue-700 border-blue-100'}`}>
                                                        {req.type}
                                                    </span>
                                                </div>

                                                <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
                                                    <MapPin className="w-4 h-4 text-gray-400" />
                                                    {req.address}
                                                </div>

                                                <div className="flex gap-3">
                                                    <button
                                                        onClick={() => handleDecline(req.id)}
                                                        className="flex-1 py-2 border border-red-200 text-red-600 rounded-lg hover:bg-red-50 text-sm font-medium transition-colors"
                                                    >
                                                        Decline
                                                    </button>
                                                    <button
                                                        onClick={() => handleApprove(req.id)}
                                                        className="flex-1 py-2 bg-brand-teal text-white rounded-lg hover:bg-teal-700 text-sm font-medium transition-colors shadow-sm"
                                                    >
                                                        Approve
                                                    </button>
                                                </div>
                                            </motion.div>
                                        ))
                                    )}
                                </AnimatePresence>
                            </div>
                        </section>

                        {/* Recent Messages */}
                        <section>
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-lg font-bold text-gray-900">Recent Messages</h2>
                            </div>
                            <div className="bg-white rounded-xl shadow-sm border border-gray-200 divide-y divide-gray-100">
                                {messages.map((msg) => (
                                    <div key={msg.id} className="p-4 hover:bg-gray-50 transition-colors cursor-pointer flex gap-3">
                                        <div className="bg-gray-100 p-2 rounded-full h-fit">
                                            <User className="h-5 w-5 text-gray-500" />
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex justify-between items-start mb-1">
                                                <h4 className="font-medium text-gray-900 text-sm">{msg.from}</h4>
                                                <span className="text-xs text-gray-400">{msg.time}</span>
                                            </div>
                                            <p className="text-gray-600 text-xs line-clamp-1">{msg.text}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>

                    {/* Right Column: Quick Actions & Summary */}
                    <div className="space-y-6">
                        <div className="bg-gradient-to-br from-brand-teal to-teal-800 rounded-xl p-6 text-white shadow-lg">
                            <h3 className="font-bold text-lg mb-2">Today's Schedule</h3>
                            <p className="text-teal-100 text-sm mb-6">You have 2 appointments remaining today.</p>
                            <button
                                onClick={() => navigate('/provider-schedule')}
                                className="w-full py-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2"
                            >
                                View Full Schedule <ArrowRight className="w-4 h-4" />
                            </button>
                        </div>

                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                            <h3 className="font-bold text-gray-900 mb-4">Quick Actions</h3>
                            <div className="space-y-3">
                                <button className="w-full text-left px-4 py-3 rounded-lg bg-gray-50 hover:bg-gray-100 text-sm font-medium text-gray-700 transition-colors flex items-center gap-3">
                                    <MessageSquare className="w-4 h-4 text-brand-teal" />
                                    Send Message
                                </button>
                                <button className="w-full text-left px-4 py-3 rounded-lg bg-gray-50 hover:bg-gray-100 text-sm font-medium text-gray-700 transition-colors flex items-center gap-3">
                                    <User className="w-4 h-4 text-brand-teal" />
                                    Add Patient Note
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProviderDashboard;
