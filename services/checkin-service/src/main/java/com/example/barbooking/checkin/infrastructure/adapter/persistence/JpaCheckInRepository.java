package com.example.barbooking.checkin.infrastructure.adapter.persistence;

import com.example.barbooking.checkin.domain.model.CheckIn;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface JpaCheckInRepository extends JpaRepository<CheckIn, Long> {

    Optional<CheckIn> findByBookingId(Long bookingId);

    boolean existsByBookingId(Long bookingId);
}

