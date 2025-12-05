'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Box,
  Container,
  Paper,
  Typography,
  Grid,
  CircularProgress,
  Alert,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from '@mui/material';
import { ArrowBack, Refresh, EventNote } from '@mui/icons-material';
import Navbar from '@/components/layout/Navbar';
import BookingCard from '@/components/booking/BookingCard';
import { useAuthStore } from '@/lib/store/authStore';
import { useBookingStore } from '@/lib/store/bookingStore';
import { useTableStore } from '@/lib/store/tableStore';
import Link from 'next/link';

export default function ActiveBookingsPage() {
  const router = useRouter();
  const { isAuthenticated, user, isHydrated } = useAuthStore();
  const {
    activeBookings,
    isLoading,
    error,
    fetchUserBookings,
    cancelBooking,
    setAutoRefresh,
  } = useBookingStore();
  const { zones, tablesByZone, fetchZoneById, fetchTablesByZone } = useTableStore();

  const [cancellingId, setCancellingId] = useState<number | null>(null);

  useEffect(() => {
    if (isHydrated && !isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, isHydrated, router]);

  useEffect(() => {
    if (user) {
      fetchUserBookings(user.id);
      setAutoRefresh(true);
    }

    return () => {
      setAutoRefresh(false);
    };
  }, [user, fetchUserBookings, setAutoRefresh]);

  // Load zone data for bookings
  useEffect(() => {
    activeBookings.forEach((booking) => {
      if (booking.zoneId && !zones.find((z) => z.id === booking.zoneId)) {
        fetchZoneById(booking.zoneId);
      }
      if (booking.zoneId && !tablesByZone[booking.zoneId]) {
        fetchTablesByZone(booking.zoneId);
      }
    });
  }, [activeBookings, zones, tablesByZone, fetchZoneById, fetchTablesByZone]);

  const handleCancelClick = (bookingId: number) => {
    setCancellingId(bookingId);
  };

  const handleCancelConfirm = async () => {
    if (!cancellingId) return;

    try {
      await cancelBooking(cancellingId);
      setCancellingId(null);
      if (user) {
        fetchUserBookings(user.id);
      }
    } catch (err) {
      console.error('Failed to cancel booking:', err);
    }
  };

  const handleRefresh = () => {
    if (user) {
      fetchUserBookings(user.id);
    }
  };

  if (!isHydrated || !isAuthenticated || !user) {
    return null;
  }

  return (
    <>
      <Navbar />
      <Container 
        maxWidth="lg" 
        sx={{ 
          mt: { xs: 2, sm: 4 }, 
          mb: 4, 
          px: { xs: 2, sm: 3 },
          pb: { xs: 'calc(64px + 24px)', md: 4 }
        }}
      >
        <Paper 
          elevation={3} 
          className="premium-card"
          sx={{ 
            p: { xs: 3, sm: 4 },
            borderRadius: 3,
          }}
        >
          {/* Header */}
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={3} flexDirection={{ xs: 'column', sm: 'row' }} gap={2}>
            <Typography 
              variant="h4" 
              sx={{ 
                fontSize: { xs: '1.5rem', sm: '2rem' },
                fontFamily: '"Playfair Display", Georgia, serif',
                fontWeight: 700,
                background: 'linear-gradient(135deg, #D4AF37, #F4E5B8)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                display: 'flex',
                alignItems: 'center',
                gap: 1,
              }}
            >
              <EventNote sx={{ color: 'primary.main' }} />
              การจองที่กำลังจะมาถึง
            </Typography>

            <Box display="flex" gap={1}>
              <Button
                variant="outlined"
                startIcon={<ArrowBack />}
                onClick={() => router.push('/dashboard')}
                size="small"
              >
                กลับ
              </Button>
              <Button
                variant="outlined"
                startIcon={<Refresh />}
                onClick={handleRefresh}
                disabled={isLoading}
                size="small"
              >
                รีเฟรช
              </Button>
            </Box>
          </Box>

          <Alert severity="info" sx={{ mb: 3 }} icon={<Refresh />}>
            ระบบอัปเดตสถานะอัตโนมัติทุก 30 วินาที
          </Alert>

          {/* Loading State */}
          {isLoading && activeBookings.length === 0 && (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight={200}>
              <CircularProgress />
            </Box>
          )}

          {/* Error State */}
          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}

          {/* Bookings Grid */}
          {!isLoading && activeBookings.length > 0 && (
            <Grid container spacing={{ xs: 2, sm: 3 }}>
              {activeBookings.map((booking, index) => {
                const zone = zones.find((z) => z.id === booking.zoneId);
                const table = booking.zoneId && booking.tableId
                  ? tablesByZone[booking.zoneId]?.find((t) => t.id === booking.tableId)
                  : null;

                return (
                  <Grid 
                    item 
                    xs={12} 
                    sm={6} 
                    md={4} 
                    key={booking.id}
                    sx={{
                      animation: 'fadeInUp 0.5s ease-out',
                      animationDelay: `${index * 0.1}s`,
                      animationFillMode: 'both',
                      '@keyframes fadeInUp': {
                        '0%': { opacity: 0, transform: 'translateY(20px)' },
                        '100%': { opacity: 1, transform: 'translateY(0)' }
                      }
                    }}
                  >
                    <BookingCard
                      booking={booking}
                      zoneName={zone?.name}
                      tableName={table ? `โต๊ะ ${table.tableNumber}` : undefined}
                      onCancel={handleCancelClick}
                    />
                  </Grid>
                );
              })}
            </Grid>
          )}

          {/* Empty State */}
          {!isLoading && activeBookings.length === 0 && (
            <Paper 
              className="premium-card" 
              sx={{ 
                p: 4, 
                textAlign: 'center',
                borderRadius: 3,
              }}
            >
              <Typography variant="h6" color="text.secondary" gutterBottom fontWeight={600}>
                📭 ไม่มีการจองที่กำลังจะมาถึง
              </Typography>
              <Typography variant="body2" color="text.secondary" mb={3}>
                คุณยังไม่มีการจองใดๆ ที่กำลังจะมาถึง
              </Typography>
              <Button
                component={Link}
                href="/booking"
                variant="contained"
                size="large"
                sx={{ 
                  py: 1.5,
                  px: 4,
                  background: 'linear-gradient(135deg, #D4AF37, #F4E5B8)',
                  color: '#000',
                  fontWeight: 600,
                  transition: 'all 300ms ease',
                  '&:hover': {
                    background: 'linear-gradient(135deg, #F4E5B8, #D4AF37)',
                    transform: 'scale(1.05)',
                  }
                }}
              >
                🍺 จองโต๊ะทันที
              </Button>
            </Paper>
          )}
        </Paper>
      </Container>

      {/* Cancel Confirmation Dialog */}
      <Dialog open={!!cancellingId} onClose={() => setCancellingId(null)}>
        <DialogTitle>ยืนยันการยกเลิก</DialogTitle>
        <DialogContent>
          <DialogContentText>
            คุณแน่ใจหรือไม่ว่าต้องการยกเลิกการจองนี้?
          </DialogContentText>
          <DialogContentText sx={{ mt: 1, color: 'error.main' }}>
            หมายเหตุ: หากได้ชำระเงินแล้ว จะต้องติดต่อฝ่ายบริการลูกค้าเพื่อขอคืนเงิน
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setCancellingId(null)} variant="outlined">
            ยกเลิก
          </Button>
          <Button onClick={handleCancelConfirm} variant="contained" color="error" autoFocus>
            ยืนยันการยกเลิก
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

