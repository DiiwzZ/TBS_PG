package com.example.barbooking.payment.infrastructure.event;

public interface PaymentEventPublisher {
    void publishPaymentCompleted(PaymentCompletedEvent event);
}

