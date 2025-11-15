package com.example.barbooking.table.infrastructure.adapter.persistence;

import com.example.barbooking.table.domain.model.TableEntity;
import com.example.barbooking.table.domain.port.TableRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;

@Component
@RequiredArgsConstructor
public class TableRepositoryAdapter implements TableRepository {

    private final JpaTableRepository jpaTableRepository;

    @Override
    public TableEntity save(TableEntity table) {
        return jpaTableRepository.save(table);
    }

    @Override
    public Optional<TableEntity> findById(Long id) {
        return jpaTableRepository.findById(id);
    }

    @Override
    public List<TableEntity> findAll() {
        return jpaTableRepository.findAll();
    }

    @Override
    public List<TableEntity> findByZoneId(Long zoneId) {
        return jpaTableRepository.findByZoneId(zoneId);
    }

    @Override
    public List<TableEntity> findAvailableTablesByZoneId(Long zoneId) {
        return jpaTableRepository.findByZoneIdAndAvailableTrueAndActiveTrue(zoneId);
    }

    @Override
    public void deleteById(Long id) {
        jpaTableRepository.deleteById(id);
    }
}

