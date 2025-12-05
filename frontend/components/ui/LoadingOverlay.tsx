import React from 'react';
import {
  Backdrop,
  Box,
  CircularProgress,
  Typography,
  LinearProgress,
  useTheme,
  alpha,
} from '@mui/material';

interface LoadingOverlayProps {
  open: boolean;
  message?: string;
  progress?: number; // 0-100 for progress bar
  variant?: 'spinner' | 'progress';
}

const LoadingOverlay: React.FC<LoadingOverlayProps> = ({
  open,
  message = 'กำลังโหลด...',
  progress,
  variant = 'spinner',
}) => {
  const theme = useTheme();

  return (
    <Backdrop
      open={open}
      sx={{
        zIndex: theme.zIndex.modal + 1,
        backgroundColor: alpha(theme.palette.background.default, 0.9),
        backdropFilter: 'blur(8px)',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 2,
          p: 4,
          borderRadius: 2,
          backgroundColor: alpha(theme.palette.background.paper, 0.9),
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
          border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
          minWidth: 200,
          textAlign: 'center',
        }}
      >
        {variant === 'spinner' ? (
          <CircularProgress
            size={60}
            thickness={4}
            sx={{
              color: theme.palette.primary.main,
              '& .MuiCircularProgress-circle': {
                strokeLinecap: 'round',
              },
            }}
          />
        ) : (
          <Box sx={{ width: 200 }}>
            <LinearProgress
              variant={progress !== undefined ? 'determinate' : 'indeterminate'}
              value={progress}
              sx={{
                height: 8,
                borderRadius: 4,
                backgroundColor: alpha(theme.palette.primary.main, 0.2),
                '& .MuiLinearProgress-bar': {
                  borderRadius: 4,
                  background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.primary.light})`,
                },
              }}
            />
            {progress !== undefined && (
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                {Math.round(progress)}%
              </Typography>
            )}
          </Box>
        )}
        
        {message && (
          <Typography
            variant="body1"
            sx={{
              color: theme.palette.text.primary,
              fontWeight: 500,
            }}
          >
            {message}
          </Typography>
        )}
      </Box>
    </Backdrop>
  );
};

export default LoadingOverlay;

