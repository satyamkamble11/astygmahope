import { supabase, isSupabaseConfigured } from './supabase';
import type {
  Database,
  AppointmentStatus,
  BranchName,
  PaymentMode,
  PostCategory,
  SoundCategory,
  GalleryCategory,
} from './database.types';

// ---------------------------------------------------------------------------
// Type aliases for row-level data used across the app
// ---------------------------------------------------------------------------
export type AppointmentRow = Database['public']['Tables']['appointments']['Row'];
export type ContactMessageRow = Database['public']['Tables']['contact_messages']['Row'];
export type FeedbackRow = Database['public']['Tables']['feedback']['Row'];
export type DoctorRow = Database['public']['Tables']['doctors']['Row'];
export type ServiceRow = Database['public']['Tables']['services']['Row'];
export type TestimonialRow = Database['public']['Tables']['testimonials']['Row'];
export type GalleryItemRow = Database['public']['Tables']['gallery_items']['Row'];
export type BlogPostRow = Database['public']['Tables']['blog_posts']['Row'];
export type SoundTrackRow = Database['public']['Tables']['sound_tracks']['Row'];
export type CourseRow = Database['public']['Tables']['courses']['Row'];
export type FaqRow = Database['public']['Tables']['faqs']['Row'];

// ---------------------------------------------------------------------------
// Generic error helper
// ---------------------------------------------------------------------------
export function getErrorMessage(error: { message?: string } | null): string {
  return error?.message || 'Something went wrong. Please try again.';
}

// ===========================================================================
// APPOINTMENTS
// ===========================================================================
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
  if (!supabase) return [];
  const { data, error } = await supabase
    .from('appointments')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) throw new Error(getErrorMessage(error));
  return (data as AppointmentRow[]) ?? [];
}

export async function createAppointment(input: NewAppointmentInput): Promise<AppointmentRow> {
  if (!supabase) throw new Error('Supabase is not configured.');
  const { data, error } = await supabase
    .from('appointments')
    .insert({
      patient_name: input.patientName,
      patient_phone: input.patientPhone,
      patient_city: input.patientCity,
      patient_email: input.patientEmail || null,
      doctor_name: input.doctorName || null,
      service_name: input.serviceName || null,
      branch: input.branch,
      preferred_date: input.preferredDate,
      preferred_time: input.preferredTime,
      payment_mode: input.paymentMode,
      consultation_fee: input.consultationFee,
      notes: input.notes || null,
      sender_mobile: input.senderMobile || null,
      utr_id: input.utrId || null,
      status: 'PENDING',
    })
    .select()
    .single();
  if (error) throw new Error(getErrorMessage(error));
  return data as AppointmentRow;
}

export async function updateAppointmentStatus(
  id: string,
  status: AppointmentStatus
): Promise<AppointmentRow> {
  if (!supabase) throw new Error('Supabase is not configured.');
  const { data, error } = await supabase
    .from('appointments')
    .update({ status })
    .eq('id', id)
    .select()
    .single();
  if (error) throw new Error(getErrorMessage(error));
  return data as AppointmentRow;
}

// ===========================================================================
// CONTACT MESSAGES
// ===========================================================================
export interface NewContactMessageInput {
  name: string;
  phone: string;
  email?: string;
  message: string;
}

export async function createContactMessage(input: NewContactMessageInput): Promise<ContactMessageRow> {
  if (!supabase) throw new Error('Supabase is not configured.');
  const { data, error } = await supabase
    .from('contact_messages')
    .insert({
      name: input.name,
      phone: input.phone,
      email: input.email || null,
      message: input.message,
    })
    .select()
    .single();
  if (error) throw new Error(getErrorMessage(error));
  return data as ContactMessageRow;
}

// ===========================================================================
// FEEDBACK
// ===========================================================================
export interface NewFeedbackInput {
  name: string;
  rating: number;
  text: string;
}

export async function createFeedback(input: NewFeedbackInput): Promise<FeedbackRow> {
  if (!supabase) throw new Error('Supabase is not configured.');
  const { data, error } = await supabase
    .from('feedback')
    .insert({
      name: input.name,
      rating: input.rating,
      text: input.text,
      is_approved: true,
    })
    .select()
    .single();
  if (error) throw new Error(getErrorMessage(error));
  return data as FeedbackRow;
}

export async function fetchApprovedFeedback(): Promise<FeedbackRow[]> {
  if (!supabase) return [];
  const { data, error } = await supabase
    .from('feedback')
    .select('*')
    .eq('is_approved', true)
    .order('created_at', { ascending: false })
    .limit(4);
  if (error) throw new Error(getErrorMessage(error));
  return (data as FeedbackRow[]) ?? [];
}

