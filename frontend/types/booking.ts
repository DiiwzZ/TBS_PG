// Booking related types

export type BookingType = 'NORMAL' | 'PREMIUM';
export type TimeSlot = 'SLOT_20_00' | 'SLOT_21_00' | 'SLOT_22_00';
export type BookingStatus = 'PENDING' | 'CONFIRMED' | 'CHECKED_IN' | 'COMPLETED' | 'CANCELLED' | 'NO_SHOW';

export interface Booking {
  id: number;
  userId: number;
  tableId: number | null;
  zoneId: number | null;
  bookingType: BookingType;
  timeSlot: TimeSlot;
  bookingDate: string; // ISO date string
  guestCount: number;
  fee: number;
  status: BookingStatus;
  paymentId: number | null;
  qrToken: string | null;
  checkedInAt: string | null;
  createdAt: string;
}

export interface CreateBookingRequest {
  userId: number;
  tableId: number | null;
  zoneId: number | null;
  bookingType: BookingType;
  timeSlot: TimeSlot;
  bookingDate: string;
  guestCount: number;
}

export interface BookingDraft {
  bookingType: BookingType | null;
  zoneId: number | null;
  tableId: number | null;
  bookingDate: Date | null;
  timeSlot: TimeSlot | null;
  guestCount: number;
}

// Time slot information
export interface TimeSlotInfo {
  slot: TimeSlot;
  label: string;
  labelTh: string;
  time: string;
  normalFee: number;  // For NORMAL booking
  premiumFee: number; // For PREMIUM booking
  description: string;
  icon: string;
}

export const TIME_SLOT_INFO: Record<TimeSlot, TimeSlotInfo> = {
  SLOT_20_00: {
    slot: 'SLOT_20_00',
    label: 'Entry by 8:00 PM',
    labelTh: 'รับโต๊ะไม่เกิน 20:00 น.',
    time: '20:00',
    normalFee: 0,
    premiumFee: 150,  // ค่าล็อคโต๊ะ Premium
    description: 'เข้าใช้บริการฟรี! (Premium: ค่าล็อคโต๊ะ ฿150)',
    icon: '🆓'
  },
  SLOT_21_00: {
    slot: 'SLOT_21_00',
    label: 'Entry by 9:00 PM',
    labelTh: 'รับโต๊ะไม่เกิน 21:00 น.',
    time: '21:00',
    normalFee: 500,
    premiumFee: 500,
    description: 'เหมาะสำหรับช่วงเริ่มต้น บรรยากาศเพลิดเพลิน',
    icon: '🌆'
  },
  SLOT_22_00: {
    slot: 'SLOT_22_00',
    label: 'Entry by 10:00 PM',
    labelTh: 'รับโต๊ะไม่เกิน 22:00 น.',
    time: '22:00',
    normalFee: 1000,
    premiumFee: 1000,
    description: 'ช่วงไพรม์ไทม์ บรรยากาศครึกครื้นสุด!',
    icon: '🌃'
  }
};

// Helper function to get fee based on booking type
export const getFeeForSlot = (slot: TimeSlot, bookingType: BookingType): number => {
  const info = TIME_SLOT_INFO[slot];
  return bookingType === 'PREMIUM' ? info.premiumFee : info.normalFee;
};

