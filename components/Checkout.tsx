import React, { useState } from 'react';
import { ContentData, CheckoutSelection } from '../types';
import { Shield, CreditCard } from 'lucide-react';

interface CheckoutProps {
  content: ContentData;
  selection: CheckoutSelection | null;
  onSuccess: () => void;
}

const Checkout: React.FC<CheckoutProps> = ({ content, selection, onSuccess }) => {
  const [loading, setLoading] = useState(false);

  const handlePayment = () => {
    setLoading(true);
    // Simulate payment delay
    setTimeout(() => {
        setLoading(false);
        onSuccess();
    }, 2000);
  };

  if (!selection) {
      return <div className="p-20 text-center">No service selected.</div>;
  }

  const { type, data } = selection;
  const name = type === 'plan' ? data.name : data.title;
  const label = type === 'plan' ? content.checkout.planLabel : content.checkout.serviceLabel;
  const cycle = type === 'plan' ? 'Monthly' : 'One-Time';

  return (
    <div className="bg-gray-50 min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-8">{content.checkout.title}</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Order Summary */}
            <div className="bg-white p-8 rounded-xl shadow-md h-fit">
                <h2 className="text-xl font-bold text-gray-900 mb-6">{content.checkout.summaryTitle}</h2>
                <div className="border-t border-b border-gray-100 py-6 space-y-4">
                    <div className="flex justify-between items-center">
                        <span className="text-gray-600">{label}</span>
                        <span className="font-semibold text-gray-900 text-lg">{name}</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-gray-600">Billing Type</span>
                        <span className="font-medium text-gray-900">{cycle}</span>
                    </div>
                </div>
                <div className="flex justify-between items-center py-6">
                    <span className="text-xl font-bold text-gray-900">{content.checkout.totalLabel}</span>
                    <span className="text-2xl font-bold text-brand-orange">{data.price}</span>
                </div>
                
                <div className="mt-4 bg-blue-50 p-4 rounded-lg flex items-start gap-3">
                    <Shield className="h-5 w-5 text-blue-600 mt-0.5" />
                    <p className="text-sm text-blue-800 font-medium">{content.checkout.secureText}</p>
                </div>
            </div>

            {/* Payment Methods */}
            <div className="space-y-6">
                <h2 className="text-xl font-bold text-gray-900">{content.checkout.paymentMethodLabel}</h2>
                
                <div className="grid gap-4">
                    <label className="relative bg-white border border-gray-200 p-4 rounded-xl cursor-pointer hover:border-brand-teal transition-all flex items-center gap-4">
                        <input type="radio" name="payment" className="h-5 w-5 text-brand-teal focus:ring-brand-teal" defaultChecked />
                        <div className="flex-1">
                            <span className="font-bold text-gray-900 block">eSewa Mobile Wallet</span>
                            <span className="text-sm text-gray-500">Fast and secure payment via eSewa</span>
                        </div>
                        <CreditCard className="h-6 w-6 text-green-600" />
                    </label>

                    <label className="relative bg-white border border-gray-200 p-4 rounded-xl cursor-pointer hover:border-brand-teal transition-all flex items-center gap-4">
                        <input type="radio" name="payment" className="h-5 w-5 text-brand-teal focus:ring-brand-teal" />
                        <div className="flex-1">
                            <span className="font-bold text-gray-900 block">Khalti Digital Wallet</span>
                            <span className="text-sm text-gray-500">Pay easily using Khalti</span>
                        </div>
                        <CreditCard className="h-6 w-6 text-purple-600" />
                    </label>

                    <label className="relative bg-white border border-gray-200 p-4 rounded-xl cursor-pointer hover:border-brand-teal transition-all flex items-center gap-4">
                        <input type="radio" name="payment" className="h-5 w-5 text-brand-teal focus:ring-brand-teal" />
                        <div className="flex-1">
                            <span className="font-bold text-gray-900 block">Credit / Debit Card (Stripe)</span>
                            <span className="text-sm text-gray-500">Visa, Mastercard, American Express</span>
                        </div>
                        <CreditCard className="h-6 w-6 text-blue-600" />
                    </label>
                </div>

                <button 
                    onClick={handlePayment}
                    disabled={loading}
                    className={`w-full flex items-center justify-center py-4 px-6 border border-transparent rounded-lg shadow-sm text-lg font-bold text-white bg-brand-orange hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-orange transition-all ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                >
                    {loading ? 'Processing...' : content.checkout.payButton}
                </button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;