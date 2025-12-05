'use client';

import { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
} from '@mui/material';
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineOppositeContent,
} from '@mui/lab';
import {
  CheckCircle,
  Schedule,
  Payment,
  QrCode2,
  CheckCircleOutline,
  Cancel,
  Warning,
} from '@mui/icons-material';
import type { Booking } from '@/types/booking';

interface BookingTimelineProps {
  booking: Booking;
}

export default function BookingTimeline({ booking }: BookingTimelineProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const timelineItems = [
    {
      label: 'สร้างการจอง',
      date: booking.createdAt,
      icon: <Schedule />,
      color: 'primary',
      completed: true,
    },
    {
      label: booking.fee > 0 ? 'ชำระเงิน' : 'ยืนยันการจอง',
      date: booking.paymentId ? booking.createdAt : null,
      icon: booking.fee > 0 ? <Payment /> : <CheckCircle />,
      color: booking.status === 'CANCELLED' ? 'grey' : booking.paymentId ? 'success' : 'warning',
      completed: booking.status !== 'PENDING',
    },
    {
      label: 'เช็คอิน',
      date: booking.checkedInAt,
      icon: <QrCode2 />,
      color: booking.checkedInAt ? 'success' : booking.status === 'CANCELLED' ? 'grey' : 'grey',
      completed: !!booking.checkedInAt,
    },
    {
      label: getEndLabel(booking.status),
      date: getEndDate(booking),
      icon: getEndIcon(booking.status),
      color: getEndColor(booking.status) as any,
      completed: isEndState(booking.status),
    },
  ];

  return (
    <Box>
      <Typography variant="h6" gutterBottom color="primary">
        สถานะการจอง
      </Typography>

      <Timeline position="right">
        {timelineItems.map((item, index) => (
          <TimelineItem key={index}>
            <TimelineOppositeContent color="text.secondary" sx={{ flex: 0.3 }}>
              <Typography variant="caption">
                {item.date
                  ? (isMounted 
                      ? new Date(item.date).toLocaleDateString('th-TH', {
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })
                      : new Date(item.date).toISOString().split('T')[0]
                    )
                  : item.completed
                  ? 'เสร็จสิ้น'
                  : 'รอดำเนินการ'}
              </Typography>
            </TimelineOppositeContent>

            <TimelineSeparator>
              <TimelineDot
                color={item.color as any}
                variant={item.completed ? 'filled' : 'outlined'}
              >
                {item.icon}
              </TimelineDot>
              {index < timelineItems.length - 1 && (
                <TimelineConnector
                  sx={{
                    bgcolor: item.completed ? `${item.color}.main` : 'grey.500',
                  }}
                />
              )}
            </TimelineSeparator>

            <TimelineContent>
              <Paper
                elevation={item.completed ? 2 : 0}
                sx={{
                  p: 2,
                  bgcolor: item.completed ? 'background.paper' : 'transparent',
                  border: item.completed ? '1px solid rgba(255, 167, 38, 0.2)' : 'none',
                }}
              >
                <Typography variant="body1" fontWeight={item.completed ? 'bold' : 'normal'}>
                  {item.label}
                </Typography>
              </Paper>
            </TimelineContent>
          </TimelineItem>
        ))}
      </Timeline>
    </Box>
  );
}

function getEndLabel(status: string): string {
  switch (status) {
    case 'COMPLETED':
      return 'เสร็จสิ้น';
    case 'CANCELLED':
      return 'ยกเลิก';
    case 'NO_SHOW':
      return 'ไม่มาตามนัด';
    default:
      return 'เสร็จสิ้น';
  }
}

function getEndIcon(status: string) {
  switch (status) {
    case 'COMPLETED':
      return <CheckCircleOutline />;
    case 'CANCELLED':
      return <Cancel />;
    case 'NO_SHOW':
      return <Warning />;
    default:
      return <CheckCircleOutline />;
  }
}

function getEndColor(status: string): string {
  switch (status) {
    case 'COMPLETED':
      return 'success';
    case 'CANCELLED':
      return 'default';
    case 'NO_SHOW':
      return 'error';
    default:
      return 'grey';
  }
}

function getEndDate(booking: Booking): string | null {
  if (booking.status === 'COMPLETED' || booking.status === 'CANCELLED' || booking.status === 'NO_SHOW') {
    return booking.createdAt; // Simplified - would need updatedAt in real scenario
  }
  return null;
}

function isEndState(status: string): boolean {
  return status === 'COMPLETED' || status === 'CANCELLED' || status === 'NO_SHOW';
}
