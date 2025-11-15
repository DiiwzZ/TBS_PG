package com.example.barbooking.table.infrastructure.adapter.persistence;

import com.example.barbooking.table.domain.model.Zone;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface JpaZoneRepository extends JpaRepository<Zone, Long> {

    List<Zone> findByActiveTrue();
}

