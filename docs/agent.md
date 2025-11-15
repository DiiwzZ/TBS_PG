# Agent Documentation

This document contains additional documentation and notes for the Bar Table Booking System.

## Architecture Overview

This system follows a Service-Oriented Architecture (SOA) with the following services:

1. **API Gateway** - Entry point for all client requests
2. **User Service** - User management and authentication
3. **Table Service** - Table and zone inventory management
4. **Booking Service** - Booking logic and no-show detection
5. **Check-in Service** - QR code scanning and check-in
6. **Payment Service** - Mock payment processing

## Development Guidelines

- Follow Hexagonal Architecture pattern for each service
- Use Flyway for database migrations
- Implement proper error handling and logging
- Write unit tests for business logic
- Use Testcontainers for integration tests

## TODO

- Implement full business logic for each service
- Add comprehensive error handling
- Implement security policies
- Add monitoring and alerting
- Write API documentation

