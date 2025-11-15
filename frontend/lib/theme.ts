import { createTheme } from '@mui/material/styles';

// Dark theme for bar/restaurant atmosphere
export const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#FFA726', // Amber/Gold - premium bar feel
      light: '#FFB74D',
      dark: '#F57C00',
      contrastText: '#000',
    },
    secondary: {
      main: '#B71C1C', // Deep red/burgundy - wine color
      light: '#C62828',
      dark: '#8E0000',
      contrastText: '#fff',
    },
    background: {
      default: '#121212', // Very dark background
      paper: '#1E1E1E', // Slightly lighter for cards
    },
    text: {
      primary: '#FFFFFF',
      secondary: 'rgba(255, 255, 255, 0.7)',
    },
  },
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
    ].join(','),
    h1: {
      fontSize: '2.5rem',
      fontWeight: 600,
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 600,
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 600,
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 600,
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 600,
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 600,
          borderRadius: 8,
        },
        contained: {
          boxShadow: '0 4px 12px rgba(255, 167, 38, 0.3)',
          '&:hover': {
            boxShadow: '0 6px 20px rgba(255, 167, 38, 0.4)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: '0 4px 20px rgba(0,0,0,0.5)',
          backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.05))',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundImage: 'linear-gradient(135deg, #1E1E1E 0%, #121212 100%)',
          boxShadow: '0 2px 10px rgba(0,0,0,0.3)',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            '&:hover fieldset': {
              borderColor: '#FFA726',
            },
          },
        },
      },
    },
  },
});

