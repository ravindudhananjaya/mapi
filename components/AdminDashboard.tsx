import React, { useState } from 'react';
import { ContentData } from '../types';
import { Users, DollarSign, Activity, Calendar, ClipboardList, Briefcase, RefreshCw, UserPlus, CreditCard, ChevronRight, CheckCircle, Truck, Stethoscope, FileText, User, Mail, PieChart, BarChart, Server, TrendingUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface AdminDashboardProps {
  content: ContentData;
  initialTab?: 'overview' | 'staff' | 'assignments' | 'payments' | 'renewals' | 'customers' | 'reports' | 'transportation';
}

type Tab = 'overview' | 'staff' | 'assignments' | 'payments' | 'renewals' | 'customers' | 'reports' | 'transportation';

const AdminDashboard: React.FC<AdminDashboardProps> = ({ content, initialTab = 'overview' }) => {
  const [activeTab, setActiveTab] = useState<Tab>(initialTab);

  React.useEffect(() => {
    setActiveTab(initialTab);
  }, [initialTab]);

  const [showAddStaffModal, setShowAddStaffModal] = useState(false);
  const [assigningId, setAssigningId] = useState<number | null>(null);
  const [assigningType, setAssigningType] = useState<'provider' | 'driver' | null>(null);

  // Mock Data
  const [staff, setStaff] = useState([
    { id: 1, name: 'Sita Sharma', role: 'Care Provider', contact: '9841234567', active: true },
    { id: 2, name: 'Ram Bahadur', role: 'Driver', contact: '9851012345', active: true },
    { id: 3, name: 'Gita Koirala', role: 'Care Provider', contact: '9803214567', active: true },
    { id: 4, name: 'Hari Krishna', role: 'Driver', contact: '9867890123', active: false },
    { id: 5, name: 'Sunita Gurung', role: 'Care Provider', contact: '9812345678', active: true },
    { id: 6, name: 'Ramesh Thapa', role: 'Driver', contact: '9845678901', active: true },
  ]);

  const customers = [
    { id: 1, name: 'Hari Prasad', email: 'hari@example.com', plan: 'Premium Care', status: 'Active', joinDate: 'Jan 15, 2024' },
    { id: 2, name: 'Maya Devi', email: 'maya@example.com', plan: 'Standard Care', status: 'Active', joinDate: 'Feb 20, 2024' },
    { id: 3, name: 'Bishal Rai', email: 'bishal@example.com', plan: 'Basic Care', status: 'Inactive', joinDate: 'Mar 10, 2024' },
    { id: 4, name: 'Suresh KC', email: 'suresh@example.com', plan: 'Standard Care', status: 'Active', joinDate: 'Apr 05, 2024' },
    { id: 5, name: 'Anita Shrestha', email: 'anita@example.com', plan: 'Premium Care', status: 'Active', joinDate: 'May 12, 2024' },
    { id: 6, name: 'Rajendra Mahato', email: 'rajendra@example.com', plan: 'Basic Care', status: 'Active', joinDate: 'Jun 01, 2024' },
    { id: 7, name: 'Saraswati Joshi', email: 'saraswati@example.com', plan: 'Standard Care', status: 'Inactive', joinDate: 'Jul 18, 2024' },
  ];

  const reports = [
    { id: 1, title: 'Monthly Revenue Report', date: 'Oct 2024', type: 'Financial', status: 'Ready' },
    { id: 2, title: 'User Growth Analysis', date: 'Q3 2024', type: 'Analytics', status: 'Ready' },
    { id: 3, title: 'Provider Performance', date: 'Sep 2024', type: 'Performance', status: 'Ready' },
    { id: 4, title: 'Service Usage Stats', date: 'Oct 2024', type: 'Usage', status: 'Processing' },
    { id: 5, title: 'Customer Satisfaction Survey', date: 'Q3 2024', type: 'Feedback', status: 'Ready' },
    { id: 6, title: 'Operational Costs', date: 'Oct 2024', type: 'Financial', status: 'Processing' },
  ];

  const [subscriptions, setSubscriptions] = useState([
    { id: 101, user: 'Hari Prasad', plan: 'Premium Care', assignedTo: null as string | null, date: 'Oct 25, 2024' },
    { id: 102, user: 'Maya Devi', plan: 'Standard Care', assignedTo: 'Sita Sharma', date: 'Oct 20, 2024' },
    { id: 103, user: 'Anita Shrestha', plan: 'Premium Care', assignedTo: null as string | null, date: 'Oct 28, 2024' },
    { id: 104, user: 'Rajendra Mahato', plan: 'Basic Care', assignedTo: 'Gita Koirala', date: 'Oct 29, 2024' },
  ]);

  const [orders, setOrders] = useState([
    { id: 201, user: 'Bishal Rai', service: 'Grocery Run', assignedTo: null as string | null, date: 'Oct 26, 2024' },
    { id: 202, user: 'Pema Sherpa', service: 'Transport (Hospital)', assignedTo: 'Ram Bahadur', date: 'Oct 24, 2024' },
    { id: 203, user: 'Saraswati Joshi', service: 'Medicine Delivery', assignedTo: null as string | null, date: 'Oct 30, 2024' },
    { id: 204, user: 'Suresh KC', service: 'Check-up Assistance', assignedTo: 'Ramesh Thapa', date: 'Oct 31, 2024' },
  ]);

  const payments = [
    { id: 'TXN-1001', user: 'Hari Prasad', amount: 'NPR 30,000', date: 'Oct 25, 2024', method: 'eSewa', status: 'Success' },
    { id: 'TXN-1002', user: 'Maya Devi', amount: 'NPR 15,000', date: 'Oct 20, 2024', method: 'Khalti', status: 'Success' },
    { id: 'TXN-1003', user: 'Bishal Rai', amount: 'NPR 1,000', date: 'Oct 26, 2024', method: 'Stripe', status: 'Success' },
    { id: 'TXN-1004', user: 'Suresh KC', amount: 'NPR 8,000', date: 'Sep 15, 2024', method: 'eSewa', status: 'Success' },
    { id: 'TXN-1005', user: 'Anita Shrestha', amount: 'NPR 30,000', date: 'Oct 28, 2024', method: 'Bank Transfer', status: 'Pending' },
    { id: 'TXN-1006', user: 'Rajendra Mahato', amount: 'NPR 5,000', date: 'Oct 29, 2024', method: 'Khalti', status: 'Success' },
  ];

  const renewals = [
    { id: 301, user: 'Suresh KC', plan: 'Basic Care', expiryDate: 'Nov 01, 2024', daysLeft: 6 },
    { id: 302, user: 'Rita Thapa', plan: 'Standard Care', expiryDate: 'Nov 05, 2024', daysLeft: 10 },
    { id: 303, user: 'Bishal Rai', plan: 'Basic Care', expiryDate: 'Nov 12, 2024', daysLeft: 17 },
    { id: 304, user: 'Saraswati Joshi', plan: 'Standard Care', expiryDate: 'Nov 20, 2024', daysLeft: 25 },
  ];

  const transportationRequests = [
    { id: 401, user: 'Pema Sherpa', destination: 'Norvic Hospital', date: 'Oct 28, 2024', time: '10:00 AM', status: 'Pending', assignedTo: null },
    { id: 402, user: 'Ram Kumar', destination: 'Teaching Hospital', date: 'Oct 29, 2024', time: '02:00 PM', status: 'Assigned', assignedTo: 'Ram Bahadur' },
    { id: 403, user: 'Sita Devi', destination: 'Mediciti Hospital', date: 'Oct 30, 2024', time: '09:00 AM', status: 'Completed', assignedTo: 'Shyam Krishna' },
    { id: 404, user: 'Gopal Verma', destination: 'Grande Hospital', date: 'Nov 01, 2024', time: '08:30 AM', status: 'Pending', assignedTo: null },
    { id: 405, user: 'Meena Gurung', destination: 'Bir Hospital', date: 'Nov 02, 2024', time: '11:00 AM', status: 'Pending', assignedTo: null },
  ];

  const analyticsData = {
    revenueByPlan: [
      { name: 'Premium Care', value: 45, color: 'bg-purple-500', amount: 'NPR 1.8M' },
      { name: 'Standard Care', value: 35, color: 'bg-blue-500', amount: 'NPR 1.4M' },
      { name: 'Basic Care', value: 20, color: 'bg-green-500', amount: 'NPR 0.8M' },
    ],
    serviceUsage: [
      { name: 'Grocery Run', value: 75, color: 'bg-orange-500' },
      { name: 'Medical Transport', value: 60, color: 'bg-red-500' },
      { name: 'Check-up Assistance', value: 45, color: 'bg-teal-500' },
      { name: 'Home Care', value: 30, color: 'bg-indigo-500' },
    ],
    systemHealth: [
      { name: 'Server Load', value: 42, status: 'Healthy', color: 'text-green-600' },
      { name: 'Database Usage', value: 68, status: 'Moderate', color: 'text-yellow-600' },
      { name: 'Memory Usage', value: 35, status: 'Healthy', color: 'text-green-600' },
    ]
  };

  const handleAddStaff = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const name = (form.elements.namedItem('name') as HTMLInputElement).value;
    const role = (form.elements.namedItem('role') as HTMLSelectElement).value;
    const contact = (form.elements.namedItem('contact') as HTMLInputElement).value;

    setStaff([...staff, { id: Date.now(), name, role, contact, active: true }]);
    setShowAddStaffModal(false);
  };

  const handleAssign = (id: number, type: 'provider' | 'driver', staffName: string) => {
    if (type === 'provider') {
      setSubscriptions(subscriptions.map(s => s.id === id ? { ...s, assignedTo: staffName } : s));
    } else {
      setOrders(orders.map(o => o.id === id ? { ...o, assignedTo: staffName } : o));
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
                { icon: Users, color: 'blue', label: content.adminDashboard.overview.totalUsers, value: '1,240' },
                { icon: DollarSign, color: 'green', label: content.adminDashboard.overview.monthlyRevenue, value: 'NPR 4.2M' },
                { icon: Activity, color: 'orange', label: content.adminDashboard.overview.activeProviders, value: '45' },
                { icon: Calendar, color: 'purple', label: content.adminDashboard.overview.recentBookings, value: '12' }
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 flex items-center gap-4 hover:shadow-md transition-shadow"
                >
                  <div className={`p-3 bg-${item.color}-100 rounded-lg text-${item.color}-600`}>
                    <item.icon className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">{item.label}</p>
                    <p className="text-2xl font-bold text-gray-900">{item.value}</p>
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
                  {analyticsData.revenueByPlan.map((item, idx) => (
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
                  {analyticsData.serviceUsage.map((item, idx) => (
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
                  {analyticsData.systemHealth.map((item, idx) => (
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

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <table className="w-full text-left">
                <thead className="bg-gray-50 text-gray-500 text-xs uppercase">
                  <tr>
                    <th className="px-6 py-3">{content.adminDashboard.staff.name}</th>
                    <th className="px-6 py-3">{content.adminDashboard.staff.role}</th>
                    <th className="px-6 py-3">{content.adminDashboard.staff.contact}</th>
                    <th className="px-6 py-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {staff.map((member) => (
                    <tr key={member.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 font-medium text-gray-900">{member.name}</td>
                      <td className="px-6 py-4 text-gray-600 flex items-center gap-2">
                        {member.role === 'Care Provider' ? <Stethoscope className="h-4 w-4 text-brand-teal" /> : <Truck className="h-4 w-4 text-brand-orange" />}
                        {member.role}
                      </td>
                      <td className="px-6 py-4 text-gray-600">{member.contact}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-bold ${member.active ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'} `}>
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
                        <label className="block text-sm font-medium text-gray-700 mb-1">{content.adminDashboard.staff.role}</label>
                        <select name="role" className="w-full border border-gray-300 rounded-lg p-2 focus:ring-brand-teal focus:border-brand-teal transition-all">
                          <option value="Care Provider">Care Provider</option>
                          <option value="Driver">Driver</option>
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
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <table className="w-full text-left">
                <thead className="bg-gray-50 text-gray-500 text-xs uppercase">
                  <tr>
                    <th className="px-6 py-3">Name</th>
                    <th className="px-6 py-3">Email</th>
                    <th className="px-6 py-3">Current Plan</th>
                    <th className="px-6 py-3">Joined Date</th>
                    <th className="px-6 py-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {customers.map((customer) => (
                    <tr key={customer.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 font-medium text-gray-900 flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500">
                          <User className="h-4 w-4" />
                        </div>
                        {customer.name}
                      </td>
                      <td className="px-6 py-4 text-gray-600">{customer.email}</td>
                      <td className="px-6 py-4 text-gray-600">
                        <span className="bg-blue-50 text-blue-700 px-2 py-1 rounded text-xs font-medium">{customer.plan}</span>
                      </td>
                      <td className="px-6 py-4 text-gray-600">{customer.joinDate}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-bold ${customer.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'} `}>
                          {customer.status}
                        </span>
                      </td>
                    </tr>
                  ))}
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
                  className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-all"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="p-3 bg-brand-teal/10 rounded-lg text-brand-teal">
                      <FileText className="h-6 w-6" />
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full font-bold ${report.status === 'Ready' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'} `}>
                      {report.status}
                    </span>
                  </div>
                  <h3 className="font-bold text-gray-900 mb-1">{report.title}</h3>
                  <p className="text-sm text-gray-500 mb-4">{report.type} • {report.date}</p>
                  <button className="w-full py-2 border border-gray-200 text-gray-600 rounded-lg hover:bg-gray-50 hover:text-gray-900 transition-colors text-sm font-medium">
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
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">{content.adminDashboard.assignments.subscriptionTitle}</h2>
              <div className="space-y-4">
                {subscriptions.map(sub => (
                  <motion.div
                    layout
                    key={sub.id}
                    className="flex flex-col md:flex-row justify-between items-center p-4 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="mb-2 md:mb-0">
                      <p className="font-bold text-gray-900">{sub.user}</p>
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <span className="bg-purple-100 text-purple-700 px-2 py-0.5 rounded text-xs">{sub.plan}</span>
                        <span>{sub.date}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 w-full md:w-auto">
                      {sub.assignedTo ? (
                        <span className="flex items-center gap-2 text-green-700 font-medium px-4 py-2 bg-green-50 rounded-lg w-full md:w-auto justify-center">
                          <CheckCircle className="h-4 w-4" /> {sub.assignedTo}
                        </span>
                      ) : (
                        assigningId === sub.id ? (
                          <select
                            autoFocus
                            className="border border-brand-teal rounded-lg p-2 text-sm w-full"
                            onChange={(e) => handleAssign(sub.id, 'provider', e.target.value)}
                            defaultValue=""
                          >
                            <option value="" disabled>Select Provider</option>
                            {staff.filter(s => s.role === 'Care Provider').map(s => (
                              <option key={s.id} value={s.name}>{s.name}</option>
                            ))}
                          </select>
                        ) : (
                          <button
                            onClick={() => { setAssigningId(sub.id); setAssigningType('provider'); }}
                            className="px-4 py-2 border border-brand-teal text-brand-teal rounded-lg hover:bg-teal-50 font-medium w-full md:w-auto transition-colors"
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
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">{content.adminDashboard.assignments.groceryTitle}</h2>
              <div className="space-y-4">
                {orders.map(order => (
                  <motion.div
                    layout
                    key={order.id}
                    className="flex flex-col md:flex-row justify-between items-center p-4 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="mb-2 md:mb-0">
                      <p className="font-bold text-gray-900">{order.user}</p>
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded text-xs">{order.service}</span>
                        <span>{order.date}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 w-full md:w-auto">
                      {order.assignedTo ? (
                        <span className="flex items-center gap-2 text-green-700 font-medium px-4 py-2 bg-green-50 rounded-lg w-full md:w-auto justify-center">
                          <CheckCircle className="h-4 w-4" /> {order.assignedTo}
                        </span>
                      ) : (
                        assigningId === order.id ? (
                          <select
                            autoFocus
                            className="border border-brand-orange rounded-lg p-2 text-sm w-full"
                            onChange={(e) => handleAssign(order.id, 'driver', e.target.value)}
                            defaultValue=""
                          >
                            <option value="" disabled>Select Driver</option>
                            {staff.filter(s => s.role === 'Driver').map(s => (
                              <option key={s.id} value={s.name}>{s.name}</option>
                            ))}
                          </select>
                        ) : (
                          <button
                            onClick={() => { setAssigningId(order.id); setAssigningType('driver'); }}
                            className="px-4 py-2 border border-brand-orange text-brand-orange rounded-lg hover:bg-orange-50 font-medium w-full md:w-auto transition-colors"
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
          <motion.div variants={tabVariants} initial="hidden" animate="visible" exit="exit" className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">{content.adminDashboard.payments.title}</h2>
            </div>
            <table className="w-full text-left">
              <thead className="bg-gray-50 text-gray-500 text-xs uppercase">
                <tr>
                  <th className="px-6 py-3">{content.adminDashboard.payments.table.user}</th>
                  <th className="px-6 py-3">{content.adminDashboard.payments.table.amount}</th>
                  <th className="px-6 py-3">{content.adminDashboard.payments.table.date}</th>
                  <th className="px-6 py-3">{content.adminDashboard.payments.table.method}</th>
                  <th className="px-6 py-3">{content.adminDashboard.payments.table.status}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {payments.map((pay) => (
                  <tr key={pay.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 font-medium text-gray-900">{pay.user}</td>
                    <td className="px-6 py-4 font-bold text-gray-800">{pay.amount}</td>
                    <td className="px-6 py-4 text-gray-600">{pay.date}</td>
                    <td className="px-6 py-4">
                      <span className="flex items-center gap-1 text-sm text-gray-600">
                        <CreditCard className="h-3 w-3" /> {pay.method}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 rounded-full text-xs font-bold bg-green-100 text-green-700">
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
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <table className="w-full text-left">
                <thead className="bg-gray-50 text-gray-500 text-xs uppercase">
                  <tr>
                    <th className="px-6 py-3">User</th>
                    <th className="px-6 py-3">Destination</th>
                    <th className="px-6 py-3">Date & Time</th>
                    <th className="px-6 py-3">Status</th>
                    <th className="px-6 py-3">Assigned Driver</th>
                    <th className="px-6 py-3">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {transportationRequests.map((req) => (
                    <tr key={req.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 font-medium text-gray-900">{req.user}</td>
                      <td className="px-6 py-4 text-gray-600">{req.destination}</td>
                      <td className="px-6 py-4 text-gray-600">
                        <div className="flex flex-col">
                          <span>{req.date}</span>
                          <span className="text-xs text-gray-400">{req.time}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-bold ${req.status === 'Completed' ? 'bg-green-100 text-green-700' :
                          req.status === 'Assigned' ? 'bg-blue-100 text-blue-700' :
                            'bg-yellow-100 text-yellow-700'
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
                          <button className="text-sm text-brand-orange font-medium hover:underline">
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
                className="bg-white rounded-xl shadow-sm border border-red-100 p-6 relative overflow-hidden hover:shadow-md transition-shadow"
              >
                <div className="absolute top-0 right-0 bg-red-500 text-white text-xs px-3 py-1 rounded-bl-lg font-bold">
                  Expires in {item.daysLeft} days
                </div>
                <div className="mb-4 mt-2">
                  <h3 className="text-lg font-bold text-gray-900">{item.user}</h3>
                  <p className="text-gray-500 text-sm">{item.plan}</p>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600 mb-6">
                  <Calendar className="h-4 w-4" />
                  Expiry: {item.expiryDate}
                </div>
                <button
                  onClick={() => alert(`Renewal email sent to ${item.user}`)}
                  className="w-full py-2 bg-brand-orange text-white rounded-lg hover:bg-orange-700 flex items-center justify-center gap-2 transition-colors"
                >
                  <Mail className="h-4 w-4" />
                  Send Renewal Email
                </button>
              </motion.div>
            ))}
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
