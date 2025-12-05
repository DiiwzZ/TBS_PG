// Payment related types

export type PaymentStatus = 'PENDING' | 'PROCESSING' | 'COMPLETED' | 'FAILED' | 'REFUNDED';
export type PaymentMethod = 'CREDIT_CARD' | 'DEBIT_CARD' | 'MOBILE_BANKING' | 'QR_CODE';

export interface Payment {
  id: number;
  bookingId: number;
  amount: number;
  status: PaymentStatus;
  paymentMethod: PaymentMethod;
  transactionId: string | null;
  failureReason: string | null;
  paidAt: string | null;
  createdAt: string;
}

export interface InitiatePaymentRequest {
  bookingId: number;
  amount: number;
  paymentMethod: PaymentMethod;
}

export interface PaymentMethodInfo {
  method: PaymentMethod;
  label: string;
  labelTh: string;
  icon: string;
  description: string;
}

export const PAYMENT_METHOD_INFO: Record<PaymentMethod, PaymentMethodInfo> = {
  CREDIT_CARD: {
    method: 'CREDIT_CARD',
    label: 'Credit Card',
    labelTh: 'บัตรเครดิต',
    icon: '💳',
    description: 'ชำระด้วยบัตรเครดิต'
  },
  DEBIT_CARD: {
    method: 'DEBIT_CARD',
    label: 'Debit Card',
    labelTh: 'บัตรเดบิต',
    icon: '💳',
    description: 'ชำระด้วยบัตรเดบิต'
  },
  MOBILE_BANKING: {
    method: 'MOBILE_BANKING',
    label: 'Mobile Banking',
    labelTh: 'โมบายแบงก์กิ้ง',
    icon: '📱',
    description: 'ชำระผ่านแอปธนาคาร'
  },
  QR_CODE: {
    method: 'QR_CODE',
    label: 'QR Code',
    labelTh: 'คิวอาร์โค้ด',
    icon: '📱',
    description: 'สแกน QR Code เพื่อชำระเงิน'
  }
};

