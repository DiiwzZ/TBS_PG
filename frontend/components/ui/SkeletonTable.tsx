import React from 'react';
import { Box, Skeleton, Grid } from '@mui/material';

interface SkeletonTableProps {
  columns?: number;
  rows?: number;
  variant?: 'grid' | 'list';
}

const SkeletonTable: React.FC<SkeletonTableProps> = ({
  columns = 3,
  rows = 3,
  variant = 'grid',
}) => {
  if (variant === 'grid') {
    return (
      <Grid container spacing={2}>
        {Array.from({ length: columns * rows }).map((_, index) => (
          <Grid item xs={12} sm={6} md={12 / columns} key={index}>
            <Box
              sx={{
                p: 2,
                borderRadius: 2,
                border: '2px dashed rgba(212, 175, 55, 0.2)',
                textAlign: 'center',
              }}
            >
              <Skeleton
                variant="circular"
                width={56}
                height={56}
                sx={{ mx: 'auto', mb: 1 }}
              />
              <Skeleton variant="text" width="60%" height={24} sx={{ mx: 'auto', mb: 0.5 }} />
              <Skeleton variant="text" width="40%" height={20} sx={{ mx: 'auto' }} />
            </Box>
          </Grid>
        ))}
      </Grid>
    );
  }

  // List variant
  return (
    <Box>
      {Array.from({ length: rows }).map((_, index) => (
        <Box
          key={index}
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 2,
            p: 2,
            mb: 1,
            borderRadius: 2,
            border: '1px solid rgba(212, 175, 55, 0.1)',
            '&:last-child': { mb: 0 },
          }}
        >
          <Skeleton variant="circular" width={48} height={48} />
          <Box flex={1}>
            <Skeleton variant="text" width="40%" height={24} sx={{ mb: 0.5 }} />
            <Skeleton variant="text" width="60%" height={20} />
          </Box>
          <Skeleton variant="rectangular" width={80} height={32} sx={{ borderRadius: 1 }} />
        </Box>
      ))}
    </Box>
  );
};

export default SkeletonTable;

