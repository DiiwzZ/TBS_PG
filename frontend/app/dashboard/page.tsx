'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Box,
  Container,
  Paper,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
} from '@mui/material';
import Navbar from '@/components/layout/Navbar';
import NoShowWarning from '@/components/booking/NoShowWarning';
import FreeSlotBanBanner from '@/components/booking/FreeSlotBanBanner';
import { useAuthStore } from '@/lib/store/authStore';
import Link from 'next/link';

export default function DashboardPage() {
  const router = useRouter();
  const { isAuthenticated, user, isHydrated } = useAuthStore();

  useEffect(() => {
    // Only redirect after hydration is complete
    if (isHydrated && !isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, isHydrated, router]);

  // Show loading while hydrating or if not authenticated
  if (!isHydrated || !isAuthenticated || !user) {
    return null; // or loading spinner
  }

  return (
    <>
      <Navbar />
      <Container 
        maxWidth="lg" 
        sx={{ 
          mt: { xs: 2, sm: 4 }, 
          mb: 4, 
          px: { xs: 1, sm: 3 },
          pb: { xs: 'calc(64px + 24px)', md: 4 }
        }}
      >
        {/* No-Show Warning */}
        {user && user.noShowCount > 0 && !user.bannedFromFreeSlot && (
          <NoShowWarning noShowCount={user.noShowCount} />
        )}

        {/* Free Slot Ban Banner */}
        {user && user.bannedFromFreeSlot && (
          <FreeSlotBanBanner noShowCount={user.noShowCount} />
        )}

        <Paper 
          elevation={3} 
          className="premium-card"
          sx={{ 
            p: { xs: 2, sm: 4 }, 
            mb: { xs: 2, sm: 4 },
            borderRadius: 3,
          }}
        >
          <Typography 
            variant="h4" 
            gutterBottom 
            sx={{ 
              fontSize: { xs: '1.5rem', sm: '2rem' },
              fontFamily: '"Playfair Display", Georgia, serif',
              fontWeight: 700,
              background: 'linear-gradient(135deg, #D4AF37, #F4E5B8)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            ยินดีต้อนรับ, {user.fullName}! 🎉
          </Typography>
          <Typography variant="body1" color="text.secondary" gutterBottom>
            👤 Username: {user.username}
          </Typography>
          <Typography variant="body1" color="text.secondary" gutterBottom>
            📧 Email: {user.email}
          </Typography>
          <Typography variant="body1" color="text.secondary" gutterBottom>
            📱 Phone: {user.phoneNumber}
          </Typography>
          {(user.role === 'STAFF' || user.role === 'ADMIN') && (
            <Typography variant="body1" color="text.secondary">
              🎭 Role: {user.role}
            </Typography>
          )}
        </Paper>

        <Grid container spacing={{ xs: 1, sm: 3 }}>
          <Grid item xs={12} md={4}>
            <Card 
              className="premium-card"
              sx={{ 
                height: '100%', 
                minHeight: { xs: 'auto', md: 220 },
                transition: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1)',
                '&:hover': {
                  transform: 'translateY(-4px)',
                }
              }}
            >
              <CardContent sx={{ p: { xs: 1.5, sm: 3 }, display: 'flex', flexDirection: 'column', height: '100%' }}>
                <Typography variant="h6" gutterBottom color="primary" fontWeight={600}>
                  📅 การจองที่ใช้งาน
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph sx={{ flex: 1 }}>
                  ดูการจองโต๊ะที่กำลังจะมาถึง
                </Typography>
                <Button 
                  variant="contained" 
                  fullWidth 
                  color="primary"
                  component={Link}
                  href="/bookings/active"
                  sx={{ mt: 'auto' }}
                >
                  ดูการจอง
                </Button>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card 
              className="premium-card"
              sx={{ 
                height: '100%', 
                minHeight: { xs: 'auto', md: 220 },
                transition: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1)',
                '&:hover': {
                  transform: 'translateY(-4px)',
                }
              }}
            >
              <CardContent sx={{ p: { xs: 1.5, sm: 3 }, display: 'flex', flexDirection: 'column', height: '100%' }}>
                <Typography variant="h6" gutterBottom color="primary" fontWeight={600}>
                  📜 ประวัติการจอง
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph sx={{ flex: 1 }}>
                  ดูประวัติการจองทั้งหมดของคุณ
                </Typography>
                <Button 
                  variant="contained" 
                  fullWidth 
                  color="primary"
                  component={Link}
                  href="/bookings/history"
                  sx={{ mt: 'auto' }}
                >
                  ดูประวัติ
                </Button>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card 
              className="premium-card"
              sx={{ 
                height: '100%', 
                minHeight: { xs: 'auto', md: 220 },
                transition: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1)',
                '&:hover': {
                  transform: 'translateY(-4px)',
                }
              }}
            >
              <CardContent sx={{ p: { xs: 1.5, sm: 3 }, display: 'flex', flexDirection: 'column', height: '100%' }}>
                <Typography variant="h6" gutterBottom color="primary" fontWeight={600}>
                  🍺 จองโต๊ะ
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph sx={{ flex: 1 }}>
                  จองโต๊ะที่บาร์ของคุณตอนนี้เลย
                </Typography>
                <Button 
                  variant="contained" 
                  fullWidth 
                  color="primary"
                  component={Link}
                  href="/booking"
                  sx={{ mt: 'auto' }}
                >
                  จองเลย
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

      </Container>
    </>
  );
}

