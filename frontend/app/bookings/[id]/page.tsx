'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import {
  Box,
  Container,
  Paper,
  Typography,
  Button,
  Grid,
  Divider,
  CircularProgress,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Chip,
} from '@mui/material';
import {
  ArrowBack,
  Cancel,
  QrCode2,
  Download,
  EventAvailable,
  WatchLater,
  LocationOn,
  TableBar,
  People,
  AttachMoney,
} from '@mui/icons-material';
import Navbar from '@/components/layout/Navbar';
import BookingTimeline from '@/components/booking/BookingTimeline';
import { useAuthStore } from '@/lib/store/authStore';
import { useBookingStore } from '@/lib/store/bookingStore';
import { useTableStore } from '@/lib/store/tableStore';
import { TIME_SLOT_INFO } from '@/types/booking';
import Link from 'next/link';

export default function BookingDetailPage() {
  const router = useRouter();
  const params = useParams();
  const bookingId = parseInt(params.id as string);

  const { isAuthenticated, user, isHydrated } = useAuthStore();
  const { getBookingById, cancelBooking } = useBookingStore();
  const { zones, tablesByZone, fetchZoneById, fetchTablesByZone } = useTableStore();

  const [booking, setBooking] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showCancelDialog, setShowCancelDialog] = useState(false);
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

        setBooking(bookingData);

        // Load zone/table data
        if (bookingData.zoneId) {
          fetchZoneById(bookingData.zoneId);
          fetchTablesByZone(bookingData.zoneId);
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
  }, [bookingId, getBookingById, fetchZoneById, fetchTablesByZone]);

  const handleCancelConfirm = async () => {
    try {
      await cancelBooking(bookingId);
      setShowCancelDialog(false);
      // Reload booking
      const updatedBooking = await getBookingById(bookingId);
      setBooking(updatedBooking);
    } catch (err: any) {
      setError(err.message || 'ไม่สามารถยกเลิกการจองได้');
    }
  };

  if (!isHydrated || !isAuthenticated || !user) {
    return null;
  }

  if (isLoading) {
    return (
      <>
        <Navbar />
        <Container maxWidth="lg" sx={{ mt: 4 }}>
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
        <Container maxWidth="lg" sx={{ mt: 4 }}>
          <Alert severity="error" sx={{ mb: 2 }}>
            {error || 'เกิดข้อผิดพลาด'}
          </Alert>
          <Button startIcon={<ArrowBack />} onClick={() => router.push('/dashboard')}>
            กลับหน้าหลัก
          </Button>
        </Container>
      </>
    );
  }

  const zone = zones.find((z) => z.id === booking.zoneId);
  const table = booking.zoneId && booking.tableId
    ? tablesByZone[booking.zoneId]?.find((t) => t.id === booking.tableId)
    : null;
  const timeSlotInfo = TIME_SLOT_INFO[booking.timeSlot];

  const canCancel = booking.status === 'PENDING' || booking.status === 'CONFIRMED';
  const canViewQR = booking.status === 'CONFIRMED' || booking.status === 'CHECKED_IN';

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PENDING': return 'warning';
      case 'CONFIRMED': return 'info';
      case 'CHECKED_IN': return 'primary';
      case 'COMPLETED': return 'success';
      case 'CANCELLED': return 'default';
      case 'NO_SHOW': return 'error';
      default: return 'default';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'PENDING': return 'รอชำระเงิน';
      case 'CONFIRMED': return 'ยืนยันแล้ว';
      case 'CHECKED_IN': return 'เช็คอินแล้ว';
      case 'COMPLETED': return 'เสร็จสิ้น';
      case 'CANCELLED': return 'ยกเลิก';
      case 'NO_SHOW': return 'ไม่มาตามนัด';
      default: return status;
    }
  };

  return (
    <>
      <Navbar />
      <Container maxWidth="lg" sx={{ mt: { xs: 2, sm: 4 }, mb: 4, px: { xs: 2, sm: 3 } }}>
        {/* Header */}
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3} flexDirection={{ xs: 'column', sm: 'row' }} gap={2}>
          <Button
            variant="outlined"
            startIcon={<ArrowBack />}
            onClick={() => router.back()}
          >
            ย้อนกลับ
          </Button>

          <Box display="flex" gap={1} flexWrap="wrap">
            {canViewQR && (
              <Button
                component={Link}
                href={`/bookings/${bookingId}/qr`}
                variant="contained"
                startIcon={<QrCode2 />}
              >
                ดู QR Code
              </Button>
            )}

            {canCancel && (
              <Button
                variant="outlined"
                color="error"
                startIcon={<Cancel />}
                onClick={() => setShowCancelDialog(true)}
              >
                ยกเลิกการจอง
              </Button>
            )}
          </Box>
        </Box>

        <Grid container spacing={3}>
          {/* Main Content */}
          <Grid item xs={12} md={8}>
            <Paper elevation={3} sx={{ p: { xs: 2, sm: 4 }, border: '1px solid rgba(255, 167, 38, 0.2)' }}>
              <Box 
                display="flex" 
                alignItems="center" 
                gap={1}
                mb={3}
              >
                <Box 
                  sx={{ 
                    width: '50%',
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <Typography 
                    variant="h4" 
                    color="primary" 
                    sx={{ 
                      fontSize: { xs: '1.15rem', sm: '2rem' },
                      fontWeight: 700,
                    }}
                  >
                    การจอง #{booking.id}
                  </Typography>
                </Box>
                <Box 
                  sx={{ 
                    width: '50%',
                    display: 'flex',
                    justifyContent: 'flex-end',
                  }}
                >
                  <Chip
                    label={getStatusLabel(booking.status)}
                    color={getStatusColor(booking.status) as any}
                    sx={{
                      width: '100%',
                      fontWeight: 600,
                      '& .MuiChip-label': {
                        px: 2,
                      },
                    }}
                  />
                </Box>
              </Box>

              <Divider sx={{ my: 3 }} />

              {/* Booking Details */}
              <Box mb={4}>
                <Typography variant="h6" gutterBottom color="primary">
                  รายละเอียดการจอง
                </Typography>

                {zone && (
                  <Box display="flex" alignItems="center" gap={1} mb={2}>
                    <LocationOn color="primary" />
                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        โซน
                      </Typography>
                      <Typography variant="body1">
                        {zone.name}
                      </Typography>
                    </Box>
                  </Box>
                )}

                {table && (
                  <Box display="flex" alignItems="center" gap={1} mb={2}>
                    <TableBar color="primary" />
                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        โต๊ะ
                      </Typography>
                      <Typography variant="body1">
                        โต๊ะ {table.tableNumber}
                      </Typography>
                    </Box>
                  </Box>
                )}

                <Box display="flex" alignItems="center" gap={1} mb={2}>
                  <EventAvailable color="primary" />
                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      วันที่
                    </Typography>
                    <Typography variant="body1">
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

                <Box display="flex" alignItems="center" gap={1} mb={2}>
                  <WatchLater color="primary" />
                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      รอบเวลา
                    </Typography>
                    <Typography variant="body1">
                      {timeSlotInfo.icon} {timeSlotInfo.labelTh}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      เข้าใช้บริการได้ถึงเวลา {timeSlotInfo.time} น.
                    </Typography>
                  </Box>
                </Box>

                <Box display="flex" alignItems="center" gap={1} mb={2}>
                  <People color="primary" />
                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      จำนวนผู้ใช้บริการ
                    </Typography>
                    <Typography variant="body1">
                      {booking.guestCount} คน
                    </Typography>
                  </Box>
                </Box>

                <Box display="flex" alignItems="center" gap={1}>
                  <AttachMoney color="primary" />
                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      ค่าบริการ
                    </Typography>
                    <Typography variant="h6" color={booking.fee === 0 ? 'success.main' : 'primary.main'}>
                      {booking.fee === 0 ? 'ฟรี' : `฿${booking.fee.toLocaleString()}`}
                    </Typography>
                  </Box>
                </Box>
              </Box>

              {booking.status === 'NO_SHOW' && (
                <Alert severity="error">
                  <strong>No-Show:</strong> คุณไม่มาตามนัดการจองนี้ กรุณามาตรงเวลาในครั้งถัดไป
                </Alert>
              )}

              {booking.status === 'CANCELLED' && (
                <Alert severity="warning">
                  การจองนี้ถูกยกเลิกแล้ว
                </Alert>
              )}
            </Paper>
          </Grid>

          {/* Timeline Sidebar */}
          <Grid item xs={12} md={4}>
            <Paper elevation={3} sx={{ p: { xs: 2, sm: 3 }, border: '1px solid rgba(255, 167, 38, 0.2)' }}>
              <BookingTimeline booking={booking} />
            </Paper>
          </Grid>
        </Grid>
      </Container>

      {/* Cancel Confirmation Dialog */}
      <Dialog open={showCancelDialog} onClose={() => setShowCancelDialog(false)}>
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
          <Button onClick={() => setShowCancelDialog(false)} variant="outlined">
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

