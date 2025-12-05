'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import {
  Box,
  Container,
  Paper,
  Typography,
  Button,
  Stepper,
  Step,
  StepLabel,
  CircularProgress,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import { ArrowBack, Check, Payment as PaymentIcon } from '@mui/icons-material';
import Navbar from '@/components/layout/Navbar';
import PaymentMethodSelector from '@/components/payment/PaymentMethodSelector';
import CreditCardForm from '@/components/payment/CreditCardForm';
import PaymentSummary from '@/components/payment/PaymentSummary';
import QRPaymentDisplay from '@/components/payment/QRPaymentDisplay';
import { useAuthStore } from '@/lib/store/authStore';
import { useBookingStore } from '@/lib/store/bookingStore';
import { usePaymentStore } from '@/lib/store/paymentStore';
import { useTableStore } from '@/lib/store/tableStore';
import type { PaymentMethod } from '@/types/payment';

const steps = ['เลือกวิธีชำระ', 'กรอกข้อมูล', 'ชำระเงิน'];

export default function PaymentPage() {
  const router = useRouter();
  const params = useParams();
  const bookingId = parseInt(params.id as string);

  const { isAuthenticated, user, isHydrated } = useAuthStore();
  const { getBookingById } = useBookingStore();
  const {
    selectedMethod,
    setSelectedMethod,
    initiatePayment,
    processPayment,
    isProcessing,
    error: paymentError,
    resetCurrentPayment,
  } = usePaymentStore();
  const { zones, tablesByZone, fetchZoneById, fetchTablesByZone } = useTableStore();

  const [activeStep, setActiveStep] = useState(0);
  const [booking, setBooking] = useState<any>(null);
  const [isLoadingBooking, setIsLoadingBooking] = useState(true);
  const [isCardValid, setIsCardValid] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [currentPayment, setCurrentPayment] = useState<any>(null);
  const [showQRPayment, setShowQRPayment] = useState(false);

  useEffect(() => {
    if (isHydrated && !isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, isHydrated, router]);

  useEffect(() => {
    const loadBooking = async () => {
      try {
        setIsLoadingBooking(true);
        const bookingData = await getBookingById(bookingId);
        
        if (!bookingData) {
          setError('ไม่พบข้อมูลการจอง');
          return;
        }

        if (bookingData.status !== 'PENDING') {
          setError('การจองนี้ได้ชำระเงินแล้วหรือถูกยกเลิก');
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
        setIsLoadingBooking(false);
      }
    };

    if (bookingId) {
      loadBooking();
    }
  }, [bookingId, getBookingById, fetchZoneById, fetchTablesByZone]);

  useEffect(() => {
    return () => {
      resetCurrentPayment();
    };
  }, [resetCurrentPayment]);

  // Redirect free bookings to booking details page
  useEffect(() => {
    if (booking && booking.fee === 0) {
      router.push(`/bookings/${bookingId}`);
    }
  }, [booking, bookingId, router]);

  if (!isHydrated || !isAuthenticated || !user) {
    return null;
  }

  if (isLoadingBooking) {
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

  // If free slot (no payment needed), return loading while redirecting
  if (booking.fee === 0) {
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

  const zone = zones.find((z) => z.id === booking.zoneId);
  const table = booking.zoneId && booking.tableId
    ? tablesByZone[booking.zoneId]?.find((t) => t.id === booking.tableId)
    : null;

  const handleNext = () => {
    if (activeStep === 0 && !selectedMethod) {
      setError('กรุณาเลือกวิธีชำระเงิน');
      return;
    }

    if (activeStep === 1 && selectedMethod === 'CREDIT_CARD' && !isCardValid) {
      setError('กรุณากรอกข้อมูลบัตรให้ถูกต้องครบถ้วน');
      return;
    }

    setError(null);
    setActiveStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
    setError(null);
  };

  const handlePayment = () => {
    setShowConfirmDialog(true);
  };

  const handleConfirmPayment = async () => {
    setShowConfirmDialog(false);
    
    if (!selectedMethod) return;

    try {
      setError(null);

      // Initiate payment
      const payment = await initiatePayment(booking.id, booking.fee, selectedMethod);
      setCurrentPayment(payment);

      // If QR Code method, show QR display
      if (selectedMethod === 'QR_CODE') {
        setShowQRPayment(true);
        return; // Don't process yet, wait for QR completion
      }

      // For other methods, process immediately (mock)
      await processPayment(payment.id);

      // Redirect to success page
      router.push(`/booking/${booking.id}/payment/success`);
    } catch (err: any) {
      setError(err.message || 'การชำระเงินล้มเหลว');
    }
  };

  const handleQRPaymentComplete = async () => {
    if (!currentPayment) return;

    try {
      // Process payment after QR scan simulation
      await processPayment(currentPayment.id);

      // Redirect to success page
      router.push(`/booking/${booking.id}/payment/success`);
    } catch (err: any) {
      setError(err.message || 'การชำระเงินล้มเหลว');
      setShowQRPayment(false);
    }
  };

  const renderStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <PaymentMethodSelector
            selectedMethod={selectedMethod}
            onSelectMethod={setSelectedMethod}
          />
        );

      case 1:
        if (selectedMethod === 'CREDIT_CARD' || selectedMethod === 'DEBIT_CARD') {
          return <CreditCardForm onValidate={setIsCardValid} />;
        } else if (selectedMethod === 'QR_CODE') {
          return (
            <Alert severity="info">
              <Typography variant="h6" gutterBottom>
                💳 ชำระผ่าน QR Code
              </Typography>
              <Typography>
                คุณจะได้รับ QR Code สำหรับชำระเงินหลังจากกดยืนยัน
              </Typography>
            </Alert>
          );
        } else if (selectedMethod === 'MOBILE_BANKING') {
          return (
            <Alert severity="info">
              <Typography variant="h6" gutterBottom>
                📱 ชำระผ่านโมบายแบงก์กิ้ง
              </Typography>
              <Typography>
                คุณจะถูกนำไปยังแอปธนาคารเพื่อชำระเงิน
              </Typography>
            </Alert>
          );
        }
        return null;

      case 2:
        // Show QR Payment Display if QR method and payment initiated
        if (showQRPayment && currentPayment && selectedMethod === 'QR_CODE') {
          return (
            <QRPaymentDisplay
              paymentId={currentPayment.id}
              amount={booking.fee}
              referenceNumber={`PAY-${currentPayment.id.toString().padStart(6, '0')}`}
              onPaymentComplete={handleQRPaymentComplete}
            />
          );
        }

        // Default: Show ready to pay message
        return (
          <Box textAlign="center" py={4}>
            <PaymentIcon sx={{ fontSize: 80, color: 'primary.main', mb: 2 }} />
            <Typography variant="h5" gutterBottom color="primary">
              พร้อมชำระเงินแล้ว
            </Typography>
            <Typography variant="body1" color="text.secondary">
              กดปุ่มยืนยันการชำระเงินเพื่อดำเนินการต่อ
            </Typography>
          </Box>
        );

      default:
        return null;
    }
  };

  return (
    <>
      <Navbar />
      <Container maxWidth="lg" sx={{ mt: { xs: 2, sm: 4 }, mb: 4, px: { xs: 2, sm: 3 } }}>
        <Box display="flex" gap={3} flexDirection={{ xs: 'column', md: 'row' }}>
          {/* Main Content */}
          <Box flex={2}>
            <Paper elevation={3} sx={{ p: { xs: 2, sm: 4 }, border: '1px solid rgba(255, 167, 38, 0.2)' }}>
              <Typography variant="h4" gutterBottom color="primary" sx={{ mb: 3, fontSize: { xs: '1.5rem', sm: '2rem' } }}>
                💳 ชำระเงิน
              </Typography>

              {/* Stepper */}
              <Stepper activeStep={activeStep} sx={{ mb: 4 }} alternativeLabel>
                {steps.map((label) => (
                  <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>

              {/* Error Alert */}
              {(error || paymentError) && (
                <Alert severity="error" sx={{ mb: 3 }} onClose={() => setError(null)}>
                  {error || paymentError}
                </Alert>
              )}

              {/* Step Content */}
              <Box sx={{ minHeight: 300, mb: 4 }}>
                {renderStepContent(activeStep)}
              </Box>

              {/* Navigation Buttons */}
              <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 2, flexDirection: { xs: 'column', sm: 'row' } }}>
                <Button
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  startIcon={<ArrowBack />}
                  variant="outlined"
                  fullWidth={true}
                  sx={{ flex: { sm: 1 } }}
                >
                  ย้อนกลับ
                </Button>

                {activeStep === steps.length - 1 ? (
                  <Button
                    variant="contained"
                    onClick={handlePayment}
                    disabled={isProcessing}
                    endIcon={isProcessing ? <CircularProgress size={20} /> : <Check />}
                    fullWidth={true}
                    sx={{ flex: { sm: 1 } }}
                  >
                    {isProcessing ? 'กำลังดำเนินการ...' : 'ยืนยันการชำระเงิน'}
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    onClick={handleNext}
                    fullWidth={true}
                    sx={{ flex: { sm: 1 } }}
                  >
                    ถัดไป
                  </Button>
                )}
              </Box>
            </Paper>
          </Box>

          {/* Sidebar - Payment Summary */}
          <Box flex={1}>
            <PaymentSummary
              booking={booking}
              zoneName={zone?.name}
              tableName={table ? `โต๊ะ ${table.tableNumber}` : undefined}
            />
          </Box>
        </Box>
      </Container>

      {/* Confirmation Dialog */}
      <Dialog open={showConfirmDialog} onClose={() => setShowConfirmDialog(false)}>
        <DialogTitle>ยืนยันการชำระเงิน</DialogTitle>
        <DialogContent>
          <Typography>
            คุณต้องการชำระเงินจำนวน <strong>฿{booking.fee}</strong> ใช่หรือไม่?
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            หลังจากชำระเงินแล้วจะไม่สามารถยกเลิกได้
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowConfirmDialog(false)} variant="outlined">
            ยกเลิก
          </Button>
          <Button onClick={handleConfirmPayment} variant="contained" autoFocus>
            ยืนยัน
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

