package com.example.barbooking.booking.domain.port;

import com.example.barbooking.booking.domain.model.OutboxEvent;

import java.util.List;

/**
 * Repository interface for OutboxEvent entity
 */
public interface OutboxEventRepository {

    OutboxEvent save(OutboxEvent event);

    List<OutboxEvent> findUnprocessedEvents();

    void deleteById(Long id);
}

