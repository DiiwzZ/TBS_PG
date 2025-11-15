package com.example.barbooking.user.domain.port;

import com.example.barbooking.user.domain.model.User;

import java.util.Optional;

/**
 * Repository interface for User entity (Port in Hexagonal Architecture)
 */
public interface UserRepository {

    User save(User user);

    Optional<User> findById(Long id);

    Optional<User> findByUsername(String username);

    Optional<User> findByEmail(String email);

    boolean existsByUsername(String username);

    boolean existsByEmail(String email);

    void deleteById(Long id);
}

