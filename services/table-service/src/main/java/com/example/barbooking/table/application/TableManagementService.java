package com.example.barbooking.table.application;

import com.example.barbooking.table.domain.model.TableEntity;
import com.example.barbooking.table.domain.model.Zone;
import com.example.barbooking.table.domain.port.TableRepository;
import com.example.barbooking.table.domain.port.ZoneRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
public class TableManagementService {

    private final ZoneRepository zoneRepository;
    private final TableRepository tableRepository;

    // Zone operations
    public Zone createZone(String name, String description) {
        Zone zone = Zone.builder()
                .name(name)
                .description(description)
                .active(true)
                .build();
        return zoneRepository.save(zone);
    }

    @Transactional(readOnly = true)
    public List<Zone> getAllZones() {
        return zoneRepository.findAll();
    }

    @Transactional(readOnly = true)
    public List<Zone> getAllActiveZones() {
        return zoneRepository.findAllActive();
    }

    @Transactional(readOnly = true)
    public Optional<Zone> getZoneById(Long id) {
        return zoneRepository.findById(id);
    }

    // Table operations
    public TableEntity createTable(Long zoneId, String tableNumber, Integer capacity, String notes) {
        Zone zone = zoneRepository.findById(zoneId)
                .orElseThrow(() -> new IllegalArgumentException("Zone not found"));

        TableEntity table = TableEntity.builder()
                .tableNumber(tableNumber)
                .zone(zone)
                .capacity(capacity)
                .notes(notes)
                .available(true)
                .active(true)
                .build();

        return tableRepository.save(table);
    }

    @Transactional(readOnly = true)
    public List<TableEntity> getAllTables() {
        return tableRepository.findAll();
    }

    @Transactional(readOnly = true)
    public List<TableEntity> getTablesByZone(Long zoneId) {
        return tableRepository.findByZoneId(zoneId);
    }

    @Transactional(readOnly = true)
    public List<TableEntity> getAvailableTablesByZone(Long zoneId) {
        return tableRepository.findAvailableTablesByZoneId(zoneId);
    }

    @Transactional(readOnly = true)
    public Optional<TableEntity> getTableById(Long id) {
        return tableRepository.findById(id);
    }

    public void markTableAsUnavailable(Long tableId) {
        TableEntity table = tableRepository.findById(tableId)
                .orElseThrow(() -> new IllegalArgumentException("Table not found"));
        table.markAsUnavailable();
        tableRepository.save(table);
    }

    public void markTableAsAvailable(Long tableId) {
        TableEntity table = tableRepository.findById(tableId)
                .orElseThrow(() -> new IllegalArgumentException("Table not found"));
        table.markAsAvailable();
        tableRepository.save(table);
    }
}

