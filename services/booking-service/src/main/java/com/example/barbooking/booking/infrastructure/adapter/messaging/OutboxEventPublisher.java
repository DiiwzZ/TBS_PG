package com.example.barbooking.booking.infrastructure.adapter.messaging;

import com.example.barbooking.booking.domain.model.OutboxEvent;
import com.example.barbooking.booking.domain.port.OutboxEventRepository;
import com.example.barbooking.booking.infrastructure.config.RabbitMqConfig;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Component
@RequiredArgsConstructor
@Slf4j
public class OutboxEventPublisher {

    private final OutboxEventRepository outboxEventRepository;
    private final RabbitTemplate rabbitTemplate;

    @Scheduled(fixedDelay = 5000) // Run every 5 seconds
    @Transactional
    public void publishPendingEvents() {
        List<OutboxEvent> events = outboxEventRepository.findUnprocessedEvents();
        
        for (OutboxEvent event : events) {
            try {
                publishEvent(event);
                event.markAsProcessed();
                outboxEventRepository.save(event);
                log.info("Published and marked event {} as processed", event.getId());
            } catch (Exception e) {
                log.error("Failed to publish event {}: {}", event.getId(), e.getMessage());
            }
        }
    }

    private void publishEvent(OutboxEvent event) {
        String routingKey = switch (event.getEventType()) {
            case BOOKING_NO_SHOW -> RabbitMqConfig.NO_SHOW_ROUTING_KEY;
            case BOOKING_CONFIRMED, BOOKING_CANCELLED, BOOKING_COMPLETED -> "booking." + event.getEventType().name().toLowerCase();
        };

        rabbitTemplate.convertAndSend(
                RabbitMqConfig.BOOKING_EXCHANGE,
                routingKey,
                event.getPayload()
        );

        log.info("Published event {} to exchange with routing key {}", event.getEventType(), routingKey);
    }
}

