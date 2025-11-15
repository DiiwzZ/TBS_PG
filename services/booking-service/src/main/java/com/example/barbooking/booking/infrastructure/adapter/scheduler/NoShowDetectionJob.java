package com.example.barbooking.booking.infrastructure.adapter.scheduler;

import com.example.barbooking.booking.application.BookingManagementService;
import com.example.barbooking.booking.domain.model.Booking;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.quartz.Job;
import org.quartz.JobExecutionContext;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@RequiredArgsConstructor
@Slf4j
public class NoShowDetectionJob implements Job {

    private final BookingManagementService bookingManagementService;

    @Override
    public void execute(JobExecutionContext context) {
        log.info("Starting No-Show Detection Job");

        List<Booking> bookingsToCheck = bookingManagementService.getBookingsForNoShowCheck();
        
        for (Booking booking : bookingsToCheck) {
            if (booking.isNoShowCheckRequired()) {
                log.warn("Marking booking {} as NO_SHOW for user {}", booking.getId(), booking.getUserId());
                bookingManagementService.markBookingAsNoShow(booking.getId());
            }
        }

        log.info("No-Show Detection Job completed. Checked {} bookings", bookingsToCheck.size());
    }
}

