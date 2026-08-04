import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { SERVICES_DATA } from '../../data/clinicData';
import { useLanguage } from '../../context/LanguageContext';
import { ServiceItem } from '../../types';
import { fetchServices, isSupabaseConfigured } from '../../lib/queries';
import { 
  UserCheck, 
  Activity, 
  HeartHandshake, 
  Scan, 
  Microscope, 
  Apple, 
  Flame, 
  Music, 
  BookOpen, 
  Sparkles, 
  Award,
  ArrowRight,
  X,
  CheckCircle2
} from 'lucide-react';

interface ServicesGridProps {
  onOpenAppointment: (serviceName?: string) => void;
}

export const ServicesGrid: React.FC<ServicesGridProps> = ({ onOpenAppointment }) => {
  const { t } = useLanguage();
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  const [services, setServices] = useState<ServiceItem[]>(SERVICES_DATA);

  useEffect(() => {
    if (!isSupabaseConfigured) return;
    let cancelled = false;
    (async () => {
      try {
        const rows = await fetchServices();
        if (cancelled || rows.length === 0) return;
        const mapped: ServiceItem[] = rows.map((r) => ({
          id: r.slug,
          title: r.title,
          category: r.category,
          shortDesc: r.short_desc,
          fullDesc: r.full_desc,
          benefits: r.benefits,
          iconName: r.icon_name,
          imagePath: r.image_path || undefined,
        }));
        setServices(mapped);
      } catch (e) {
        console.error('Failed to load services from Supabase:', e);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const getIcon = (name: string) => {
    switch (name) {
      case 'UserCheck': return <UserCheck className="w-6 h-6 text-emerald-700 dark:text-teal-400" />;
      case 'Activity': return <Activity className="w-6 h-6 text-emerald-700 dark:text-teal-400" />;
      case 'HeartHandshake': return <HeartHandshake className="w-6 h-6 text-emerald-700 dark:text-teal-400" />;
      case 'Scan': return <Scan className="w-6 h-6 text-emerald-700 dark:text-teal-400" />;
      case 'Microscope': return <Microscope className="w-6 h-6 text-emerald-700 dark:text-teal-400" />;
      case 'Apple': return <Apple className="w-6 h-6 text-amber-600 dark:text-amber-400" />;
      case 'Flame': return <Flame className="w-6 h-6 text-amber-600 dark:text-amber-400" />;
      case 'Music': return <Music className="w-6 h-6 text-amber-600 dark:text-amber-400" />;
      case 'BookOpen': return <BookOpen className="w-6 h-6 text-purple-600 dark:text-purple-400" />;
      case 'Sparkles': return <Sparkles className="w-6 h-6 text-amber-500" />;
      case 'Award': return <Award className="w-6 h-6 text-amber-500" />;
      default: return <Sparkles className="w-6 h-6 text-emerald-700" />;
    }
  };

  const getCategoryLabel = (category: string) => {
    if (category === 'clinical') return t('categoryClinical');
    if (category === 'holistic') return t('categoryHolistic');
    return t('categoryEducational');
  };

  const getServiceTitle = (s: ServiceItem) => t(`service_${s.id}_title`) !== `service_${s.id}_title` ? t(`service_${s.id}_title`) : s.title;
  const getServiceShort = (s: ServiceItem) => t(`service_${s.id}_shortDesc`) !== `service_${s.id}_shortDesc` ? t(`service_${s.id}_shortDesc`) : s.shortDesc;

  return (
    <section className="py-12 px-4 sm:px-8 max-w-7xl mx-auto space-y-10">
      
      {/* Title */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-teal-300 text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          <span>{t('servicesBadgeText')}</span>
        </div>
        <h2 className="font-serif text-3xl sm:text-4xl font-bold text-emerald-950 dark:text-white">
          {t('servicesHeading')}
        </h2>
        <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">
          {t('servicesSubheading')}
        </p>
      </div>

{/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((s, idx) => (
          <motion.div
            key={s.id}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.45, delay: idx * 0.05 }}
            whileHover={{ y: -8, rotate: -0.4 }}
            onClick={() => setSelectedService(s)}
            className="glass-panel rounded-3xl p-6 hover:shadow-2xl transition-all duration-300 cursor-pointer flex flex-col justify-between space-y-4 group border border-emerald-800/10 dark:border-teal-400/10 premium-card"
          >
            <div className="space-y-3">
              {s.imagePath && (
                <div className="aspect-video rounded-2xl overflow-hidden mb-3 border border-emerald-500/20">
                  <img 
                    src={s.imagePath} 
                    alt={getServiceTitle(s)} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              )}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 flex items-center justify-center group-hover:scale-110 transition-transform shrink-0">
                  {getIcon(s.iconName)}
                </div>
                <span className={`inline-block px-2.5 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider ${
                  s.category === 'clinical' 
                    ? 'bg-emerald-100 dark:bg-emerald-950/80 text-emerald-900 dark:text-teal-300' 
                    : s.category === 'holistic'
                    ? 'bg-amber-100 dark:bg-amber-950/80 text-amber-900 dark:text-amber-300'
                    : 'bg-purple-100 dark:bg-purple-950/80 text-purple-900 dark:text-purple-300'
                }`}>
                  {getCategoryLabel(s.category)}
                </span>
              </div>
              <h3 className="font-serif font-bold text-lg text-emerald-950 dark:text-white group-hover:text-emerald-700 dark:group-hover:text-teal-300 transition-colors">
                {getServiceTitle(s)}
              </h3>
              <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed line-clamp-3">
                {getServiceShort(s)}
              </p>
            </div>

            <div className="pt-2 flex items-center justify-between border-t border-gray-100 dark:border-gray-800 text-xs font-semibold text-emerald-800 dark:text-teal-400">
              <span>{t('viewFullDetails')}</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Modal Detail Popup */}
      {selectedService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
          <div className="glass-panel w-full max-w-2xl rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl border border-emerald-500/20 max-h-[90vh] overflow-y-auto">
            
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-950/60 flex items-center justify-center">
                  {getIcon(selectedService.iconName)}
                </div>
                <div>
                  <h3 className="font-serif font-bold text-xl text-emerald-950 dark:text-white">
                    {getServiceTitle(selectedService)}
                  </h3>
                  <span className="text-xs text-emerald-700 dark:text-teal-400 font-semibold uppercase">
                    {getCategoryLabel(selectedService.category)} {t('services')}
                  </span>
                </div>
              </div>
              <button 
                onClick={() => setSelectedService(null)}
                className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
              {selectedService.fullDesc}
            </p>

            <div className="space-y-3">
              <h4 className="font-bold text-xs uppercase tracking-wider text-emerald-900 dark:text-teal-300">
                {t('keyBenefits')}
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {selectedService.benefits.map((b, idx) => (
                  <div key={idx} className="flex items-center gap-2 p-2.5 rounded-xl bg-white/40 dark:bg-black/40 text-xs text-gray-700 dark:text-gray-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-teal-400 shrink-0" />
                    <span>{b}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-200 dark:border-gray-800">
              <button
                onClick={() => setSelectedService(null)}
                className="px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 text-xs font-semibold"
              >
                {t('close')}
              </button>
              <button
                onClick={() => {
                  setSelectedService(null);
                  onOpenAppointment();
                }}
                className="px-6 py-2.5 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-semibold shadow-lg"
              >
                {t('requestGeneralAppointment')}
              </button>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};
