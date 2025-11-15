package com.example.barbooking.checkin.infrastructure.adapter.persistence;

import com.example.barbooking.checkin.domain.model.CheckIn;
import com.example.barbooking.checkin.domain.port.CheckInRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
@RequiredArgsConstructor
public class CheckInRepositoryAdapter implements CheckInRepository {

    private final JpaCheckInRepository jpaCheckInRepository;

    @Override
    public CheckIn save(CheckIn checkIn) {
        return jpaCheckInRepository.save(checkIn);
    }

    @Override
    public Optional<CheckIn> findById(Long id) {
        return jpaCheckInRepository.findById(id);
    }

    @Override
    public Optional<CheckIn> findByBookingId(Long bookingId) {
        return jpaCheckInRepository.findByBookingId(bookingId);
    }

    @Override
    public boolean existsByBookingId(Long bookingId) {
        return jpaCheckInRepository.existsByBookingId(bookingId);
    }
}

