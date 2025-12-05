'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import {
  BottomNavigation,
  BottomNavigationAction,
  Paper,
  Badge,
  Box,
  useTheme,
  alpha,
} from '@mui/material';
import {
  Home as HomeIcon,
  TableBar as ZonesIcon,
  AddCircle as BookIcon,
  EventNote as BookingsIcon,
  Person as ProfileIcon,
} from '@mui/icons-material';
import { useAuthStore } from '@/lib/store/authStore';

const BottomNav: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const theme = useTheme();
  const { isAuthenticated, isHydrated, user } = useAuthStore();
  
  const [value, setValue] = useState(0);
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Determine active nav index based on pathname
  useEffect(() => {
    if (pathname === '/' || pathname === '/dashboard') {
      setValue(0);
    } else if (pathname.startsWith('/zones')) {
      setValue(1);
    } else if (pathname.startsWith('/booking')) {
      setValue(2);
    } else if (pathname.startsWith('/bookings')) {
      setValue(3);
    } else if (pathname === '/profile' || pathname.startsWith('/profile')) {
      setValue(4);
    }
  }, [pathname]);

  // Hide/show on scroll
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY < 10) {
        setVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down
        setVisible(false);
      } else if (currentScrollY < lastScrollY) {
        // Scrolling up
        setVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  // Don't render if not authenticated or not hydrated
  if (!isHydrated) return null;

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    
    switch (newValue) {
      case 0:
        router.push(isAuthenticated ? '/dashboard' : '/');
        break;
      case 1:
        router.push('/zones');
        break;
      case 2:
        if (isAuthenticated) {
          router.push('/booking');
        } else {
          router.push('/login');
        }
        break;
      case 3:
        if (isAuthenticated) {
          router.push('/bookings/active');
        } else {
          router.push('/login');
        }
        break;
      case 4:
        if (isAuthenticated) {
          router.push('/profile');
        } else {
          router.push('/login');
        }
        break;
    }
  };

  // Mock active bookings count (replace with actual data from store)
  const activeBookingsCount = 0; // TODO: Get from bookingStore

  return (
    <Paper
      elevation={0}
      sx={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        display: { xs: 'block', md: 'none' },
        transform: visible ? 'translateY(0)' : 'translateY(100%)',
        transition: 'transform 300ms cubic-bezier(0.4, 0, 0.2, 1)',
        backgroundColor: alpha(theme.palette.background.paper, 0.9),
        backdropFilter: 'blur(20px) saturate(180%)',
        borderTop: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
        paddingBottom: 'env(safe-area-inset-bottom, 0px)',
      }}
      className="no-print"
    >
      <BottomNavigation
        value={value}
        onChange={handleChange}
        showLabels
        sx={{
          height: 64,
          backgroundColor: 'transparent',
          '& .MuiBottomNavigationAction-root': {
            color: alpha(theme.palette.text.secondary, 0.6),
            minWidth: 'auto',
            padding: '6px 12px 8px',
            transition: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1)',
            '&.Mui-selected': {
              color: theme.palette.primary.main,
              paddingTop: 0,
              '& .MuiBottomNavigationAction-label': {
                fontSize: '0.75rem',
                fontWeight: 600,
              },
              '& .MuiSvgIcon-root': {
                transform: 'scale(1.1)',
              },
            },
            '&:active': {
              transform: 'scale(0.95)',
            },
          },
          '& .MuiBottomNavigationAction-label': {
            fontSize: '0.6875rem',
            fontWeight: 500,
            marginTop: '4px',
            transition: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1)',
            '&.Mui-selected': {
              fontSize: '0.75rem',
              fontWeight: 600,
            },
          },
        }}
      >
        <BottomNavigationAction
          label={isAuthenticated ? 'หน้าหลัก' : 'หน้าแรก'}
          icon={<HomeIcon />}
          aria-label={isAuthenticated ? 'Dashboard' : 'Home'}
        />
        
        <BottomNavigationAction
          label="โซน"
          icon={<ZonesIcon />}
          aria-label="Zones"
        />
        
        <BottomNavigationAction
          label="จอง"
          icon={
            <Box
              sx={{
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Box
                sx={{
                  position: 'absolute',
                  width: 48,
                  height: 48,
                  borderRadius: '50%',
                  backgroundColor: theme.palette.primary.main,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 4px 16px rgba(212, 175, 55, 0.4)',
                  transform: 'translateY(-8px)',
                  transition: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1)',
                  '&:hover': {
                    boxShadow: '0 6px 24px rgba(212, 175, 55, 0.5)',
                    transform: 'translateY(-10px) scale(1.05)',
                  },
                }}
              >
                <BookIcon
                  sx={{
                    color: theme.palette.primary.contrastText,
                    fontSize: 28,
                  }}
                />
              </Box>
            </Box>
          }
          aria-label="Book a table"
          sx={{
            '& .MuiBottomNavigationAction-label': {
              marginTop: '20px !important',
            },
          }}
        />
        
        <BottomNavigationAction
          label="การจอง"
          icon={
            activeBookingsCount > 0 ? (
              <Badge
                badgeContent={activeBookingsCount}
                color="error"
                max={9}
                sx={{
                  '& .MuiBadge-badge': {
                    fontSize: '0.625rem',
                    height: 18,
                    minWidth: 18,
                    padding: '0 4px',
                  },
                }}
              >
                <BookingsIcon />
              </Badge>
            ) : (
              <BookingsIcon />
            )
          }
          aria-label="Bookings"
        />
        
        <BottomNavigationAction
          label={isAuthenticated ? 'โปรไฟล์' : 'เข้าสู่ระบบ'}
          icon={<ProfileIcon />}
          aria-label={isAuthenticated ? 'Profile' : 'Login'}
        />
      </BottomNavigation>
    </Paper>
  );
};

export default BottomNav;

