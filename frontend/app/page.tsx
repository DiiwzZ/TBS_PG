'use client';

import { Box, Container, Typography, Button, Grid, Card, CardContent } from '@mui/material';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import LocalBarIcon from '@mui/icons-material/LocalBar';
import EventSeatIcon from '@mui/icons-material/EventSeat';
import QrCode2Icon from '@mui/icons-material/QrCode2';

export default function Home() {
  return (
    <>
      <Navbar />
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Hero Section - Dark Bar Theme */}
        <Box
          sx={{
            background: 'linear-gradient(135deg, #1E1E1E 0%, #B71C1C 100%)',
            position: 'relative',
            overflow: 'hidden',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'radial-gradient(circle at 30% 50%, rgba(255, 167, 38, 0.1) 0%, transparent 50%)',
            },
          }}
        >
          <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
            <Grid container spacing={{ xs: 3, md: 4 }} alignItems="center" sx={{ py: { xs: 6, md: 12 } }}>
              <Grid item xs={12} md={6}>
                <Typography 
                  variant="h2" 
                  component="h1" 
                  gutterBottom 
                  fontWeight={700}
                  sx={{ 
                    fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
                    color: 'primary.main',
                    textShadow: '0 2px 10px rgba(255, 167, 38, 0.3)',
                  }}
                >
                  🍺 Your Perfect Table Awaits
                </Typography>
                <Typography 
                  variant="h6" 
                  paragraph 
                  sx={{ 
                    mb: 4, 
                    opacity: 0.9,
                    fontSize: { xs: '1rem', sm: '1.1rem', md: '1.25rem' },
                    color: 'text.primary',
                  }}
                >
                  Reserve your spot at the finest bars. Hassle-free booking, premium experience.
                </Typography>
                <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                  <Button
                    component={Link}
                    href="/register"
                    variant="contained"
                    color="primary"
                    size="large"
                    sx={{ 
                      px: { xs: 3, sm: 4 },
                      py: { xs: 1.5, sm: 2 },
                      fontSize: { xs: '0.9rem', sm: '1rem' },
                    }}
                  >
                    Get Started
                  </Button>
                  <Button
                    component={Link}
                    href="/login"
                    variant="outlined"
                    color="inherit"
                    size="large"
                    sx={{
                      px: { xs: 3, sm: 4 },
                      py: { xs: 1.5, sm: 2 },
                      fontSize: { xs: '0.9rem', sm: '1rem' },
                      borderColor: 'rgba(255,255,255,0.3)',
                      '&:hover': {
                        borderColor: 'primary.main',
                        backgroundColor: 'rgba(255, 167, 38, 0.1)',
                      },
                    }}
                  >
                    Login
                  </Button>
                </Box>
              </Grid>
              <Grid item xs={12} md={6}>
                <Box
                  sx={{
                    bgcolor: 'rgba(30, 30, 30, 0.8)',
                    borderRadius: 2,
                    p: { xs: 3, sm: 4 },
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 167, 38, 0.2)',
                  }}
                >
                  <Typography variant="h5" gutterBottom color="primary" fontWeight={600}>
                    Why Choose Us?
                  </Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                      <LocalBarIcon color="primary" />
                      <Typography variant="body1">Real-time table availability</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                      <EventSeatIcon color="primary" />
                      <Typography variant="body1">Instant booking confirmation</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                      <QrCode2Icon color="primary" />
                      <Typography variant="body1">QR code check-in</Typography>
                    </Box>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Container>
        </Box>

        {/* How It Works Section */}
        <Container maxWidth="lg" sx={{ py: { xs: 6, md: 10 } }}>
          <Typography 
            variant="h3" 
            align="center" 
            gutterBottom 
            fontWeight={600}
            color="primary"
            sx={{ fontSize: { xs: '1.75rem', sm: '2.5rem', md: '3rem' } }}
          >
            How It Works
          </Typography>
          <Typography
            variant="h6"
            align="center"
            color="text.secondary"
            paragraph
            sx={{ mb: { xs: 4, md: 6 }, fontSize: { xs: '1rem', sm: '1.25rem' } }}
          >
            Three simple steps to your perfect evening
          </Typography>

          <Grid container spacing={{ xs: 2, sm: 3, md: 4 }}>
            <Grid item xs={12} sm={6} md={4}>
              <Card 
                sx={{ 
                  height: '100%',
                  transition: 'transform 0.3s, box-shadow 0.3s',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0 8px 30px rgba(255, 167, 38, 0.3)',
                  },
                }}
              >
                <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
                  <Typography variant="h4" gutterBottom color="primary" fontWeight={600}>
                    1️⃣
                  </Typography>
                  <Typography variant="h6" gutterBottom fontWeight={600}>
                    Sign Up
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    Create your account with just username, email, and phone number.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <Card 
                sx={{ 
                  height: '100%',
                  transition: 'transform 0.3s, box-shadow 0.3s',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0 8px 30px rgba(255, 167, 38, 0.3)',
                  },
                }}
              >
                <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
                  <Typography variant="h4" gutterBottom color="primary" fontWeight={600}>
                    2️⃣
                  </Typography>
                  <Typography variant="h6" gutterBottom fontWeight={600}>
                    Book a Table
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    Choose your zone, select a table, and confirm instantly.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} sm={12} md={4}>
              <Card 
                sx={{ 
                  height: '100%',
                  transition: 'transform 0.3s, box-shadow 0.3s',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0 8px 30px rgba(255, 167, 38, 0.3)',
                  },
                }}
              >
                <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
                  <Typography variant="h4" gutterBottom color="primary" fontWeight={600}>
                    3️⃣
                  </Typography>
                  <Typography variant="h6" gutterBottom fontWeight={600}>
                    Check-in & Enjoy
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    Use your QR code to check-in and enjoy your evening!
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>

        {/* CTA Section */}
        <Box 
          sx={{ 
            bgcolor: 'background.paper',
            py: { xs: 6, md: 10 },
            borderTop: '1px solid rgba(255, 167, 38, 0.2)',
          }}
        >
          <Container maxWidth="md">
            <Box sx={{ textAlign: 'center' }}>
              <Typography 
                variant="h3" 
                gutterBottom 
                fontWeight={600}
                color="primary"
                sx={{ fontSize: { xs: '1.75rem', sm: '2.5rem', md: '3rem' } }}
              >
                Ready to Get Started?
              </Typography>
              <Typography 
                variant="h6" 
                color="text.secondary" 
                paragraph 
                sx={{ mb: 4, fontSize: { xs: '1rem', sm: '1.25rem' } }}
              >
                Join us today and never miss out on your favorite spot.
              </Typography>
              <Button
                component={Link}
                href="/register"
                variant="contained"
                color="primary"
                size="large"
                sx={{ 
                  px: { xs: 4, sm: 6 }, 
                  py: { xs: 1.5, sm: 2 }, 
                  fontSize: { xs: '1rem', sm: '1.1rem' },
                }}
              >
                Create Free Account
              </Button>
            </Box>
          </Container>
        </Box>
      </Box>
    </>
  );
}
