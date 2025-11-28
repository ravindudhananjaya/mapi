import React from 'react';
import { ContentData, CheckoutSelection } from '../types';
import { CheckCircle, Download, ArrowRight } from 'lucide-react';

interface PaymentSuccessProps {
  content: ContentData;
  selection: CheckoutSelection | null;
  onGoToDashboard: () => void;
}

const PaymentSuccess: React.FC<PaymentSuccessProps> = ({ content, selection, onGoToDashboard }) => {
  const transactionId = "TXN-" + Math.floor(Math.random() * 1000000);
  const date = new Date().toLocaleDateString();
  const itemName = selection?.type === 'plan' ? selection.data.name : selection?.data.title || 'Service';
  const price = selection?.type === 'plan' ? selection.data.price : selection?.data.price || 'NPR 0';

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4 py-12 relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute top-0 left-0 right-0 h-96 bg-gradient-to-b from-teal-50/50 to-transparent pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl h-full pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-brand-teal/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-brand-orange/5 rounded-full blur-3xl" />
      </div>

      <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full overflow-hidden relative z-10 border border-white/20">
        <div className="bg-gradient-to-br from-brand-teal to-teal-800 p-10 text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
          <div className="mx-auto bg-white/20 w-24 h-24 rounded-full flex items-center justify-center mb-6 backdrop-blur-sm shadow-inner ring-4 ring-white/10">
            <CheckCircle className="h-14 w-14 text-white drop-shadow-md" />
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight mb-2">{content.paymentSuccess.title}</h1>
          <p className="text-teal-100 text-base font-medium">{content.paymentSuccess.message}</p>
        </div>

        <div className="p-8">
          <div className="space-y-5">
            <div className="flex justify-between border-b border-gray-100 pb-4 border-dashed">
              <span className="text-gray-500 text-sm font-medium uppercase tracking-wide">{content.paymentSuccess.orderIdLabel}</span>
              <span className="text-gray-900 font-mono font-bold tracking-wider">{transactionId}</span>
            </div>
            <div className="flex justify-between border-b border-gray-100 pb-4 border-dashed">
              <span className="text-gray-500 text-sm font-medium uppercase tracking-wide">{content.paymentSuccess.dateLabel}</span>
              <span className="text-gray-900 font-bold">{date}</span>
            </div>
            <div className="flex justify-between border-b border-gray-100 pb-4 border-dashed">
              <span className="text-gray-500 text-sm font-medium uppercase tracking-wide">{content.checkout.planLabel}</span>
              <span className="text-gray-900 font-bold text-right">{itemName}</span>
            </div>
            <div className="flex justify-between border-b border-gray-100 pb-4 border-dashed">
              <span className="text-gray-500 text-sm font-medium uppercase tracking-wide">{content.paymentSuccess.methodLabel}</span>
              <span className="text-gray-900 font-bold flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                eSewa Wallet
              </span>
            </div>
            <div className="flex justify-between items-center pt-2 bg-gray-50 p-4 rounded-xl">
              <span className="text-gray-900 font-bold text-lg">{content.paymentSuccess.amountLabel}</span>
              <span className="text-brand-orange font-extrabold text-2xl">{price}</span>
            </div>
          </div>

          <div className="mt-8 space-y-4">
            <button
              onClick={onGoToDashboard}
              className="w-full flex items-center justify-center py-4 px-6 rounded-xl bg-brand-teal text-white font-bold hover:bg-teal-900 transition-all shadow-lg shadow-teal-700/20 hover:shadow-xl active:scale-[0.98]"
            >
              {content.paymentSuccess.dashboardButton}
              <ArrowRight className="ml-2 h-5 w-5" />
            </button>
            <button className="w-full flex items-center justify-center py-4 px-6 rounded-xl border-2 border-gray-100 text-gray-600 font-bold hover:bg-gray-50 hover:border-gray-200 transition-all active:scale-[0.98]">
              <Download className="mr-2 h-5 w-5" />
              Download Receipt
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;