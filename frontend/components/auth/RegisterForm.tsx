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
  Grid,
} from '@mui/material';
import Link from 'next/link';
import { useAuthStore } from '@/lib/store/authStore';

// Validation schema
const registerSchema = z
  .object({
    username: z.string().min(3, 'Username must be at least 3 characters'),
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    confirmPassword: z.string(),
    fullName: z.string().min(2, 'Full name is required'),
    phoneNumber: z.string().min(10, 'Phone number must be at least 10 digits'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

type RegisterFormData = z.infer<typeof registerSchema>;

export default function RegisterForm() {
  const router = useRouter();
  const { register: registerUser, isLoading, error, clearError } = useAuthStore();
  const [localError, setLocalError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    try {
      setLocalError(null);
      clearError();
      
      const { confirmPassword, ...registerData } = data;
      await registerUser(registerData);
      router.push('/dashboard');
    } catch (err: any) {
      setLocalError(err.response?.data?.message || 'Registration failed. Please try again.');
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{ width: '100%', maxWidth: 500 }}
    >
      <Typography variant="h4" component="h1" gutterBottom align="center" sx={{ mb: 3 }}>
        Register
      </Typography>

      {(localError || error) && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {localError || error}
        </Alert>
      )}

      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            {...register('username')}
            label="Username"
            fullWidth
            error={!!errors.username}
            helperText={errors.username?.message}
            disabled={isLoading}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            {...register('email')}
            label="Email"
            type="email"
            fullWidth
            error={!!errors.email}
            helperText={errors.email?.message}
            disabled={isLoading}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            {...register('fullName')}
            label="Full Name"
            fullWidth
            error={!!errors.fullName}
            helperText={errors.fullName?.message}
            disabled={isLoading}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            {...register('phoneNumber')}
            label="Phone Number"
            fullWidth
            error={!!errors.phoneNumber}
            helperText={errors.phoneNumber?.message}
            disabled={isLoading}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            {...register('password')}
            label="Password"
            type="password"
            fullWidth
            error={!!errors.password}
            helperText={errors.password?.message}
            disabled={isLoading}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            {...register('confirmPassword')}
            label="Confirm Password"
            type="password"
            fullWidth
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword?.message}
            disabled={isLoading}
          />
        </Grid>
      </Grid>

      <Button
        type="submit"
        variant="contained"
        fullWidth
        size="large"
        disabled={isLoading}
        sx={{ mt: 3, mb: 2 }}
      >
        {isLoading ? <CircularProgress size={24} /> : 'Register'}
      </Button>

      <Box sx={{ textAlign: 'center' }}>
        <Typography variant="body2">
          Already have an account?{' '}
          <MuiLink component={Link} href="/login" underline="hover">
            Login here
          </MuiLink>
        </Typography>
      </Box>
    </Box>
  );
}

