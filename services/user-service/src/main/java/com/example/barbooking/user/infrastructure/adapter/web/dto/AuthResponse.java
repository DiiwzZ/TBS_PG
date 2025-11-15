package com.example.barbooking.user.infrastructure.adapter.web.dto;

import com.example.barbooking.user.domain.model.User;
import lombok.Builder;

@Builder
public record AuthResponse(
        String token,
        Long userId,
        String username,
        String email,
        String fullName,
        String role,
        long expiresIn
) {
    public static AuthResponse fromUser(User user, String token, long expiresIn) {
        return AuthResponse.builder()
                .token(token)
                .userId(user.getId())
                .username(user.getUsername())
                .email(user.getEmail())
                .fullName(user.getFullName())
                .role(user.getRole().name())
                .expiresIn(expiresIn)
                .build();
    }
}

