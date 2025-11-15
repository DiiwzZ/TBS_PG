package com.example.barbooking.checkin.domain.port;

import com.example.barbooking.checkin.domain.model.CheckIn;

import java.util.Optional;

/**
 * Repository interface for CheckIn entity (Port in Hexagonal Architecture)
 */
public interface CheckInRepository {

    CheckIn save(CheckIn checkIn);

    Optional<CheckIn> findById(Long id);

    Optional<CheckIn> findByBookingId(Long bookingId);

    boolean existsByBookingId(Long bookingId);
}

