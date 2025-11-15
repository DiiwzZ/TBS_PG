package com.example.barbooking.booking.domain.model;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "bookings")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Booking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Long userId;

    @Column
    private Long tableId; // For premium bookings

    @Column
    private Long zoneId; // For normal bookings

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private BookingType bookingType;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private TimeSlot timeSlot;

    @Column(nullable = false)
    private LocalDateTime bookingDate;

    @Column(nullable = false)
    private Integer guestCount;

    @Column(nullable = false)
    private Double fee;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    @Builder.Default
    private BookingStatus status = BookingStatus.PENDING;

    @Column
    private Long paymentId;

    @Column
    private LocalDateTime checkedInAt;

    @CreationTimestamp
    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(nullable = false)
    private LocalDateTime updatedAt;

    public enum BookingType {
        NORMAL,   // Book by zone
        PREMIUM   // Book specific table
    }

    public enum TimeSlot {
        SLOT_20_00(20, 0.0),    // 20:00 - Free
        SLOT_21_00(21, 500.0),  // 21:00 - 500 Baht
        SLOT_22_00(22, 1000.0); // 22:00 - 1000 Baht

        private final int hour;
        private final double fee;

        TimeSlot(int hour, double fee) {
            this.hour = hour;
            this.fee = fee;
        }

        public int getHour() {
            return hour;
        }

        public double getFee() {
            return fee;
        }

        public LocalDateTime getSlotDateTime(LocalDateTime date) {
            return date.withHour(hour).withMinute(0).withSecond(0).withNano(0);
        }

        public LocalDateTime getGracePeriodEnd(LocalDateTime date) {
            return getSlotDateTime(date).plusMinutes(15);
        }
    }

    public enum BookingStatus {
        PENDING,        // Waiting for payment
        CONFIRMED,      // Payment confirmed
        CHECKED_IN,     // Customer checked in
        COMPLETED,      // Booking completed
        CANCELLED,      // Cancelled by user
        NO_SHOW         // Customer didn't show up
    }

    // Business logic methods
    public void confirm(Long paymentId) {
        if (this.status != BookingStatus.PENDING) {
            throw new IllegalStateException("Can only confirm pending bookings");
        }
        this.status = BookingStatus.CONFIRMED;
        this.paymentId = paymentId;
    }

    public void checkIn() {
        if (this.status != BookingStatus.CONFIRMED) {
            throw new IllegalStateException("Can only check-in confirmed bookings");
        }
        this.status = BookingStatus.CHECKED_IN;
        this.checkedInAt = LocalDateTime.now();
    }

    public void complete() {
        if (this.status != BookingStatus.CHECKED_IN) {
            throw new IllegalStateException("Can only complete checked-in bookings");
        }
        this.status = BookingStatus.COMPLETED;
    }

    public void cancel() {
        if (this.status == BookingStatus.COMPLETED || this.status == BookingStatus.NO_SHOW) {
            throw new IllegalStateException("Cannot cancel completed or no-show bookings");
        }
        this.status = BookingStatus.CANCELLED;
    }

    public void markAsNoShow() {
        if (this.status != BookingStatus.CONFIRMED) {
            throw new IllegalStateException("Can only mark confirmed bookings as no-show");
        }
        this.status = BookingStatus.NO_SHOW;
    }

    public boolean isNoShowCheckRequired() {
        return this.status == BookingStatus.CONFIRMED &&
               LocalDateTime.now().isAfter(timeSlot.getGracePeriodEnd(bookingDate));
    }

    public boolean isFreeSlot() {
        return this.timeSlot == TimeSlot.SLOT_20_00;
    }
}

