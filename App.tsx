import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import Features from './components/Features';
import Footer from './components/Footer';
import About from './components/About';
import Process from './components/Process';
import Testimonials from './components/Testimonials';
import Partners from './components/Partners';
import AppShowcase from './components/AppShowcase';
import ContactPage from './components/ContactPage';
import Auth from './components/Auth';
import Checkout from './components/Checkout';
import PaymentSuccess from './components/PaymentSuccess';
import Dashboard from './components/Dashboard';
import AdminDashboard from './components/AdminDashboard';
import ProviderDashboard from './components/ProviderDashboard';
import ProviderSchedule from './components/ProviderSchedule';
import ProviderPatients from './components/ProviderPatients';
import DriverDashboard from './components/DriverDashboard';
import DriverTrips from './components/DriverTrips';
import DriverSchedule from './components/DriverSchedule';
import ServiceInfoPage from './components/ServiceInfo';
import ServiceSelection from './components/ServiceSelection';
import SubscriptionPlans from './components/SubscriptionPlans';
import OneTimeServices from './components/OneTimeServices';
import DashboardLayout from './components/DashboardLayout';
import Settings from './components/Settings';
import BookService from './components/BookService';
import BookSubscription from './components/BookSubscription';
import BookOneTimeService from './components/BookOneTimeService';
import Report from './components/Report';
import ReportView from './components/ReportView';
import { CONTENT } from './constants';
import { Language, PricingTier, ServiceItem, CheckoutSelection, User, UserRole, ServiceInfo } from './types';

