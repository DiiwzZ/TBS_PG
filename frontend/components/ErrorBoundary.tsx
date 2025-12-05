'use client';

import { Component, ReactNode } from 'react';
import {
  Box,
  Container,
  Paper,
  Typography,
  Button,
  Alert,
} from '@mui/material';
import { Refresh, Home } from '@mui/icons-material';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: any) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
    window.location.reload();
  };

  handleGoHome = () => {
    this.setState({ hasError: false, error: null });
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      return (
        <Container maxWidth="md" sx={{ mt: 8, mb: 4 }}>
          <Paper elevation={3} sx={{ p: 4, textAlign: 'center' }}>
            <Typography variant="h3" gutterBottom color="error">
              😔 เกิดข้อผิดพลาด
            </Typography>

            <Typography variant="h6" color="text.secondary" gutterBottom>
              ขออภัย เกิดข้อผิดพลาดบางอย่าง
            </Typography>

            {this.state.error && (
              <Alert severity="error" sx={{ my: 3, textAlign: 'left' }}>
                <Typography variant="body2" fontFamily="monospace">
                  {this.state.error.message}
                </Typography>
              </Alert>
            )}

            <Box display="flex" gap={2} justifyContent="center" mt={4}>
              <Button
                variant="contained"
                startIcon={<Refresh />}
                onClick={this.handleReset}
              >
                รีโหลดหน้านี้
              </Button>
              <Button
                variant="outlined"
                startIcon={<Home />}
                onClick={this.handleGoHome}
              >
                กลับหน้าหลัก
              </Button>
            </Box>
          </Paper>
        </Container>
      );
    }

    return this.props.children;
  }
}

