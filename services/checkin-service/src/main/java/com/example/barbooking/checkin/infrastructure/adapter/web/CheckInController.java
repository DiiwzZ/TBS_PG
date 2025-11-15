package com.example.barbooking.checkin.infrastructure.adapter.web;

import com.example.barbooking.checkin.application.CheckInService;
import com.example.barbooking.checkin.application.QRCodeGeneratorService;
import com.example.barbooking.checkin.domain.model.CheckIn;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;

@RestController
@RequestMapping("/api/checkin")
@RequiredArgsConstructor
public class CheckInController {

    private final CheckInService checkInService;
    private final QRCodeGeneratorService qrCodeGeneratorService;

    @PostMapping("/generate-qr/{bookingId}")
    public ResponseEntity<QRTokenResponse> generateQRToken(@PathVariable Long bookingId) {
        String qrToken = checkInService.generateQRToken(bookingId);
        return ResponseEntity.ok(new QRTokenResponse(qrToken, bookingId));
    }

    @GetMapping("/qr-image/{qrToken}")
    public ResponseEntity<byte[]> getQRCodeImage(@PathVariable String qrToken) {
        // Validate token first
        if (!checkInService.isQRTokenValid(qrToken)) {
            return ResponseEntity.notFound().build();
        }

        byte[] qrCodeImage = qrCodeGeneratorService.generateQRCodeImage(qrToken);
        
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.IMAGE_PNG);
        
        return new ResponseEntity<>(qrCodeImage, headers, HttpStatus.OK);
    }

    @PostMapping("/scan")
    public ResponseEntity<CheckInResponse> scanQRCode(@RequestBody ScanRequest request) {
        CheckIn checkIn = checkInService.performCheckIn(request.qrToken(), request.staffId());
        return ResponseEntity.ok(CheckInResponse.fromCheckIn(checkIn));
    }

    @GetMapping("/booking/{bookingId}")
    public ResponseEntity<CheckInResponse> getCheckInByBookingId(@PathVariable Long bookingId) {
        return checkInService.getCheckInByBookingId(bookingId)
                .map(checkIn -> ResponseEntity.ok(CheckInResponse.fromCheckIn(checkIn)))
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/validate/{qrToken}")
    public ResponseEntity<TokenValidationResponse> validateQRToken(@PathVariable String qrToken) {
        boolean valid = checkInService.isQRTokenValid(qrToken);
        return ResponseEntity.ok(new TokenValidationResponse(valid, qrToken));
    }

    // DTOs
    public record QRTokenResponse(String qrToken, Long bookingId) {}

    public record ScanRequest(String qrToken, Long staffId) {}

    public record TokenValidationResponse(boolean valid, String qrToken) {}

    public record CheckInResponse(
            Long id,
            Long bookingId,
            String qrToken,
            LocalDateTime checkedInAt,
            Long staffId
    ) {
        public static CheckInResponse fromCheckIn(CheckIn checkIn) {
            return new CheckInResponse(
                    checkIn.getId(),
                    checkIn.getBookingId(),
                    checkIn.getQrToken(),
                    checkIn.getCheckedInAt(),
                    checkIn.getStaffId()
            );
        }
    }
}

