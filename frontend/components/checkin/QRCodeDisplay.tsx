'use client';

import { useEffect, useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Button,
  CircularProgress,
  Alert,
  Chip,
} from '@mui/material';
import { Download, Share, CheckCircle } from '@mui/icons-material';
import { useCheckinStore } from '@/lib/store/checkinStore';

interface QRCodeDisplayProps {
  bookingId: number;
  bookingDate: string;
}

export default function QRCodeDisplay({ bookingId, bookingDate }: QRCodeDisplayProps) {
  const {
    currentToken,
    qrImageUrl,
    isLoading,
    error,
    generateQRToken,
    resetQRToken,
  } = useCheckinStore();

  const [timeRemaining, setTimeRemaining] = useState<string>('');

  useEffect(() => {
    // Generate QR token on mount
    generateQRToken(bookingId);

    return () => {
      resetQRToken();
    };
  }, [bookingId, generateQRToken, resetQRToken]);

  // Calculate time remaining until booking
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const booking = new Date(bookingDate);
      const diff = booking.getTime() - now.getTime();

      if (diff < 0) {
        setTimeRemaining('เวลาผ่านไปแล้ว');
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

      if (days > 0) {
        setTimeRemaining(`${days} วัน ${hours} ชั่วโมง`);
      } else if (hours > 0) {
        setTimeRemaining(`${hours} ชั่วโมง ${minutes} นาที`);
      } else {
        setTimeRemaining(`${minutes} นาที`);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [bookingDate]);

  const handleDownload = () => {
    if (!qrImageUrl) return;

    const link = document.createElement('a');
    link.href = qrImageUrl;
    link.download = `booking-${bookingId}-qr.png`;
    link.click();
  };

  const handleShare = async () => {
    if (!qrImageUrl) return;

    try {
      const blob = await fetch(qrImageUrl).then((r) => r.blob());
      const file = new File([blob], `booking-${bookingId}-qr.png`, { type: 'image/png' });

      if (navigator.share) {
        await navigator.share({
          title: `การจอง #${bookingId}`,
          text: `QR Code สำหรับเช็คอินการจอง #${bookingId}`,
          files: [file],
        });
      } else {
        // Fallback: copy QR code URL
        await navigator.clipboard.writeText(currentToken?.qrToken || '');
        alert('คัดลอก QR Token แล้ว');
      }
    } catch (err) {
      console.error('Error sharing:', err);
    }
  };

  if (isLoading && !qrImageUrl) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight={300}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ mb: 2 }}>
        {error}
      </Alert>
    );
  }

  return (
    <Box>
      <Paper
        elevation={3}
        sx={{
          p: 4,
          textAlign: 'center',
          border: '2px solid',
          borderColor: 'success.main',
        }}
      >
        <Chip
          label="QR Code สำหรับเช็คอิน"
          color="success"
          icon={<CheckCircle />}
          sx={{ mb: 2 }}
        />

        <Typography variant="h6" gutterBottom color="primary">
          การจอง #{bookingId}
        </Typography>

        {timeRemaining && (
          <Typography variant="body2" color="text.secondary" mb={3}>
            ⏰ เหลือเวลาอีก: <strong>{timeRemaining}</strong>
          </Typography>
        )}

        {/* QR Code Image */}
        {qrImageUrl && (
          <Box
            sx={{
              display: 'inline-block',
              p: 2,
              bgcolor: 'white',
              borderRadius: 2,
              mb: 3,
            }}
          >
            <img
              src={qrImageUrl}
              alt="QR Code"
              style={{
                width: '250px',
                height: '250px',
                display: 'block',
              }}
            />
          </Box>
        )}

        <Alert severity="info" sx={{ mb: 3 }}>
          <Typography variant="body2">
            แสดง QR Code นี้ต่อเจ้าหน้าที่เพื่อเช็คอินเมื่อมาถึงร้าน
          </Typography>
          <Typography variant="caption" display="block" sx={{ mt: 1 }}>
            <strong>QR Code นี้เป็นอันเดียวสำหรับการจองนี้</strong> สามารถ save ไว้ใช้ได้
          </Typography>
        </Alert>

        {/* Action Buttons */}
        <Box display="flex" gap={2} justifyContent="center" flexWrap="wrap">
          <Button
            variant="contained"
            startIcon={<Download />}
            onClick={handleDownload}
            disabled={!qrImageUrl}
          >
            ดาวน์โหลด
          </Button>

          <Button
            variant="outlined"
            startIcon={<Share />}
            onClick={handleShare}
            disabled={!qrImageUrl}
          >
            แชร์
          </Button>
        </Box>

        {currentToken && (
          <Box mt={3}>
            <Typography variant="caption" color="text.secondary">
              Token: {currentToken.qrToken.slice(0, 8)}...
            </Typography>
          </Box>
        )}
      </Paper>
    </Box>
  );
}

