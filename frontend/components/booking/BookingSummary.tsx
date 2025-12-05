'use client';

import { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  Divider,
  Alert,
  Chip,
  IconButton,
} from '@mui/material';
import {
  EventAvailable,
  WatchLater,
  LocationOn,
  TableBar,
  People,
  AttachMoney,
  Info,
  Add,
  Remove,
} from '@mui/icons-material';
import { TIME_SLOT_INFO, getFeeForSlot, type BookingDraft } from '@/types/booking';
import { useTableStore } from '@/lib/store/tableStore';

interface BookingSummaryProps {
  draft: BookingDraft;
  guestCount: number;
  onGuestCountChange: (count: number) => void;
}

export default function BookingSummary({ draft, guestCount, onGuestCountChange }: BookingSummaryProps) {
  const { tablesByZone, zones } = useTableStore();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Get zone/table details
  const selectedZone = zones.find((z) => z.id === draft.zoneId);
  const selectedTable = draft.zoneId && draft.tableId
    ? tablesByZone[draft.zoneId]?.find((t) => t.id === draft.tableId)
    : null;

  // Get time slot info
  const timeSlotInfo = draft.timeSlot ? TIME_SLOT_INFO[draft.timeSlot] : null;

  // Calculate fee based on booking type
  const calculatedFee = draft.timeSlot && draft.bookingType 
    ? getFeeForSlot(draft.timeSlot, draft.bookingType) 
    : 0;

  // Calculate max guests based on selection
  const maxGuests = selectedTable?.capacity || 8;
  
  // Calculate required tables (4 people per table)
  const requiredTables = Math.ceil(guestCount / 4);

  return (
    <Box>
      <Typography variant="h6" gutterBottom color="primary" fontWeight={600}>
        สรุปการจอง
      </Typography>
      <Typography variant="body2" color="text.secondary" mb={3}>
        ตรวจสอบรายละเอียดก่อนยืนยันการจอง
      </Typography>

      <Paper 
        elevation={3} 
        className="premium-card"
        sx={{ 
          p: 3,
          borderRadius: 2,
        }}
      >
        {/* Booking Type */}
        <Box mb={3}>
          <Typography variant="subtitle2" color="text.secondary" gutterBottom>
            ประเภทการจอง
          </Typography>
          <Chip
            label={draft.bookingType === 'PREMIUM' ? 'จองโต๊ะเฉพาะ (พรีเมียม)' : 'จองตามโซน (ปกติ)'}
            color={draft.bookingType === 'PREMIUM' ? 'secondary' : 'primary'}
            icon={<Info />}
          />
        </Box>

        <Divider sx={{ my: 2 }} />

        {/* Zone/Table */}
        {draft.bookingType === 'NORMAL' && selectedZone && (
          <Box mb={3}>
            <Box display="flex" alignItems="center" gap={1} mb={1}>
              <LocationOn color="primary" />
              <Typography variant="subtitle1" color="primary">
                โซน
              </Typography>
            </Box>
            <Typography variant="body1">
              {selectedZone.name}
            </Typography>
            {selectedZone.description && (
              <Typography variant="body2" color="text.secondary">
                {selectedZone.description}
              </Typography>
            )}
          </Box>
        )}

        {draft.bookingType === 'PREMIUM' && selectedTable && (
          <Box mb={3}>
            <Box display="flex" alignItems="center" gap={1} mb={1}>
              <TableBar color="primary" />
              <Typography variant="subtitle1" color="primary">
                โต๊ะ
              </Typography>
            </Box>
            <Typography variant="body1">
              โต๊ะ {selectedTable.tableNumber} ({selectedTable.zoneName})
            </Typography>
            <Typography variant="body2" color="text.secondary">
              รองรับ: {selectedTable.capacity} ที่นั่ง
            </Typography>
          </Box>
        )}

        <Divider sx={{ my: 2 }} />

        {/* Date & Time */}
        {draft.bookingDate && (
          <Box mb={3}>
            <Box display="flex" alignItems="center" gap={1} mb={1}>
              <EventAvailable color="primary" />
              <Typography variant="subtitle1" color="primary">
                วันที่
              </Typography>
            </Box>
            <Typography variant="body1">
              {isMounted ? (
                new Date(draft.bookingDate).toLocaleDateString('th-TH', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  weekday: 'long',
                })
              ) : (
                new Date(draft.bookingDate).toISOString().split('T')[0]
              )}
            </Typography>
          </Box>
        )}

        {timeSlotInfo && (
          <Box mb={3}>
            <Box display="flex" alignItems="center" gap={1} mb={1}>
              <WatchLater color="primary" />
              <Typography variant="subtitle1" color="primary">
                รอบเวลา
              </Typography>
            </Box>
            <Typography variant="body1">
              {timeSlotInfo.icon} {timeSlotInfo.labelTh}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              เข้าใช้บริการได้ถึงเวลา {timeSlotInfo.time} น.
            </Typography>
          </Box>
        )}

        <Divider sx={{ my: 2 }} />

        {/* Guest Count */}
        <Box mb={3}>
          <Box display="flex" alignItems="center" gap={1} mb={2}>
            <People color="primary" />
            <Typography variant="subtitle1" color="primary">
              จำนวนผู้ใช้บริการ
            </Typography>
          </Box>
          
          {/* Counter Controls */}
          <Box 
            sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              gap: 2,
              p: 2,
              borderRadius: 2,
              backgroundColor: 'rgba(212, 175, 55, 0.05)',
              border: '2px solid rgba(212, 175, 55, 0.2)',
            }}
          >
            <IconButton
              onClick={() => onGuestCountChange(Math.max(1, guestCount - 1))}
              disabled={guestCount <= 1}
              size="large"
              sx={{
                width: 56,
                height: 56,
                backgroundColor: 'rgba(212, 175, 55, 0.1)',
                border: '2px solid',
                borderColor: guestCount <= 1 ? 'rgba(255, 255, 255, 0.1)' : 'primary.main',
                '&:hover': {
                  backgroundColor: 'rgba(212, 175, 55, 0.2)',
                  transform: 'scale(1.05)',
                },
                '&:disabled': {
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  borderColor: 'rgba(255, 255, 255, 0.1)',
                },
                transition: 'all 200ms ease',
              }}
            >
              <Remove fontSize="large" />
            </IconButton>

            <Box 
              sx={{ 
                minWidth: 120,
                textAlign: 'center',
                px: 3,
                py: 2,
                borderRadius: 2,
                backgroundColor: 'rgba(212, 175, 55, 0.15)',
                border: '2px solid rgba(212, 175, 55, 0.3)',
              }}
            >
              <Typography 
                variant="h3" 
                sx={{ 
                  fontWeight: 700,
                  color: 'primary.main',
                  fontFamily: '"Playfair Display", Georgia, serif',
                  lineHeight: 1,
                }}
              >
                {guestCount}
              </Typography>
              <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5, display: 'block' }}>
                คน
              </Typography>
            </Box>

            <IconButton
              onClick={() => onGuestCountChange(Math.min(maxGuests, guestCount + 1))}
              disabled={guestCount >= maxGuests}
              size="large"
              sx={{
                width: 56,
                height: 56,
                backgroundColor: 'rgba(212, 175, 55, 0.1)',
                border: '2px solid',
                borderColor: guestCount >= maxGuests ? 'rgba(255, 255, 255, 0.1)' : 'primary.main',
                '&:hover': {
                  backgroundColor: 'rgba(212, 175, 55, 0.2)',
                  transform: 'scale(1.05)',
                },
                '&:disabled': {
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  borderColor: 'rgba(255, 255, 255, 0.1)',
                },
                transition: 'all 200ms ease',
              }}
            >
              <Add fontSize="large" />
            </IconButton>
          </Box>

          {/* Helper Text */}
          <Typography 
            variant="caption" 
            color="text.secondary" 
            sx={{ mt: 1.5, display: 'block', textAlign: 'center' }}
          >
            สูงสุด {maxGuests} คน (4 คนต่อ 1 โต๊ะ)
          </Typography>

          {/* Summary Info */}
          {guestCount > 0 && (
            <Box 
              sx={{ 
                mt: 2, 
                p: 2, 
                borderRadius: 2,
                backgroundColor: 'rgba(212, 175, 55, 0.1)',
                border: '1px solid rgba(212, 175, 55, 0.3)',
              }}
            >
              <Typography variant="body2" color="primary" fontWeight={600}>
                📊 จำนวนคน: {guestCount} คน
              </Typography>
              <Typography variant="body2" color="primary" fontWeight={600} sx={{ mt: 0.5 }}>
                🪑 จำนวนโต๊ะที่ต้องใช้: {requiredTables} โต๊ะ
              </Typography>
              <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5, display: 'block' }}>
                (คำนวณจาก 4 คนต่อ 1 โต๊ะ)
              </Typography>
            </Box>
          )}
        </Box>

        <Divider sx={{ my: 2 }} />

        {/* Fee */}
        {timeSlotInfo && (
          <Box 
            sx={{ 
              p: 2, 
              borderRadius: 2,
              backgroundColor: calculatedFee === 0 ? 'rgba(16, 185, 129, 0.1)' : 'rgba(212, 175, 55, 0.1)',
              border: calculatedFee === 0 ? '1px solid rgba(16, 185, 129, 0.3)' : '1px solid rgba(212, 175, 55, 0.3)',
            }}
          >
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Box display="flex" alignItems="center" gap={1}>
                <AttachMoney color="primary" />
                <Typography variant="subtitle1" color="primary" fontWeight={600}>
                  ค่าบริการ
                </Typography>
              </Box>
              <Typography 
                variant="h5" 
                sx={{ 
                  color: calculatedFee === 0 ? 'success.main' : 'primary.main',
                  fontWeight: 700,
                  fontFamily: '"Playfair Display", Georgia, serif',
                }}
              >
                {calculatedFee === 0 ? '🎉 ฟรี!' : `฿${calculatedFee.toLocaleString()}`}
              </Typography>
            </Box>
            {calculatedFee > 0 && (
              <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
                💳 ชำระเงินหลังจากยืนยันการจอง
              </Typography>
            )}
          </Box>
        )}
      </Paper>

      {timeSlotInfo?.slot === 'SLOT_20_00' && draft.bookingType && (
        <Alert severity="info" sx={{ mt: 2 }}>
          <strong>รอบ 20:00 น.:</strong>{' '}
          {draft.bookingType === 'NORMAL' 
            ? 'ไม่มีค่าบริการ แต่หากไม่เช็คอินภายใน 15 นาทีหลังเวลาที่จอง (No-Show) ครบ 3 ครั้ง จะถูกระงับสิทธิ์การจองรอบฟรี'
            : 'Premium Booking: มีค่าล็อคโต๊ะ ฿150 เพื่อรับประกันโต๊ะที่เลือก'
          }
        </Alert>
      )}

      {guestCount > maxGuests && (
        <Alert severity="error" sx={{ mt: 2 }}>
          จำนวนผู้ใช้บริการเกินความจุสูงสุด (สูงสุด {maxGuests} คน)
        </Alert>
      )}
    </Box>
  );
}

