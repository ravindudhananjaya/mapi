/// <reference types="vite/client" />
import React, { useState } from 'react';
import { ContentData, CheckoutSelection, ServiceInfo, User } from '../types';
import { apiClient } from '../src/api/client';
import { Shield, CreditCard, User as UserIcon, MapPin, Phone, FileText } from 'lucide-react';
import { loadStripe } from '@stripe/stripe-js';

// Initialize Stripe (Replace with your Publishable Key)
const stripePromise = loadStripe((import.meta as any).env.VITE_STRIPE_PUBLISHABLE_KEY || 'pk_test_placeholder');

interface CheckoutProps {
    content: ContentData;
    selection: CheckoutSelection | null;
    serviceInfo: ServiceInfo | null;
    onSuccess: () => void;
    user: User | null;
}

const Checkout: React.FC<CheckoutProps> = ({ content, selection, serviceInfo, onSuccess, user }) => {
    const [loading, setLoading] = useState(false);

    const handlePayment = async () => {
        setLoading(true);

        try {
            if (!selection) return;

            const stripe = await stripePromise;
            if (!stripe) {
                throw new Error("Stripe failed to load");
            }

            // Create Checkout Session
            const response = await apiClient.post('/payments/create-checkout-session', {
                items: [{
                    name: selection.type === 'plan' ? selection.data.name : selection.data.title,
                    price: parseInt(selection.data.price.replace(/[^0-9]/g, '')),
                    quantity: 1
                }],
                userEmail: user?.email,
                successUrl: `${window.location.origin}/payment-success`,
                cancelUrl: `${window.location.origin}/checkout`,
            });

            // Redirect to Stripe Checkout
            const result = await (stripe as any).redirectToCheckout({
                sessionId: response.id,
            });

            if (result.error) {
                alert(result.error.message);
                setLoading(false);
            }

        } catch (error) {
            console.error("Payment failed:", error);
            alert("Payment initialization failed. Please try again.");
            setLoading(false);
        }
    };

    if (!selection) {
        return <div className="p-20 text-center">No service selected.</div>;
    }

    const { type, data } = selection;
    const name = type === 'plan' ? data.name : data.title;
    const label = type === 'plan' ? content.checkout.planLabel : content.checkout.serviceLabel;
    const cycle = type === 'plan' ? 'Monthly' : 'One-Time';

    return (
        <div className="bg-gray-50 min-h-screen py-16 relative overflow-hidden">
            {/* Decorative background */}
            <div className="absolute top-0 left-0 right-0 h-96 bg-gradient-to-b from-teal-50/50 to-transparent pointer-events-none" />
            <div className="absolute top-20 left-10 w-72 h-72 bg-brand-teal/5 rounded-full blur-3xl" />
            <div className="absolute top-40 right-10 w-96 h-96 bg-brand-orange/5 rounded-full blur-3xl" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="mb-10">
                    <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">{content.checkout.title}</h1>
                    <p className="text-gray-500 mt-2 text-lg">Complete your booking securely.</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    <div className="space-y-8">
                        {/* Order Summary */}
                        <div className="glass-panel p-8 rounded-3xl shadow-xl border border-white/20 relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-teal/10 rounded-bl-full -mr-10 -mt-10 transition-transform group-hover:scale-150" />

                            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                                <div className="p-2 bg-brand-teal/10 rounded-lg">
                                    <FileText className="h-5 w-5 text-brand-teal" />
                                </div>
                                {content.checkout.summaryTitle}
                            </h2>

                            <div className="border-t border-b border-gray-100 py-6 space-y-4 relative z-10">
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-600 font-medium">{label}</span>
                                    <span className="font-bold text-gray-900 text-lg">{name}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-600 font-medium">Billing Type</span>
                                    <span className="font-bold text-gray-900 bg-gray-100 px-3 py-1 rounded-full text-sm">{cycle}</span>
                                </div>
                            </div>
                            <div className="flex justify-between items-center py-6 relative z-10">
                                <span className="text-xl font-bold text-gray-900">{content.checkout.totalLabel}</span>
                                <span className="text-3xl font-extrabold text-brand-orange tracking-tight">{data.price}</span>
                            </div>

                            <div className="mt-4 bg-blue-50/50 p-4 rounded-xl flex items-start gap-3 border border-blue-100">
                                <Shield className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                                <p className="text-sm text-blue-800 font-medium leading-relaxed">{content.checkout.secureText}</p>
                            </div>
                        </div>

                        {/* Patient Info Summary */}
                        {serviceInfo && (
                            <div className="glass-panel p-8 rounded-3xl shadow-xl border border-white/20 relative overflow-hidden group">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-brand-orange/10 rounded-bl-full -mr-10 -mt-10 transition-transform group-hover:scale-150" />

                                <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                                    <div className="p-2 bg-brand-orange/10 rounded-lg">
                                        <UserIcon className="h-5 w-5 text-brand-orange" />
                                    </div>
                                    Patient Information
                                </h2>

                                <div className="space-y-6 relative z-10">
                                    <div className="flex items-start gap-4 p-4 bg-gray-50/50 rounded-2xl border border-gray-100">
                                        <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm text-gray-400 font-bold text-lg">
                                            {serviceInfo.patientName.charAt(0)}
                                        </div>
                                        <div>
                                            <p className="font-bold text-gray-900 text-lg">{serviceInfo.patientName}</p>
                                            <p className="text-sm text-gray-500 font-medium">{serviceInfo.age} years • {serviceInfo.gender}</p>
                                        </div>
                                    </div>

                                    <div className="space-y-4 pl-2">
                                        <div className="flex items-start gap-4">
                                            <MapPin className="h-5 w-5 text-gray-400 mt-0.5" />
                                            <p className="text-gray-700 font-medium">{serviceInfo.address}</p>
                                        </div>
                                        <div className="flex items-start gap-4">
                                            <Phone className="h-5 w-5 text-gray-400 mt-0.5" />
                                            <p className="text-gray-700 font-medium">{serviceInfo.phone}</p>
                                        </div>
                                        {serviceInfo.medicalConditions && (
                                            <div className="flex items-start gap-4">
                                                <FileText className="h-5 w-5 text-gray-400 mt-0.5" />
                                                <div>
                                                    <p className="text-sm font-bold text-gray-900 uppercase tracking-wide mb-1">Medical Conditions</p>
                                                    <p className="text-sm text-gray-600 leading-relaxed">{serviceInfo.medicalConditions}</p>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Payment Methods */}
                    <div className="space-y-8">
                        <div>
                            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                                <div className="p-2 bg-gray-100 rounded-lg">
                                    <CreditCard className="h-5 w-5 text-gray-600" />
                                </div>
                                {content.checkout.paymentMethodLabel}
                            </h2>

                            <div className="grid gap-4">
                                {/* Stripe Only */}
                                <div className="relative bg-white border border-brand-teal ring-4 ring-brand-teal/10 shadow-lg rounded-2xl transition-all overflow-hidden">
                                    <label className="flex items-center gap-5 cursor-pointer p-6 w-full">
                                        <div className="flex items-center justify-center">
                                            <input
                                                type="radio"
                                                name="payment"
                                                className="h-5 w-5 text-brand-teal focus:ring-brand-teal border-gray-300"
                                                checked={true}
                                                readOnly
                                            />
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex justify-between items-center mb-1">
                                                <span className="font-bold text-gray-900 text-lg">Credit / Debit Card</span>
                                                <div className="flex gap-1">
                                                    <div className="h-6 w-8 bg-gray-100 rounded border border-gray-200" />
                                                    <div className="h-6 w-8 bg-gray-100 rounded border border-gray-200" />
                                                </div>
                                            </div>
                                            <span className="text-sm text-gray-500 font-medium">Powered by Stripe</span>
                                        </div>
                                    </label>
                                </div>
                            </div>
                        </div>

                        <button
                            onClick={handlePayment}
                            disabled={loading}
                            className={`w-full flex items-center justify-center py-4 px-6 border border-transparent rounded-xl shadow-lg text-lg font-bold text-white bg-brand-orange hover:bg-orange-700 focus:outline-none focus:ring-4 focus:ring-brand-orange/30 transition-all transform active:scale-[0.98] ${loading ? 'opacity-70 cursor-not-allowed' : 'hover:shadow-xl hover:shadow-brand-orange/20'}`}
                        >
                            {loading ? (
                                <span className="flex items-center gap-2">
                                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Processing...
                                </span>
                            ) : (
                                "Pay with Card"
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;