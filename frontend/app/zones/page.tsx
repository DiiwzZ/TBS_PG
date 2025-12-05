'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Box,
  Container,
  Paper,
  Typography,
  Grid,
  TextField,
  InputAdornment,
  CircularProgress,
  Alert,
  Button,
  Chip,
} from '@mui/material';
import { Search, LocationOn, Refresh } from '@mui/icons-material';
import Navbar from '@/components/layout/Navbar';
import ZoneCard from '@/components/tables/ZoneCard';
import { useTableStore } from '@/lib/store/tableStore';
import { useAuthStore } from '@/lib/store/authStore';

export default function ZonesPage() {
  const router = useRouter();
  const { isAuthenticated, isHydrated } = useAuthStore();
  const { 
    activeZones, 
    tablesByZone, 
    isLoadingZones, 
    error, 
    fetchActiveZones, 
    fetchTablesByZone,
    setAutoRefresh,
  } = useTableStore();

  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchActiveZones();
    setAutoRefresh(true);

    return () => {
      setAutoRefresh(false);
    };
  }, [fetchActiveZones, setAutoRefresh]);

  // Fetch tables for each zone
  useEffect(() => {
    activeZones.forEach((zone) => {
      if (!tablesByZone[zone.id]) {
        fetchTablesByZone(zone.id);
      }
    });
  }, [activeZones, fetchTablesByZone, tablesByZone]);

  // Filter zones by search query
  const filteredZones = activeZones.filter((zone) =>
    zone.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    zone.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleZoneClick = (zoneId: number) => {
    router.push(`/zones/${zoneId}`);
  };

  const handleRefresh = () => {
    fetchActiveZones();
    activeZones.forEach((zone) => {
      fetchTablesByZone(zone.id);
    });
  };

  if (!isHydrated) {
    return null;
  }

  return (
    <>
      <Navbar />
      <Container 
        maxWidth="lg" 
        sx={{ 
          mt: { xs: 2, sm: 4 }, 
          mb: 4, 
          px: { xs: 2, sm: 3 },
          pb: { xs: 'calc(64px + 24px)', md: 4 }
        }}
      >
        <Paper 
          elevation={3} 
          className="premium-card"
          sx={{ 
            p: { xs: 3, sm: 4 },
            borderRadius: 3,
          }}
        >
          {/* Header */}
          <Box mb={4}>
            <Box display="flex" justifyContent="space-between" alignItems="center" flexWrap="wrap" gap={2} mb={2}>
              <Typography 
                variant="h4" 
                sx={{ 
                  fontSize: { xs: '1.5rem', sm: '2rem' },
                  fontFamily: '"Playfair Display", Georgia, serif',
                  fontWeight: 700,
                  background: 'linear-gradient(135deg, #D4AF37, #F4E5B8)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                }}
              >
                <LocationOn sx={{ color: 'primary.main' }} />
                โซนทั้งหมด
              </Typography>
              <Button
                variant="outlined"
                startIcon={<Refresh sx={{ animation: isLoadingZones ? 'spin 1s linear infinite' : 'none', '@keyframes spin': { '0%': { transform: 'rotate(0deg)' }, '100%': { transform: 'rotate(360deg)' } } }} />}
                onClick={handleRefresh}
                disabled={isLoadingZones}
                size="small"
                sx={{
                  transition: 'all 300ms ease',
                  '&:hover': {
                    transform: 'scale(1.05)',
                  }
                }}
              >
                รีเฟรช
              </Button>
            </Box>
            <Typography 
              variant="body2" 
              color="text.secondary"
              sx={{ fontSize: { xs: '0.8125rem', sm: '0.875rem' } }}
            >
              เลือกโซนเพื่อดูรายละเอียดและโต๊ะที่ว่าง
            </Typography>
          </Box>

          {/* Auto-refresh indicator */}
          <Alert severity="info" sx={{ mb: 3 }} icon={<Refresh />}>
            ระบบอัปเดตข้อมูลความว่างอัตโนมัติทุก 15 วินาที
          </Alert>

          {/* Search */}
          <TextField
            fullWidth
            placeholder="ค้นหาโซน..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
            sx={{ mb: 4 }}
          />

          {/* Loading State */}
          {isLoadingZones && activeZones.length === 0 && (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight={200}>
              <CircularProgress />
            </Box>
          )}

          {/* Error State */}
          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}

          {/* Zones Grid */}
          {!isLoadingZones && filteredZones.length > 0 && (
            <Grid container spacing={{ xs: 2, sm: 3 }}>
              {filteredZones.map((zone, index) => (
                <Grid 
                  item 
                  xs={12} 
                  sm={6} 
                  md={4} 
                  key={zone.id}
                  sx={{
                    animation: 'fadeInUp 0.5s ease-out',
                    animationDelay: `${index * 0.1}s`,
                    animationFillMode: 'both',
                    '@keyframes fadeInUp': {
                      '0%': { opacity: 0, transform: 'translateY(20px)' },
                      '100%': { opacity: 1, transform: 'translateY(0)' }
                    }
                  }}
                >
                  <ZoneCard
                    zone={zone}
                    tables={tablesByZone[zone.id] || []}
                    onClick={() => handleZoneClick(zone.id)}
                  />
                </Grid>
              ))}
            </Grid>
          )}

          {/* Empty State */}
          {!isLoadingZones && filteredZones.length === 0 && (
            <Paper sx={{ p: 4, textAlign: 'center' }}>
              <Typography color="text.secondary" gutterBottom>
                {searchQuery ? 'ไม่พบโซนที่ค้นหา' : 'ไม่มีโซนที่เปิดให้บริการ'}
              </Typography>
              {searchQuery && (
                <Button
                  variant="text"
                  onClick={() => setSearchQuery('')}
                  sx={{ mt: 2 }}
                >
                  ล้างการค้นหา
                </Button>
              )}
            </Paper>
          )}

          {/* Quick Action */}
          {!isLoadingZones && activeZones.length > 0 && isAuthenticated && (
            <Box mt={4} textAlign="center">
              <Button
                variant="contained"
                size="large"
                fullWidth={{ xs: true, sm: false }}
                onClick={() => router.push('/booking')}
                sx={{ 
                  minWidth: { xs: '100%', sm: 200 },
                  py: { xs: 1.5, sm: 1.75 },
                  minHeight: { xs: 44, sm: 'auto' },
                  fontSize: { xs: '0.9375rem', sm: '1rem' },
                  background: 'linear-gradient(135deg, #D4AF37, #F4E5B8)',
                  color: '#000',
                  fontWeight: 600,
                  transition: 'all 300ms ease',
                  '&:hover': {
                    background: 'linear-gradient(135deg, #F4E5B8, #D4AF37)',
                    transform: 'scale(1.05)',
                  }
                }}
              >
                🍺 จองโต๊ะทันที
              </Button>
            </Box>
          )}
        </Paper>
      </Container>
    </>
  );
}

