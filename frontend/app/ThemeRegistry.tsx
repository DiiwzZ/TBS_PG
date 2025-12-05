'use client';

import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { theme } from '@/lib/theme';
import { useEffect } from 'react';
import { useAuthStore } from '@/lib/store/authStore';
import ToastContainer from '@/components/ui/Toast';
import BottomNav from '@/components/layout/BottomNav';

export default function ThemeRegistry({ children }: { children: React.ReactNode }) {
  const checkAuth = useAuthStore((state) => state.checkAuth);

  // Check authentication on mount
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
      <ToastContainer />
      <BottomNav />
    </ThemeProvider>
  );
}

