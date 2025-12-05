// Check-in related types

export interface CheckIn {
  id: number;
  bookingId: number;
  qrToken: string;
  checkedInAt: string;
  staffId: number | null;
}

export interface QRTokenResponse {
  qrToken: string;
  bookingId: number;
}

export interface ScanRequest {
  qrToken: string;
  staffId: number | null;
}

export interface TokenValidationResponse {
  valid: boolean;
  qrToken: string;
}

