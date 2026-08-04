# Product Requirements Document (PRD)
## Astygma Hope Clinic - Enterprise Platform

### 1. Functional Scope Overview
The platform encompasses six core modules:
1. **Public Web Portal**: Modern Apple/Tesla-level UI featuring Founder profile, Sonography section (supporting dedicated video folder uploads), Treatment explanations, and Clinic Branch info.
2. **Appointment Triage System**: No-payment appointment booking engine with auto-notifications to Reception & direct WhatsApp confirmation dispatch.
3. **Password-Protected Healing Sound Vault**: High-fidelity web audio player supporting MP3, WAV, FLAC across 6 categories (Meditation, Pregnancy, Healing, Relaxation, Yoga, Nature).
4. **Instagram-Style Social CMS**: Dynamic stories, video carousels, health tips, festival banners, and camp events.
5. **Theme & Localization Engine**: 1-click switcher supporting Light, Dark, Festival (Diwali, Navratri), and Custom Typography in English, Marathi, and Hindi.
6. **Multi-Role Portal Suite**: Super Admin, Clinic Admin, Doctor, Receptionist, Lab Staff, Patient.

---

### 2. Feature Specification Matrix

| Module | Feature ID | Description | Acceptance Criteria |
|---|---|---|---|
| Appointment | APP-01 | Request Triage Form | Collects Name, Phone, Service, Preferred Date/Time. No payment gate. |
| Appointment | APP-02 | Reception Alert & Approval | Instantly adds booking to Reception Queue; provides Approve/Reject/Reschedule actions. |
| Appointment | APP-03 | WhatsApp Confirmation | Triggers pre-formatted `https://wa.me/917522900512` payload on booking request. |
| Sound Vault | SND-01 | Security Password Lock | Prompts user for authorized vault access key before granting stream access. |
| Sound Vault | SND-02 | Web Audio Player | Embedded audio engine with play/pause, seek, volume, visualizer, category filter. |
| CMS Engine | CMS-01 | Instagram Stories View | Vertical story viewer with auto-progress bar and tap navigation. |
| CMS Engine | CMS-02 | Feed & Carousels | Card grid supporting videos, image carousels, blog posts, health camp alerts. |
| Localization | LOC-01 | Multilingual UI | Instant translation toggle between English (EN), Marathi (MR), Hindi (HI). |
| Theme | THM-01 | Dynamic Theme Manager | Real-time theme switching (Light, Dark, Festival) with custom font scaling. |

---

### 3. User Roles & RBAC Matrix

| Role | Appointments | Sound Vault | CMS Publishing | Theme Config | System Settings |
|---|---|---|---|---|---|
| Super Admin | Full Access | Full Access | Full Access | Full Access | Full Access |
| Clinic Admin | Manage | Manage | Manage | Manage | View |
| Doctor | View / Approve | View | View | View | None |
| Receptionist | Full Triage | None | View | None | None |
| Lab Staff | View Patient | None | None | None | None |
| Patient | Request Only | Stream Only | View Public | Personalize | Profile Only |
