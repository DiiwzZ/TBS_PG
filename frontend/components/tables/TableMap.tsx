'use client';

import { useState } from 'react';
import {
  Box,
  Grid,
  Paper,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Divider,
} from '@mui/material';
import { TableBar, People, Info } from '@mui/icons-material';
import AvailabilityIndicator from './AvailabilityIndicator';
import type { Table } from '@/types/table';
import Link from 'next/link';

interface TableMapProps {
  tables: Table[];
  onTableClick?: (table: Table) => void;
  showBookButton?: boolean;
}

export default function TableMap({ tables, onTableClick, showBookButton = false }: TableMapProps) {
  const [selectedTable, setSelectedTable] = useState<Table | null>(null);

  const handleTableClick = (table: Table) => {
    setSelectedTable(table);
    if (onTableClick) {
      onTableClick(table);
    }
  };

  const handleClose = () => {
    setSelectedTable(null);
  };

  const getTableColor = (table: Table) => {
    if (!table.active) return 'grey.800';
    if (!table.available) return 'error.dark';
    return 'success.dark';
  };

  const getTableBorderColor = (table: Table) => {
    if (!table.active) return 'grey.600';
    if (!table.available) return 'error.main';
    return 'success.main';
  };

  return (
    <>
      <Box>
        <Typography variant="h6" gutterBottom color="primary" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <TableBar />
          แผนผังโต๊ะ
        </Typography>

        {/* Legend */}
        <Box display="flex" gap={2} mb={3} flexWrap="wrap">
          <Box display="flex" alignItems="center" gap={1}>
            <Box
              sx={{
                width: 16,
                height: 16,
                backgroundColor: 'success.main',
                borderRadius: 1,
              }}
            />
            <Typography variant="caption">ว่าง</Typography>
          </Box>
          <Box display="flex" alignItems="center" gap={1}>
            <Box
              sx={{
                width: 16,
                height: 16,
                backgroundColor: 'error.main',
                borderRadius: 1,
              }}
            />
            <Typography variant="caption">ไม่ว่าง</Typography>
          </Box>
          <Box display="flex" alignItems="center" gap={1}>
            <Box
              sx={{
                width: 16,
                height: 16,
                backgroundColor: 'grey.600',
                borderRadius: 1,
              }}
            />
            <Typography variant="caption">ปิด</Typography>
          </Box>
        </Box>

        {/* Table Grid */}
        <Grid container spacing={2}>
          {tables.map((table) => (
            <Grid item xs={6} sm={4} md={3} key={table.id}>
              <Paper
                elevation={3}
                sx={{
                  p: 2,
                  cursor: 'pointer',
                  transition: 'all 0.3s',
                  backgroundColor: getTableColor(table),
                  border: '2px solid',
                  borderColor: getTableBorderColor(table),
                  '&:hover': {
                    transform: 'scale(1.05)',
                    boxShadow: 6,
                  },
                }}
                onClick={() => handleTableClick(table)}
              >
                <Box textAlign="center">
                  <TableBar sx={{ fontSize: 40, mb: 1 }} />
                  <Typography variant="h6" gutterBottom>
                    {table.tableNumber}
                  </Typography>
                  <Typography variant="caption" display="block" mb={1}>
                    <People fontSize="small" sx={{ verticalAlign: 'middle', mr: 0.5 }} />
                    {table.capacity} ที่
                  </Typography>
                  <AvailabilityIndicator
                    available={table.available}
                    active={table.active}
                  />
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>

        {tables.length === 0 && (
          <Paper sx={{ p: 4, textAlign: 'center' }}>
            <Typography color="text.secondary">
              ไม่มีโต๊ะในโซนนี้
            </Typography>
          </Paper>
        )}
      </Box>

      {/* Table Detail Dialog */}
      <Dialog open={!!selectedTable} onClose={handleClose} maxWidth="sm" fullWidth>
        {selectedTable && (
          <>
            <DialogTitle>
              <Box display="flex" alignItems="center" gap={1}>
                <TableBar color="primary" />
                <Typography variant="h6">
                  โต๊ะ {selectedTable.tableNumber}
                </Typography>
              </Box>
            </DialogTitle>
            <DialogContent>
              <Box mb={2}>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  โซน
                </Typography>
                <Typography variant="body1" fontWeight="bold">
                  {selectedTable.zoneName}
                </Typography>
              </Box>

              <Divider sx={{ my: 2 }} />

              <Box mb={2}>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  ความจุ
                </Typography>
                <Typography variant="body1">
                  <People sx={{ verticalAlign: 'middle', mr: 0.5 }} />
                  {selectedTable.capacity} ที่นั่ง
                </Typography>
              </Box>

              <Divider sx={{ my: 2 }} />

              <Box mb={2}>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  สถานะ
                </Typography>
                <AvailabilityIndicator
                  available={selectedTable.available}
                  active={selectedTable.active}
                />
              </Box>

              {selectedTable.notes && (
                <>
                  <Divider sx={{ my: 2 }} />
                  <Box>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      <Info sx={{ verticalAlign: 'middle', mr: 0.5, fontSize: 'small' }} />
                      หมายเหตุ
                    </Typography>
                    <Typography variant="body2">
                      {selectedTable.notes}
                    </Typography>
                  </Box>
                </>
              )}
            </DialogContent>
            <DialogActions sx={{ p: 3, pt: 0 }}>
              <Button onClick={handleClose} variant="outlined">
                ปิด
              </Button>
              {showBookButton && selectedTable.available && selectedTable.active && (
                <Button
                  component={Link}
                  href="/booking"
                  variant="contained"
                  color="primary"
                >
                  จองโต๊ะนี้
                </Button>
              )}
            </DialogActions>
          </>
        )}
      </Dialog>
    </>
  );
}

