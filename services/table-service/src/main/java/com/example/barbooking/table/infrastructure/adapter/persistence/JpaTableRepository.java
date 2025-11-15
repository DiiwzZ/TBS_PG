package com.example.barbooking.table.infrastructure.adapter.persistence;

import com.example.barbooking.table.domain.model.TableEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface JpaTableRepository extends JpaRepository<TableEntity, Long> {

    List<TableEntity> findByZoneId(Long zoneId);

    List<TableEntity> findByZoneIdAndAvailableTrueAndActiveTrue(Long zoneId);
}

