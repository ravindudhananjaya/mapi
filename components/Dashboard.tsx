
import React, { useState, useEffect } from 'react';
import { ContentData, CheckoutSelection, ServiceItem, User } from '../types';
import { apiClient } from '../src/api/client';
import { User as UserIcon, Calendar, Activity, Phone, MessageCircle, FileText, CheckCircle, Video, Download, Star, Bot, Plus, Sparkles, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface DashboardProps {
    content: ContentData;
    activeSelection: CheckoutSelection | null;
    user: User | null;
    onBookService: (service: ServiceItem) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ content, activeSelection, user, onBookService }) => {
    const planName = activeSelection?.type === 'plan' ? activeSelection.data.name : activeSelection?.data.title || content.dashboard.noPlan;

    const [aiModalOpen, setAiModalOpen] = useState(false);
    const [selectedVisitForAi, setSelectedVisitForAi] = useState<any>(null);
    const [bookings, setBookings] = useState<any[]>([]);

    useEffect(() => {
        const fetchBookings = async () => {
            if (user?.id) {
                try {
                    const data = await apiClient.get(`/bookings?userId=${user.id}`);
                    setBookings(data);
                } catch (error) {
                    console.error("Failed to fetch bookings:", error);
                }
            }
        };
        fetchBookings();
    }, [user]);

    const handleAiAnalysis = (visit: any) => {
        setSelectedVisitForAi(visit);
        setAiModalOpen(true);
    };

    const generateAiAnalysis = (visit: any) => {
        if (!visit) return "";

        let analysis = `Analysis for visit on ${visit.date}:\n\n`;

        if (visit.bp) {
            analysis += `• Blood Pressure (${visit.bp}): The systolic and diastolic readings appear to be within a healthy range for an elderly individual. Maintaining this level is excellent for heart health.\n`;
        }

        if (visit.sugar) {
            analysis += `• Blood Sugar (${visit.sugar} mg/dL): This reading suggests well-controlled blood glucose levels. No signs of hyperglycemia or hypoglycemia based on this single reading.\n`;
        }

        if (visit.notes) {
            analysis += `\n• Care Provider's Observation: The provider noted "${visit.notes}". Based on this, the overall condition seems stable.\n`;
        }

        analysis += `\nSummary: Overall, the health metrics from this visit are positive. Please continue with the current medication and diet plan.`;
        return analysis;
    };

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
        <div className="min-h-screen bg-gray-50 py-12 relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Header & Emergency */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4"
                >
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">
                            {content.dashboard.welcome} <span className="text-brand-teal">{user?.name || 'User'}</span>
                        </h1>
                        <p className="text-gray-600 mt-1">Manage your elderly care services and view reports.</p>
                    </div>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-red-600 text-white px-6 py-3 rounded-full shadow-lg hover:bg-red-700 animate-pulse font-bold flex items-center gap-2"
                    >
                        <Phone className="h-5 w-5" />
                        {content.dashboard.emergencyContact}: 9800000000
                    </motion.button>
                </motion.div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="grid grid-cols-1 lg:grid-cols-3 gap-8"
                >

                    {/* Left Column: Main Stats & Timeline */}
                    <div className="lg:col-span-2 space-y-8">

                        {/* Active Plan Card */}
                        <motion.div variants={itemVariants} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
                            <div className="flex justify-between items-start mb-4">
                                <div className="flex items-center gap-3">
                                    <div className="bg-brand-orange/10 p-2 rounded-lg">
                                        <Activity className="h-6 w-6 text-brand-orange" />
                                    </div>
                                    <div>
                                        <h2 className="text-lg font-semibold text-gray-900">{content.dashboard.activePlan}</h2>
                                        <p className="text-2xl font-bold text-brand-teal mt-1">{planName}</p>
                                    </div>
                                </div>
                                {activeSelection && (
                                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                        <span className="w-2 h-2 rounded-full bg-green-500 mr-2"></span>
                                        {content.dashboard.statusActive}
                                    </span>
                                )}
                            </div>
                        </motion.div>

                        {/* Health Trends Infographic */}
                        <motion.div variants={itemVariants} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
                            <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
                                <Activity className="h-5 w-5 text-blue-600" />
                                {content.dashboard.healthTrends}
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {/* BP Chart Simulation */}
                                <div>
                                    <p className="text-sm font-medium text-gray-500 mb-2">Blood Pressure (Last 5 Readings)</p>
                                    <div className="flex items-end gap-2 h-32 border-b border-gray-300 pb-1">
                                        {[120, 125, 118, 130, 120].map((val, i) => (
                                            <motion.div
                                                key={i}
                                                initial={{ height: 0 }}
                                                animate={{ height: `${(val / 150) * 100}%` }}
                                                transition={{ duration: 1, delay: i * 0.1 }}
                                                className="flex-1 bg-blue-400 hover:bg-blue-600 rounded-t transition-all relative group"
                                            >
                                                <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity">{val}</span>
                                            </motion.div>
                                        ))}
                                    </div>
                                    <div className="flex justify-between text-xs text-gray-400 mt-1">
                                        <span>Sep</span><span>Oct</span>
                                    </div>
                                </div>
                                {/* Sugar Chart Simulation */}
                                <div>
                                    <p className="text-sm font-medium text-gray-500 mb-2">Sugar Level (Last 5 Readings)</p>
                                    <div className="flex items-end gap-2 h-32 border-b border-gray-300 pb-1">
                                        {[90, 95, 92, 110, 95].map((val, i) => (
                                            <motion.div
                                                key={i}
                                                initial={{ height: 0 }}
                                                animate={{ height: `${(val / 150) * 100}%` }}
                                                transition={{ duration: 1, delay: i * 0.1 + 0.5 }}
                                                className="flex-1 bg-green-400 hover:bg-green-600 rounded-t transition-all relative group"
                                            >
                                                <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity">{val}</span>
                                            </motion.div>
                                        ))}
                                    </div>
                                    <div className="flex justify-between text-xs text-gray-400 mt-1">
                                        <span>Sep</span><span>Oct</span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Visit Timeline */}
                        <motion.div variants={itemVariants} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">{content.dashboard.visitHistory}</h3>
                            <div className="space-y-6">
                                {bookings.length === 0 ? (
                                    <p className="text-gray-500 text-center py-4">No bookings found.</p>
                                ) : (
                                    bookings.map((visit, idx) => (
                                        <motion.div
                                            key={visit.id}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.5 + (idx * 0.1) }}
                                            className="border border-gray-100 rounded-xl p-5 hover:bg-gray-50 transition-colors"
                                        >
                                            <div className="flex justify-between items-start mb-3">
                                                <div>
                                                    <p className="text-sm text-gray-500">{new Date(visit.date).toLocaleDateString()}</p>
                                                    <h4 className="font-bold text-gray-900 text-lg">{visit.service?.title || 'Service'}</h4>
                                                    <p className="text-sm text-brand-teal font-medium">Status: {visit.status}</p>
                                                </div>
                                                <div className="flex gap-2">
                                                    {/* Placeholder for vitals if we add them to DB later */}
                                                </div>
                                            </div>
                                            {visit.notes && (
                                                <div className="bg-yellow-50 p-3 rounded border border-yellow-100 mb-4">
                                                    <p className="text-sm text-gray-700 italic">
                                                        <span className="font-bold not-italic text-yellow-800">Notes:</span> {visit.notes}
                                                    </p>
                                                </div>
                                            )}
                                            <div className="flex flex-wrap gap-3">
                                                {/* Actions can be re-enabled when backend supports reports/video */}
                                            </div>
                                        </motion.div>
                                    )))}
                            </div>
                        </motion.div>
                    </div>

                    {/* Right Column: Profile & Actions */}
                    <div className="lg:col-span-1 space-y-8">

                        {/* Provider Profile */}
                        <motion.div variants={itemVariants} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">{content.dashboard.providerProfile}</h3>
                            <div className="flex flex-col items-center text-center">
                                <img src="https://i.pravatar.cc/150?img=32" alt="Sita Sharma" className="w-24 h-24 rounded-full mb-3 border-4 border-white shadow-lg" />
                                <h4 className="font-bold text-xl text-gray-900">Sita Sharma</h4>
                                <div className="flex items-center gap-1 text-yellow-500 mb-2">
                                    <Star className="h-4 w-4 fill-current" />
                                    <Star className="h-4 w-4 fill-current" />
                                    <Star className="h-4 w-4 fill-current" />
                                    <Star className="h-4 w-4 fill-current" />
                                    <Star className="h-4 w-4 fill-current" />
                                    <span className="text-gray-400 text-sm ml-1">(5.0)</span>
                                </div>
                                <p className="text-sm text-gray-500 mb-4">Certified Nurse • 5 Years Experience</p>
                                <div className="flex gap-2 w-full">
                                    <button className="flex-1 flex items-center justify-center gap-2 py-2 bg-brand-teal text-white rounded hover:bg-teal-900 transition-colors">
                                        <Phone className="h-4 w-4" /> Call
                                    </button>
                                    <button className="flex-1 flex items-center justify-center gap-2 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors">
                                        <MessageCircle className="h-4 w-4" /> Message
                                    </button>
                                </div>
                            </div>
                        </motion.div>

                        {/* Quick Book */}
                        <motion.div variants={itemVariants} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">{content.dashboard.bookExtra}</h3>
                            <div className="space-y-3">
                                {content.pricing.oneTimeServices.slice(0, 3).map((service, idx) => (
                                    <motion.button
                                        key={idx}
                                        whileHover={{ scale: 1.02, x: 5 }}
                                        onClick={() => onBookService(service)}
                                        className="w-full flex justify-between items-center p-3 rounded-lg border border-gray-200 hover:border-brand-orange hover:bg-orange-50 transition-all text-left group"
                                    >
                                        <span className="text-sm font-medium text-gray-700 group-hover:text-brand-orange">{service.title}</span>
                                        <Plus className="h-4 w-4 text-gray-400 group-hover:text-brand-orange" />
                                    </motion.button>
                                ))}
                            </div>
                        </motion.div>

                    </div>
                </motion.div>

                {/* AI Assistant FAB */}
                <motion.button
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    whileHover={{ scale: 1.1 }}
                    className="fixed bottom-8 right-8 bg-brand-teal text-white p-4 rounded-full shadow-2xl hover:bg-teal-700 transition-colors flex items-center gap-2 z-50"
                >
                    <Bot className="h-6 w-6" />
                    <span className="font-bold hidden md:inline">{content.dashboard.aiAssistant}</span>
                </motion.button>

                {/* AI Analysis Modal */}
                <AnimatePresence>
                    {aiModalOpen && selectedVisitForAi && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[100] p-4"
                        >
                            <motion.div
                                initial={{ scale: 0.9, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.9, opacity: 0 }}
                                className="bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden flex flex-col max-h-[90vh]"
                            >
                                <div className="bg-brand-teal p-6 flex justify-between items-center text-white">
                                    <div className="flex items-center gap-3">
                                        <div className="bg-white/20 p-2 rounded-lg">
                                            <Sparkles className="h-6 w-6 text-yellow-300" />
                                        </div>
                                        <h3 className="text-xl font-bold">{content.dashboard.aiAnalysisTitle}</h3>
                                    </div>
                                    <button onClick={() => setAiModalOpen(false)} className="text-white/80 hover:text-white hover:bg-white/10 p-1 rounded-full transition-colors">
                                        <X className="h-6 w-6" />
                                    </button>
                                </div>

                                <div className="p-6 overflow-y-auto">
                                    <div className="prose prose-sm max-w-none">
                                        <div className="bg-purple-50 p-4 rounded-lg border border-purple-100 mb-6">
                                            <p className="text-purple-900 whitespace-pre-line leading-relaxed font-medium">
                                                {generateAiAnalysis(selectedVisitForAi)}
                                            </p>
                                        </div>
                                        <p className="text-xs text-gray-400 italic text-center">
                                            * This analysis is generated by AI based on the reported vitals and is for informational purposes only. It is not a substitute for professional medical advice.
                                        </p>
                                    </div>
                                </div>

                                <div className="p-4 border-t border-gray-100 bg-gray-50 flex justify-end">
                                    <button
                                        onClick={() => setAiModalOpen(false)}
                                        className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 font-medium transition-colors"
                                    >
                                        {content.dashboard.close}
                                    </button>
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>

            </div>
        </div>
    );
};

export default Dashboard;
