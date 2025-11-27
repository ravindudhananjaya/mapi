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
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4 py-12">
      <div className="bg-white rounded-2xl shadow-xl max-w-md w-full overflow-hidden">
        <div className="bg-brand-teal p-8 text-center">
          <div className="mx-auto bg-white/20 w-20 h-20 rounded-full flex items-center justify-center mb-4">
            <CheckCircle className="h-12 w-12 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-white">{content.paymentSuccess.title}</h1>
          <p className="text-teal-100 mt-2 text-sm">{content.paymentSuccess.message}</p>
        </div>
        
        <div className="p-8">
          <div className="space-y-4">
            <div className="flex justify-between border-b border-gray-100 pb-4">
              <span className="text-gray-500 text-sm">{content.paymentSuccess.orderIdLabel}</span>
              <span className="text-gray-900 font-mono font-medium">{transactionId}</span>
            </div>
            <div className="flex justify-between border-b border-gray-100 pb-4">
              <span className="text-gray-500 text-sm">{content.paymentSuccess.dateLabel}</span>
              <span className="text-gray-900 font-medium">{date}</span>
            </div>
             <div className="flex justify-between border-b border-gray-100 pb-4">
              <span className="text-gray-500 text-sm">{content.checkout.planLabel}</span>
              <span className="text-gray-900 font-medium text-right">{itemName}</span>
            </div>
            <div className="flex justify-between border-b border-gray-100 pb-4">
              <span className="text-gray-500 text-sm">{content.paymentSuccess.methodLabel}</span>
              <span className="text-gray-900 font-medium">eSewa Wallet</span>
            </div>
            <div className="flex justify-between items-center pt-2">
              <span className="text-gray-900 font-bold text-lg">{content.paymentSuccess.amountLabel}</span>
              <span className="text-brand-orange font-bold text-xl">{price}</span>
            </div>
          </div>

          <div className="mt-8 space-y-3">
            <button 
              onClick={onGoToDashboard}
              className="w-full flex items-center justify-center py-3 px-4 rounded-lg bg-brand-teal text-white font-medium hover:bg-teal-900 transition-colors shadow-lg shadow-teal-700/20"
            >
              {content.paymentSuccess.dashboardButton}
              <ArrowRight className="ml-2 h-4 w-4" />
            </button>
            <button className="w-full flex items-center justify-center py-3 px-4 rounded-lg border border-gray-200 text-gray-600 font-medium hover:bg-gray-50 transition-colors">
              <Download className="mr-2 h-4 w-4" />
              Download Receipt
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;