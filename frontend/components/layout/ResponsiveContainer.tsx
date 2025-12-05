'use client';

import React from 'react';
import { Container, ContainerProps, Box, useTheme, useMediaQuery } from '@mui/material';

interface ResponsiveContainerProps extends ContainerProps {
  children: React.ReactNode;
  withBottomNav?: boolean;
  noPadding?: boolean;
}

const ResponsiveContainer: React.FC<ResponsiveContainerProps> = ({
  children,
  withBottomNav = false,
  noPadding = false,
  maxWidth = 'lg',
  ...props
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Container
      maxWidth={maxWidth}
      sx={{
        px: noPadding ? 0 : { xs: 2, sm: 3, md: 4 },
        py: noPadding ? 0 : { xs: 2, sm: 3, md: 4 },
        pb: withBottomNav && isMobile ? 'calc(64px + env(safe-area-inset-bottom, 0px) + 16px)' : undefined,
        ...props.sx,
      }}
      {...props}
    >
      <Box
        sx={{
          paddingTop: 'env(safe-area-inset-top, 0px)',
          paddingLeft: 'env(safe-area-inset-left, 0px)',
          paddingRight: 'env(safe-area-inset-right, 0px)',
        }}
      >
        {children}
      </Box>
    </Container>
  );
};

export default ResponsiveContainer;

