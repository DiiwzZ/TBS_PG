package com.example.barbooking.booking.infrastructure.adapter.persistence;

import com.example.barbooking.booking.domain.model.Booking;
import com.example.barbooking.booking.domain.port.BookingRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Component
@RequiredArgsConstructor
public class BookingRepositoryAdapter implements BookingRepository {

    private final JpaBookingRepository jpaBookingRepository;

    @Override
    public Booking save(Booking booking) {
        return jpaBookingRepository.save(booking);
    }

    @Override
    public Optional<Booking> findById(Long id) {
        return jpaBookingRepository.findById(id);
    }

    @Override
    public List<Booking> findByUserId(Long userId) {
        return jpaBookingRepository.findByUserId(userId);
    }

    @Override
    public List<Booking> findByStatus(Booking.BookingStatus status) {
        return jpaBookingRepository.findByStatus(status);
    }

    @Override
    public List<Booking> findConfirmedBookingsForNoShowCheck(LocalDateTime cutoffTime) {
        return jpaBookingRepository.findConfirmedBookingsBeforeCutoff(cutoffTime);
    }

    @Override
    public void deleteById(Long id) {
        jpaBookingRepository.deleteById(id);
    }
}

