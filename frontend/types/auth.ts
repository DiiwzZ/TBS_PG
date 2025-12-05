export type UserRole = 'CUSTOMER' | 'STAFF' | 'ADMIN';

export interface User {
  id: number;
  username: string;
  email: string;
  fullName: string;
  phoneNumber: string;
  role: UserRole;
  noShowCount: number;
  bannedFromFreeSlot: boolean;
  createdAt: string;
}

export interface LoginResponse {
  token: string;
  user: User;
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
  fullName: string;
  phoneNumber: string;
}
