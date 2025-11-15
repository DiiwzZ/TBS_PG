package com.example.barbooking.booking.application;

import com.example.barbooking.booking.domain.model.Booking;
import com.example.barbooking.booking.domain.model.OutboxEvent;
import com.example.barbooking.booking.domain.port.BookingRepository;
import com.example.barbooking.booking.domain.port.OutboxEventRepository;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class BookingManagementService {

    private final BookingRepository bookingRepository;
    private final OutboxEventRepository outboxEventRepository;
    private final ObjectMapper objectMapper;

    public Booking createBooking(Long userId, Long tableId, Long zoneId, Booking.BookingType bookingType,
                                  Booking.TimeSlot timeSlot, LocalDateTime bookingDate, Integer guestCount) {
        
        // Validate booking type
        if (bookingType == Booking.BookingType.PREMIUM && tableId == null) {
            throw new IllegalArgumentException("Premium booking requires table ID");
        }
        if (bookingType == Booking.BookingType.NORMAL && zoneId == null) {
            throw new IllegalArgumentException("Normal booking requires zone ID");
        }

        // Create booking
        Booking booking = Booking.builder()
                .userId(userId)
                .tableId(tableId)
                .zoneId(zoneId)
                .bookingType(bookingType)
                .timeSlot(timeSlot)
                .bookingDate(timeSlot.getSlotDateTime(bookingDate))
                .guestCount(guestCount)
                .fee(timeSlot.getFee())
                .status(Booking.BookingStatus.PENDING)
                .build();

        return bookingRepository.save(booking);
    }

    public void confirmBooking(Long bookingId, Long paymentId) {
        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new IllegalArgumentException("Booking not found"));
        
        booking.confirm(paymentId);
        bookingRepository.save(booking);

        // Create outbox event
        createOutboxEvent(OutboxEvent.EventType.BOOKING_CONFIRMED, bookingId, booking.getUserId());
    }

    public void checkInBooking(Long bookingId) {
        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new IllegalArgumentException("Booking not found"));
        
        booking.checkIn();
        bookingRepository.save(booking);
    }

    public void completeBooking(Long bookingId) {
        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new IllegalArgumentException("Booking not found"));
        
        booking.complete();
        bookingRepository.save(booking);

        createOutboxEvent(OutboxEvent.EventType.BOOKING_COMPLETED, bookingId, booking.getUserId());
    }

    public void cancelBooking(Long bookingId) {
        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new IllegalArgumentException("Booking not found"));
        
        booking.cancel();
        bookingRepository.save(booking);

        createOutboxEvent(OutboxEvent.EventType.BOOKING_CANCELLED, bookingId, booking.getUserId());
    }

    public void markBookingAsNoShow(Long bookingId) {
        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new IllegalArgumentException("Booking not found"));
        
        booking.markAsNoShow();
        bookingRepository.save(booking);

        // Only create no-show event for free slots (to trigger ban check)
        if (booking.isFreeSlot()) {
            createOutboxEvent(OutboxEvent.EventType.BOOKING_NO_SHOW, bookingId, booking.getUserId());
        }
    }

    @Transactional(readOnly = true)
    public Optional<Booking> getBookingById(Long id) {
        return bookingRepository.findById(id);
    }

    @Transactional(readOnly = true)
    public List<Booking> getBookingsByUserId(Long userId) {
        return bookingRepository.findByUserId(userId);
    }

    @Transactional(readOnly = true)
    public List<Booking> getBookingsForNoShowCheck() {
        // Check bookings that are past their grace period
        LocalDateTime cutoffTime = LocalDateTime.now().minusMinutes(15);
        return bookingRepository.findConfirmedBookingsForNoShowCheck(cutoffTime);
    }

    private void createOutboxEvent(OutboxEvent.EventType eventType, Long bookingId, Long userId) {
        Map<String, Object> payload = new HashMap<>();
        payload.put("bookingId", bookingId);
        payload.put("userId", userId);
        payload.put("timestamp", LocalDateTime.now());

        try {
            String payloadJson = objectMapper.writeValueAsString(payload);
            OutboxEvent event = OutboxEvent.builder()
                    .eventType(eventType)
                    .payload(payloadJson)
                    .processed(false)
                    .build();
            outboxEventRepository.save(event);
            log.info("Created outbox event: {} for booking: {}", eventType, bookingId);
        } catch (JsonProcessingException e) {
            log.error("Failed to create outbox event", e);
            throw new RuntimeException("Failed to create outbox event", e);
        }
    }
}

