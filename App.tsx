
import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import Features from './components/Features';
import Footer from './components/Footer';
import About from './components/About';
import Process from './components/Process';
import ContactPage from './components/ContactPage';
import Auth from './components/Auth';
import Checkout from './components/Checkout';
import PaymentSuccess from './components/PaymentSuccess';
import Dashboard from './components/Dashboard';
import AdminDashboard from './components/AdminDashboard';
import ProviderDashboard from './components/ProviderDashboard';
import DriverDashboard from './components/DriverDashboard';
import { CONTENT } from './constants';
import { Language, Page, PricingTier, ServiceItem, CheckoutSelection, User, UserRole } from './types';

function App() {
  const [lang, setLang] = useState<Language>(Language.EN);
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [selection, setSelection] = useState<CheckoutSelection | null>(null);
  const [activeSubscription, setActiveSubscription] = useState<CheckoutSelection | null>(null);
  const [user, setUser] = useState<User | null>(null);
  
  const content = CONTENT[lang];

  const handlePlanSelect = (plan: PricingTier) => {
    setSelection({ type: 'plan', data: plan });
    if (!user) {
        setCurrentPage('login');
    } else {
        setCurrentPage('checkout');
    }
  };

  const handleServiceSelect = (service: ServiceItem) => {
    setSelection({ type: 'service', data: service });
    if (!user) {
        setCurrentPage('login');
    } else {
        setCurrentPage('checkout');
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
        setCurrentPage('admin-dashboard');
    } else if (role === 'provider') {
        setCurrentPage('provider-dashboard');
    } else if (role === 'driver') {
        setCurrentPage('driver-dashboard');
    } else {
        // Family User
        if (selection) {
          setCurrentPage('checkout');
        } else {
          setCurrentPage('services');
        }
    }
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentPage('home');
  };

  const handleCheckoutSuccess = () => {
      setActiveSubscription(selection); // Save the purchase
      setCurrentPage('payment-success');
  };

  const handleGoToDashboard = () => {
      setSelection(null); 
      setCurrentPage('dashboard');
  }

  // Simple Router
  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return (
          <>
            <Hero content={content} onCtaClick={() => setCurrentPage('services')} />
            <Features content={content} />
            <div className="bg-gray-50 py-12 text-center">
               <h2 className="text-3xl font-bold mb-6 text-gray-900">{content.pricing.title}</h2>
               <p className="mb-8 text-gray-600 max-w-2xl mx-auto px-4">{content.pricing.subtitle}</p>
               <button 
                 onClick={() => setCurrentPage('services')}
                 className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-brand-teal hover:bg-teal-900 md:py-4 md:text-lg transition-all"
               >
                 View All Packages
               </button>
            </div>
            <Process content={content} />
          </>
        );
      case 'services':
        return <Services content={content} onSelectPlan={handlePlanSelect} onSelectService={handleServiceSelect} />;
      case 'about':
        return <About content={content} />;
      case 'contact':
        return <ContactPage content={content} />;
      case 'login':
        return <Auth content={content} initialMode="login" onAuthSuccess={handleAuthSuccess} onSwitchMode={(mode) => setCurrentPage(mode)} />;
      case 'register':
        return <Auth content={content} initialMode="register" onAuthSuccess={handleAuthSuccess} onSwitchMode={(mode) => setCurrentPage(mode)} />;
      case 'checkout':
        return <Checkout content={content} selection={selection} onSuccess={handleCheckoutSuccess} />;
      case 'payment-success':
        return <PaymentSuccess content={content} selection={selection || activeSubscription} onGoToDashboard={handleGoToDashboard} />;
      case 'dashboard':
        return <Dashboard content={content} activeSelection={activeSubscription} user={user} onBookService={handleServiceSelect} />;
      case 'admin-dashboard':
        return <AdminDashboard content={content} />;
      case 'provider-dashboard':
        return <ProviderDashboard content={content} />;
      case 'driver-dashboard':
        return <DriverDashboard content={content} />;
      default:
        return <Hero content={content} onCtaClick={() => setCurrentPage('services')} />;
    }
  };

  return (
    <div className="min-h-screen bg-white font-sans flex flex-col">
      <Navbar 
        content={content} 
        lang={lang} 
        setLang={setLang} 
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        user={user}
        onLogout={handleLogout}
      />
      
      <main className="flex-grow">
        {renderPage()}
      </main>

      <Footer content={content} />
    </div>
  );
}

export default App;
