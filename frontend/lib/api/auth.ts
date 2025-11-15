import axiosInstance from './axios';
import type {
  AuthResponse,
  LoginRequest,
  RegisterRequest,
  UpdateProfileRequest,
  UserResponse,
} from '@/types/auth';

export const authApi = {
  /**
   * Login with email and password
   */
  login: async (data: LoginRequest): Promise<AuthResponse> => {
    const response = await axiosInstance.post<AuthResponse>('/api/users/login', data);
    return response.data;
  },

  /**
   * Register new user
   */
  register: async (data: RegisterRequest): Promise<AuthResponse> => {
    const response = await axiosInstance.post<AuthResponse>('/api/users/register', data);
    return response.data;
  },

  /**
   * Get current user profile
   */
  getProfile: async (): Promise<UserResponse> => {
    const response = await axiosInstance.get<UserResponse>('/api/users/me');
    return response.data;
  },

  /**
   * Update current user profile
   */
  updateProfile: async (data: UpdateProfileRequest): Promise<UserResponse> => {
    const response = await axiosInstance.put<UserResponse>('/api/users/me', data);
    return response.data;
  },
};

