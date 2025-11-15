package com.example.barbooking.gateway.config;

import com.example.barbooking.gateway.filter.JwtAuthenticationFilter;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.reactive.EnableWebFluxSecurity;
import org.springframework.security.config.web.server.SecurityWebFiltersOrder;
import org.springframework.security.config.web.server.ServerHttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.server.SecurityWebFilterChain;

@Configuration
@EnableWebFluxSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final JwtAuthenticationFilter jwtAuthenticationFilter;

    @Bean
    public SecurityWebFilterChain securityWebFilterChain(ServerHttpSecurity http) {
        http
                .csrf(csrf -> csrf.disable())
                .authorizeExchange(exchanges -> exchanges
                        // Public endpoints (no authentication required)
                        .pathMatchers("/api/users/register", "/api/users/login", "/actuator/**").permitAll()
                        .pathMatchers("/api/zones/**", "/api/tables/**").permitAll() // Allow viewing zones and tables
                        // Protected user endpoints (authentication required)
                        .pathMatchers("/api/users/me", "/api/users/*/no-show/**").authenticated()
                        // Protected endpoints (authentication required)
                        .pathMatchers("/api/bookings/**", "/api/checkin/**", "/api/payments/**").authenticated()
                        // Allow other user endpoints for now (can be restricted later)
                        .anyExchange().permitAll()
                )
                .addFilterAt(jwtAuthenticationFilter, SecurityWebFiltersOrder.AUTHENTICATION);

        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}

