import React, { useState } from 'react';
import { User, UserRole } from '../types';
import { Home, Settings, LogOut, Menu, X, Users, Calendar, Truck, BarChart3, User as UserIcon, Clock, FileText } from 'lucide-react';
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
                    { icon: Users, label: 'Manage Staff', path: '/admin-dashboard' },
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
                    { icon: Truck, label: 'My Trips', path: '/driver-dashboard' },
                    { icon: Calendar, label: 'Schedule', path: '/driver-dashboard' },
                    { icon: Settings, label: 'Settings', path: '/settings' },
                ];
            default:
                return [];
        }
    };

    const menuItems = user ? getMenuItems(user.role) : [];

    return (
        <div className="flex h-screen bg-gray-50">
            {/* Mobile menu button */}
            <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-lg"
            >
                {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            {/* Sidebar */}
            <aside
                className={`fixed lg:static inset-y-0 left-0 z-40 w-64 bg-white shadow-xl transform transition-transform duration-300 ease-in-out ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
                    }`}
            >
                <div className="flex flex-col h-full">
                    {/* Logo/Brand */}
                    <div className="p-6 border-b border-gray-200">
                        <div className="flex items-center gap-2 mb-2">
                            <img src="/logo.png" alt="MAPI Logo" className="h-8 w-auto" />
                            <h1 className="text-2xl font-bold text-brand-teal">Mapi Care</h1>
                        </div>
                        {user && (
                            <div className="mt-4">
                                <p className="text-sm font-medium text-gray-900">{user.name}</p>
                                <p className="text-xs text-gray-500 capitalize">{user.role}</p>
                            </div>
                        )}
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
                        {menuItems.map((item) => {
                            const Icon = item.icon;
                            const isActive = location.pathname === item.path;
                            return (
                                <Link
                                    key={item.label}
                                    to={item.path}
                                    onClick={() => setSidebarOpen(false)}
                                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${isActive
                                        ? 'bg-brand-teal text-white shadow-md'
                                        : 'text-gray-700 hover:bg-gray-100'
                                        }`}
                                >
                                    <Icon className="w-5 h-5" />
                                    <span className="font-medium">{item.label}</span>
                                </Link>
                            );
                        })}
                    </nav>

                    {/* Logout Button */}
                    <div className="p-4 border-t border-gray-200">
                        <button
                            onClick={onLogout}
                            className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-all"
                        >
                            <LogOut className="w-5 h-5" />
                            <span className="font-medium">Logout</span>
                        </button>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto">
                {children}
            </main>

            {/* Overlay for mobile */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}
        </div>
    );
};

export default DashboardLayout;
