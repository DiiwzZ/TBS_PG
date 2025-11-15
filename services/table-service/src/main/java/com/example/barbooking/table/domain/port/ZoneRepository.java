package com.example.barbooking.table.domain.port;

import com.example.barbooking.table.domain.model.Zone;

import java.util.List;
import java.util.Optional;

/**
 * Repository interface for Zone entity (Port in Hexagonal Architecture)
 */
public interface ZoneRepository {

    Zone save(Zone zone);

    Optional<Zone> findById(Long id);

    List<Zone> findAll();

    List<Zone> findAllActive();

    void deleteById(Long id);
}

