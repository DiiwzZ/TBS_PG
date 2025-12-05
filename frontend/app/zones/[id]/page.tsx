'use client';

import { useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import {
  Box,
  Container,
  Paper,
  Typography,
  Button,
  Breadcrumbs,
  Link as MuiLink,
  CircularProgress,
  Alert,
  Chip,
  Divider,
} from '@mui/material';
import { ArrowBack, LocationOn, Chair, CheckCircle, Refresh } from '@mui/icons-material';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import TableMap from '@/components/tables/TableMap';
import { useTableStore } from '@/lib/store/tableStore';
import { useAuthStore } from '@/lib/store/authStore';

export default function ZoneDetailPage() {
  const router = useRouter();
  const params = useParams();
  const zoneId = parseInt(params.id as string);

  const { isAuthenticated } = useAuthStore();
  const {
    selectedZone,
    tablesByZone,
    isLoadingZones,
    isLoadingTables,
    error,
    fetchZoneById,
    fetchTablesByZone,
    setAutoRefresh,
  } = useTableStore();

  useEffect(() => {
    if (zoneId) {
      fetchZoneById(zoneId);
      fetchTablesByZone(zoneId);
      setAutoRefresh(true);
    }

    return () => {
      setAutoRefresh(false);
    };
  }, [zoneId, fetchZoneById, fetchTablesByZone, setAutoRefresh]);

  const tables = tablesByZone[zoneId] || [];
  const activeTables = tables.filter((t) => t.active);
  const availableTables = activeTables.filter((t) => t.available);
  const totalCapacity = activeTables.reduce((sum, t) => sum + t.capacity, 0);

  const handleRefresh = () => {
    fetchZoneById(zoneId);
    fetchTablesByZone(zoneId);
  };

  if (isLoadingZones || isLoadingTables) {
    return (
      <>
        <Navbar />
        <Container maxWidth="lg" sx={{ mt: 4 }}>
          <Box display="flex" justifyContent="center" alignItems="center" minHeight={400}>
            <CircularProgress />
          </Box>
        </Container>
      </>
    );
  }

  if (error || !selectedZone) {
    return (
      <>
        <Navbar />
        <Container maxWidth="lg" sx={{ mt: 4 }}>
          <Alert severity="error">
            {error || 'ไม่พบโซนที่ระบุ'}
          </Alert>
          <Button
            component={Link}
            href="/zones"
            startIcon={<ArrowBack />}
            sx={{ mt: 2 }}
          >
            กลับไปหน้าโซน
          </Button>
        </Container>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <Container maxWidth="lg" sx={{ mt: { xs: 2, sm: 4 }, mb: 4, px: { xs: 2, sm: 3 } }}>
        {/* Breadcrumbs */}
        <Breadcrumbs sx={{ mb: 2 }}>
          <MuiLink component={Link} href="/" color="inherit">
            หน้าหลัก
          </MuiLink>
          <MuiLink component={Link} href="/zones" color="inherit">
            โซนทั้งหมด
          </MuiLink>
          <Typography color="primary">{selectedZone.name}</Typography>
        </Breadcrumbs>

        <Paper elevation={3} sx={{ p: { xs: 2, sm: 4 }, border: '1px solid rgba(255, 167, 38, 0.2)' }}>
          {/* Header */}
          <Box display="flex" justifyContent="space-between" alignItems="start" mb={3} flexDirection={{ xs: 'column', sm: 'row' }} gap={2}>
            <Box>
              <Box display="flex" alignItems="center" gap={2} mb={1}>
                <LocationOn color="primary" sx={{ fontSize: 40 }} />
                <Typography variant="h4" color="primary" sx={{ fontSize: { xs: '1.5rem', sm: '2rem' } }}>
                  {selectedZone.name}
                </Typography>
                {selectedZone.active && (
                  <Chip label="เปิด" color="success" icon={<CheckCircle />} />
                )}
              </Box>
              <Typography variant="body1" color="text.secondary">
                {selectedZone.description}
              </Typography>
            </Box>

            <Box display="flex" gap={1} flexDirection={{ xs: 'row', sm: 'column' }} width={{ xs: '100%', sm: 'auto' }}>
              <Button
                variant="outlined"
                startIcon={<ArrowBack />}
                onClick={() => router.push('/zones')}
                fullWidth
                sx={{ minWidth: { sm: 120 } }}
              >
                กลับ
              </Button>
              <Button
                variant="outlined"
                startIcon={<Refresh />}
                onClick={handleRefresh}
                fullWidth
                sx={{ minWidth: { sm: 120 } }}
              >
                รีเฟรช
              </Button>
            </Box>
          </Box>

          <Divider sx={{ my: 3 }} />

          {/* Stats */}
          <Box mb={4}>
            <Typography variant="h6" gutterBottom color="primary">
              สถิติโซน
            </Typography>
            <Box display="flex" gap={3} flexWrap="wrap">
              <Box>
                <Typography variant="body2" color="text.secondary">
                  โต๊ะว่าง
                </Typography>
                <Typography variant="h5" color="success.main">
                  {availableTables.length} / {activeTables.length}
                </Typography>
              </Box>
              <Box>
                <Typography variant="body2" color="text.secondary">
                  ความจุรวม
                </Typography>
                <Typography variant="h5" color="primary">
                  <Chair sx={{ verticalAlign: 'middle', mr: 0.5 }} />
                  {totalCapacity} ที่นั่ง
                </Typography>
              </Box>
              <Box>
                <Typography variant="body2" color="text.secondary">
                  อัตราว่าง
                </Typography>
                <Typography variant="h5" color="primary">
                  {activeTables.length > 0 
                    ? Math.round((availableTables.length / activeTables.length) * 100) 
                    : 0}%
                </Typography>
              </Box>
            </Box>
          </Box>

          <Alert severity="info" sx={{ mb: 3 }} icon={<Refresh />}>
            ระบบอัปเดตสถานะโต๊ะอัตโนมัติทุก 15 วินาที
          </Alert>

          {/* Table Map */}
          <TableMap tables={tables} showBookButton={isAuthenticated} />

          {/* Action Button */}
          {isAuthenticated && availableTables.length > 0 && (
            <Box mt={4} textAlign="center">
              <Button
                variant="contained"
                size="large"
                onClick={() => router.push('/booking')}
                sx={{ minWidth: 250 }}
              >
                จองโต๊ะในโซนนี้
              </Button>
            </Box>
          )}

          {!isAuthenticated && (
            <Alert severity="info" sx={{ mt: 4 }}>
              <strong>กรุณาเข้าสู่ระบบ</strong> เพื่อจองโต๊ะ
              <Button
                component={Link}
                href="/login"
                variant="outlined"
                size="small"
                sx={{ ml: 2 }}
              >
                เข้าสู่ระบบ
              </Button>
            </Alert>
          )}
        </Paper>
      </Container>
    </>
  );
}

