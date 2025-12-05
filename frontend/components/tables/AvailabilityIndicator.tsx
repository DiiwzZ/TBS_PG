'use client';

import { Chip, Tooltip } from '@mui/material';
import { CheckCircle, Cancel, Schedule, Block } from '@mui/icons-material';

interface AvailabilityIndicatorProps {
  available: boolean;
  active: boolean;
  occupied?: boolean;
  reserved?: boolean;
}

export default function AvailabilityIndicator({
  available,
  active,
  occupied = false,
  reserved = false,
}: AvailabilityIndicatorProps) {
  if (!active) {
    return (
      <Tooltip title="ไม่พร้อมใช้งาน">
        <Chip
          label="ปิด"
          size="small"
          icon={<Block />}
          sx={{ 
            backgroundColor: 'grey.700',
            color: 'grey.400',
          }}
        />
      </Tooltip>
    );
  }

  if (occupied) {
    return (
      <Tooltip title="มีผู้ใช้งานอยู่">
        <Chip
          label="ไม่ว่าง"
          size="small"
          color="error"
          icon={<Cancel />}
        />
      </Tooltip>
    );
  }

  if (reserved) {
    return (
      <Tooltip title="มีการจองแล้ว">
        <Chip
          label="จองแล้ว"
          size="small"
          color="warning"
          icon={<Schedule />}
        />
      </Tooltip>
    );
  }

  if (available) {
    return (
      <Tooltip title="พร้อมใช้งาน">
        <Chip
          label="ว่าง"
          size="small"
          color="success"
          icon={<CheckCircle />}
        />
      </Tooltip>
    );
  }

  return (
    <Tooltip title="ไม่พร้อมใช้งาน">
      <Chip
        label="ไม่ว่าง"
        size="small"
        color="default"
      />
    </Tooltip>
  );
}

