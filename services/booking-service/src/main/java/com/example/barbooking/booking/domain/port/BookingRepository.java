package com.example.barbooking.booking.domain.port;

import com.example.barbooking.booking.domain.model.Booking;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

/**
 * Repository interface for Booking entity (Port in Hexagonal Architecture)
 */
public interface BookingRepository {

    Booking save(Booking booking);

    Optional<Booking> findById(Long id);

    List<Booking> findByUserId(Long userId);

    List<Booking> findByStatus(Booking.BookingStatus status);

    List<Booking> findConfirmedBookingsForNoShowCheck(LocalDateTime cutoffTime);

    void deleteById(Long id);
}

