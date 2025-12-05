import apiClient from './axios';
import type { Booking, CreateBookingRequest } from '@/types/booking';

export const bookingApi = {
  // Create a new booking
  createBooking: async (request: CreateBookingRequest): Promise<Booking> => {
    const response = await apiClient.post<Booking>('/api/bookings', request);
    return response.data;
  },

  // Get all bookings for a user
  getUserBookings: async (userId: number): Promise<Booking[]> => {
    const response = await apiClient.get<Booking[]>(`/api/bookings/user/${userId}`);
    return response.data;
  },

  // Get booking by ID
  getBookingById: async (bookingId: number): Promise<Booking> => {
    const response = await apiClient.get<Booking>(`/api/bookings/${bookingId}`);
    return response.data;
  },

  // Cancel a booking
  cancelBooking: async (bookingId: number): Promise<void> => {
    await apiClient.post(`/api/bookings/${bookingId}/cancel`);
  },

  // Confirm booking (after payment)
  confirmBooking: async (bookingId: number, paymentId: number): Promise<void> => {
    await apiClient.post(`/api/bookings/${bookingId}/confirm`, { paymentId });
  },

  // Check-in booking
  checkInBooking: async (bookingId: number): Promise<void> => {
    await apiClient.post(`/api/bookings/${bookingId}/check-in`);
  },

  // Complete booking
  completeBooking: async (bookingId: number): Promise<void> => {
    await apiClient.post(`/api/bookings/${bookingId}/complete`);
  },

  // Get QR token for booking
  getQRToken: async (bookingId: number): Promise<{ qrToken: string }> => {
    const response = await apiClient.get<{ qrToken: string }>(`/api/bookings/${bookingId}/qr-token`);
    return response.data;
  },
};

export default bookingApi;

