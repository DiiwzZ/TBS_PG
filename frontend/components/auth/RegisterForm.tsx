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
import { PersonAdd as RegisterIcon } from '@mui/icons-material';
import Link from 'next/link';
import { useAuthStore } from '@/lib/store/authStore';
import InputField from '@/components/form/InputField';
import PhoneInput from '@/components/form/PhoneInput';
import { toast } from '@/lib/toast';

// Validation schema
const registerSchema = z.object({
  username: z
    .string()
    .min(3, 'ชื่อผู้ใช้ต้องมีอย่างน้อย 3 ตัวอักษร')
    .max(14, 'ชื่อผู้ใช้ต้องไม่เกิน 14 ตัวอักษร')
    .regex(/^[a-zA-Z0-9_]+$/, 'ชื่อผู้ใช้ต้องเป็นตัวอักษร ตัวเลข หรือ _ เท่านั้น'),
  email: z.string().email('กรุณากรอกอีเมลให้ถูกต้อง'),
  phoneNumber: z
    .string()
    .length(10, 'เบอร์โทรศัพท์ต้องมี 10 หลัก')
    .regex(/^[0-9]+$/, 'เบอร์โทรศัพท์ต้องเป็นตัวเลขเท่านั้น'),
  password: z.string().min(6, 'รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'รหัสผ่านไม่ตรงกัน',
  path: ['confirmPassword'],
});

type RegisterFormData = z.infer<typeof registerSchema>;

export default function RegisterForm() {
  const router = useRouter();
  const theme = useTheme();
  const { register: registerUser, isLoading } = useAuthStore();
  const [localError, setLocalError] = useState<string | null>(null);

  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: '',
      email: '',
      phoneNumber: '',
      password: '',
      confirmPassword: '',
    },
  });

  const password = watch('password');

  const onSubmit = async (data: RegisterFormData) => {
    try {
      setLocalError(null);
      
      const { confirmPassword, ...registerData } = data;
      
      await registerUser({
        ...registerData,
        fullName: data.username,
      });
      
      toast.success('สมัครสมาชิกสำเร็จ! ยินดีต้อนรับ');
      router.push('/dashboard');
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'สมัครสมาชิกไม่สำเร็จ กรุณาลองใหม่อีกครั้ง';
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
            <RegisterIcon
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
            สมัครสมาชิก
          </Typography>
          <Typography 
            variant="body2" 
            color="text.secondary"
            sx={{ fontSize: { xs: '0.875rem', sm: '0.9375rem' } }}
          >
            สร้างบัญชีเพื่อเริ่มจองโต๊ะที่บาร์
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
            name="username"
            control={control}
            render={({ field }) => (
              <InputField
                {...field}
                label="ชื่อผู้ใช้"
                placeholder="username123"
                error={!!errors.username}
                helperText={errors.username?.message || 'ใช้ตัวอักษร ตัวเลข หรือ _ เท่านั้น (3-14 ตัวอักษร)'}
                disabled={isLoading}
                showCharCount
                maxLength={14}
                autoComplete="username"
                autoFocus
                onChange={(e) => {
                  // Filter out special characters except underscore
                  const value = e.target.value.replace(/[^a-zA-Z0-9_]/g, '');
                  field.onChange(value);
                }}
              />
            )}
          />

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
              />
            )}
          />

          <Controller
            name="phoneNumber"
            control={control}
            render={({ field }) => (
              <PhoneInput
                {...field}
                error={!!errors.phoneNumber}
                helperText={errors.phoneNumber?.message || 'กรอกเบอร์โทรศัพท์ 10 หลัก'}
                disabled={isLoading}
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
                helperText={errors.password?.message || 'อย่างน้อย 6 ตัวอักษร'}
                disabled={isLoading}
                autoComplete="new-password"
              />
            )}
          />

          <Controller
            name="confirmPassword"
            control={control}
            render={({ field }) => (
              <InputField
                {...field}
                label="ยืนยันรหัสผ่าน"
                type="password"
                placeholder="••••••••"
                error={!!errors.confirmPassword}
                helperText={errors.confirmPassword?.message}
                success={password && field.value === password && field.value.length >= 6}
                successMessage="รหัสผ่านตรงกัน"
                disabled={isLoading}
                autoComplete="new-password"
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
              'สมัครสมาชิก'
            )}
          </Button>

          <Box sx={{ textAlign: 'center', mt: 3 }}>
            <Typography variant="body2" color="text.secondary">
              มีบัญชีอยู่แล้ว?{' '}
              <MuiLink
                component={Link}
                href="/login"
                sx={{
                  color: theme.palette.primary.main,
                  textDecoration: 'none',
                  fontWeight: 600,
                  '&:hover': {
                    textDecoration: 'underline',
                  },
                }}
              >
                เข้าสู่ระบบ
              </MuiLink>
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}
