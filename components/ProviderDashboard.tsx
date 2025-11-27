
import React, { useState } from 'react';
import { ContentData, ServiceType, BookingStatus } from '../types';
import { MapPin, Navigation, Camera, Clipboard, CheckCircle, Calendar, Clock, Filter, Check, X, MessageSquare, User } from 'lucide-react';

interface ProviderDashboardProps {
  content: ContentData;
}

const ProviderDashboard: React.FC<ProviderDashboardProps> = ({ content }) => {
  const [activeTab, setActiveTab] = useState<'schedule' | 'requests' | 'messages'>('schedule');
  const [viewMode, setViewMode] = useState<'today' | 'week' | 'month'>('today');
  const [filterType, setFilterType] = useState<'all' | 'subscription' | 'onetime'>('all');

  // Mock Data
  const [requests, setRequests] = useState([
    { id: 101, patient: 'Ram Bahadur', address: 'Baneshwor, KTM', time: '10:00 AM', type: 'subscription' as ServiceType, date: 'Oct 25, 2024' },
    { id: 102, patient: 'Gita Devi', address: 'Koteshwor, KTM', time: '02:00 PM', type: 'onetime' as ServiceType, date: 'Oct 26, 2024' },
  ]);

  const schedule = [
    { id: 1, patient: 'Hari Prasad', address: 'Baneshwor-10', time: '10:00 AM', status: 'pending', type: 'subscription', date: 'Today' },
    { id: 2, patient: 'Sita Devi', address: 'Tinkune', time: '02:00 PM', status: 'completed', type: 'onetime', date: 'Today' },
    { id: 3, patient: 'Ram Kumar', address: 'Lalitpur-3', time: '09:00 AM', status: 'pending', type: 'subscription', date: 'Tomorrow' },
    { id: 4, patient: 'Krishna Gopal', address: 'Bhaktapur', time: '11:00 AM', status: 'pending', type: 'subscription', date: 'Oct 28' },
    { id: 5, patient: 'Maya Gurung', address: 'Chabahil', time: '04:00 PM', status: 'pending', type: 'onetime', date: 'Nov 01' },
  ];

  const messages = [
    { id: 1, from: 'Ram Kumar (Son)', text: 'Please check BP twice today.', time: '2 hours ago' },
    { id: 2, from: 'Sita Devi', text: 'I am running late for the appointment.', time: 'Yesterday' },
  ];

  const handleApprove = (id: number) => {
    setRequests(requests.filter(r => r.id !== id));
    // In real app, this would move to schedule
    alert("Booking Approved!");
  };

  const handleDecline = (id: number) => {
    setRequests(requests.filter(r => r.id !== id));
    alert("Booking Declined");
  };

  const filteredSchedule = schedule.filter(item => {
    if (filterType !== 'all' && item.type !== filterType) return false;
    if (viewMode === 'today' && item.date !== 'Today') return false;
    if (viewMode === 'week' && !['Today', 'Tomorrow', 'Oct 28'].includes(item.date)) return false;
    return true; // Month shows all
  });

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-8">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <h1 className="text-2xl font-bold text-gray-900">{content.providerDashboard.title}</h1>
            
            {/* Main Tabs */}
            <div className="flex bg-white p-1 rounded-lg shadow-sm border border-gray-200">
                <button 
                    onClick={() => setActiveTab('schedule')}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${activeTab === 'schedule' ? 'bg-brand-teal text-white' : 'text-gray-600 hover:bg-gray-50'}`}
                >
                    {content.providerDashboard.tabs.schedule}
                </button>
                <button 
                    onClick={() => setActiveTab('requests')}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-2 ${activeTab === 'requests' ? 'bg-brand-teal text-white' : 'text-gray-600 hover:bg-gray-50'}`}
                >
                    {content.providerDashboard.tabs.requests}
                    {requests.length > 0 && <span className="bg-red-500 text-white text-xs px-1.5 rounded-full">{requests.length}</span>}
                </button>
                <button 
                    onClick={() => setActiveTab('messages')}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${activeTab === 'messages' ? 'bg-brand-teal text-white' : 'text-gray-600 hover:bg-gray-50'}`}
                >
                    {content.providerDashboard.tabs.messages}
                </button>
            </div>
        </div>
        
        {activeTab === 'schedule' && (
            <div className="space-y-6">
                {/* Filters & View Modes */}
                <div className="flex flex-col sm:flex-row justify-between gap-4">
                    <div className="flex gap-2">
                         <button onClick={() => setViewMode('today')} className={`px-3 py-1.5 rounded-full text-xs font-semibold border ${viewMode === 'today' ? 'bg-brand-orange text-white border-brand-orange' : 'bg-white text-gray-600 border-gray-300'}`}>{content.providerDashboard.views.today}</button>
                         <button onClick={() => setViewMode('week')} className={`px-3 py-1.5 rounded-full text-xs font-semibold border ${viewMode === 'week' ? 'bg-brand-orange text-white border-brand-orange' : 'bg-white text-gray-600 border-gray-300'}`}>{content.providerDashboard.views.week}</button>
                         <button onClick={() => setViewMode('month')} className={`px-3 py-1.5 rounded-full text-xs font-semibold border ${viewMode === 'month' ? 'bg-brand-orange text-white border-brand-orange' : 'bg-white text-gray-600 border-gray-300'}`}>{content.providerDashboard.views.month}</button>
                    </div>
                    
                    <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-md border border-gray-200">
                        <Filter className="h-4 w-4 text-gray-400" />
                        <select 
                            className="text-sm border-none focus:ring-0 text-gray-600 bg-transparent"
                            value={filterType}
                            onChange={(e) => setFilterType(e.target.value as any)}
                        >
                            <option value="all">{content.providerDashboard.filters.all}</option>
                            <option value="subscription">{content.providerDashboard.filters.subscription}</option>
                            <option value="onetime">{content.providerDashboard.filters.oneTime}</option>
                        </select>
                    </div>
                </div>

                <div className="space-y-4">
                    {filteredSchedule.map((visit) => (
                        <div key={visit.id} className="bg-white rounded-xl shadow border border-gray-200 overflow-hidden">
                            <div className="p-5 border-b border-gray-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                                <div>
                                    <div className="flex items-center gap-3">
                                        <h3 className="text-xl font-bold text-gray-900">{visit.patient}</h3>
                                        <span className={`text-xs px-2 py-0.5 rounded border ${visit.type === 'subscription' ? 'bg-purple-50 text-purple-700 border-purple-200' : 'bg-blue-50 text-blue-700 border-blue-200'}`}>
                                            {visit.type === 'subscription' ? content.providerDashboard.filters.subscription : content.providerDashboard.filters.oneTime}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-4 text-gray-500 mt-2">
                                        <div className="flex items-center gap-1">
                                            <MapPin className="h-4 w-4" />
                                            <span className="text-sm">{visit.address}</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Clock className="h-4 w-4" />
                                            <span className="text-sm">{visit.date} - {visit.time}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <button className="flex items-center justify-center gap-2 px-4 py-2 border border-brand-teal text-brand-teal rounded hover:bg-teal-50 text-sm font-medium">
                                        <Navigation className="h-4 w-4" /> {content.providerDashboard.actions.navigate}
                                    </button>
                                </div>
                            </div>
                            
                            {visit.status !== 'completed' && (
                                <div className="p-5 bg-gray-50">
                                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                                        <button className="flex flex-col items-center justify-center p-3 bg-white border border-gray-200 rounded-lg hover:border-brand-orange hover:text-brand-orange transition-colors">
                                            <Clipboard className="h-5 w-5 mb-2" />
                                            <span className="text-xs font-medium">{content.providerDashboard.actions.complete} Data</span>
                                        </button>
                                        <button className="flex flex-col items-center justify-center p-3 bg-white border border-gray-200 rounded-lg hover:border-brand-orange hover:text-brand-orange transition-colors">
                                            <Camera className="h-5 w-5 mb-2" />
                                            <span className="text-xs font-medium">Media</span>
                                        </button>
                                        <button className="col-span-2 sm:col-span-2 flex items-center justify-center gap-2 bg-green-600 text-white rounded-lg font-bold shadow hover:bg-green-700">
                                            <CheckCircle className="h-5 w-5" /> {content.providerDashboard.actions.complete}
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                    {filteredSchedule.length === 0 && (
                        <div className="text-center py-10 text-gray-500">No visits scheduled for this period.</div>
                    )}
                </div>
            </div>
        )}

        {activeTab === 'requests' && (
             <div className="space-y-4">
                 {requests.length === 0 ? (
                     <div className="text-center py-12 bg-white rounded-xl shadow-sm border border-gray-200">
                         <div className="bg-green-100 p-3 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                             <CheckCircle className="h-8 w-8 text-green-600" />
                         </div>
                         <h3 className="text-lg font-medium text-gray-900">All Caught Up!</h3>
                         <p className="text-gray-500">No new booking requests at the moment.</p>
                     </div>
                 ) : (
                     requests.map((req) => (
                        <div key={req.id} className="bg-white rounded-xl shadow border border-gray-200 p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                            <div>
                                <div className="flex items-center gap-3 mb-2">
                                    <h3 className="text-lg font-bold text-gray-900">{req.patient}</h3>
                                    <span className="bg-yellow-100 text-yellow-800 text-xs font-bold px-2 py-0.5 rounded">Pending Approval</span>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2 text-sm text-gray-600">
                                    <div className="flex items-center gap-2"><MapPin className="h-4 w-4" /> {req.address}</div>
                                    <div className="flex items-center gap-2"><Calendar className="h-4 w-4" /> {req.date}</div>
                                    <div className="flex items-center gap-2"><Clock className="h-4 w-4" /> {req.time}</div>
                                    <div className="flex items-center gap-2 capitalize"><Filter className="h-4 w-4" /> {req.type}</div>
                                </div>
                            </div>
                            <div className="flex gap-3 w-full md:w-auto">
                                <button 
                                    onClick={() => handleDecline(req.id)}
                                    className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-2.5 border border-red-200 text-red-600 rounded-lg hover:bg-red-50 font-medium transition-colors"
                                >
                                    <X className="h-4 w-4" /> {content.providerDashboard.actions.decline}
                                </button>
                                <button 
                                    onClick={() => handleApprove(req.id)}
                                    className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-2.5 bg-brand-teal text-white rounded-lg hover:bg-teal-800 font-medium transition-colors shadow-sm"
                                >
                                    <Check className="h-4 w-4" /> {content.providerDashboard.actions.approve}
                                </button>
                            </div>
                        </div>
                     ))
                 )}
             </div>
        )}

        {activeTab === 'messages' && (
            <div className="bg-white rounded-xl shadow border border-gray-200 divide-y divide-gray-100">
                {messages.map((msg) => (
                    <div key={msg.id} className="p-6 hover:bg-gray-50 transition-colors cursor-pointer flex gap-4">
                        <div className="bg-gray-100 p-3 rounded-full h-fit">
                            <User className="h-6 w-6 text-gray-500" />
                        </div>
                        <div className="flex-1">
                            <div className="flex justify-between items-start mb-1">
                                <h4 className="font-bold text-gray-900">{msg.from}</h4>
                                <span className="text-xs text-gray-400">{msg.time}</span>
                            </div>
                            <p className="text-gray-600 text-sm">{msg.text}</p>
                        </div>
                        <div className="self-center">
                            <MessageSquare className="h-5 w-5 text-gray-300" />
                        </div>
                    </div>
                ))}
            </div>
        )}

      </div>
    </div>
  );
};

export default ProviderDashboard;
