import { create } from 'zustand';
import type { CheckIn, QRTokenResponse } from '@/types/checkin';
import { checkinApi } from '@/lib/api/checkin';
import { bookingApi } from '@/lib/api/booking';

interface CheckinState {
  // Current QR token
  currentToken: QRTokenResponse | null;
  qrImageUrl: string | null;
  
  // Check-in records
  checkIns: CheckIn[];
  
  // Scanner state
  scannerActive: boolean;
  
  // Loading states
  isLoading: boolean;
  error: string | null;

  // Actions
  generateQRToken: (bookingId: number) => Promise<QRTokenResponse>;
  loadQRCodeImage: (qrToken: string) => Promise<void>;
  scanQRCode: (qrToken: string, staffId: number | null) => Promise<CheckIn>;
  validateToken: (qrToken: string) => Promise<boolean>;
  getCheckInByBookingId: (bookingId: number) => Promise<CheckIn>;
  
  // Scanner control
  setScannerActive: (active: boolean) => void;
  
  // Reset
  resetQRToken: () => void;
}

export const useCheckinStore = create<CheckinState>((set, get) => ({
  // Initial state
  currentToken: null,
  qrImageUrl: null,
  checkIns: [],
  scannerActive: false,
  isLoading: false,
  error: null,

  // Get QR token from booking (one token per booking)
  generateQRToken: async (bookingId: number) => {
    set({ isLoading: true, error: null });
    try {
      // Get token from booking service (returns existing token)
      const tokenResponse = await bookingApi.getQRToken(bookingId);
      
      // Also load the QR code image
      const imageBlob = await checkinApi.getQRCodeImage(tokenResponse.qrToken);
      const imageUrl = URL.createObjectURL(imageBlob);
      
      set({ 
        currentToken: { qrToken: tokenResponse.qrToken },
        qrImageUrl: imageUrl,
        isLoading: false 
      });
      
      return { qrToken: tokenResponse.qrToken };
    } catch (error: any) {
      const errorMsg = error.response?.data?.message || 'ไม่สามารถโหลด QR Code ได้';
      set({ error: errorMsg, isLoading: false });
      throw new Error(errorMsg);
    }
  },

  // Load QR code image
  loadQRCodeImage: async (qrToken: string) => {
    set({ isLoading: true, error: null });
    try {
      const imageBlob = await checkinApi.getQRCodeImage(qrToken);
      const imageUrl = URL.createObjectURL(imageBlob);
      
      set({ qrImageUrl: imageUrl, isLoading: false });
    } catch (error: any) {
      const errorMsg = error.response?.data?.message || 'ไม่สามารถโหลด QR Code ได้';
      set({ error: errorMsg, isLoading: false });
      throw new Error(errorMsg);
    }
  },

  // Scan QR code
  scanQRCode: async (qrToken: string, staffId: number | null) => {
    set({ isLoading: true, error: null });
    try {
      const checkIn = await checkinApi.scanQRCode({ qrToken, staffId });
      
      set((state) => ({
        checkIns: [checkIn, ...state.checkIns],
        isLoading: false,
      }));
      
      return checkIn;
    } catch (error: any) {
      const errorMsg = error.response?.data?.message || 'การ Check-in ล้มเหลว';
      set({ error: errorMsg, isLoading: false });
      throw new Error(errorMsg);
    }
  },

  // Validate token
  validateToken: async (qrToken: string) => {
    try {
      const result = await checkinApi.validateToken(qrToken);
      return result.valid;
    } catch (error) {
      return false;
    }
  },

  // Get check-in by booking ID
  getCheckInByBookingId: async (bookingId: number) => {
    set({ isLoading: true, error: null });
    try {
      const checkIn = await checkinApi.getCheckInByBookingId(bookingId);
      set({ isLoading: false });
      return checkIn;
    } catch (error: any) {
      const errorMsg = error.response?.data?.message || 'ไม่พบข้อมูล Check-in';
      set({ error: errorMsg, isLoading: false });
      throw new Error(errorMsg);
    }
  },

  // Scanner control
  setScannerActive: (active) => set({ scannerActive: active }),

  // Reset
  resetQRToken: () => {
    const { qrImageUrl } = get();
    if (qrImageUrl) {
      URL.revokeObjectURL(qrImageUrl);
    }
    set({ currentToken: null, qrImageUrl: null, error: null });
  },
}));

