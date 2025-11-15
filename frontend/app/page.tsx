import { Box, Container, Typography, Button, Grid, Card, CardContent } from '@mui/material';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';

export default function Home() {
  return (
    <>
      <Navbar />
      <Box
        sx={{
          minHeight: 'calc(100vh - 64px)',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Hero Section */}
        <Box
          sx={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            py: 12,
          }}
        >
          <Container maxWidth="lg">
            <Grid container spacing={4} alignItems="center">
              <Grid item xs={12} md={6}>
                <Typography variant="h2" component="h1" gutterBottom fontWeight={700}>
                  Reserve Your Perfect Table
                </Typography>
                <Typography variant="h5" paragraph sx={{ mb: 4, opacity: 0.9 }}>
                  Book tables at the best bars in town. Easy, fast, and secure.
                </Typography>
                <Box sx={{ display: 'flex', gap: 2 }}>
                  <Button
                    component={Link}
                    href="/register"
                    variant="contained"
                    size="large"
                    sx={{
                      bgcolor: 'white',
                      color: '#667eea',
                      '&:hover': { bgcolor: '#f5f5f5' },
                    }}
                  >
                    Get Started
                  </Button>
                  <Button
                    component={Link}
                    href="/login"
                    variant="outlined"
                    size="large"
                    sx={{
                      borderColor: 'white',
                      color: 'white',
                      '&:hover': {
                        borderColor: 'white',
                        bgcolor: 'rgba(255,255,255,0.1)',
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
                    bgcolor: 'rgba(255,255,255,0.1)',
                    borderRadius: 2,
                    p: 4,
                    backdropFilter: 'blur(10px)',
                  }}
                >
                  <Typography variant="h4" gutterBottom>
                    Why Choose Us?
                  </Typography>
                  <Typography variant="body1" paragraph>
                    ✓ Real-time table availability
                  </Typography>
                  <Typography variant="body1" paragraph>
                    ✓ Instant booking confirmation
                  </Typography>
                  <Typography variant="body1" paragraph>
                    ✓ QR code check-in
                  </Typography>
                  <Typography variant="body1">
                    ✓ Secure online payments
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Container>
        </Box>

        {/* Features Section */}
        <Container maxWidth="lg" sx={{ py: 8 }}>
          <Typography variant="h3" align="center" gutterBottom fontWeight={600}>
            How It Works
          </Typography>
          <Typography
            variant="h6"
            align="center"
            color="text.secondary"
            paragraph
            sx={{ mb: 6 }}
          >
            Simple steps to reserve your table
          </Typography>

          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Card sx={{ height: '100%' }}>
                <CardContent>
                  <Typography variant="h5" gutterBottom fontWeight={600}>
                    1. Sign Up
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    Create your account in seconds and start exploring available tables
                    at your favorite bars.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={4}>
              <Card sx={{ height: '100%' }}>
                <CardContent>
                  <Typography variant="h5" gutterBottom fontWeight={600}>
                    2. Book a Table
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    Choose your preferred zone, select a table, and confirm your
                    reservation instantly.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={4}>
              <Card sx={{ height: '100%' }}>
                <CardContent>
                  <Typography variant="h5" gutterBottom fontWeight={600}>
                    3. Check-in & Enjoy
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    Use your QR code to check-in when you arrive and enjoy your
                    evening!
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>

        {/* CTA Section */}
        <Box sx={{ bgcolor: '#f5f5f5', py: 8 }}>
          <Container maxWidth="md">
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h3" gutterBottom fontWeight={600}>
                Ready to Get Started?
              </Typography>
              <Typography variant="h6" color="text.secondary" paragraph sx={{ mb: 4 }}>
                Join us today and never miss out on your favorite spot again.
              </Typography>
              <Button
                component={Link}
                href="/register"
                variant="contained"
                size="large"
                sx={{ px: 6, py: 2, fontSize: '1.1rem' }}
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