// ===========================================================================
// DOCTORS
// ===========================================================================
export async function fetchDoctors(): Promise<DoctorRow[]> {
  if (!supabase) return [];
  const { data, error } = await supabase
    .from('doctors')
    .select('*')
    .eq('is_active', true)
    .order('display_order', { ascending: true });
  if (error) throw new Error(getErrorMessage(error));
  return (data as DoctorRow[]) ?? [];
}

// ===========================================================================
// SERVICES
// ===========================================================================
export async function fetchServices(): Promise<ServiceRow[]> {
  if (!supabase) return [];
  const { data, error } = await supabase
    .from('services')
    .select('*')
    .eq('is_active', true)
    .order('display_order', { ascending: true });
  if (error) throw new Error(getErrorMessage(error));
  return (data as ServiceRow[]) ?? [];
}

// ===========================================================================
// TESTIMONIALS
// ===========================================================================
export async function fetchTestimonials(): Promise<TestimonialRow[]> {
  if (!supabase) return [];
  const { data, error } = await supabase
    .from('testimonials')
    .select('*')
    .eq('is_active', true)
    .eq('is_approved', true)
    .order('display_order', { ascending: true });
  if (error) throw new Error(getErrorMessage(error));
  return (data as TestimonialRow[]) ?? [];
}

// ===========================================================================
// GALLERY
// ===========================================================================
export async function fetchGallery(Category?: GalleryCategory): Promise<GalleryItemRow[]> {
  if (!supabase) return [];
  let query = supabase
    .from('gallery_items')
    .select('*')
    .eq('is_active', true)
    .order('display_order', { ascending: true });
  if (Category) query = query.eq('category', Category);
  const { data, error } = await query;
  if (error) throw new Error(getErrorMessage(error));
  return (data as GalleryItemRow[]) ?? [];
}

// ===========================================================================
// BLOG POSTS
// ===========================================================================
export interface NewBlogPostInput {
  title: string;
  category: PostCategory;
  content: string;
  mediaUrl?: string;
  mediaType?: 'image' | 'video' | 'carousel';
  mediaList?: string[];
  author: string;
}

export async function fetchBlogPosts(): Promise<BlogPostRow[]> {
  if (!supabase) return [];
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('is_published', true)
    .order('published_at', { ascending: false });
  if (error) throw new Error(getErrorMessage(error));
  return (data as BlogPostRow[]) ?? [];
}

export async function createBlogPost(input: NewBlogPostInput): Promise<BlogPostRow> {
  if (!supabase) throw new Error('Supabase is not configured.');
  const { data, error } = await supabase
    .from('blog_posts')
    .insert({
      title: input.title,
      category: input.category,
      content: input.content,
      media_url: input.mediaUrl || null,
      media_type: input.mediaType || 'image',
      media_list: input.mediaList || [],
      author: input.author,
      is_published: true,
      published_at: new Date().toISOString(),
    })
    .select()
    .single();
  if (error) throw new Error(getErrorMessage(error));
  return data as BlogPostRow;
}

// ===========================================================================
// SOUND TRACKS
// ===========================================================================
export interface NewSoundTrackInput {
  title: string;
  category: SoundCategory;
  duration: string;
  filePath: string;
  frequencyHz?: number;
  description?: string;
}

export async function fetchSoundTracks(): Promise<SoundTrackRow[]> {
  if (!supabase) return [];
  const { data, error } = await supabase
    .from('sound_tracks')
    .select('*')
    .eq('is_active', true)
    .order('display_order', { ascending: true });
  if (error) throw new Error(getErrorMessage(error));
  return (data as SoundTrackRow[]) ?? [];
}

export async function createSoundTrack(input: NewSoundTrackInput): Promise<SoundTrackRow> {
  if (!supabase) throw new Error('Supabase is not configured.');
  const { data, error } = await supabase
    .from('sound_tracks')
    .insert({
      title: input.title,
      category: input.category,
      duration: input.duration,
      file_path: input.filePath,
      frequency_hz: input.frequencyHz || null,
      description: input.description || null,
      is_custom_uploaded: true,
    })
    .select()
    .single();
  if (error) throw new Error(getErrorMessage(error));
  return data as SoundTrackRow;
}

// ===========================================================================
// COURSES
// ===========================================================================
export async function fetchCourses(): Promise<CourseRow[]> {
  if (!supabase) return [];
  const { data, error } = await supabase
    .from('courses')
    .select('*')
    .eq('is_active', true)
    .order('display_order', { ascending: true });
  if (error) throw new Error(getErrorMessage(error));
  return (data as CourseRow[]) ?? [];
}

// ===========================================================================
// FAQS
// ===========================================================================
export async function fetchFaqs(): Promise<FaqRow[]> {
  if (!supabase) return [];
  const { data, error } = await supabase
    .from('faqs')
    .select('*')
    .eq('is_active', true)
    .order('display_order', { ascending: true });
  if (error) throw new Error(getErrorMessage(error));
  return (data as FaqRow[]) ?? [];
}

export { isSupabaseConfigured };
