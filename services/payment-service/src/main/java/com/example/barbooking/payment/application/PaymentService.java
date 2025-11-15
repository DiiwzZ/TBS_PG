package com.example.barbooking.payment.application;

import com.example.barbooking.payment.domain.model.Payment;
import com.example.barbooking.payment.domain.port.PaymentRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class PaymentService {

    private final PaymentRepository paymentRepository;

    public Payment initiatePayment(Long bookingId, Double amount, Payment.PaymentMethod paymentMethod) {
        // Check if payment already exists for this booking
        Optional<Payment> existingPayment = paymentRepository.findByBookingId(bookingId);
        if (existingPayment.isPresent()) {
            throw new IllegalStateException("Payment already exists for this booking");
        }

        Payment payment = Payment.builder()
                .bookingId(bookingId)
                .amount(amount)
                .paymentMethod(paymentMethod)
                .status(Payment.PaymentStatus.PENDING)
                .build();

        payment = paymentRepository.save(payment);
        log.info("Payment initiated for booking {}: {}", bookingId, payment.getId());
        return payment;
    }

    public Payment processPayment(Long paymentId) {
        Payment payment = paymentRepository.findById(paymentId)
                .orElseThrow(() -> new IllegalArgumentException("Payment not found"));

        if (payment.getStatus() != Payment.PaymentStatus.PENDING) {
            throw new IllegalStateException("Payment is not in pending status");
        }

        // Mock payment processing - always succeed
        String transactionId = "TXN-" + UUID.randomUUID().toString();
        payment.markAsCompleted(transactionId);
        
        payment = paymentRepository.save(payment);
        log.info("Payment {} processed successfully with transaction ID: {}", paymentId, transactionId);
        return payment;
    }

    public Payment refundPayment(Long paymentId, String reason) {
        Payment payment = paymentRepository.findById(paymentId)
                .orElseThrow(() -> new IllegalArgumentException("Payment not found"));

        payment.markAsRefunded();
        payment = paymentRepository.save(payment);
        
        log.info("Payment {} refunded. Reason: {}", paymentId, reason);
        return payment;
    }

    @Transactional(readOnly = true)
    public Optional<Payment> getPaymentById(Long id) {
        return paymentRepository.findById(id);
    }

    @Transactional(readOnly = true)
    public Optional<Payment> getPaymentByBookingId(Long bookingId) {
        return paymentRepository.findByBookingId(bookingId);
    }

    @Transactional(readOnly = true)
    public Optional<Payment> getPaymentByTransactionId(String transactionId) {
        return paymentRepository.findByTransactionId(transactionId);
    }
}

