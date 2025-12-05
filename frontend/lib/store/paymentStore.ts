import { create } from 'zustand';
import type { Payment, PaymentMethod } from '@/types/payment';
import { paymentApi } from '@/lib/api/payment';

interface PaymentState {
  // Current payment session
  currentPayment: Payment | null;
  paymentHistory: Payment[];
  
  // Selected payment method
  selectedMethod: PaymentMethod | null;
  
  // Loading states
  isProcessing: boolean;
  error: string | null;

  // Actions
  initiatePayment: (bookingId: number, amount: number, method: PaymentMethod) => Promise<Payment>;
  processPayment: (paymentId: number) => Promise<Payment>;
  refundPayment: (paymentId: number, reason: string) => Promise<Payment>;
  getPaymentByBookingId: (bookingId: number) => Promise<Payment>;
  
  // Selection
  setSelectedMethod: (method: PaymentMethod | null) => void;
  
  // Reset
  resetCurrentPayment: () => void;
}

export const usePaymentStore = create<PaymentState>((set, get) => ({
  // Initial state
  currentPayment: null,
  paymentHistory: [],
  selectedMethod: null,
  isProcessing: false,
  error: null,

  // Initiate payment
  initiatePayment: async (bookingId: number, amount: number, method: PaymentMethod) => {
    set({ isProcessing: true, error: null });
    try {
      const payment = await paymentApi.initiatePayment({
        bookingId,
        amount,
        paymentMethod: method,
      });
      
      set({ 
        currentPayment: payment, 
        selectedMethod: method,
        isProcessing: false 
      });
      
      return payment;
    } catch (error: any) {
      const errorMsg = error.response?.data?.message || 'ไม่สามารถเริ่มการชำระเงินได้';
      set({ error: errorMsg, isProcessing: false });
      throw new Error(errorMsg);
    }
  },

  // Process payment
  processPayment: async (paymentId: number) => {
    set({ isProcessing: true, error: null });
    try {
      const payment = await paymentApi.processPayment(paymentId);
      
      set((state) => ({ 
        currentPayment: payment,
        paymentHistory: [payment, ...state.paymentHistory],
        isProcessing: false 
      }));
      
      return payment;
    } catch (error: any) {
      const errorMsg = error.response?.data?.message || 'การชำระเงินล้มเหลว';
      set({ error: errorMsg, isProcessing: false });
      throw new Error(errorMsg);
    }
  },

  // Refund payment
  refundPayment: async (paymentId: number, reason: string) => {
    set({ isProcessing: true, error: null });
    try {
      const payment = await paymentApi.refundPayment(paymentId, reason);
      
      set((state) => ({
        paymentHistory: state.paymentHistory.map((p) =>
          p.id === paymentId ? payment : p
        ),
        isProcessing: false,
      }));
      
      return payment;
    } catch (error: any) {
      const errorMsg = error.response?.data?.message || 'ไม่สามารถคืนเงินได้';
      set({ error: errorMsg, isProcessing: false });
      throw new Error(errorMsg);
    }
  },

  // Get payment by booking ID
  getPaymentByBookingId: async (bookingId: number) => {
    set({ isProcessing: true, error: null });
    try {
      const payment = await paymentApi.getPaymentByBookingId(bookingId);
      set({ currentPayment: payment, isProcessing: false });
      return payment;
    } catch (error: any) {
      const errorMsg = error.response?.data?.message || 'ไม่พบข้อมูลการชำระเงิน';
      set({ error: errorMsg, isProcessing: false });
      throw new Error(errorMsg);
    }
  },

  // Selection
  setSelectedMethod: (method) => set({ selectedMethod: method }),

  // Reset
  resetCurrentPayment: () => set({ currentPayment: null, selectedMethod: null, error: null }),
}));

