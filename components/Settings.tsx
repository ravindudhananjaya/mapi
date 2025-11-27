import React, { useState } from 'react';
import { ContentData, User } from '../types';
import { User as UserIcon, Mail, Phone, MapPin, Save, Bell, Shield, Globe } from 'lucide-react';

interface SettingsProps {
    content: ContentData;
    user: User | null;
}

const Settings: React.FC<SettingsProps> = ({ content, user }) => {
    const [formData, setFormData] = useState({
        name: user?.name || '',
        email: user?.email || '',
        phone: user?.phone || '',
        address: user?.address || '',
        notifications: true,
        emailAlerts: true,
        language: 'en'
    });

    const [saved, setSaved] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        const checked = (e.target as HTMLInputElement).checked;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Simulate save
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
    };

    return (
        <div className="min-h-screen bg-gray-50 p-4 lg:p-8">
            <div className="max-w-4xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
                    <p className="text-gray-600 mt-2">Manage your account settings and preferences</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Profile Information */}
                    <div className="bg-white rounded-xl shadow-md p-6">
                        <div className="flex items-center gap-3 mb-6">
                            <UserIcon className="w-6 h-6 text-brand-teal" />
                            <h2 className="text-xl font-bold text-gray-900">Profile Information</h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Full Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="block w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-brand-teal focus:border-brand-teal"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Email</label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="block w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-brand-teal focus:border-brand-teal"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Phone</label>
                                <div className="relative">
                                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        className="block w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-brand-teal focus:border-brand-teal"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Address</label>
                                <div className="relative">
                                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    <input
                                        type="text"
                                        name="address"
                                        value={formData.address}
                                        onChange={handleChange}
                                        className="block w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-brand-teal focus:border-brand-teal"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Notifications */}
                    <div className="bg-white rounded-xl shadow-md p-6">
                        <div className="flex items-center gap-3 mb-6">
                            <Bell className="w-6 h-6 text-brand-teal" />
                            <h2 className="text-xl font-bold text-gray-900">Notifications</h2>
                        </div>

                        <div className="space-y-4">
                            <label className="flex items-center justify-between p-4 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors">
                                <div>
                                    <p className="font-medium text-gray-900">Push Notifications</p>
                                    <p className="text-sm text-gray-600">Receive notifications about appointments and updates</p>
                                </div>
                                <input
                                    type="checkbox"
                                    name="notifications"
                                    checked={formData.notifications}
                                    onChange={handleChange}
                                    className="w-5 h-5 text-brand-teal focus:ring-brand-teal rounded"
                                />
                            </label>

                            <label className="flex items-center justify-between p-4 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors">
                                <div>
                                    <p className="font-medium text-gray-900">Email Alerts</p>
                                    <p className="text-sm text-gray-600">Get email updates about your services</p>
                                </div>
                                <input
                                    type="checkbox"
                                    name="emailAlerts"
                                    checked={formData.emailAlerts}
                                    onChange={handleChange}
                                    className="w-5 h-5 text-brand-teal focus:ring-brand-teal rounded"
                                />
                            </label>
                        </div>
                    </div>

                    {/* Preferences */}
                    <div className="bg-white rounded-xl shadow-md p-6">
                        <div className="flex items-center gap-3 mb-6">
                            <Globe className="w-6 h-6 text-brand-teal" />
                            <h2 className="text-xl font-bold text-gray-900">Preferences</h2>
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Language</label>
                            <select
                                name="language"
                                value={formData.language}
                                onChange={handleChange}
                                className="block w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-brand-teal focus:border-brand-teal"
                            >
                                <option value="en">English</option>
                                <option value="np">नेपाली (Nepali)</option>
                            </select>
                        </div>
                    </div>

                    {/* Security */}
                    <div className="bg-white rounded-xl shadow-md p-6">
                        <div className="flex items-center gap-3 mb-6">
                            <Shield className="w-6 h-6 text-brand-teal" />
                            <h2 className="text-xl font-bold text-gray-900">Security</h2>
                        </div>

                        <button
                            type="button"
                            className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors"
                        >
                            Change Password
                        </button>
                    </div>

                    {/* Save Button */}
                    <div className="flex items-center justify-end gap-4">
                        {saved && (
                            <span className="text-green-600 font-medium">Settings saved successfully!</span>
                        )}
                        <button
                            type="submit"
                            className="flex items-center gap-2 px-8 py-3 bg-brand-teal text-white rounded-lg font-bold hover:bg-teal-900 shadow-lg hover:shadow-xl transition-all"
                        >
                            <Save className="w-5 h-5" />
                            Save Changes
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Settings;
