import React from 'react';
import { ContentData } from '../types';
import { FileText, Download, Calendar, Activity, Eye, Bot } from 'lucide-react';
import { motion } from 'framer-motion';

import { useNavigate } from 'react-router-dom';

interface ReportProps {
    content: ContentData;
}

const Report: React.FC<ReportProps> = ({ content }) => {
    const navigate = useNavigate();
    // Mock data for reports
    const reports = [
        {
            id: 1,
            title: 'Monthly Health Summary',
            date: 'October 2023',
            type: 'Health',
            status: 'Available',
            size: '1.2 MB'
        },
        {
            id: 2,
            title: 'Visit Log Report',
            date: 'October 2023',
            type: 'Visit',
            status: 'Available',
            size: '0.8 MB'
        },
        {
            id: 3,
            title: 'Blood Pressure Trends',
            date: 'September 2023',
            type: 'Health',
            status: 'Available',
            size: '2.5 MB'
        },
        {
            id: 4,
            title: 'Quarterly Care Review',
            date: 'Q3 2023',
            type: 'General',
            status: 'Available',
            size: '3.1 MB'
        }
    ];

    return (
        <div className="p-6 max-w-7xl mx-auto">
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-900">Reports & Documents</h1>
                <p className="text-gray-500 mt-1">Access and download your care reports and health summaries.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Summary Cards */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"
                >
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-blue-50 rounded-lg">
                            <FileText className="w-6 h-6 text-blue-600" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Total Reports</p>
                            <p className="text-2xl font-bold text-gray-900">12</p>
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"
                >
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-green-50 rounded-lg">
                            <Activity className="w-6 h-6 text-green-600" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Health Updates</p>
                            <p className="text-2xl font-bold text-gray-900">5</p>
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"
                >
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-purple-50 rounded-lg">
                            <Calendar className="w-6 h-6 text-purple-600" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Last Generated</p>
                            <p className="text-lg font-bold text-gray-900">Oct 31, 2023</p>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Reports List */}
            <div className="mt-8 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-6 border-b border-gray-100">
                    <h2 className="text-lg font-semibold text-gray-900">Recent Reports</h2>
                </div>
                <div className="divide-y divide-gray-100">
                    {reports.map((report, index) => (
                        <motion.div
                            key={report.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 + index * 0.1 }}
                            className="p-6 flex items-center justify-between hover:bg-gray-50 transition-colors"
                        >
                            <div className="flex items-center gap-4">
                                <div className="p-2 bg-gray-100 rounded-lg">
                                    <FileText className="w-5 h-5 text-gray-600" />
                                </div>
                                <div>
                                    <h3 className="text-sm font-medium text-gray-900">{report.title}</h3>
                                    <div className="flex items-center gap-3 mt-1">
                                        <span className="text-xs text-gray-500 flex items-center gap-1">
                                            <Calendar className="w-3 h-3" />
                                            {report.date}
                                        </span>
                                        <span className="text-xs px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full">
                                            {report.type}
                                        </span>
                                        <span className="text-xs text-gray-400">
                                            {report.size}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <button
                                    onClick={() => navigate(`/reports/${report.id}`)}
                                    className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                                >
                                    <Eye className="w-4 h-4" />
                                    View
                                </button>
                                <button className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-purple-600 hover:bg-purple-50 rounded-lg transition-colors">
                                    <Bot className="w-4 h-4" />
                                    AI Analyze
                                </button>
                                <button className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-brand-teal hover:bg-teal-50 rounded-lg transition-colors">
                                    <Download className="w-4 h-4" />
                                    Download
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Report;
