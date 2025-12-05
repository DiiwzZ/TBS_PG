'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Box, Container } from '@mui/material';
import Navbar from '@/components/layout/Navbar';
import RegisterForm from '@/components/auth/RegisterForm';
import { useAuthStore } from '@/lib/store/authStore';

export default function RegisterPage() {
  const router = useRouter();
  const { isAuthenticated, isHydrated } = useAuthStore();

  useEffect(() => {
    if (isHydrated && isAuthenticated) {
      router.replace('/dashboard');
    }
  }, [isHydrated, isAuthenticated, router]);

  // Show nothing while checking auth state to prevent flash
  if (!isHydrated || isAuthenticated) {
    return null;
  }

  return (
    <>
      <Navbar />
      <Container 
        maxWidth="sm" 
        sx={{ 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          justifyContent: 'center', 
          minHeight: 'calc(100vh - 64px)',
          py: 4,
          pb: { xs: 'calc(64px + env(safe-area-inset-bottom) + 24px)', md: 4 }
        }}
      >
        <Box sx={{ width: '100%' }}>
          <RegisterForm />
        </Box>
      </Container>
    </>
  );
}
