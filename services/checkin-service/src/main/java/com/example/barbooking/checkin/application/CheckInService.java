package com.example.barbooking.checkin.application;

import com.example.barbooking.checkin.domain.model.CheckIn;
import com.example.barbooking.checkin.domain.port.CheckInRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.UUID;
import java.util.concurrent.TimeUnit;

@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class CheckInService {

    private final CheckInRepository checkInRepository;
    private final StringRedisTemplate redisTemplate;

    private static final String QR_TOKEN_PREFIX = "qr:booking:";
    private static final long QR_TOKEN_EXPIRY_HOURS = 24;

    public String generateQRToken(Long bookingId) {
        // Check if booking already checked in
        if (checkInRepository.existsByBookingId(bookingId)) {
            throw new IllegalStateException("Booking already checked in");
        }

        // Generate unique token
        String token = UUID.randomUUID().toString();
        String redisKey = QR_TOKEN_PREFIX + token;

        // Store in Redis with expiry
        redisTemplate.opsForValue().set(
                redisKey,
                bookingId.toString(),
                QR_TOKEN_EXPIRY_HOURS,
                TimeUnit.HOURS
        );

        log.info("Generated QR token for booking {}: {}", bookingId, token);
        return token;
    }

    public CheckIn performCheckIn(String qrToken, Long staffId) {
        String redisKey = QR_TOKEN_PREFIX + qrToken;
        
        // Get booking ID from Redis
        String bookingIdStr = redisTemplate.opsForValue().get(redisKey);
        if (bookingIdStr == null) {
            throw new IllegalArgumentException("Invalid or expired QR token");
        }

        Long bookingId = Long.parseLong(bookingIdStr);

        // Check if already checked in
        if (checkInRepository.existsByBookingId(bookingId)) {
            throw new IllegalStateException("Booking already checked in");
        }

        // Create check-in record
        CheckIn checkIn = CheckIn.builder()
                .bookingId(bookingId)
                .qrToken(qrToken)
                .checkedInAt(LocalDateTime.now())
                .staffId(staffId)
                .build();

        checkIn = checkInRepository.save(checkIn);

        // Delete token from Redis after use
        redisTemplate.delete(redisKey);

        log.info("Check-in completed for booking {} by staff {}", bookingId, staffId);
        return checkIn;
    }

    @Transactional(readOnly = true)
    public Optional<CheckIn> getCheckInByBookingId(Long bookingId) {
        return checkInRepository.findByBookingId(bookingId);
    }

    @Transactional(readOnly = true)
    public boolean isQRTokenValid(String qrToken) {
        String redisKey = QR_TOKEN_PREFIX + qrToken;
        return Boolean.TRUE.equals(redisTemplate.hasKey(redisKey));
    }
}

