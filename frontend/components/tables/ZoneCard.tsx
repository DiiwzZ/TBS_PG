'use client';

import {
  Card,
  CardContent,
  CardActionArea,
  Typography,
  Box,
  Chip,
  LinearProgress,
} from '@mui/material';
import { LocationOn, Chair, CheckCircle } from '@mui/icons-material';
import type { Zone, Table } from '@/types/table';

interface ZoneCardProps {
  zone: Zone;
  tables: Table[];
  onClick: () => void;
}

export default function ZoneCard({ zone, tables, onClick }: ZoneCardProps) {
  const activeTables = tables.filter((t) => t.active);
  const availableTables = activeTables.filter((t) => t.available);
  const totalCapacity = activeTables.reduce((sum, t) => sum + t.capacity, 0);
  const availability = activeTables.length > 0 
    ? (availableTables.length / activeTables.length) * 100 
    : 0;

  const getAvailabilityColor = () => {
    if (availability >= 70) return 'success';
    if (availability >= 30) return 'warning';
    return 'error';
  };

  return (
    <Card
      elevation={3}
      className="premium-card"
      sx={{
        transition: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1)',
        height: '100%',
        '&:hover': {
          transform: 'translateY(-8px) scale(1.02)',
          boxShadow: 8,
        },
      }}
    >
      <CardActionArea onClick={onClick} sx={{ height: '100%' }}>
        <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
          {/* Header */}
          <Box display="flex" justifyContent="space-between" alignItems="start" mb={2}>
            <Box display="flex" alignItems="center" gap={1} flex={1}>
              <LocationOn color="primary" sx={{ fontSize: { xs: '1.5rem', sm: '2rem' } }} />
              <Typography 
                variant="h5" 
                color="primary" 
                fontWeight={600}
                sx={{ fontSize: { xs: '1rem', sm: '1.25rem', md: '1.5rem' } }}
              >
                {zone.name}
              </Typography>
            </Box>
            {zone.active && (
              <Chip label="เปิด" size="small" color="success" icon={<CheckCircle />} />
            )}
          </Box>

          {/* Description */}
          <Typography variant="body2" color="text.secondary" mb={3}>
            {zone.description}
          </Typography>

          {/* Stats */}
          <Box mb={2}>
            <Box display="flex" justifyContent="space-between" mb={1}>
              <Typography variant="body2" color="text.secondary">
                โต๊ะว่าง
              </Typography>
              <Typography variant="body2" fontWeight="bold">
                {availableTables.length} / {activeTables.length}
              </Typography>
            </Box>
            <LinearProgress
              variant="determinate"
              value={availability}
              color={getAvailabilityColor()}
              sx={{ height: 8, borderRadius: 1 }}
            />
          </Box>

          {/* Capacity */}
          <Box display="flex" alignItems="center" gap={1}>
            <Chair color="action" fontSize="small" />
            <Typography variant="body2" color="text.secondary">
              ความจุรวม: <strong>{totalCapacity}</strong> ที่นั่ง
            </Typography>
          </Box>

          {/* Status Indicator */}
          {availability === 0 && (
            <Chip
              label="เต็มทั้งหมด"
              size="small"
              color="error"
              sx={{ mt: 2 }}
            />
          )}
          {availability > 0 && availability < 30 && (
            <Chip
              label="เหลือน้อย"
              size="small"
              color="warning"
              sx={{ mt: 2 }}
            />
          )}
          {availability >= 70 && (
            <Chip
              label="มีที่นั่งมาก"
              size="small"
              color="success"
              sx={{ mt: 2 }}
            />
          )}
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

