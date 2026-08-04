import React from 'react';
import { motion } from 'framer-motion';
import { FOUNDER_DOCTOR, CLINIC_DATA } from '../../data/clinicData';
import { useLanguage } from '../../context/LanguageContext';
import { 
  Award, 
  HeartHandshake, 
  CheckCircle2, 
  Sparkles, 
  Flame, 
  Activity, 
  Globe, 
  Clock,
  ShieldCheck,
  Building2,
  Calendar,
  Leaf
} from 'lucide-react';

interface AboutPageProps {
  onOpenAppointment: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onOpenAppointment }) => {
  const { t } = useLanguage();

  return (
    <div className="py-12 px-4 sm:px-8 max-w-7xl mx-auto space-y-16">
      
      {/* Header Banner */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.55 }}
        className="text-center max-w-3xl mx-auto space-y-4"
      >
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100 dark:bg-emerald-950/70 text-emerald-800 dark:text-teal-300 text-xs font-bold uppercase tracking-wider">
          <Building2 className="w-3.5 h-3.5" />
          <span>{t('aboutBadge')}</span>
        </div>
        <h1 className="font-serif text-4xl sm:text-5xl font-bold text-emerald-950 dark:text-white leading-tight">
          {t('aboutHeading')}
        </h1>
        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed">
          {t('aboutSubtitle')}
        </p>
      </motion.div>

      {/* Vision, Mission & Philosophy Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Vision */}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.45 }}
          whileHover={{ y: -6, rotate: -0.25 }}
          className="glass-panel rounded-3xl p-8 space-y-4 border border-emerald-500/20 transition-all duration-300"
        >
          <div className="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-teal-400 flex items-center justify-center font-bold">
            <Sparkles className="w-6 h-6" />
          </div>
          <h3 className="font-serif font-bold text-xl text-emerald-950 dark:text-white">{t('ourVision')}</h3>
          <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
            {t('visionDesc')}
          </p>
        </motion.div>

        {/* Mission */}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.45, delay: 0.06 }}
          whileHover={{ y: -6, rotate: -0.25 }}
          className="glass-panel rounded-3xl p-8 space-y-4 border border-amber-500/20 transition-all duration-300"
        >
          <div className="w-12 h-12 rounded-2xl bg-amber-100 dark:bg-amber-950/80 text-amber-700 dark:text-amber-300 flex items-center justify-center font-bold">
            <HeartHandshake className="w-6 h-6" />
          </div>
          <h3 className="font-serif font-bold text-xl text-emerald-950 dark:text-white">{t('ourMission')}</h3>
          <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
            {t('missionDesc')}
          </p>
        </motion.div>

        {/* Philosophy */}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.45, delay: 0.12 }}
          whileHover={{ y: -6, rotate: -0.25 }}
          className="glass-panel rounded-3xl p-8 space-y-4 border border-teal-500/20 transition-all duration-300"
        >
          <div className="w-12 h-12 rounded-2xl bg-teal-100 dark:bg-teal-950/80 text-teal-700 dark:text-teal-300 flex items-center justify-center font-bold">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h3 className="font-serif font-bold text-xl text-emerald-950 dark:text-white">{t('ourPhilosophy')}</h3>
          <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
            {t('philosophyDesc')}
          </p>
        </motion.div>

      </div>

      {/* Founder Spotlight */}
      <div className="glass-panel rounded-3xl p-8 sm:p-12 border border-emerald-800/20 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-4 text-center">
          <img 
            src={FOUNDER_DOCTOR.imagePath} 
            alt={FOUNDER_DOCTOR.name} 
            className="w-56 h-72 rounded-3xl object-cover object-top mx-auto shadow-2xl border-4 border-emerald-500/30" 
          />
        </div>
        <div className="lg:col-span-8 space-y-4">
          <span className="px-3 py-1 rounded-md bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300 text-xs font-bold uppercase tracking-wider">
            {t('founderResearcher')}
          </span>
          <h2 className="font-serif text-3xl font-bold text-emerald-950 dark:text-white">
            {FOUNDER_DOCTOR.name} ({FOUNDER_DOCTOR.experience})
          </h2>
          <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
            {FOUNDER_DOCTOR.bio}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <div className="p-3 rounded-2xl bg-white/40 dark:bg-black/40 text-xs font-medium space-y-1">
              <span className="font-bold text-emerald-900 dark:text-teal-300 flex items-center gap-1.5">
                <Flame className="w-4 h-4 text-amber-500" /> {t('ultraYogaTitle')}
              </span>
              <p className="text-gray-600 dark:text-gray-400 text-[11px]">
                {t('ultraYogaDesc')}
              </p>
            </div>
            <div className="p-3 rounded-2xl bg-white/40 dark:bg-black/40 text-xs font-medium space-y-1">
              <span className="font-bold text-emerald-900 dark:text-teal-300 flex items-center gap-1.5">
                <Activity className="w-4 h-4 text-emerald-600" /> {t('aDhyandTitle')}
              </span>
              <p className="text-gray-600 dark:text-gray-400 text-[11px]">
                {t('aDhyandDesc')}
              </p>
            </div>
          </div>

          {/* Ayurvedic Fertility Coach Highlight */}
          <div className="p-3 rounded-2xl border-2 border-green-500/40 bg-gradient-to-br from-green-50/60 to-emerald-50/40 dark:from-green-950/30 dark:to-emerald-950/30 text-xs font-medium space-y-1">
            <span className="font-bold text-green-700 dark:text-green-400 flex items-center gap-1.5">
              <Leaf className="w-4 h-4" /> {t('ayurvedicCoachTitle')}
              <span className="ml-auto px-2.5 py-0.5 rounded-full bg-green-100 dark:bg-green-950 text-green-800 dark:text-green-300 text-[10px] font-bold uppercase tracking-wider">
                {t('ayurvedicCoachBadge')}
              </span>
            </span>
            <p className="text-gray-600 dark:text-gray-400 text-[11px]">
              {t('ayurvedicCoachDesc')}
            </p>
          </div>

          <button
            onClick={onOpenAppointment}
            className="mt-4 px-6 py-3 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-semibold text-xs shadow-lg flex items-center gap-2"
          >
            <Calendar className="w-4 h-4" /> {t('scheduleConsultation')}
          </button>
        </div>
      </div>

      {/* History Timeline */}
      <div className="space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="font-serif text-3xl font-bold text-emerald-950 dark:text-white">
            {t('legacyTitle')}
          </h2>
          <p className="text-xs text-gray-500">{t('legacySubtitle')}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="glass-panel p-6 rounded-2xl space-y-2 border-l-4 border-l-emerald-600">
            <span className="text-xs font-bold text-emerald-700 dark:text-teal-400">1995</span>
            <h4 className="font-serif font-bold text-base text-emerald-950 dark:text-white">{t('legacy1Title')}</h4>
            <p className="text-xs text-gray-600 dark:text-gray-400">{t('legacy1Desc')}</p>
          </div>

          <div className="glass-panel p-6 rounded-2xl space-y-2 border-l-4 border-l-amber-500">
            <span className="text-xs font-bold text-amber-600">2008</span>
            <h4 className="font-serif font-bold text-base text-emerald-950 dark:text-white">{t('legacy2Title')}</h4>
            <p className="text-xs text-gray-600 dark:text-gray-400">{t('legacy2Desc')}</p>
          </div>

          <div className="glass-panel p-6 rounded-2xl space-y-2 border-l-4 border-l-purple-500">
            <span className="text-xs font-bold text-purple-600">2016</span>
            <h4 className="font-serif font-bold text-base text-emerald-950 dark:text-white">{t('legacy3Title')}</h4>
            <p className="text-xs text-gray-600 dark:text-gray-400">{t('legacy3Desc')}</p>
          </div>

          <div className="glass-panel p-6 rounded-2xl space-y-2 border-l-4 border-l-teal-500">
            <span className="text-xs font-bold text-teal-600">{t('present')}</span>
            <h4 className="font-serif font-bold text-base text-emerald-950 dark:text-white">{t('legacy4Title')}</h4>
            <p className="text-xs text-gray-600 dark:text-gray-400">{t('legacy4Desc')}</p>
          </div>
        </div>
      </div>

    </div>
  );
};
