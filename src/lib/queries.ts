import { api } from './api';
import type {
  AppointmentStatus,
  BranchName,
  PaymentMode,
  PostCategory,
  SoundCategory,
  GalleryCategory,
} from './database.types';

// ---------------------------------------------------------------------------
// Row-level types returned by the backend (mirrors Supabase schema)
// ---------------------------------------------------------------------------
export interface AppointmentRow {
  id: string;
  patient_name: string;
  patient_phone: string;
  patient_city: string;
  patient_email: string | null;
  doctor_name: string | null;
  service_name: string | null;
  branch: BranchName;
  preferred_date: string;
  preferred_time: string;
  payment_mode: PaymentMode;
  consultation_fee: number;
  notes: string | null;
  sender_mobile: string | null;
  utr_id: string | null;
  status: AppointmentStatus;
  created_by: string | null;
  created_at: string;
  updated_at: string;
}

export interface DoctorRow {
  id: string;
  name: string;
  role: string | null;
  title: string | null;
  experience: string | null;
  qualifications: string[];
  bio: string | null;
  highlights: string[];
  image_path: string | null;
  is_founder: boolean;
  display_order: number;
}

export interface ServiceRow {
  id: string;
  slug: string;
  title: string;
  category: 'clinical' | 'holistic' | 'educational';
  short_desc: string;
  full_desc: string;
  benefits: string[];
  icon_name: string;
  image_path: string | null;
  display_order: number;
}

export interface TestimonialRow {
  id: string;
  name: string;
  location: string | null;
  rating: number;
  review: string;
  service: string | null;
  image_path: string | null;
  display_order: number;
}

export interface GalleryItemRow {
  id: string;
  title: string;
  category: GalleryCategory;
  path: string;
  description: string | null;
  is_video: boolean;
  display_order: number;
}

export interface BlogPostRow {
  id: string;
  title: string;
  category: PostCategory;
  content: string;
  media_url: string | null;
  media_type: string;
  media_list: string[];
  author: string;
  likes: number;
  published_at: string | null;
  created_at: string;
}

export interface SoundTrackRow {
  id: string;
  title: string;
  category: SoundCategory;
  duration: string;
  file_path: string;
  frequency_hz: number | null;
  description: string | null;
  is_custom_uploaded: boolean;
  is_protected: boolean;
  display_order: number;
}

export interface CourseRow {
  id: string;
  title: string;
  category: string;
  instructor: string;
  duration: string;
  description: string;
  includes: string[];
  is_paid: boolean;
  price: string | null;
  display_order: number;
}

export interface FaqRow {
  id: string;
  question: string;
  answer: string;
  category: string | null;
  display_order: number;
}

export interface SettingsRow {
  [key: string]: unknown;
}

// ---------------------------------------------------------------------------
// Auth
// ---------------------------------------------------------------------------
export interface LoginResponse {
  token: string;
  user: {
    id: string;
    email: string;
    fullName: string;
    role: string;
    phone?: string | null;
  };
}

export async function login(email: string, password: string): Promise<LoginResponse> {
  return api<LoginResponse>('/auth/login', { method: 'POST', body: { email, password } });
}

export async function fetchProfile(): Promise<{ id: string; email: string; fullName: string; role: string; phone?: string | null }> {
  return api('/auth/profile', { auth: true });
}

// ---------------------------------------------------------------------------
// Appointments
// ---------------------------------------------------------------------------
export interface NewAppointmentInput {
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
}

export async function fetchAppointments(): Promise<AppointmentRow[]> {
  return api<AppointmentRow[]>('/appointments', { auth: true });
}

export async function createAppointment(input: NewAppointmentInput): Promise<AppointmentRow> {
  return api<AppointmentRow>('/appointments', { method: 'POST', body: input });
}

export async function updateAppointmentStatus(
  id: string,
  status: AppointmentStatus
): Promise<AppointmentRow> {
  return api<AppointmentRow>(`/appointments/${id}/status`, {
    method: 'PATCH',
    body: { status },
    auth: true,
  });
}

// ---------------------------------------------------------------------------
// Public content
// ---------------------------------------------------------------------------
export async function fetchDoctors(): Promise<DoctorRow[]> {
  return api<DoctorRow[]>('/doctors');
}

export async function fetchServices(): Promise<ServiceRow[]> {
  return api<ServiceRow[]>('/services');
}

export async function fetchTestimonials(): Promise<TestimonialRow[]> {
  return api<TestimonialRow[]>('/testimonials');
}

export async function fetchGallery(Category?: GalleryCategory): Promise<GalleryItemRow[]> {
  const qs = Category ? `?category=${encodeURIComponent(Category)}` : '';
  return api<GalleryItemRow[]>(`/gallery${qs}`);
}

export async function fetchBlogPosts(): Promise<BlogPostRow[]> {
  return api<BlogPostRow[]>('/blog-posts');
}

export async function fetchSoundTracks(): Promise<SoundTrackRow[]> {
  return api<SoundTrackRow[]>('/sound-tracks');
}

export async function fetchCourses(): Promise<CourseRow[]> {
  return api<CourseRow[]>('/courses');
}

export async function fetchFaqs(): Promise<FaqRow[]> {
  return api<FaqRow[]>('/faqs');
}

export async function fetchSettings(): Promise<SettingsRow> {
  return api<SettingsRow>('/settings');
}

// ---------------------------------------------------------------------------
// Admin / CMS
// ---------------------------------------------------------------------------
export interface NewBlogPostInput {
  title: string;
  category: PostCategory;
  content: string;
  mediaUrl?: string;
  mediaType?: 'image' | 'video' | 'carousel';
  mediaList?: string[];
  author: string;
}

export async function createBlogPost(input: NewBlogPostInput): Promise<BlogPostRow> {
  return api<BlogPostRow>('/cms/posts', { method: 'POST', body: input, auth: true });
}

export interface NewSoundTrackInput {
  title: string;
  category: SoundCategory;
  duration: string;
  filePath: string;
  frequencyHz?: number;
  description?: string;
}

export async function createSoundTrack(input: NewSoundTrackInput): Promise<SoundTrackRow> {
  return api<SoundTrackRow>('/cms/sound-tracks', { method: 'POST', body: input, auth: true });
}

// ---------------------------------------------------------------------------
// Contact / Feedback
// ---------------------------------------------------------------------------
export interface NewContactMessageInput {
  name: string;
  phone: string;
  email?: string;
  message: string;
}

export async function createContactMessage(input: NewContactMessageInput): Promise<unknown> {
  return api('/contact-messages', { method: 'POST', body: input });
}

export interface NewFeedbackInput {
  name: string;
  rating: number;
  text: string;
}

export async function createFeedback(input: NewFeedbackInput): Promise<unknown> {
  return api('/feedback', { method: 'POST', body: input });
}

export async function fetchApprovedFeedback(): Promise<Array<{ id: string; name: string; text: string; rating: number }>> {
  try {
    const testimonials = await fetchTestimonials();
    return testimonials.map(t => ({
      id: t.id,
      name: t.name,
      text: t.review,
      rating: t.rating
    }));
  } catch {
    return [];
  }
}

// Keep an alias for compatibility with imports in the codebase.
export const isSupabaseConfigured = true;
