import apiClient from './axios';
import type { CheckIn, QRTokenResponse, ScanRequest, TokenValidationResponse } from '@/types/checkin';

export const checkinApi = {
  // Generate QR token for booking
  generateQRToken: async (bookingId: number): Promise<QRTokenResponse> => {
    const response = await apiClient.post<QRTokenResponse>(`/api/checkin/generate-qr/${bookingId}`);
    return response.data;
  },

  // Get QR code image
  getQRCodeImage: async (qrToken: string): Promise<Blob> => {
    const response = await apiClient.get(`/api/checkin/qr-image/${qrToken}`, {
      responseType: 'blob',
    });
    return response.data;
  },

  // Scan QR code and check-in
  scanQRCode: async (request: ScanRequest): Promise<CheckIn> => {
    const response = await apiClient.post<CheckIn>('/api/checkin/scan', request);
    return response.data;
  },

  // Validate QR token
  validateToken: async (qrToken: string): Promise<TokenValidationResponse> => {
    const response = await apiClient.get<TokenValidationResponse>(`/api/checkin/validate/${qrToken}`);
    return response.data;
  },

  // Get check-in by booking ID
  getCheckInByBookingId: async (bookingId: number): Promise<CheckIn> => {
    const response = await apiClient.get<CheckIn>(`/api/checkin/booking/${bookingId}`);
    return response.data;
  },
};

export default checkinApi;

