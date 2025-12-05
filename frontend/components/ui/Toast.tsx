'use client';

import React, { useEffect, useState } from 'react';
import {
  Box,
  Alert,
  AlertTitle,
  Slide,
  IconButton,
  LinearProgress,
  useTheme,
  alpha,
} from '@mui/material';
import {
  Close as CloseIcon,
  CheckCircle as SuccessIcon,
  Error as ErrorIcon,
  Warning as WarningIcon,
  Info as InfoIcon,
} from '@mui/icons-material';
import { useToastStore, Toast as ToastType } from '@/lib/toast';

const ToastItem: React.FC<{ toast: ToastType }> = ({ toast }) => {
  const theme = useTheme();
  const { removeToast } = useToastStore();
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    if (!toast.duration) return;

    const interval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev - (100 / (toast.duration! / 100));
        return newProgress < 0 ? 0 : newProgress;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [toast.duration]);

  const getIcon = () => {
    switch (toast.type) {
      case 'success':
        return <SuccessIcon />;
      case 'error':
        return <ErrorIcon />;
      case 'warning':
        return <WarningIcon />;
      case 'info':
        return <InfoIcon />;
    }
  };

  const getSeverity = () => {
    switch (toast.type) {
      case 'success':
        return 'success';
      case 'error':
        return 'error';
      case 'warning':
        return 'warning';
      case 'info':
        return 'info';
      default:
        return 'info';
    }
  };

  return (
    <Slide direction="left" in={true} mountOnEnter unmountOnExit>
      <Box
        sx={{
          position: 'relative',
          mb: 1.5,
          minWidth: { xs: 280, sm: 360 },
          maxWidth: { xs: 320, sm: 400 },
        }}
      >
        <Alert
          severity={getSeverity()}
          icon={getIcon()}
          action={
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={() => removeToast(toast.id)}
              sx={{
                transition: 'transform 200ms cubic-bezier(0.4, 0, 0.2, 1)',
                '&:hover': {
                  transform: 'scale(1.1)',
                },
                '&:active': {
                  transform: 'scale(0.95)',
                },
              }}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          }
          sx={{
            borderRadius: 2,
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.3)',
            backdropFilter: 'blur(10px)',
            border: `1px solid ${alpha(theme.palette[getSeverity()].main, 0.3)}`,
            '& .MuiAlert-message': {
              width: '100%',
              py: 0.5,
            },
            '& .MuiAlert-icon': {
              fontSize: 24,
            },
          }}
        >
          <Box sx={{ fontSize: '0.9375rem', fontWeight: 500 }}>
            {toast.message}
          </Box>
        </Alert>
        
        {toast.duration && (
          <LinearProgress
            variant="determinate"
            value={progress}
            sx={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: 3,
              borderRadius: '0 0 8px 8px',
              backgroundColor: 'transparent',
              '& .MuiLinearProgress-bar': {
                borderRadius: '0 0 8px 8px',
                backgroundColor: alpha(theme.palette[getSeverity()].main, 0.8),
              },
            }}
          />
        )}
      </Box>
    </Slide>
  );
};

const ToastContainer: React.FC = () => {
  const { toasts } = useToastStore();

  if (toasts.length === 0) return null;

  return (
    <Box
      sx={{
        position: 'fixed',
        top: { xs: 16, md: 80 },
        right: { xs: 8, sm: 16 },
        zIndex: 10000,
        pointerEvents: 'none',
        '& > *': {
          pointerEvents: 'auto',
        },
      }}
      aria-live="polite"
      aria-atomic="true"
    >
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} />
      ))}
    </Box>
  );
};

export default ToastContainer;

