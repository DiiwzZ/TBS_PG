import React from 'react';
import { TextFieldProps } from '@mui/material';
import InputField from './InputField';

interface PhoneInputProps extends Omit<TextFieldProps, 'type' | 'variant'> {
  label?: string;
}

const PhoneInput = React.forwardRef<HTMLDivElement, PhoneInputProps>(
  ({ label = 'เบอร์โทรศัพท์', onChange, ...props }, ref) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      // Allow only numbers
      const value = e.target.value.replace(/\D/g, '');
      
      // Limit to 10 digits
      if (value.length <= 10) {
        e.target.value = value;
        if (onChange) {
          onChange(e);
        }
      }
    };

    return (
      <InputField
        ref={ref}
        label={label}
        type="tel"
        placeholder="0812345678"
        onChange={handleChange}
        showCharCount
        maxLength={10}
        inputProps={{
          inputMode: 'numeric',
          pattern: '[0-9]*',
        }}
        {...props}
      />
    );
  }
);

PhoneInput.displayName = 'PhoneInput';

export default PhoneInput;

