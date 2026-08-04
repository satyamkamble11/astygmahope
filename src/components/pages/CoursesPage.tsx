import React, { useEffect, useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { fetchCourses, isSupabaseConfigured } from '../../lib/queries';
import { 
  GraduationCap, 
  BookOpen, 
  Award, 
  Video, 
  Lock, 
  Sparkles, 
  CheckCircle2, 
  FileText, 
  Play
} from 'lucide-react';

interface CoursesPageProps {
  onOpenAppointment: () => void;
}

interface Course {
  id: string;
  title: string;
  category: string;
  instructor: string;
  duration: string;
  description: string;
  includes: string[];
  isPaid: boolean;
  price?: string;
}

export const CoursesPage: React.FC<CoursesPageProps> = ({ onOpenAppointment }) => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<'All' | 'Free' | 'Paid' | 'Certificates'>('All');
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    if (!isSupabaseConfigured) return;
    let cancelled = false;
    (async () => {
      try {
        const rows = await fetchCourses();
        if (cancelled) return;
        const mapped: Course[] = rows.map((r) => ({
          id: r.id,
          title: r.title,
          category: r.category,
          instructor: r.instructor,
          duration: r.duration,
          description: r.description,
          includes: r.includes,
          isPaid: r.is_paid,
          price: r.price || undefined,
        }));
        setCourses(mapped);
      } catch (e) {
        console.error('Failed to load courses from Supabase:', e);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const defaultCourses: Course[] = [
    {
      id: "crs-1",
      title: "Scientific Garbhasanskar Master Guide",
      category: "Free",
      instructor: "Dr. Umesh Datta Kalekar",
      duration: "6 Hours (8 Modules)",
      description: "Structured pre-conception and intra-uterine cognitive development practices based on modern epigenetics and ancient wisdom.",
      includes: ["8 HD Video Lessons", "Downloadable Prenatal PDF Guide", "Audio Soundscape Links"],
      isPaid: false
    },
    {
      id: "crs-2",
      title: "Suprajaa Nirmiti Holistic Conception Program",
      category: "Paid",
      instructor: "Dr. Umesh Datta Kalekar",
      duration: "12 Hours (16 Modules)",
      description: "Our ultimate flagship program integrating Ultra Yoga, A-Dhyand Meditation, Sangeetopchar, and Clinical Endocrine Management.",
      includes: ["Personalized Consultation Session", "Exclusive Sound Vault Access Token", "Completion Certificate"],
      isPaid: true,
      price: "₹4,999"
    },
    {
      id: "crs-3",
      title: "Ultra Yoga for Pelvic Blood Flow Optimization",
      category: "Free",
      instructor: "Dr. Umesh Datta Kalekar",
      duration: "4 Hours (6 Modules)",
      description: "Step-by-step video instruction on Dr. Kalekar's proprietary Ultra Yoga postures designed for ovarian and uterine vascularity.",
      includes: ["Daily Exercise Tracker", "Breathing Pattern Guide", "Video Demonstration"],
      isPaid: false
    },
    {
      id: "crs-4",
      title: "Ayurvedic Fertility & Beeja Shuddhi Rejuvenation",
      category: "Paid",
      instructor: "Dr. Umesh Datta Kalekar",
      duration: "8 Hours (10 Modules)",
      description: "Evidence-informed natural fertility principles, Panchakarma preparation, and Rasayana rejuvenation therapies.",
      includes: ["Cellular Detox Diet Plan", "Herbal Guidance Manual", "Official Certificate of Completion"],
      isPaid: true,
      price: "₹2,999"
    }
  ];

const items = courses.length > 0 ? courses : defaultCourses;

  const filtered = activeTab === 'All' 
    ? items 
    : activeTab === 'Certificates'
    ? items.filter(c => c.isPaid)
    : items.filter(c => c.category === activeTab);

  return (
    <div className="py-12 px-4 sm:px-8 max-w-7xl mx-auto space-y-12">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-100 dark:bg-purple-950/70 text-purple-800 dark:text-purple-300 text-xs font-bold uppercase tracking-wider">
          <GraduationCap className="w-4 h-4" />
          <span>{t('coursesBadge')}</span>
        </div>
        <h1 className="font-serif text-4xl font-bold text-emerald-950 dark:text-white">
          {t('coursesHeading')}
        </h1>
        <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">
          {t('coursesSubtitle')}
        </p>
      </div>

      {/* Tabs */}
      <div className="flex items-center justify-center gap-3">
        {['All', 'Free', 'Paid', 'Certificates'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab as any)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
              activeTab === tab 
                ? 'bg-emerald-800 text-white shadow-md' 
                : 'glass-panel text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
            }`}
          >
            {tab === 'All' ? t('allCourses') :
             tab === 'Free' ? t('freeCourses') :
             tab === 'Paid' ? t('paidCourses') :
             t('certificates')} {tab === 'Certificates' ? 'Programs' : 'Courses'}
          </button>
        ))}
      </div>

      {/* Course Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filtered.map((crs) => (
          <div key={crs.id} className="glass-panel rounded-3xl p-8 space-y-6 shadow-xl border border-purple-500/20 flex flex-col justify-between">
            
            <div className="space-y-4">
              
              <div className="flex items-center justify-between">
                <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
                  crs.isPaid ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300' : 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-teal-300'
                }`}>
                  {crs.isPaid ? `${t('paidCourseTag')} • ${crs.price}` : t('freeClinicalCourse')}
                </span>
                <span className="text-xs text-gray-500 font-semibold">{crs.duration}</span>
              </div>

              <h3 className="font-serif font-bold text-xl text-emerald-950 dark:text-white">
                {crs.title}
              </h3>

              <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                {crs.description}
              </p>

              <div className="space-y-2 pt-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-900 dark:text-teal-300">
                  {t('programHighlights')}
                </h4>
                <div className="space-y-1.5">
                  {crs.includes.map((inc, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-300">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-teal-400 shrink-0" />
                      <span>{inc}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            <div className="pt-6 border-t border-gray-200 dark:border-gray-800 flex items-center justify-between">
              <span className="text-xs text-gray-500 font-medium">{t('instructor')} {crs.instructor}</span>
              <button
                onClick={onOpenAppointment}
                className="px-5 py-2.5 rounded-xl bg-purple-800 hover:bg-purple-900 text-white font-semibold text-xs shadow-md flex items-center gap-2"
              >
                {crs.isPaid ? <Lock className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                <span>{crs.isPaid ? t('enrollNow') : t('startFreeCourse')}</span>
              </button>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
};
