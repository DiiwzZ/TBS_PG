package com.example.barbooking.booking.infrastructure.config;

import com.example.barbooking.booking.infrastructure.adapter.scheduler.NoShowDetectionJob;
import org.quartz.*;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class QuartzConfig {

    @Bean
    public JobDetail noShowDetectionJobDetail() {
        return JobBuilder.newJob(NoShowDetectionJob.class)
                .withIdentity("noShowDetectionJob")
                .withDescription("Detect no-show bookings past grace period")
                .storeDurably()
                .build();
    }

    @Bean
    public Trigger noShowDetectionTrigger() {
        // Run every 5 minutes
        return TriggerBuilder.newTrigger()
                .forJob(noShowDetectionJobDetail())
                .withIdentity("noShowDetectionTrigger")
                .withDescription("Trigger for no-show detection")
                .withSchedule(CronScheduleBuilder.cronSchedule("0 */5 * * * ?"))
                .build();
    }
}

