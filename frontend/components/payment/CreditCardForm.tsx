'use client';

import { useState } from 'react';
import {
  Box,
  TextField,
  Grid,
  Typography,
  Alert,
} from '@mui/material';
import { CreditCard, Security } from '@mui/icons-material';

interface CreditCardFormProps {
  onValidate: (isValid: boolean) => void;
}

export default function CreditCardForm({ onValidate }: CreditCardFormProps) {
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Format card number with spaces
  const formatCardNumber = (value: string) => {
    const cleaned = value.replace(/\s/g, '').replace(/\D/g, '');
    const formatted = cleaned.match(/.{1,4}/g)?.join(' ') || cleaned;
    return formatted.slice(0, 19); // 16 digits + 3 spaces
  };

  // Format expiry date as MM/YY
  const formatExpiryDate = (value: string) => {
    const cleaned = value.replace(/\D/g, '');
    if (cleaned.length >= 2) {
      return `${cleaned.slice(0, 2)}/${cleaned.slice(2, 4)}`;
    }
    return cleaned;
  };

  // Luhn algorithm for card validation (simplified)
  const validateCardNumber = (number: string): boolean => {
    const cleaned = number.replace(/\s/g, '');
    if (cleaned.length !== 16) return false;
    
    let sum = 0;
    let isEven = false;
    
    for (let i = cleaned.length - 1; i >= 0; i--) {
      let digit = parseInt(cleaned[i]);
      
      if (isEven) {
        digit *= 2;
        if (digit > 9) {
          digit -= 9;
        }
      }
      
      sum += digit;
      isEven = !isEven;
    }
    
    return sum % 10 === 0;
  };

  const validateExpiry = (expiry: string): boolean => {
    if (expiry.length !== 5) return false;
    
    const [month, year] = expiry.split('/');
    const monthNum = parseInt(month);
    const yearNum = parseInt(`20${year}`);
    
    if (monthNum < 1 || monthNum > 12) return false;
    
    const now = new Date();
    const expiryDate = new Date(yearNum, monthNum - 1);
    
    return expiryDate > now;
  };

  const validateCVV = (cvv: string): boolean => {
    return cvv.length === 3 && /^\d{3}$/.test(cvv);
  };

  const handleCardNumberChange = (value: string) => {
    const formatted = formatCardNumber(value);
    setCardNumber(formatted);
    
    if (formatted.replace(/\s/g, '').length === 16) {
      if (!validateCardNumber(formatted)) {
        setErrors((prev) => ({ ...prev, cardNumber: 'หมายเลขบัตรไม่ถูกต้อง' }));
        onValidate(false);
      } else {
        setErrors((prev) => ({ ...prev, cardNumber: '' }));
        checkAllValid(formatted, cardName, expiryDate, cvv);
      }
    } else {
      onValidate(false);
    }
  };

  const handleExpiryChange = (value: string) => {
    const formatted = formatExpiryDate(value);
    setExpiryDate(formatted);
    
    if (formatted.length === 5) {
      if (!validateExpiry(formatted)) {
        setErrors((prev) => ({ ...prev, expiry: 'วันหมดอายุไม่ถูกต้อง' }));
        onValidate(false);
      } else {
        setErrors((prev) => ({ ...prev, expiry: '' }));
        checkAllValid(cardNumber, cardName, formatted, cvv);
      }
    } else {
      onValidate(false);
    }
  };

  const handleCVVChange = (value: string) => {
    const cleaned = value.replace(/\D/g, '').slice(0, 3);
    setCvv(cleaned);
    
    if (cleaned.length === 3) {
      if (!validateCVV(cleaned)) {
        setErrors((prev) => ({ ...prev, cvv: 'CVV ไม่ถูกต้อง' }));
        onValidate(false);
      } else {
        setErrors((prev) => ({ ...prev, cvv: '' }));
        checkAllValid(cardNumber, cardName, expiryDate, cleaned);
      }
    } else {
      onValidate(false);
    }
  };

  const checkAllValid = (card: string, name: string, expiry: string, cvvVal: string) => {
    const isValid =
      validateCardNumber(card) &&
      name.length > 0 &&
      validateExpiry(expiry) &&
      validateCVV(cvvVal);
    onValidate(isValid);
  };

  return (
    <Box>
      <Typography 
        variant="h6" 
        gutterBottom 
        color="primary" 
        sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: 1,
          fontSize: { xs: '1rem', sm: '1.125rem', md: '1.25rem' },
        }}
      >
        <CreditCard />
        ข้อมูลบัตร
      </Typography>

      <Alert severity="info" sx={{ mb: 3 }}>
        🔒 นี่เป็นระบบทดสอบ - กรุณาใช้ข้อมูลบัตรทดสอบเท่านั้น
      </Alert>

      <Grid container spacing={{ xs: 2, sm: 3 }}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="หมายเลขบัตร"
            value={cardNumber}
            onChange={(e) => handleCardNumberChange(e.target.value)}
            placeholder="1234 5678 9012 3456"
            error={!!errors.cardNumber}
            helperText={errors.cardNumber || '16 หลัก'}
            InputProps={{
              startAdornment: <CreditCard sx={{ mr: 1, color: 'action.active' }} />,
            }}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            fullWidth
            label="ชื่อบนบัตร"
            value={cardName}
            onChange={(e) => {
              setCardName(e.target.value);
              checkAllValid(cardNumber, e.target.value, expiryDate, cvv);
            }}
            placeholder="JOHN DOE"
            helperText="ชื่อตามที่ปรากฏบนบัตร"
          />
        </Grid>

        <Grid item xs={6}>
          <TextField
            fullWidth
            label="วันหมดอายุ"
            value={expiryDate}
            onChange={(e) => handleExpiryChange(e.target.value)}
            placeholder="MM/YY"
            error={!!errors.expiry}
            helperText={errors.expiry || 'MM/YY'}
          />
        </Grid>

        <Grid item xs={6}>
          <TextField
            fullWidth
            label="CVV"
            value={cvv}
            onChange={(e) => handleCVVChange(e.target.value)}
            placeholder="123"
            type="password"
            error={!!errors.cvv}
            helperText={errors.cvv || '3 หลัก'}
            InputProps={{
              startAdornment: <Security sx={{ mr: 1, color: 'action.active' }} />,
            }}
          />
        </Grid>
      </Grid>

      <Alert severity="warning" sx={{ mt: 3 }}>
        <strong>บัตรทดสอบ:</strong> ใช้หมายเลข 4532 1234 5678 9010 (MM/YY: 12/25, CVV: 123)
      </Alert>
    </Box>
  );
}

