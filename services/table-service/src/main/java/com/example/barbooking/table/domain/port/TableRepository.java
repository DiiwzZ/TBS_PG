package com.example.barbooking.table.domain.port;

import com.example.barbooking.table.domain.model.TableEntity;

import java.util.List;
import java.util.Optional;

/**
 * Repository interface for TableEntity (Port in Hexagonal Architecture)
 */
public interface TableRepository {

    TableEntity save(TableEntity table);

    Optional<TableEntity> findById(Long id);

    List<TableEntity> findAll();

    List<TableEntity> findByZoneId(Long zoneId);

    List<TableEntity> findAvailableTablesByZoneId(Long zoneId);

    void deleteById(Long id);
}

