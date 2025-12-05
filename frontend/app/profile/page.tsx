'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Box,
  Container,
  Paper,
  Typography,
  Button,
  Card,
  CardContent,
  Divider,
  Avatar,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  Alert,
} from '@mui/material';
import {
  Person as PersonIcon,
  Logout as LogoutIcon,
  Dashboard as DashboardIcon,
  History as HistoryIcon,
  EventNote as EventNoteIcon,
  LocationOn as LocationOnIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  Badge as BadgeIcon,
  Warning as WarningIcon,
} from '@mui/icons-material';
import Navbar from '@/components/layout/Navbar';
import { useAuthStore } from '@/lib/store/authStore';
import Link from 'next/link';

export default function ProfilePage() {
  const router = useRouter();
  const { isAuthenticated, user, logout, isHydrated } = useAuthStore();

  useEffect(() => {
    if (isHydrated && !isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, isHydrated, router]);

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  if (!isHydrated || !isAuthenticated || !user) {
    return null;
  }

  return (
    <>
      <Navbar />
      <Container 
        maxWidth="md" 
        sx={{ 
          mt: { xs: 2, sm: 4 }, 
          mb: 4, 
          px: { xs: 2, sm: 3 },
          pb: { xs: 'calc(64px + 24px)', md: 4 }
        }}
      >
        {/* Header */}
        <Box mb={3} textAlign="center">
          <Avatar
            sx={{
              width: 80,
              height: 80,
              margin: '0 auto',
              mb: 2,
              bgcolor: 'primary.main',
              fontSize: '2rem',
            }}
          >
            {user.fullName.charAt(0).toUpperCase()}
          </Avatar>
          <Typography 
            variant="h4" 
            gutterBottom
            sx={{ 
              fontSize: { xs: '1.5rem', sm: '2rem' },
              fontFamily: '"Playfair Display", Georgia, serif',
              fontWeight: 700,
              background: 'linear-gradient(135deg, #D4AF37, #F4E5B8)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            {user.fullName}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            @{user.username}
          </Typography>
        </Box>

        {/* User Info Card */}
        <Paper 
          elevation={3} 
          className="premium-card"
          sx={{ 
            p: { xs: 2.5, sm: 3.5 }, 
            mb: 3,
            borderRadius: 3,
          }}
        >
          <Typography variant="h6" gutterBottom color="primary" fontWeight={600} mb={2}>
            📋 ข้อมูลส่วนตัว
          </Typography>

          <Box display="flex" alignItems="center" gap={2} mb={2}>
            <EmailIcon color="action" />
            <Box>
              <Typography variant="caption" color="text.secondary">
                อีเมล
              </Typography>
              <Typography variant="body1">{user.email}</Typography>
            </Box>
          </Box>

          <Box display="flex" alignItems="center" gap={2} mb={2}>
            <PhoneIcon color="action" />
            <Box>
              <Typography variant="caption" color="text.secondary">
                เบอร์โทร
              </Typography>
              <Typography variant="body1">{user.phoneNumber}</Typography>
            </Box>
          </Box>

          {(user.role === 'STAFF' || user.role === 'ADMIN') && (
            <Box display="flex" alignItems="center" gap={2}>
              <BadgeIcon color="action" />
              <Box>
                <Typography variant="caption" color="text.secondary">
                  บทบาท
                </Typography>
                <Typography variant="body1">{user.role}</Typography>
              </Box>
            </Box>
          )}
        </Paper>

        {/* No-Show Warning */}
        {user.noShowCount > 0 && (
          <Alert 
            severity={user.bannedFromFreeSlot ? "error" : "warning"} 
            icon={<WarningIcon />}
            sx={{ mb: 3, borderRadius: 2 }}
          >
            <Typography variant="subtitle2" fontWeight={600}>
              {user.bannedFromFreeSlot ? '⛔ คุณถูกระงับสิทธิ์รอบฟรี' : '⚠️ คำเตือน No-Show'}
            </Typography>
            <Typography variant="body2">
              คุณมี No-Show จำนวน <strong>{user.noShowCount} ครั้ง</strong>
              {user.bannedFromFreeSlot 
                ? ' คุณไม่สามารถจองรอบฟรี (20:00 น.) ได้อีก' 
                : user.noShowCount >= 2
                  ? ' อีก 1 ครั้งจะถูกระงับสิทธิ์รอบฟรี'
                  : ' กรุณาเช็คอินตามเวลาที่กำหนด'}
            </Typography>
          </Alert>
        )}

        {/* Quick Links */}
        <Paper 
          elevation={3} 
          className="premium-card"
          sx={{ 
            mb: 3,
            borderRadius: 3,
            overflow: 'hidden',
          }}
        >
          <List disablePadding>
            <ListItemButton component={Link} href="/dashboard">
              <ListItemIcon>
                <DashboardIcon color="primary" />
              </ListItemIcon>
              <ListItemText 
                primary="หน้าหลัก" 
                secondary="กลับไปหน้าแรก"
                primaryTypographyProps={{ fontWeight: 500 }}
              />
            </ListItemButton>
            
            <Divider />

            <ListItemButton component={Link} href="/bookings/active">
              <ListItemIcon>
                <EventNoteIcon color="primary" />
              </ListItemIcon>
              <ListItemText 
                primary="การจองที่กำลังจะมาถึง" 
                secondary="ดูการจองของคุณ"
                primaryTypographyProps={{ fontWeight: 500 }}
              />
            </ListItemButton>

            <Divider />

            <ListItemButton component={Link} href="/bookings/history">
              <ListItemIcon>
                <HistoryIcon color="primary" />
              </ListItemIcon>
              <ListItemText 
                primary="ประวัติการจอง" 
                secondary="ดูประวัติทั้งหมด"
                primaryTypographyProps={{ fontWeight: 500 }}
              />
            </ListItemButton>

            <Divider />

            <ListItemButton component={Link} href="/zones">
              <ListItemIcon>
                <LocationOnIcon color="primary" />
              </ListItemIcon>
              <ListItemText 
                primary="โซนทั้งหมด" 
                secondary="ดูโซนและโต๊ะที่ว่าง"
                primaryTypographyProps={{ fontWeight: 500 }}
              />
            </ListItemButton>
          </List>
        </Paper>

        {/* Logout Button */}
        <Button
          variant="contained"
          color="error"
          fullWidth
          size="large"
          startIcon={<LogoutIcon />}
          onClick={handleLogout}
          sx={{
            py: 1.5,
            fontWeight: 600,
            fontSize: '1rem',
            borderRadius: 2,
            background: 'linear-gradient(135deg, #EF4444, #DC2626)',
            '&:hover': {
              background: 'linear-gradient(135deg, #DC2626, #B91C1C)',
              transform: 'scale(1.02)',
            },
            transition: 'all 300ms ease',
          }}
        >
          ออกจากระบบ
        </Button>

        <Typography 
          variant="caption" 
          color="text.secondary" 
          textAlign="center" 
          display="block" 
          mt={2}
        >
          เมื่อออกจากระบบแล้ว คุณจะต้องเข้าสู่ระบบใหม่อีกครั้ง
        </Typography>
      </Container>
    </>
  );
}

