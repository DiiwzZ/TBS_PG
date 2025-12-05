'use client';

import { Alert, AlertTitle, Typography, Box, LinearProgress } from '@mui/material';
import { Warning } from '@mui/icons-material';

interface NoShowWarningProps {
  noShowCount: number;
  maxNoShows?: number;
}

export default function NoShowWarning({ noShowCount, maxNoShows = 3 }: NoShowWarningProps) {
  if (noShowCount === 0) return null;

  const percentage = (noShowCount / maxNoShows) * 100;
  const severity = noShowCount >= maxNoShows ? 'error' : noShowCount >= 2 ? 'warning' : 'info';

  return (
    <Alert 
      severity={severity} 
      icon={<Warning />}
      sx={{ mb: 3 }}
    >
      <AlertTitle>
        <strong>คำเตือน: ประวัติ No-Show</strong>
      </AlertTitle>
      
      <Typography variant="body2" gutterBottom>
        คุณมีประวัติไม่มาตามนัด (No-Show): <strong>{noShowCount}</strong> ครั้ง
      </Typography>

      <Box sx={{ width: '100%', mt: 1, mb: 1 }}>
        <LinearProgress 
          variant="determinate" 
          value={Math.min(percentage, 100)} 
          color={severity === 'error' ? 'error' : severity === 'warning' ? 'warning' : 'info'}
          sx={{ height: 8, borderRadius: 1 }}
        />
      </Box>

      {noShowCount < maxNoShows ? (
        <Typography variant="caption" color="text.secondary">
          หากไม่มาตามนัดอีก <strong>{maxNoShows - noShowCount}</strong> ครั้ง 
          จะถูกระงับสิทธิ์การใช้สล็อตฟรีชั่วคราว
        </Typography>
      ) : (
        <Typography variant="caption" color="error.main">
          คุณถูกระงับสิทธิ์การใช้สล็อตฟรีแล้ว กรุณามาตรงเวลาเพื่อฟื้นสิทธิ์
        </Typography>
      )}
    </Alert>
  );
}

