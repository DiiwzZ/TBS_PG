import apiClient from './axios';
import type { Payment, InitiatePaymentRequest } from '@/types/payment';

export const paymentApi = {
  // Initiate payment
  initiatePayment: async (request: InitiatePaymentRequest): Promise<Payment> => {
    const response = await apiClient.post<Payment>('/api/payments/initiate', request);
    return response.data;
  },

  // Process payment
  processPayment: async (paymentId: number): Promise<Payment> => {
    const response = await apiClient.post<Payment>(`/api/payments/${paymentId}/process`);
    return response.data;
  },

  // Refund payment
  refundPayment: async (paymentId: number, reason: string): Promise<Payment> => {
    const response = await apiClient.post<Payment>(`/api/payments/${paymentId}/refund`, { reason });
    return response.data;
  },

  // Get payment by ID
  getPaymentById: async (paymentId: number): Promise<Payment> => {
    const response = await apiClient.get<Payment>(`/api/payments/${paymentId}`);
    return response.data;
  },

  // Get payment by booking ID
  getPaymentByBookingId: async (bookingId: number): Promise<Payment> => {
    const response = await apiClient.get<Payment>(`/api/payments/booking/${bookingId}`);
    return response.data;
  },

  // Get payment by transaction ID
  getPaymentByTransactionId: async (transactionId: string): Promise<Payment> => {
    const response = await apiClient.get<Payment>(`/api/payments/transaction/${transactionId}`);
    return response.data;
  },
};

export default paymentApi;

