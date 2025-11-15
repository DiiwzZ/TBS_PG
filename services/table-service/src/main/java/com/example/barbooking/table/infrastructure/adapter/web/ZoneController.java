package com.example.barbooking.table.infrastructure.adapter.web;

import com.example.barbooking.table.application.TableManagementService;
import com.example.barbooking.table.domain.model.Zone;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/zones")
@RequiredArgsConstructor
public class ZoneController {

    private final TableManagementService tableManagementService;

    @PostMapping
    public ResponseEntity<ZoneResponse> createZone(@RequestBody CreateZoneRequest request) {
        Zone zone = tableManagementService.createZone(request.name(), request.description());
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ZoneResponse.fromZone(zone));
    }

    @GetMapping
    public ResponseEntity<List<ZoneResponse>> getAllZones() {
        List<Zone> zones = tableManagementService.getAllZones();
        return ResponseEntity.ok(zones.stream().map(ZoneResponse::fromZone).toList());
    }

    @GetMapping("/active")
    public ResponseEntity<List<ZoneResponse>> getAllActiveZones() {
        List<Zone> zones = tableManagementService.getAllActiveZones();
        return ResponseEntity.ok(zones.stream().map(ZoneResponse::fromZone).toList());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ZoneResponse> getZoneById(@PathVariable Long id) {
        return tableManagementService.getZoneById(id)
                .map(zone -> ResponseEntity.ok(ZoneResponse.fromZone(zone)))
                .orElse(ResponseEntity.notFound().build());
    }

    // DTOs
    public record CreateZoneRequest(String name, String description) {}

    public record ZoneResponse(
            Long id,
            String name,
            String description,
            Boolean active
    ) {
        public static ZoneResponse fromZone(Zone zone) {
            return new ZoneResponse(
                    zone.getId(),
                    zone.getName(),
                    zone.getDescription(),
                    zone.getActive()
            );
        }
    }
}

