import { Box, Container, Paper } from '@mui/material';
import Navbar from '@/components/layout/Navbar';
import RegisterForm from '@/components/auth/RegisterForm';

export default function RegisterPage() {
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
            py: 4,
          }}
        >
          <Paper
            elevation={3}
            sx={{
              p: 4,
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <RegisterForm />
          </Paper>
        </Box>
      </Container>
    </>
  );
}

