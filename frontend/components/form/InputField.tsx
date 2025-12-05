import React, { useState } from 'react';
import {
  TextField,
  TextFieldProps,
  Box,
  Typography,
  InputAdornment,
  IconButton,
  useTheme,
  alpha,
} from '@mui/material';
import {
  Visibility,
  VisibilityOff,
  CheckCircle as CheckIcon,
  Error as ErrorIcon,
} from '@mui/icons-material';

interface InputFieldProps extends Omit<TextFieldProps, 'variant'> {
  label: string;
  showCharCount?: boolean;
  maxLength?: number;
  success?: boolean;
  successMessage?: string;
}

const InputField = React.forwardRef<HTMLDivElement, InputFieldProps>(
  (
    {
      label,
      type = 'text',
      error,
      helperText,
      showCharCount = false,
      maxLength,
      success = false,
      successMessage,
      value,
      ...props
    },
    ref
  ) => {
    const theme = useTheme();
    const [showPassword, setShowPassword] = useState(false);
    const [isFocused, setIsFocused] = useState(false);

    const isPasswordType = type === 'password';
    const inputType = isPasswordType && showPassword ? 'text' : type;

    const charCount = typeof value === 'string' ? value.length : 0;

    return (
      <Box sx={{ width: '100%', mb: 2 }}>
        <TextField
          ref={ref}
          fullWidth
          type={inputType}
          label={label}
          value={value}
          error={error}
          variant="outlined"
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          inputProps={{
            maxLength: maxLength,
            ...props.inputProps,
          }}
          InputProps={{
            endAdornment: (
              <>
                {success && !error && (
                  <InputAdornment position="end">
                    <CheckIcon
                      sx={{
                        color: theme.palette.success.main,
                        fontSize: 20,
                      }}
                    />
                  </InputAdornment>
                )}
                {error && (
                  <InputAdornment position="end">
                    <ErrorIcon
                      sx={{
                        color: theme.palette.error.main,
                        fontSize: 20,
                      }}
                    />
                  </InputAdornment>
                )}
                {isPasswordType && (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                      size="small"
                      sx={{
                        color: isFocused
                          ? theme.palette.primary.main
                          : theme.palette.text.secondary,
                      }}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                )}
              </>
            ),
            ...props.InputProps,
          }}
          sx={{
            '& .MuiOutlinedInput-root': {
              transition: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1)',
              ...(success &&
                !error && {
                  '& fieldset': {
                    borderColor: theme.palette.success.main,
                  },
                  '&:hover fieldset': {
                    borderColor: theme.palette.success.light,
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: theme.palette.success.main,
                    boxShadow: `0 0 0 4px ${alpha(theme.palette.success.main, 0.1)}`,
                  },
                }),
            },
            ...props.sx,
          }}
          {...props}
        />
        
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            mt: 0.5,
            px: 1.5,
            minHeight: 20,
          }}
        >
          <Typography
            variant="caption"
            sx={{
              color: error
                ? theme.palette.error.main
                : success
                ? theme.palette.success.main
                : theme.palette.text.secondary,
              flex: 1,
            }}
          >
            {error ? helperText : success && successMessage ? successMessage : helperText || ' '}
          </Typography>
          
          {showCharCount && maxLength && (
            <Typography
              variant="caption"
              sx={{
                color: charCount === maxLength ? theme.palette.warning.main : theme.palette.text.secondary,
                fontWeight: 500,
                ml: 1,
              }}
            >
              {charCount}/{maxLength}
            </Typography>
          )}
        </Box>
      </Box>
    );
  }
);

InputField.displayName = 'InputField';

export default InputField;

