package com.example.barbooking.table.infrastructure.adapter.web;

import com.example.barbooking.table.application.TableManagementService;
import com.example.barbooking.table.domain.model.TableEntity;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tables")
@RequiredArgsConstructor
public class TableController {

    private final TableManagementService tableManagementService;

    @PostMapping
    public ResponseEntity<TableResponse> createTable(@RequestBody CreateTableRequest request) {
        TableEntity table = tableManagementService.createTable(
                request.zoneId(),
                request.tableNumber(),
                request.capacity(),
                request.notes()
        );
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(TableResponse.fromTable(table));
    }

    @GetMapping
    public ResponseEntity<List<TableResponse>> getAllTables() {
        List<TableEntity> tables = tableManagementService.getAllTables();
        return ResponseEntity.ok(tables.stream().map(TableResponse::fromTable).toList());
    }

    @GetMapping("/{id}")
    public ResponseEntity<TableResponse> getTableById(@PathVariable Long id) {
        return tableManagementService.getTableById(id)
                .map(table -> ResponseEntity.ok(TableResponse.fromTable(table)))
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/zone/{zoneId}")
    public ResponseEntity<List<TableResponse>> getTablesByZone(@PathVariable Long zoneId) {
        List<TableEntity> tables = tableManagementService.getTablesByZone(zoneId);
        return ResponseEntity.ok(tables.stream().map(TableResponse::fromTable).toList());
    }

    @GetMapping("/zone/{zoneId}/available")
    public ResponseEntity<List<TableResponse>> getAvailableTablesByZone(@PathVariable Long zoneId) {
        List<TableEntity> tables = tableManagementService.getAvailableTablesByZone(zoneId);
        return ResponseEntity.ok(tables.stream().map(TableResponse::fromTable).toList());
    }

    @PutMapping("/{id}/unavailable")
    public ResponseEntity<Void> markTableAsUnavailable(@PathVariable Long id) {
        tableManagementService.markTableAsUnavailable(id);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/{id}/available")
    public ResponseEntity<Void> markTableAsAvailable(@PathVariable Long id) {
        tableManagementService.markTableAsAvailable(id);
        return ResponseEntity.ok().build();
    }

    // DTOs
    public record CreateTableRequest(
            Long zoneId,
            String tableNumber,
            Integer capacity,
            String notes
    ) {}

    public record TableResponse(
            Long id,
            String tableNumber,
            Long zoneId,
            String zoneName,
            Integer capacity,
            Boolean available,
            Boolean active,
            String notes
    ) {
        public static TableResponse fromTable(TableEntity table) {
            return new TableResponse(
                    table.getId(),
                    table.getTableNumber(),
                    table.getZone().getId(),
                    table.getZone().getName(),
                    table.getCapacity(),
                    table.getAvailable(),
                    table.getActive(),
                    table.getNotes()
            );
        }
    }
}

