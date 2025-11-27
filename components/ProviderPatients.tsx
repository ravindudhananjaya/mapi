import React from 'react';
import { ContentData } from '../types';
import { User, Phone, MapPin, Calendar, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

interface ProviderPatientsProps {
    content: ContentData;
}

const ProviderPatients: React.FC<ProviderPatientsProps> = ({ content }) => {
    // Mock Data for Patients
    const patients = [
        { id: 1, name: 'Hari Prasad', age: 65, gender: 'Male', address: 'Baneshwor-10', phone: '9841234567', condition: 'Hypertension', lastVisit: 'Oct 25, 2024' },
        { id: 2, name: 'Sita Devi', age: 58, gender: 'Female', address: 'Tinkune', phone: '9841987654', condition: 'Diabetes', lastVisit: 'Oct 20, 2024' },
        { id: 3, name: 'Ram Kumar', age: 72, gender: 'Male', address: 'Lalitpur-3', phone: '9851012345', condition: 'Post-Surgery Care', lastVisit: 'Oct 22, 2024' },
        { id: 4, name: 'Krishna Gopal', age: 60, gender: 'Male', address: 'Bhaktapur', phone: '9801234567', condition: 'Arthritis', lastVisit: 'Oct 15, 2024' },
        { id: 5, name: 'Maya Gurung', age: 55, gender: 'Female', address: 'Chabahil', phone: '9812345678', condition: 'General Checkup', lastVisit: 'Oct 26, 2024' },
    ];

    return (
        <div className="min-h-screen bg-gray-50 p-4 sm:p-8">
            <div className="max-w-5xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-2xl font-bold text-gray-900">My Patients</h1>
                    <p className="text-gray-500">View and manage your patient list.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {patients.map((patient, index) => (
                        <motion.div
                            key={patient.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer group"
                        >
                            <div className="flex justify-between items-start">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-teal-50 rounded-full flex items-center justify-center text-brand-teal">
                                        <User className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-gray-900 group-hover:text-brand-teal transition-colors">{patient.name}</h3>
                                        <p className="text-sm text-gray-500">{patient.gender}, {patient.age} years</p>
                                    </div>
                                </div>
                                <button className="text-gray-400 group-hover:text-brand-teal transition-colors">
                                    <ChevronRight className="w-5 h-5" />
                                </button>
                            </div>

                            <div className="mt-6 space-y-3">
                                <div className="flex items-center gap-3 text-sm text-gray-600">
                                    <MapPin className="w-4 h-4 text-gray-400" />
                                    {patient.address}
                                </div>
                                <div className="flex items-center gap-3 text-sm text-gray-600">
                                    <Phone className="w-4 h-4 text-gray-400" />
                                    {patient.phone}
                                </div>
                                <div className="flex items-center gap-3 text-sm text-gray-600">
                                    <Calendar className="w-4 h-4 text-gray-400" />
                                    Last Visit: {patient.lastVisit}
                                </div>
                            </div>

                            <div className="mt-6 pt-4 border-t border-gray-100 flex justify-between items-center">
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                    {patient.condition}
                                </span>
                                <span className="text-xs font-medium text-brand-teal hover:underline">
                                    View History
                                </span>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProviderPatients;
