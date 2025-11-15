package com.example.barbooking.user.infrastructure.adapter.web;

import com.example.barbooking.user.application.UserService;
import com.example.barbooking.user.domain.model.User;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @PostMapping("/register")
    public ResponseEntity<UserResponse> register(@RequestBody RegisterRequest request) {
        User user = userService.registerUser(
                request.username(),
                request.password(),
                request.email(),
                request.fullName(),
                request.phoneNumber()
        );
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(UserResponse.fromUser(user));
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

