import React, { useState, useEffect } from 'react';
import { ContentData } from '../types';
import { apiClient } from '../src/api/client';
import { Users, DollarSign, Activity, Calendar, ClipboardList, Briefcase, RefreshCw, UserPlus, CreditCard, ChevronRight, CheckCircle, Truck, Stethoscope, FileText, User, Mail, PieChart, BarChart, Server, TrendingUp, Lightbulb } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface AdminDashboardProps {
  content: ContentData;
  initialTab?: 'overview' | 'staff' | 'assignments' | 'payments' | 'renewals' | 'customers' | 'reports' | 'transportation' | 'recommendations';
}

type Tab = 'overview' | 'staff' | 'assignments' | 'payments' | 'renewals' | 'customers' | 'reports' | 'transportation' | 'recommendations';

const AdminDashboard: React.FC<AdminDashboardProps> = ({ content, initialTab = 'overview' }) => {
  const [activeTab, setActiveTab] = useState<Tab>(initialTab);

  React.useEffect(() => {
    setActiveTab(initialTab);
  }, [initialTab]);

  const [showAddStaffModal, setShowAddStaffModal] = useState(false);
  const [assigningId, setAssigningId] = useState<number | null>(null);
  const [assigningType, setAssigningType] = useState<'provider' | 'driver' | null>(null);
  const [bookings, setBookings] = useState<any[]>([]);
  const [providers, setProviders] = useState<any[]>([]);
  const [drivers, setDrivers] = useState<any[]>([]);
  const [customers, setCustomers] = useState<any[]>([]);
  const [reports, setReports] = useState<any[]>([]);
  const [analytics, setAnalytics] = useState<any>(null);
  const [stats, setStats] = useState({
    totalUsers: 0,
    monthlyRevenue: 0,
    activeProviders: 0,
    recentBookings: 0
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [bookingsData, providersData, driversData, customersData, analyticsData, reportsData] = await Promise.all([
          apiClient.get('/bookings'),
          apiClient.get('/auth/users?role=PROVIDER'),
          apiClient.get('/auth/users?role=DRIVER'),
          apiClient.get('/auth/users?role=FAMILY'),
          apiClient.get('/analytics'),
          apiClient.get('/reports')
        ]);

        const safeBookings = Array.isArray(bookingsData) ? bookingsData : [];
        const safeProviders = Array.isArray(providersData) ? providersData : [];
        const safeDrivers = Array.isArray(driversData) ? driversData : [];
        const safeCustomers = Array.isArray(customersData) ? customersData : [];
        const safeReports = Array.isArray(reportsData) ? reportsData : [];

        setBookings(safeBookings);
        setProviders(safeProviders);
        setDrivers(safeDrivers);
        setCustomers(safeCustomers);
        setReports(safeReports);
        setAnalytics(analyticsData);

        // Calculate Stats (or use analyticsData if available)
        setStats({
          totalUsers: analyticsData?.totalBookings || safeCustomers.length || 0, // Using totalBookings as proxy or customer count
          monthlyRevenue: analyticsData?.totalRevenue || 0,
          activeProviders: safeProviders.length,
          recentBookings: safeBookings.length
        });

      } catch (error) {
        console.error("Failed to fetch admin data:", error);
      }
    };
    fetchData();
  }, []);

  // Derived Data
  const transportationRequests = bookings.filter(b => b.service?.title?.toLowerCase().includes('transport')).map(b => ({
    id: b.id,
    user: b.user?.name || 'Unknown',
    destination: 'Hospital (Derived)', // Placeholder
    date: new Date(b.date).toLocaleDateString(),
    time: new Date(b.date).toLocaleTimeString(),
    status: b.status,
    assignedTo: b.provider?.user?.name || null
  }));

  const renewals = bookings.filter(b => b.service?.type === 'SUBSCRIPTION').map(b => ({
    id: b.id,
    user: b.user?.name || 'Unknown',
    plan: b.service?.title || 'Plan',
    expiryDate: new Date(new Date(b.date).getTime() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString(), // Approx 30 days
    daysLeft: Math.floor((new Date(new Date(b.date).getTime() + 30 * 24 * 60 * 60 * 1000).getTime() - Date.now()) / (1000 * 60 * 60 * 24))
  }));

  // Mock Data
  const [staff, setStaff] = useState([
    { id: 1, name: 'Sita Sharma', role: 'Care Provider', contact: '9841234567', active: true },
    { id: 2, name: 'Ram Bahadur', role: 'Driver', contact: '9851012345', active: true },
    { id: 3, name: 'Gita Koirala', role: 'Care Provider', contact: '9803214567', active: true },
    { id: 4, name: 'Hari Krishna', role: 'Driver', contact: '9867890123', active: false },
    { id: 5, name: 'Sunita Gurung', role: 'Care Provider', contact: '9812345678', active: true },
    { id: 6, name: 'Ramesh Thapa', role: 'Driver', contact: '9845678901', active: true },
  ]);

  const [subscriptions, setSubscriptions] = useState([
    { id: 101, user: 'Hari Prasad', plan: 'Premium Care', assignedTo: null as string | null, date: 'Oct 25, 2024' },
    { id: 102, user: 'Maya Devi', plan: 'Standard Care', assignedTo: 'Sita Sharma', date: 'Oct 20, 2024' },
    { id: 103, user: 'Anita Shrestha', plan: 'Premium Care', assignedTo: null as string | null, date: 'Oct 28, 2024' },
    { id: 104, user: 'Rajendra Mahato', plan: 'Basic Care', assignedTo: 'Gita Koirala', date: 'Oct 29, 2024' },
  ]);

  // Derived Orders (Grocery/One-time)
  const orders = bookings.filter(b => b.service?.type === 'ONETIME' || b.service?.title?.toLowerCase().includes('grocery')).map(b => ({
    id: b.id,
    user: b.user?.name || 'Unknown',
    service: b.service?.title || 'Service',
    date: new Date(b.date).toLocaleDateString(),
    assignedTo: b.driver?.user?.name || null,
    status: b.status,
    driverId: b.driverId
  }));


  // Derived Payments from Bookings (Mock logic for now if not fully implemented in backend)
  const payments = bookings.filter(b => b.status === 'APPROVED' || b.status === 'COMPLETED').map(b => ({
    id: `TXN-${b.id}`,
    user: b.user?.name || 'Unknown',
    amount: b.service?.price || 'NPR 0',
    date: new Date(b.date).toLocaleDateString(),
    method: 'Online', // Placeholder
    status: 'Success'
  }));

  const handleAddStaff = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const name = (form.elements.namedItem('name') as HTMLInputElement).value;
    const email = (form.elements.namedItem('email') as HTMLInputElement).value;
    const password = (form.elements.namedItem('password') as HTMLInputElement).value;
    const role = (form.elements.namedItem('role') as HTMLSelectElement).value;
    const contact = (form.elements.namedItem('contact') as HTMLInputElement).value;

    try {
      await apiClient.post('/auth/register', {
        name,
        email,
        password,
        role: role.toUpperCase(), // Ensure role matches backend enum (PROVIDER/DRIVER)
        phone: contact
      });

      alert(`${role} created successfully!`);
      setShowAddStaffModal(false);

      // Refresh data
      const [providersData, driversData] = await Promise.all([
        apiClient.get('/auth/users?role=PROVIDER'),
        apiClient.get('/auth/users?role=DRIVER')
      ]);
      setProviders(Array.isArray(providersData) ? providersData : []);
      setDrivers(Array.isArray(driversData) ? driversData : []);

      // Update local staff list for display
      const newStaff = {
        id: Date.now(),
        name,
        role,
        contact,
        active: true
      };
      setStaff([...staff, newStaff]);

    } catch (error: any) {
      console.error("Failed to create staff:", error);
      alert(error.message || "Failed to create staff member");
    }
  };

  // ... (rest of the component)

  <AnimatePresence>
    {showAddStaffModal && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 backdrop-blur-sm"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-white rounded-xl p-6 w-full max-w-md shadow-2xl"
        >
          <h3 className="text-lg font-bold mb-4">{content.adminDashboard.staff.addBtn}</h3>
          <form onSubmit={handleAddStaff} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{content.adminDashboard.staff.name}</label>
              <input name="name" required className="w-full border border-gray-300 rounded-lg p-2 focus:ring-brand-teal focus:border-brand-teal transition-all" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input name="email" type="email" required className="w-full border border-gray-300 rounded-lg p-2 focus:ring-brand-teal focus:border-brand-teal transition-all" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input name="password" type="password" required className="w-full border border-gray-300 rounded-lg p-2 focus:ring-brand-teal focus:border-brand-teal transition-all" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{content.adminDashboard.staff.role}</label>
              <select name="role" className="w-full border border-gray-300 rounded-lg p-2 focus:ring-brand-teal focus:border-brand-teal transition-all">
                <option value="PROVIDER">Care Provider</option>
                <option value="DRIVER">Driver</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{content.adminDashboard.staff.contact}</label>
              <input name="contact" required className="w-full border border-gray-300 rounded-lg p-2 focus:ring-brand-teal focus:border-brand-teal transition-all" />
            </div>
            <div className="flex gap-3 mt-6">
              <button type="button" onClick={() => setShowAddStaffModal(false)} className="flex-1 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">Cancel</button>
              <button type="submit" className="flex-1 py-2 bg-brand-teal text-white rounded-lg hover:bg-teal-800 transition-colors">{content.adminDashboard.staff.save}</button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>

  const handleAssign = async (id: number, type: 'provider' | 'driver', staffId: string) => {
    if (type === 'provider') {
      try {
        // Update booking with providerId
        await apiClient.patch(`/bookings/${id}`, { providerId: staffId, status: 'APPROVED' });

        // Update local state
        setBookings(bookings.map(b => b.id === id ? {
          ...b,
          status: 'APPROVED',
          providerId: Number(staffId),
          provider: { user: { name: providers.find(p => p.providerProfile?.id === Number(staffId))?.name } }
        } : b));

      } catch (error) {
        console.error("Failed to assign provider:", error);
      }
    } else {
      try {
        // Update booking with driverId
        await apiClient.patch(`/bookings/${id}`, { driverId: staffId, status: 'APPROVED' });

        // Update local state
        setBookings(bookings.map(b => b.id === id ? {
          ...b,
          status: 'APPROVED',
          driverId: Number(staffId),
          driver: { user: { name: drivers.find(d => d.driverProfile?.id === Number(staffId))?.name } }
        } : b));
      } catch (error) {
        console.error("Failed to assign driver:", error);
      }
    }
    setAssigningId(null);
    setAssigningType(null);
  };

  const tabVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, x: -20, transition: { duration: 0.2 } }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <motion.div variants={tabVariants} initial="hidden" animate="visible" exit="exit">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              {[
                { icon: Users, color: 'blue', label: content.adminDashboard.overview.totalUsers, value: stats.totalUsers.toString() },
                { icon: DollarSign, color: 'green', label: content.adminDashboard.overview.monthlyRevenue, value: `NPR ${(stats.monthlyRevenue / 1000).toFixed(1)}K` },
                { icon: Activity, color: 'orange', label: content.adminDashboard.overview.activeProviders, value: stats.activeProviders.toString() },
                { icon: Calendar, color: 'purple', label: content.adminDashboard.overview.recentBookings, value: stats.recentBookings.toString() }
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="glass-panel p-6 rounded-2xl flex items-center gap-4 card-hover"
                >
                  <div className={`p-4 rounded-xl bg-${item.color}-50 text-${item.color}-600`}>
                    <item.icon className="h-7 w-7" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">{item.label}</p>
                    <p className="text-3xl font-bold text-gray-900 tracking-tight">{item.value}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Analytics Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              {/* Revenue Breakdown */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white p-6 rounded-xl shadow-sm border border-gray-200"
              >
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-bold text-gray-900 flex items-center gap-2">
                    <PieChart className="h-5 w-5 text-brand-teal" />
                    Revenue Distribution
                  </h3>
                </div>
                <div className="space-y-4">
                  {analytics?.revenueByPlan?.map((item: any, idx: number) => (
                    <div key={idx}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-600">{item.name}</span>
                        <span className="font-medium text-gray-900">{item.amount}</span>
                      </div>
                      <div className="w-full bg-gray-100 rounded-full h-2">
                        <div className={`h-2 rounded-full ${item.color}`} style={{ width: `${item.value}%` }}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Service Usage */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white p-6 rounded-xl shadow-sm border border-gray-200"
              >
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-bold text-gray-900 flex items-center gap-2">
                    <BarChart className="h-5 w-5 text-brand-orange" />
                    Top Services
                  </h3>
                </div>
                <div className="space-y-4">
                  {analytics?.serviceUsage?.map((item: any, idx: number) => (
                    <div key={idx}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-600">{item.name}</span>
                        <span className="font-medium text-gray-900">{item.value}%</span>
                      </div>
                      <div className="w-full bg-gray-100 rounded-full h-2">
                        <div className={`h-2 rounded-full ${item.color}`} style={{ width: `${item.value}%` }}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* System Health */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-white p-6 rounded-xl shadow-sm border border-gray-200"
              >
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-bold text-gray-900 flex items-center gap-2">
                    <Activity className="h-5 w-5 text-purple-600" />
                    System Health
                  </h3>
                  <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full">Operational</span>
                </div>
                <div className="space-y-6">
                  {analytics?.systemHealth?.map((item: any, idx: number) => (
                    <div key={idx} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-gray-50 rounded-lg">
                          <Server className="h-4 w-4 text-gray-500" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">{item.name}</p>
                          <p className={`text-xs ${item.color}`}>{item.status}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="text-lg font-bold text-gray-900">{item.value}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* AI Recommendations Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="glass-panel p-8 rounded-2xl mb-8 border-l-4 border-l-brand-gold"
            >
              <div className="flex items-center gap-4 mb-8">
                <div className="p-3 bg-brand-gold/10 rounded-xl">
                  <Lightbulb className="h-8 w-8 text-brand-gold" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">AI Recommendations</h3>
                  <p className="text-gray-500">Actionable insights based on system analysis</p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {analytics?.recommendations?.map((rec: any, idx: number) => (
                  <div key={idx} className="p-6 border border-gray-100 rounded-xl hover:shadow-lg transition-all bg-white group hover:-translate-y-1 duration-300">
                    <div className="flex justify-between items-start mb-4">
                      <div className={`p-3 rounded-xl ${rec.bg} group-hover:scale-110 transition-transform`}>
                        {/* Icon handling needs to be dynamic or mapped */}
                        <TrendingUp className={`h-6 w-6 ${rec.color}`} />
                      </div>
                      <span className={`text-xs font-bold px-3 py-1 rounded-full ${rec.impact === 'High' ? 'bg-red-50 text-red-600 border border-red-100' :
                        rec.impact === 'Medium' ? 'bg-orange-50 text-orange-600 border border-orange-100' :
                          'bg-blue-50 text-blue-600 border border-blue-100'
                        }`}>
                        {rec.impact} Impact
                      </span>
                    </div>
                    <p className="text-gray-800 font-medium text-base mb-4 leading-relaxed">{rec.message}</p>
                    <button className="text-sm font-bold text-brand-teal hover:text-teal-800 flex items-center gap-1 group-hover:gap-2 transition-all">
                      Take Action <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-white p-6 rounded-xl shadow-sm border border-gray-200"
              >
                <h3 className="font-bold text-gray-900 mb-4">{content.adminDashboard.assignments.subscriptionTitle}</h3>
                <ul className="space-y-3">
                  {subscriptions.filter(s => !s.assignedTo).slice(0, 3).map(sub => (
                    <li key={sub.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-900">{sub.user}</p>
                        <p className="text-sm text-gray-500">{sub.plan}</p>
                      </div>
                      <button onClick={() => setActiveTab('assignments')} className="text-sm text-brand-teal font-medium hover:underline">
                        {content.adminDashboard.assignments.assignProvider}
                      </button>
                    </li>
                  ))}
                  {subscriptions.filter(s => !s.assignedTo).length === 0 && <p className="text-gray-400 italic">No pending assignments</p>}
                </ul>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
                className="bg-white p-6 rounded-xl shadow-sm border border-gray-200"
              >
                <h3 className="font-bold text-gray-900 mb-4">{content.adminDashboard.payments.historyTitle}</h3>
                <ul className="space-y-3">
                  {payments.slice(0, 3).map(pay => (
                    <li key={pay.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-900">{pay.user}</p>
                        <p className="text-xs text-gray-500">{pay.date}</p>
                      </div>
                      <span className="font-bold text-green-600">{pay.amount}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </motion.div>
        );

      case 'staff':
        return (
          <motion.div variants={tabVariants} initial="hidden" animate="visible" exit="exit" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold text-gray-900">{content.adminDashboard.staff.title}</h2>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowAddStaffModal(true)}
                className="flex items-center gap-2 bg-brand-teal text-white px-4 py-2 rounded-lg hover:bg-teal-800 transition-colors"
              >
                <UserPlus className="h-4 w-4" /> {content.adminDashboard.staff.addBtn}
              </motion.button>
            </div>

            <div className="glass-panel rounded-2xl overflow-hidden">
              <table className="w-full text-left">
                <thead className="bg-gray-50/50 text-gray-500 text-xs uppercase border-b border-gray-100">
                  <tr>
                    <th className="px-6 py-4 font-semibold">{content.adminDashboard.staff.name}</th>
                    <th className="px-6 py-4 font-semibold">{content.adminDashboard.staff.role}</th>
                    <th className="px-6 py-4 font-semibold">{content.adminDashboard.staff.contact}</th>
                    <th className="px-6 py-4 font-semibold">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {staff.map((member) => (
                    <tr key={member.id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="px-6 py-4 font-medium text-gray-900">{member.name}</td>
                      <td className="px-6 py-4 text-gray-600 flex items-center gap-2">
                        {member.role === 'Care Provider' ? <Stethoscope className="h-4 w-4 text-brand-teal" /> : <Truck className="h-4 w-4 text-brand-orange" />}
                        {member.role}
                      </td>
                      <td className="px-6 py-4 text-gray-600">{member.contact}</td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${member.active ? 'bg-green-50 text-green-700 border border-green-100' : 'bg-red-50 text-red-700 border border-red-100'} `}>
                          {member.active ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <AnimatePresence>
              {showAddStaffModal && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 backdrop-blur-sm"
                >
                  <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    className="bg-white rounded-xl p-6 w-full max-w-md shadow-2xl"
                  >
                    <h3 className="text-lg font-bold mb-4">{content.adminDashboard.staff.addBtn}</h3>
                    <form onSubmit={handleAddStaff} className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">{content.adminDashboard.staff.name}</label>
                        <input name="name" required className="w-full border border-gray-300 rounded-lg p-2 focus:ring-brand-teal focus:border-brand-teal transition-all" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <input name="email" type="email" required className="w-full border border-gray-300 rounded-lg p-2 focus:ring-brand-teal focus:border-brand-teal transition-all" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                        <input name="password" type="password" required className="w-full border border-gray-300 rounded-lg p-2 focus:ring-brand-teal focus:border-brand-teal transition-all" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">{content.adminDashboard.staff.role}</label>
                        <select name="role" className="w-full border border-gray-300 rounded-lg p-2 focus:ring-brand-teal focus:border-brand-teal transition-all">
                          <option value="PROVIDER">Care Provider</option>
                          <option value="DRIVER">Driver</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">{content.adminDashboard.staff.contact}</label>
                        <input name="contact" required className="w-full border border-gray-300 rounded-lg p-2 focus:ring-brand-teal focus:border-brand-teal transition-all" />
                      </div>
                      <div className="flex gap-3 mt-6">
                        <button type="button" onClick={() => setShowAddStaffModal(false)} className="flex-1 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">Cancel</button>
                        <button type="submit" className="flex-1 py-2 bg-brand-teal text-white rounded-lg hover:bg-teal-800 transition-colors">{content.adminDashboard.staff.save}</button>
                      </div>
                    </form>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );

      case 'customers':
        return (
          <motion.div variants={tabVariants} initial="hidden" animate="visible" exit="exit" className="space-y-6">
            <h2 className="text-xl font-bold text-gray-900">Customer Management</h2>
            <div className="glass-panel rounded-2xl overflow-hidden">
              <table className="w-full text-left">
                <thead className="bg-gray-50/50 text-gray-500 text-xs uppercase border-b border-gray-100">
                  <tr>
                    <th className="px-6 py-4 font-semibold">Name</th>
                    <th className="px-6 py-4 font-semibold">Email</th>
                    <th className="px-6 py-4 font-semibold">Current Plan</th>
                    <th className="px-6 py-4 font-semibold">Joined Date</th>
                    <th className="px-6 py-4 font-semibold">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {customers.map((customer: any) => {
                    const latestBooking = customer.bookings?.[0];
                    const plan = latestBooking?.service?.title || 'None';
                    const status = latestBooking ? 'Active' : 'Inactive';
                    const joinDate = customer.createdAt ? new Date(customer.createdAt).toLocaleDateString() : 'N/A';

                    return (
                      <tr key={customer.id} className="hover:bg-gray-50/50 transition-colors">
                        <td className="px-6 py-4 font-medium text-gray-900 flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-brand-teal/10 flex items-center justify-center text-brand-teal">
                            <User className="h-4 w-4" />
                          </div>
                          {customer.name}
                        </td>
                        <td className="px-6 py-4 text-gray-600">{customer.email}</td>
                        <td className="px-6 py-4 text-gray-600">
                          <span className="bg-blue-50 text-blue-700 border border-blue-100 px-2 py-1 rounded text-xs font-medium">{plan}</span>
                        </td>
                        <td className="px-6 py-4 text-gray-600">{joinDate}</td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-bold ${status === 'Active' ? 'bg-green-50 text-green-700 border border-green-100' : 'bg-gray-100 text-gray-600'} `}>
                            {status}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </motion.div>
        );

      case 'reports':
        return (
          <motion.div variants={tabVariants} initial="hidden" animate="visible" exit="exit" className="space-y-6">
            <h2 className="text-xl font-bold text-gray-900">System Reports</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {reports.map((report) => (
                <motion.div
                  key={report.id}
                  whileHover={{ y: -5 }}
                  className="glass-panel p-6 rounded-2xl card-hover"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="p-3 bg-brand-teal/10 rounded-xl text-brand-teal">
                      <FileText className="h-6 w-6" />
                    </div>
                    <span className={`text-xs px-3 py-1 rounded-full font-bold ${report.status === 'Ready' ? 'bg-green-50 text-green-700 border border-green-100' : 'bg-yellow-50 text-yellow-700 border border-yellow-100'} `}>
                      {report.status}
                    </span>
                  </div>
                  <h3 className="font-bold text-gray-900 mb-1 text-lg">{report.title}</h3>
                  <p className="text-sm text-gray-500 mb-6">{report.type} • {report.date}</p>
                  <button className="w-full py-2.5 border border-gray-200 text-gray-600 rounded-xl hover:bg-gray-50 hover:text-gray-900 transition-colors text-sm font-bold">
                    Download PDF
                  </button>
                </motion.div>
              ))}
            </div>
          </motion.div>
        );

      case 'assignments':
        return (
          <motion.div variants={tabVariants} initial="hidden" animate="visible" exit="exit" className="space-y-8">
            {/* Subscriptions */}
            <div className="glass-panel p-6 rounded-2xl">
              <h2 className="text-xl font-bold text-gray-900 mb-6">{content.adminDashboard.assignments.subscriptionTitle}</h2>
              <div className="space-y-4">
                {bookings.map(sub => (
                  <motion.div
                    layout
                    key={sub.id}
                    className="flex flex-col md:flex-row justify-between items-center p-4 border border-gray-100 rounded-xl hover:bg-gray-50/50 transition-colors bg-white"
                  >
                    <div className="mb-2 md:mb-0">
                      <p className="font-bold text-gray-900">{sub.user?.name || 'Unknown User'}</p>
                      <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                        <span className="bg-purple-50 text-purple-700 border border-purple-100 px-2 py-0.5 rounded text-xs font-medium">{sub.service?.title || 'Service'}</span>
                        <span>{new Date(sub.date).toLocaleDateString()}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 w-full md:w-auto">
                      {sub.status === 'APPROVED' ? (
                        <span className="flex items-center gap-2 text-green-700 font-medium px-4 py-2 bg-green-50 border border-green-100 rounded-xl w-full md:w-auto justify-center">
                          <CheckCircle className="h-4 w-4" /> Assigned
                        </span>
                      ) : (
                        assigningId === sub.id ? (
                          <select
                            autoFocus
                            className="border border-brand-teal rounded-xl p-2 text-sm w-full focus:ring-2 focus:ring-brand-teal focus:border-transparent outline-none"
                            onChange={(e) => {
                              handleAssign(sub.id, 'provider', e.target.value);
                            }}
                            defaultValue=""
                          >
                            <option value="" disabled>Select Provider</option>
                            {providers.map(p => (
                              <option key={p.id} value={p.providerProfile?.id}>{p.name}</option>
                            ))}
                          </select>
                        ) : (
                          <button
                            onClick={() => { setAssigningId(sub.id); setAssigningType('provider'); }}
                            className="px-4 py-2 border border-brand-teal text-brand-teal rounded-xl hover:bg-teal-50 font-medium w-full md:w-auto transition-colors"
                          >
                            {content.adminDashboard.assignments.assignProvider}
                          </button>
                        )
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Orders */}
            <div className="glass-panel p-6 rounded-2xl">
              <h2 className="text-xl font-bold text-gray-900 mb-6">{content.adminDashboard.assignments.groceryTitle}</h2>
              <div className="space-y-4">
                {orders.map(order => (
                  <motion.div
                    layout
                    key={order.id}
                    className="flex flex-col md:flex-row justify-between items-center p-4 border border-gray-100 rounded-xl hover:bg-gray-50/50 transition-colors bg-white"
                  >
                    <div className="mb-2 md:mb-0">
                      <p className="font-bold text-gray-900">{order.user}</p>
                      <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                        <span className="bg-blue-50 text-blue-700 border border-blue-100 px-2 py-0.5 rounded text-xs font-medium">{order.service}</span>
                        <span>{order.date}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 w-full md:w-auto">
                      {order.assignedTo ? (
                        <span className="flex items-center gap-2 text-green-700 font-medium px-4 py-2 bg-green-50 border border-green-100 rounded-xl w-full md:w-auto justify-center">
                          <CheckCircle className="h-4 w-4" /> {order.assignedTo}
                        </span>
                      ) : (
                        assigningId === order.id ? (
                          <select
                            autoFocus
                            className="border border-brand-orange rounded-xl p-2 text-sm w-full focus:ring-2 focus:ring-brand-orange focus:border-transparent outline-none"
                            onChange={(e) => handleAssign(order.id, 'driver', e.target.value)}
                            defaultValue=""
                          >
                            <option value="" disabled>Select Driver</option>
                            {drivers.map(d => (
                              <option key={d.id} value={d.driverProfile?.id}>{d.name}</option>
                            ))}
                          </select>
                        ) : (
                          <button
                            onClick={() => { setAssigningId(order.id); setAssigningType('driver'); }}
                            className="px-4 py-2 border border-brand-orange text-brand-orange rounded-xl hover:bg-orange-50 font-medium w-full md:w-auto transition-colors"
                          >
                            {content.adminDashboard.assignments.assignDriver}
                          </button>
                        )
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        );

      case 'payments':
        return (
          <motion.div variants={tabVariants} initial="hidden" animate="visible" exit="exit" className="glass-panel rounded-2xl overflow-hidden">
            <div className="px-6 py-6 border-b border-gray-100">
              <h2 className="text-xl font-bold text-gray-900">{content.adminDashboard.payments.title}</h2>
            </div>
            <table className="w-full text-left">
              <thead className="bg-gray-50/50 text-gray-500 text-xs uppercase border-b border-gray-100">
                <tr>
                  <th className="px-6 py-4 font-semibold">{content.adminDashboard.payments.table.user}</th>
                  <th className="px-6 py-4 font-semibold">{content.adminDashboard.payments.table.amount}</th>
                  <th className="px-6 py-4 font-semibold">{content.adminDashboard.payments.table.date}</th>
                  <th className="px-6 py-4 font-semibold">{content.adminDashboard.payments.table.method}</th>
                  <th className="px-6 py-4 font-semibold">{content.adminDashboard.payments.table.status}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {payments.map((pay) => (
                  <tr key={pay.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4 font-medium text-gray-900">{pay.user}</td>
                    <td className="px-6 py-4 font-bold text-gray-800">{pay.amount}</td>
                    <td className="px-6 py-4 text-gray-600">{pay.date}</td>
                    <td className="px-6 py-4">
                      <span className="flex items-center gap-2 text-sm text-gray-600">
                        <CreditCard className="h-4 w-4 text-gray-400" /> {pay.method}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${pay.status === 'Success' ? 'bg-green-50 text-green-700 border border-green-100' : 'bg-yellow-50 text-yellow-700 border border-yellow-100'}`}>
                        {pay.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        );

      case 'transportation':
        return (
          <motion.div variants={tabVariants} initial="hidden" animate="visible" exit="exit" className="space-y-6">
            <h2 className="text-xl font-bold text-gray-900">Transportation Requests</h2>
            <div className="glass-panel rounded-2xl overflow-hidden">
              <table className="w-full text-left">
                <thead className="bg-gray-50/50 text-gray-500 text-xs uppercase border-b border-gray-100">
                  <tr>
                    <th className="px-6 py-4 font-semibold">User</th>
                    <th className="px-6 py-4 font-semibold">Destination</th>
                    <th className="px-6 py-4 font-semibold">Date & Time</th>
                    <th className="px-6 py-4 font-semibold">Status</th>
                    <th className="px-6 py-4 font-semibold">Assigned Driver</th>
                    <th className="px-6 py-4 font-semibold">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {transportationRequests.map((req) => (
                    <tr key={req.id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="px-6 py-4 font-medium text-gray-900">{req.user}</td>
                      <td className="px-6 py-4 text-gray-600">{req.destination}</td>
                      <td className="px-6 py-4 text-gray-600">
                        <div className="flex flex-col">
                          <span className="font-medium">{req.date}</span>
                          <span className="text-xs text-gray-400">{req.time}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${req.status === 'Completed' ? 'bg-green-50 text-green-700 border border-green-100' :
                          req.status === 'Assigned' ? 'bg-blue-50 text-blue-700 border border-blue-100' :
                            'bg-yellow-50 text-yellow-700 border border-yellow-100'
                          }`}>
                          {req.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-600">
                        {req.assignedTo ? (
                          <span className="flex items-center gap-2">
                            <Truck className="h-4 w-4 text-brand-orange" />
                            {req.assignedTo}
                          </span>
                        ) : (
                          <span className="text-gray-400 italic">Unassigned</span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        {!req.assignedTo && (
                          <button className="text-sm text-brand-orange font-bold hover:text-orange-700 hover:underline transition-colors">
                            Assign Driver
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        );

      case 'renewals':
        return (
          <motion.div variants={tabVariants} initial="hidden" animate="visible" exit="exit" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {renewals.map((item, idx) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.1 }}
                className="glass-panel p-6 rounded-2xl relative overflow-hidden card-hover border-l-4 border-l-red-500"
              >
                <div className="absolute top-0 right-0 bg-red-500 text-white text-xs px-4 py-1.5 rounded-bl-xl font-bold shadow-sm">
                  Expires in {item.daysLeft} days
                </div>
                <div className="mb-4 mt-2">
                  <h3 className="text-xl font-bold text-gray-900">{item.user}</h3>
                  <p className="text-gray-500 text-sm font-medium">{item.plan}</p>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600 mb-6 bg-red-50 p-2 rounded-lg w-fit">
                  <Calendar className="h-4 w-4 text-red-500" />
                  <span className="font-medium">Expiry: {item.expiryDate}</span>
                </div>
                <button
                  onClick={() => alert(`Renewal email sent to ${item.user}`)}
                  className="w-full py-2.5 bg-brand-orange text-white rounded-xl hover:bg-orange-700 flex items-center justify-center gap-2 transition-all shadow-md hover:shadow-lg active:scale-95"
                >
                  <Mail className="h-4 w-4" />
                  <span className="font-bold">Send Renewal Email</span>
                </button>
              </motion.div>
            ))}
          </motion.div>
        );

      case 'recommendations':
        return (
          <motion.div variants={tabVariants} initial="hidden" animate="visible" exit="exit" className="space-y-8">
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-brand-teal/10 rounded-full">
                  <Lightbulb className="h-8 w-8 text-brand-teal" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">AI-Driven Insights</h2>
                  <p className="text-gray-500">Actionable recommendations to optimize your operations.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-6">
                {analytics?.recommendations?.map((rec: any, idx: number) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="flex flex-col md:flex-row items-start md:items-center justify-between p-6 border border-gray-100 rounded-xl hover:shadow-md transition-all bg-gray-50/50"
                  >
                    <div className="flex items-start gap-4 mb-4 md:mb-0">
                      <div className={`p-3 rounded-xl ${rec.bg}`}>
                        <TrendingUp className={`h-6 w-6 ${rec.color}`} />
                      </div>
                      <div>
                        <div className="flex items-center gap-3 mb-1">
                          <h3 className="font-bold text-gray-900 text-lg">{rec.type.charAt(0).toUpperCase() + rec.type.slice(1)} Optimization</h3>
                          <span className={`px-3 py-1 rounded-full text-xs font-bold ${rec.impact === 'High' ? 'bg-red-100 text-red-700' :
                            rec.impact === 'Medium' ? 'bg-orange-100 text-orange-700' :
                              'bg-blue-100 text-blue-700'
                            }`}>
                            {rec.impact} Impact
                          </span>
                        </div>
                        <p className="text-gray-600">{rec.message}</p>
                      </div>
                    </div>
                    <button className="px-6 py-2 bg-white border border-gray-200 text-gray-700 font-medium rounded-lg hover:bg-brand-teal hover:text-white hover:border-brand-teal transition-all shadow-sm">
                      Apply Recommendation
                    </button>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-purple-500 to-indigo-600 p-6 rounded-xl text-white shadow-lg">
                <h3 className="font-bold text-xl mb-2">Predictive Staffing</h3>
                <p className="text-purple-100 mb-4">Based on historical data, we predict a 20% surge in requests next week.</p>
                <button className="bg-white text-purple-600 px-4 py-2 rounded-lg font-bold hover:bg-purple-50 transition-colors">
                  View Staffing Plan
                </button>
              </div>
              <div className="bg-gradient-to-br from-brand-orange to-red-500 p-6 rounded-xl text-white shadow-lg">
                <h3 className="font-bold text-xl mb-2">Revenue Opportunity</h3>
                <p className="text-orange-100 mb-4">15 users are eligible for plan upgrades. Potential revenue: NPR 45,000.</p>
                <button className="bg-white text-brand-orange px-4 py-2 rounded-lg font-bold hover:bg-orange-50 transition-colors">
                  Send Offers
                </button>
              </div>
            </div>
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Top Navigation Tabs */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-1 mb-8 flex flex-wrap gap-1">
          {[
            { id: 'overview', icon: Activity, label: content.adminDashboard.nav.overview },
            { id: 'staff', icon: Briefcase, label: content.adminDashboard.nav.staff },
            { id: 'customers', icon: Users, label: 'Customers' },
            { id: 'assignments', icon: ClipboardList, label: content.adminDashboard.nav.assignments },
            { id: 'transportation', icon: Truck, label: 'Transportation' },
            { id: 'payments', icon: DollarSign, label: content.adminDashboard.nav.payments },
            { id: 'reports', icon: FileText, label: 'Reports' },
            { id: 'recommendations', icon: Lightbulb, label: 'AI Insights' },
            { id: 'renewals', icon: RefreshCw, label: content.adminDashboard.nav.renewals }
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id as Tab)}
              className={`flex-1 min-w-[120px] px-4 py-3 rounded-lg flex items-center justify-center gap-2 transition-all font-medium text-sm ${activeTab === item.id
                ? 'bg-brand-teal text-white shadow-sm'
                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                } `}
            >
              <item.icon className="h-4 w-4" /> {item.label}
            </button>
          ))}
        </div>

        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-gray-800 capitalize">
            {activeTab === 'overview' ? content.adminDashboard.nav.overview :
              activeTab === 'staff' ? content.adminDashboard.nav.staff :
                activeTab === 'customers' ? 'Customer Management' :
                  activeTab === 'assignments' ? content.adminDashboard.nav.assignments :
                    activeTab === 'transportation' ? 'Transportation Requests' :
                      activeTab === 'payments' ? content.adminDashboard.nav.payments :
                        activeTab === 'reports' ? 'System Reports' :
                          activeTab === 'recommendations' ? 'AI Recommendations' :
                            content.adminDashboard.nav.renewals}
          </h2>
          <div className="text-sm text-gray-500">{new Date().toDateString()}</div>
        </div>
        <AnimatePresence mode="wait">
          {renderContent()}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default AdminDashboard;
