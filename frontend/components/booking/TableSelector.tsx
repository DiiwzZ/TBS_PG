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
import { TableBar, People, CheckCircle } from '@mui/icons-material';
import { useTableStore } from '@/lib/store/tableStore';
import type { Table } from '@/types/table';

interface TableSelectorProps {
  selectedTableId: number | null;
  onSelectTable: (table: Table) => void;
  zoneId?: number | null;
}

export default function TableSelector({ selectedTableId, onSelectTable, zoneId }: TableSelectorProps) {
  const { tablesByZone, isLoadingTables, error, fetchAvailableTablesByZone } = useTableStore();

  useEffect(() => {
    if (zoneId) {
      fetchAvailableTablesByZone(zoneId);
    }
  }, [zoneId, fetchAvailableTablesByZone]);

  if (!zoneId) {
    return (
      <Alert severity="info">
        กรุณาเลือกโซนก่อนเลือกโต๊ะ
      </Alert>
    );
  }

  if (isLoadingTables) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight={200}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

  const tables = tablesByZone[zoneId] || [];
  const availableTables = tables.filter((t) => t.available && t.active);

  if (availableTables.length === 0) {
    return (
      <Alert severity="warning">
        ขออภัย โซนนี้ไม่มีโต๊ะว่างในขณะนี้ กรุณาเลือกโซนอื่นหรือลองใหม่ภายหลัง
      </Alert>
    );
  }

  return (
    <Box>
      <Typography 
        variant="h6" 
        gutterBottom 
        color="primary"
        sx={{ fontSize: { xs: '1rem', sm: '1.125rem', md: '1.25rem' } }}
      >
        เลือกโต๊ะ
      </Typography>
      <Typography 
        variant="body2" 
        color="text.secondary" 
        mb={3}
        sx={{ fontSize: { xs: '0.8125rem', sm: '0.875rem' } }}
      >
        เลือกโต๊ะที่คุณต้องการจอง (การจองแบบพรีเมียม)
      </Typography>

      <Grid container spacing={2}>
        {availableTables.map((table) => {
          const isSelected = table.id === selectedTableId;

          return (
            <Grid item xs={12} sm={6} md={4} key={table.id}>
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
                  onClick={() => onSelectTable(table)}
                  sx={{ height: '100%', p: 0 }}
                >
                  <CardContent>
                    <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={2}>
                      <Box display="flex" alignItems="center" gap={1}>
                        <TableBar color="primary" />
                        <Typography variant="h6" color="primary">
                          โต๊ะ {table.tableNumber}
                        </Typography>
                      </Box>
                      {isSelected && (
                        <CheckCircle color="primary" />
                      )}
                    </Box>

                    <Box display="flex" alignItems="center" gap={1} mb={1}>
                      <People fontSize="small" color="action" />
                      <Typography variant="body2" color="text.secondary">
                        รองรับ: <strong>{table.capacity}</strong> ที่นั่ง
                      </Typography>
                    </Box>

                    {table.notes && (
                      <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 1 }}>
                        {table.notes}
                      </Typography>
                    )}

                    <Chip
                      label="ว่าง"
                      size="small"
                      color="success"
                      sx={{ mt: 1 }}
                    />
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

