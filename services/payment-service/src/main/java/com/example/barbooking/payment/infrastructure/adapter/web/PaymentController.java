package com.example.barbooking.payment.infrastructure.adapter.web;

import com.example.barbooking.payment.application.PaymentService;
import com.example.barbooking.payment.domain.model.Payment;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;

@RestController
@RequestMapping("/api/payments")
@RequiredArgsConstructor
public class PaymentController {

    private final PaymentService paymentService;

    @PostMapping("/initiate")
    public ResponseEntity<PaymentResponse> initiatePayment(@RequestBody InitiatePaymentRequest request) {
        Payment payment = paymentService.initiatePayment(
                request.bookingId(),
                request.amount(),
                request.paymentMethod()
        );
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(PaymentResponse.fromPayment(payment));
    }

    @PostMapping("/{id}/process")
    public ResponseEntity<PaymentResponse> processPayment(@PathVariable Long id) {
        Payment payment = paymentService.processPayment(id);
        return ResponseEntity.ok(PaymentResponse.fromPayment(payment));
    }

    @PostMapping("/{id}/refund")
    public ResponseEntity<PaymentResponse> refundPayment(
            @PathVariable Long id,
            @RequestBody RefundRequest request) {
        Payment payment = paymentService.refundPayment(id, request.reason());
        return ResponseEntity.ok(PaymentResponse.fromPayment(payment));
    }

    @GetMapping("/{id}")
    public ResponseEntity<PaymentResponse> getPaymentById(@PathVariable Long id) {
        return paymentService.getPaymentById(id)
                .map(payment -> ResponseEntity.ok(PaymentResponse.fromPayment(payment)))
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/booking/{bookingId}")
    public ResponseEntity<PaymentResponse> getPaymentByBookingId(@PathVariable Long bookingId) {
        return paymentService.getPaymentByBookingId(bookingId)
                .map(payment -> ResponseEntity.ok(PaymentResponse.fromPayment(payment)))
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/transaction/{transactionId}")
    public ResponseEntity<PaymentResponse> getPaymentByTransactionId(@PathVariable String transactionId) {
        return paymentService.getPaymentByTransactionId(transactionId)
                .map(payment -> ResponseEntity.ok(PaymentResponse.fromPayment(payment)))
                .orElse(ResponseEntity.notFound().build());
    }

    // DTOs
    public record InitiatePaymentRequest(
            Long bookingId,
            Double amount,
            Payment.PaymentMethod paymentMethod
    ) {}

    public record RefundRequest(String reason) {}

    public record PaymentResponse(
            Long id,
            Long bookingId,
            Double amount,
            String status,
            String paymentMethod,
            String transactionId,
            String failureReason,
            LocalDateTime paidAt,
            LocalDateTime createdAt
    ) {
        public static PaymentResponse fromPayment(Payment payment) {
            return new PaymentResponse(
                    payment.getId(),
                    payment.getBookingId(),
                    payment.getAmount(),
                    payment.getStatus().name(),
                    payment.getPaymentMethod().name(),
                    payment.getTransactionId(),
                    payment.getFailureReason(),
                    payment.getPaidAt(),
                    payment.getCreatedAt()
            );
        }
    }
}

