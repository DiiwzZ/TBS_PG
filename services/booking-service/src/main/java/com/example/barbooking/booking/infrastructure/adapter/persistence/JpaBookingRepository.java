package com.example.barbooking.booking.infrastructure.adapter.persistence;

import com.example.barbooking.booking.domain.model.Booking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface JpaBookingRepository extends JpaRepository<Booking, Long> {

    List<Booking> findByUserId(Long userId);

    List<Booking> findByStatus(Booking.BookingStatus status);

    @Query("SELECT b FROM Booking b WHERE b.status = 'CONFIRMED' AND b.bookingDate < :cutoffTime")
    List<Booking> findConfirmedBookingsBeforeCutoff(@Param("cutoffTime") LocalDateTime cutoffTime);
}

