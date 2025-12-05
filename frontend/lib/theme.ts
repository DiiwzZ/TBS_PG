import { createTheme, alpha } from '@mui/material/styles';

// Premium Color Palette
const colors = {
  gold: {
    50: '#FFF9E6',
    100: '#FFEFC2',
    200: '#F4E5B8',
    300: '#E8D89F',
    400: '#D4AF37', // Primary gold
    500: '#C09E2F',
    600: '#A68828',
    700: '#8C7220',
    800: '#725C1A',
    900: '#584614',
  },
  burgundy: {
    50: '#FFE6E9',
    100: '#FFBDC4',
    200: '#FF949E',
    300: '#E56B78',
    400: '#CC4258',
    500: '#B71C38',
    600: '#A0153E',
    700: '#800020', // Deep burgundy
    800: '#660019',
    900: '#4D0013',
  },
  dark: {
    900: '#0A0A0A', // Deepest black
    800: '#121212', // Background
    700: '#1A1A1A', // Surface
    600: '#242424', // Elevated surface
    500: '#2E2E2E',
    400: '#383838',
    300: '#525252',
    200: '#6B6B6B',
    100: '#858585',
  },
};

// Animation tokens
export const animations = {
  duration: {
    fastest: 100,
    fast: 200,
    normal: 300,
    slow: 400,
    slowest: 500,
  },
  easing: {
    easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    easeOut: 'cubic-bezier(0.0, 0, 0.2, 1)',
    easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
    sharp: 'cubic-bezier(0.4, 0, 0.6, 1)',
    spring: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
  },
};

// Spacing scale (8px-based)
export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  '2xl': 48,
  '3xl': 64,
  '4xl': 96,
};

// Shadow system
export const shadows = {
  sm: '0 1px 2px rgba(0,0,0,0.05)',
  md: '0 4px 6px rgba(0,0,0,0.1)',
  lg: '0 10px 15px rgba(0,0,0,0.15)',
  xl: '0 20px 25px rgba(0,0,0,0.2)',
  premium: '0 8px 32px rgba(212,175,55,0.15)',
  glow: '0 0 20px rgba(212,175,55,0.3)',
};

