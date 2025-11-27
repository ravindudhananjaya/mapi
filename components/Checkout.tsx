import React, { useState } from 'react';
import { ContentData, CheckoutSelection, ServiceInfo } from '../types';
import { Shield, CreditCard, User, MapPin, Phone, FileText } from 'lucide-react';
import CryptoJS from 'crypto-js';

interface CheckoutProps {
    content: ContentData;
    selection: CheckoutSelection | null;
    serviceInfo: ServiceInfo | null;
    onSuccess: () => void;
}

const Checkout: React.FC<CheckoutProps> = ({ content, selection, serviceInfo, onSuccess }) => {
    const [loading, setLoading] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState<'esewa' | 'khalti' | 'stripe'>('esewa');

    // Stripe Form State
    const [cardNumber, setCardNumber] = useState('');
    const [expiry, setExpiry] = useState('');
    const [cvc, setCvc] = useState('');

    const generateEsewaSignature = (totalAmount: string, transactionUuid: string, productCode: string) => {
        const secret = "8gBm/:&EnhH.1/q"; // eSewa Test Secret Key
        const signatureString = `total_amount=${totalAmount},transaction_uuid=${transactionUuid},product_code=${productCode}`;
        const hash = CryptoJS.HmacSHA256(signatureString, secret);
        const signature = CryptoJS.enc.Base64.stringify(hash);
        return signature;
    };

    const handlePayment = () => {
        setLoading(true);

        if (paymentMethod === 'esewa') {
            const amount = selection?.data.price.replace(/[^0-9]/g, '') || '1000';
            const taxAmount = '0';
            const totalAmount = amount;
            const transactionUuid = `TXN-${Date.now()}`;
            const productCode = 'EPAYTEST';
            const successUrl = `${window.location.origin}/?payment_success=true`;
            const failureUrl = `${window.location.origin}/?payment_failure=true`;

            const signature = generateEsewaSignature(totalAmount, transactionUuid, productCode);

            // Create a hidden form and submit it
            const form = document.createElement('form');
            form.action = 'https://rc-epay.esewa.com.np/api/epay/main/v2/form';
            form.method = 'POST';
            form.target = '_blank'; // Open in new tab

            const fields = {
                amount: amount,
                tax_amount: taxAmount,
                total_amount: totalAmount,
                transaction_uuid: transactionUuid,
                product_code: productCode,
                product_service_charge: '0',
                product_delivery_charge: '0',
                success_url: successUrl,
                failure_url: failureUrl,
                signed_field_names: 'total_amount,transaction_uuid,product_code',
                signature: signature,
            };

            for (const key in fields) {
                const input = document.createElement('input');
                input.type = 'hidden';
                input.name = key;
                input.value = fields[key as keyof typeof fields];
                form.appendChild(input);
            }

            document.body.appendChild(form);
            form.submit();
            document.body.removeChild(form);

            // Simulate success for the SPA flow
            setTimeout(() => {
                setLoading(false);
                onSuccess();
            }, 5000);

        } else if (paymentMethod === 'stripe') {
            // Simulate Stripe Payment Processing
            if (!cardNumber || !expiry || !cvc) {
                alert("Please fill in the card details (Simulated)");
                setLoading(false);
                return;
            }

            setTimeout(() => {
                setLoading(false);
                onSuccess();
            }, 2000);
        } else {
            // Khalti Simulation
            setTimeout(() => {
                setLoading(false);
                onSuccess();
            }, 2000);
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
        <div className="bg-gray-50 min-h-screen py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-extrabold text-gray-900 mb-8">{content.checkout.title}</h1>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    <div className="space-y-8">
                        {/* Order Summary */}
                        <div className="bg-white p-8 rounded-xl shadow-md">
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

                        {/* Patient Info Summary */}
                        {serviceInfo && (
                            <div className="bg-white p-8 rounded-xl shadow-md">
                                <h2 className="text-xl font-bold text-gray-900 mb-6">Patient Information</h2>
                                <div className="space-y-4">
                                    <div className="flex items-start gap-3">
                                        <User className="h-5 w-5 text-gray-400 mt-0.5" />
                                        <div>
                                            <p className="font-medium text-gray-900">{serviceInfo.patientName}</p>
                                            <p className="text-sm text-gray-500">{serviceInfo.age} years • {serviceInfo.gender}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <MapPin className="h-5 w-5 text-gray-400 mt-0.5" />
                                        <p className="text-gray-600">{serviceInfo.address}</p>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <Phone className="h-5 w-5 text-gray-400 mt-0.5" />
                                        <p className="text-gray-600">{serviceInfo.phone}</p>
                                    </div>
                                    {serviceInfo.medicalConditions && (
                                        <div className="flex items-start gap-3">
                                            <FileText className="h-5 w-5 text-gray-400 mt-0.5" />
                                            <div>
                                                <p className="text-sm font-medium text-gray-700">Medical Conditions:</p>
                                                <p className="text-sm text-gray-600">{serviceInfo.medicalConditions}</p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Payment Methods */}
                    <div className="space-y-6">
                        <h2 className="text-xl font-bold text-gray-900">{content.checkout.paymentMethodLabel}</h2>

                        <div className="grid gap-4">
                            {/* eSewa */}
                            <label className={`relative bg-white border p-4 rounded-xl cursor-pointer transition-all flex items-center gap-4 ${paymentMethod === 'esewa' ? 'border-brand-teal ring-2 ring-brand-teal ring-opacity-50' : 'border-gray-200 hover:border-brand-teal'}`}>
                                <input
                                    type="radio"
                                    name="payment"
                                    className="h-5 w-5 text-brand-teal focus:ring-brand-teal"
                                    checked={paymentMethod === 'esewa'}
                                    onChange={() => setPaymentMethod('esewa')}
                                />
                                <div className="flex-1">
                                    <span className="font-bold text-gray-900 block">eSewa Mobile Wallet</span>
                                    <span className="text-sm text-gray-500">Fast and secure payment via eSewa</span>
                                </div>
                                <div className="bg-green-500 text-white text-xs font-bold px-2 py-1 rounded">eSewa</div>
                            </label>

                            {/* Khalti */}
                            <label className={`relative bg-white border p-4 rounded-xl cursor-pointer transition-all flex items-center gap-4 ${paymentMethod === 'khalti' ? 'border-brand-teal ring-2 ring-brand-teal ring-opacity-50' : 'border-gray-200 hover:border-brand-teal'}`}>
                                <input
                                    type="radio"
                                    name="payment"
                                    className="h-5 w-5 text-brand-teal focus:ring-brand-teal"
                                    checked={paymentMethod === 'khalti'}
                                    onChange={() => setPaymentMethod('khalti')}
                                />
                                <div className="flex-1">
                                    <span className="font-bold text-gray-900 block">Khalti Digital Wallet</span>
                                    <span className="text-sm text-gray-500">Pay easily using Khalti</span>
                                </div>
                                <div className="bg-purple-600 text-white text-xs font-bold px-2 py-1 rounded">Khalti</div>
                            </label>

                            {/* Stripe */}
                            <div className={`relative bg-white border p-4 rounded-xl transition-all ${paymentMethod === 'stripe' ? 'border-brand-teal ring-2 ring-brand-teal ring-opacity-50' : 'border-gray-200 hover:border-brand-teal'}`}>
                                <label className="flex items-center gap-4 cursor-pointer mb-4">
                                    <input
                                        type="radio"
                                        name="payment"
                                        className="h-5 w-5 text-brand-teal focus:ring-brand-teal"
                                        checked={paymentMethod === 'stripe'}
                                        onChange={() => setPaymentMethod('stripe')}
                                    />
                                    <div className="flex-1">
                                        <span className="font-bold text-gray-900 block">Credit / Debit Card (Stripe)</span>
                                        <span className="text-sm text-gray-500">Visa, Mastercard, American Express</span>
                                    </div>
                                    <CreditCard className="h-6 w-6 text-blue-600" />
                                </label>

                                {paymentMethod === 'stripe' && (
                                    <div className="mt-4 space-y-4 border-t border-gray-100 pt-4">
                                        <div>
                                            <label className="block text-xs font-bold text-gray-700 mb-1">Card Number</label>
                                            <input
                                                type="text"
                                                placeholder="0000 0000 0000 0000"
                                                className="block w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-brand-teal focus:border-brand-teal"
                                                value={cardNumber}
                                                onChange={(e) => setCardNumber(e.target.value)}
                                            />
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-xs font-bold text-gray-700 mb-1">Expiry Date</label>
                                                <input
                                                    type="text"
                                                    placeholder="MM/YY"
                                                    className="block w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-brand-teal focus:border-brand-teal"
                                                    value={expiry}
                                                    onChange={(e) => setExpiry(e.target.value)}
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-bold text-gray-700 mb-1">CVC</label>
                                                <input
                                                    type="text"
                                                    placeholder="123"
                                                    className="block w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-brand-teal focus:border-brand-teal"
                                                    value={cvc}
                                                    onChange={(e) => setCvc(e.target.value)}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        <button
                            onClick={handlePayment}
                            disabled={loading}
                            className={`w-full flex items-center justify-center py-4 px-6 border border-transparent rounded-lg shadow-sm text-lg font-bold text-white bg-brand-orange hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-orange transition-all ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                        >
                            {loading ? 'Processing...' : content.checkout.payButton}
                        </button>

                        {paymentMethod === 'esewa' && (
                            <p className="text-xs text-center text-gray-500 mt-2">
                                You will be redirected to eSewa to complete your payment.
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;