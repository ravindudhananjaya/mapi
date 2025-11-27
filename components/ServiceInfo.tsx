import React, { useState, useMemo } from 'react';
import { ContentData, ServiceInfo, CheckoutSelection } from '../types';
import { User, Calendar, MapPin, Phone, FileText, Heart, ChevronRight, ChevronLeft, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ServiceInfoProps {
    content: ContentData;
    selection: CheckoutSelection | null;
    onSubmit: (info: ServiceInfo) => void;
}

const ServiceInfoPage: React.FC<ServiceInfoProps> = ({ content, selection, onSubmit }) => {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState<ServiceInfo>({
        patientName: '',
        age: '',
        gender: 'Male',
        address: '',
        phone: '',
        medicalConditions: '',
        emergencyContact: ''
    });

    // Determine if Medical History is needed
    const showMedicalHistory = useMemo(() => {
        if (!selection || selection.type !== 'service') return true;
        const title = selection.data.title;
        return title !== 'Single Transportation Trip' && title !== 'Companion Visit (2 hours)';
    }, [selection]);

    const steps = useMemo(() => {
        const baseSteps = [
            { id: 1, title: "Personal Details", icon: User },
            { id: 2, title: "Contact Info", icon: MapPin },
        ];
        if (showMedicalHistory) {
            baseSteps.push({ id: 3, title: "Medical History", icon: FileText });
        }
        return baseSteps;
    }, [showMedicalHistory]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleNext = () => {
        setStep(prev => prev + 1);
    };

    const handleBack = () => {
        setStep(prev => prev - 1);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">

                {/* Progress Steps */}
                <div className="mb-12">
                    <div className="flex items-center justify-between relative">
                        <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-full h-1 bg-gray-200 -z-10 rounded-full"></div>
                        <div
                            className="absolute left-0 top-1/2 transform -translate-y-1/2 h-1 bg-brand-teal -z-10 rounded-full transition-all duration-500"
                            style={{ width: `${((step - 1) / (steps.length - 1)) * 100}%` }}
                        ></div>

                        {steps.map((s) => {
                            const Icon = s.icon;
                            const isActive = s.id === step;
                            const isCompleted = s.id < step;

                            return (
                                <div key={s.id} className="flex flex-col items-center gap-2 bg-gray-50 px-2">
                                    <div
                                        className={`w-12 h-12 rounded-full flex items-center justify-center border-4 transition-all duration-300 ${isActive ? 'border-brand-teal bg-white text-brand-teal shadow-lg scale-110' : isCompleted ? 'border-brand-teal bg-brand-teal text-white' : 'border-gray-200 bg-white text-gray-400'}`}
                                    >
                                        {isCompleted ? <CheckCircle className="w-6 h-6" /> : <Icon className="w-5 h-5" />}
                                    </div>
                                    <span className={`text-xs font-bold uppercase tracking-wider ${isActive ? 'text-brand-teal' : 'text-gray-400'}`}>{s.title}</span>
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div className="text-center mb-8">
                    <motion.h1
                        key={step}
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-3xl font-extrabold text-gray-900"
                    >
                        {steps[step - 1].title}
                    </motion.h1>
                    <p className="mt-2 text-gray-600">Please fill in the details below.</p>
                </div>

                <motion.div
                    layout
                    className="bg-white shadow-2xl rounded-3xl overflow-hidden border border-gray-100"
                >
                    <form onSubmit={handleSubmit} className="p-8 sm:p-12">
                        <AnimatePresence mode="wait">
                            {step === 1 && (
                                <motion.div
                                    key="step1"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    transition={{ duration: 0.3 }}
                                    className="space-y-6"
                                >
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2">Patient Full Name</label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                                <User className="h-5 w-5 text-gray-400" />
                                            </div>
                                            <input
                                                type="text"
                                                name="patientName"
                                                required
                                                className="block w-full pl-12 pr-4 py-4 bg-gray-50 border-gray-200 rounded-xl focus:ring-brand-teal focus:border-brand-teal transition-colors"
                                                placeholder="e.g. Ram Bahadur"
                                                value={formData.patientName}
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-bold text-gray-700 mb-2">Age</label>
                                            <div className="relative">
                                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                                    <Calendar className="h-5 w-5 text-gray-400" />
                                                </div>
                                                <input
                                                    type="number"
                                                    name="age"
                                                    required
                                                    className="block w-full pl-12 pr-4 py-4 bg-gray-50 border-gray-200 rounded-xl focus:ring-brand-teal focus:border-brand-teal transition-colors"
                                                    placeholder="65"
                                                    value={formData.age}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-bold text-gray-700 mb-2">Gender</label>
                                            <select
                                                name="gender"
                                                className="block w-full px-4 py-4 bg-gray-50 border-gray-200 rounded-xl focus:ring-brand-teal focus:border-brand-teal transition-colors"
                                                value={formData.gender}
                                                onChange={handleChange}
                                            >
                                                <option>Male</option>
                                                <option>Female</option>
                                                <option>Other</option>
                                            </select>
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            {step === 2 && (
                                <motion.div
                                    key="step2"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    transition={{ duration: 0.3 }}
                                    className="space-y-6"
                                >
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2">Contact Number</label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                                <Phone className="h-5 w-5 text-gray-400" />
                                            </div>
                                            <input
                                                type="tel"
                                                name="phone"
                                                required
                                                className="block w-full pl-12 pr-4 py-4 bg-gray-50 border-gray-200 rounded-xl focus:ring-brand-teal focus:border-brand-teal transition-colors"
                                                placeholder="98XXXXXXXX"
                                                value={formData.phone}
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2">Service Address</label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                                <MapPin className="h-5 w-5 text-gray-400" />
                                            </div>
                                            <input
                                                type="text"
                                                name="address"
                                                required
                                                className="block w-full pl-12 pr-4 py-4 bg-gray-50 border-gray-200 rounded-xl focus:ring-brand-teal focus:border-brand-teal transition-colors"
                                                placeholder="Full address (e.g., Baneshwor-10, Kathmandu)"
                                                value={formData.address}
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2">Emergency Contact</label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                                <Heart className="h-5 w-5 text-red-400" />
                                            </div>
                                            <input
                                                type="text"
                                                name="emergencyContact"
                                                required
                                                className="block w-full pl-12 pr-4 py-4 bg-gray-50 border-gray-200 rounded-xl focus:ring-brand-teal focus:border-brand-teal transition-colors"
                                                placeholder="Name - Phone Number"
                                                value={formData.emergencyContact}
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            {step === 3 && (
                                <motion.div
                                    key="step3"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    transition={{ duration: 0.3 }}
                                    className="space-y-6"
                                >
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2">Medical Conditions / Special Needs</label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-4 pt-4 pointer-events-none">
                                                <FileText className="h-5 w-5 text-gray-400" />
                                            </div>
                                            <textarea
                                                name="medicalConditions"
                                                rows={6}
                                                className="block w-full pl-12 pr-4 py-4 bg-gray-50 border-gray-200 rounded-xl focus:ring-brand-teal focus:border-brand-teal transition-colors"
                                                placeholder="Please list any medical conditions, allergies, or special requirements..."
                                                value={formData.medicalConditions}
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <div className="mt-10 flex justify-between gap-4">
                            {step > 1 ? (
                                <button
                                    type="button"
                                    onClick={handleBack}
                                    className="flex items-center justify-center px-8 py-4 border border-gray-200 rounded-xl text-gray-600 font-bold hover:bg-gray-50 transition-colors"
                                >
                                    <ChevronLeft className="w-5 h-5 mr-2" /> Back
                                </button>
                            ) : (
                                <div></div> // Spacer
                            )}

                            {step < steps.length ? (
                                <button
                                    type="button"
                                    onClick={handleNext}
                                    className="flex items-center justify-center px-8 py-4 bg-brand-teal text-white rounded-xl font-bold hover:bg-teal-900 shadow-lg hover:shadow-xl transition-all"
                                >
                                    Next Step <ChevronRight className="w-5 h-5 ml-2" />
                                </button>
                            ) : (
                                <button
                                    type="submit"
                                    className="flex items-center justify-center px-8 py-4 bg-brand-orange text-white rounded-xl font-bold hover:bg-orange-600 shadow-lg hover:shadow-xl transition-all"
                                >
                                    Complete & Checkout <CheckCircle className="w-5 h-5 ml-2" />
                                </button>
                            )}
                        </div>
                    </form>
                </motion.div>
            </div>
        </div>
    );
};

export default ServiceInfoPage;
