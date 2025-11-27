import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ContentData } from '../types';
import { ArrowLeft, Calendar, User, Activity, FileText, Download, Share2, Printer } from 'lucide-react';
import { motion } from 'framer-motion';

interface ReportViewProps {
    content: ContentData;
}

const ReportView: React.FC<ReportViewProps> = ({ content }) => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    // Mock data - in a real app, fetch based on ID
    const reportData = {
        id: id,
        title: 'Monthly Health Summary',
        date: 'October 2023',
        patientName: 'Ram Prasad Sharma',
        providerName: 'Sita Nurse',
        summary: 'Patient has shown stable blood pressure levels throughout the month. Sugar levels are slightly elevated but within manageable range. Recommended to continue current medication and increase water intake.',
        vitals: [
            { label: 'Avg. Blood Pressure', value: '125/82 mmHg', status: 'Normal' },
            { label: 'Avg. Blood Sugar', value: '145 mg/dL', status: 'Elevated' },
            { label: 'Heart Rate', value: '72 bpm', status: 'Normal' },
            { label: 'Weight', value: '68 kg', status: 'Stable' },
        ],
        visits: [
            { date: 'Oct 05, 2023', type: 'Routine Checkup', notes: 'BP normal, patient compliant with meds.' },
            { date: 'Oct 12, 2023', type: 'Physiotherapy', notes: 'Knee pain reduced, exercises performed well.' },
            { date: 'Oct 19, 2023', type: 'Routine Checkup', notes: 'Sugar slightly high, dietary advice given.' },
            { date: 'Oct 26, 2023', type: 'General Visit', notes: 'Patient in good spirits, no complaints.' },
        ]
    };

    return (
        <div className="p-6 max-w-5xl mx-auto">
            <button
                onClick={() => navigate('/reports')}
                className="flex items-center gap-2 text-gray-600 hover:text-brand-teal mb-6 transition-colors"
            >
                <ArrowLeft className="w-4 h-4" />
                Back to Reports
            </button>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
            >
                {/* Header */}
                <div className="p-8 border-b border-gray-100 bg-gray-50/50">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
                        <div>
                            <div className="flex items-center gap-3 mb-2">
                                <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-bold uppercase tracking-wide">
                                    Health Report
                                </span>
                                <span className="text-gray-500 text-sm flex items-center gap-1">
                                    <Calendar className="w-4 h-4" />
                                    {reportData.date}
                                </span>
                            </div>
                            <h1 className="text-3xl font-bold text-gray-900 mb-2">{reportData.title}</h1>
                            <p className="text-gray-500">Report ID: #{reportData.id}</p>
                        </div>
                        <div className="flex gap-3">
                            <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors shadow-sm">
                                <Printer className="w-4 h-4" />
                                Print
                            </button>
                            <button className="flex items-center gap-2 px-4 py-2 bg-brand-teal text-white rounded-lg hover:bg-teal-700 transition-colors shadow-sm">
                                <Download className="w-4 h-4" />
                                Download PDF
                            </button>
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div className="p-8">
                    {/* Patient & Provider Info */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                        <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl">
                            <div className="p-3 bg-white rounded-full shadow-sm">
                                <User className="w-6 h-6 text-gray-600" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-500 font-medium">Patient</p>
                                <p className="text-lg font-bold text-gray-900">{reportData.patientName}</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl">
                            <div className="p-3 bg-white rounded-full shadow-sm">
                                <Activity className="w-6 h-6 text-brand-teal" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-500 font-medium">Care Provider</p>
                                <p className="text-lg font-bold text-gray-900">{reportData.providerName}</p>
                            </div>
                        </div>
                    </div>

                    {/* Vitals Summary */}
                    <div className="mb-10">
                        <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                            <Activity className="w-5 h-5 text-brand-teal" />
                            Vitals Overview
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                            {reportData.vitals.map((vital, index) => (
                                <div key={index} className="p-4 border border-gray-100 rounded-xl bg-white shadow-sm">
                                    <p className="text-sm text-gray-500 mb-1">{vital.label}</p>
                                    <p className="text-xl font-bold text-gray-900">{vital.value}</p>
                                    <span className={`inline-block mt-2 px-2 py-0.5 text-xs rounded-full ${vital.status === 'Normal' || vital.status === 'Stable'
                                            ? 'bg-green-100 text-green-700'
                                            : 'bg-yellow-100 text-yellow-700'
                                        }`}>
                                        {vital.status}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Executive Summary */}
                    <div className="mb-10">
                        <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                            <FileText className="w-5 h-5 text-brand-teal" />
                            Executive Summary
                        </h2>
                        <div className="bg-blue-50/50 p-6 rounded-xl border border-blue-100 text-gray-700 leading-relaxed">
                            {reportData.summary}
                        </div>
                    </div>

                    {/* Visit Logs */}
                    <div>
                        <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                            <Calendar className="w-5 h-5 text-brand-teal" />
                            Visit History
                        </h2>
                        <div className="border border-gray-200 rounded-xl overflow-hidden">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Notes</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {reportData.visits.map((visit, index) => (
                                        <tr key={index} className="hover:bg-gray-50 transition-colors">
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">{visit.date}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{visit.type}</td>
                                            <td className="px-6 py-4 text-sm text-gray-600">{visit.notes}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default ReportView;
