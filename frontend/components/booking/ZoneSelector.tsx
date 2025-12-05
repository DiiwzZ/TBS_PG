'use client';

import { useEffect } from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  CardActionArea,
  Typography,
  Chip,
  CircularProgress,
  Alert,
} from '@mui/material';
import { LocationOn, Chair } from '@mui/icons-material';
import { useTableStore } from '@/lib/store/tableStore';
import type { Zone } from '@/types/table';

interface ZoneSelectorProps {
  selectedZoneId: number | null;
  onSelectZone: (zone: Zone) => void;
}

export default function ZoneSelector({ selectedZoneId, onSelectZone }: ZoneSelectorProps) {
  const { activeZones, isLoadingZones, error, fetchActiveZones, fetchTablesByZone, tablesByZone } = useTableStore();

  useEffect(() => {
    fetchActiveZones();
  }, [fetchActiveZones]);

  // Fetch tables for each zone to show counts
  useEffect(() => {
    activeZones.forEach((zone) => {
      if (!tablesByZone[zone.id]) {
        fetchTablesByZone(zone.id);
      }
    });
  }, [activeZones, fetchTablesByZone, tablesByZone]);

  if (isLoadingZones) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight={200}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

  if (activeZones.length === 0) {
    return (
      <Alert severity="info">
        ขณะนี้ไม่มีโซนที่เปิดให้บริการ กรุณาลองอีกครั้งในภายหลัง
      </Alert>
    );
  }

  return (
    <Box>
      <Typography variant="h6" gutterBottom color="primary">
        เลือกโซน
      </Typography>
      <Typography variant="body2" color="text.secondary" mb={3}>
        เลือกโซนที่คุณต้องการจอง (การจองแบบปกติ)
      </Typography>

      <Grid container spacing={2}>
        {activeZones.map((zone) => {
          const tables = tablesByZone[zone.id] || [];
          const availableTables = tables.filter((t) => t.available && t.active).length;
          const totalTables = tables.filter((t) => t.active).length;
          const isSelected = zone.id === selectedZoneId;

          return (
            <Grid item xs={12} sm={6} md={4} key={zone.id}>
              <Card
                elevation={isSelected ? 8 : 2}
                sx={{
                  border: isSelected ? '2px solid' : '1px solid',
                  borderColor: isSelected ? 'primary.main' : 'rgba(255, 167, 38, 0.2)',
                  transition: 'all 0.3s',
                  height: '100%',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: 4,
                  },
                }}
              >
                <CardActionArea
                  onClick={() => onSelectZone(zone)}
                  sx={{ height: '100%', p: 0 }}
                >
                  <CardContent>
                    <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={2}>
                      <Box display="flex" alignItems="center" gap={1}>
                        <LocationOn color="primary" />
                        <Typography variant="h6" color="primary">
                          {zone.name}
                        </Typography>
                      </Box>
                      {isSelected && (
                        <Chip label="เลือกแล้ว" color="primary" size="small" />
                      )}
                    </Box>

                    <Typography variant="body2" color="text.secondary" mb={2}>
                      {zone.description}
                    </Typography>

                    <Box display="flex" alignItems="center" gap={1}>
                      <Chair fontSize="small" color="action" />
                      <Typography variant="body2" color="text.secondary">
                        {totalTables > 0 ? (
                          <>
                            โต๊ะว่าง: <strong>{availableTables}</strong> / {totalTables}
                          </>
                        ) : (
                          'กำลังโหลด...'
                        )}
                      </Typography>
                    </Box>

                    {availableTables === 0 && totalTables > 0 && (
                      <Chip
                        label="เต็ม"
                        size="small"
                        color="error"
                        sx={{ mt: 1 }}
                      />
                    )}
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
}

