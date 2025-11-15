# Deployment Configuration

This directory contains Docker Compose configuration for running the Bar Table Booking System infrastructure.

## Services Included

- **MySQL 8.0**: Database server with separate databases for each microservice
- **RabbitMQ 3 (with Management)**: Message broker for event-driven communication
- **Redis 7**: Cache and session storage
- **Prometheus**: Metrics collection and monitoring
- **Grafana**: Metrics visualization and dashboards

## Quick Start

### Start All Infrastructure Services

```bash
docker-compose -f deploy/docker-compose.yaml up -d
```

### Start Specific Services

```bash
# Start only databases
docker-compose -f deploy/docker-compose.yaml up -d mysql

# Start MySQL, RabbitMQ, and Redis
docker-compose -f deploy/docker-compose.yaml up -d mysql rabbitmq redis
```

### Stop All Services

```bash
docker-compose -f deploy/docker-compose.yaml down
```

### Stop and Remove Volumes (Clean State)

```bash
docker-compose -f deploy/docker-compose.yaml down -v
```

## Service Ports

| Service    | Port  | Description                        |
|------------|-------|------------------------------------|
| MySQL      | 3306  | Database server                    |
| RabbitMQ   | 5672  | AMQP protocol                      |
| RabbitMQ   | 15672 | Management UI (guest/guest)        |
| Redis      | 6379  | Cache server                       |
| Prometheus | 9090  | Metrics and monitoring             |
| Grafana    | 3000  | Visualization (admin/admin)        |

## Database Configuration

The system uses separate databases for each microservice:
- `user_db` - User service
- `table_db` - Table service
- `booking_db` - Booking service
- `checkin_db` - Check-in service
- `payment_db` - Payment service

## Health Checks

All services include health checks. You can verify service status with:

```bash
docker-compose -f deploy/docker-compose.yaml ps
```

## Accessing Services

- **RabbitMQ Management**: http://localhost:15672 (guest/guest)
- **Grafana**: http://localhost:3000 (admin/admin)
- **Prometheus**: http://localhost:9090

## Troubleshooting

### View Logs

```bash
# All services
docker-compose -f deploy/docker-compose.yaml logs -f

# Specific service
docker-compose -f deploy/docker-compose.yaml logs -f mysql
```

### Restart a Service

```bash
docker-compose -f deploy/docker-compose.yaml restart mysql
```

### Check Service Health

```bash
docker-compose -f deploy/docker-compose.yaml ps
```

