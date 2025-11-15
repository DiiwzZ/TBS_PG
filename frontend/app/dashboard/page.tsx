'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Box,
  Container,
  Paper,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
} from '@mui/material';
import Navbar from '@/components/layout/Navbar';
import { useAuthStore } from '@/lib/store/authStore';
import Link from 'next/link';

export default function DashboardPage() {
  const router = useRouter();
  const { isAuthenticated, user, isHydrated } = useAuthStore();

  useEffect(() => {
    // Only redirect after hydration is complete
    if (isHydrated && !isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, isHydrated, router]);

  // Show loading while hydrating or if not authenticated
  if (!isHydrated || !isAuthenticated || !user) {
    return null; // or loading spinner
  }

  return (
    <>
      <Navbar />
      <Container maxWidth="lg" sx={{ mt: { xs: 2, sm: 4 }, mb: 4, px: { xs: 2, sm: 3 } }}>
        <Paper 
          elevation={3} 
          sx={{ 
            p: { xs: 3, sm: 4 }, 
            mb: { xs: 3, sm: 4 },
            border: '1px solid rgba(255, 167, 38, 0.2)',
          }}
        >
          <Typography 
            variant="h4" 
            gutterBottom 
            color="primary"
            sx={{ fontSize: { xs: '1.5rem', sm: '2rem' } }}
          >
            Welcome, {user.fullName}! 🎉
          </Typography>
          <Typography variant="body1" color="text.secondary" gutterBottom>
            📧 {user.email}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            👤 Role: {user.role}
          </Typography>
        </Paper>

        <Grid container spacing={{ xs: 2, sm: 3 }}>
          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ height: '100%' }}>
              <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
                <Typography variant="h6" gutterBottom color="primary">
                  👤 My Profile
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  View and update your personal information
                </Typography>
                <Button variant="contained" fullWidth disabled color="primary">
                  View Profile (Soon)
                </Button>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ height: '100%' }}>
              <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
                <Typography variant="h6" gutterBottom color="primary">
                  📅 My Bookings
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  View your current and past table bookings
                </Typography>
                <Button variant="contained" fullWidth disabled color="primary">
                  View Bookings (Soon)
                </Button>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={12} md={4}>
            <Card sx={{ height: '100%' }}>
              <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
                <Typography variant="h6" gutterBottom color="primary">
                  🍺 Book a Table
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  Reserve a table at your favorite bar
                </Typography>
                <Button variant="contained" fullWidth disabled color="primary">
                  Book Now (Soon)
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Paper 
          elevation={3} 
          sx={{ 
            p: { xs: 2, sm: 3 }, 
            mt: { xs: 3, sm: 4 },
            border: '1px solid rgba(255, 167, 38, 0.2)',
          }}
        >
          <Typography variant="h6" gutterBottom color="primary">
            ⚡ Quick Actions
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={6} sm={6} md={3}>
              <Button variant="outlined" fullWidth disabled color="inherit" sx={{ py: 1.5 }}>
                View Zones
              </Button>
            </Grid>
            <Grid item xs={6} sm={6} md={3}>
              <Button variant="outlined" fullWidth disabled color="inherit" sx={{ py: 1.5 }}>
                View Tables
              </Button>
            </Grid>
            <Grid item xs={6} sm={6} md={3}>
              <Button variant="outlined" fullWidth disabled color="inherit" sx={{ py: 1.5 }}>
                Check-in
              </Button>
            </Grid>
            <Grid item xs={6} sm={6} md={3}>
              <Button variant="outlined" fullWidth disabled color="inherit" sx={{ py: 1.5 }}>
                Payment
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </>
  );
}

