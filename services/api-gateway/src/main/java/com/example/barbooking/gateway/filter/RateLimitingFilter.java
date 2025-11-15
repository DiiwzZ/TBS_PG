package com.example.barbooking.gateway.filter;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.ReactiveStringRedisTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;
import org.springframework.web.server.WebFilter;
import org.springframework.web.server.WebFilterChain;
import reactor.core.publisher.Mono;

import java.time.Duration;

@Component
@RequiredArgsConstructor
@Slf4j
public class RateLimitingFilter implements WebFilter {

    private final ReactiveStringRedisTemplate redisTemplate;
    
    private static final int MAX_REQUESTS_PER_MINUTE = 60;
    private static final String RATE_LIMIT_KEY_PREFIX = "rate_limit:";

    @Override
    public Mono<Void> filter(ServerWebExchange exchange, WebFilterChain chain) {
        String clientIp = exchange.getRequest().getRemoteAddress() != null 
                ? exchange.getRequest().getRemoteAddress().getAddress().getHostAddress()
                : "unknown";
        
        String key = RATE_LIMIT_KEY_PREFIX + clientIp;

        return redisTemplate.opsForValue()
                .increment(key)
                .flatMap(count -> {
                    if (count == 1) {
                        // Set expiry on first request
                        return redisTemplate.expire(key, Duration.ofMinutes(1))
                                .flatMap(success -> processRequest(exchange, chain, count));
                    } else {
                        return processRequest(exchange, chain, count);
                    }
                })
                .onErrorResume(e -> {
                    log.error("Rate limiting error: {}", e.getMessage());
                    // If Redis is down, allow the request
                    return chain.filter(exchange);
                });
    }

    private Mono<Void> processRequest(ServerWebExchange exchange, WebFilterChain chain, Long count) {
        if (count > MAX_REQUESTS_PER_MINUTE) {
            log.warn("Rate limit exceeded for IP: {}", 
                    exchange.getRequest().getRemoteAddress());
            exchange.getResponse().setStatusCode(HttpStatus.TOO_MANY_REQUESTS);
            return exchange.getResponse().setComplete();
        }
        
        return chain.filter(exchange);
    }
}

