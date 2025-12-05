import React from 'react';
import {
  FormControl,
  InputLabel,
  Select,
  SelectProps,
  MenuItem,
  FormHelperText,
  Box,
  useTheme,
  alpha,
} from '@mui/material';

export interface SelectOption {
  value: string | number;
  label: string;
  disabled?: boolean;
}

interface SelectFieldProps extends Omit<SelectProps, 'variant'> {
  label: string;
  options: SelectOption[];
  helperText?: string;
  success?: boolean;
}

const SelectField = React.forwardRef<HTMLDivElement, SelectFieldProps>(
  ({ label, options, error, helperText, success = false, ...props }, ref) => {
    const theme = useTheme();

    return (
      <Box sx={{ width: '100%', mb: 2 }}>
        <FormControl
          fullWidth
          error={error}
          ref={ref}
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: 3,
              transition: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1)',
              backgroundColor: alpha(theme.palette.background.paper, 0.5),
              ...(success &&
                !error && {
                  '& fieldset': {
                    borderColor: theme.palette.success.main,
                    borderWidth: '2px',
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
          }}
        >
          <InputLabel
            sx={{
              '&.Mui-focused': {
                color: success && !error ? theme.palette.success.main : undefined,
              },
            }}
          >
            {label}
          </InputLabel>
          <Select
            label={label}
            MenuProps={{
              PaperProps: {
                sx: {
                  mt: 1,
                  maxHeight: 300,
                  borderRadius: 2,
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
                  '& .MuiMenuItem-root': {
                    borderRadius: 1.5,
                    mx: 1,
                    my: 0.5,
                    transition: 'all 200ms cubic-bezier(0.4, 0, 0.2, 1)',
                    '&:hover': {
                      backgroundColor: alpha(theme.palette.primary.main, 0.1),
                    },
                    '&.Mui-selected': {
                      backgroundColor: alpha(theme.palette.primary.main, 0.15),
                      '&:hover': {
                        backgroundColor: alpha(theme.palette.primary.main, 0.2),
                      },
                    },
                  },
                },
              },
            }}
            {...props}
          >
            {options.map((option) => (
              <MenuItem
                key={option.value}
                value={option.value}
                disabled={option.disabled}
              >
                {option.label}
              </MenuItem>
            ))}
          </Select>
          {helperText && (
            <FormHelperText
              sx={{
                color: success && !error ? theme.palette.success.main : undefined,
                mx: 1.5,
                mt: 0.5,
              }}
            >
              {helperText}
            </FormHelperText>
          )}
        </FormControl>
      </Box>
    );
  }
);

SelectField.displayName = 'SelectField';

export default SelectField;

