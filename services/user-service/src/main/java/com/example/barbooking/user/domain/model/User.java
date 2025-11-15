package com.example.barbooking.user.domain.model;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "users")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true, length = 50)
    private String username;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false, length = 100)
    private String email;

    @Column(nullable = false, length = 50)
    private String fullName;

    @Column(nullable = false, length = 20)
    private String phoneNumber;

    @Column(nullable = false)
    @Builder.Default
    private Integer noShowCount = 0;

    @Column(nullable = false)
    @Builder.Default
    private Boolean bannedFromFreeSlot = false;

    @Column(nullable = false)
    @Builder.Default
    private Boolean active = true;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    @Builder.Default
    private UserRole role = UserRole.CUSTOMER;

    @CreationTimestamp
    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(nullable = false)
    private LocalDateTime updatedAt;

    public enum UserRole {
        CUSTOMER,
        STAFF,
        ADMIN
    }

    // Business logic methods
    public void incrementNoShowCount() {
        this.noShowCount++;
        if (this.noShowCount >= 3) {
            this.bannedFromFreeSlot = true;
        }
    }

    public void resetNoShowCount() {
        this.noShowCount = 0;
        this.bannedFromFreeSlot = false;
    }

    public boolean canBookFreeSlot() {
        return !this.bannedFromFreeSlot && this.active;
    }
}

