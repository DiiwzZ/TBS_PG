package com.example.barbooking.user.infrastructure.adapter.web;

import com.example.barbooking.user.application.UserService;
import com.example.barbooking.user.domain.model.User;
import com.example.barbooking.user.infrastructure.adapter.web.dto.AuthResponse;
import com.example.barbooking.user.infrastructure.adapter.web.dto.LoginRequest;
import com.example.barbooking.user.infrastructure.adapter.web.dto.UpdateProfileRequest;
import com.example.barbooking.user.infrastructure.security.JwtTokenProvider;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;
    private final JwtTokenProvider jwtTokenProvider;

    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@Valid @RequestBody RegisterRequest request) {
        User user = userService.registerUser(
                request.username(),
                request.password(),
                request.email(),
                request.fullName(),
                request.phoneNumber()
        );

        // Generate JWT token for the newly registered user
        String token = jwtTokenProvider.generateToken(
                user.getId(),
                user.getUsername(),
                user.getRole().name()
        );

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(AuthResponse.fromUser(user, token, jwtTokenProvider.getExpirationInSeconds()));
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@Valid @RequestBody LoginRequest request) {
        // Authenticate user
        User user = userService.authenticateUser(request.email(), request.password());

        // Generate JWT token
        String token = jwtTokenProvider.generateToken(
                user.getId(),
                user.getUsername(),
                user.getRole().name()
        );

        return ResponseEntity.ok(
                AuthResponse.fromUser(user, token, jwtTokenProvider.getExpirationInSeconds())
        );
    }

    @GetMapping("/me")
    public ResponseEntity<UserResponse> getCurrentUser(@RequestHeader("X-User-Id") Long userId) {
        return userService.findById(userId)
                .map(user -> ResponseEntity.ok(UserResponse.fromUser(user)))
                .orElse(ResponseEntity.status(HttpStatus.UNAUTHORIZED).build());
    }

    @PutMapping("/me")
    public ResponseEntity<UserResponse> updateCurrentUser(
            @RequestHeader("X-User-Id") Long userId,
            @Valid @RequestBody UpdateProfileRequest request) {
        User updatedUser = userService.updateUserProfile(
                userId,
                request.fullName(),
                request.phoneNumber()
        );
        return ResponseEntity.ok(UserResponse.fromUser(updatedUser));
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserResponse> getUserById(@PathVariable Long id) {
        return userService.findById(id)
                .map(user -> ResponseEntity.ok(UserResponse.fromUser(user)))
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/username/{username}")
    public ResponseEntity<UserResponse> getUserByUsername(@PathVariable String username) {
        return userService.findByUsername(username)
                .map(user -> ResponseEntity.ok(UserResponse.fromUser(user)))
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/{id}/no-show/increment")
    public ResponseEntity<Void> incrementNoShowCount(@PathVariable Long id) {
        userService.incrementNoShowCount(id);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/{id}/no-show/reset")
    public ResponseEntity<Void> resetNoShowCount(@PathVariable Long id) {
        userService.resetNoShowCount(id);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/{id}/can-book-free-slot")
    public ResponseEntity<Boolean> canBookFreeSlot(@PathVariable Long id) {
        boolean canBook = userService.canUserBookFreeSlot(id);
        return ResponseEntity.ok(canBook);
    }

    // DTOs
    public record RegisterRequest(
            String username,
            String password,
            String email,
            String fullName,
            String phoneNumber
    ) {}

    public record UserResponse(
            Long id,
            String username,
            String email,
            String fullName,
            String phoneNumber,
            Integer noShowCount,
            Boolean bannedFromFreeSlot,
            Boolean active,
            String role
    ) {
        public static UserResponse fromUser(User user) {
            return new UserResponse(
                    user.getId(),
                    user.getUsername(),
                    user.getEmail(),
                    user.getFullName(),
                    user.getPhoneNumber(),
                    user.getNoShowCount(),
                    user.getBannedFromFreeSlot(),
                    user.getActive(),
                    user.getRole().name()
            );
        }
    }
}

