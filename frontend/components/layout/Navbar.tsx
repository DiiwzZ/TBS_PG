'use client';

import { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/store/authStore';

export default function Navbar() {
  const router = useRouter();
  const { isAuthenticated, user, logout, isHydrated } = useAuthStore();
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleLogout = () => {
    logout();
    setMobileOpen(false);
    router.push('/');
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleNavClick = (path: string) => {
    setMobileOpen(false);
    router.push(path);
  };

  return (
    <AppBar position="sticky" elevation={0}>
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ minHeight: { xs: 56, sm: 64 } }}>
          <Typography
            variant="h6"
            component={Link}
            href="/"
            sx={{
              flexGrow: 1,
              fontWeight: 700,
              color: 'primary.main',
              textDecoration: 'none',
              fontSize: { xs: '1.1rem', sm: '1.25rem' },
              '&:hover': {
                opacity: 0.8,
              },
            }}
          >
            🍺 Bar Booking
          </Typography>

          {/* Desktop Menu */}
          {!isMobile && (
            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
              {!isHydrated ? (
                <Box sx={{ width: 200, height: 36 }} />
              ) : isAuthenticated && user ? (
                <>
                  <Typography variant="body2" sx={{ color: 'text.secondary', display: { xs: 'none', md: 'block' } }}>
                    {user.fullName || user.username}
                  </Typography>
                  <Button
                    component={Link}
                    href="/dashboard"
                    color="primary"
                    variant="outlined"
                  >
                    Dashboard
                  </Button>
                  <Button
                    onClick={handleLogout}
                    color="secondary"
                    variant="contained"
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
                  >
                    Login
                  </Button>
                  <Button
                    component={Link}
                    href="/register"
                    color="primary"
                    variant="contained"
                  >
                    Register
                  </Button>
                </>
              )}
            </Box>
          )}

          {/* Mobile Menu Button */}
          {isMobile && (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="end"
              onClick={handleDrawerToggle}
            >
              <MenuIcon />
            </IconButton>
          )}
        </Toolbar>
      </Container>

      {/* Mobile Drawer */}
      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': {
            width: 250,
            backgroundColor: 'background.paper',
          },
        }}
      >
        <Box sx={{ p: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h6" color="primary">
              Menu
            </Typography>
            <IconButton onClick={handleDrawerToggle}>
              <CloseIcon />
            </IconButton>
          </Box>

          <List>
            {isAuthenticated && user ? (
              <>
                <ListItem sx={{ borderBottom: '1px solid rgba(255,255,255,0.1)', pb: 2, mb: 2 }}>
                  <ListItemText
                    primary={user.fullName || user.username}
                    secondary={user.email}
                    primaryTypographyProps={{ color: 'primary', fontWeight: 600 }}
                  />
                </ListItem>
                <ListItem>
                  <Button
                    fullWidth
                    variant="outlined"
                    color="primary"
                    onClick={() => handleNavClick('/dashboard')}
                  >
                    Dashboard
                  </Button>
                </ListItem>
                <ListItem>
                  <Button
                    fullWidth
                    variant="contained"
                    color="secondary"
                    onClick={handleLogout}
                  >
                    Logout
                  </Button>
                </ListItem>
              </>
            ) : (
              <>
                <ListItem>
                  <Button
                    fullWidth
                    variant="outlined"
                    color="inherit"
                    onClick={() => handleNavClick('/login')}
                  >
                    Login
                  </Button>
                </ListItem>
                <ListItem>
                  <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    onClick={() => handleNavClick('/register')}
                  >
                    Register
                  </Button>
                </ListItem>
              </>
            )}
          </List>
        </Box>
      </Drawer>
    </AppBar>
  );
}

