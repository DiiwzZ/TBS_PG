package com.example.barbooking.gateway.filter;

import com.example.barbooking.gateway.security.JwtUtil;
import org.springframework.cloud.gateway.filter.GatewayFilter;
import org.springframework.cloud.gateway.filter.GatewayFilterChain;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.http.server.reactive.ServerHttpResponse;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Mono;

import java.util.List;

@Component
public class JwtAuthenticationFilter implements GatewayFilter {

    private final JwtUtil jwtUtil;

    // List of paths that should skip JWT validation
    private final List<String> skipPaths = List.of(
            "/api/users/login",
            "/api/users/register",
            "/api/zones",   // Allow fetching all zones
            "/api/zones/",  // Allow fetching all zones with trailing slash
            "/api/tables"   // Allow fetching all tables
    );

    public JwtAuthenticationFilter(JwtUtil jwtUtil) {
        this.jwtUtil = jwtUtil;
    }

    @Override
    public Mono<Void> filter(ServerWebExchange exchange, GatewayFilterChain chain) {
        ServerHttpRequest request = exchange.getRequest();
        String path = request.getURI().getPath();

        // Skip validation for public endpoints
        // Check exact matches or prefix matches for dynamic routes
        if (skipPaths.stream().anyMatch(path::equals) || 
            path.startsWith("/api/zones/") || 
            path.startsWith("/api/tables/")) {
            return chain.filter(exchange);
        }

        if (!request.getHeaders().containsKey(HttpHeaders.AUTHORIZATION)) {
            return onError(exchange, "No Authorization header", HttpStatus.UNAUTHORIZED);
        }

        String authHeader = request.getHeaders().getFirst(HttpHeaders.AUTHORIZATION);
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return onError(exchange, "Invalid Authorization header", HttpStatus.UNAUTHORIZED);
        }

        String token = authHeader.substring(7);
        if (!jwtUtil.validateToken(token)) {
            return onError(exchange, "Invalid JWT token", HttpStatus.UNAUTHORIZED);
        }

        return chain.filter(exchange);
    }

    private Mono<Void> onError(ServerWebExchange exchange, String err, HttpStatus httpStatus) {
        ServerHttpResponse response = exchange.getResponse();
        response.setStatusCode(httpStatus);
        return response.setComplete();
    }
}
