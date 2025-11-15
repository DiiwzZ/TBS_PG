'use client';

import { AppBar, Toolbar, Typography, Button, Box, Container } from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/store/authStore';

export default function Navbar() {
  const router = useRouter();
  const { isAuthenticated, user, logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  return (
    <AppBar position="static">
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            component={Link}
            href="/"
            sx={{
              flexGrow: 1,
              fontWeight: 700,
              color: 'inherit',
              textDecoration: 'none',
              '&:hover': {
                opacity: 0.8,
              },
            }}
          >
            Bar Table Booking
          </Typography>

          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
            {isAuthenticated && user ? (
              <>
                <Typography variant="body2" sx={{ color: 'inherit' }}>
                  {user.fullName || user.username}
                </Typography>
                <Button
                  component={Link}
                  href="/dashboard"
                  color="inherit"
                  sx={{ textTransform: 'none' }}
                >
                  Dashboard
                </Button>
                <Button
                  onClick={handleLogout}
                  color="inherit"
                  variant="outlined"
                  sx={{
                    borderColor: 'white',
                    '&:hover': {
                      borderColor: 'white',
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    },
                  }}
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button
                  component={Link}
                  href="/login"
                  color="inherit"
                  sx={{ textTransform: 'none' }}
                >
                  Login
                </Button>
                <Button
                  component={Link}
                  href="/register"
                  color="inherit"
                  variant="outlined"
                  sx={{
                    borderColor: 'white',
                    '&:hover': {
                      borderColor: 'white',
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    },
                  }}
                >
                  Register
                </Button>
              </>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

