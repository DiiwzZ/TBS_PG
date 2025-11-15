import { Box, Container, Paper } from '@mui/material';
import Navbar from '@/components/layout/Navbar';
import LoginForm from '@/components/auth/LoginForm';

export default function LoginPage() {
  return (
    <>
      <Navbar />
      <Container maxWidth="sm">
        <Box
          sx={{
            minHeight: 'calc(100vh - 64px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            py: { xs: 3, sm: 4 },
            px: { xs: 2, sm: 0 },
          }}
        >
          <Paper
            elevation={3}
            sx={{
              p: { xs: 3, sm: 4 },
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              border: '1px solid rgba(255, 167, 38, 0.2)',
            }}
          >
            <LoginForm />
          </Paper>
        </Box>
      </Container>
    </>
  );
}

