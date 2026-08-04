# Security & Compliance Model
## Astygma Hope Clinic - Infrastructure Security

### 1. Data Protection & Privacy Principles
- **Patient Data Privacy**: All appointment queries and patient notes are transmitted over SSL/TLS 1.3 encryption.
- **Zero Online Payment Storage**: No credit card or PCI-DSS exposure since appointments are request-based without financial transactions.
- **Protected Healing Sound Vault**: Password-gated audio streams preventing hotlinking or unauthorized distribution.
- **RBAC Enforcement**: Middleware level authentication checks on `/portal/*` routes.

---

### 2. Role-Based Access Control (RBAC) Matrix
```
[Unauthenticated Patient] ---> Public Pages, Booking Form, Sound Login Gate
[Authenticated Patient]   ---> My Appointments, Sound Vault Access
[Receptionist]            ---> Triage Queue, Booking Status Toggles, WhatsApp Alerts
[Doctor (Dr. Umesh)]      ---> Patient Consultation Queue, Clinical Notes
[Clinic Admin / Super]    ---> Full CMS, Theme Engine, System Settings, Staff Management
```
