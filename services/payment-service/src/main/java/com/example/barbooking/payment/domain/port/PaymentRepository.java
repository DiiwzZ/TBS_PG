package com.example.barbooking.payment.domain.port;

import com.example.barbooking.payment.domain.model.Payment;

import java.util.List;
import java.util.Optional;

/**
 * Repository interface for Payment entity (Port in Hexagonal Architecture)
 */
public interface PaymentRepository {

    Payment save(Payment payment);

    Optional<Payment> findById(Long id);

    Optional<Payment> findByBookingId(Long bookingId);

    Optional<Payment> findByTransactionId(String transactionId);

    List<Payment> findByStatus(Payment.PaymentStatus status);

    void deleteById(Long id);
}

