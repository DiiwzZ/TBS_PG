export interface User {
  id: number;
  username: string;
  email: string;
  fullName: string;
  phoneNumber: string;
  role: 'CUSTOMER' | 'STAFF' | 'ADMIN';
  noShowCount?: number;
  bannedFromFreeSlot?: boolean;
  active?: boolean;
}

export interface AuthResponse {
  token: string;
  userId: number;
  username: string;
  email: string;
  fullName: string;
  role: string;
  expiresIn: number;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
  fullName: string;
  phoneNumber: string;
}

export interface UserResponse {
  id: number;
  username: string;
  email: string;
  fullName: string;
  phoneNumber: string;
  noShowCount: number;
  bannedFromFreeSlot: boolean;
  active: boolean;
  role: string;
}

