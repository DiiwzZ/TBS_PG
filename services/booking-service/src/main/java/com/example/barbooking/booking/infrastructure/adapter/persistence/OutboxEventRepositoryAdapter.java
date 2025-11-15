package com.example.barbooking.booking.infrastructure.adapter.persistence;

import com.example.barbooking.booking.domain.model.OutboxEvent;
import com.example.barbooking.booking.domain.port.OutboxEventRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@RequiredArgsConstructor
public class OutboxEventRepositoryAdapter implements OutboxEventRepository {

    private final JpaOutboxEventRepository jpaOutboxEventRepository;

    @Override
    public OutboxEvent save(OutboxEvent event) {
        return jpaOutboxEventRepository.save(event);
    }

    @Override
    public List<OutboxEvent> findUnprocessedEvents() {
        return jpaOutboxEventRepository.findByProcessedFalseOrderByCreatedAtAsc();
    }

    @Override
    public void deleteById(Long id) {
        jpaOutboxEventRepository.deleteById(id);
    }
}

