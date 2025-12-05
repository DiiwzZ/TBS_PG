'use client';

import { useState, useEffect } from 'react';
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
  ListItemButton,
  ListItemText,
  useTheme,
  useMediaQuery,
  alpha,
  Avatar,
  Menu,
  MenuItem,
  Divider,
  ListItemIcon,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Close as CloseIcon,
  Dashboard as DashboardIcon,
  TableBar as ZonesIcon,
  AddCircle as BookIcon,
  EventNote as BookingsIcon,
  History as HistoryIcon,
  Person as PersonIcon,
  Logout as LogoutIcon,
  Policy as PolicyIcon,
} from '@mui/icons-material';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/store/authStore';

export default function Navbar() {
  const router = useRouter();
  const { isAuthenticated, user, logout, isHydrated } = useAuthStore();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    setMobileOpen(false);
    setAnchorEl(null);
    router.push('/');
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleNavClick = (path: string) => {
    setMobileOpen(false);
    setAnchorEl(null);
    router.push(path);
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <AppBar
        position="sticky"
        elevation={0}
        className={scrolled ? 'scrolled shadow-on-scroll' : ''}
        sx={{
          backgroundColor: alpha(theme.palette.background.paper, scrolled ? 0.95 : 0.8),
          backdropFilter: 'blur(20px) saturate(180%)',
          borderBottom: `1px solid ${alpha(theme.palette.primary.main, scrolled ? 0.2 : 0.1)}`,
          transition: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1)',
          display: { xs: 'none', md: 'block' },
        }}
      >
        <Container maxWidth="lg">
          <Toolbar
            disableGutters
            sx={{
              minHeight: { xs: 64, sm: 72 },
              py: 1,
            }}
          >
            {/* Logo */}
            <Box
              component={Link}
              href="/"
              sx={{
                display: 'flex',
                alignItems: 'center',
                textDecoration: 'none',
                mr: 4,
                transition: 'transform 300ms cubic-bezier(0.4, 0, 0.2, 1)',
                '&:hover': {
                  transform: 'scale(1.05)',
                },
              }}
            >
              <Typography
                variant="h5"
                sx={{
                  fontFamily: '"Playfair Display", Georgia, serif',
                  fontWeight: 700,
                  background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.light})`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  fontSize: { xs: '1.25rem', sm: '1.5rem' },
                  letterSpacing: '-0.02em',
                }}
              >
                🍺 Bar Booking
              </Typography>
            </Box>

            <Box sx={{ flexGrow: 1 }} />

            {/* Desktop Navigation */}
            {!isMobile && (
              <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                {!isHydrated ? (
                  <Box sx={{ width: 250, height: 40 }} />
                ) : isAuthenticated && user ? (
                  <>
                    <Button
                      component={Link}
                      href="/booking"
                      color="primary"
                      variant="outlined"
                      startIcon={<BookIcon />}
                      sx={{
                        px: 2,
                        fontWeight: 600,
                      }}
                    >
                      จองโต๊ะ
                    </Button>
                    <Button
                      component={Link}
                      href="/zones"
                      color="inherit"
                      startIcon={<ZonesIcon />}
                      sx={{
                        px: 2,
                        '&:hover': {
                          backgroundColor: alpha(theme.palette.primary.main, 0.1),
                        },
                      }}
                    >
                      โซน
                    </Button>
                    <Button
                      component={Link}
                      href="/bookings/active"
                      color="inherit"
                      startIcon={<BookingsIcon />}
                      sx={{
                        px: 2,
                        '&:hover': {
                          backgroundColor: alpha(theme.palette.primary.main, 0.1),
                        },
                      }}
                    >
                      การจอง
                    </Button>
                    
                    {/* User Menu */}
                    <IconButton
                      onClick={handleMenuOpen}
                      size="small"
                      sx={{
                        ml: 1,
                        border: `2px solid ${alpha(theme.palette.primary.main, 0.3)}`,
                        transition: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1)',
                        '&:hover': {
                          borderColor: theme.palette.primary.main,
                          boxShadow: `0 0 0 4px ${alpha(theme.palette.primary.main, 0.1)}`,
                        },
                      }}
                      aria-label="account menu"
                      aria-controls={anchorEl ? 'account-menu' : undefined}
                      aria-haspopup="true"
                      aria-expanded={anchorEl ? 'true' : undefined}
                    >
                      <Avatar
                        sx={{
                          width: 36,
                          height: 36,
                          bgcolor: theme.palette.primary.main,
                          color: theme.palette.primary.contrastText,
                          fontWeight: 600,
                          fontSize: '0.875rem',
                        }}
                      >
                        {user.username.charAt(0).toUpperCase()}
                      </Avatar>
                    </IconButton>
                  </>
                ) : (
                  <>
                    <Button
                      component={Link}
                      href="/zones"
                      color="inherit"
                      startIcon={<ZonesIcon />}
                      sx={{
                        px: 2,
                        '&:hover': {
                          backgroundColor: alpha(theme.palette.primary.main, 0.1),
                        },
                      }}
                    >
                      โซน
                    </Button>
                    <Button
                      component={Link}
                      href="/login"
                      color="inherit"
                      sx={{
                        px: 2,
                        '&:hover': {
                          backgroundColor: alpha(theme.palette.primary.main, 0.1),
                        },
                      }}
                    >
                      เข้าสู่ระบบ
                    </Button>
                    <Button
                      component={Link}
                      href="/register"
                      color="primary"
                      variant="contained"
                      sx={{
                        px: 3,
                        fontWeight: 600,
                      }}
                    >
                      สมัครสมาชิก
                    </Button>
                  </>
                )}
              </Box>
            )}
          </Toolbar>
        </Container>
      </AppBar>

      {/* User Dropdown Menu */}
      <Menu
        id="account-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        onClick={handleMenuClose}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        PaperProps={{
          sx: {
            mt: 1.5,
            minWidth: 200,
            borderRadius: 2,
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
          },
        }}
      >
        {user && (
          <Box sx={{ px: 2, py: 1.5 }}>
            <Typography variant="subtitle2" fontWeight={600}>
              {user.username}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {user.email}
            </Typography>
          </Box>
        )}
        <Divider />
        <MenuItem onClick={() => handleNavClick('/dashboard')}>
          <ListItemIcon>
            <DashboardIcon fontSize="small" />
          </ListItemIcon>
          แดชบอร์ด
        </MenuItem>
        <MenuItem onClick={() => handleNavClick('/bookings/history')}>
          <ListItemIcon>
            <HistoryIcon fontSize="small" />
          </ListItemIcon>
          ประวัติการจอง
        </MenuItem>
        <MenuItem onClick={() => handleNavClick('/policies/no-show')}>
          <ListItemIcon>
            <PolicyIcon fontSize="small" />
          </ListItemIcon>
          นโยบาย No-Show
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleLogout} sx={{ color: 'error.main' }}>
          <ListItemIcon>
            <LogoutIcon fontSize="small" color="error" />
          </ListItemIcon>
          ออกจากระบบ
        </MenuItem>
      </Menu>

      {/* Mobile Drawer */}
      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': {
            width: 280,
            backgroundImage: `linear-gradient(${alpha('#FFFFFF', 0.03)}, ${alpha('#FFFFFF', 0.03)})`,
            backdropFilter: 'blur(20px)',
            borderLeft: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
          },
        }}
      >
        <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
          <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography
              variant="h6"
              sx={{
                fontFamily: '"Playfair Display", Georgia, serif',
                fontWeight: 700,
                background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.light})`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              เมนู
            </Typography>
            <IconButton
              onClick={handleDrawerToggle}
              sx={{
                '&:hover': {
                  backgroundColor: alpha(theme.palette.primary.main, 0.1),
                },
              }}
            >
              <CloseIcon />
            </IconButton>
          </Box>

          <Divider />

          <List sx={{ flex: 1, px: 1, py: 2 }}>
            {isAuthenticated && user ? (
              <>
                <ListItem
                  sx={{
                    mb: 2,
                    p: 2,
                    borderRadius: 2,
                    backgroundColor: alpha(theme.palette.primary.main, 0.1),
                    border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
                  }}
                >
                  <Avatar
                    sx={{
                      mr: 1.5,
                      bgcolor: theme.palette.primary.main,
                      color: theme.palette.primary.contrastText,
                    }}
                  >
                    {user.username.charAt(0).toUpperCase()}
                  </Avatar>
                  <ListItemText
                    primary={user.username}
                    secondary={user.email}
                    primaryTypographyProps={{
                      fontWeight: 600,
                      fontSize: '0.9375rem',
                    }}
                    secondaryTypographyProps={{
                      fontSize: '0.8125rem',
                    }}
                  />
                </ListItem>

                <ListItemButton onClick={() => handleNavClick('/dashboard')} sx={{ borderRadius: 1.5, mb: 0.5 }}>
                  <ListItemIcon>
                    <DashboardIcon />
                  </ListItemIcon>
                  <ListItemText primary="แดชบอร์ด" />
                </ListItemButton>

                <ListItemButton onClick={() => handleNavClick('/zones')} sx={{ borderRadius: 1.5, mb: 0.5 }}>
                  <ListItemIcon>
                    <ZonesIcon />
                  </ListItemIcon>
                  <ListItemText primary="โซน" />
                </ListItemButton>

                <ListItemButton onClick={() => handleNavClick('/booking')} sx={{ borderRadius: 1.5, mb: 0.5 }}>
                  <ListItemIcon>
                    <BookIcon />
                  </ListItemIcon>
                  <ListItemText primary="จองโต๊ะ" />
                </ListItemButton>

                <ListItemButton onClick={() => handleNavClick('/bookings/active')} sx={{ borderRadius: 1.5, mb: 0.5 }}>
                  <ListItemIcon>
                    <BookingsIcon />
                  </ListItemIcon>
                  <ListItemText primary="การจองที่ใช้งาน" />
                </ListItemButton>

                <ListItemButton onClick={() => handleNavClick('/bookings/history')} sx={{ borderRadius: 1.5, mb: 0.5 }}>
                  <ListItemIcon>
                    <HistoryIcon />
                  </ListItemIcon>
                  <ListItemText primary="ประวัติการจอง" />
                </ListItemButton>

                <ListItemButton onClick={() => handleNavClick('/policies/no-show')} sx={{ borderRadius: 1.5, mb: 2 }}>
                  <ListItemIcon>
                    <PolicyIcon />
                  </ListItemIcon>
                  <ListItemText primary="นโยบาย No-Show" />
                </ListItemButton>

                <Divider sx={{ my: 1 }} />

                <ListItem sx={{ mt: 2 }}>
                  <Button
                    fullWidth
                    variant="contained"
                    color="secondary"
                    onClick={handleLogout}
                    startIcon={<LogoutIcon />}
                  >
                    ออกจากระบบ
                  </Button>
                </ListItem>
              </>
            ) : (
              <>
                <ListItemButton onClick={() => handleNavClick('/zones')} sx={{ borderRadius: 1.5, mb: 0.5 }}>
                  <ListItemIcon>
                    <ZonesIcon />
                  </ListItemIcon>
                  <ListItemText primary="โซน" />
                </ListItemButton>

                <Box sx={{ mt: 'auto', p: 2 }}>
                  <Button
                    fullWidth
                    variant="outlined"
                    onClick={() => handleNavClick('/login')}
                    sx={{ mb: 1 }}
                  >
                    เข้าสู่ระบบ
                  </Button>
                  <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    onClick={() => handleNavClick('/register')}
                  >
                    สมัครสมาชิก
                  </Button>
                </Box>
              </>
            )}
          </List>
        </Box>
      </Drawer>
    </>
  );
}
