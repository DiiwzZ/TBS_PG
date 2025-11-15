package com.example.barbooking.user.application;

import com.example.barbooking.user.domain.model.User;
import com.example.barbooking.user.domain.port.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public User registerUser(String username, String password, String email, String fullName, String phoneNumber) {
        // Check if user already exists
        if (userRepository.existsByUsername(username)) {
            throw new IllegalArgumentException("Username already exists");
        }
        if (userRepository.existsByEmail(email)) {
            throw new IllegalArgumentException("Email already exists");
        }

        // Create new user
        User user = User.builder()
                .username(username)
                .password(passwordEncoder.encode(password))
                .email(email)
                .fullName(fullName)
                .phoneNumber(phoneNumber)
                .role(User.UserRole.CUSTOMER)
                .build();

        return userRepository.save(user);
    }

    @Transactional(readOnly = true)
    public Optional<User> findByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    @Transactional(readOnly = true)
    public Optional<User> findById(Long id) {
        return userRepository.findById(id);
    }

    public void incrementNoShowCount(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
        user.incrementNoShowCount();
        userRepository.save(user);
    }

    public void resetNoShowCount(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
        user.resetNoShowCount();
        userRepository.save(user);
    }

    @Transactional(readOnly = true)
    public boolean canUserBookFreeSlot(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
        return user.canBookFreeSlot();
    }

    /**
     * Authenticate user with email and password
     */
    @Transactional(readOnly = true)
    public User authenticateUser(String email, String password) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new BadCredentialsException("Invalid email or password"));

        if (!passwordEncoder.matches(password, user.getPassword())) {
            throw new BadCredentialsException("Invalid email or password");
        }

        if (!user.getActive()) {
            throw new IllegalStateException("User account is inactive");
        }

        return user;
    }

    /**
     * Find user by email
     */
    @Transactional(readOnly = true)
    public Optional<User> findByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    /**
     * Update user profile
     */
    public User updateUserProfile(Long userId, String fullName, String phoneNumber) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        if (fullName != null && !fullName.isBlank()) {
            user.setFullName(fullName);
        }
        if (phoneNumber != null && !phoneNumber.isBlank()) {
            user.setPhoneNumber(phoneNumber);
        }

        return userRepository.save(user);
    }
}

