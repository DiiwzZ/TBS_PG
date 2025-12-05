'use client';

import { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  LinearProgress,
  Alert,
  CircularProgress,
} from '@mui/material';
import {
  CheckCircle,
  QrCode2,
  AccessTime,
} from '@mui/icons-material';
import Image from 'next/image';

interface QRPaymentDisplayProps {
  paymentId: number;
  amount: number;
  referenceNumber: string;
  onPaymentComplete?: () => void;
}

export default function QRPaymentDisplay({
  paymentId,
  amount,
  referenceNumber,
  onPaymentComplete,
}: QRPaymentDisplayProps) {
  const [countdown, setCountdown] = useState(5);
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    if (countdown <= 0) {
      setIsCompleted(true);
      setTimeout(() => {
        onPaymentComplete?.();
      }, 1500);
      return;
    }

    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [countdown, onPaymentComplete]);

  if (isCompleted) {
    return (
      <Box textAlign="center" py={6}>
        <Box
          sx={{
            animation: 'scaleIn 0.5s ease-out',
            '@keyframes scaleIn': {
              from: { transform: 'scale(0)', opacity: 0 },
              to: { transform: 'scale(1)', opacity: 1 },
            },
          }}
        >
          <CheckCircle
            sx={{
              fontSize: 100,
              color: 'success.main',
              mb: 3,
            }}
          />
        </Box>
        <Typography variant="h4" color="success.main" gutterBottom fontWeight={700}>
          ชำระเงินสำเร็จ!
        </Typography>
        <Typography variant="body1" color="text.secondary">
          กำลังนำคุณไปยังหน้าถัดไป...
        </Typography>
      </Box>
    );
  }

  return (
    <Box>
      {/* Header */}
      <Alert severity="info" sx={{ mb: 3 }}>
        <Typography variant="subtitle1" fontWeight={600} gutterBottom>
          💳 สแกน QR Code เพื่อชำระเงิน
        </Typography>
        <Typography variant="body2">
          เปิดแอปธนาคารของคุณและสแกน QR Code ด้านล่าง
        </Typography>
      </Alert>

      {/* QR Code Display */}
      <Paper
        elevation={3}
        sx={{
          p: 4,
          textAlign: 'center',
          borderRadius: 3,
          backgroundColor: 'rgba(212, 175, 55, 0.05)',
          border: '2px solid rgba(212, 175, 55, 0.3)',
        }}
      >
        {/* QR Code Image */}
        <Box
          sx={{
            position: 'relative',
            width: { xs: 280, sm: 320 },
            height: { xs: 280, sm: 320 },
            margin: '0 auto',
            mb: 3,
            backgroundColor: '#fff',
            borderRadius: 2,
            padding: 2,
            boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
            animation: 'pulse 2s ease-in-out infinite',
            '@keyframes pulse': {
              '0%, 100%': { transform: 'scale(1)' },
              '50%': { transform: 'scale(1.02)' },
            },
          }}
        >
          <Image
            src="/qrcode-sample.jpg"
            alt="QR Code for Payment"
            fill
            style={{ objectFit: 'contain' }}
            priority
          />
        </Box>

        {/* Payment Info */}
        <Box
          sx={{
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            borderRadius: 2,
            p: 2,
            mb: 2,
          }}
        >
          <Typography variant="caption" color="text.secondary" display="block">
            หมายเลขอ้างอิง
          </Typography>
          <Typography
            variant="h6"
            fontWeight={600}
            sx={{
              fontFamily: 'monospace',
              color: 'primary.main',
              letterSpacing: 1,
            }}
          >
            {referenceNumber}
          </Typography>
        </Box>

        <Box
          sx={{
            backgroundColor: 'rgba(212, 175, 55, 0.1)',
            borderRadius: 2,
            p: 2,
          }}
        >
          <Typography variant="caption" color="text.secondary" display="block">
            จำนวนเงิน
          </Typography>
          <Typography
            variant="h4"
            fontWeight={700}
            sx={{
              color: 'primary.main',
              fontFamily: '"Playfair Display", Georgia, serif',
            }}
          >
            ฿{amount.toLocaleString()}
          </Typography>
        </Box>
      </Paper>

      {/* Countdown Timer */}
      <Box mt={3}>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          gap={1}
          mb={1}
        >
          <AccessTime color="action" />
          <Typography variant="body2" color="text.secondary">
            กำลังรอการชำระเงิน...
          </Typography>
        </Box>

        <LinearProgress
          variant="determinate"
          value={((5 - countdown) / 5) * 100}
          sx={{
            height: 8,
            borderRadius: 4,
            backgroundColor: 'rgba(212, 175, 55, 0.1)',
            '& .MuiLinearProgress-bar': {
              backgroundColor: 'primary.main',
              borderRadius: 4,
            },
          }}
        />

        <Typography
          variant="caption"
          color="text.secondary"
          textAlign="center"
          display="block"
          mt={1}
        >
          กำลังตรวจสอบการชำระเงิน ({countdown} วินาที)
        </Typography>
      </Box>

      {/* Instructions */}
      <Alert severity="warning" sx={{ mt: 3 }}>
        <Typography variant="body2">
          <strong>คำแนะนำ:</strong>
        </Typography>
        <Typography variant="body2" component="ul" sx={{ mt: 1, pl: 2 }}>
          <li>เปิดแอปธนาคารหรือแอป Mobile Banking</li>
          <li>เลือกเมนู "สแกน QR"</li>
          <li>สแกน QR Code ที่แสดงด้านบน</li>
          <li>ตรวจสอบข้อมูลและยืนยันการชำระเงิน</li>
        </Typography>
      </Alert>

      {/* Demo Notice */}
      <Box
        mt={2}
        p={2}
        sx={{
          backgroundColor: 'rgba(33, 150, 243, 0.1)',
          borderRadius: 2,
          border: '1px dashed rgba(33, 150, 243, 0.3)',
        }}
      >
        <Typography variant="caption" color="info.main" textAlign="center" display="block">
          🎭 Demo Mode: ระบบจะจำลองการชำระเงินสำเร็จอัตโนมัติใน {countdown} วินาที
        </Typography>
      </Box>
    </Box>
  );
}

