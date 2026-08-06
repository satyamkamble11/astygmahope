import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
  CheckCircle2,
  X
} from 'lucide-react';

type GalleryCategory = 'All' | 'Clinic' | 'Reception' | 'Lab' | 'Doctors' | 'Staff' | 'Events' | 'Workshops' | 'Videos';

interface GalleryItem {
  id: number | string;
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
  const [selectedVideo, setSelectedVideo] = useState<GalleryItem | null>(null);

  useEffect(() => {
    if (!isSupabaseConfigured) return;
    let cancelled = false;
    (async () => {
      try {
        const rows = await fetchGallery();
        if (cancelled) return;
        const mapped: GalleryItem[] = rows.map((r) => ({
          id: r.id,
          title: r.title,
          category: r.category,
          path: r.path,
          desc: r.description || undefined,
          isVideo: r.is_video || undefined,
        }));
        if (mapped.length > 0) {
          setGalleryItems(mapped);
        }
      } catch (e) {
        console.error('Failed to load gallery from Supabase:', e);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const defaultGalleryItems: GalleryItem[] = [
    {
      id: "vid-1",
      title: "आई-बाबा होण्याचं स्वप्न आता दूर नाही - Astygma Hope Clinic",
      category: "Videos",
      path: "/assets/gallery/आई-बाबा होण्याचं स्वप्न आता दूर नाही… 👶✨योग्य मार्गदर्शन, तपासण्या आणि उपचारांसाठीभेट द्या Asty.mp4",
      isVideo: true,
      desc: "योग्य मार्गदर्शन, तपासण्या आणि निसर्गाशी सुसंगत उपचारांसाठी भेट द्या अस्टिग्मा होप क्लिनिक."
    },
    {
      id: "vid-2",
      title: "आशेपासून आनंदापर्यंतचा प्रवास - रुग्ण अनुभव",
      category: "Videos",
      path: "/assets/gallery/आशेपासून आनंदापर्यंतचा प्रवास 🌸Astygma Hope Clinic मधील उपचारांमुळे रुग्णाला मिळाले सकारात्मक प.mp4",
      isVideo: true,
      desc: "Astygma Hope Clinic मधील उपचारांमुळे रुग्णाला मिळाले सकारात्मक परिणाम व अपत्यप्राप्तीचा आनंद."
    },
    {
      id: "vid-3",
      title: "5 वर्षांच्या प्रयत्नांनंतर मिळालेली आनंदाची बातमी",
      category: "Videos",
      path: "/assets/gallery/“5 वर्षांपासून प्रयत्न… पण result नाही 😢आता Ayurvedic treatment ने मिळवा GOOD NEWS! 🤰💖Call No.mp4",
      isVideo: true,
      desc: "Ayurvedic fertility treatment आणि Dr. Umesh Datta Kalekar यांचे विशेष मार्गदर्शन."
    },
    {
      id: "vid-4",
      title: "Your Journey to Parenthood Starts Here",
      category: "Videos",
      path: "/assets/gallery/“Your journey to parenthood starts here.” 👨_👩_👧_👦#hospitality #hospital.mp4",
      isVideo: true,
      desc: "Comprehensive fertility care, advanced ultrasound diagnostics, and Garbhasanskar."
    },
    {
      id: "vid-5",
      title: "आशा ठेवा… चमत्कार घडू शकतो!",
      category: "Videos",
      path: "/assets/gallery/✨ “आशा ठेवा… चमत्कार घडू शकतो.” 👶💖“वंध्यत्व उपचार, तपासण्या आणि समुपदेशन —कारण तुमचं आई-वडील ह.mp4",
      isVideo: true,
      desc: "वंध्यत्व उपचार, आधुनिक तपासण्या आणि मानसोपचार समुपदेशन."
    },
    {
      id: "vid-6",
      title: "Shirol Branch Location & Route Guide",
      category: "Videos",
      path: "/assets/gallery/📍 Location-शिरोळ बस स्टँड जवळसंभाजी चौक पासून सरळ 100 मीटरश्री दत्तनगरी सह. पंचसंस्था समोर🏥 As.mp4",
      isVideo: true,
      desc: "शिरोळ बस स्टँड जवळ (250m अंतर), संभाजी चौक पासून सरळ 100 मीटर."
    },
    {
      id: "vid-7",
      title: "Shirol & Kolhapur Branch Helpline Video",
      category: "Videos",
      path: "/assets/gallery/📞 आत्ताच संपर्क करा- 7522900512📍 शिरोळ - कोल्हापूर#viralreels #infertility #pregnancyfac#hospi.mp4",
      isVideo: true,
      desc: "📞 संपर्क क्रमांक: 7522900512 - शिरोळ व कोल्हापूर शाखा माहिती."
    },
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
            className="glass-panel rounded-3xl overflow-hidden shadow-lg border border-gray-200/50 dark:border-gray-800/50 group premium-card cursor-pointer"
            onClick={() => item.isVideo && setSelectedVideo(item)}
          >
            
            <div className="aspect-video bg-gradient-to-br from-emerald-950 to-teal-950 flex flex-col items-center justify-center text-white relative overflow-hidden">
              {item.isVideo ? (
                <div className="relative w-full h-full flex items-center justify-center">
                  <video 
                    src={encodeURI(item.path)} 
                    className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-300"
                    muted
                    preload="metadata"
                  />
                  <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center space-y-2 p-4 text-center">
                    <div className="w-14 h-14 rounded-full bg-teal-500/90 text-emerald-950 flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
                      <Play className="w-7 h-7 fill-current ml-1" />
                    </div>
                    <span className="text-xs font-bold line-clamp-1">{item.title}</span>
                  </div>
                </div>
              ) : (
                <img 
                  src={encodeURI(item.path)} 
                  alt={item.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
              )}

              <span className="absolute top-3 right-3 px-2.5 py-0.5 rounded-full bg-black/60 text-white text-[10px] font-bold uppercase backdrop-blur-md">
                {item.category}
              </span>
            </div>

            <div className="p-5 space-y-1">
              <h4 className="font-serif font-bold text-sm text-emerald-950 dark:text-white line-clamp-1">{item.title}</h4>
              <p className="text-xs text-gray-500 line-clamp-2">{item.desc}</p>
            </div>

          </motion.div>
        ))}
      </div>

      {/* Video Modal Player */}
      <AnimatePresence>
        {selectedVideo && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="glass-panel w-full max-w-3xl rounded-3xl p-6 space-y-4 shadow-2xl border border-teal-500/30 bg-gray-950 text-white relative"
            >
              <div className="flex items-center justify-between">
                <div>
                  <span className="px-2.5 py-0.5 rounded bg-teal-500/20 text-teal-300 text-[10px] font-bold uppercase">
                    {selectedVideo.category}
                  </span>
                  <h3 className="font-serif font-bold text-lg text-white mt-1">
                    {selectedVideo.title}
                  </h3>
                </div>
                <button
                  onClick={() => setSelectedVideo(null)}
                  className="p-2 rounded-full hover:bg-gray-800 text-gray-400 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="aspect-video rounded-2xl overflow-hidden bg-black border border-gray-800">
                <video
                  src={encodeURI(selectedVideo.path)}
                  controls
                  autoPlay
                  className="w-full h-full object-contain"
                />
              </div>

              <p className="text-xs text-gray-400">{selectedVideo.desc}</p>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};
