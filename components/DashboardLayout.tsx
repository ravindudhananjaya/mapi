import React, { useState } from 'react';
import { User, UserRole } from '../types';
import { Home, Settings, LogOut, Menu, X, Users, Calendar, Truck, BarChart3, User as UserIcon, Clock, FileText, Car } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

interface DashboardLayoutProps {
    user: User | null;
    onLogout: () => void;
    children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ user, onLogout, children }) => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const location = useLocation();

    const getMenuItems = (role: UserRole) => {
        switch (role) {
            case 'family':
                return [
                    { icon: Home, label: 'Dashboard', path: '/dashboard' },
                    { icon: Calendar, label: 'Book Subscription', path: '/book-subscription' },
                    { icon: Clock, label: 'Book One-Time Service', path: '/book-onetime' },
                    { icon: FileText, label: 'Reports', path: '/reports' },
                    { icon: Settings, label: 'Settings', path: '/settings' },
                ];
            case 'admin':
                return [
                    { icon: BarChart3, label: 'Admin Dashboard', path: '/admin-dashboard' },
                    { icon: Users, label: 'Manage Staff', path: '/admin-staff' },
                    { icon: UserIcon, label: 'Customers', path: '/admin-customers' },
                    { icon: FileText, label: 'Reports', path: '/admin-reports' },
                    { icon: Settings, label: 'Settings', path: '/settings' },
                ];
            case 'provider':
                return [
                    { icon: Home, label: 'Dashboard', path: '/provider-dashboard' },
                    { icon: Calendar, label: 'My Schedule', path: '/provider-schedule' },
                    { icon: UserIcon, label: 'Patients', path: '/provider-patients' },
                    { icon: Settings, label: 'Settings', path: '/settings' },
                ];
            case 'driver':
                return [
                    { icon: Home, label: 'Dashboard', path: '/driver-dashboard' },
                    { icon: Car, label: 'My Trips', path: '/driver-trips' },
                    { icon: Calendar, label: 'Schedule', path: '/driver-schedule' },
                    { icon: Settings, label: 'Settings', path: '/settings' },
                ];
            default:
                return [];
        }
    };

    const menuItems = user ? getMenuItems(user.role) : [];

    return (
        <div className="flex h-screen bg-gray-50 overflow-hidden">
            {/* Mobile Header */}
            <div className="lg:hidden fixed top-0 left-0 right-0 z-30 bg-white border-b border-gray-100 px-4 py-3 flex items-center justify-between shadow-sm">
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                        className="p-2 -ml-2 text-gray-600 hover:bg-gray-50 rounded-lg"
                    >
                        {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                    <span className="font-bold text-lg text-gray-900">MAPI<span className="text-brand-teal">CARE</span></span>
                </div>
                {user && (
                    <div className="h-8 w-8 rounded-full bg-brand-teal/10 flex items-center justify-center text-brand-teal font-bold text-sm">
                        {user.name.charAt(0)}
                    </div>
                )}
            </div>

            {/* Sidebar */}
            <aside
                className={`fixed lg:static inset-y-0 left-0 z-40 w-72 bg-white border-r border-gray-100 shadow-xl lg:shadow-none transform transition-transform duration-300 ease-in-out ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
                    }`}
            >
                <div className="flex flex-col h-full">
                    {/* Logo/Brand */}
                    <div className="p-8">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="bg-brand-teal/10 p-2 rounded-xl">
                                <img src="/logo.png" alt="MAPI Logo" className="h-8 w-auto" />
                            </div>
                            <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">MAPI<span className="text-brand-teal">CARE</span></h1>
                        </div>
                        {user && (
                            <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 flex items-center gap-3">
                                <div className="h-10 w-10 rounded-full bg-brand-teal/10 flex items-center justify-center text-brand-teal font-bold">
                                    {user.name.charAt(0)}
                                </div>
                                <div className="overflow-hidden">
                                    <p className="text-sm font-bold text-gray-900 truncate">{user.name}</p>
                                    <p className="text-xs text-gray-500 capitalize truncate">{user.role}</p>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 px-4 space-y-1 overflow-y-auto custom-scrollbar">
                        {menuItems.map((item) => {
                            const Icon = item.icon;
                            const isActive = location.pathname === item.path;
                            return (
                                <Link
                                    key={item.label}
                                    to={item.path}
                                    onClick={() => setSidebarOpen(false)}
                                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${isActive
                                        ? 'bg-brand-teal text-white shadow-md shadow-brand-teal/20'
                                        : 'text-gray-600 hover:bg-gray-50 hover:text-brand-teal'
                                        }`}
                                >
                                    <Icon className={`w-5 h-5 transition-colors ${isActive ? 'text-white' : 'text-gray-400 group-hover:text-brand-teal'}`} />
                                    <span className="font-medium">{item.label}</span>
                                </Link>
                            );
                        })}
                    </nav>

                    {/* Logout Button */}
                    <div className="p-4 border-t border-gray-100">
                        <button
                            onClick={onLogout}
                            className="w-full flex items-center gap-3 px-4 py-3 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all group"
                        >
                            <LogOut className="w-5 h-5 transition-colors group-hover:text-red-600" />
                            <span className="font-medium">Logout</span>
                        </button>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto bg-gray-50 relative">
                {/* Top decorative gradient */}
                <div className="absolute top-0 left-0 right-0 h-64 bg-gradient-to-b from-teal-50/50 to-transparent pointer-events-none" />

                <div className="relative z-10 p-4 pt-20 lg:p-8 lg:pt-8">
                    {children}
                </div>
            </main>

            {/* Overlay for mobile */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-gray-900/20 backdrop-blur-sm z-30 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}
        </div>
    );
};

export default DashboardLayout;
