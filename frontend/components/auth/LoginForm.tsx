'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Box,
  Button,
  Typography,
  Alert,
  Link as MuiLink,
  CircularProgress,
  Card,
  CardContent,
  useTheme,
  alpha,
} from '@mui/material';
import { Login as LoginIcon } from '@mui/icons-material';
import Link from 'next/link';
import { useAuthStore } from '@/lib/store/authStore';
import InputField from '@/components/form/InputField';
import { toast } from '@/lib/toast';

// Validation schema
const loginSchema = z.object({
  email: z.string().email('กรุณากรอกอีเมลให้ถูกต้อง'),
  password: z.string().min(1, 'กรุณากรอกรหัสผ่าน'),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginForm() {
  const router = useRouter();
  const theme = useTheme();
  const { login, isLoading } = useAuthStore();
  const [localError, setLocalError] = useState<string | null>(null);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      setLocalError(null);
      await login(data);
      toast.success('เข้าสู่ระบบสำเร็จ!');
      router.push('/dashboard');
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'เข้าสู่ระบบไม่สำเร็จ กรุณาตรวจสอบข้อมูลของคุณ';
      setLocalError(errorMessage);
      toast.error(errorMessage);
    }
  };

  return (
    <Card
      sx={{
        width: '100%',
        maxWidth: 440,
        mx: 'auto',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
      }}
      className="fade-in"
    >
      <CardContent sx={{ p: { xs: 3, sm: 4 } }}>
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Box
            sx={{
              display: 'inline-flex',
              p: 2,
              borderRadius: '50%',
              backgroundColor: alpha(theme.palette.primary.main, 0.1),
              mb: 2,
            }}
          >
            <LoginIcon
              sx={{
                fontSize: { xs: 32, sm: 40, md: 48 },
                color: theme.palette.primary.main,
              }}
            />
          </Box>
          <Typography
            variant="h4"
            component="h1"
            sx={{
              fontFamily: '"Playfair Display", Georgia, serif',
              fontWeight: 700,
              mb: 1,
              fontSize: { xs: '1.5rem', sm: '2rem', md: '2.125rem' },
            }}
          >
            เข้าสู่ระบบ
          </Typography>
          <Typography 
            variant="body2" 
            color="text.secondary"
            sx={{ fontSize: { xs: '0.875rem', sm: '0.9375rem' } }}
          >
            ยินดีต้อนรับกลับมา! กรุณาเข้าสู่ระบบเพื่อจองโต๊ะ
          </Typography>
        </Box>

        {localError && (
          <Alert
            severity="error"
            sx={{
              mb: 3,
              borderRadius: 2,
              '& .MuiAlert-message': {
                fontSize: '0.9375rem',
              },
            }}
            onClose={() => setLocalError(null)}
          >
            {localError}
          </Alert>
        )}

        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          sx={{ width: '100%' }}
        >
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <InputField
                {...field}
                label="อีเมล"
                type="email"
                placeholder="example@email.com"
                error={!!errors.email}
                helperText={errors.email?.message}
                disabled={isLoading}
                autoComplete="email"
                autoFocus
              />
            )}
          />

          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <InputField
                {...field}
                label="รหัสผ่าน"
                type="password"
                placeholder="••••••••"
                error={!!errors.password}
                helperText={errors.password?.message}
                disabled={isLoading}
                autoComplete="current-password"
              />
            )}
          />

          <Button
            type="submit"
            variant="contained"
            fullWidth
            size="large"
            disabled={isLoading}
            sx={{
              mt: 1,
              mb: 2,
              py: 1.5,
              fontSize: '1rem',
              fontWeight: 600,
              position: 'relative',
            }}
          >
            {isLoading ? (
              <CircularProgress size={24} sx={{ color: 'inherit' }} />
            ) : (
              'เข้าสู่ระบบ'
            )}
          </Button>

          <Box sx={{ textAlign: 'center', mt: 3 }}>
            <Typography variant="body2" color="text.secondary">
              ยังไม่มีบัญชี?{' '}
              <MuiLink
                component={Link}
                href="/register"
                sx={{
                  color: theme.palette.primary.main,
                  textDecoration: 'none',
                  fontWeight: 600,
                  '&:hover': {
                    textDecoration: 'underline',
                  },
                }}
              >
                สมัครสมาชิก
              </MuiLink>
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}
