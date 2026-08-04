// Generated-style TypeScript types mirroring the Supabase schema in
// supabase/migrations/0001_init.sql. Kept in sync manually for the client.

export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type UserRole =
  | 'SUPER_ADMIN'
  | 'CLINIC_ADMIN'
  | 'DOCTOR'
  | 'RECEPTIONIST'
  | 'LAB_STAFF'
  | 'PATIENT';

export type AppointmentStatus =
  | 'PENDING'
  | 'APPROVED'
  | 'COMPLETED'
  | 'CANCELLED'
  | 'RESCHEDULED';

export type PaymentMode = 'ONLINE' | 'OFFLINE';
export type BranchName = 'Shirol Branch (Main HQ)' | 'Kolhapur Branch';
export type PostCategory = 'Story' | 'Carousel' | 'Blog' | 'HealthTip' | 'FestivalBanner' | 'HealthCamp';
export type SoundCategory = 'Meditation' | 'Pregnancy' | 'Healing' | 'Relaxation' | 'Yoga' | 'Nature';
export type ServiceCategory = 'clinical' | 'holistic' | 'educational';
export type GalleryCategory =
  | 'Clinic'
  | 'Reception'
  | 'Lab'
  | 'Doctors'
  | 'Staff'
  | 'Events'
  | 'Workshops'
  | 'Videos';

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          full_name: string;
          email: string;
          phone: string | null;
          role: UserRole;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          full_name: string;
          email: string;
          phone?: string | null;
          role?: UserRole;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database['public']['Tables']['profiles']['Insert']>;
      };
      appointments: {
        Row: {
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
        };
        Insert: {
          patient_name: string;
          patient_phone: string;
          patient_city: string;
          patient_email?: string | null;
          doctor_name?: string | null;
          service_name?: string | null;
          branch: BranchName;
          preferred_date: string;
          preferred_time: string;
          payment_mode?: PaymentMode;
          consultation_fee?: number;
          notes?: string | null;
          sender_mobile?: string | null;
          utr_id?: string | null;
          status?: AppointmentStatus;
          created_by?: string | null;
        };
        Update: Partial<Database['public']['Tables']['appointments']['Insert']>;
      };
      contact_messages: {
        Row: {
          id: string;
          name: string;
          phone: string;
          email: string | null;
          message: string;
          is_read: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          name: string;
          phone: string;
          email?: string | null;
          message: string;
          is_read?: boolean;
        };
        Update: Partial<Database['public']['Tables']['contact_messages']['Insert']>;
      };
      feedback: {
        Row: {
          id: string;
          name: string;
          rating: number;
          text: string;
          is_approved: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          name: string;
          rating: number;
          text: string;
          is_approved?: boolean;
        };
        Update: Partial<Database['public']['Tables']['feedback']['Insert']>;
      };
      doctors: {
        Row: {
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
          is_active: boolean;
          display_order: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          name: string;
          role?: string | null;
          title?: string | null;
          experience?: string | null;
          qualifications?: string[];
          bio?: string | null;
          highlights?: string[];
          image_path?: string | null;
          is_founder?: boolean;
          is_active?: boolean;
          display_order?: number;
        };
        Update: Partial<Database['public']['Tables']['doctors']['Insert']>;
      };
      services: {
        Row: {
          id: string;
          slug: string;
          title: string;
          category: ServiceCategory;
          short_desc: string;
          full_desc: string;
          benefits: string[];
          icon_name: string;
          image_path: string | null;
          is_active: boolean;
          display_order: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          slug: string;
          title: string;
          category: ServiceCategory;
          short_desc: string;
          full_desc: string;
          benefits?: string[];
          icon_name: string;
          image_path?: string | null;
          is_active?: boolean;
          display_order?: number;
        };
        Update: Partial<Database['public']['Tables']['services']['Insert']>;
      };
      testimonials: {
        Row: {
          id: string;
          name: string;
          location: string | null;
          rating: number;
          review: string;
          service: string | null;
          image_path: string | null;
          is_approved: boolean;
          is_active: boolean;
          display_order: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          name: string;
          location?: string | null;
          rating: number;
          review: string;
          service?: string | null;
          image_path?: string | null;
          is_approved?: boolean;
          is_active?: boolean;
          display_order?: number;
        };
        Update: Partial<Database['public']['Tables']['testimonials']['Insert']>;
      };
      gallery_items: {
        Row: {
          id: string;
          title: string;
          category: GalleryCategory;
          path: string;
          description: string | null;
          is_video: boolean;
          is_active: boolean;
          display_order: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          title: string;
          category: GalleryCategory;
          path: string;
          description?: string | null;
          is_video?: boolean;
          is_active?: boolean;
          display_order?: number;
        };
        Update: Partial<Database['public']['Tables']['gallery_items']['Insert']>;
      };
      blog_posts: {
        Row: {
          id: string;
          title: string;
          category: PostCategory;
          content: string;
          media_url: string | null;
          media_type: string;
          media_list: string[];
          author: string;
          likes: number;
          is_published: boolean;
          published_at: string | null;
          created_by: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          title: string;
          category?: PostCategory;
          content: string;
          media_url?: string | null;
          media_type?: string;
          media_list?: string[];
          author?: string;
          likes?: number;
          is_published?: boolean;
          published_at?: string | null;
          created_by?: string | null;
        };
        Update: Partial<Database['public']['Tables']['blog_posts']['Insert']>;
      };
      sound_tracks: {
        Row: {
          id: string;
          title: string;
          category: SoundCategory;
          duration: string;
          file_path: string;
          frequency_hz: number | null;
          description: string | null;
          is_custom_uploaded: boolean;
          is_protected: boolean;
          is_active: boolean;
          display_order: number;
          created_by: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          title: string;
          category: SoundCategory;
          duration: string;
          file_path: string;
          frequency_hz?: number | null;
          description?: string | null;
          is_custom_uploaded?: boolean;
          is_protected?: boolean;
          is_active?: boolean;
          display_order?: number;
          created_by?: string | null;
        };
        Update: Partial<Database['public']['Tables']['sound_tracks']['Insert']>;
      };
      courses: {
        Row: {
          id: string;
          title: string;
          category: string;
          instructor: string;
          duration: string;
          description: string;
          includes: string[];
          is_paid: boolean;
          price: string | null;
          is_active: boolean;
          display_order: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          title: string;
          category?: string;
          instructor: string;
          duration: string;
          description: string;
          includes?: string[];
          is_paid?: boolean;
          price?: string | null;
          is_active?: boolean;
          display_order?: number;
        };
        Update: Partial<Database['public']['Tables']['courses']['Insert']>;
      };
      faqs: {
        Row: {
          id: string;
          question: string;
          answer: string;
          category: string | null;
          display_order: number;
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          question: string;
          answer: string;
          category?: string | null;
          display_order?: number;
          is_active?: boolean;
        };
        Update: Partial<Database['public']['Tables']['faqs']['Insert']>;
      };
      settings: {
        Row: {
          key: string;
          value: Json;
          updated_at: string;
        };
        Insert: {
          key: string;
          value: Json;
          updated_at?: string;
        };
        Update: Partial<Database['public']['Tables']['settings']['Insert']>;
      };
    };
    Views: Record<string, never>;
    Functions: {
      has_role: {
        Args: { required: UserRole };
        Returns: boolean;
      };
      is_admin: {
        Args: Record<string, never>;
        Returns: boolean;
      };
    };
    Enums: {
      user_role: UserRole;
      appointment_status: AppointmentStatus;
      payment_mode: PaymentMode;
      branch_name: BranchName;
      post_category: PostCategory;
      sound_category: SoundCategory;
      service_category: ServiceCategory;
      gallery_category: GalleryCategory;
    };
  };
}
