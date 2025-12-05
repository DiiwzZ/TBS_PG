import React from 'react';
import { Box, Skeleton, Card, CardContent } from '@mui/material';

interface SkeletonFormProps {
  fields?: number;
  withCard?: boolean;
  withSubmit?: boolean;
}

const SkeletonForm: React.FC<SkeletonFormProps> = ({
  fields = 3,
  withCard = true,
  withSubmit = true,
}) => {
  const formContent = (
    <Box>
      {/* Title */}
      <Skeleton variant="text" width="40%" height={40} sx={{ mb: 3 }} />
      
      {/* Form fields */}
      {Array.from({ length: fields }).map((_, index) => (
        <Box key={index} sx={{ mb: 3 }}>
          <Skeleton variant="text" width="30%" height={20} sx={{ mb: 1 }} />
          <Skeleton variant="rectangular" width="100%" height={56} sx={{ borderRadius: 1.5 }} />
        </Box>
      ))}
      
      {/* Submit button */}
      {withSubmit && (
        <Skeleton variant="rectangular" width="100%" height={48} sx={{ borderRadius: 1.5, mt: 2 }} />
      )}
    </Box>
  );

  if (withCard) {
    return (
      <Card>
        <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
          {formContent}
        </CardContent>
      </Card>
    );
  }

  return formContent;
};

export default SkeletonForm;

