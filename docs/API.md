# API Documentation

Base URL: `http://localhost:8080` (API Gateway)

## 🔐 Authentication

### Register

สร้าง user account ใหม่

**Endpoint:** `POST /api/users/register`

**Request Body:**
```json
{
  "username": "johndoe",
  "email": "john@example.com",
  "password": "password123",
  "fullName": "johndoe",
  "phoneNumber": "0812345678"
}
```

**Validation Rules:**
- `username`: 3-14 characters, alphanumeric and underscore only
- `email`: Valid email format
- `password`: Minimum 6 characters
- `phoneNumber`: Exactly 10 digits, numbers only

**Response:** `201 Created`
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "userId": 1,
  "username": "johndoe",
  "email": "john@example.com",
  "fullName": "johndoe",
  "role": "CUSTOMER",
  "expiresIn": 86400
}
```

---

### Login

Login เข้าสู่ระบบ

**Endpoint:** `POST /api/users/login`

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:** `200 OK`
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "userId": 1,
  "username": "johndoe",
  "email": "john@example.com",
  "fullName": "johndoe",
  "role": "CUSTOMER",
  "expiresIn": 86400
}
```

**Error Response:** `401 Unauthorized`
```json
{
  "message": "Invalid email or password"
}
```

---

### Get Current User

ดึงข้อมูล user ที่ login อยู่

**Endpoint:** `GET /api/users/me`

**Headers:**
```
Authorization: Bearer {token}
```

**Response:** `200 OK`
```json
{
  "id": 1,
  "username": "johndoe",
  "email": "john@example.com",
  "fullName": "johndoe",
  "phoneNumber": "0812345678",
  "noShowCount": 0,
  "bannedFromFreeSlot": false,
  "active": true,
  "role": "CUSTOMER"
}
```

---

### Update Profile

แก้ไขข้อมูล profile

**Endpoint:** `PUT /api/users/me`

**Headers:**
```
Authorization: Bearer {token}
```

**Request Body:**
```json
{
  "fullName": "John Doe Updated",
  "phoneNumber": "0898765432"
}
```

**Response:** `200 OK`
```json
{
  "id": 1,
  "username": "johndoe",
  "email": "john@example.com",
  "fullName": "John Doe Updated",
  "phoneNumber": "0898765432",
  "noShowCount": 0,
  "bannedFromFreeSlot": false,
  "active": true,
  "role": "CUSTOMER"
}
```

---

## 🪑 Table Management

### Get Active Zones

ดึงรายการ zones ทั้งหมด

**Endpoint:** `GET /api/zones/active`

**Response:** `200 OK`
```json
[
  {
    "id": 1,
    "name": "Indoor",
    "description": "Indoor seating area",
    "active": true
  },
  {
    "id": 2,
    "name": "Outdoor",
    "description": "Outdoor terrace",
    "active": true
  }
]
```

---

### Get Tables by Zone

ดึงรายการโต๊ะในแต่ละ zone

**Endpoint:** `GET /api/tables?zoneId={zoneId}`

**Response:** `200 OK`
```json
[
  {
    "id": 1,
    "tableNumber": "T01",
    "capacity": 4,
    "zoneId": 1,
    "zoneName": "Indoor",
    "available": true
  }
]
```

---

## 📅 Booking (Coming Soon)

### Create Booking

**Endpoint:** `POST /api/bookings`

### Get My Bookings

**Endpoint:** `GET /api/bookings/my`

### Cancel Booking

**Endpoint:** `PUT /api/bookings/{id}/cancel`

---

## ✅ Check-in (Coming Soon)

### Generate QR Code

**Endpoint:** `POST /api/checkin/generate`

### Scan QR Code

**Endpoint:** `POST /api/checkin/scan`

---

## 💳 Payment (Coming Soon)

### Create Payment

**Endpoint:** `POST /api/payments`

### Get Payment Status

**Endpoint:** `GET /api/payments/{id}`

---

## 🔍 Common Error Responses

### 400 Bad Request
```json
{
  "message": "Validation failed",
  "errors": [
    {
      "field": "username",
      "message": "Username must be 3-14 characters"
    }
  ]
}
```

### 401 Unauthorized
```json
{
  "message": "Invalid or expired token"
}
```

### 403 Forbidden
```json
{
  "message": "Access denied"
}
```

### 404 Not Found
```json
{
  "message": "Resource not found"
}
```

### 500 Internal Server Error
```json
{
  "message": "An unexpected error occurred"
}
```

---

## 📝 Notes

- All timestamps are in ISO 8601 format (UTC)
- JWT tokens expire after 24 hours
- Rate limiting: 100 requests per minute per IP
- API versioning: Currently v1 (implicit in path)