// Create premium theme
export const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: colors.gold[400], // #D4AF37
      light: colors.gold[200],
      dark: colors.gold[700],
      contrastText: '#0A0A0A',
    },
    secondary: {
      main: colors.burgundy[700], // #800020
      light: colors.burgundy[400],
      dark: colors.burgundy[900],
      contrastText: '#FFFFFF',
    },
    background: {
      default: colors.dark[900], // #0A0A0A
      paper: colors.dark[700], // #1A1A1A
    },
    text: {
      primary: '#FFFFFF',
      secondary: 'rgba(255, 255, 255, 0.7)',
      disabled: 'rgba(255, 255, 255, 0.5)',
    },
    success: {
      main: '#10B981',
      light: '#34D399',
      dark: '#059669',
    },
    error: {
      main: '#EF4444',
      light: '#F87171',
      dark: '#DC2626',
    },
    warning: {
      main: '#F59E0B',
      light: '#FBBF24',
      dark: '#D97706',
    },
    info: {
      main: '#3B82F6',
      light: '#60A5FA',
      dark: '#2563EB',
    },
    divider: 'rgba(255, 255, 255, 0.12)',
  },
  
  typography: {
    fontFamily: [
      'Inter',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
    ].join(','),
    
    h1: {
      fontFamily: '"Playfair Display", "Cormorant Garamond", Georgia, serif',
      fontSize: 'clamp(2.5rem, 5vw, 4rem)', // 40-64px
      fontWeight: 700,
      lineHeight: 1.2,
      letterSpacing: '-0.02em',
    },
    h2: {
      fontFamily: '"Playfair Display", "Cormorant Garamond", Georgia, serif',
      fontSize: 'clamp(2rem, 4vw, 3rem)', // 32-48px
      fontWeight: 700,
      lineHeight: 1.3,
      letterSpacing: '-0.01em',
    },
    h3: {
      fontFamily: '"Playfair Display", "Cormorant Garamond", Georgia, serif',
      fontSize: 'clamp(1.5rem, 3vw, 2.5rem)', // 24-40px
      fontWeight: 600,
      lineHeight: 1.3,
    },
    h4: {
      fontSize: 'clamp(1.25rem, 2.5vw, 2rem)', // 20-32px
      fontWeight: 600,
      lineHeight: 1.4,
    },
    h5: {
      fontSize: 'clamp(1.125rem, 2vw, 1.5rem)', // 18-24px
      fontWeight: 600,
      lineHeight: 1.4,
    },
    h6: {
      fontSize: 'clamp(1rem, 1.5vw, 1.25rem)', // 16-20px
      fontWeight: 600,
      lineHeight: 1.4,
    },
    body1: {
      fontSize: '1rem', // 16px
      lineHeight: 1.6,
      letterSpacing: '0.00938em',
    },
    body2: {
      fontSize: '0.875rem', // 14px
      lineHeight: 1.57,
      letterSpacing: '0.01071em',
    },
    caption: {
      fontSize: '0.75rem', // 12px
      lineHeight: 1.5,
      letterSpacing: '0.03333em',
    },
    button: {
      fontSize: '0.9375rem', // 15px
      fontWeight: 600,
      letterSpacing: '0.02857em',
      textTransform: 'none',
    },
  },
  
  spacing: 8, // 8px base unit
  
  shape: {
    borderRadius: 12, // Default border radius
  },
  
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
  
  shadows: [
    'none',
    '0 1px 2px rgba(0,0,0,0.05)', // 1
    '0 2px 4px rgba(0,0,0,0.08)', // 2
    '0 4px 6px rgba(0,0,0,0.1)', // 3
    '0 6px 10px rgba(0,0,0,0.12)', // 4
    '0 10px 15px rgba(0,0,0,0.15)', // 5
    '0 12px 20px rgba(0,0,0,0.18)', // 6
    '0 16px 24px rgba(0,0,0,0.2)', // 7
    '0 20px 25px rgba(0,0,0,0.2)', // 8 - xl
    '0 8px 32px rgba(212,175,55,0.15)', // 9 - premium
    '0 0 20px rgba(212,175,55,0.3)', // 10 - glow
    '0 24px 48px rgba(0,0,0,0.25)', // 11
    '0 32px 64px rgba(0,0,0,0.3)', // 12
    '0 40px 80px rgba(0,0,0,0.35)', // 13
    '0 48px 96px rgba(0,0,0,0.4)', // 14
    '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)', // 15
    '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)', // 16
    '0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)', // 17
    '0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)', // 18
    '0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22)', // 19
    '0 24px 48px rgba(0,0,0,0.35), 0 20px 15px rgba(0,0,0,0.25)', // 20
    '0 32px 64px rgba(0,0,0,0.40), 0 24px 18px rgba(0,0,0,0.28)', // 21
    '0 40px 80px rgba(0,0,0,0.45), 0 28px 20px rgba(0,0,0,0.30)', // 22
    '0 48px 96px rgba(0,0,0,0.50), 0 32px 24px rgba(0,0,0,0.32)', // 23
    '0 56px 112px rgba(0,0,0,0.55), 0 36px 28px rgba(0,0,0,0.34)', // 24
  ],
  
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        html: {
          scrollBehavior: 'smooth',
        },
        body: {
          backgroundColor: colors.dark[900],
          backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(212,175,55,0.03) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(128,0,32,0.03) 0%, transparent 50%)',
          backgroundAttachment: 'fixed',
        },
        '*': {
          scrollbarWidth: 'thin',
          scrollbarColor: `${colors.gold[400]} ${colors.dark[700]}`,
        },
        '*::-webkit-scrollbar': {
          width: '8px',
          height: '8px',
        },
        '*::-webkit-scrollbar-track': {
          background: colors.dark[700],
        },
        '*::-webkit-scrollbar-thumb': {
          background: colors.gold[400],
          borderRadius: '4px',
          '&:hover': {
            background: colors.gold[300],
          },
        },
      },
    },
    
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 600,
          borderRadius: 12,
          padding: '10px 24px',
          fontSize: '0.9375rem',
          transition: `all ${animations.duration.normal}ms ${animations.easing.easeInOut}`,
          '&:active': {
            transform: 'scale(0.98)',
          },
        },
        contained: {
          boxShadow: shadows.premium,
          '&:hover': {
            boxShadow: shadows.glow,
            transform: 'translateY(-2px)',
          },
        },
        outlined: {
          borderWidth: '2px',
          '&:hover': {
            borderWidth: '2px',
            backgroundColor: alpha(colors.gold[400], 0.08),
          },
        },
        sizeLarge: {
          padding: '14px 32px',
          fontSize: '1rem',
        },
        sizeSmall: {
          padding: '6px 16px',
          fontSize: '0.875rem',
        },
      },
    },
    
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
          backgroundImage: `linear-gradient(${alpha('#FFFFFF', 0.03)}, ${alpha('#FFFFFF', 0.03)})`,
          backdropFilter: 'blur(10px)',
          border: `1px solid ${alpha(colors.gold[400], 0.1)}`,
          transition: `all ${animations.duration.normal}ms ${animations.easing.easeInOut}`,
          overflow: 'hidden',
        },
      },
    },
    
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
        elevation1: {
          boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
        },
        elevation2: {
          boxShadow: '0 4px 16px rgba(0,0,0,0.2)',
        },
        elevation3: {
          boxShadow: '0 8px 24px rgba(0,0,0,0.25)',
        },
      },
    },
    
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          backgroundColor: alpha(colors.dark[800], 0.8),
          backdropFilter: 'blur(20px) saturate(180%)',
          borderBottom: `1px solid ${alpha(colors.gold[400], 0.1)}`,
          boxShadow: '0 4px 24px rgba(0,0,0,0.2)',
        },
      },
    },
    
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 12,
            transition: `all ${animations.duration.normal}ms ${animations.easing.easeInOut}`,
            backgroundColor: alpha(colors.dark[600], 0.5),
            '& fieldset': {
              borderColor: alpha(colors.gold[400], 0.2),
              borderWidth: '2px',
            },
            '&:hover fieldset': {
              borderColor: alpha(colors.gold[400], 0.4),
            },
            '&.Mui-focused fieldset': {
              borderColor: colors.gold[400],
              borderWidth: '2px',
              boxShadow: `0 0 0 4px ${alpha(colors.gold[400], 0.1)}`,
            },
            '&.Mui-error fieldset': {
              borderColor: '#EF4444',
            },
          },
          '& .MuiInputLabel-root': {
            fontSize: '0.9375rem',
            '&.Mui-focused': {
              color: colors.gold[400],
            },
          },
        },
      },
    },
    
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          fontWeight: 600,
          fontSize: '0.8125rem',
        },
        filled: {
          border: '1px solid',
        },
      },
    },
    
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: 20,
          padding: '8px',
          backgroundImage: `linear-gradient(${alpha('#FFFFFF', 0.05)}, ${alpha('#FFFFFF', 0.05)})`,
          border: `1px solid ${alpha(colors.gold[400], 0.2)}`,
        },
      },
    },
    
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundImage: `linear-gradient(${alpha('#FFFFFF', 0.03)}, ${alpha('#FFFFFF', 0.03)})`,
          backdropFilter: 'blur(20px)',
          borderRight: `1px solid ${alpha(colors.gold[400], 0.1)}`,
        },
      },
    },
    
    MuiStepper: {
      styleOverrides: {
        root: {
          padding: '24px 0',
        },
      },
    },
    
    MuiStepLabel: {
      styleOverrides: {
        label: {
          fontSize: '0.875rem',
          fontWeight: 500,
          '&.Mui-active': {
            fontWeight: 600,
            color: colors.gold[400],
          },
          '&.Mui-completed': {
            fontWeight: 500,
          },
        },
      },
    },
    
    MuiStepIcon: {
      styleOverrides: {
        root: {
          '&.Mui-active': {
            color: colors.gold[400],
          },
          '&.Mui-completed': {
            color: '#10B981',
          },
        },
      },
    },
    
    MuiAlert: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          fontSize: '0.9375rem',
        },
        standardSuccess: {
          backgroundColor: alpha('#10B981', 0.15),
          border: `1px solid ${alpha('#10B981', 0.3)}`,
        },
        standardError: {
          backgroundColor: alpha('#EF4444', 0.15),
          border: `1px solid ${alpha('#EF4444', 0.3)}`,
        },
        standardWarning: {
          backgroundColor: alpha('#F59E0B', 0.15),
          border: `1px solid ${alpha('#F59E0B', 0.3)}`,
        },
        standardInfo: {
          backgroundColor: alpha('#3B82F6', 0.15),
          border: `1px solid ${alpha('#3B82F6', 0.3)}`,
        },
      },
    },
    
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          backgroundColor: alpha(colors.dark[600], 0.95),
          backdropFilter: 'blur(10px)',
          fontSize: '0.8125rem',
          padding: '8px 12px',
          borderRadius: 8,
          border: `1px solid ${alpha(colors.gold[400], 0.2)}`,
        },
      },
    },
    
    MuiMenu: {
      styleOverrides: {
        paper: {
          borderRadius: 12,
          marginTop: '8px',
          backgroundImage: `linear-gradient(${alpha('#FFFFFF', 0.05)}, ${alpha('#FFFFFF', 0.05)})`,
          backdropFilter: 'blur(20px)',
          border: `1px solid ${alpha(colors.gold[400], 0.2)}`,
        },
      },
    },
    
    MuiMenuItem: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          margin: '4px 8px',
          '&:hover': {
            backgroundColor: alpha(colors.gold[400], 0.1),
          },
          '&.Mui-selected': {
            backgroundColor: alpha(colors.gold[400], 0.15),
            '&:hover': {
              backgroundColor: alpha(colors.gold[400], 0.2),
            },
          },
        },
      },
    },
    
    MuiListItemButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          '&:hover': {
            backgroundColor: alpha(colors.gold[400], 0.08),
          },
          '&.Mui-selected': {
            backgroundColor: alpha(colors.gold[400], 0.15),
            '&:hover': {
              backgroundColor: alpha(colors.gold[400], 0.2),
            },
          },
        },
      },
    },
    
    MuiTab: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 600,
          fontSize: '0.9375rem',
          minHeight: 48,
          '&.Mui-selected': {
            color: colors.gold[400],
          },
        },
      },
    },
    
    MuiToggleButton: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          textTransform: 'none',
          fontWeight: 500,
          '&.Mui-selected': {
            backgroundColor: alpha(colors.gold[400], 0.2),
            color: colors.gold[300],
            '&:hover': {
              backgroundColor: alpha(colors.gold[400], 0.25),
            },
          },
        },
      },
    },
    
    MuiIconButton: {
      styleOverrides: {
        root: {
          transition: `all ${animations.duration.fast}ms ${animations.easing.easeInOut}`,
          '&:hover': {
            transform: 'scale(1.1)',
          },
          '&:active': {
            transform: 'scale(0.95)',
          },
        },
      },
    },
    
    MuiFab: {
      styleOverrides: {
        root: {
          boxShadow: shadows.premium,
          '&:hover': {
            boxShadow: shadows.glow,
          },
        },
      },
    },
    
    MuiLinearProgress: {
      styleOverrides: {
        root: {
          borderRadius: 4,
          height: 6,
        },
      },
    },
    
    MuiCircularProgress: {
      styleOverrides: {
        root: {
          color: colors.gold[400],
        },
      },
    },
    
    MuiSkeleton: {
      styleOverrides: {
        root: {
          backgroundColor: alpha(colors.dark[600], 0.5),
          '&::after': {
            background: `linear-gradient(90deg, transparent, ${alpha(colors.gold[400], 0.1)}, transparent)`,
          },
        },
      },
    },
  },
});

// Export colors and tokens for use in styled components
export { colors };

export default theme;
