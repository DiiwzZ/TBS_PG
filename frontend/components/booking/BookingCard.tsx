'use client';

import { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Box,
  Chip,
  Button,
  IconButton,
} from '@mui/material';
import {
  EventAvailable,
  WatchLater,
  LocationOn,
  TableBar,
  People,
  AttachMoney,
  Visibility,
  Cancel,
  QrCode2,
} from '@mui/icons-material';
import { useRouter } from 'next/navigation';
import { TIME_SLOT_INFO, type Booking } from '@/types/booking';

interface BookingCardProps {
  booking: Booking;
  zoneName?: string;
  tableName?: string;
  onCancel?: (bookingId: number) => void;
  showActions?: boolean;
}

export default function BookingCard({
  booking,
  zoneName,
  tableName,
  onCancel,
  showActions = true,
}: BookingCardProps) {
  const router = useRouter();
  const timeSlotInfo = TIME_SLOT_INFO[booking.timeSlot];
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const getStatusColor = (status: string): 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning' | undefined => {
    switch (status) {
      case 'PENDING':
        return 'warning';
      case 'CONFIRMED':
        return 'info';
      case 'CHECKED_IN':
        return 'primary';
      case 'COMPLETED':
        return 'success';
      case 'CANCELLED':
        return undefined;
      case 'NO_SHOW':
        return 'error';
      default:
        return undefined;
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'PENDING':
        return 'รอชำระเงิน';
      case 'CONFIRMED':
        return 'ยืนยันแล้ว';
      case 'CHECKED_IN':
        return 'เช็คอินแล้ว';
      case 'COMPLETED':
        return 'เสร็จสิ้น';
      case 'CANCELLED':
        return 'ยกเลิก';
      case 'NO_SHOW':
        return 'ไม่มาตามนัด';
      default:
        return status;
    }
  };

  const canCancel = booking.status === 'PENDING' || booking.status === 'CONFIRMED';
  const canViewQR = booking.status === 'CONFIRMED' || booking.status === 'CHECKED_IN';

  return (
    <Card
      elevation={3}
      sx={{
        border: '1px solid rgba(255, 167, 38, 0.2)',
        transition: 'all 0.3s',
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: 4,
        },
      }}
    >
      <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
        {/* Header */}
        <Box 
          display="flex" 
          alignItems="center" 
          gap={1}
          mb={2}
        >
          <Box 
            sx={{ 
              width: '50%',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <Typography 
              variant="h6" 
              color="primary"
              sx={{
                fontSize: { xs: '0.95rem', sm: '1.25rem' },
                fontWeight: 600,
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
              color={getStatusColor(booking.status)}
              size="small"
              sx={{
                width: '100%',
                fontWeight: 600,
                '& .MuiChip-label': {
                  px: 1.5,
                },
              }}
            />
          </Box>
        </Box>

        {/* Zone/Table */}
        {zoneName && (
          <Box display="flex" alignItems="center" gap={1} mb={1}>
            <LocationOn fontSize="small" color="action" />
            <Typography 
              variant="body2" 
              color="text.secondary"
              sx={{ fontSize: { xs: '0.8125rem', sm: '0.875rem' } }}
            >
              {zoneName}
            </Typography>
          </Box>
        )}

        {tableName && (
          <Box display="flex" alignItems="center" gap={1} mb={1}>
            <TableBar fontSize="small" color="action" />
            <Typography 
              variant="body2" 
              color="text.secondary"
              sx={{ fontSize: { xs: '0.8125rem', sm: '0.875rem' } }}
            >
              {tableName}
            </Typography>
          </Box>
        )}

        {/* Date & Time */}
        <Box display="flex" alignItems="center" gap={1} mb={1}>
          <EventAvailable fontSize="small" color="action" />
          <Typography 
            variant="body2" 
            color="text.secondary"
            sx={{ fontSize: { xs: '0.8125rem', sm: '0.875rem' } }}
          >
            {isMounted ? (
              new Date(booking.bookingDate).toLocaleDateString('th-TH', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
              })
            ) : (
              new Date(booking.bookingDate).toISOString().split('T')[0]
            )}
          </Typography>
        </Box>

        <Box display="flex" alignItems="center" gap={1} mb={1}>
          <WatchLater fontSize="small" color="action" />
          <Typography 
            variant="body2" 
            color="text.secondary"
            sx={{ fontSize: { xs: '0.8125rem', sm: '0.875rem' } }}
          >
            {timeSlotInfo.icon} {timeSlotInfo.labelTh}
          </Typography>
        </Box>

        {/* Guest Count */}
        <Box display="flex" alignItems="center" gap={1} mb={2}>
          <People fontSize="small" color="action" />
          <Typography 
            variant="body2" 
            color="text.secondary"
            sx={{ fontSize: { xs: '0.8125rem', sm: '0.875rem' } }}
          >
            {booking.guestCount} คน
          </Typography>
        </Box>

        {/* Fee */}
        <Box display="flex" alignItems="center" gap={1}>
          <AttachMoney fontSize="small" color="primary" />
          <Typography 
            variant="h6" 
            color={booking.fee === 0 ? 'success.main' : 'primary.main'}
            sx={{ fontSize: { xs: '1rem', sm: '1.25rem' } }}
          >
            {booking.fee === 0 ? 'ฟรี' : `฿${booking.fee.toLocaleString()}`}
          </Typography>
        </Box>
      </CardContent>

      {showActions && (
        <CardActions sx={{ 
          justifyContent: 'space-between', 
          px: { xs: 1.5, sm: 2 }, 
          pb: { xs: 1.5, sm: 2 },
          flexDirection: { xs: 'column', sm: 'row' },
          gap: { xs: 1, sm: 0 },
        }}>
          <Button
            size="small"
            fullWidth={{ xs: true, sm: false }}
            startIcon={<Visibility />}
            onClick={() => router.push(`/bookings/${booking.id}`)}
            sx={{ 
              minHeight: { xs: 40, sm: 'auto' },
              fontSize: { xs: '0.8125rem', sm: '0.875rem' },
            }}
          >
            ดูรายละเอียด
          </Button>

          <Box display="flex" gap={1}>
            {canViewQR && (
              <IconButton
                size="small"
                color="primary"
                onClick={() => router.push(`/bookings/${booking.id}/qr`)}
                title="ดู QR Code"
              >
                <QrCode2 />
              </IconButton>
            )}

            {canCancel && onCancel && (
              <IconButton
                size="small"
                color="error"
                onClick={() => onCancel(booking.id)}
                title="ยกเลิกการจอง"
              >
                <Cancel />
              </IconButton>
            )}
          </Box>
        </CardActions>
      )}
    </Card>
  );
}

