import React from 'react';
import { Card, CardContent, Skeleton, Box } from '@mui/material';

interface SkeletonCardProps {
  variant?: 'booking' | 'zone' | 'table' | 'qr' | 'stat';
  count?: number;
}

const SkeletonCard: React.FC<SkeletonCardProps> = ({ variant = 'booking', count = 1 }) => {
  const renderBookingSkeleton = () => (
    <Card
      sx={{
        mb: 2,
        '&:last-child': { mb: 0 },
      }}
    >
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={2}>
          <Box flex={1}>
            <Skeleton variant="text" width="60%" height={32} sx={{ mb: 1 }} />
            <Skeleton variant="text" width="40%" height={24} />
          </Box>
          <Skeleton variant="rectangular" width={80} height={32} sx={{ borderRadius: 2 }} />
        </Box>
        
        <Box display="flex" gap={2} mb={2} flexWrap="wrap">
          <Skeleton variant="rectangular" width={100} height={24} sx={{ borderRadius: 1.5 }} />
          <Skeleton variant="rectangular" width={120} height={24} sx={{ borderRadius: 1.5 }} />
          <Skeleton variant="rectangular" width={80} height={24} sx={{ borderRadius: 1.5 }} />
        </Box>
        
        <Skeleton variant="text" width="100%" height={20} sx={{ mb: 0.5 }} />
        <Skeleton variant="text" width="90%" height={20} sx={{ mb: 0.5 }} />
        <Skeleton variant="text" width="70%" height={20} />
        
        <Box display="flex" gap={1} mt={2}>
          <Skeleton variant="rectangular" width={100} height={36} sx={{ borderRadius: 1.5 }} />
          <Skeleton variant="rectangular" width={100} height={36} sx={{ borderRadius: 1.5 }} />
        </Box>
      </CardContent>
    </Card>
  );

  const renderZoneSkeleton = () => (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Skeleton variant="rectangular" width="100%" height={200} />
      <CardContent sx={{ flex: 1 }}>
        <Skeleton variant="text" width="70%" height={32} sx={{ mb: 1 }} />
        <Skeleton variant="text" width="100%" height={20} sx={{ mb: 0.5 }} />
        <Skeleton variant="text" width="90%" height={20} sx={{ mb: 2 }} />
        
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Skeleton variant="text" width="40%" height={24} />
          <Skeleton variant="rectangular" width={80} height={24} sx={{ borderRadius: 1.5 }} />
        </Box>
      </CardContent>
    </Card>
  );

  const renderTableSkeleton = () => (
    <Card
      sx={{
        p: 2,
        textAlign: 'center',
      }}
    >
      <Skeleton
        variant="circular"
        width={60}
        height={60}
        sx={{ mx: 'auto', mb: 1.5 }}
      />
      <Skeleton variant="text" width="70%" height={24} sx={{ mx: 'auto', mb: 0.5 }} />
      <Skeleton variant="text" width="50%" height={20} sx={{ mx: 'auto' }} />
    </Card>
  );

  const renderQRSkeleton = () => (
    <Card
      sx={{
        p: 4,
        textAlign: 'center',
        maxWidth: 400,
        mx: 'auto',
      }}
    >
      <Skeleton variant="text" width="60%" height={36} sx={{ mx: 'auto', mb: 2 }} />
      <Skeleton
        variant="rectangular"
        width={250}
        height={250}
        sx={{ mx: 'auto', mb: 2, borderRadius: 2 }}
      />
      <Skeleton variant="text" width="80%" height={24} sx={{ mx: 'auto', mb: 1 }} />
      <Skeleton variant="text" width="70%" height={20} sx={{ mx: 'auto', mb: 3 }} />
      <Skeleton variant="rectangular" width="100%" height={48} sx={{ borderRadius: 1.5 }} />
    </Card>
  );

  const renderStatSkeleton = () => (
    <Card>
      <CardContent>
        <Box display="flex" alignItems="center" justifyContent="space-between" mb={1}>
          <Skeleton variant="text" width="60%" height={24} />
          <Skeleton variant="circular" width={40} height={40} />
        </Box>
        <Skeleton variant="text" width="40%" height={48} sx={{ mb: 1 }} />
        <Skeleton variant="text" width="80%" height={20} />
      </CardContent>
    </Card>
  );

  const renderSkeleton = () => {
    switch (variant) {
      case 'zone':
        return renderZoneSkeleton();
      case 'table':
        return renderTableSkeleton();
      case 'qr':
        return renderQRSkeleton();
      case 'stat':
        return renderStatSkeleton();
      case 'booking':
      default:
        return renderBookingSkeleton();
    }
  };

  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <Box key={index}>{renderSkeleton()}</Box>
      ))}
    </>
  );
};

export default SkeletonCard;

