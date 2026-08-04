# API Documentation & Endpoint Specifications
## Astygma Hope Clinic - REST & Server Action Endpoints

### 1. Appointment Management Endpoints

#### `POST /api/appointments/request`
- **Description**: Submits a patient appointment request without online payment friction.
- **Access**: Public
- **Request Body**:
```json
{
  "patientName": "Sunita Patil",
  "patientPhone": "+91 9876543210",
  "patientEmail": "sunita@example.com",
  "serviceName": "Female Infertility",
  "preferredDate": "2026-08-05",
  "preferredTime": "11:00 AM",
  "notes": "First consultation request."
}
```
- **Response** (`201 Created`):
```json
{
  "success": true,
  "appointmentId": "apt_9821739812",
  "message": "Appointment request submitted successfully. Reception will verify shortly.",
  "whatsAppPayloadUrl": "https://wa.me/917522900512?text=New%20Appointment%20Request..."
}
```

#### `GET /api/appointments/queue`
- **Description**: Fetches pending and approved appointment queue for reception triage.
- **Access**: Authorized (`RECEPTIONIST`, `CLINIC_ADMIN`, `SUPER_ADMIN`)

#### `PATCH /api/appointments/:id/status`
- **Description**: Updates appointment status (`APPROVED`, `COMPLETED`, `CANCELLED`).
- **Access**: Authorized (`RECEPTIONIST`, `DOCTOR`, `CLINIC_ADMIN`)

---

### 2. Healing Sound Vault Endpoints

#### `POST /api/sound-vault/verify-passcode`
- **Description**: Verifies client passcode before unlocking audio stream URLs.
- **Request Body**: `{ "passcode": "HOPE2026" }`
- **Response** (`200 OK`): `{ "unlocked": true, "token": "jwt_vault_access..." }`

---

### 3. CMS & Content Endpoints

#### `GET /api/cms/posts`
- **Description**: Fetches published stories, blogs, videos, and festival banners.
- **Query Params**: `?category=STORY|BLOG|HEALTH_TIP|FESTIVAL_BANNER`
