'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import {
  Box,
  Container,
  Paper,
  Typography,
  Button,
  CircularProgress,
  Alert,
} from '@mui/material';
import { CheckCircle, Home, CalendarMonth, QrCode2 } from '@mui/icons-material';
import Navbar from '@/components/layout/Navbar';
import { useAuthStore } from '@/lib/store/authStore';
import { useBookingStore } from '@/lib/store/bookingStore';
import Link from 'next/link';

export default function PaymentSuccessPage() {
  const router = useRouter();
  const params = useParams();
  const bookingId = parseInt(params.id as string);

  const { isAuthenticated, user, isHydrated } = useAuthStore();
  const { getBookingById } = useBookingStore();

  const [booking, setBooking] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isHydrated && !isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, isHydrated, router]);

  useEffect(() => {
    const loadBooking = async () => {
      try {
        setIsLoading(true);
        const bookingData = await getBookingById(bookingId);
        setBooking(bookingData);
      } catch (err) {
        console.error('Failed to load booking:', err);
      } finally {
        setIsLoading(false);
      }
    };

    if (bookingId) {
      loadBooking();
    }
  }, [bookingId, getBookingById]);

  if (!isHydrated || !isAuthenticated || !user) {
    return null;
  }

  if (isLoading) {
    return (
      <>
        <Navbar />
        <Container 
          maxWidth="lg" 
          sx={{ 
            mt: { xs: 2, sm: 4 },
            px: { xs: 2, sm: 3 },
            pb: { xs: 'calc(64px + 24px)', md: 4 }
          }}
        >
          <Box display="flex" justifyContent="center" alignItems="center" minHeight={{ xs: 300, sm: 400 }}>
            <CircularProgress />
          </Box>
        </Container>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <Container 
        maxWidth="md" 
        sx={{ 
          mt: { xs: 2, sm: 4 }, 
          mb: 4, 
          px: { xs: 2, sm: 3 },
          pb: { xs: 'calc(64px + 24px)', md: 4 }
        }}
      >
        <Paper 
          elevation={3} 
          sx={{ 
            p: { xs: 3, sm: 6 }, 
            border: '2px solid',
            borderColor: 'success.main',
            textAlign: 'center',
          }}
        >
          {/* Success Icon */}
          <Box
            sx={{
              width: { xs: 80, sm: 100 },
              height: { xs: 80, sm: 100 },
              borderRadius: '50%',
              backgroundColor: 'success.main',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mx: 'auto',
              mb: 3,
              animation: 'scaleIn 0.5s ease-out',
              '@keyframes scaleIn': {
                from: {
                  transform: 'scale(0)',
                  opacity: 0,
                },
                to: {
                  transform: 'scale(1)',
                  opacity: 1,
                },
              },
            }}
          >
            <CheckCircle sx={{ fontSize: { xs: 48, sm: 60 }, color: 'white' }} />
          </Box>

          {/* Success Message */}
          <Typography variant="h3" gutterBottom color="success.main" sx={{ fontSize: { xs: '1.8rem', sm: '2.5rem' } }}>
            ชำระเงินสำเร็จ!
          </Typography>
          
          <Typography 
            variant="h6" 
            color="text.secondary" 
            gutterBottom
            sx={{ fontSize: { xs: '1rem', sm: '1.125rem', md: '1.25rem' } }}
          >
            การจองของคุณได้รับการยืนยันแล้ว
          </Typography>

          {booking && (
            <Alert severity="success" sx={{ mt: 3, mb: 3 }}>
              <Typography variant="body1" gutterBottom>
                <strong>หมายเลขการจอง:</strong> #{booking.id}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                กรุณาบันทึกหมายเลขนี้สำหรับการเช็คอิน
              </Typography>
            </Alert>
          )}

          <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
            คุณจะได้รับอีเมลยืนยันพร้อม QR Code สำหรับเช็คอินในอีกสักครู่
          </Typography>

          {/* Action Buttons */}
          <Box display="flex" gap={2} justifyContent="center" flexDirection={{ xs: 'column', sm: 'row' }}>
            <Button
              component={Link}
              href={`/bookings/${bookingId}`}
              variant="contained"
              size="large"
              startIcon={<CalendarMonth />}
              fullWidth={{ xs: true, sm: false }}
              sx={{ 
                minWidth: { sm: 200 },
                minHeight: { xs: 44, sm: 'auto' },
                fontSize: { xs: '0.9375rem', sm: '1rem' },
              }}
            >
              ดูรายละเอียดการจอง
            </Button>
            
            <Button
              component={Link}
              href={`/bookings/${bookingId}/qr`}
              variant="outlined"
              size="large"
              startIcon={<QrCode2 />}
              fullWidth={{ xs: true, sm: false }}
              sx={{ 
                minWidth: { sm: 200 },
                minHeight: { xs: 44, sm: 'auto' },
                fontSize: { xs: '0.9375rem', sm: '1rem' },
              }}
            >
              ดู QR Code
            </Button>
          </Box>

          <Button
            component={Link}
            href="/dashboard"
            variant="text"
            startIcon={<Home />}
            sx={{ mt: 3 }}
          >
            กลับหน้าหลัก
          </Button>
        </Paper>
      </Container>
    </>
  );
}

