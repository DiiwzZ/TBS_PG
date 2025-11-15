package com.example.barbooking.table.infrastructure.adapter.persistence;

import com.example.barbooking.table.domain.model.Zone;
import com.example.barbooking.table.domain.port.ZoneRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;

@Component
@RequiredArgsConstructor
public class ZoneRepositoryAdapter implements ZoneRepository {

    private final JpaZoneRepository jpaZoneRepository;

    @Override
    public Zone save(Zone zone) {
        return jpaZoneRepository.save(zone);
    }

    @Override
    public Optional<Zone> findById(Long id) {
        return jpaZoneRepository.findById(id);
    }

    @Override
    public List<Zone> findAll() {
        return jpaZoneRepository.findAll();
    }

    @Override
    public List<Zone> findAllActive() {
        return jpaZoneRepository.findByActiveTrue();
    }

    @Override
    public void deleteById(Long id) {
        jpaZoneRepository.deleteById(id);
    }
}

