'use client';

import { useState } from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  CardActionArea,
  Typography,
  TextField,
  Chip,
  Alert,
} from '@mui/material';
import { WatchLater, CalendarMonth, AttachMoney } from '@mui/icons-material';
import { TIME_SLOT_INFO, getFeeForSlot, type TimeSlot, type BookingType } from '@/types/booking';
import { useAuthStore } from '@/lib/store/authStore';

interface DateTimeSelectorProps {
  bookingType: BookingType | null; // เพิ่มใหม่
  selectedDate: Date | null;
  selectedTimeSlot: TimeSlot | null;
  onSelectDate: (date: Date) => void;
  onSelectTimeSlot: (slot: TimeSlot) => void;
}

export default function DateTimeSelector({
  bookingType,
  selectedDate,
  selectedTimeSlot,
  onSelectDate,
  onSelectTimeSlot,
}: DateTimeSelectorProps) {
  const { user } = useAuthStore();
  const [dateError, setDateError] = useState<string | null>(null);

  // Get today's date at midnight for comparison
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Get minimum date (today)
  const minDate = today.toISOString().split('T')[0];

  // Get maximum date (3 months from now)
  const maxDate = new Date(today);
  maxDate.setMonth(maxDate.getMonth() + 3);
  const maxDateStr = maxDate.toISOString().split('T')[0];

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (!value) {
      setDateError('กรุณาเลือกวันที่');
      return;
    }

    const selectedDateObj = new Date(value);
    selectedDateObj.setHours(0, 0, 0, 0);

    // Validate date
    if (selectedDateObj < today) {
      setDateError('ไม่สามารถจองย้อนหลังได้');
      return;
    }

    if (selectedDateObj > maxDate) {
      setDateError('สามารถจองล่วงหน้าได้สูงสุด 3 เดือน');
      return;
    }

    setDateError(null);
    onSelectDate(new Date(value));
  };

  // Check if user is banned from free slot
  const isBannedFromFreeSlot = user?.bannedFromFreeSlot || false;

  // Filter time slots based on user's ban status
  const availableTimeSlots = Object.values(TIME_SLOT_INFO).filter((slotInfo) => {
    if (slotInfo.slot === 'SLOT_20_00' && isBannedFromFreeSlot) {
      return false;
    }
    return true;
  });

  return (
    <Box>
      <Typography variant="h6" gutterBottom color="primary">
        เลือกวันที่และช่วงเวลา
      </Typography>

      {/* Date Picker */}
      <Box mb={4}>
        <Typography variant="subtitle1" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <CalendarMonth color="primary" />
          เลือกวันที่
        </Typography>
        <TextField
          type="date"
          fullWidth
          value={selectedDate ? selectedDate.toISOString().split('T')[0] : ''}
          onChange={handleDateChange}
          inputProps={{
            min: minDate,
            max: maxDateStr,
          }}
          error={!!dateError}
          helperText={dateError || 'เลือกวันที่ (สามารถจองล่วงหน้าได้ 3 เดือน)'}
          sx={{
            '& .MuiInputBase-root': {
              backgroundColor: 'background.paper',
            },
          }}
        />
      </Box>

      {/* Time Slot Selector */}
      <Box>
        <Typography variant="subtitle1" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <WatchLater color="primary" />
          เลือกช่วงเวลา
        </Typography>
        
        {isBannedFromFreeSlot && (
          <Alert severity="warning" sx={{ mb: 2 }}>
            คุณไม่สามารถจองรอบฟรี (20:00 น.) ได้เนื่องจากมีประวัติ No-Show ครบ 3 ครั้ง
          </Alert>
        )}

        <Grid container spacing={2}>
          {availableTimeSlots.map((slotInfo) => {
            const isSelected = slotInfo.slot === selectedTimeSlot;
            const isFreeSlot = slotInfo.slot === 'SLOT_20_00';
            
            // คำนวณ fee ตาม booking type
            const fee = bookingType ? getFeeForSlot(slotInfo.slot, bookingType) : slotInfo.normalFee;
            const isFree = fee === 0;

            return (
              <Grid item xs={12} sm={6} md={4} key={slotInfo.slot}>
                <Card
                  elevation={isSelected ? 8 : 2}
                  sx={{
                    border: isSelected ? '2px solid' : '1px solid',
                    borderColor: isSelected ? 'primary.main' : 'rgba(255, 167, 38, 0.2)',
                    transition: 'all 0.3s',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: 4,
                    },
                  }}
                >
                  <CardActionArea onClick={() => onSelectTimeSlot(slotInfo.slot)}>
                    <CardContent>
                      <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                        <Typography variant="h6" color="primary">
                          {slotInfo.icon} {slotInfo.labelTh}
                        </Typography>
                        {isSelected && <Chip label="เลือกแล้ว" color="primary" size="small" />}
                      </Box>

                      <Typography variant="body2" color="text.secondary" mb={1}>
                        ⏰ เข้าได้ถึง {slotInfo.time} น.
                      </Typography>

                      <Typography variant="body2" color="text.secondary" mb={2}>
                        {slotInfo.description}
                      </Typography>

                      <Box display="flex" alignItems="center" gap={1}>
                        <AttachMoney fontSize="small" color={isFree ? 'success' : 'primary'} />
                        <Typography variant="h6" color={isFree ? 'success.main' : 'primary.main'}>
                          {isFree ? 'ฟรี!' : `฿${fee.toLocaleString()}`}
                        </Typography>
                      </Box>

                      {isFree && (
                        <Chip label="ไม่มีค่าบริการ" size="small" color="success" sx={{ mt: 1 }} />
                      )}
                      {bookingType === 'PREMIUM' && isFreeSlot && !isFree && (
                        <Chip label="ค่าล็อคโต๊ะ" size="small" color="secondary" sx={{ mt: 1 }} />
                      )}
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </Box>
    </Box>
  );
}

