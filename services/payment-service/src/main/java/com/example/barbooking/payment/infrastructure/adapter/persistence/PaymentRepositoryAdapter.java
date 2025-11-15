package com.example.barbooking.payment.infrastructure.adapter.persistence;

import com.example.barbooking.payment.domain.model.Payment;
import com.example.barbooking.payment.domain.port.PaymentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;

@Component
@RequiredArgsConstructor
public class PaymentRepositoryAdapter implements PaymentRepository {

    private final JpaPaymentRepository jpaPaymentRepository;

    @Override
    public Payment save(Payment payment) {
        return jpaPaymentRepository.save(payment);
    }

    @Override
    public Optional<Payment> findById(Long id) {
        return jpaPaymentRepository.findById(id);
    }

    @Override
    public Optional<Payment> findByBookingId(Long bookingId) {
        return jpaPaymentRepository.findByBookingId(bookingId);
    }

    @Override
    public Optional<Payment> findByTransactionId(String transactionId) {
        return jpaPaymentRepository.findByTransactionId(transactionId);
    }

    @Override
    public List<Payment> findByStatus(Payment.PaymentStatus status) {
        return jpaPaymentRepository.findByStatus(status);
    }

    @Override
    public void deleteById(Long id) {
        jpaPaymentRepository.deleteById(id);
    }
}

