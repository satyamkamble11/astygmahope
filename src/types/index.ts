export type Role = 'SUPER_ADMIN' | 'CLINIC_ADMIN' | 'DOCTOR' | 'RECEPTIONIST' | 'LAB_STAFF' | 'PATIENT';

export type AppointmentStatus = 'PENDING' | 'APPROVED' | 'COMPLETED' | 'CANCELLED' | 'RESCHEDULED';

export interface Doctor {
  id: string;
  name: string;
  role: string;
  title: string;
  experience: string;
  qualifications: string[];
  bio: string;
  highlights: string[];
  imagePath: string;
  isFounder?: boolean;
}

export interface ServiceItem {
  id: string;
  title: string;
  category: 'clinical' | 'holistic' | 'educational';
  shortDesc: string;
  fullDesc: string;
  benefits: string[];
  iconName: string;
  imagePath?: string;
}

export type BranchName = 'Shirol Branch (Main HQ)' | 'Kolhapur Branch';
export type PaymentMode = 'ONLINE' | 'OFFLINE';

export interface AppointmentRequest {
  id: string;
  patientName: string;
  patientPhone: string;
  patientCity: string;
  patientEmail?: string;
  doctorName?: string;
  serviceName?: string;
  branch: BranchName;
  preferredDate: string;
  preferredTime: string;
  paymentMode: PaymentMode;
  consultationFee: number;
  notes?: string;
  senderMobile?: string;
  utrId?: string;
  status: AppointmentStatus;
  createdAt: string;
}

export type SoundCategory = 'Meditation' | 'Pregnancy' | 'Healing' | 'Relaxation' | 'Yoga' | 'Nature';

export interface SoundTrack {
  id: string;
  title: string;
  category: SoundCategory;
  duration: string;
  filePath: string;
  frequencyHz?: number;
  description: string;
  isCustomUploaded?: boolean;
}

export type CMSCategory = 'Story' | 'Carousel' | 'Blog' | 'HealthTip' | 'FestivalBanner' | 'HealthCamp';

export interface CMSPost {
  id: string;
  title: string;
  category: CMSCategory;
  content: string;
  mediaUrl?: string;
  mediaType: 'image' | 'video' | 'carousel';
  mediaList?: string[];
  date: string;
  author: string;
  likes: number;
}

export type ThemeMode = 'light' | 'dark' | 'diwali' | 'navratri';
export type Language = 'EN' | 'MR' | 'HI';

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  rating: number; // 1-5
  review: string;
  service?: string;
  imagePath?: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: string;
  path: string;
  desc?: string;
  isVideo?: boolean;
}

export interface Course {
  id: string;
  title: string;
  category: 'All' | 'Free' | 'Paid' | 'Certificates';
  instructor: string;
  duration: string;
  description: string;
  includes: string[];
  isPaid: boolean;
  price?: string;
}

export interface Faq {
  id: string;
  question: string;
  answer: string;
  category?: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  phone: string;
  email?: string;
  message: string;
  isRead?: boolean;
  createdAt: string;
}

export interface BranchInfo {
  name: BranchName;
  address: string;
  landmark: string;
  distanceInfo: string;
  daysAvailable: string;
  hours: string;
  gmapsUrl: string;
  hasSonography: boolean;
  imagePath: string;
}

export interface ClinicConfig {
  name: string;
  branch: string;
  phone: string;
  whatsApp: string;
  email: string;
  workingHours: string;
  workingDays: string;
  closedDay: string;
  address: {
    line1: string;
    line2: string;
    landmark: string;
    city: string;
    state: string;
    pincode: string;
    country: string;
  };
  socials: {
    instagram: string;
    facebook: string;
    youtube: string;
  };
  branches: {
    shirol: BranchInfo;
    kolhapur: BranchInfo;
  };
}
