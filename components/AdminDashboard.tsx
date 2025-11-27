
import React, { useState } from 'react';
import { ContentData } from '../types';
import { Users, DollarSign, Activity, Calendar, ClipboardList, Briefcase, RefreshCw, UserPlus, CreditCard, ChevronRight, CheckCircle, Truck, Stethoscope } from 'lucide-react';

interface AdminDashboardProps {
  content: ContentData;
}

type Tab = 'overview' | 'staff' | 'assignments' | 'payments' | 'renewals';

const AdminDashboard: React.FC<AdminDashboardProps> = ({ content }) => {
  const [activeTab, setActiveTab] = useState<Tab>('overview');
  const [showAddStaffModal, setShowAddStaffModal] = useState(false);
  const [assigningId, setAssigningId] = useState<number | null>(null);
  const [assigningType, setAssigningType] = useState<'provider' | 'driver' | null>(null);

  // Mock Data
  const [staff, setStaff] = useState([
    { id: 1, name: 'Sita Sharma', role: 'Care Provider', contact: '9841234567', active: true },
    { id: 2, name: 'Ram Bahadur', role: 'Driver', contact: '9851012345', active: true },
    { id: 3, name: 'Gita Koirala', role: 'Care Provider', contact: '9803214567', active: true },
  ]);

  const [subscriptions, setSubscriptions] = useState([
    { id: 101, user: 'Hari Prasad', plan: 'Premium Care', assignedTo: null as string | null, date: 'Oct 25, 2024' },
    { id: 102, user: 'Maya Devi', plan: 'Standard Care', assignedTo: 'Sita Sharma', date: 'Oct 20, 2024' },
  ]);

  const [orders, setOrders] = useState([
    { id: 201, user: 'Bishal Rai', service: 'Grocery Run', assignedTo: null as string | null, date: 'Oct 26, 2024' },
    { id: 202, user: 'Pema Sherpa', service: 'Transport (Hospital)', assignedTo: 'Ram Bahadur', date: 'Oct 24, 2024' },
  ]);

  const payments = [
    { id: 'TXN-1001', user: 'Hari Prasad', amount: 'NPR 30,000', date: 'Oct 25, 2024', method: 'eSewa', status: 'Success' },
    { id: 'TXN-1002', user: 'Maya Devi', amount: 'NPR 15,000', date: 'Oct 20, 2024', method: 'Khalti', status: 'Success' },
    { id: 'TXN-1003', user: 'Bishal Rai', amount: 'NPR 1,000', date: 'Oct 26, 2024', method: 'Stripe', status: 'Success' },
    { id: 'TXN-1004', user: 'Suresh KC', amount: 'NPR 8,000', date: 'Sep 15, 2024', method: 'eSewa', status: 'Success' },
  ];

  const renewals = [
    { id: 301, user: 'Suresh KC', plan: 'Basic Care', expiryDate: 'Nov 01, 2024', daysLeft: 6 },
    { id: 302, user: 'Rita Thapa', plan: 'Standard Care', expiryDate: 'Nov 05, 2024', daysLeft: 10 },
  ];

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

  const renderContent = () => {
    switch(activeTab) {
      case 'overview':
        return (
          <>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 flex items-center gap-4">
                 <div className="p-3 bg-blue-100 rounded-lg text-blue-600"><Users className="h-6 w-6" /></div>
                 <div>
                   <p className="text-sm text-gray-500">{content.adminDashboard.overview.totalUsers}</p>
                   <p className="text-2xl font-bold text-gray-900">1,240</p>
                 </div>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 flex items-center gap-4">
                 <div className="p-3 bg-green-100 rounded-lg text-green-600"><DollarSign className="h-6 w-6" /></div>
                 <div>
                   <p className="text-sm text-gray-500">{content.adminDashboard.overview.monthlyRevenue}</p>
                   <p className="text-2xl font-bold text-gray-900">NPR 4.2M</p>
                 </div>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 flex items-center gap-4">
                 <div className="p-3 bg-brand-orange/20 rounded-lg text-brand-orange"><Activity className="h-6 w-6" /></div>
                 <div>
                   <p className="text-sm text-gray-500">{content.adminDashboard.overview.activeProviders}</p>
                   <p className="text-2xl font-bold text-gray-900">45</p>
                 </div>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 flex items-center gap-4">
                 <div className="p-3 bg-purple-100 rounded-lg text-purple-600"><Calendar className="h-6 w-6" /></div>
                 <div>
                   <p className="text-sm text-gray-500">{content.adminDashboard.overview.recentBookings}</p>
                   <p className="text-2xl font-bold text-gray-900">12</p>
                 </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
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
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
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
                </div>
            </div>
          </>
        );
      
      case 'staff':
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold text-gray-900">{content.adminDashboard.staff.title}</h2>
              <button 
                onClick={() => setShowAddStaffModal(true)}
                className="flex items-center gap-2 bg-brand-teal text-white px-4 py-2 rounded-lg hover:bg-teal-800 transition-colors"
              >
                <UserPlus className="h-4 w-4" /> {content.adminDashboard.staff.addBtn}
              </button>
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
                     <tr key={member.id} className="hover:bg-gray-50">
                       <td className="px-6 py-4 font-medium text-gray-900">{member.name}</td>
                       <td className="px-6 py-4 text-gray-600 flex items-center gap-2">
                           {member.role === 'Care Provider' ? <Stethoscope className="h-4 w-4 text-brand-teal"/> : <Truck className="h-4 w-4 text-brand-orange"/>}
                           {member.role}
                       </td>
                       <td className="px-6 py-4 text-gray-600">{member.contact}</td>
                       <td className="px-6 py-4">
                         <span className={`px-2 py-1 rounded-full text-xs font-bold ${member.active ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                           {member.active ? 'Active' : 'Inactive'}
                         </span>
                       </td>
                     </tr>
                   ))}
                 </tbody>
               </table>
            </div>

            {showAddStaffModal && (
               <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                 <div className="bg-white rounded-xl p-6 w-full max-w-md">
                    <h3 className="text-lg font-bold mb-4">{content.adminDashboard.staff.addBtn}</h3>
                    <form onSubmit={handleAddStaff} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">{content.adminDashboard.staff.name}</label>
                            <input name="name" required className="w-full border border-gray-300 rounded-lg p-2 focus:ring-brand-teal focus:border-brand-teal" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">{content.adminDashboard.staff.role}</label>
                            <select name="role" className="w-full border border-gray-300 rounded-lg p-2 focus:ring-brand-teal focus:border-brand-teal">
                                <option value="Care Provider">Care Provider</option>
                                <option value="Driver">Driver</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">{content.adminDashboard.staff.contact}</label>
                            <input name="contact" required className="w-full border border-gray-300 rounded-lg p-2 focus:ring-brand-teal focus:border-brand-teal" />
                        </div>
                        <div className="flex gap-3 mt-6">
                            <button type="button" onClick={() => setShowAddStaffModal(false)} className="flex-1 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">Cancel</button>
                            <button type="submit" className="flex-1 py-2 bg-brand-teal text-white rounded-lg hover:bg-teal-800">{content.adminDashboard.staff.save}</button>
                        </div>
                    </form>
                 </div>
               </div>
            )}
          </div>
        );

      case 'assignments':
        return (
          <div className="space-y-8">
             {/* Subscriptions */}
             <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                 <h2 className="text-xl font-bold text-gray-900 mb-4">{content.adminDashboard.assignments.subscriptionTitle}</h2>
                 <div className="space-y-4">
                    {subscriptions.map(sub => (
                        <div key={sub.id} className="flex flex-col md:flex-row justify-between items-center p-4 border border-gray-100 rounded-lg hover:bg-gray-50">
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
                                            className="px-4 py-2 border border-brand-teal text-brand-teal rounded-lg hover:bg-teal-50 font-medium w-full md:w-auto"
                                        >
                                            {content.adminDashboard.assignments.assignProvider}
                                        </button>
                                    )
                                )}
                            </div>
                        </div>
                    ))}
                 </div>
             </div>

             {/* Orders */}
             <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                 <h2 className="text-xl font-bold text-gray-900 mb-4">{content.adminDashboard.assignments.groceryTitle}</h2>
                 <div className="space-y-4">
                    {orders.map(order => (
                        <div key={order.id} className="flex flex-col md:flex-row justify-between items-center p-4 border border-gray-100 rounded-lg hover:bg-gray-50">
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
                                            className="px-4 py-2 border border-brand-orange text-brand-orange rounded-lg hover:bg-orange-50 font-medium w-full md:w-auto"
                                        >
                                            {content.adminDashboard.assignments.assignDriver}
                                        </button>
                                    )
                                )}
                            </div>
                        </div>
                    ))}
                 </div>
             </div>
          </div>
        );

      case 'payments':
        return (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
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
                   <tr key={pay.id} className="hover:bg-gray-50">
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
          </div>
        );

      case 'renewals':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
             {renewals.map(item => (
                 <div key={item.id} className="bg-white rounded-xl shadow-sm border border-red-100 p-6 relative overflow-hidden">
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
                     <button className="w-full py-2 bg-brand-orange text-white rounded-lg hover:bg-orange-700 flex items-center justify-center gap-2">
                         <RefreshCw className="h-4 w-4" />
                         {content.adminDashboard.renewals.action}
                     </button>
                 </div>
             ))}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
      {/* Sidebar */}
      <div className="w-full md:w-64 bg-white border-r border-gray-200 flex-shrink-0">
          <div className="p-6 border-b border-gray-100">
              <h1 className="text-xl font-bold text-brand-teal">Admin Panel</h1>
          </div>
          <nav className="p-4 space-y-2">
              <button 
                onClick={() => setActiveTab('overview')}
                className={`w-full text-left px-4 py-3 rounded-lg flex items-center gap-3 transition-colors ${activeTab === 'overview' ? 'bg-brand-teal text-white' : 'text-gray-600 hover:bg-gray-50'}`}
              >
                  <Activity className="h-5 w-5" /> {content.adminDashboard.nav.overview}
              </button>
              <button 
                onClick={() => setActiveTab('staff')}
                className={`w-full text-left px-4 py-3 rounded-lg flex items-center gap-3 transition-colors ${activeTab === 'staff' ? 'bg-brand-teal text-white' : 'text-gray-600 hover:bg-gray-50'}`}
              >
                  <Briefcase className="h-5 w-5" /> {content.adminDashboard.nav.staff}
              </button>
              <button 
                onClick={() => setActiveTab('assignments')}
                className={`w-full text-left px-4 py-3 rounded-lg flex items-center gap-3 transition-colors ${activeTab === 'assignments' ? 'bg-brand-teal text-white' : 'text-gray-600 hover:bg-gray-50'}`}
              >
                  <ClipboardList className="h-5 w-5" /> {content.adminDashboard.nav.assignments}
              </button>
              <button 
                onClick={() => setActiveTab('payments')}
                className={`w-full text-left px-4 py-3 rounded-lg flex items-center gap-3 transition-colors ${activeTab === 'payments' ? 'bg-brand-teal text-white' : 'text-gray-600 hover:bg-gray-50'}`}
              >
                  <DollarSign className="h-5 w-5" /> {content.adminDashboard.nav.payments}
              </button>
              <button 
                onClick={() => setActiveTab('renewals')}
                className={`w-full text-left px-4 py-3 rounded-lg flex items-center gap-3 transition-colors ${activeTab === 'renewals' ? 'bg-brand-teal text-white' : 'text-gray-600 hover:bg-gray-50'}`}
              >
                  <RefreshCw className="h-5 w-5" /> {content.adminDashboard.nav.renewals}
              </button>
          </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 overflow-y-auto">
          <div className="max-w-6xl mx-auto">
              <div className="flex items-center justify-between mb-8">
                  <h2 className="text-2xl font-bold text-gray-800 capitalize">
                    {activeTab === 'overview' ? content.adminDashboard.nav.overview : 
                     activeTab === 'staff' ? content.adminDashboard.nav.staff :
                     activeTab === 'assignments' ? content.adminDashboard.nav.assignments :
                     activeTab === 'payments' ? content.adminDashboard.nav.payments : 
                     content.adminDashboard.nav.renewals}
                  </h2>
                  <div className="text-sm text-gray-500">{new Date().toDateString()}</div>
              </div>
              {renderContent()}
          </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
