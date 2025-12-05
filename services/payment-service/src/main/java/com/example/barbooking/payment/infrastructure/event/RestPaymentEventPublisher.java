package com.example.barbooking.payment.infrastructure.event;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.Map;

@Component
@RequiredArgsConstructor
@Slf4j
public class RestPaymentEventPublisher implements PaymentEventPublisher {

    private final RestTemplate restTemplate;

    @Value("${booking-service.url:http://booking-service:8081}")
    private String bookingServiceUrl;

    @Override
    public void publishPaymentCompleted(PaymentCompletedEvent event) {
        try {
            String url = bookingServiceUrl + "/api/bookings/" + event.bookingId() + "/payment-confirmed";
            
            // Prepare request body
            Map<String, Object> requestBody = new HashMap<>();
            requestBody.put("paymentId", event.paymentId());
            requestBody.put("transactionId", event.transactionId());
            requestBody.put("amount", event.amount());
            requestBody.put("paidAt", event.paidAt().toString());

            // Set headers
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);

            HttpEntity<Map<String, Object>> request = new HttpEntity<>(requestBody, headers);

            // Call booking service
            restTemplate.postForEntity(url, request, Void.class);
            
            log.info("Successfully published payment completed event for booking {}", event.bookingId());
        } catch (Exception e) {
            log.error("Failed to publish payment completed event for booking {}: {}", 
                event.bookingId(), e.getMessage(), e);
            // Don't throw exception - webhook failures should not break payment
        }
    }
}

