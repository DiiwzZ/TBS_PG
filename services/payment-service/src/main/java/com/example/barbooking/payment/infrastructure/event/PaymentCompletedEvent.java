package com.example.barbooking.payment.infrastructure.event;

import java.time.LocalDateTime;

public record PaymentCompletedEvent(
    Long paymentId,
    Long bookingId,
    Double amount,
    String transactionId,
    LocalDateTime paidAt
) {}

