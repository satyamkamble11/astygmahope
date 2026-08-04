# Database Design & Schema Architecture
## Astygma Hope Clinic - Relational Schema (PostgreSQL / Prisma)

```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

enum Role {
  SUPER_ADMIN
  CLINIC_ADMIN
  DOCTOR
  RECEPTIONIST
  LAB_STAFF
  PATIENT
}

enum AppointmentStatus {
  PENDING
  APPROVED
  COMPLETED
  CANCELLED
  RESCHEDULED
}

enum PostCategory {
  STORY
  BLOG
  HEALTH_TIP
  FESTIVAL_BANNER
  HEALTH_CAMP
}

enum SoundCategory {
  MEDITATION
  PREGNANCY
  HEALING
  RELAXATION
  YOGA
  NATURE
}

model User {
  id            String         @id @default(cuid())
  name          String
  email         String         @unique
  phone         String
  passwordHash  String
  role          Role           @default(PATIENT)
  createdAt     DateTime       @default(now())
  updatedAt     DateTime       @updatedAt
  appointments  Appointment[]  @relation("PatientAppointments")
  doctorLogs    Appointment[]  @relation("DoctorAppointments")
}

model Appointment {
  id              String            @id @default(cuid())
  patientName     String
  patientPhone    String
  patientEmail    String?
  serviceName     String
  preferredDate   String
  preferredTime   String
  notes           String?
  status          AppointmentStatus @default(PENDING)
  patientId       String?
  patient         User?             @relation("PatientAppointments", fields: [patientId], references: [id])
  doctorId        String?
  doctor          User?             @relation("DoctorAppointments", fields: [doctorId], references: [id])
  receptionNotes  String?
  createdAt       DateTime          @default(now())
  updatedAt       DateTime          @updatedAt
}

model SoundTrack {
  id          String        @id @default(cuid())
  title       String
  category    SoundCategory
  filePath    String
  duration    String
  isProtected Boolean       @default(true)
  createdAt   DateTime      @default(now())
}

model CMSPost {
  id          String       @id @default(cuid())
  title       String
  category    PostCategory
  mediaUrl    String?
  mediaType   String       @default("image") // image | video | carousel
  content     String
  author      String       @default("Dr. Umesh D Kalekar")
  isPublished Boolean      @default(true)
  createdAt   DateTime     @default(now())
}

model ThemeSetting {
  id           String   @id @default("default")
  themeName    String   @default("light")
  primaryColor String   @default("#0F4C3A")
  fontFamily   String   @default("Inter")
  updatedAt    DateTime @updatedAt
}
```
