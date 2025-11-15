'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Box,
  Button,
  TextField,
  Typography,
  Alert,
  Link as MuiLink,
  CircularProgress,
} from '@mui/material';
import Link from 'next/link';
import { useAuthStore } from '@/lib/store/authStore';

// Validation schema
const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginForm() {
  const router = useRouter();
  const { login, isLoading, error, clearError } = useAuthStore();
  const [localError, setLocalError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      setLocalError(null);
      clearError();
      await login(data);
      router.push('/dashboard');
    } catch (err: any) {
      setLocalError(err.response?.data?.message || 'Login failed. Please check your credentials.');
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{ width: '100%', maxWidth: 400 }}
    >
      <Typography variant="h4" component="h1" gutterBottom align="center" sx={{ mb: 3 }}>
        Login
      </Typography>

      {(localError || error) && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {localError || error}
        </Alert>
      )}

      <TextField
        {...register('email')}
        label="Email"
        type="email"
        fullWidth
        margin="normal"
        error={!!errors.email}
        helperText={errors.email?.message}
        disabled={isLoading}
      />

      <TextField
        {...register('password')}
        label="Password"
        type="password"
        fullWidth
        margin="normal"
        error={!!errors.password}
        helperText={errors.password?.message}
        disabled={isLoading}
      />

      <Button
        type="submit"
        variant="contained"
        fullWidth
        size="large"
        disabled={isLoading}
        sx={{ mt: 3, mb: 2 }}
      >
        {isLoading ? <CircularProgress size={24} /> : 'Login'}
      </Button>

      <Box sx={{ textAlign: 'center' }}>
        <Typography variant="body2">
          Don&apos;t have an account?{' '}
          <MuiLink component={Link} href="/register" underline="hover">
            Register here
          </MuiLink>
        </Typography>
      </Box>
    </Box>
  );
}

