import { create } from 'zustand';
import type { Booking, BookingDraft } from '@/types/booking';
import { bookingApi } from '@/lib/api/booking';

interface BookingState {
  // Current booking draft (for wizard)
  draft: BookingDraft;
  setDraft: (draft: Partial<BookingDraft>) => void;
  resetDraft: () => void;

  // User's bookings
  bookings: Booking[];
  activeBookings: Booking[];
  bookingHistory: Booking[];
  isLoading: boolean;
  error: string | null;

  // Actions
  fetchUserBookings: (userId: number) => Promise<void>;
  createBooking: (userId: number) => Promise<Booking>;
  cancelBooking: (bookingId: number) => Promise<void>;
  getBookingById: (bookingId: number) => Promise<Booking | undefined>;

  // Auto-refresh
  autoRefresh: boolean;
  setAutoRefresh: (enabled: boolean) => void;
}

const initialDraft: BookingDraft = {
  bookingType: null,
  zoneId: null,
  tableId: null,
  bookingDate: null,
  timeSlot: null,
  guestCount: 2,
};

export const useBookingStore = create<BookingState>((set, get) => ({
  // Draft state
  draft: initialDraft,
  setDraft: (draft) => set((state) => ({ draft: { ...state.draft, ...draft } })),
  resetDraft: () => set({ draft: initialDraft }),

  // Bookings state
  bookings: [],
  activeBookings: [],
  bookingHistory: [],
  isLoading: false,
  error: null,

  // Fetch user bookings
  fetchUserBookings: async (userId: number) => {
    set({ isLoading: true, error: null });
    try {
      const bookings = await bookingApi.getUserBookings(userId);
      
      // Separate active and history
      const now = new Date();
      const active = bookings.filter(
        (b) => 
          (b.status === 'PENDING' || b.status === 'CONFIRMED' || b.status === 'CHECKED_IN') &&
          new Date(b.bookingDate) >= now
      );
      const history = bookings.filter(
        (b) => 
          b.status === 'COMPLETED' || 
          b.status === 'CANCELLED' || 
          b.status === 'NO_SHOW' ||
          (new Date(b.bookingDate) < now && b.status !== 'CHECKED_IN')
      );

      set({ 
        bookings, 
        activeBookings: active, 
        bookingHistory: history,
        isLoading: false 
      });
    } catch (error: any) {
      set({ 
        error: error.response?.data?.message || 'ไม่สามารถโหลดข้อมูลการจองได้', 
        isLoading: false 
      });
    }
  },

  // Create booking
  createBooking: async (userId: number) => {
    const { draft } = get();
    
    if (!draft.bookingType || !draft.bookingDate || !draft.timeSlot) {
      throw new Error('ข้อมูลการจองไม่ครบถ้วน');
    }

    if (draft.bookingType === 'NORMAL' && !draft.zoneId) {
      throw new Error('กรุณาเลือกโซน');
    }

    if (draft.bookingType === 'PREMIUM' && !draft.tableId) {
      throw new Error('กรุณาเลือกโต๊ะ');
    }

    set({ isLoading: true, error: null });
    try {
      const booking = await bookingApi.createBooking({
        userId,
        tableId: draft.tableId,
        zoneId: draft.zoneId,
        bookingType: draft.bookingType,
        timeSlot: draft.timeSlot,
        bookingDate: draft.bookingDate.toISOString(),
        guestCount: draft.guestCount,
      });

      // Add to bookings list
      set((state) => ({
        bookings: [booking, ...state.bookings],
        activeBookings: [booking, ...state.activeBookings],
        isLoading: false,
      }));

      // Reset draft
      get().resetDraft();

      return booking;
    } catch (error: any) {
      const errorMsg = error.response?.data?.message || 'ไม่สามารถสร้างการจองได้';
      set({ error: errorMsg, isLoading: false });
      throw new Error(errorMsg);
    }
  },

  // Cancel booking
  cancelBooking: async (bookingId: number) => {
    set({ isLoading: true, error: null });
    try {
      await bookingApi.cancelBooking(bookingId);

      // Update booking status
      set((state) => ({
        bookings: state.bookings.map((b) =>
          b.id === bookingId ? { ...b, status: 'CANCELLED' as const } : b
        ),
        activeBookings: state.activeBookings.filter((b) => b.id !== bookingId),
        bookingHistory: [
          ...state.bookingHistory,
          ...state.bookings
            .filter((b) => b.id === bookingId)
            .map((b) => ({ ...b, status: 'CANCELLED' as const })),
        ],
        isLoading: false,
      }));
    } catch (error: any) {
      set({ 
        error: error.response?.data?.message || 'ไม่สามารถยกเลิกการจองได้', 
        isLoading: false 
      });
      throw error;
    }
  },

  // Get booking by ID
  getBookingById: async (bookingId: number) => {
    const { bookings } = get();
    
    // Check if already in store
    const existing = bookings.find((b) => b.id === bookingId);
    if (existing) return existing;

    // Fetch from API
    try {
      const booking = await bookingApi.getBookingById(bookingId);
      set((state) => ({
        bookings: [booking, ...state.bookings],
      }));
      return booking;
    } catch (error) {
      return undefined;
    }
  },

  // Auto-refresh
  autoRefresh: false,
  setAutoRefresh: (enabled) => set({ autoRefresh: enabled }),
}));

// Auto-refresh active bookings every 30 seconds
let refreshInterval: NodeJS.Timeout | null = null;

if (typeof window !== 'undefined') {
  useBookingStore.subscribe((state) => {
    if (state.autoRefresh && !refreshInterval) {
      refreshInterval = setInterval(() => {
        // Only refresh if user is authenticated
        const userId = localStorage.getItem('userId');
        if (userId) {
          state.fetchUserBookings(parseInt(userId));
        }
      }, 30000); // 30 seconds
    } else if (!state.autoRefresh && refreshInterval) {
      clearInterval(refreshInterval);
      refreshInterval = null;
    }
  });
}

