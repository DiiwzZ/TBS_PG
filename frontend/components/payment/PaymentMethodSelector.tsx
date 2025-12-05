'use client';

import {
  Box,
  Grid,
  Card,
  CardContent,
  CardActionArea,
  Typography,
  Radio,
  RadioGroup,
  FormControlLabel,
} from '@mui/material';
import { PAYMENT_METHOD_INFO, type PaymentMethod } from '@/types/payment';

interface PaymentMethodSelectorProps {
  selectedMethod: PaymentMethod | null;
  onSelectMethod: (method: PaymentMethod) => void;
}

export default function PaymentMethodSelector({
  selectedMethod,
  onSelectMethod,
}: PaymentMethodSelectorProps) {
  return (
    <Box>
      <Typography 
        variant="h6" 
        gutterBottom 
        color="primary"
        sx={{ fontSize: { xs: '1rem', sm: '1.125rem', md: '1.25rem' } }}
      >
        เลือกวิธีชำระเงิน
      </Typography>
      <Typography 
        variant="body2" 
        color="text.secondary" 
        mb={3}
        sx={{ fontSize: { xs: '0.8125rem', sm: '0.875rem' } }}
      >
        กรุณาเลือกช่องทางการชำระเงินที่ต้องการ
      </Typography>

      <RadioGroup
        value={selectedMethod || ''}
        onChange={(e) => onSelectMethod(e.target.value as PaymentMethod)}
      >
        <Grid container spacing={2}>
          {Object.values(PAYMENT_METHOD_INFO).map((methodInfo) => {
            const isSelected = methodInfo.method === selectedMethod;

            return (
              <Grid item xs={12} sm={6} key={methodInfo.method}>
                <Card
                  elevation={isSelected ? 8 : 2}
                  sx={{
                    border: isSelected ? '2px solid' : '1px solid',
                    borderColor: isSelected ? 'primary.main' : 'rgba(255, 167, 38, 0.2)',
                    transition: 'all 0.3s',
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      boxShadow: 4,
                    },
                  }}
                >
                  <CardActionArea onClick={() => onSelectMethod(methodInfo.method)}>
                    <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
                      <Box display="flex" alignItems="center" justifyContent="space-between">
                        <Box display="flex" alignItems="center" gap={{ xs: 1.5, sm: 2 }}>
                          <Typography 
                            variant="h3"
                            sx={{ fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' } }}
                          >
                            {methodInfo.icon}
                          </Typography>
                          <Box>
                            <Typography 
                              variant="h6" 
                              color="primary"
                              sx={{ fontSize: { xs: '1rem', sm: '1.125rem', md: '1.25rem' } }}
                            >
                              {methodInfo.labelTh}
                            </Typography>
                            <Typography 
                              variant="body2" 
                              color="text.secondary"
                              sx={{ fontSize: { xs: '0.8125rem', sm: '0.875rem' } }}
                            >
                              {methodInfo.description}
                            </Typography>
                          </Box>
                        </Box>
                        <Radio
                          checked={isSelected}
                          value={methodInfo.method}
                          sx={{ ml: 1 }}
                        />
                      </Box>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </RadioGroup>
    </Box>
  );
}

