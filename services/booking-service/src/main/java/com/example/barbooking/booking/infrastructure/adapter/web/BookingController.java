package com.example.barbooking.booking.infrastructure.adapter.web;

import com.example.barbooking.booking.application.BookingManagementService;
import com.example.barbooking.booking.domain.model.Booking;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/bookings")
@RequiredArgsConstructor
public class BookingController {

    private final BookingManagementService bookingManagementService;

    @PostMapping
    public ResponseEntity<BookingResponse> createBooking(@RequestBody CreateBookingRequest request) {
        Booking booking = bookingManagementService.createBooking(
                request.userId(),
                request.tableId(),
                request.zoneId(),
                request.bookingType(),
                request.timeSlot(),
                request.bookingDate(),
                request.guestCount()
        );
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(BookingResponse.fromBooking(booking));
    }

    @PostMapping("/{id}/confirm")
    public ResponseEntity<Void> confirmBooking(@PathVariable Long id, @RequestBody ConfirmBookingRequest request) {
        bookingManagementService.confirmBooking(id, request.paymentId());
        return ResponseEntity.ok().build();
    }

    @PostMapping("/{id}/check-in")
    public ResponseEntity<Void> checkInBooking(@PathVariable Long id) {
        bookingManagementService.checkInBooking(id);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/{id}/complete")
    public ResponseEntity<Void> completeBooking(@PathVariable Long id) {
        bookingManagementService.completeBooking(id);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/{id}/cancel")
    public ResponseEntity<Void> cancelBooking(@PathVariable Long id) {
        bookingManagementService.cancelBooking(id);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/{id}")
    public ResponseEntity<BookingResponse> getBookingById(@PathVariable Long id) {
        return bookingManagementService.getBookingById(id)
                .map(booking -> ResponseEntity.ok(BookingResponse.fromBooking(booking)))
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<BookingResponse>> getBookingsByUserId(@PathVariable Long userId) {
        List<Booking> bookings = bookingManagementService.getBookingsByUserId(userId);
        return ResponseEntity.ok(bookings.stream().map(BookingResponse::fromBooking).toList());
    }

    // DTOs
    public record CreateBookingRequest(
            Long userId,
            Long tableId,
            Long zoneId,
            Booking.BookingType bookingType,
            Booking.TimeSlot timeSlot,
            @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME)
            LocalDateTime bookingDate,
            Integer guestCount
    ) {}

    public record ConfirmBookingRequest(Long paymentId) {}

    public record BookingResponse(
            Long id,
            Long userId,
            Long tableId,
            Long zoneId,
            String bookingType,
            String timeSlot,
            LocalDateTime bookingDate,
            Integer guestCount,
            Double fee,
            String status,
            Long paymentId,
            LocalDateTime checkedInAt,
            LocalDateTime createdAt
    ) {
        public static BookingResponse fromBooking(Booking booking) {
            return new BookingResponse(
                    booking.getId(),
                    booking.getUserId(),
                    booking.getTableId(),
                    booking.getZoneId(),
                    booking.getBookingType().name(),
                    booking.getTimeSlot().name(),
                    booking.getBookingDate(),
                    booking.getGuestCount(),
                    booking.getFee(),
                    booking.getStatus().name(),
                    booking.getPaymentId(),
                    booking.getCheckedInAt(),
                    booking.getCreatedAt()
            );
        }
    }
}

