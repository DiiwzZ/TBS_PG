'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Box,
  Container,
  Paper,
  Stepper,
  Step,
  StepLabel,
  Button,
  Typography,
  Alert,
  CircularProgress,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormControl,
} from '@mui/material';
import { NavigateNext, NavigateBefore } from '@mui/icons-material';
import Navbar from '@/components/layout/Navbar';
import ZoneSelector from '@/components/booking/ZoneSelector';
import TableSelector from '@/components/booking/TableSelector';
import DateTimeSelector from '@/components/booking/DateTimeSelector';
import BookingSummary from '@/components/booking/BookingSummary';
import NoShowWarning from '@/components/booking/NoShowWarning';
import FreeSlotBanBanner from '@/components/booking/FreeSlotBanBanner';
import { useAuthStore } from '@/lib/store/authStore';
import { useBookingStore } from '@/lib/store/bookingStore';
import { useTableStore } from '@/lib/store/tableStore';
import { bookingApi } from '@/lib/api/booking';
import type { BookingType, TimeSlot } from '@/types/booking';
import type { Zone, Table } from '@/types/table';

const steps = ['เลือกประเภท', 'เลือกโซน/โต๊ะ', 'เลือกวันเวลา', 'ยืนยันการจอง'];

export default function BookingPage() {
  const router = useRouter();
  const { isAuthenticated, user, isHydrated } = useAuthStore();
  const { draft, setDraft, resetDraft, createBooking, isLoading, error: storeError } = useBookingStore();
  const { setSelectedZone, setSelectedTable } = useTableStore();

  const [activeStep, setActiveStep] = useState(0);
  const [localError, setLocalError] = useState<string | null>(null);

  // Combine errors
  const error = localError || storeError;

  useEffect(() => {
    // Redirect if not authenticated
    if (isHydrated && !isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, isHydrated, router]);

  useEffect(() => {
    // Reset draft when component mounts
    resetDraft();
  }, [resetDraft]);

  // Show loading while hydrating
  if (!isHydrated || !isAuthenticated || !user) {
    return null;
  }

  const handleNext = () => {
    // Validate current step before proceeding
    if (!validateStep(activeStep)) {
      return;
    }
    setActiveStep((prev) => prev + 1);
  };

  const handleBack = () => {
    // ถ้าเป็น Premium และกำลังดูโต๊ะ (มีโซนแล้ว) ให้กลับไปเลือกโซนใหม่แทน
    if (activeStep === 1 && draft.bookingType === 'PREMIUM' && draft.zoneId) {
      setDraft({ ...draft, zoneId: null, tableId: null });
      setLocalError(null);
      return;
    }
    
    // กรณีปกติ ลด step
    setActiveStep((prev) => prev - 1);
    setLocalError(null);
  };

  const validateStep = (step: number): boolean => {
    setLocalError(null);

    switch (step) {
      case 0: // Booking Type
        if (!draft.bookingType) {
          setLocalError('กรุณาเลือกประเภทการจอง');
          return false;
        }
        return true;

      case 1: // Zone/Table Selection
        if (draft.bookingType === 'NORMAL' && !draft.zoneId) {
          setLocalError('กรุณาเลือกโซน');
          return false;
        }
        if (draft.bookingType === 'PREMIUM' && !draft.tableId) {
          setLocalError('กรุณาเลือกโต๊ะ');
          return false;
        }
        return true;

      case 2: // Date & Time
        if (!draft.bookingDate) {
          setLocalError('กรุณาเลือกวันที่');
          return false;
        }
        if (!draft.timeSlot) {
          setLocalError('กรุณาเลือกช่วงเวลา');
          return false;
        }
        return true;

      case 3: // Summary
        if (draft.guestCount < 1) {
          setLocalError('กรุณาระบุจำนวนผู้ใช้บริการ');
          return false;
        }
        return true;

      default:
        return true;
    }
  };

  const handleSubmit = async () => {
    if (!user) return;

    try {
      setLocalError(null);
      const booking = await createBooking(user.id);
      
      // Check if booking is free (no payment needed)
      if (booking.fee === 0) {
        // Free booking - backend should auto-confirm, but check as fallback
        if (booking.status === 'PENDING') {
          // Fallback: manually confirm if backend didn't auto-confirm
          try {
            await bookingApi.confirmBooking(booking.id, 0);
          } catch (confirmError) {
            console.warn('Failed to confirm free booking, but continuing...', confirmError);
          }
        }
        // Go directly to booking details (with QR code)
        router.push(`/bookings/${booking.id}`);
      } else {
        // Paid booking - go to payment page
        router.push(`/booking/${booking.id}/payment`);
      }
    } catch (error: any) {
      setLocalError(error.message || 'เกิดข้อผิดพลาดในการสร้างการจอง');
    }
  };

  const handleBookingTypeChange = (type: BookingType) => {
    setLocalError(null); // Clear error when user selects type
    setDraft({ 
      bookingType: type,
      zoneId: null,
      tableId: null,
    });
    setSelectedZone(null);
    setSelectedTable(null);
  };

  const handleZoneSelect = (zone: Zone) => {
    setLocalError(null); // Clear error when user selects zone
    setDraft({ 
      zoneId: zone.id,
      tableId: null,
    });
    setSelectedZone(zone);
  };

  const handleTableSelect = (table: Table) => {
    setLocalError(null); // Clear error when user selects table
    setDraft({ 
      tableId: table.id,
      zoneId: table.zoneId,
    });
    setSelectedTable(table);
  };

  const handleDateSelect = (date: Date) => {
    setLocalError(null); // Clear error when user selects date
    setDraft({ bookingDate: date });
  };

  const handleTimeSlotSelect = (slot: TimeSlot) => {
    setLocalError(null); // Clear error when user selects time slot
    setDraft({ timeSlot: slot });
  };

  const handleGuestCountChange = (count: number) => {
    setLocalError(null); // Clear error when user changes guest count
    setDraft({ guestCount: count });
  };

  const renderStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <Box>
            <Typography 
              variant="h6" 
              gutterBottom 
              color="primary"
              sx={{ fontSize: { xs: '1rem', sm: '1.125rem', md: '1.25rem' } }}
            >
              เลือกประเภทการจอง
            </Typography>
            <Typography 
              variant="body2" 
              color="text.secondary" 
              mb={3}
              sx={{ fontSize: { xs: '0.8125rem', sm: '0.875rem' } }}
            >
              เลือกประเภทการจองที่เหมาะกับคุณ
            </Typography>

            <FormControl component="fieldset">
              <RadioGroup
                value={draft.bookingType || ''}
                onChange={(e) => handleBookingTypeChange(e.target.value as BookingType)}
              >
                <Paper 
                  elevation={draft.bookingType === 'NORMAL' ? 4 : 2} 
                  className="premium-card"
                  sx={{ 
                    p: { xs: 2, sm: 3 }, 
                    mb: 2, 
                    cursor: 'pointer',
                    transform: draft.bookingType === 'NORMAL' ? 'scale(1.02)' : 'scale(1)',
                    transition: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1)',
                    '&:hover': {
                      transform: 'scale(1.02)',
                      boxShadow: 4,
                    }
                  }}
                  onClick={() => handleBookingTypeChange('NORMAL')}
                >
                  <FormControlLabel
                    value="NORMAL"
                    control={<Radio />}
                    label={
                      <Box>
                        <Typography 
                          variant="h6" 
                          color="primary" 
                          fontWeight={600}
                          sx={{ fontSize: { xs: '1rem', sm: '1.125rem', md: '1.25rem' } }}
                        >
                          จองตามโซน (ปกติ)
                        </Typography>
                        <Typography 
                          variant="body2" 
                          color="text.secondary"
                          sx={{ fontSize: { xs: '0.8125rem', sm: '0.875rem' } }}
                        >
                          เลือกโซนที่ต้องการ ระบบจะจัดโต๊ะให้อัตโนมัติ
                        </Typography>
                        <Typography 
                          variant="body2" 
                          color="text.secondary"
                          sx={{ fontSize: { xs: '0.8125rem', sm: '0.875rem' } }}
                        >
                          เหมาะสำหรับผู้ที่ต้องการความยืดหยุ่น
                        </Typography>
                      </Box>
                    }
                  />
                </Paper>

                <Paper 
                  elevation={draft.bookingType === 'PREMIUM' ? 4 : 2} 
                  className="premium-card"
                  sx={{ 
                    p: { xs: 2, sm: 3 }, 
                    cursor: 'pointer',
                    transform: draft.bookingType === 'PREMIUM' ? 'scale(1.02)' : 'scale(1)',
                    transition: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1)',
                    '&:hover': {
                      transform: 'scale(1.02)',
                      boxShadow: 4,
                    }
                  }}
                  onClick={() => handleBookingTypeChange('PREMIUM')}
                >
                  <FormControlLabel
                    value="PREMIUM"
                    control={<Radio />}
                    label={
                      <Box>
                        <Typography 
                          variant="h6" 
                          color="secondary" 
                          fontWeight={600}
                          sx={{ fontSize: { xs: '1rem', sm: '1.125rem', md: '1.25rem' } }}
                        >
                          จองโต๊ะเฉพาะ (พรีเมียม) ✨
                        </Typography>
                        <Typography 
                          variant="body2" 
                          color="text.secondary"
                          sx={{ fontSize: { xs: '0.8125rem', sm: '0.875rem' } }}
                        >
                          เลือกโต๊ะที่ต้องการเจาะจง รับประกันโต๊ะที่เลือก
                        </Typography>
                        <Typography 
                          variant="body2" 
                          color="text.secondary"
                          sx={{ fontSize: { xs: '0.8125rem', sm: '0.875rem' } }}
                        >
                          เหมาะสำหรับกลุ่มที่ต้องการพื้นที่เฉพาะ
                        </Typography>
                      </Box>
                    }
                  />
                </Paper>
              </RadioGroup>
            </FormControl>
          </Box>
        );

      case 1:
        if (draft.bookingType === 'NORMAL') {
          return (
            <ZoneSelector
              selectedZoneId={draft.zoneId}
              onSelectZone={handleZoneSelect}
            />
          );
        } else {
          return (
            <Box>
              {!draft.zoneId ? (
                <>
                  <Typography 
                    variant="h6" 
                    gutterBottom 
                    color="primary" 
                    mb={3}
                    sx={{ fontSize: { xs: '1rem', sm: '1.125rem', md: '1.25rem' } }}
                  >
                    เลือกโซนก่อน เพื่อดูโต๊ะที่ว่าง
                  </Typography>
                  <ZoneSelector
                    selectedZoneId={draft.zoneId}
                    onSelectZone={handleZoneSelect}
                  />
                </>
              ) : (
                <Box>
                  <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                    <Typography 
                      variant="h6" 
                      color="primary"
                      sx={{ fontSize: { xs: '1rem', sm: '1.125rem', md: '1.25rem' } }}
                    >
                      เลือกโต๊ะในโซน
                    </Typography>
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={() => setDraft({ ...draft, zoneId: null, tableId: null })}
                      startIcon={<NavigateBefore />}
                    >
                      เปลี่ยนโซน
                    </Button>
                  </Box>
                  <TableSelector
                    selectedTableId={draft.tableId}
                    onSelectTable={handleTableSelect}
                    zoneId={draft.zoneId}
                  />
                </Box>
              )}
            </Box>
          );
        }

      case 2:
        return (
          <DateTimeSelector
            bookingType={draft.bookingType}
            selectedDate={draft.bookingDate}
            selectedTimeSlot={draft.timeSlot}
            onSelectDate={handleDateSelect}
            onSelectTimeSlot={handleTimeSlotSelect}
          />
        );

      case 3:
        return (
          <BookingSummary
            draft={draft}
            guestCount={draft.guestCount}
            onGuestCountChange={handleGuestCountChange}
          />
        );

      default:
        return null;
    }
  };

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
          <Typography 
            variant="h4" 
            gutterBottom 
            sx={{ 
              mb: 3, 
              fontSize: { xs: '1.5rem', sm: '2rem' },
              fontFamily: '"Playfair Display", Georgia, serif',
              fontWeight: 700,
              background: 'linear-gradient(135deg, #D4AF37, #F4E5B8)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            🍺 จองโต๊ะในบาร์
          </Typography>

          {/* Grace Period Info */}
          <Alert severity="info" sx={{ mb: 3 }} icon={<span>⏰</span>}>
            <Typography 
              variant="body2"
              sx={{ fontSize: { xs: '0.8125rem', sm: '0.875rem' } }}
            >
              <strong>ข้อกำหนดการเช็คอิน:</strong> คุณต้องเช็คอินภายใน <strong>15 นาที</strong> หลังจากเวลารอบที่จอง มิฉะนั้นระบบจะบันทึกเป็น No-Show
            </Typography>
            <Typography 
              variant="body2" 
              sx={{ 
                mt: 1,
                fontSize: { xs: '0.8125rem', sm: '0.875rem' },
              }}
            >
              หากมี No-Show ในรอบฟรี (20:00 น.) ครบ <strong>3 ครั้ง</strong> คุณจะไม่สามารถจองรอบฟรีได้อีก
            </Typography>
          </Alert>

          {/* No-Show Warning */}
          {user && user.noShowCount > 0 && (
            <NoShowWarning noShowCount={user.noShowCount} />
          )}

          {/* Free Slot Ban Banner */}
          {user && user.bannedFromFreeSlot && (
            <FreeSlotBanBanner noShowCount={user.noShowCount} />
          )}

          {/* Stepper */}
          <Stepper 
            activeStep={activeStep} 
            sx={{ 
              mb: 4,
              '& .MuiStepLabel-label': {
                fontSize: { xs: '0.75rem', sm: '0.875rem' },
              },
              '& .MuiStepIcon-root': {
                fontSize: { xs: '1.5rem', sm: '2rem' },
                '&.Mui-active': {
                  color: 'primary.main',
                  transform: 'scale(1.1)',
                  transition: 'transform 0.3s ease',
                },
                '&.Mui-completed': {
                  color: 'success.main',
                },
              },
            }} 
            alternativeLabel
          >
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          {/* Error Alert */}
          {error && (
            <Alert severity="error" sx={{ mb: 3 }} onClose={() => setLocalError(null)}>
              {error}
            </Alert>
          )}

          {/* Step Content */}
          <Box sx={{ minHeight: { xs: 300, sm: 400 }, mb: 4 }}>
            {renderStepContent(activeStep)}
          </Box>

          {/* Navigation Buttons */}
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            gap: 2, 
            flexDirection: { xs: 'column', sm: 'row' },
            mt: 4
          }}>
            <Button
              disabled={activeStep === 0}
              onClick={handleBack}
              startIcon={<NavigateBefore />}
              variant="outlined"
              fullWidth={true}
              size="large"
              sx={{ 
                flex: { sm: 1 },
                py: { xs: 1.5, sm: 1.75 },
                minHeight: { xs: 44, sm: 'auto' },
                fontSize: { xs: '0.9375rem', sm: '1rem' },
                transition: 'all 300ms ease',
              }}
            >
              ย้อนกลับ
            </Button>

            {activeStep === steps.length - 1 ? (
              <Button
                variant="contained"
                onClick={handleSubmit}
                disabled={isLoading}
                fullWidth={true}
                size="large"
                sx={{ 
                  flex: { sm: 1 },
                  py: { xs: 1.5, sm: 1.75 },
                  minHeight: { xs: 44, sm: 'auto' },
                  fontSize: { xs: '0.9375rem', sm: '1rem' },
                  background: 'linear-gradient(135deg, #D4AF37, #F4E5B8)',
                  color: '#000',
                  fontWeight: 600,
                  transition: 'all 300ms ease',
                  '&:hover': {
                    background: 'linear-gradient(135deg, #F4E5B8, #D4AF37)',
                    transform: 'scale(1.02)',
                  },
                  '&:disabled': {
                    background: 'rgba(255, 255, 255, 0.1)',
                    color: 'rgba(255, 255, 255, 0.3)',
                  }
                }}
              >
                {isLoading ? '⏳ กำลังสร้างการจอง...' : 'ยืนยันการจอง ✓'}
              </Button>
            ) : (
              <Button
                variant="contained"
                onClick={handleNext}
                endIcon={<NavigateNext />}
                fullWidth={true}
                size="large"
                sx={{ 
                  flex: { sm: 1 },
                  py: { xs: 1.5, sm: 1.75 },
                  minHeight: { xs: 44, sm: 'auto' },
                  fontSize: { xs: '0.9375rem', sm: '1rem' },
                  transition: 'all 300ms ease',
                }}
              >
                ถัดไป
              </Button>
            )}
          </Box>
        </Paper>
      </Container>
    </>
  );
}
