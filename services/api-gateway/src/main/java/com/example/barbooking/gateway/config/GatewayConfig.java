package com.example.barbooking.gateway.config;

import org.springframework.cloud.gateway.route.RouteLocator;
import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class GatewayConfig {

    @Bean
    public RouteLocator customRouteLocator(RouteLocatorBuilder builder) {
        return builder.routes()
                // User Service Routes
                .route("user-service", r -> r
                        .path("/api/users/**")
                        .uri("http://localhost:8081"))
                
                // Table Service Routes
                .route("table-service-zones", r -> r
                        .path("/api/zones/**")
                        .uri("http://localhost:8082"))
                .route("table-service-tables", r -> r
                        .path("/api/tables/**")
                        .uri("http://localhost:8082"))
                
                // Booking Service Routes
                .route("booking-service", r -> r
                        .path("/api/bookings/**")
                        .uri("http://localhost:8083"))
                
                // Check-in Service Routes
                .route("checkin-service", r -> r
                        .path("/api/checkin/**")
                        .uri("http://localhost:8084"))
                
                // Payment Service Routes
                .route("payment-service", r -> r
                        .path("/api/payments/**")
                        .uri("http://localhost:8085"))
                
                .build();
    }
}

