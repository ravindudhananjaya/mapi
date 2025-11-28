import React, { useState, useEffect } from 'react';
import { ContentData, User as UserType } from '../types';
import { apiClient } from '../src/api/client';
import { User, Phone, MapPin, Calendar, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

interface ProviderPatientsProps {
    content: ContentData;
    user: UserType | null;
}

const ProviderPatients: React.FC<ProviderPatientsProps> = ({ content, user }) => {
    const [patients, setPatients] = useState<any[]>([]);

    useEffect(() => {
        const fetchPatients = async () => {
            if (!user) return;
            try {
                // Fetch all bookings for this provider to derive patients list
                const bookings = await apiClient.get(`/bookings?providerUserId=${user.id}`);

                // Extract unique patients
                const uniquePatientsMap = new Map();
                bookings.forEach((b: any) => {
                    if (b.user && !uniquePatientsMap.has(b.user.id)) {
                        uniquePatientsMap.set(b.user.id, {
                            id: b.user.id,
                            name: b.user.name,
                            age: 'N/A', // Age not in user model yet
                            gender: 'N/A', // Gender not in user model yet
                            address: b.user.address || 'No address',
                            phone: b.user.phone || 'No phone',
                            condition: 'General Care', // Placeholder
                            lastVisit: new Date(b.date).toLocaleDateString()
                        });
                    }
                });

                setPatients(Array.from(uniquePatientsMap.values()));
            } catch (error) {
                console.error("Failed to fetch provider patients:", error);
            }
        };
        fetchPatients();
    }, [user]);

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
