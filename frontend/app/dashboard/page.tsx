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
  const { isAuthenticated, user } = useAuthStore();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated || !user) {
    return null; // or loading spinner
  }

  return (
    <>
      <Navbar />
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Paper elevation={3} sx={{ p: 4, mb: 4 }}>
          <Typography variant="h4" gutterBottom>
            Welcome, {user.fullName}!
          </Typography>
          <Typography variant="body1" color="text.secondary" gutterBottom>
            Email: {user.email}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Role: {user.role}
          </Typography>
        </Paper>

        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  My Profile
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  View and update your personal information
                </Typography>
                <Button variant="contained" fullWidth disabled>
                  View Profile (Coming Soon)
                </Button>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  My Bookings
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  View your current and past table bookings
                </Typography>
                <Button variant="contained" fullWidth disabled>
                  View Bookings (Coming Soon)
                </Button>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Book a Table
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  Reserve a table at your favorite bar
                </Typography>
                <Button variant="contained" fullWidth disabled>
                  Book Now (Coming Soon)
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Paper elevation={3} sx={{ p: 3, mt: 4 }}>
          <Typography variant="h6" gutterBottom>
            Quick Actions
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={3}>
              <Button variant="outlined" fullWidth disabled>
                View Zones
              </Button>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Button variant="outlined" fullWidth disabled>
                View Tables
              </Button>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Button variant="outlined" fullWidth disabled>
                Check-in
              </Button>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Button variant="outlined" fullWidth disabled>
                Payment History
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </>
  );
}

