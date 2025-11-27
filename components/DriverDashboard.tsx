
import React, { useState } from 'react';
import { ContentData, ServiceType } from '../types';
import { MapPin, Navigation, ShoppingCart, CheckCircle, Filter, Car, X, Check, Clock, Package } from 'lucide-react';

interface DriverDashboardProps {
  content: ContentData;
}

const DriverDashboard: React.FC<DriverDashboardProps> = ({ content }) => {
  const [activeTab, setActiveTab] = useState<'trips' | 'requests'>('trips');
  const [filterType, setFilterType] = useState<'all' | 'subscription' | 'onetime'>('all');

  const [requests, setRequests] = useState([
    { id: 201, pickup: 'Kalanki, KTM', dropoff: 'Thamel, KTM', type: 'onetime' as ServiceType, client: 'Tourist Guest' },
  ]);

  const trips = [
    { id: 1, pickup: 'Bhatbhateni Supermarket, Koteshwor', dropoff: 'Ram Kumar\'s Residence, Tinkune', type: 'subscription', status: 'pending', task: 'Grocery', time: '10:00 AM' },
    { id: 2, pickup: 'Baneshwor Height', dropoff: 'Norvic Hospital', type: 'onetime', status: 'pending', task: 'Transport', time: '02:00 PM' },
    { id: 3, pickup: 'Lalitpur Grocery', dropoff: 'Sita Home, Patan', type: 'subscription', status: 'completed', task: 'Grocery', time: 'Yesterday' },
  ];

  const handleAccept = (id: number) => {
    setRequests(requests.filter(r => r.id !== id));
    alert("Trip Accepted");
  };

  const handleDecline = (id: number) => {
    setRequests(requests.filter(r => r.id !== id));
    alert("Trip Declined");
  };

  const openGoogleMaps = (address: string) => {
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
  };

  const filteredTrips = trips.filter(trip => filterType === 'all' || trip.type === filterType);

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-8">
      <div className="max-w-3xl mx-auto">
        <div className="flex justify-between items-center mb-6">
             <h1 className="text-2xl font-bold text-gray-900">{content.driverDashboard.title}</h1>
             
             {/* Tabs */}
             <div className="flex bg-white p-1 rounded-lg shadow-sm border border-gray-200">
                <button 
                    onClick={() => setActiveTab('trips')}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${activeTab === 'trips' ? 'bg-brand-orange text-white' : 'text-gray-600 hover:bg-gray-50'}`}
                >
                    {content.driverDashboard.tabs.trips}
                </button>
                <button 
                    onClick={() => setActiveTab('requests')}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-2 ${activeTab === 'requests' ? 'bg-brand-orange text-white' : 'text-gray-600 hover:bg-gray-50'}`}
                >
                    {content.driverDashboard.tabs.requests}
                    {requests.length > 0 && <span className="bg-red-500 text-white text-xs px-1.5 rounded-full">{requests.length}</span>}
                </button>
            </div>
        </div>

        {activeTab === 'trips' && (
            <div className="space-y-6">
                <div className="flex justify-end">
                    <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-md border border-gray-200">
                        <Filter className="h-4 w-4 text-gray-400" />
                        <select 
                            className="text-sm border-none focus:ring-0 text-gray-600 bg-transparent"
                            value={filterType}
                            onChange={(e) => setFilterType(e.target.value as any)}
                        >
                            <option value="all">{content.driverDashboard.filters.all}</option>
                            <option value="subscription">{content.driverDashboard.filters.subscription}</option>
                            <option value="onetime">{content.driverDashboard.filters.oneTime}</option>
                        </select>
                    </div>
                </div>

                {filteredTrips.map((trip) => (
                    <div key={trip.id} className="bg-white rounded-xl shadow border border-gray-200 overflow-hidden">
                        <div className={`p-4 text-white flex justify-between items-center ${trip.task === 'Grocery' ? 'bg-brand-orange' : 'bg-brand-teal'}`}>
                            <span className="font-bold flex items-center gap-2">
                                {trip.task === 'Grocery' ? <ShoppingCart className="h-5 w-5"/> : <Car className="h-5 w-5" />} 
                                {trip.task === 'Grocery' ? 'Grocery Run' : 'Transport Service'}
                            </span>
                            <div className="flex items-center gap-3">
                                <span className="text-sm bg-white/20 px-2 py-1 rounded flex items-center gap-1"><Clock className="h-3 w-3"/> {trip.time}</span>
                                {trip.status === 'pending' && <span className="text-sm bg-white/20 px-2 py-1 rounded">Active</span>}
                                {trip.status === 'completed' && <span className="text-sm bg-green-500/50 px-2 py-1 rounded flex items-center gap-1"><Check className="h-3 w-3" /> Done</span>}
                            </div>
                        </div>
                        <div className="p-6 space-y-6">
                            <div className="flex gap-4 relative">
                                <div className="flex flex-col items-center pt-1">
                                    <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
                                    <div className="w-0.5 h-full bg-gray-200 my-1"></div>
                                    <div className="w-3 h-3 bg-brand-teal rounded-full"></div>
                                </div>
                                <div className="flex-1 space-y-6">
                                    <div>
                                        <p className="text-xs text-gray-500 uppercase font-bold mb-1">{content.driverDashboard.labels.pickup}</p>
                                        <div className="flex justify-between items-start">
                                            <p className="text-gray-900 font-medium">{trip.pickup}</p>
                                            <a 
                                                href={openGoogleMaps(trip.pickup)} 
                                                target="_blank" 
                                                rel="noreferrer"
                                                className="text-brand-teal hover:bg-teal-50 p-1.5 rounded-full transition-colors"
                                                title={content.driverDashboard.actions.openMap}
                                            >
                                                <MapPin className="h-5 w-5" />
                                            </a>
                                        </div>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500 uppercase font-bold mb-1">{content.driverDashboard.labels.dropoff}</p>
                                        <div className="flex justify-between items-start">
                                            <p className="text-gray-900 font-medium">{trip.dropoff}</p>
                                            <a 
                                                href={openGoogleMaps(trip.dropoff)} 
                                                target="_blank" 
                                                rel="noreferrer"
                                                className="text-brand-orange hover:bg-orange-50 p-1.5 rounded-full transition-colors"
                                                title={content.driverDashboard.actions.openMap}
                                            >
                                                <MapPin className="h-5 w-5" />
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            {trip.status !== 'completed' && (
                                <div className="grid grid-cols-2 gap-3">
                                    <button className="flex items-center justify-center gap-2 py-3 bg-gray-100 text-gray-700 rounded-lg font-bold hover:bg-gray-200 transition-colors">
                                        <Navigation className="h-5 w-5" /> Navigation
                                    </button>
                                    <button className="flex items-center justify-center gap-2 py-3 bg-brand-teal text-white rounded-lg font-bold hover:bg-teal-900 shadow-md">
                                        <CheckCircle className="h-5 w-5" /> {content.driverDashboard.actions.complete}
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        )}

        {activeTab === 'requests' && (
            <div className="space-y-4">
                 {requests.map((req) => (
                     <div key={req.id} className="bg-white p-6 rounded-xl shadow-md border-l-4 border-brand-orange">
                         <div className="flex justify-between items-start mb-4">
                             <div>
                                 <h3 className="text-lg font-bold text-gray-900">{req.client}</h3>
                                 <div className="flex items-center gap-2 mt-1">
                                     <span className="text-xs px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200 uppercase font-bold tracking-wider">{req.type}</span>
                                     <span className="text-xs px-2 py-0.5 rounded bg-gray-100 text-gray-600 border border-gray-200 flex items-center gap-1"><Package className="h-3 w-3"/> Transport</span>
                                 </div>
                             </div>
                             <div className="text-right">
                                 <span className="block text-brand-orange font-bold">NPR 1,200</span>
                                 <span className="text-xs text-gray-400">Est. Earning</span>
                             </div>
                         </div>
                         
                         <div className="space-y-2 mb-6 text-sm text-gray-600">
                             <div className="flex gap-2">
                                 <span className="font-semibold w-16">From:</span>
                                 <span>{req.pickup}</span>
                             </div>
                             <div className="flex gap-2">
                                 <span className="font-semibold w-16">To:</span>
                                 <span>{req.dropoff}</span>
                             </div>
                         </div>

                         <div className="flex gap-3">
                             <button 
                                onClick={() => handleDecline(req.id)}
                                className="flex-1 py-2 border border-gray-300 text-gray-600 rounded-lg font-medium hover:bg-gray-50"
                             >
                                {content.driverDashboard.actions.decline}
                             </button>
                             <button 
                                onClick={() => handleAccept(req.id)}
                                className="flex-1 py-2 bg-brand-orange text-white rounded-lg font-medium hover:bg-orange-700 shadow-sm"
                             >
                                {content.driverDashboard.actions.accept}
                             </button>
                         </div>
                     </div>
                 ))}
                 {requests.length === 0 && (
                     <div className="text-center py-12 text-gray-500">No new trip requests.</div>
                 )}
            </div>
        )}

      </div>
    </div>
  );
};

export default DriverDashboard;