function AppContent() {
  const [lang, setLang] = useState<Language>(Language.EN);
  const [selection, setSelection] = useState<CheckoutSelection | null>(null);
  const [activeSubscription, setActiveSubscription] = useState<CheckoutSelection | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [serviceInfo, setServiceInfo] = useState<ServiceInfo | null>(null);

  const navigate = useNavigate();
  const location = useLocation();
  const content = CONTENT[lang];

  const handlePlanSelect = (plan: PricingTier) => {
    setSelection({ type: 'plan', data: plan });
    if (!user) {
      navigate('/login');
    } else {
      navigate('/service-info');
    }
  };

  const handleServiceSelect = (service: ServiceItem) => {
    setSelection({ type: 'service', data: service });
    if (!user) {
      navigate('/login');
    } else {
      navigate('/service-info');
    }
  };

  const handleServiceInfoSubmit = (info: ServiceInfo) => {
    setServiceInfo(info);
    navigate('/checkout');
  };

  const handleServiceTypeSelect = (type: 'subscription' | 'onetime') => {
    if (type === 'subscription') {
      navigate('/subscription-plans');
    } else {
      navigate('/onetime-services');
    }
  };

  const handleAuthSuccess = (role: UserRole) => {
    // Simulate user data with role
    setUser({
      name: role === 'family' ? "Ram Kumar" : role === 'admin' ? "Admin User" : role === 'provider' ? "Sita Sharma" : "Driver Hari",
      email: "user@example.com",
      role: role
    });

    // Redirect based on role
    if (role === 'admin') {
      navigate('/admin-dashboard');
    } else if (role === 'provider') {
      navigate('/provider-dashboard');
    } else if (role === 'driver') {
      navigate('/driver-dashboard');
    } else {
      // Family User
      if (selection) {
        navigate('/service-info');
      } else {
        // NEW FLOW: Go to Service Selection instead of Services directly
        navigate('/service-selection');
      }
    }
  };

  const handleLogout = () => {
    setUser(null);
    setSelection(null);
    setServiceInfo(null);
    navigate('/');
  };

  const handleCheckoutSuccess = () => {
    setActiveSubscription(selection); // Save the purchase
    navigate('/payment-success');
  };

  const handleGoToDashboard = () => {
    setSelection(null);
    setServiceInfo(null);
    navigate('/dashboard');
  }

  // Helper to determine if we are on a dashboard page
  const isDashboardPage = ['/dashboard', '/admin-dashboard', '/provider-dashboard', '/driver-dashboard', '/settings'].includes(location.pathname);

  return (
    <div className="min-h-screen bg-white font-sans flex flex-col">
      {!user && (
        <Navbar
          content={content}
          lang={lang}
          setLang={setLang}
          user={user}
          onLogout={handleLogout}
        />
      )}

      <main className="flex-grow">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={
            <>
              <Hero content={content} onCtaClick={() => navigate('/services')} />
              <Features content={content} />
              <AppShowcase content={content} />
              <Process content={content} />
              <Partners content={content} />
              <Testimonials content={content} />
              <div className="bg-gray-50 py-24 text-center">
                <h2 className="text-3xl font-bold mb-6 text-gray-900">{content.pricing.title}</h2>
                <p className="mb-8 text-gray-600 max-w-2xl mx-auto px-4">{content.pricing.subtitle}</p>
                <button
                  onClick={() => navigate('/services')}
                  className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-full text-white bg-brand-teal hover:bg-teal-900 md:py-4 md:text-lg transition-all shadow-lg"
                >
                  View All Packages
                </button>
              </div>
            </>
          } />
          <Route path="/services" element={<Services content={content} onSelectPlan={handlePlanSelect} onSelectService={handleServiceSelect} />} />
          <Route path="/about" element={<About content={content} />} />
          <Route path="/contact" element={<ContactPage content={content} />} />
          <Route path="/login" element={<Auth content={content} initialMode="login" onAuthSuccess={handleAuthSuccess} onSwitchMode={(mode) => navigate(`/${mode}`)} />} />
          <Route path="/register" element={<Auth content={content} initialMode="register" onAuthSuccess={handleAuthSuccess} onSwitchMode={(mode) => navigate(`/${mode}`)} />} />

          {/* Booking Flow */}
          <Route path="/book-service" element={<BookService content={content} onSelectType={handleServiceTypeSelect} />} />
          <Route path="/book-subscription" element={
            user ? (
              <DashboardLayout user={user} onLogout={handleLogout}>
                <BookSubscription content={content} onSelectPlan={handlePlanSelect} />
              </DashboardLayout>
            ) : (
              <BookSubscription content={content} onSelectPlan={handlePlanSelect} />
            )
          } />
          <Route path="/book-onetime" element={
            user ? (
              <DashboardLayout user={user} onLogout={handleLogout}>
                <BookOneTimeService content={content} onSelectService={handleServiceSelect} />
              </DashboardLayout>
            ) : (
              <BookOneTimeService content={content} onSelectService={handleServiceSelect} />
            )
          } />
          <Route path="/service-selection" element={<ServiceSelection content={content} onSelectType={handleServiceTypeSelect} />} />
          <Route path="/subscription-plans" element={<SubscriptionPlans content={content} onSelectPlan={handlePlanSelect} />} />
          <Route path="/onetime-services" element={<OneTimeServices content={content} onSelectService={handleServiceSelect} />} />
          <Route path="/service-info" element={<ServiceInfoPage content={content} selection={selection} onSubmit={handleServiceInfoSubmit} />} />
          <Route path="/checkout" element={<Checkout content={content} selection={selection} serviceInfo={serviceInfo} onSuccess={handleCheckoutSuccess} />} />
          <Route path="/payment-success" element={<PaymentSuccess content={content} selection={selection || activeSubscription} onGoToDashboard={handleGoToDashboard} />} />

          {/* Dashboard Routes */}
          <Route path="/dashboard" element={
            user ? (
              <DashboardLayout user={user} onLogout={handleLogout}>
                <Dashboard content={content} activeSelection={activeSubscription} user={user} onBookService={handleServiceSelect} />
              </DashboardLayout>
            ) : <Navigate to="/login" />
          } />
          <Route path="/admin-dashboard" element={
            user ? (
              <DashboardLayout user={user} onLogout={handleLogout}>
                <AdminDashboard content={content} initialTab="overview" />
              </DashboardLayout>
            ) : <Navigate to="/login" />
          } />
          <Route path="/admin-staff" element={
            user ? (
              <DashboardLayout user={user} onLogout={handleLogout}>
                <AdminDashboard content={content} initialTab="staff" />
              </DashboardLayout>
            ) : <Navigate to="/login" />
          } />
          <Route path="/admin-customers" element={
            user ? (
              <DashboardLayout user={user} onLogout={handleLogout}>
                <AdminDashboard content={content} initialTab="customers" />
              </DashboardLayout>
            ) : <Navigate to="/login" />
          } />
          <Route path="/admin-reports" element={
            user ? (
              <DashboardLayout user={user} onLogout={handleLogout}>
                <AdminDashboard content={content} initialTab="reports" />
              </DashboardLayout>
            ) : <Navigate to="/login" />
          } />
          <Route path="/provider-dashboard" element={
            user ? (
              <DashboardLayout user={user} onLogout={handleLogout}>
                <ProviderDashboard content={content} />
              </DashboardLayout>
            ) : <Navigate to="/login" />
          } />
          <Route path="/provider-schedule" element={
            user ? (
              <DashboardLayout user={user} onLogout={handleLogout}>
                <ProviderSchedule content={content} />
              </DashboardLayout>
            ) : <Navigate to="/login" />
          } />
          <Route path="/provider-patients" element={
            user ? (
              <DashboardLayout user={user} onLogout={handleLogout}>
                <ProviderPatients content={content} />
              </DashboardLayout>
            ) : <Navigate to="/login" />
          } />
          <Route path="/driver-dashboard" element={
            user ? (
              <DashboardLayout user={user} onLogout={handleLogout}>
                <DriverDashboard content={content} />
              </DashboardLayout>
            ) : <Navigate to="/login" />
          } />
          <Route path="/driver-trips" element={
            user ? (
              <DashboardLayout user={user} onLogout={handleLogout}>
                <DriverTrips content={content} />
              </DashboardLayout>
            ) : <Navigate to="/login" />
          } />
          <Route path="/driver-schedule" element={
            user ? (
              <DashboardLayout user={user} onLogout={handleLogout}>
                <DriverSchedule content={content} />
              </DashboardLayout>
            ) : <Navigate to="/login" />
          } />
          <Route path="/reports" element={
            user ? (
              <DashboardLayout user={user} onLogout={handleLogout}>
                <Report content={content} />
              </DashboardLayout>
            ) : <Navigate to="/login" />
          } />
          <Route path="/reports/:id" element={
            user ? (
              <DashboardLayout user={user} onLogout={handleLogout}>
                <ReportView content={content} />
              </DashboardLayout>
            ) : <Navigate to="/login" />
          } />
          <Route path="/settings" element={
            user ? (
              <DashboardLayout user={user} onLogout={handleLogout}>
                <Settings content={content} user={user} />
              </DashboardLayout>
            ) : <Navigate to="/login" />
          } />
        </Routes>
      </main>

      {!user && <Footer content={content} />}
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
