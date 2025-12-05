import React from 'react';
import { TextField, TextFieldProps, useTheme, alpha } from '@mui/material';

interface DatePickerProps extends Omit<TextFieldProps, 'type' | 'variant'> {
  label: string;
  minDate?: string;
  maxDate?: string;
}

const DatePicker = React.forwardRef<HTMLDivElement, DatePickerProps>(
  ({ label, minDate, maxDate, ...props }, ref) => {
    const theme = useTheme();

    return (
      <TextField
        ref={ref}
        fullWidth
        type="date"
        label={label}
        InputLabelProps={{
          shrink: true,
        }}
        inputProps={{
          min: minDate,
          max: maxDate,
        }}
        sx={{
          mb: 2,
          '& .MuiOutlinedInput-root': {
            borderRadius: 3,
            transition: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1)',
            backgroundColor: alpha(theme.palette.background.paper, 0.5),
            '& fieldset': {
              borderColor: alpha(theme.palette.primary.main, 0.2),
              borderWidth: '2px',
            },
            '&:hover fieldset': {
              borderColor: alpha(theme.palette.primary.main, 0.4),
            },
            '&.Mui-focused fieldset': {
              borderColor: theme.palette.primary.main,
              borderWidth: '2px',
              boxShadow: `0 0 0 4px ${alpha(theme.palette.primary.main, 0.1)}`,
            },
          },
          '& .MuiInputLabel-root': {
            fontSize: '0.9375rem',
            '&.Mui-focused': {
              color: theme.palette.primary.main,
            },
          },
          '& input[type="date"]': {
            fontFamily: theme.typography.fontFamily,
            fontSize: '1rem',
            colorScheme: 'dark',
            '&::-webkit-calendar-picker-indicator': {
              filter: 'invert(0.7) sepia(1) saturate(5) hue-rotate(15deg)',
              cursor: 'pointer',
              '&:hover': {
                filter: 'invert(0.8) sepia(1) saturate(5) hue-rotate(15deg)',
              },
            },
          },
        }}
        {...props}
      />
    );
  }
);

DatePicker.displayName = 'DatePicker';

export default DatePicker;

