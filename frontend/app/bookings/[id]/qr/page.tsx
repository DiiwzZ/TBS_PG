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
  Divider,
} from '@mui/material';
import { ArrowBack, EventAvailable, LocationOn } from '@mui/icons-material';
import Navbar from '@/components/layout/Navbar';
import QRCodeDisplay from '@/components/checkin/QRCodeDisplay';
import { useAuthStore } from '@/lib/store/authStore';
import { useBookingStore } from '@/lib/store/bookingStore';
import { useTableStore } from '@/lib/store/tableStore';

export default function QRCodePage() {
  const router = useRouter();
  const params = useParams();
  const bookingId = parseInt(params.id as string);

  const { isAuthenticated, user, isHydrated } = useAuthStore();
  const { getBookingById } = useBookingStore();
  const { zones, fetchZoneById } = useTableStore();

  const [booking, setBooking] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

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
        
        if (!bookingData) {
          setError('ไม่พบข้อมูลการจอง');
          return;
        }

        if (bookingData.status === 'PENDING') {
          setError('กรุณาชำระเงินก่อนรับ QR Code');
          return;
        }

        if (bookingData.status === 'CANCELLED' || bookingData.status === 'NO_SHOW') {
          setError('การจองนี้ถูกยกเลิกหรือหมดอายุแล้ว');
          return;
        }

        setBooking(bookingData);

        // Load zone data
        if (bookingData.zoneId) {
          fetchZoneById(bookingData.zoneId);
        }
      } catch (err) {
        setError('ไม่สามารถโหลดข้อมูลการจองได้');
      } finally {
        setIsLoading(false);
      }
    };

    if (bookingId) {
      loadBooking();
    }
  }, [bookingId, getBookingById, fetchZoneById]);

  if (!isHydrated || !isAuthenticated || !user) {
    return null;
  }

  if (isLoading) {
    return (
      <>
        <Navbar />
        <Container maxWidth="md" sx={{ mt: 4 }}>
          <Box display="flex" justifyContent="center" alignItems="center" minHeight={400}>
            <CircularProgress />
          </Box>
        </Container>
      </>
    );
  }

  if (error || !booking) {
    return (
      <>
        <Navbar />
        <Container maxWidth="md" sx={{ mt: 4 }}>
          <Alert severity="error" sx={{ mb: 2 }}>
            {error || 'เกิดข้อผิดพลาด'}
          </Alert>
          <Button startIcon={<ArrowBack />} onClick={() => router.back()}>
            ย้อนกลับ
          </Button>
        </Container>
      </>
    );
  }

  const zone = zones.find((z) => z.id === booking.zoneId);

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
        <Button
          variant="outlined"
          startIcon={<ArrowBack />}
          onClick={() => router.back()}
          sx={{ 
            mb: 3,
            transition: 'all 300ms ease',
            '&:hover': {
              transform: 'translateX(-4px)',
            }
          }}
        >
          ย้อนกลับ
        </Button>

        <Paper 
          elevation={6} 
          className="premium-card"
          sx={{ 
            p: { xs: 3, sm: 5 },
            borderRadius: 4,
            background: 'linear-gradient(135deg, rgba(26, 26, 26, 0.95), rgba(10, 10, 10, 0.95))',
            border: '2px solid rgba(212, 175, 55, 0.3)',
            boxShadow: '0 8px 32px rgba(212, 175, 55, 0.2)',
          }}
        >
          <Typography 
            variant="h4" 
            gutterBottom 
            textAlign="center" 
            sx={{ 
              fontSize: { xs: '1.75rem', sm: '2.5rem' },
              fontFamily: '"Playfair Display", Georgia, serif',
              fontWeight: 700,
              background: 'linear-gradient(135deg, #D4AF37, #F4E5B8)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              mb: 1,
            }}
          >
            QR Code Check-in
          </Typography>
          <Typography 
            variant="body2" 
            color="text.secondary" 
            textAlign="center" 
            sx={{ mb: 3 }}
          >
            ✨ แสดง QR Code นี้เมื่อเข้าใช้บริการ
          </Typography>

          <Divider sx={{ my: 3, borderColor: 'rgba(212, 175, 55, 0.2)' }} />

          {/* Booking Info */}
          <Box 
            mb={4} 
            sx={{ 
              p: 3, 
              borderRadius: 2,
              backgroundColor: 'rgba(212, 175, 55, 0.05)',
              border: '1px solid rgba(212, 175, 55, 0.2)',
            }}
          >
            {zone && (
              <Box display="flex" alignItems="center" gap={1.5} mb={2}>
                <LocationOn sx={{ color: 'primary.main', fontSize: 28 }} />
                <Box>
                  <Typography variant="caption" color="text.secondary" display="block">
                    โซน
                  </Typography>
                  <Typography variant="h6" fontWeight={600}>
                    {zone.name}
                  </Typography>
                </Box>
              </Box>
            )}

            <Box display="flex" alignItems="center" gap={1.5}>
              <EventAvailable sx={{ color: 'primary.main', fontSize: 28 }} />
              <Box>
                <Typography variant="caption" color="text.secondary" display="block">
                  วันที่จอง
                </Typography>
                <Typography variant="h6" fontWeight={600}>
                  {isMounted ? (
                    new Date(booking.bookingDate).toLocaleDateString('th-TH', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      weekday: 'long',
                    })
                  ) : (
                    new Date(booking.bookingDate).toISOString().split('T')[0]
                  )}
                </Typography>
              </Box>
            </Box>
          </Box>

          {/* QR Code - Elegant Frame */}
          <Box
            sx={{
              position: 'relative',
              p: 4,
              borderRadius: 3,
              background: 'radial-gradient(circle at center, rgba(244, 229, 184, 0.1), transparent)',
              border: '3px solid',
              borderImage: 'linear-gradient(135deg, #D4AF37, #F4E5B8, #D4AF37) 1',
              boxShadow: '0 0 40px rgba(212, 175, 55, 0.3), inset 0 0 40px rgba(212, 175, 55, 0.1)',
              animation: 'pulse 2s ease-in-out infinite',
              '@keyframes pulse': {
                '0%, 100%': { boxShadow: '0 0 40px rgba(212, 175, 55, 0.3), inset 0 0 40px rgba(212, 175, 55, 0.1)' },
                '50%': { boxShadow: '0 0 60px rgba(212, 175, 55, 0.5), inset 0 0 60px rgba(212, 175, 55, 0.2)' }
              }
            }}
          >
            {/* Corner Decorations */}
            <Box
              sx={{
                position: 'absolute',
                top: -2,
                left: -2,
                right: -2,
                bottom: -2,
                borderRadius: 3,
                background: 'linear-gradient(135deg, #D4AF37 0%, transparent 10%, transparent 90%, #D4AF37 100%)',
                pointerEvents: 'none',
                opacity: 0.3,
              }}
            />
            
            <QRCodeDisplay
              bookingId={booking.id}
              bookingDate={booking.bookingDate}
            />
          </Box>

          {/* Instructions */}
          <Alert 
            severity="info" 
            sx={{ 
              mt: 4,
              borderRadius: 2,
              backgroundColor: 'rgba(33, 150, 243, 0.08)',
              border: '1px solid rgba(33, 150, 243, 0.3)',
            }}
          >
            <Typography variant="subtitle2" gutterBottom fontWeight={600}>
              📱 วิธีใช้งาน
            </Typography>
            <Typography variant="body2" component="ol" sx={{ pl: 2, mb: 0, '& li': { mb: 1 } }}>
              <li>แสดง QR Code นี้ต่อเจ้าหน้าที่เมื่อมาถึงร้าน</li>
              <li>เจ้าหน้าที่จะสแกน QR Code เพื่อยืนยันการเช็คอิน</li>
              <li>เมื่อเช็คอินสำเร็จ คุณสามารถเข้าใช้บริการได้ทันที</li>
            </Typography>
          </Alert>

          {/* Additional Info */}
          <Alert 
            severity="warning" 
            sx={{ 
              mt: 2,
              borderRadius: 2,
              backgroundColor: 'rgba(245, 158, 11, 0.08)',
              border: '1px solid rgba(245, 158, 11, 0.3)',
            }}
          >
            <Typography variant="body2">
              ⏰ <strong>สำคัญ:</strong> กรุณาเช็คอินภายใน 15 นาทีหลังจากเวลารอบที่จอง มิฉะนั้นจะถูกบันทึกเป็น No-Show
            </Typography>
          </Alert>
        </Paper>
      </Container>
    </>
  );
}

