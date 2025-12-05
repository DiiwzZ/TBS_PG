'use client';

import { Alert, AlertTitle, Typography, Button, Box } from '@mui/material';
import { Block, Info } from '@mui/icons-material';
import Link from 'next/link';

interface FreeSlotBanBannerProps {
  noShowCount: number;
}

export default function FreeSlotBanBanner({ noShowCount }: FreeSlotBanBannerProps) {
  return (
    <Alert 
      severity="error" 
      icon={<Block />}
      sx={{ mb: 3 }}
    >
      <AlertTitle>
        <strong>🚫 ถูกระงับสิทธิ์การใช้สล็อตฟรี</strong>
      </AlertTitle>
      
      <Typography variant="body2" gutterBottom>
        เนื่องจากคุณมีประวัติไม่มาตามนัด (No-Show) <strong>{noShowCount}</strong> ครั้ง
      </Typography>

      <Typography variant="body2" gutterBottom>
        คุณจึงถูกระงับสิทธิ์การใช้สล็อตฟรีชั่วคราว
      </Typography>

      <Box mt={2} display="flex" gap={1} flexWrap="wrap">
        <Button
          component={Link}
          href="/policies/no-show"
          variant="outlined"
          size="small"
          startIcon={<Info />}
          sx={{ 
            color: 'error.contrastText',
            borderColor: 'error.contrastText',
            '&:hover': {
              borderColor: 'error.dark',
              bgcolor: 'rgba(255, 255, 255, 0.1)',
            }
          }}
        >
          ดูนโยบาย No-Show
        </Button>
      </Box>

      <Typography variant="caption" display="block" sx={{ mt: 2 }}>
        💡 วิธีฟื้นสิทธิ์: มาตรงเวลาใน 5 ครั้งถัดไป หรือติดต่อฝ่ายบริการลูกค้า
      </Typography>
    </Alert>
  );
}

