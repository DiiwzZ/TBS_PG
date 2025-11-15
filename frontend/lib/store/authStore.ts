import { create } from 'zustand';
import { authApi } from '@/lib/api/auth';
import type { User, LoginRequest, RegisterRequest } from '@/types/auth';

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  
  // Actions
  login: (data: LoginRequest) => Promise<void>;
  register: (data: RegisterRequest) => Promise<void>;
  logout: () => void;
  checkAuth: () => void;
  clearError: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,

  login: async (data: LoginRequest) => {
    try {
      set({ isLoading: true, error: null });
      
      const response = await authApi.login(data);
      
      // Store token and user data in localStorage
      localStorage.setItem('auth_token', response.token);
      localStorage.setItem('auth_user', JSON.stringify({
        id: response.userId,
        username: response.username,
        email: response.email,
        fullName: response.fullName,
        role: response.role,
      }));
      
      set({
        user: {
          id: response.userId,
          username: response.username,
          email: response.email,
          fullName: response.fullName,
          phoneNumber: '', // Will be fetched from profile if needed
          role: response.role as 'CUSTOMER' | 'STAFF' | 'ADMIN',
        },
        token: response.token,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      });
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Login failed. Please try again.';
      set({ 
        isLoading: false, 
        error: errorMessage,
        isAuthenticated: false,
      });
      throw error;
    }
  },

  register: async (data: RegisterRequest) => {
    try {
      set({ isLoading: true, error: null });
      
      const response = await authApi.register(data);
      
      // Store token and user data in localStorage
      localStorage.setItem('auth_token', response.token);
      localStorage.setItem('auth_user', JSON.stringify({
        id: response.userId,
        username: response.username,
        email: response.email,
        fullName: response.fullName,
        role: response.role,
      }));
      
      set({
        user: {
          id: response.userId,
          username: response.username,
          email: response.email,
          fullName: response.fullName,
          phoneNumber: data.phoneNumber,
          role: response.role as 'CUSTOMER' | 'STAFF' | 'ADMIN',
        },
        token: response.token,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      });
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Registration failed. Please try again.';
      set({ 
        isLoading: false, 
        error: errorMessage,
        isAuthenticated: false,
      });
      throw error;
    }
  },

  logout: () => {
    // Clear localStorage
    localStorage.removeItem('auth_token');
    localStorage.removeItem('auth_user');
    
    // Reset state
    set({
      user: null,
      token: null,
      isAuthenticated: false,
      error: null,
    });
  },

  checkAuth: () => {
    // Check if user is authenticated from localStorage
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('auth_token');
      const userStr = localStorage.getItem('auth_user');
      
      if (token && userStr) {
        try {
          const user = JSON.parse(userStr);
          set({
            user,
            token,
            isAuthenticated: true,
          });
        } catch (error) {
          // Invalid JSON, clear storage
          localStorage.removeItem('auth_token');
          localStorage.removeItem('auth_user');
        }
      }
    }
  },

  clearError: () => {
    set({ error: null });
  },
}));

