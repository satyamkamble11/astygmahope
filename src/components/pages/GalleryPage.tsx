import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';
import { fetchGallery, isSupabaseConfigured } from '../../lib/queries';
import { 
  Camera, 
  Video, 
  Building2, 
  UserCheck, 
  Microscope, 
  Users, 
  Sparkles, 
  Play,
  CheckCircle2
} from 'lucide-react';

type GalleryCategory = 'All' | 'Clinic' | 'Reception' | 'Lab' | 'Doctors' | 'Staff' | 'Events' | 'Workshops' | 'Videos';

interface GalleryItem {
  id: number;
  title: string;
  category: string;
  path: string;
  desc?: string;
  isVideo?: boolean;
}

export const GalleryPage: React.FC = () => {
  const { t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<GalleryCategory>('All');
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);

  useEffect(() => {
    if (!isSupabaseConfigured) return;
    let cancelled = false;
    (async () => {
      try {
        const rows = await fetchGallery();
        if (cancelled) return;
        const mapped: GalleryItem[] = rows.map((r) => ({
          id: 0,
          title: r.title,
          category: r.category,
          path: r.path,
          desc: r.description || undefined,
          isVideo: r.is_video || undefined,
        }));
        setGalleryItems(mapped);
      } catch (e) {
        console.error('Failed to load gallery from Supabase:', e);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const defaultGalleryItems = [
    {
      id: 1,
      title: "Astygma Hope Clinic Shirol Branch",
      category: "Clinic",
      path: "/assets/clinic/shirol_branch.jpg",
      desc: "Modern luxury facility located on Maharashtra State Highway 137, Shirol."
    },
    {
      id: 9,
      title: "Astygma Hope Clinic Kolhapur Branch",
      category: "Clinic",
      path: "/assets/clinic/kolhapur_branch.jpg",
      desc: "Kolhapur branch near Deshmukh Hall, Hari Om Nagar."
    },
    {
      id: 2,
      title: "Dr. Umesh Datta Kalekar National Workshop",
      category: "Workshops",
      path: "/assets/gallery/workshop_1.jpg",
      desc: "Dr. Kalekar conducting Ultra Yoga & Garbhasanskar training for healthcare professionals."
    },
    {
      id: 3,
      title: "Front Reception Triage Desk",
      category: "Reception",
      path: "/assets/reception/reception_desk.jpg",
      desc: "Patient check-in desk and appointment triage lounge."
    },
    {
      id: 4,
      title: "Clinical Diagnostic Laboratory",
      category: "Lab",
      path: "/assets/lab/lab_equipment.jpg",
      desc: "In-house reproductive hormone testing equipment."
    },
    {
      id: 5,
      title: "Dr. Umesh Datta Kalekar Portrait",
      category: "Doctors",
      path: "/assets/doctors/dr_umesh_kalekar.png",
      desc: "Founder & MD of Astygma Hope Clinic (31+ Years Experience)."
    },
    {
      id: 6,
      title: "Free Fertility & Ultrasound Health Camp",
      category: "Events",
      path: "/assets/gallery/health_camp.jpg",
      desc: "Community health outreach event held at Shirol Branch."
    },
    {
      id: 7,
      title: "Nursing & Technical Support Team",
      category: "Staff",
      path: "/assets/staff/nursing_staff.jpg",
      desc: "Experienced clinical care team at Shirol."
    },
    {
      id: 8,
      title: "Sonography & Follicular Study Video",
      category: "Videos",
      path: "/assets/sonography/follicular_study.mp4",
      isVideo: true,
      desc: "High-resolution follicular tracking demonstration clip."
    }
  ];

  const items = galleryItems.length > 0 ? galleryItems : defaultGalleryItems;

  const filtered = activeCategory === 'All'
    ? items
    : items.filter(item => item.category === activeCategory);

  const categories: GalleryCategory[] = ['All', 'Clinic', 'Reception', 'Lab', 'Doctors', 'Staff', 'Events', 'Workshops', 'Videos'];

  return (
    <div className="py-12 px-4 sm:px-8 max-w-7xl mx-auto space-y-10">
      
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.55 }}
        className="text-center max-w-3xl mx-auto space-y-3"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/70 text-emerald-800 dark:text-teal-300 text-xs font-bold uppercase tracking-wider">
          <Camera className="w-3.5 h-3.5" />
          <span>{t('galleryBadge')}</span>
        </div>
        <h1 className="font-serif text-4xl font-bold text-emerald-950 dark:text-white">
          {t('galleryHeading')}
        </h1>
        <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">
          {t('gallerySubtitle')}
        </p>
      </motion.div>

      {/* Category Tabs */}
      <div className="flex items-center justify-center gap-2 flex-wrap">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
              activeCategory === cat 
                ? 'bg-emerald-800 text-white shadow-md' 
                : 'glass-panel text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
            }`}
          >
            {cat === 'All' ? t('categoryAll') :
             cat === 'Clinic' ? t('categoryClinic') :
             cat === 'Reception' ? t('categoryReception') :
             cat === 'Lab' ? t('categoryLab') :
             cat === 'Doctors' ? t('categoryDoctors') :
             cat === 'Staff' ? t('categoryStaff') :
             cat === 'Events' ? t('categoryEvents') :
             cat === 'Workshops' ? t('categoryWorkshops') :
             t('categoryVideos')}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((item, idx) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.42, delay: idx * 0.04 }}
            whileHover={{ y: -6 }}
            className="glass-panel rounded-3xl overflow-hidden shadow-lg border border-gray-200/50 dark:border-gray-800/50 group premium-card"
          >
            
            <div className="aspect-video bg-gradient-to-br from-emerald-950 to-teal-950 flex flex-col items-center justify-center text-white relative overflow-hidden">
              {item.category === 'Doctors' ? (
                <img 
                  src={item.path} 
                  alt={item.title} 
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300"
                />
              ) : item.isVideo ? (
                <div className="flex flex-col items-center justify-center space-y-2 p-6 text-center">
                  <div className="w-12 h-12 rounded-full bg-teal-500/20 border border-teal-400/40 flex items-center justify-center text-teal-300 group-hover:scale-110 transition-transform">
                    <Play className="w-6 h-6 fill-current ml-1" />
                  </div>
                  <span className="text-xs font-bold">{item.title}</span>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center space-y-2 p-6 text-center">
                  <Camera className="w-8 h-8 text-amber-400 opacity-70" />
                  <span className="text-xs font-serif font-bold">{item.title}</span>
                </div>
              )}

              <span className="absolute top-3 right-3 px-2.5 py-0.5 rounded-full bg-black/60 text-white text-[10px] font-bold uppercase backdrop-blur-md">
                {item.category}
              </span>
            </div>

            <div className="p-5 space-y-1">
              <h4 className="font-serif font-bold text-sm text-emerald-950 dark:text-white">{item.title}</h4>
              <p className="text-xs text-gray-500">{item.desc}</p>
            </div>

          </motion.div>
        ))}
      </div>

    </div>
  );
};
