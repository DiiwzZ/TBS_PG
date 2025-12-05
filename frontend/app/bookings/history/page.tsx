'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Box,
  Container,
  Paper,
  Typography,
  Grid,
  CircularProgress,
  Alert,
  Button,
  TextField,
  InputAdornment,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import { ArrowBack, Refresh, History, Search } from '@mui/icons-material';
import Navbar from '@/components/layout/Navbar';
import BookingCard from '@/components/booking/BookingCard';
import { useAuthStore } from '@/lib/store/authStore';
import { useBookingStore } from '@/lib/store/bookingStore';
import { useTableStore } from '@/lib/store/tableStore';
import type { BookingStatus } from '@/types/booking';

export default function BookingHistoryPage() {
  const router = useRouter();
  const { isAuthenticated, user, isHydrated } = useAuthStore();
  const {
    bookingHistory,
    isLoading,
    error,
    fetchUserBookings,
  } = useBookingStore();
  const { zones, tablesByZone, fetchZoneById, fetchTablesByZone } = useTableStore();

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<BookingStatus | 'ALL'>('ALL');

  useEffect(() => {
    if (isHydrated && !isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, isHydrated, router]);

  useEffect(() => {
    if (user) {
      fetchUserBookings(user.id);
    }
  }, [user, fetchUserBookings]);

  // Load zone data for bookings
  useEffect(() => {
    bookingHistory.forEach((booking) => {
      if (booking.zoneId && !zones.find((z) => z.id === booking.zoneId)) {
        fetchZoneById(booking.zoneId);
      }
      if (booking.zoneId && !tablesByZone[booking.zoneId]) {
        fetchTablesByZone(booking.zoneId);
      }
    });
  }, [bookingHistory, zones, tablesByZone, fetchZoneById, fetchTablesByZone]);

  const handleRefresh = () => {
    if (user) {
      fetchUserBookings(user.id);
    }
  };

  // Filter bookings
  const filteredBookings = bookingHistory.filter((booking) => {
    // Status filter
    if (statusFilter !== 'ALL' && booking.status !== statusFilter) {
      return false;
    }

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      const zone = zones.find((z) => z.id === booking.zoneId);
      const table = booking.zoneId && booking.tableId
        ? tablesByZone[booking.zoneId]?.find((t) => t.id === booking.tableId)
        : null;

      return (
        booking.id.toString().includes(query) ||
        zone?.name.toLowerCase().includes(query) ||
        table?.tableNumber.toLowerCase().includes(query)
      );
    }

    return true;
  });

  if (!isHydrated || !isAuthenticated || !user) {
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
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={3} flexDirection={{ xs: 'column', sm: 'row' }} gap={2}>
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
              <History sx={{ color: 'primary.main' }} />
              ประวัติการจอง
            </Typography>

            <Box display="flex" gap={1}>
              <Button
                variant="outlined"
                startIcon={<ArrowBack />}
                onClick={() => router.push('/dashboard')}
                size="small"
              >
                กลับ
              </Button>
              <Button
                variant="outlined"
                startIcon={<Refresh />}
                onClick={handleRefresh}
                disabled={isLoading}
                size="small"
              >
                รีเฟรช
              </Button>
            </Box>
          </Box>

          {/* Filters */}
          <Box display="flex" gap={2} mb={3} flexDirection={{ xs: 'column', sm: 'row' }}>
            <TextField
              fullWidth
              placeholder="ค้นหาด้วยหมายเลขการจอง, โซน, หรือโต๊ะ..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                ),
              }}
              sx={{ flex: 2 }}
            />

            <FormControl sx={{ minWidth: 200 }}>
              <InputLabel>สถานะ</InputLabel>
              <Select
                value={statusFilter}
                label="สถานะ"
                onChange={(e) => setStatusFilter(e.target.value as BookingStatus | 'ALL')}
              >
                <MenuItem value="ALL">ทั้งหมด</MenuItem>
                <MenuItem value="COMPLETED">เสร็จสิ้น</MenuItem>
                <MenuItem value="CANCELLED">ยกเลิก</MenuItem>
                <MenuItem value="NO_SHOW">ไม่มาตามนัด</MenuItem>
              </Select>
            </FormControl>
          </Box>

          {/* Loading State */}
          {isLoading && bookingHistory.length === 0 && (
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

          {/* Bookings Grid */}
          {!isLoading && filteredBookings.length > 0 && (
            <Grid container spacing={{ xs: 2, sm: 3 }}>
              {filteredBookings.map((booking, index) => {
                const zone = zones.find((z) => z.id === booking.zoneId);
                const table = booking.zoneId && booking.tableId
                  ? tablesByZone[booking.zoneId]?.find((t) => t.id === booking.tableId)
                  : null;

                return (
                  <Grid 
                    item 
                    xs={12} 
                    sm={6} 
                    md={4} 
                    key={booking.id}
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
                    <BookingCard
                      booking={booking}
                      zoneName={zone?.name}
                      tableName={table ? `โต๊ะ ${table.tableNumber}` : undefined}
                      showActions={false}
                    />
                  </Grid>
                );
              })}
            </Grid>
          )}

          {/* Empty State */}
          {!isLoading && filteredBookings.length === 0 && (
            <Paper 
              className="premium-card" 
              sx={{ 
                p: 4, 
                textAlign: 'center',
                borderRadius: 3,
              }}
            >
              <Typography variant="h6" color="text.secondary" gutterBottom fontWeight={600}>
                {searchQuery || statusFilter !== 'ALL' 
                  ? '🔍 ไม่พบผลลัพธ์ที่ค้นหา' 
                  : '📚 ไม่มีประวัติการจอง'}
              </Typography>
              {(searchQuery || statusFilter !== 'ALL') && (
                <Button
                  variant="outlined"
                  onClick={() => {
                    setSearchQuery('');
                    setStatusFilter('ALL');
                  }}
                  sx={{ 
                    mt: 2,
                    transition: 'all 300ms ease',
                    '&:hover': {
                      transform: 'scale(1.05)',
                    }
                  }}
                >
                  ล้างตัวกรอง
                </Button>
              )}
            </Paper>
          )}
        </Paper>
      </Container>
    </>
  );
}

