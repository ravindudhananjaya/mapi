import React, { useState } from 'react';
import { ContentData, ServiceType } from '../types';
import { MapPin, Navigation, Camera, Clipboard, CheckCircle, Clock, Filter } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ProviderScheduleProps {
    content: ContentData;
}

const ProviderSchedule: React.FC<ProviderScheduleProps> = ({ content }) => {
    const [viewMode, setViewMode] = useState<'today' | 'week' | 'month'>('today');
    const [filterType, setFilterType] = useState<'all' | 'subscription' | 'onetime'>('all');

    const schedule = [
        { id: 1, patient: 'Hari Prasad', address: 'Baneshwor-10', time: '10:00 AM', status: 'pending', type: 'subscription', date: 'Today' },
        { id: 2, patient: 'Sita Devi', address: 'Tinkune', time: '02:00 PM', status: 'completed', type: 'onetime', date: 'Today' },
        { id: 3, patient: 'Ram Kumar', address: 'Lalitpur-3', time: '09:00 AM', status: 'pending', type: 'subscription', date: 'Tomorrow' },
        { id: 4, patient: 'Krishna Gopal', address: 'Bhaktapur', time: '11:00 AM', status: 'pending', type: 'subscription', date: 'Oct 28' },
        { id: 5, patient: 'Maya Gurung', address: 'Chabahil', time: '04:00 PM', status: 'pending', type: 'onetime', date: 'Nov 01' },
    ];

    const filteredSchedule = schedule.filter(item => {
        if (filterType !== 'all' && item.type !== filterType) return false;
        if (viewMode === 'today' && item.date !== 'Today') return false;
        if (viewMode === 'week' && !['Today', 'Tomorrow', 'Oct 28'].includes(item.date)) return false;
        return true; // Month shows all
    });

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
            <div className="max-w-5xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-2xl font-bold text-gray-900">My Schedule</h1>
                    <p className="text-gray-500">Manage your upcoming visits and appointments.</p>
                </div>

                <div className="space-y-6">
                    {/* Filters & View Modes */}
                    <div className="flex flex-col sm:flex-row justify-between gap-4">
                        <div className="flex gap-2">
                            {['today', 'week', 'month'].map((mode) => (
                                <button
                                    key={mode}
                                    onClick={() => setViewMode(mode as any)}
                                    className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${viewMode === mode ? 'bg-brand-orange text-white border-brand-orange shadow-sm' : 'bg-white text-gray-600 border-gray-300 hover:bg-gray-50'}`}
                                >
                                    {content.providerDashboard.views[mode as keyof typeof content.providerDashboard.views]}
                                </button>
                            ))}
                        </div>

                        <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-md border border-gray-200 shadow-sm">
                            <Filter className="h-4 w-4 text-gray-400" />
                            <select
                                className="text-sm border-none focus:ring-0 text-gray-600 bg-transparent outline-none cursor-pointer"
                                value={filterType}
                                onChange={(e) => setFilterType(e.target.value as any)}
                            >
                                <option value="all">{content.providerDashboard.filters.all}</option>
                                <option value="subscription">{content.providerDashboard.filters.subscription}</option>
                                <option value="onetime">{content.providerDashboard.filters.oneTime}</option>
                            </select>
                        </div>
                    </div>

                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="space-y-4"
                    >
                        {filteredSchedule.map((visit) => (
                            <motion.div
                                variants={itemVariants}
                                key={visit.id}
                                className="bg-white rounded-xl shadow border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
                            >
                                <div className="p-5 border-b border-gray-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                                    <div>
                                        <div className="flex items-center gap-3">
                                            <h3 className="text-xl font-bold text-gray-900">{visit.patient}</h3>
                                            <span className={`text-xs px-2 py-0.5 rounded border ${visit.type === 'subscription' ? 'bg-purple-50 text-purple-700 border-purple-200' : 'bg-blue-50 text-blue-700 border-blue-200'}`}>
                                                {visit.type === 'subscription' ? content.providerDashboard.filters.subscription : content.providerDashboard.filters.oneTime}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-4 text-gray-500 mt-2">
                                            <div className="flex items-center gap-1">
                                                <MapPin className="h-4 w-4" />
                                                <span className="text-sm">{visit.address}</span>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <Clock className="h-4 w-4" />
                                                <span className="text-sm">{visit.date} - {visit.time}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex gap-2">
                                        <motion.button
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            className="flex items-center justify-center gap-2 px-4 py-2 border border-brand-teal text-brand-teal rounded hover:bg-teal-50 text-sm font-medium transition-colors"
                                        >
                                            <Navigation className="h-4 w-4" /> {content.providerDashboard.actions.navigate}
                                        </motion.button>
                                    </div>
                                </div>

                                {visit.status !== 'completed' && (
                                    <div className="p-5 bg-gray-50">
                                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                                            <motion.button
                                                whileHover={{ scale: 1.02 }}
                                                className="flex flex-col items-center justify-center p-3 bg-white border border-gray-200 rounded-lg hover:border-brand-orange hover:text-brand-orange transition-colors"
                                            >
                                                <Clipboard className="h-5 w-5 mb-2" />
                                                <span className="text-xs font-medium">{content.providerDashboard.actions.complete} Data</span>
                                            </motion.button>
                                            <motion.button
                                                whileHover={{ scale: 1.02 }}
                                                className="flex flex-col items-center justify-center p-3 bg-white border border-gray-200 rounded-lg hover:border-brand-orange hover:text-brand-orange transition-colors"
                                            >
                                                <Camera className="h-5 w-5 mb-2" />
                                                <span className="text-xs font-medium">Media</span>
                                            </motion.button>
                                            <motion.button
                                                whileHover={{ scale: 1.02 }}
                                                className="col-span-2 sm:col-span-2 flex items-center justify-center gap-2 bg-green-600 text-white rounded-lg font-bold shadow hover:bg-green-700 transition-colors"
                                            >
                                                <CheckCircle className="h-5 w-5" /> {content.providerDashboard.actions.complete}
                                            </motion.button>
                                        </div>
                                    </div>
                                )}
                            </motion.div>
                        ))}
                        {filteredSchedule.length === 0 && (
                            <div className="text-center py-10 text-gray-500">No visits scheduled for this period.</div>
                        )}
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default ProviderSchedule;
