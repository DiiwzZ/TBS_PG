package com.example.barbooking.user.infrastructure.adapter.web.dto;

public record UpdateProfileRequest(
        String fullName,
        String phoneNumber
) {}

