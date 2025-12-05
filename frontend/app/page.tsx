'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Box, Container, Typography, Button, Grid, Card, CardContent, useTheme, alpha } from '@mui/material';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import {
  TableBar as BarIcon,
  EventSeat as SeatIcon,
  QrCode2 as QrIcon,
  Schedule as TimeIcon,
  Security as SecurityIcon,
  Verified as VerifiedIcon,
} from '@mui/icons-material';
import { useAuthStore } from '@/lib/store/authStore';

export default function Home() {
  const router = useRouter();
  const theme = useTheme();
  const { isAuthenticated, isHydrated } = useAuthStore();

  useEffect(() => {
    if (isHydrated && isAuthenticated) {
      router.replace('/dashboard');
    }
  }, [isHydrated, isAuthenticated, router]);

  // Show nothing while checking auth state to prevent flash
  if (!isHydrated || isAuthenticated) {
    return null;
  }

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
        {/* Hero Section - Premium Dark Bar Theme */}
        <Box
          sx={{
            position: 'relative',
            overflow: 'hidden',
            background: `linear-gradient(135deg, ${theme.palette.background.default} 0%, ${alpha(theme.palette.secondary.dark, 0.3)} 100%)`,
            pt: { xs: 8, md: 12 },
            pb: { xs: 10, md: 16 },
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'radial-gradient(circle at 30% 50%, rgba(212, 175, 55, 0.08) 0%, transparent 50%), radial-gradient(circle at 70% 80%, rgba(128, 0, 32, 0.05) 0%, transparent 50%)',
              pointerEvents: 'none',
            },
          }}
        >
          <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
            <Grid container spacing={{ xs: 3, md: 4 }} alignItems="center">
              <Grid item xs={12} md={6}>
                <Box className="fade-in">
                  <Typography
                    variant="h1"
                    component="h1"
                    gutterBottom
                    sx={{
                      fontFamily: '"Playfair Display", Georgia, serif',
                      fontWeight: 700,
                      background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.light})`,
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                      mb: { xs: 2, sm: 3 },
                      fontSize: { xs: '1.75rem', sm: '2.5rem', md: '3rem', lg: '3.5rem' },
                      lineHeight: { xs: 1.2, sm: 1.3 },
                      textShadow: '0 2px 10px rgba(212, 175, 55, 0.2)',
                    }}
                  >
                    🍺 บาร์ในฝันของคุณ รออยู่ที่นี่
                  </Typography>
                  <Typography
                    variant="h5"
                    paragraph
                    sx={{
                      mb: { xs: 2, sm: 3 },
                      color: theme.palette.text.secondary,
                      lineHeight: 1.7,
                      fontWeight: 400,
                      fontSize: { xs: '1rem', sm: '1.25rem', md: '1.5rem' },
                      display: { xs: 'none', sm: 'block' },
                    }}
                  >
                    จองโต๊ะออนไลน์ง่ายๆ ผ่านระบบที่ทันสมัย
                    <br />
                    รับประกันที่นั่งของคุณได้ทันที
                  </Typography>
                  <Typography
                    variant="body1"
                    paragraph
                    sx={{
                      mb: { xs: 2, sm: 3 },
                      color: theme.palette.text.secondary,
                      lineHeight: 1.7,
                      fontWeight: 400,
                      fontSize: { xs: '0.9375rem', sm: '1rem' },
                      display: { xs: 'block', sm: 'none' },
                    }}
                  >
                    จองโต๊ะออนไลน์ง่ายๆ ผ่านระบบที่ทันสมัย รับประกันที่นั่งของคุณได้ทันที
                  </Typography>
                  <Box sx={{ display: 'flex', gap: { xs: 1, sm: 1.5 }, flexWrap: 'wrap' }}>
                    <Button
                      component={Link}
                      href="/register"
                      variant="contained"
                      color="primary"
                      size="large"
                      fullWidth={{ xs: true, sm: false }}
                      sx={{
                        px: { xs: 3, sm: 4 },
                        py: { xs: 1.5, sm: 1.75 },
                        fontSize: { xs: '0.9375rem', sm: '1.0625rem' },
                        fontWeight: 600,
                        boxShadow: shadows.glow,
                        minHeight: { xs: 44, sm: 'auto' },
                        '&:hover': {
                          transform: 'translateY(-2px)',
                          boxShadow: '0 8px 32px rgba(212, 175, 55, 0.25)',
                        },
                      }}
                    >
                      เริ่มต้นใช้งาน
                    </Button>
                    <Button
                      component={Link}
                      href="/zones"
                      variant="outlined"
                      color="primary"
                      size="large"
                      fullWidth={{ xs: true, sm: false }}
                      sx={{
                        px: { xs: 3, sm: 4 },
                        py: { xs: 1.5, sm: 1.75 },
                        fontSize: { xs: '0.9375rem', sm: '1.0625rem' },
                        fontWeight: 600,
                        borderWidth: 2,
                        minHeight: { xs: 44, sm: 'auto' },
                        '&:hover': {
                          borderWidth: 2,
                          transform: 'translateY(-2px)',
                        },
                      }}
                    >
                      ดูโซนของเรา
                    </Button>
                  </Box>
                </Box>
              </Grid>
              
              <Grid item xs={12} md={6}>
                <Box
                  className="premium-card scale-in"
                  sx={{
                    p: { xs: 3, sm: 4 },
                    borderRadius: 4,
                  }}
                >
                  <Typography
                    variant="h5"
                    gutterBottom
                    sx={{
                      fontWeight: 600,
                      mb: 3,
                      color: theme.palette.primary.main,
                    }}
                  >
                    ทำไมต้องเลือกเรา?
                  </Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
                    {[
                      { icon: <BarIcon />, text: 'ตรวจสอบโต๊ะว่างแบบ Real-time' },
                      { icon: <SeatIcon />, text: 'ยืนยันการจองได้ทันที' },
                      { icon: <QrIcon />, text: 'เช็คอินด้วย QR Code' },
                      { icon: <TimeIcon />, text: 'ช่วงเวลาให้เลือกหลากหลาย' },
                      { icon: <SecurityIcon />, text: 'ระบบปลอดภัย รักษาความเป็นส่วนตัว' },
                    ].map((item, index) => (
                      <Box
                        key={index}
                        sx={{
                          display: 'flex',
                          gap: 2,
                          alignItems: 'center',
                          p: 1.5,
                          borderRadius: 2,
                          transition: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1)',
                          '&:hover': {
                            backgroundColor: alpha(theme.palette.primary.main, 0.05),
                            transform: 'translateX(8px)',
                          },
                        }}
                      >
                        <Box
                          sx={{
                            color: theme.palette.primary.main,
                            display: 'flex',
                            '& .MuiSvgIcon-root': {
                              fontSize: 28,
                            },
                          }}
                        >
                          {item.icon}
                        </Box>
                        <Typography variant="body1" fontWeight={500}>
                          {item.text}
                        </Typography>
                      </Box>
                    ))}
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Container>
        </Box>

        {/* How It Works Section */}
        <Box sx={{ py: { xs: 8, md: 12 }, backgroundColor: theme.palette.background.paper }}>
          <Container maxWidth="lg">
            <Box sx={{ textAlign: 'center', mb: { xs: 6, md: 8 } }}>
              <Typography
                variant="h2"
                gutterBottom
                sx={{
                  fontFamily: '"Playfair Display", Georgia, serif',
                  fontWeight: 700,
                  background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.light})`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  mb: 2,
                  fontSize: { xs: '1.75rem', sm: '2.25rem', md: '2.5rem' },
                }}
              >
                วิธีการใช้งาน
              </Typography>
              <Typography
                variant="h6"
                color="text.secondary"
                sx={{ 
                  maxWidth: 600, 
                  mx: 'auto',
                  fontSize: { xs: '1rem', sm: '1.125rem', md: '1.25rem' },
                  px: { xs: 2, sm: 0 },
                }}
              >
                3 ขั้นตอนง่ายๆ สู่คืนสุดพิเศษของคุณ
              </Typography>
            </Box>

            <Grid container spacing={{ xs: 3, md: 4 }}>
              {[
                {
                  step: '1',
                  title: 'สมัครสมาชิก',
                  description: 'สร้างบัญชีด้วยข้อมูลง่ายๆ เพียงไม่กี่ขั้นตอน',
                  color: theme.palette.primary.main,
                },
                {
                  step: '2',
                  title: 'เลือกโต๊ะ',
                  description: 'เลือกโซนและโต๊ะที่ชอบ ดูความพร้อมแบบเรียลไทม์',
                  color: theme.palette.secondary.main,
                },
                {
                  step: '3',
                  title: 'เช็คอินและเพลิดเพลิน',
                  description: 'ใช้ QR Code เช็คอินและเริ่มสนุกกับค่ำคืนของคุณ!',
                  color: theme.palette.success.main,
                },
              ].map((item, index) => (
                <Grid item xs={12} md={4} key={index}>
                  <Card
                    className="premium-card"
                    sx={{
                      height: '100%',
                      minHeight: { xs: 320, sm: 'auto' },
                      display: 'flex',
                      flexDirection: 'column',
                      textAlign: 'center',
                      transition: 'all 400ms cubic-bezier(0.4, 0, 0.2, 1)',
                      '&:hover': {
                        transform: 'translateY(-12px) scale(1.02)',
                        boxShadow: `0 12px 48px ${alpha(item.color, 0.2)}`,
                      },
                    }}
                  >
                    <CardContent sx={{ p: { xs: 3, sm: 4 }, flex: 1, display: 'flex', flexDirection: 'column' }}>
                      <Box
                        sx={{
                          width: 80,
                          height: 80,
                          borderRadius: '50%',
                          backgroundColor: alpha(item.color, 0.1),
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          mx: 'auto',
                          mb: 3,
                          border: `3px solid ${alpha(item.color, 0.3)}`,
                        }}
                      >
                        <Typography
                          variant="h3"
                          sx={{
                            fontWeight: 700,
                            color: item.color,
                          }}
                        >
                          {item.step}
                        </Typography>
                      </Box>
                      <Typography
                        variant="h5"
                        gutterBottom
                        sx={{
                          fontWeight: 600,
                          mb: 2,
                          fontSize: { xs: '1.125rem', sm: '1.25rem', md: '1.5rem' },
                        }}
                      >
                        {item.title}
                      </Typography>
                      <Typography
                        variant="body1"
                        color="text.secondary"
                        sx={{ 
                          lineHeight: 1.7,
                          fontSize: { xs: '0.875rem', sm: '0.9375rem', md: '1rem' },
                        }}
                      >
                        {item.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>

        {/* Features Section */}
        <Box sx={{ py: { xs: 8, md: 12 } }}>
          <Container maxWidth="lg">
            <Box sx={{ textAlign: 'center', mb: { xs: 6, md: 8 } }}>
              <Typography
                variant="h2"
                gutterBottom
                sx={{
                  fontFamily: '"Playfair Display", Georgia, serif',
                  fontWeight: 700,
                  background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.light})`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  fontSize: { xs: '1.75rem', sm: '2.25rem', md: '2.5rem' },
                }}
              >
                คุณสมบัติพิเศษ
              </Typography>
            </Box>

            <Grid container spacing={3}>
              {[
                { icon: <VerifiedIcon />, title: 'การันตีที่นั่ง', desc: 'ระบบการจองที่มั่นคง ไม่ต้องกังวลเรื่องที่นั่งเต็ม' },
                { icon: <TimeIcon />, title: 'จองล่วงหน้า', desc: 'วางแผนล่วงหน้าได้ง่ายๆ เลือกเวลาที่เหมาะกับคุณ' },
                { icon: <QrIcon />, title: 'QR Check-in', desc: 'เช็คอินรวดเร็วด้วย QR Code ไม่ต้องรอ' },
                { icon: <SecurityIcon />, title: 'ปลอดภัย', desc: 'ข้อมูลของคุณได้รับการปกป้องอย่างดี' },
              ].map((feature, index) => (
                <Grid item xs={12} sm={6} md={3} key={index}>
                  <Box
                    className="premium-card"
                    sx={{
                      p: 3,
                      textAlign: 'center',
                      height: '100%',
                      minHeight: { xs: 220, sm: 'auto' },
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: 2,
                    }}
                  >
                    <Box
                      sx={{
                        color: theme.palette.primary.main,
                        '& .MuiSvgIcon-root': {
                          fontSize: { xs: 36, sm: 42, md: 48 },
                        },
                      }}
                    >
                      {feature.icon}
                    </Box>
                    <Typography 
                      variant="h6" 
                      fontWeight={600}
                      sx={{ fontSize: { xs: '1rem', sm: '1.125rem', md: '1.25rem' } }}
                    >
                      {feature.title}
                    </Typography>
                    <Typography 
                      variant="body2" 
                      color="text.secondary"
                      sx={{ fontSize: { xs: '0.8125rem', sm: '0.875rem' } }}
                    >
                      {feature.desc}
                    </Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>

        {/* CTA Section */}
        <Box
          sx={{
            background: `linear-gradient(135deg, ${alpha(theme.palette.primary.dark, 0.2)}, ${alpha(theme.palette.secondary.dark, 0.2)})`,
            py: { xs: 8, md: 12 },
            position: 'relative',
            overflow: 'hidden',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'radial-gradient(circle at 50% 50%, rgba(212, 175, 55, 0.1) 0%, transparent 70%)',
              pointerEvents: 'none',
            },
          }}
        >
          <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1 }}>
            <Box sx={{ textAlign: 'center' }}>
              <Typography
                variant="h2"
                gutterBottom
                sx={{
                  fontFamily: '"Playfair Display", Georgia, serif',
                  fontWeight: 700,
                  background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.light})`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  mb: 2,
                  fontSize: { xs: '1.75rem', sm: '2.25rem', md: '2.5rem' },
                  px: { xs: 2, sm: 0 },
                }}
              >
                พร้อมเริ่มต้นแล้วหรือยัง?
              </Typography>
              <Typography
                variant="h6"
                color="text.secondary"
                paragraph
                sx={{ 
                  mb: { xs: 3, sm: 4 }, 
                  lineHeight: 1.7,
                  fontSize: { xs: '1rem', sm: '1.125rem', md: '1.25rem' },
                  px: { xs: 2, sm: 0 },
                }}
              >
                เข้าร่วมกับเราวันนี้และไม่พลาดจุดโปรดของคุณอีกต่อไป
              </Typography>
              <Button
                component={Link}
                href="/register"
                variant="contained"
                color="primary"
                size="large"
                fullWidth={{ xs: true, sm: false }}
                sx={{
                  px: { xs: 4, sm: 6 },
                  py: { xs: 1.75, sm: 2 },
                  fontSize: { xs: '1rem', sm: '1.125rem' },
                  fontWeight: 600,
                  boxShadow: shadows.glow,
                  minHeight: { xs: 44, sm: 'auto' },
                  '&:hover': {
                    transform: 'translateY(-4px) scale(1.05)',
                    boxShadow: '0 12px 40px rgba(212, 175, 55, 0.3)',
                  },
                }}
              >
                สร้างบัญชีฟรี
              </Button>
            </Box>
          </Container>
        </Box>
      </Box>
    </>
  );
}

const shadows = {
  glow: '0 8px 32px rgba(212, 175, 55, 0.2)',
};
