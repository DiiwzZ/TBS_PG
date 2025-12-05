'use client';

import { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  Divider,
  Chip,
} from '@mui/material';
import {
  EventAvailable,
  WatchLater,
  LocationOn,
  TableBar,
  People,
  AttachMoney,
} from '@mui/icons-material';
import { TIME_SLOT_INFO } from '@/types/booking';
import type { Booking } from '@/types/booking';

interface PaymentSummaryProps {
  booking: Booking;
  zoneName?: string;
  tableName?: string;
}

export default function PaymentSummary({ booking, zoneName, tableName }: PaymentSummaryProps) {
  const timeSlotInfo = TIME_SLOT_INFO[booking.timeSlot];
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <Paper 
      elevation={3} 
      sx={{ 
        p: { xs: 2, sm: 3 }, 
        border: '1px solid rgba(255, 167, 38, 0.2)',
        position: { xs: 'relative', md: 'sticky' },
        top: { md: 20 },
      }}
    >
      <Typography 
        variant="h6" 
        gutterBottom 
        color="primary"
        sx={{ fontSize: { xs: '1rem', sm: '1.125rem', md: '1.25rem' } }}
      >
        รายละเอียดการจอง
      </Typography>

      <Divider sx={{ my: 2 }} />

      {/* Booking ID */}
      <Box mb={2}>
        <Typography variant="body2" color="text.secondary">
          หมายเลขการจอง
        </Typography>
        <Typography variant="body1" fontWeight="bold">
          #{booking.id}
        </Typography>
      </Box>

      {/* Zone/Table */}
      {booking.bookingType === 'NORMAL' && zoneName && (
        <Box mb={2}>
          <Box display="flex" alignItems="center" gap={1} mb={0.5}>
            <LocationOn color="primary" fontSize="small" />
            <Typography variant="body2" color="text.secondary">
              โซน
            </Typography>
          </Box>
          <Typography variant="body1">{zoneName}</Typography>
        </Box>
      )}

      {booking.bookingType === 'PREMIUM' && tableName && (
        <Box mb={2}>
          <Box display="flex" alignItems="center" gap={1} mb={0.5}>
            <TableBar color="primary" fontSize="small" />
            <Typography variant="body2" color="text.secondary">
              โต๊ะ
            </Typography>
          </Box>
          <Typography variant="body1">{tableName}</Typography>
        </Box>
      )}

      <Divider sx={{ my: 2 }} />

      {/* Date & Time */}
      <Box mb={2}>
        <Box display="flex" alignItems="center" gap={1} mb={0.5}>
          <EventAvailable color="primary" fontSize="small" />
          <Typography variant="body2" color="text.secondary">
            วันที่
          </Typography>
        </Box>
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

      <Box mb={2}>
        <Box display="flex" alignItems="center" gap={1} mb={0.5}>
          <WatchLater color="primary" fontSize="small" />
          <Typography variant="body2" color="text.secondary">
            ช่วงเวลา
          </Typography>
        </Box>
        <Typography variant="body1">
          {timeSlotInfo.icon} {timeSlotInfo.labelTh}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          เข้าใช้บริการได้ถึงเวลา {timeSlotInfo.time} น.
        </Typography>
      </Box>

      {/* Guest Count */}
      <Box mb={2}>
        <Box display="flex" alignItems="center" gap={1} mb={0.5}>
          <People color="primary" fontSize="small" />
          <Typography variant="body2" color="text.secondary">
            จำนวนผู้ใช้บริการ
          </Typography>
        </Box>
        <Typography variant="body1">{booking.guestCount} คน</Typography>
      </Box>

      <Divider sx={{ my: 2 }} />

      {/* Fee */}
      <Box>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
          <Box display="flex" alignItems="center" gap={1}>
            <AttachMoney color="primary" />
            <Typography variant="subtitle1" color="primary">
              ยอดชำระ
            </Typography>
          </Box>
          <Typography 
            variant="h4" 
            color={booking.fee === 0 ? 'success.main' : 'primary.main'}
            sx={{ fontSize: { xs: '1.5rem', sm: '2rem', md: '2.125rem' } }}
          >
            {booking.fee === 0 ? 'ฟรี!' : `฿${booking.fee.toLocaleString()}`}
          </Typography>
        </Box>
        <Typography variant="caption" color="text.secondary">
          {booking.fee === 0 ? 'ไม่มีค่าบริการ' : 'ค่าบริการรอบเวลา'}
        </Typography>
      </Box>

      {/* Status */}
      <Box mt={3}>
        <Chip
          label={`สถานะ: ${booking.status}`}
          color={booking.status === 'PENDING' ? 'warning' : 'success'}
          sx={{ width: '100%' }}
        />
      </Box>
    </Paper>
  );
}

